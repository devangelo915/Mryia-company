import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { deleteItem, updateItem } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

async function guard() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  return null;
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const blocked = await guard();
  if (blocked) return blocked;
  const { id } = await ctx.params;
  const body = await req.json();
  if (!body || !body.data || typeof body.data !== "object") {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
  const order = typeof body.order === "number" ? body.order : 999;
  await updateItem(id, body.data, order);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const blocked = await guard();
  if (blocked) return blocked;
  const { id } = await ctx.params;
  await deleteItem(id);
  return NextResponse.json({ ok: true });
}
