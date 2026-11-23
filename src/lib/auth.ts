import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getDb, isMongoConfigured } from "./mongodb";

export const SESSION_COOKIE = "mryia_admin";
export const DEFAULT_ADMIN_EMAIL = "admin@mraya-konda.com";

const ADMINS_COLLECTION = "admins";

export type AdminRecord = {
  email: string;
  passwordHash: string;
};

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, expected] = (stored || "").split(":");
  if (!salt || !expected) return false;
  const derived = scryptSync(password, salt, 64);
  const expectedBuf = Buffer.from(expected, "hex");
  return derived.length === expectedBuf.length && timingSafeEqual(derived, expectedBuf);
}

// Returns the admin record from the DB, seeding it from env on first use.
export async function getAdminRecord(): Promise<AdminRecord | null> {
  if (!isMongoConfigured()) return null;
  try {
    const db = await getDb();
    const col = db.collection<AdminRecord>(ADMINS_COLLECTION);
    const existing = await col.findOne({});
    if (existing) return { email: existing.email, passwordHash: existing.passwordHash };
    const envHash = process.env.ADMIN_PASSWORD_HASH;
    const envPassword = process.env.ADMIN_PASSWORD;
    const passwordHash = envHash || (envPassword ? hashPassword(envPassword) : null);
    if (!passwordHash) return null;
    const record: AdminRecord = {
      email: (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).toLowerCase(),
      passwordHash,
    };
    await col.insertOne(record);
    return record;
  } catch (err) {
    console.error("Failed to load admin record", err);
    return null;
  }
}

export async function updateAdminRecord(currentEmail: string, update: { email?: string; passwordHash?: string }) {
  const db = await getDb();
  const col = db.collection<AdminRecord>(ADMINS_COLLECTION);
  await col.updateOne({ email: currentEmail.toLowerCase() }, { $set: update });
}

export async function isAdminConfigured() {
  return (await getAdminRecord()) !== null;
}

function getSecret() {
  const configured = process.env.SESSION_SECRET || process.env.MONGODB_URI;
  if (!configured) return null;
  return new TextEncoder().encode(createHash("sha256").update(`${configured}|mryia-admin`).digest("hex"));
}

export async function signSession(email: string) {
  const secret = getSecret();
  if (!secret) throw new Error("AUTH_NOT_CONFIGURED");
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function getSession() {
  const secret = getSecret();
  if (!secret) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { email: payload.sub as string };
  } catch {
    return null;
  }
}
