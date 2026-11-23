"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  NewsItem,
  ServiceItem,
  Settings,
  SettingsEn,
  SiteContent,
  StatItem,
  TEAM_CATEGORIES,
  TeamMember,
} from "@/lib/content";
import { ITEM_ICON_OPTIONS, SOCIAL_ICON_OPTIONS } from "@/lib/icons";

type Status = { db: boolean; auth: boolean; loggedIn: boolean; email: string | null };
type AnyItem = StatItem | ServiceItem | TeamMember | NewsItem;

const inputCls =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm shadow-sm focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/15 transition-all outline-none placeholder:text-slate-300";

const THEATER_IMG =
  "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1600&q=80&auto=format&fit=crop";
const labelCls = "block text-xs font-bold text-slate-500 mb-1.5";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function EnBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-dashed border-slate-300 rounded-2xl p-4 space-y-4 bg-slate-50/60">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest" dir="ltr">
        English translation / الترجمة الإنجليزية
      </div>
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

function TextArea({ label, value, onChange, rows = 3, dir }: { label: string; value: string; onChange: (v: string) => void; rows?: number; dir?: "ltr" }) {
  return (
    <Field label={label}>
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={`${inputCls} resize-y`} dir={dir} />
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
        className="bg-gradient-to-l from-brand-gold to-brand-gold-deep text-brand-charcoal font-bold px-10 py-3 rounded-xl hover:brightness-105 active:scale-[0.98] transition-all shadow-md shadow-brand-gold/25 hover:shadow-lg hover:shadow-brand-gold/30 disabled:opacity-50"
      >
        {saving ? "جاري الحفظ..." : "حفظ التعديلات"}
      </button>
      {saved && <span className="text-green-600 text-sm font-bold">تم الحفظ</span>}
    </div>
  );
}

