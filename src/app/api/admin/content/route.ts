import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSiteContent, saveSettings } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function guard() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const blocked = await guard();
  if (blocked) return blocked;
  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(req: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;
  const body = await req.json();
  if (!body || typeof body !== "object" || !body.settings) {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
  await saveSettings(body.settings);
  return NextResponse.json({ ok: true });
}
