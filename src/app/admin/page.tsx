import AdminApp from "@/components/admin/AdminApp";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const metadata = { title: "لوحة تحكم مرايا" };

export default function AdminPage() {
  return <AdminApp />;
}