function SectionCard({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 md:p-8 space-y-5 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-brand-gold to-brand-gold-deep shrink-0" />
        <div>
          <h2 className="text-xl font-arabic font-bold text-brand-dark">{title}</h2>
          {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
        </div>
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
            className="bg-brand-charcoal text-brand-gold font-bold px-5 py-2.5 rounded-xl hover:bg-black transition-colors text-sm shadow-sm"
          >
            + إضافة جديد
          </button>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {items.length === 0 && (
              <div className="p-10 text-center space-y-2 bg-gradient-to-b from-brand-gold-soft/40 to-transparent">
                <div className="text-2xl">🎭</div>
                <div className="text-sm font-bold text-brand-dark">لا توجد عناصر بعد</div>
                <div className="text-xs text-slate-400">ابدأ بإضافة أول عنصر من الزر بالأعلى</div>
              </div>
            )}
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
    <div className="min-h-screen bg-brand-charcoal flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* soft gold glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-gold/15 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-gold/10 blur-[140px]" />
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl shadow-black/40 overflow-hidden grid md:grid-cols-2 animate-scale-in">
        {/* decorative panel */}
        <div className="relative hidden md:block min-h-[460px]">
          <img src={THEATER_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-brand-charcoal/10" />
          <div className="relative h-full flex flex-col justify-end p-8 text-white">
            <div className="text-brand-gold text-xs font-bold tracking-widest mb-2">مركز مرايا للفنون</div>
            <div className="text-3xl font-arabic font-bold mb-2">مرايا</div>
            <p className="text-sm text-white/75 leading-relaxed">
              لوحة تحكم محتوى موقع مركز مرايا للفنون. عدّل النصوص والصور والفريق والأخبار من مكان واحد، وتظهر التعديلات على الموقع فوراً.
            </p>
          </div>
        </div>
        {/* form panel */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="text-3xl font-arabic font-bold text-brand-gold mb-2 md:hidden">مرايا</div>
            <h1 className="text-lg font-bold text-brand-dark">لوحة التحكم</h1>
            <div className="w-10 h-0.5 bg-gradient-to-l from-brand-gold to-brand-gold-deep rounded-full mx-auto my-3" />
            <p className="text-xs text-slate-400 font-bold mt-1">سجّل دخولك لإدارة محتوى الموقع</p>
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
              className="w-full bg-gradient-to-l from-brand-gold to-brand-gold-deep text-brand-charcoal font-bold py-3.5 rounded-xl hover:brightness-105 active:scale-[0.98] transition-all shadow-md shadow-brand-gold/25 disabled:opacity-50"
            >
              {busy ? "جاري الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ---------- main app ----------

function NavIcon({ d, className = "w-5 h-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5",
  hero: "M4 5h16v14H4zM4 10h16",
  about: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8h.01M12 12v4",
  impact: "M4 20V10m5 10V4m5 16v-7m5 7V7",
  stats: "M4 20h16M7 16v-5m5 5V8m5 8v-3",
  services: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  team: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 2.7-5 6-5s6 2 6 5M16 5.5a3 3 0 0 1 0 5.5M17.5 15.4c2 .6 3.5 2.1 3.5 4.6",
  news: "M4 5h13v14H6a2 2 0 0 1-2-2zM17 8h3v9a2 2 0 0 1-2 2M8 9h5M8 13h5",
  videos: "M4 6h16v12H4zM10 9.5l5 2.5-5 2.5z",
  heads: "M5 6h14M12 6v12",
  contact: "M4 6h16v12H4zM4 7.5l8 5.5 8-5.5",
  footer: "M4 5h16v14H4zM4 15h16",
  account: "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 20c0-3.3 2.7-6 6-6s6 2.7 6 6",
  external: "M14 4h6v6M20 4 10 14M9 5H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-4",
  logout: "M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l5-5-5-5M15 12H3",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6 6 18",
};

const SECTIONS = [
  { id: "home", label: "الرئيسية", icon: ICONS.home },
  { id: "hero", label: "الواجهة الرئيسية", icon: ICONS.hero },
  { id: "about", label: "عن المركز", icon: ICONS.about },
  { id: "impact", label: "إحصائيات الأداء", icon: ICONS.impact },
  { id: "stats", label: "إحصائيات الإنتاج", icon: ICONS.stats },
  { id: "services", label: "الخدمات", icon: ICONS.services },
  { id: "team", label: "الفريق", icon: ICONS.team },
  { id: "news", label: "الأخبار", icon: ICONS.news },
  { id: "videos", label: "الفيديوهات", icon: ICONS.videos },
  { id: "heads", label: "عناوين الأقسام", icon: ICONS.heads },
  { id: "contact", label: "التواصل والسوشيال", icon: ICONS.contact },
  { id: "footer", label: "التذييل", icon: ICONS.footer },
  { id: "account", label: "الحساب", icon: ICONS.account },
];

export default function AdminApp() {
  const [status, setStatus] = useState<Status | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [section, setSection] = useState("home");
  const [navOpen, setNavOpen] = useState(false);
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
  const enUpd = <K extends keyof SettingsEn>(key: K, val: SettingsEn[K]) => upd({ en: { ...(settings.en ?? {}), [key]: val } });

  const currentLabel = SECTIONS.find((s) => s.id === section)?.label ?? "";

  return (
    <div className="min-h-screen bg-brand-secondary lg:flex">
      {/* mobile top bar */}
      <div className="lg:hidden bg-brand-charcoal text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-brand-gold/20">
        <button type="button" onClick={() => setNavOpen(true)} aria-label="فتح القائمة" className="p-2 -mr-2 text-brand-gold hover:text-brand-gold-soft">
          <NavIcon d={ICONS.menu} className="w-6 h-6" />
        </button>
        <span className="text-lg font-arabic font-bold text-brand-gold">مرايا</span>
        <a href="/" target="_blank" className="text-xs font-bold text-white/70 hover:text-white">
          عرض الموقع ↗
        </a>
      </div>

      {/* backdrop for mobile sidebar */}
      {navOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setNavOpen(false)} />}

      {/* sidebar */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 w-72 bg-gradient-to-b from-[#201b10] via-brand-charcoal to-brand-charcoal text-white flex flex-col transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:z-auto lg:shrink-0 lg:translate-x-0 ${
          navOpen ? "translate-x-0 shadow-2xl" : "translate-x-full"
        }`}
      >
        <div className="p-6 pb-5 flex items-start justify-between">
          <div>
            <div className="text-2xl font-arabic font-bold tracking-tight text-brand-gold">مرايا</div>
            <div className="text-[11px] text-white/45 font-bold mt-1">لوحة تحكم المحتوى</div>
          </div>
          <button type="button" onClick={() => setNavOpen(false)} aria-label="إغلاق القائمة" className="lg:hidden p-1 text-white/60 hover:text-white">
            <NavIcon d={ICONS.close} className="w-5 h-5" />
          </button>
        </div>
        <div className="mx-6 h-px bg-gradient-to-l from-transparent via-brand-gold/60 to-transparent" />
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setSection(s.id);
                setNavOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                section === s.id
                  ? "bg-gradient-to-l from-brand-gold to-brand-gold-deep text-brand-charcoal shadow-lg shadow-brand-gold/20"
                  : "text-white/55 hover:text-brand-gold-soft hover:bg-white/5"
              }`}
            >
              <NavIcon d={s.icon} className="w-5 h-5 shrink-0" />
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10 space-y-1">
          {status.email && (
            <div className="px-4 py-1.5 text-[11px] text-brand-gold/70 font-bold truncate" dir="ltr">
              {status.email}
            </div>
          )}
          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-white/55 hover:text-brand-gold-soft hover:bg-white/5 transition-colors"
          >
            <NavIcon d={ICONS.external} className="w-5 h-5 shrink-0" />
            عرض الموقع
          </a>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-white/55 hover:text-brand-gold-soft hover:bg-white/5 transition-colors"
          >
            <NavIcon d={ICONS.logout} className="w-5 h-5 shrink-0" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* main */}
      <main className="flex-1 min-w-0">
        <div className="hidden lg:flex items-center justify-between bg-white/80 backdrop-blur border-b border-slate-200 px-8 py-4 sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-bold text-brand-dark">{currentLabel}</h1>
            <div className="w-8 h-0.5 bg-gradient-to-l from-brand-gold to-brand-gold-deep rounded-full mt-1.5" />
          </div>
          <a href="/" target="_blank" className="text-xs font-bold text-slate-500 hover:text-brand-dark transition-colors">
            عرض الموقع ↗
          </a>
        </div>
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {section === "home" && (
          <>
            {/* theater welcome card */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl animate-fade-in-up">
              <img src={THEATER_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-brand-charcoal/95 via-brand-charcoal/70 to-brand-charcoal/30" />
              <div className="relative p-8 md:p-10 text-white">
                <div className="text-brand-gold text-[11px] font-bold tracking-[0.2em] mb-3">مركز مرايا للفنون</div>
                <h2 className="text-2xl md:text-3xl font-arabic font-bold mb-3">أهلاً بك في لوحة تحكم مرايا</h2>
                <p className="text-sm text-white/75 leading-relaxed max-w-lg">
                  من هنا تقدر تتحكم في كل محتوى الموقع: الفريق، الإنجازات والأرقام، الأخبار، الخدمات، الفيديوهات، وكل النصوص والصور والروابط. أي تعديل
                  تحفظه يظهر على الموقع مباشرة.
                </p>
              </div>
            </div>

            {/* stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "أعضاء الفريق", count: content.team.length, icon: ICONS.team, cls: "bg-gradient-to-br from-brand-gold to-brand-gold-deep text-brand-charcoal", iconCls: "bg-brand-charcoal/15 text-brand-charcoal" },
                { label: "الخدمات", count: content.services.length, icon: ICONS.services, cls: "bg-brand-charcoal text-white", iconCls: "bg-brand-gold/20 text-brand-gold" },
                { label: "الأخبار", count: content.news.length, icon: ICONS.news, cls: "bg-white text-brand-dark border border-slate-200/80", iconCls: "bg-brand-gold-soft text-brand-gold-deep" },
                { label: "إحصائيات الإنتاج", count: content.stats.length, icon: ICONS.stats, cls: "bg-white text-brand-dark border border-slate-200/80", iconCls: "bg-brand-charcoal/5 text-brand-charcoal" },
              ].map((c) => (
                <div
                  key={c.label}
                  className={`rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${c.cls}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.iconCls}`}>
                    <NavIcon d={c.icon} className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-bold">{c.count}</div>
                  <div className="text-xs font-bold mt-1 opacity-70">{c.label}</div>
                </div>
              ))}
            </div>

            <SectionCard title="ملاحظات مهمة">
              <ul className="text-sm text-slate-600 leading-relaxed space-y-2.5">
                {[
                  "التعديلات تظهر على الموقع فور الضغط على حفظ.",
                  "في قسم الأخبار: حقل التاريخ اختياري، لو كتبت تاريخ هيظهر على الخبر في الموقع.",
                  "تقدر ترفع صور جديدة من جهازك في أي حقل صورة.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                    {t}
                  </li>
                ))}
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
            <EnBlock>
              <TextInput label="Title (EN)" dir="ltr" value={settings.en?.hero?.title ?? ""} onChange={(v) => enUpd("hero", { ...(settings.en?.hero ?? {}), title: v })} />
              <TextArea label="Subtitle (EN)" dir="ltr" rows={3} value={settings.en?.hero?.subtitle ?? ""} onChange={(v) => enUpd("hero", { ...(settings.en?.hero ?? {}), subtitle: v })} />
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Primary button (EN)" dir="ltr" value={settings.en?.hero?.ctaPrimaryLabel ?? ""} onChange={(v) => enUpd("hero", { ...(settings.en?.hero ?? {}), ctaPrimaryLabel: v })} />
                <TextInput label="Secondary button (EN)" dir="ltr" value={settings.en?.hero?.ctaSecondaryLabel ?? ""} onChange={(v) => enUpd("hero", { ...(settings.en?.hero ?? {}), ctaSecondaryLabel: v })} />
              </div>
            </EnBlock>
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
            <EnBlock>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Kicker (EN)" dir="ltr" value={settings.en?.about?.kicker ?? ""} onChange={(v) => enUpd("about", { ...(settings.en?.about ?? {}), kicker: v })} />
                <TextInput label="Title (EN)" dir="ltr" value={settings.en?.about?.title ?? ""} onChange={(v) => enUpd("about", { ...(settings.en?.about ?? {}), title: v })} />
              </div>
              <TextArea
                label="Paragraphs (EN, one per line)"
                dir="ltr"
                rows={8}
                value={(settings.en?.about?.paragraphs ?? []).join("\n")}
                onChange={(v) => enUpd("about", { ...(settings.en?.about ?? {}), paragraphs: v.split("\n").filter((x) => x.trim()) })}
              />
              <TextInput label="Box title (EN)" dir="ltr" value={settings.en?.about?.boxTitle ?? ""} onChange={(v) => enUpd("about", { ...(settings.en?.about ?? {}), boxTitle: v })} />
              <TextArea label="Box text (EN)" dir="ltr" rows={3} value={settings.en?.about?.boxText ?? ""} onChange={(v) => enUpd("about", { ...(settings.en?.about ?? {}), boxText: v })} />
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Tagline (EN)" dir="ltr" value={settings.en?.about?.tagline ?? ""} onChange={(v) => enUpd("about", { ...(settings.en?.about ?? {}), tagline: v })} />
                <TextInput label="Badge text (EN)" dir="ltr" value={settings.en?.about?.badgeText ?? ""} onChange={(v) => enUpd("about", { ...(settings.en?.about ?? {}), badgeText: v })} />
              </div>
            </EnBlock>
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
                  <TextInput
                    label="الاسم (EN)"
                    dir="ltr"
                    value={settings.en?.impact?.bars?.[i]?.label ?? ""}
                    onChange={(v) => {
                      const arr = settings.impact.bars.map((_, j) => ({ label: settings.en?.impact?.bars?.[j]?.label ?? "" }));
                      arr[i] = { label: v };
                      enUpd("impact", { ...(settings.en?.impact ?? {}), bars: arr });
                    }}
                  />
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
            <EnBlock>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Kicker (EN)" dir="ltr" value={settings.en?.impact?.kicker ?? ""} onChange={(v) => enUpd("impact", { ...(settings.en?.impact ?? {}), kicker: v })} />
                <TextInput label="Title (EN)" dir="ltr" value={settings.en?.impact?.title ?? ""} onChange={(v) => enUpd("impact", { ...(settings.en?.impact ?? {}), title: v })} />
              </div>
              <TextArea label="Text (EN)" dir="ltr" rows={3} value={settings.en?.impact?.text ?? ""} onChange={(v) => enUpd("impact", { ...(settings.en?.impact ?? {}), text: v })} />
              <TextInput label="Badge text (EN)" dir="ltr" value={settings.en?.impact?.badgeText ?? ""} onChange={(v) => enUpd("impact", { ...(settings.en?.impact ?? {}), badgeText: v })} />
            </EnBlock>
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
              { key: "titleEn", label: "العنوان (EN)", kind: "text", dir: "ltr" },
              { key: "value", label: "القيمة", kind: "text", dir: "ltr" },
              { key: "subtitle", label: "الوصف الصغير", kind: "text" },
              { key: "subtitleEn", label: "الوصف الصغير (EN)", kind: "text", dir: "ltr" },
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
              { key: "titleEn", label: "اسم الخدمة (EN)", kind: "text", dir: "ltr" },
              { key: "desc", label: "الوصف", kind: "textarea", rows: 3 },
              { key: "descEn", label: "الوصف (EN)", kind: "textarea", rows: 3 },
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
              { key: "nameEn", label: "الاسم (EN)", kind: "text", dir: "ltr" },
              { key: "role", label: "المسمى بالإنجليزي", kind: "text", dir: "ltr" },
              { key: "roleEn", label: "المسمى (EN، لو مختلف)", kind: "text", dir: "ltr" },
              { key: "desc", label: "الوصف", kind: "textarea", rows: 2 },
              { key: "descEn", label: "الوصف (EN)", kind: "textarea", rows: 2 },
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
              { key: "titleEn", label: "العنوان (EN)", kind: "text", dir: "ltr" },
              { key: "date", label: "التاريخ (اختياري، مثال: نوفمبر 2026)", kind: "text" },
              { key: "desc", label: "الوصف", kind: "textarea", rows: 3 },
              { key: "descEn", label: "الوصف (EN)", kind: "textarea", rows: 3 },
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
                <EnBlock>
                  <div className="grid md:grid-cols-2 gap-4">
                    <TextInput
                      label="Kicker (EN)"
                      dir="ltr"
                      value={settings.en?.videos?.[i]?.kicker ?? ""}
                      onChange={(v) => {
                        const arr = settings.videos.map((_, j) => ({ ...(settings.en?.videos?.[j] ?? {}) }));
                        arr[i] = { ...arr[i], kicker: v };
                        enUpd("videos", arr);
                      }}
                    />
                    <TextInput
                      label="Title (EN)"
                      dir="ltr"
                      value={settings.en?.videos?.[i]?.title ?? ""}
                      onChange={(v) => {
                        const arr = settings.videos.map((_, j) => ({ ...(settings.en?.videos?.[j] ?? {}) }));
                        arr[i] = { ...arr[i], title: v };
                        enUpd("videos", arr);
                      }}
                    />
                  </div>
                  <TextArea
                    label="Text (EN)"
                    dir="ltr"
                    rows={3}
                    value={settings.en?.videos?.[i]?.text ?? ""}
                    onChange={(v) => {
                      const arr = settings.videos.map((_, j) => ({ ...(settings.en?.videos?.[j] ?? {}) }));
                      arr[i] = { ...arr[i], text: v };
                      enUpd("videos", arr);
                    }}
                  />
                  <TextArea
                    label="Bullets (EN, one per line)"
                    dir="ltr"
                    rows={3}
                    value={(settings.en?.videos?.[i]?.bullets ?? []).join("\n")}
                    onChange={(v) => {
                      const arr = settings.videos.map((_, j) => ({ ...(settings.en?.videos?.[j] ?? {}) }));
                      arr[i] = { ...arr[i], bullets: v.split("\n").filter((b) => b.trim()) };
                      enUpd("videos", arr);
                    }}
                  />
                </EnBlock>
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
            <EnBlock>
              <h3 className="font-bold text-slate-500 text-sm" dir="ltr">Production stats (EN)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Kicker" dir="ltr" value={settings.en?.featuresHead?.kicker ?? ""} onChange={(v) => enUpd("featuresHead", { ...(settings.en?.featuresHead ?? {}), kicker: v })} />
                <TextInput label="Title" dir="ltr" value={settings.en?.featuresHead?.title ?? ""} onChange={(v) => enUpd("featuresHead", { ...(settings.en?.featuresHead ?? {}), title: v })} />
              </div>
              <TextInput label="Closing quote" dir="ltr" value={settings.en?.featuresHead?.quote ?? ""} onChange={(v) => enUpd("featuresHead", { ...(settings.en?.featuresHead ?? {}), quote: v })} />
              <h3 className="font-bold text-slate-500 text-sm" dir="ltr">Services (EN)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Kicker" dir="ltr" value={settings.en?.servicesHead?.kicker ?? ""} onChange={(v) => enUpd("servicesHead", { ...(settings.en?.servicesHead ?? {}), kicker: v })} />
                <TextInput label="Title" dir="ltr" value={settings.en?.servicesHead?.title ?? ""} onChange={(v) => enUpd("servicesHead", { ...(settings.en?.servicesHead ?? {}), title: v })} />
              </div>
              <h3 className="font-bold text-slate-500 text-sm" dir="ltr">Team (EN)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Kicker" dir="ltr" value={settings.en?.teamHead?.kicker ?? ""} onChange={(v) => enUpd("teamHead", { ...(settings.en?.teamHead ?? {}), kicker: v })} />
                <TextInput label="Title" dir="ltr" value={settings.en?.teamHead?.title ?? ""} onChange={(v) => enUpd("teamHead", { ...(settings.en?.teamHead ?? {}), title: v })} />
              </div>
              <TextInput label="Text under title" dir="ltr" value={settings.en?.teamHead?.text ?? ""} onChange={(v) => enUpd("teamHead", { ...(settings.en?.teamHead ?? {}), text: v })} />
              <h3 className="font-bold text-slate-500 text-sm" dir="ltr">News (EN)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Kicker" dir="ltr" value={settings.en?.newsHead?.kicker ?? ""} onChange={(v) => enUpd("newsHead", { ...(settings.en?.newsHead ?? {}), kicker: v })} />
                <TextInput label="Title" dir="ltr" value={settings.en?.newsHead?.title ?? ""} onChange={(v) => enUpd("newsHead", { ...(settings.en?.newsHead ?? {}), title: v })} />
              </div>
              <TextInput label="Text under title" dir="ltr" value={settings.en?.newsHead?.text ?? ""} onChange={(v) => enUpd("newsHead", { ...(settings.en?.newsHead ?? {}), text: v })} />
            </EnBlock>
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
              <EnBlock>
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput label="Section title (EN)" dir="ltr" value={settings.en?.contact?.title ?? ""} onChange={(v) => enUpd("contact", { ...(settings.en?.contact ?? {}), title: v })} />
                  <TextInput label="Place name (EN)" dir="ltr" value={settings.en?.contact?.addressLabel ?? ""} onChange={(v) => enUpd("contact", { ...(settings.en?.contact ?? {}), addressLabel: v })} />
                </div>
                <TextArea label="Intro text (EN)" dir="ltr" rows={3} value={settings.en?.contact?.text ?? ""} onChange={(v) => enUpd("contact", { ...(settings.en?.contact ?? {}), text: v })} />
                <TextArea label="Full address (EN)" dir="ltr" rows={2} value={settings.en?.contact?.addressText ?? ""} onChange={(v) => enUpd("contact", { ...(settings.en?.contact ?? {}), addressText: v })} />
                <div className="grid md:grid-cols-2 gap-4">
                  <TextInput label="WhatsApp button text (EN)" dir="ltr" value={settings.en?.contact?.whatsappLabel ?? ""} onChange={(v) => enUpd("contact", { ...(settings.en?.contact ?? {}), whatsappLabel: v })} />
                  <TextInput label="Working hours (EN)" dir="ltr" value={settings.en?.contact?.hours ?? ""} onChange={(v) => enUpd("contact", { ...(settings.en?.contact ?? {}), hours: v })} />
                </div>
              </EnBlock>
              <SaveButton onSave={saveSettingsSection} saving={saving} saved={saved} />
            </SectionCard>
            <SectionCard title="روابط السوشيال ميديا (تظهر في قسم التواصل)">
              <SocialsEditor socials={settings.socials} onChange={(v) => upd({ socials: v })} />
              <EnBlock>
                {settings.socials.map((soc, i) => (
                  <TextInput
                    key={i}
                    label={`${soc.label} (EN)`}
                    dir="ltr"
                    value={settings.en?.socials?.[i]?.label ?? ""}
                    onChange={(v) => {
                      const arr = settings.socials.map((_, j) => ({ label: settings.en?.socials?.[j]?.label ?? "" }));
                      arr[i] = { label: v };
                      enUpd("socials", arr);
                    }}
                  />
                ))}
              </EnBlock>
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
            <EnBlock>
              <div className="grid md:grid-cols-2 gap-4">
                <TextInput label="Brand (EN)" dir="ltr" value={settings.en?.footer?.brand ?? ""} onChange={(v) => enUpd("footer", { ...(settings.en?.footer ?? {}), brand: v })} />
                <TextInput label="Rights line (EN, after © year)" dir="ltr" value={settings.en?.footer?.rights ?? ""} onChange={(v) => enUpd("footer", { ...(settings.en?.footer ?? {}), rights: v })} />
              </div>
              <TextArea label="About text (EN)" dir="ltr" rows={3} value={settings.en?.footer?.about ?? ""} onChange={(v) => enUpd("footer", { ...(settings.en?.footer ?? {}), about: v })} />
              <TextInput label="Credit line (EN)" dir="ltr" value={settings.en?.footer?.credit ?? ""} onChange={(v) => enUpd("footer", { ...(settings.en?.footer ?? {}), credit: v })} />
              {settings.footer.catalogs.map((catalog, i) => (
                <TextInput
                  key={i}
                  label={`${catalog.label} (EN)`}
                  dir="ltr"
                  value={settings.en?.footer?.catalogs?.[i]?.label ?? ""}
                  onChange={(v) => {
                    const arr = settings.footer.catalogs.map((_, j) => ({ label: settings.en?.footer?.catalogs?.[j]?.label ?? "" }));
                    arr[i] = { label: v };
                    enUpd("footer", { ...(settings.en?.footer ?? {}), catalogs: arr });
                  }}
                />
              ))}
            </EnBlock>
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
              <EnBlock>
                {settings.footer.socials.map((soc, i) => (
                  <TextInput
                    key={i}
                    label={`${soc.label} (EN)`}
                    dir="ltr"
                    value={settings.en?.footer?.socials?.[i]?.label ?? ""}
                    onChange={(v) => {
                      const arr = settings.footer.socials.map((_, j) => ({ label: settings.en?.footer?.socials?.[j]?.label ?? "" }));
                      arr[i] = { label: v };
                      enUpd("footer", { ...(settings.en?.footer ?? {}), socials: arr });
                    }}
                  />
                ))}
              </EnBlock>
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
      </main>
    </div>
  );
}
