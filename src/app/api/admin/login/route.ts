import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, getAdminRecord, signSession, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const admin = await getAdminRecord();
  if (!admin) {
    return NextResponse.json({ error: "لوحة التحكم غير مفعّلة بعد" }, { status: 503 });
  }
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  const validEmail = email === admin.email.toLowerCase();
  const validPassword = verifyPassword(password, admin.passwordHash);
  if (!validEmail || !validPassword) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
  }
  const token = await signSession(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
