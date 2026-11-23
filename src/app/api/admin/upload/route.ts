import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getBucket, isMongoConfigured } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!isMongoConfigured()) {
    return NextResponse.json({ error: "لوحة التحكم غير مفعّلة بعد" }, { status: 503 });
  }
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح" }, { status: 400 });
  }
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "لم يتم إرفاق ملف" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "يجب أن يكون الملف صورة" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "حجم الصورة أكبر من 10 ميجا" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const bucket = await getBucket();
  const safeName = (file.name || "image").replace(/[^\w.\-ء-ي ]+/g, "_").slice(-100);
  const uploadStream = bucket.openUploadStream(`${Date.now()}-${safeName}`, {
    metadata: { contentType: file.type, originalName: file.name || safeName },
  });
  await new Promise<void>((resolve, reject) => {
    uploadStream.end(buffer, (err?: Error | null) => (err ? reject(err) : resolve()));
  });
  return NextResponse.json({ ok: true, url: `/api/files/${String(uploadStream.id)}` });
}
