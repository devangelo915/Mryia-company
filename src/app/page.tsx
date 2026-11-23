import { getSiteContent } from "@/lib/store";
import SitePage from "@/components/SitePage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function Home() {
  const content = await getSiteContent();
  return <SitePage content={content} />;
}
