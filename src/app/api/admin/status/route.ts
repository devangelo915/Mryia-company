import { NextResponse } from "next/server";
import { getSession, isAdminConfigured } from "@/lib/auth";
import { isMongoConfigured } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  const configured = session ? true : await isAdminConfigured();
  return NextResponse.json({
    db: isMongoConfigured(),
    auth: configured,
    loggedIn: Boolean(session),
    email: session?.email || null,
  });
}
