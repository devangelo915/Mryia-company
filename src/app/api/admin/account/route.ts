import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, getAdminRecord, getSession, hashPassword, signSession, updateAdminRecord, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const admin = await getAdminRecord();
  if (!admin) return NextResponse.json({ error: "لوحة التحكم غير مفعّلة بعد" }, { status: 503 });

  let body: { currentPassword?: string; newEmail?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }

  if (!verifyPassword(body.currentPassword || "", admin.passwordHash)) {
    return NextResponse.json({ error: "كلمة المرور الحالية غير صحيحة" }, { status: 401 });
  }

  const update: { email?: string; passwordHash?: string } = {};
  const newEmail = (body.newEmail || "").trim().toLowerCase();
  if (newEmail && newEmail !== admin.email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صالح" }, { status: 400 });
    }
    update.email = newEmail;
  }
  if (body.newPassword) {
    if (body.newPassword.length < 8) {
      return NextResponse.json({ error: "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل" }, { status: 400 });
    }
    update.passwordHash = hashPassword(body.newPassword);
  }
  if (!update.email && !update.passwordHash) {
    return NextResponse.json({ error: "لا يوجد تغيير" }, { status: 400 });
  }

  await updateAdminRecord(admin.email, update);

  const res = NextResponse.json({ ok: true, email: update.email || admin.email });
  if (update.email) {
    const token = await signSession(update.email);
    res.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
  return res;
}
