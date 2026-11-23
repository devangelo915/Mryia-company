"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  NewsItem,
  ServiceItem,
  Settings,
  SiteContent,
  StatItem,
  TEAM_CATEGORIES,
  TeamMember,
} from "@/lib/content";
import { ITEM_ICON_OPTIONS, SOCIAL_ICON_OPTIONS } from "@/lib/icons";

type Status = { db: boolean; auth: boolean; loggedIn: boolean; email: string | null };
type AnyItem = StatItem | ServiceItem | TeamMember | NewsItem;

const inputCls =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/10 transition-all outline-none placeholder:text-slate-300";
const labelCls = "block text-xs font-bold text-slate-500 mb-1.5";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({ label, value, onChange, dir }: { label: string; value: string; onChange: (v: string) => void; dir?: "ltr" }) {
  return (
    <Field label={label}>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} dir={dir} />
    </Field>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <Field label={label}>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} resize-y`} />
    </Field>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <Field label={label}>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className={inputCls}
        dir="ltr"
      />
    </Field>
  );
}

function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الرفع");
      onChange(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "فشل الرفع");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="w-16 h-16 rounded-xl object-cover border border-slate-200 bg-slate-100" />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-slate-100 border border-dashed border-slate-300" />
        )}
        <div className="flex-1 space-y-2">
          <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} dir="ltr" placeholder="/img/..." />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="text-xs font-bold px-3 py-2 rounded-lg bg-brand-dark text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {busy ? "جاري الرفع..." : "رفع صورة"}
            </button>
            {err && <span className="text-xs text-red-600">{err}</span>}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) upload(f);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </Field>
  );
}

function SaveButton({ onSave, saving, saved }: { onSave: () => void; saving: boolean; saved: boolean }) {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="bg-brand-dark text-white font-bold px-10 py-3 rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
      </button>
      {saved && <span className="text-green-600 text-sm font-bold">تم الحفظ</span>}
    </div>
  );
}

function SectionCard({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 md:p-8 space-y-5">
      <div className="border-r-4 border-brand-dark pr-3">
        <h2 className="text-xl font-arabic font-bold text-brand-dark">{title}</h2>
        {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

// ---------- generic items CRUD ----------

type ItemField =
  | { key: string; label: string; kind: "text"; dir?: "ltr" }
  | { key: string; label: string; kind: "textarea"; rows?: number }
  | { key: string; label: string; kind: "number" }
  | { key: string; label: string; kind: "image" }
  | { key: string; label: string; kind: "select"; options: { value: string; label: string }[] };

function ItemsEditor({
  type,
  title,
  hint,
  items,
  fields,
  blankItem,
  itemTitle,
  itemImage,
  onRefresh,
}: {
  type: string;
  title: string;
  hint?: string;
  items: AnyItem[];
  fields: ItemField[];
  blankItem: () => Record<string, unknown>;
  itemTitle: (item: AnyItem) => string;
  itemImage?: (item: AnyItem) => string | undefined;
  onRefresh: () => void;
}) {
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const startNew = () => {
    setEditing(blankItem());
    setEditingId(null);
    setErr("");
  };

  const startEdit = (item: AnyItem) => {
    const { id, order, ...data } = item as unknown as Record<string, unknown>;
    setEditing({ ...data, order });
    setEditingId((item as { id: string }).id);
    setErr("");
  };

  const save = async () => {
    if (!editing) return;
    setBusy(true);
    setErr("");
    try {
      const { order, ...data } = editing as { order?: number } & Record<string, unknown>;
      const payload = { type, data, order: typeof order === "number" ? order : Number(order) || 999 };
      const res = editingId
        ? await fetch(`/api/admin/content/items/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/admin/content/items", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "فشل الحفظ");
      setEditing(null);
      setEditingId(null);
      onRefresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "فشل الحفظ");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/admin/content/items/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "فشل الحذف");
      setConfirmDelete(null);
      onRefresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "فشل الحذف");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SectionCard title={title} hint={hint}>
      {err && <div className="text-sm text-red-600 font-bold">{err}</div>}

      {editing ? (
        <div className="space-y-4 border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
          <h3 className="font-bold text-brand-dark">{editingId ? "تعديل" : "إضافة جديد"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map((f) => {
              const value = (editing[f.key] ?? "") as string;
              const setVal = (v: unknown) => setEditing({ ...editing, [f.key]: v });
              switch (f.kind) {
                case "text":
                  return <TextInput key={f.key} label={f.label} value={String(value)} onChange={setVal} dir={f.dir} />;
                case "textarea":
                  return (
                    <div key={f.key} className="md:col-span-2">
                      <TextArea label={f.label} value={String(value)} onChange={setVal} rows={f.rows} />
                    </div>
                  );
                case "number":
                  return <NumberInput key={f.key} label={f.label} value={Number(editing[f.key] ?? 0)} onChange={setVal} />;
                case "image":
                  return (
                    <div key={f.key} className="md:col-span-2">
                      <ImageField label={f.label} value={String(value)} onChange={setVal} />
                    </div>
                  );
                case "select":
                  return <SelectInput key={f.key} label={f.label} value={String(value)} onChange={setVal} options={f.options} />;
              }
            })}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={save}
              disabled={busy}
              className="bg-brand-dark text-white font-bold px-6 py-2.5 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              {busy ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="text-sm font-bold text-slate-500 hover:text-brand-dark transition-colors">
              إلغاء
            </button>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={startNew}
            className="bg-brand-dark text-white font-bold px-5 py-2.5 rounded-xl hover:bg-slate-700 transition-colors text-sm"
          >
            + إضافة جديد
          </button>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {items.length === 0 && <div className="p-6 text-sm text-slate-500 text-center">لا يوجد عناصر بعد</div>}
            {items.map((item) => {
              const id = (item as { id: string }).id;
              const img = itemImage?.(item);
              return (
                <div key={id} className="flex items-center gap-4 p-4 bg-white hover:bg-slate-50 transition-colors">
                  {img && <img src={img} alt="" className="w-14 h-14 rounded-xl object-cover border border-slate-200 bg-slate-100 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-brand-dark truncate">{itemTitle(item)}</div>
                    <div className="text-xs text-slate-400">ترتيب: {(item as { order?: number }).order ?? "-"}</div>
                  </div>
                  {confirmDelete === id ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => remove(id)}
                        disabled={busy}
                        className="text-xs font-bold px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        تأكيد الحذف
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(null)}
                        className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                      >
                        تراجع
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-100 text-brand-dark hover:bg-slate-200 transition-colors"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(id)}
                        className="text-xs font-bold px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </SectionCard>
  );
}

// ---------- rows editors for settings arrays ----------

function SocialsEditor({ socials, onChange }: { socials: Settings["socials"]; onChange: (v: Settings["socials"]) => void }) {
  return (
    <div className="space-y-3">
      {socials.map((s, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_auto] gap-3 items-end border border-slate-200 rounded-xl p-3">
          <TextInput label="الاسم" value={s.label} onChange={(v) => onChange(socials.map((x, j) => (j === i ? { ...x, label: v } : x)))} />
          <TextInput label="الرابط" value={s.url} onChange={(v) => onChange(socials.map((x, j) => (j === i ? { ...x, url: v } : x)))} dir="ltr" />
          <SelectInput
            label="الأيقونة"
            value={s.icon}
            onChange={(v) => onChange(socials.map((x, j) => (j === i ? { ...x, icon: v } : x)))}
            options={SOCIAL_ICON_OPTIONS}
          />
          <button
            type="button"
            onClick={() => onChange(socials.filter((_, j) => j !== i))}
            className="text-xs font-bold px-3 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            حذف
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...socials, { label: "", url: "", icon: "link" }])}
        className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-brand-dark hover:bg-slate-200 transition-colors"
      >
        + إضافة رابط
      </button>
    </div>
  );
}

// ---------- login ----------

function LoginScreen({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل تسجيل الدخول");
      onLoggedIn();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "فشل تسجيل الدخول");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-secondary flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-3xl font-arabic font-bold text-brand-accent mb-2">مرايا</div>
          <h1 className="text-lg font-bold text-brand-dark">لوحة التحكم</h1>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <Field label="البريد الإلكتروني">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} dir="ltr" />
          </Field>
          <Field label="كلمة المرور">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputCls} dir="ltr" />
          </Field>
          {err && <div className="text-sm text-red-600 font-bold">{err}</div>}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            {busy ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- main app ----------

const SECTIONS = [
  { id: "home", label: "الرئيسية" },
  { id: "hero", label: "الواجهة الرئيسية" },
  { id: "about", label: "عن المركز" },
  { id: "impact", label: "إحصائيات الأداء" },
  { id: "stats", label: "إحصائيات الإنتاج" },
  { id: "services", label: "الخدمات" },
  { id: "team", label: "الفريق" },
  { id: "news", label: "الأخبار" },
  { id: "videos", label: "الفيديوهات" },
  { id: "heads", label: "عناوين الأقسام" },
  { id: "contact", label: "التواصل والسوشيال" },
  { id: "footer", label: "التذييل" },
  { id: "account", label: "الحساب" },
];

export default function AdminApp() {
  const [status, setStatus] = useState<Status | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [section, setSection] = useState("home");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadErr, setLoadErr] = useState("");

  // account form
  const [accEmail, setAccEmail] = useState("");
  const [accCurrent, setAccCurrent] = useState("");
  const [accNew, setAccNew] = useState("");
  const [accMsg, setAccMsg] = useState("");
  const [accErr, setAccErr] = useState("");
  const [accBusy, setAccBusy] = useState(false);

  const loadStatus = useCallback(async () => {
    const res = await fetch("/api/admin/status", { cache: "no-store" });
    const s = (await res.json()) as Status;
    setStatus(s);
    return s;
  }, []);

  const loadContent = useCallback(async () => {
    setLoadErr("");
    try {
      const res = await fetch("/api/admin/content", { cache: "no-store" });
      if (!res.ok) throw new Error("فشل تحميل المحتوى");
      const data = (await res.json()) as SiteContent;
      setContent(data);
      setSettings(JSON.parse(JSON.stringify(data.settings)) as Settings);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "فشل تحميل المحتوى");
    }
  }, []);

  useEffect(() => {
    loadStatus().then((s) => {
      if (s.loggedIn) {
        setAccEmail(s.email || "");
        loadContent();
      }
    });
  }, [loadStatus, loadContent]);

  const saveSettingsSection = async () => {
    if (!settings) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      if (!res.ok) throw new Error("فشل الحفظ");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
      loadContent();
    } catch {
      alert("فشل الحفظ، حاول مرة أخرى");
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setContent(null);
    setSettings(null);
    const s = await loadStatus();
    setStatus({ ...s, loggedIn: false });
  };

  const saveAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccBusy(true);
    setAccMsg("");
    setAccErr("");
    try {
      const res = await fetch("/api/admin/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: accCurrent,
          newEmail: accEmail,
          newPassword: accNew || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الحفظ");
      setAccMsg("تم تحديث بيانات الحساب");
      setAccCurrent("");
      setAccNew("");
      if (data.email) setAccEmail(data.email);
    } catch (e2) {
      setAccErr(e2 instanceof Error ? e2.message : "فشل الحفظ");
    } finally {
      setAccBusy(false);
    }
  };

  if (!status) {
    return (
      <div className="min-h-screen bg-brand-secondary flex items-center justify-center">
        <div className="text-slate-400 font-bold">جاري التحميل...</div>
      </div>
    );
  }

  if (!status.db || !status.auth) {
    return (
      <div className="min-h-screen bg-brand-secondary flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 w-full max-w-md text-center">
          <div className="text-3xl font-arabic font-bold text-brand-accent mb-4">مرايا</div>
          <h1 className="text-lg font-bold text-brand-dark mb-3">لوحة التحكم غير مفعّلة بعد</h1>
          <p className="text-sm text-slate-500 leading-relaxed">يتم حالياً تجهيز لوحة التحكم وقاعدة البيانات. الموقع يعمل بشكل طبيعي بمحتواه الحالي.</p>
        </div>
      </div>
    );
  }

  if (!status.loggedIn) {
    return (
      <LoginScreen
        onLoggedIn={() => {
          loadStatus().then((s) => {
            setAccEmail(s.email || "");
            loadContent();
          });
        }}
      />
    );
  }

  if (!content || !settings) {
    return (
      <div className="min-h-screen bg-brand-secondary flex items-center justify-center px-6">
        <div className="text-slate-400 font-bold">{loadErr || "جاري تحميل المحتوى..."}</div>
      </div>
    );
  }

  const upd = (patch: Partial<Settings>) => setSettings({ ...settings, ...patch });

  return (
    <div className="min-h-screen bg-brand-secondary">
      {/* top bar */}
      <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-arabic font-bold tracking-tight">مرايا</span>
          <span className="text-[11px] font-bold text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1">لوحة التحكم</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-xs font-bold text-white/70 hover:text-white transition-colors">
            عرض الموقع ↗
          </a>
          <button type="button" onClick={logout} className="text-xs font-bold text-white/70 hover:text-white transition-colors">
            تسجيل الخروج
          </button>
        </div>
      </div>

      {/* section nav */}
      <div className="bg-white border-b border-slate-200 sticky top-[60px] z-30">
        <div className="flex overflow-x-auto px-4 gap-1" style={{ scrollbarWidth: "none" }}>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`whitespace-nowrap px-4 py-3.5 text-sm font-bold border-b-2 transition-colors ${
                section === s.id ? "border-brand-dark text-brand-dark" : "border-transparent text-slate-400 hover:text-brand-dark"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {section === "home" && (
          <>
            <SectionCard title="أهلاً بك في لوحة تحكم مرايا">
              <p className="text-sm text-slate-600 leading-relaxed">
                من هنا تقدر تتحكم في كل محتوى الموقع: الفريق، الإنجازات والأرقام، الأخبار، الخدمات، الفيديوهات، وكل النصوص والصور والروابط. أي تعديل تحفظه
                يظهر على الموقع مباشرة.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {[
                  { label: "أعضاء الفريق", count: content.team.length },
                  { label: "الخدمات", count: content.services.length },
                  { label: "الأخبار", count: content.news.length },
                  { label: "إحصائيات الإنتاج", count: content.stats.length },
                ].map((c) => (
                  <div key={c.label} className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                    <div className="text-3xl font-bold text-brand-dark">{c.count}</div>
                    <div className="text-xs text-slate-500 font-bold mt-1">{c.label}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="ملاحظات مهمة">
              <ul className="text-sm text-slate-600 leading-relaxed list-disc pr-5 space-y-2">
                <li>التعديلات تظهر على الموقع فور الضغط على حفظ.</li>
                <li>في قسم الأخبار: حقل التاريخ اختياري، لو كتبت تاريخ هيظهر على الخبر في الموقع.</li>
                <li>تقدر ترفع صور جديدة من جهازك في أي حقل صورة.</li>
              </ul>
            </SectionCard>
          </>
        )}

        {section === "hero" && (
          <SectionCard title="الواجهة الرئيسية (أول ما يظهر في الموقع)">
            <TextInput label="العنوان الرئيسي" value={settings.hero.title} onChange={(v) => upd({ hero: { ...settings.hero, title: v } })} />
            <TextArea label="النص التعريفي" value={settings.hero.subtitle} onChange={(v) => upd({ hero: { ...settings.hero, subtitle: v } })} rows={4} />
            <ImageField label="صورة الخلفية" value={settings.hero.image} onChange={(v) => upd({ hero: { ...settings.hero, image: v } })} />
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="نص الزر الأول" value={settings.hero.ctaPrimaryLabel} onChange={(v) => upd({ hero: { ...settings.hero, ctaPrimaryLabel: v } })} />
              <TextInput label="رابط الزر الأول" value={settings.hero.ctaPrimaryHref} onChange={(v) => upd({ hero: { ...settings.hero, ctaPrimaryHref: v } })} dir="ltr" />
              <TextInput label="نص الزر الثاني" value={settings.hero.ctaSecondaryLabel} onChange={(v) => upd({ hero: { ...settings.hero, ctaSecondaryLabel: v } })} />
              <TextInput
                label="رابط الزر الثاني"
                value={settings.hero.ctaSecondaryHref}
                onChange={(v) => upd({ hero: { ...settings.hero, ctaSecondaryHref: v } })}
                dir="ltr"
              />
            </div>
            <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
          </SectionCard>
        )}

        {section === "about" && (
          <SectionCard title="قسم عن المركز">
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="الكلمة الصغيرة فوق العنوان" value={settings.about.kicker} onChange={(v) => upd({ about: { ...settings.about, kicker: v } })} />
              <TextInput label="العنوان" value={settings.about.title} onChange={(v) => upd({ about: { ...settings.about, title: v } })} />
            </div>
            <TextArea
              label="الفقرات (كل فقرة في سطر)"
              value={settings.about.paragraphs.join("\n")}
              onChange={(v) => upd({ about: { ...settings.about, paragraphs: v.split("\n").filter((p) => p.trim()) } })}
              rows={8}
            />
            <TextInput label="عنوان المربع المميز" value={settings.about.boxTitle} onChange={(v) => upd({ about: { ...settings.about, boxTitle: v } })} />
            <TextArea label="نص المربع المميز" value={settings.about.boxText} onChange={(v) => upd({ about: { ...settings.about, boxText: v } })} rows={3} />
            <TextArea label="الجملة الختامية" value={settings.about.tagline} onChange={(v) => upd({ about: { ...settings.about, tagline: v } })} rows={2} />
            <ImageField label="الصورة" value={settings.about.image} onChange={(v) => upd({ about: { ...settings.about, image: v } })} />
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="رقم الشارة (مثال: 10+)" value={settings.about.badgeValue} onChange={(v) => upd({ about: { ...settings.about, badgeValue: v } })} />
              <TextInput label="نص الشارة" value={settings.about.badgeText} onChange={(v) => upd({ about: { ...settings.about, badgeText: v } })} />
            </div>
            <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
          </SectionCard>
        )}

        {section === "impact" && (
          <SectionCard title="إحصائيات الأداء (الأشرطة والصور)">
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="الكلمة الصغيرة فوق العنوان" value={settings.impact.kicker} onChange={(v) => upd({ impact: { ...settings.impact, kicker: v } })} />
              <TextInput label="العنوان" value={settings.impact.title} onChange={(v) => upd({ impact: { ...settings.impact, title: v } })} />
            </div>
            <TextArea label="النص" value={settings.impact.text} onChange={(v) => upd({ impact: { ...settings.impact, text: v } })} rows={3} />
            <div className="space-y-3">
              <label className={labelCls}>الأشرطة</label>
              {settings.impact.bars.map((bar, i) => (
                <div key={i} className="grid grid-cols-[2fr_1fr_1fr_auto] gap-3 items-end border border-slate-200 rounded-xl p-3">
                  <TextInput label="الاسم" value={bar.label} onChange={(v) => upd({ impact: { ...settings.impact, bars: settings.impact.bars.map((b, j) => (j === i ? { ...b, label: v } : b)) } })} />
                  <NumberInput
                    label="النسبة %"
                    value={bar.value}
                    onChange={(v) => upd({ impact: { ...settings.impact, bars: settings.impact.bars.map((b, j) => (j === i ? { ...b, value: Math.max(0, Math.min(100, v)) } : b)) } })}
                  />
                  <SelectInput
                    label="اللون"
                    value={bar.color}
                    onChange={(v) => upd({ impact: { ...settings.impact, bars: settings.impact.bars.map((b, j) => (j === i ? { ...b, color: v } : b)) } })}
                    options={[
                      { value: "bg-blue-600", label: "أزرق" },
                      { value: "bg-indigo-600", label: "نيلي" },
                      { value: "bg-brand-accent", label: "أسود" },
                      { value: "bg-slate-800", label: "رمادي غامق" },
                    ]}
                  />
                  <button
                    type="button"
                    onClick={() => upd({ impact: { ...settings.impact, bars: settings.impact.bars.filter((_, j) => j !== i) } })}
                    className="text-xs font-bold px-3 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => upd({ impact: { ...settings.impact, bars: [...settings.impact.bars, { label: "", value: 50, color: "bg-brand-accent" }] } })}
                className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-brand-dark hover:bg-slate-200 transition-colors"
              >
                + إضافة شريط
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {settings.impact.images.map((img, i) => (
                <ImageField
                  key={i}
                  label={`صورة ${i + 1}`}
                  value={img}
                  onChange={(v) => upd({ impact: { ...settings.impact, images: settings.impact.images.map((x, j) => (j === i ? v : x)) } })}
                />
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="رقم الشارة الدائرية" value={settings.impact.badgeValue} onChange={(v) => upd({ impact: { ...settings.impact, badgeValue: v } })} />
              <TextInput label="نص الشارة الدائرية" value={settings.impact.badgeText} onChange={(v) => upd({ impact: { ...settings.impact, badgeText: v } })} />
            </div>
            <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
          </SectionCard>
        )}

        {section === "stats" && (
          <ItemsEditor
            type="stat"
            title="إحصائيات الإنتاج (الأرقام الستة)"
            hint="الرقم المسلسل يظهر في الزاوية، والقيمة تظهر كبيرة مع علامة +"
            items={content.stats}
            fields={[
              { key: "num", label: "الرقم المسلسل (01، 02...)", kind: "text", dir: "ltr" },
              { key: "title", label: "العنوان", kind: "text" },
              { key: "value", label: "القيمة", kind: "text", dir: "ltr" },
              { key: "subtitle", label: "الوصف الصغير", kind: "text" },
              { key: "icon", label: "الأيقونة", kind: "select", options: ITEM_ICON_OPTIONS },
              { key: "order", label: "الترتيب", kind: "number" },
            ]}
            blankItem={() => ({ num: "07", title: "", value: "", subtitle: "", icon: "palette", order: content.stats.length + 1 })}
            itemTitle={(i) => (i as StatItem).title}
            onRefresh={loadContent}
          />
        )}

        {section === "services" && (
          <ItemsEditor
            type="service"
            title="الخدمات"
            items={content.services}
            fields={[
              { key: "title", label: "اسم الخدمة", kind: "text" },
              { key: "desc", label: "الوصف", kind: "textarea", rows: 3 },
              { key: "img", label: "الصورة", kind: "image" },
              { key: "icon", label: "الأيقونة", kind: "select", options: ITEM_ICON_OPTIONS },
              { key: "order", label: "الترتيب", kind: "number" },
            ]}
            blankItem={() => ({ title: "", desc: "", img: "", icon: "megaphone", order: content.services.length + 1 })}
            itemTitle={(i) => (i as ServiceItem).title}
            itemImage={(i) => (i as ServiceItem).img}
            onRefresh={loadContent}
          />
        )}

        {section === "team" && (
          <ItemsEditor
            type="team"
            title="فريق العمل"
            items={content.team}
            fields={[
              { key: "name", label: "الاسم", kind: "text" },
              { key: "role", label: "المسمى بالإنجليزي", kind: "text", dir: "ltr" },
              { key: "desc", label: "الوصف", kind: "textarea", rows: 2 },
              {
                key: "category",
                label: "القسم",
                kind: "select",
                options: TEAM_CATEGORIES.map((c) => ({ value: c, label: c })),
              },
              { key: "img", label: "الصورة", kind: "image" },
              { key: "order", label: "الترتيب داخل القسم", kind: "number" },
            ]}
            blankItem={() => ({ name: "", role: "", desc: "", category: TEAM_CATEGORIES[0], img: "", order: content.team.length + 1 })}
            itemTitle={(i) => `${(i as TeamMember).name} — ${(i as TeamMember).category}`}
            itemImage={(i) => (i as TeamMember).img}
            onRefresh={loadContent}
          />
        )}

        {section === "news" && (
          <ItemsEditor
            type="news"
            title="الأخبار"
            hint="التاريخ اختياري: لو كتبته هيظهر على الخبر في الموقع، وسيبه فاضي لو مش عايز تاريخ"
            items={content.news}
            fields={[
              { key: "title", label: "العنوان", kind: "text" },
              { key: "date", label: "التاريخ (اختياري، مثال: نوفمبر 2026)", kind: "text" },
              { key: "desc", label: "الوصف", kind: "textarea", rows: 3 },
              { key: "img", label: "الصورة", kind: "image" },
              { key: "order", label: "الترتيب", kind: "number" },
            ]}
            blankItem={() => ({ date: "", title: "", desc: "", img: "", order: content.news.length + 1 })}
            itemTitle={(i) => (i as NewsItem).title}
            itemImage={(i) => (i as NewsItem).img}
            onRefresh={loadContent}
          />
        )}

        {section === "videos" && (
          <SectionCard title="أقسام الفيديو" hint="الفيديو الأول يظهر شمال والتاني يمين بالتبادل">
            {settings.videos.map((video, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl p-5 space-y-4">
                <h3 className="font-bold text-brand-dark">فيديو {i + 1}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput
                    label="الكلمة الصغيرة فوق العنوان"
                    value={video.kicker}
                    onChange={(v) => upd({ videos: settings.videos.map((x, j) => (j === i ? { ...x, kicker: v } : x)) })}
                  />
                  <TextInput label="العنوان" value={video.title} onChange={(v) => upd({ videos: settings.videos.map((x, j) => (j === i ? { ...x, title: v } : x)) })} />
                </div>
                <TextArea label="النص" value={video.text} onChange={(v) => upd({ videos: settings.videos.map((x, j) => (j === i ? { ...x, text: v } : x)) })} rows={3} />
                <TextArea
                  label="النقاط (كل نقطة في سطر)"
                  value={video.bullets.join("\n")}
                  onChange={(v) => upd({ videos: settings.videos.map((x, j) => (j === i ? { ...x, bullets: v.split("\n").filter((b) => b.trim()) } : x)) })}
                  rows={3}
                />
                <TextInput
                  label="رابط الفيديو (YouTube embed)"
                  value={video.embedUrl}
                  onChange={(v) => upd({ videos: settings.videos.map((x, j) => (j === i ? { ...x, embedUrl: v } : x)) })}
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => upd({ videos: settings.videos.filter((_, j) => j !== i) })}
                  className="text-xs font-bold px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  حذف هذا القسم
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => upd({ videos: [...settings.videos, { kicker: "", title: "", text: "", bullets: [], embedUrl: "" }] })}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-brand-dark hover:bg-slate-200 transition-colors"
            >
              + إضافة قسم فيديو
            </button>
            <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
          </SectionCard>
        )}

        {section === "heads" && (
          <SectionCard title="عناوين الأقسام">
            <h3 className="font-bold text-brand-dark pt-2">إحصائيات الإنتاج</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="الكلمة الصغيرة" value={settings.featuresHead.kicker} onChange={(v) => upd({ featuresHead: { ...settings.featuresHead, kicker: v } })} />
              <TextInput label="العنوان" value={settings.featuresHead.title} onChange={(v) => upd({ featuresHead: { ...settings.featuresHead, title: v } })} />
            </div>
            <TextInput label="الجملة الختامية" value={settings.featuresHead.quote} onChange={(v) => upd({ featuresHead: { ...settings.featuresHead, quote: v } })} />
            <h3 className="font-bold text-brand-dark pt-4">الخدمات</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="الكلمة الصغيرة" value={settings.servicesHead.kicker} onChange={(v) => upd({ servicesHead: { ...settings.servicesHead, kicker: v } })} />
              <TextInput label="العنوان" value={settings.servicesHead.title} onChange={(v) => upd({ servicesHead: { ...settings.servicesHead, title: v } })} />
            </div>
            <h3 className="font-bold text-brand-dark pt-4">الفريق</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="الكلمة الصغيرة" value={settings.teamHead.kicker} onChange={(v) => upd({ teamHead: { ...settings.teamHead, kicker: v } })} />
              <TextInput label="العنوان" value={settings.teamHead.title} onChange={(v) => upd({ teamHead: { ...settings.teamHead, title: v } })} />
            </div>
            <TextInput label="النص تحت العنوان" value={settings.teamHead.text} onChange={(v) => upd({ teamHead: { ...settings.teamHead, text: v } })} />
            <h3 className="font-bold text-brand-dark pt-4">الأخبار</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="الكلمة الصغيرة" value={settings.newsHead.kicker} onChange={(v) => upd({ newsHead: { ...settings.newsHead, kicker: v } })} />
              <TextInput label="العنوان" value={settings.newsHead.title} onChange={(v) => upd({ newsHead: { ...settings.newsHead, title: v } })} />
            </div>
            <TextInput label="النص تحت العنوان" value={settings.newsHead.text} onChange={(v) => upd({ newsHead: { ...settings.newsHead, text: v } })} />
            <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
          </SectionCard>
        )}

        {section === "contact" && (
          <>
            <SectionCard title="بيانات التواصل">
              <TextInput label="عنوان القسم" value={settings.contact.title} onChange={(v) => upd({ contact: { ...settings.contact, title: v } })} />
              <TextArea label="النص التعريفي" value={settings.contact.text} onChange={(v) => upd({ contact: { ...settings.contact, text: v } })} rows={3} />
              <TextInput label="اسم المكان" value={settings.contact.addressLabel} onChange={(v) => upd({ contact: { ...settings.contact, addressLabel: v } })} />
              <TextArea label="العنوان بالتفصيل" value={settings.contact.addressText} onChange={(v) => upd({ contact: { ...settings.contact, addressText: v } })} rows={2} />
              <TextInput label="رابط العنوان على الخريطة" value={settings.contact.addressUrl} onChange={(v) => upd({ contact: { ...settings.contact, addressUrl: v } })} dir="ltr" />
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="رقم التليفون" value={settings.contact.phone} onChange={(v) => upd({ contact: { ...settings.contact, phone: v } })} dir="ltr" />
                <TextInput
                  label="رقم الواتساب (بالكود الدولي بدون +)"
                  value={settings.contact.whatsapp}
                  onChange={(v) => upd({ contact: { ...settings.contact, whatsapp: v } })}
                  dir="ltr"
                />
              </div>
              <TextInput label="نص زر الواتساب" value={settings.contact.whatsappLabel} onChange={(v) => upd({ contact: { ...settings.contact, whatsappLabel: v } })} />
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="البريد الإلكتروني" value={settings.contact.email} onChange={(v) => upd({ contact: { ...settings.contact, email: v } })} dir="ltr" />
                <TextInput label="ساعات العمل" value={settings.contact.hours} onChange={(v) => upd({ contact: { ...settings.contact, hours: v } })} />
              </div>
              <TextInput label="رابط خريطة جوجل (embed)" value={settings.mapEmbedUrl} onChange={(v) => upd({ mapEmbedUrl: v })} dir="ltr" />
              <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
            </SectionCard>
            <SectionCard title="روابط السوشيال ميديا (تظهر في قسم التواصل)">
              <SocialsEditor socials={settings.socials} onChange={(v) => upd({ socials: v })} />
              <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
            </SectionCard>
          </>
        )}

        {section === "footer" && (
          <SectionCard title="التذييل">
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput label="اسم البراند" value={settings.footer.brand} onChange={(v) => upd({ footer: { ...settings.footer, brand: v } })} />
            </div>
            <TextArea label="النص التعريفي" value={settings.footer.about} onChange={(v) => upd({ footer: { ...settings.footer, about: v } })} rows={3} />
            <div className="grid md:grid-cols-2 gap-4">
              <TextInput
                label="سطر الحقوق (يظهر بعد © والسنة)"
                value={settings.footer.rights ?? "مرايا. جميع الحقوق محفوظة."}
                onChange={(v) => upd({ footer: { ...settings.footer, rights: v } })}
              />
              <TextInput
                label="سطر التصميم والتطوير"
                value={settings.footer.credit ?? "تصميم وتطوير الموقع بواسطة Hexa Plus"}
                onChange={(v) => upd({ footer: { ...settings.footer, credit: v } })}
              />
            </div>
            <div className="space-y-3">
              <label className={labelCls}>الكتالوجات</label>
              {settings.footer.catalogs.map((catalog, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-3 items-end border border-slate-200 rounded-xl p-3">
                  <TextInput
                    label="الاسم"
                    value={catalog.label}
                    onChange={(v) => upd({ footer: { ...settings.footer, catalogs: settings.footer.catalogs.map((x, j) => (j === i ? { ...x, label: v } : x)) } })}
                  />
                  <TextInput
                    label="الرابط"
                    value={catalog.url}
                    onChange={(v) => upd({ footer: { ...settings.footer, catalogs: settings.footer.catalogs.map((x, j) => (j === i ? { ...x, url: v } : x)) } })}
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => upd({ footer: { ...settings.footer, catalogs: settings.footer.catalogs.filter((_, j) => j !== i) } })}
                    className="text-xs font-bold px-3 py-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => upd({ footer: { ...settings.footer, catalogs: [...settings.footer.catalogs, { label: "", url: "" }] } })}
                className="text-xs font-bold px-4 py-2 rounded-lg bg-slate-100 text-brand-dark hover:bg-slate-200 transition-colors"
              >
                + إضافة كتالوج
              </button>
            </div>
            <div className="space-y-3">
              <label className={labelCls}>روابط تابعنا في التذييل</label>
              <SocialsEditor socials={settings.footer.socials} onChange={(v) => upd({ footer: { ...settings.footer, socials: v } })} />
            </div>
            <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
          </SectionCard>
        )}

        {section === "account" && (
          <SectionCard title="بيانات الدخول" hint="من هنا تقدر تغير الإيميل أو كلمة المرور بتاعة لوحة التحكم">
            <form onSubmit={saveAccount} className="space-y-5">
              <Field label="البريد الإلكتروني">
                <input type="email" value={accEmail} onChange={(e) => setAccEmail(e.target.value)} required className={inputCls} dir="ltr" />
              </Field>
              <Field label="كلمة المرور الحالية (مطلوبة للتأكيد)">
                <input type="password" value={accCurrent} onChange={(e) => setAccCurrent(e.target.value)} required className={inputCls} dir="ltr" />
              </Field>
              <Field label="كلمة المرور الجديدة (سيبها فاضية لو مش عايز تغيرها)">
                <input type="password" value={accNew} onChange={(e) => setAccNew(e.target.value)} className={inputCls} dir="ltr" />
              </Field>
              {accErr && <div className="text-sm text-red-600 font-bold">{accErr}</div>}
              {accMsg && <div className="text-sm text-green-600 font-bold">{accMsg}</div>}
              <button
                type="submit"
                disabled={accBusy}
                className="bg-brand-dark text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {accBusy ? "جاري الحفظ..." : "تحديث الحساب"}
              </button>
            </form>
          </SectionCard>
        )}
      </div>
    </div>
  );
}
