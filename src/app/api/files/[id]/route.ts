import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getBucket } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
  const bucket = await getBucket();
  const files = await bucket.find({ _id: objectId }).toArray();
  const file = files[0];
  if (!file) return new NextResponse("Not found", { status: 404 });

  const chunks: Buffer[] = [];
  await new Promise<void>((resolve, reject) => {
    const stream = bucket.openDownloadStream(objectId);
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve());
  });
  const body = Buffer.concat(chunks);
  return new NextResponse(new Uint8Array(body), {
    headers: {
      "Content-Type": (file.metadata as { contentType?: string } | undefined)?.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
