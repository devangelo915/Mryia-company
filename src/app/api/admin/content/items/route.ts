import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { createItem } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["stat", "service", "team", "news"];

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const body = await req.json();
  if (!body || !ALLOWED_TYPES.includes(body.type) || !body.data || typeof body.data !== "object") {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
  const order = typeof body.order === "number" ? body.order : 999;
  const id = await createItem(body.type, body.data, order);
  return NextResponse.json({ ok: true, id });
}
