"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "ar" | "en";

type LangCtx = { lang: Lang; toggle: () => void };

const Ctx = createContext<LangCtx>({ lang: "ar", toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (window.localStorage.getItem("mraya-lang") as Lang | null) : null;
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("mraya-lang", lang);
  }, [lang]);
  return <Ctx.Provider value={{ lang, toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")) }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

/** pick the English value when in EN mode, falling back to Arabic */
export function pick(lang: Lang, ar: string | undefined, en: string | undefined): string {
  if (lang === "en" && en && en.trim()) return en;
  return ar ?? "";
}

export const UI = {
  navHome: { ar: "الرئيسية", en: "Home" },
  navAbout: { ar: "عن المركز", en: "About" },
  navServices: { ar: "الخدمات", en: "Services" },
  navTeam: { ar: "الفريق", en: "Team" },
  navNews: { ar: "الأخبار", en: "News" },
  navContact: { ar: "اتصل بنا", en: "Contact" },
  quickLinks: { ar: "روابط سريعة", en: "Quick Links" },
  ourCatalogs: { ar: "كتالوجاتنا", en: "Our Catalogs" },
  followUs: { ar: "تابعنا", en: "Follow Us" },
  formName: { ar: "الاسم", en: "Name" },
  formEmail: { ar: "البريد الإلكتروني", en: "Email" },
  formSubject: { ar: "الموضوع", en: "Subject" },
  formMessage: { ar: "رسالتك", en: "Your message" },
  formSend: { ar: "إرسال الرسالة", en: "Send Message" },
  formSuccess: { ar: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.", en: "Your message was sent successfully! We will get back to you soon." },
  watchNow: { ar: "شاهد الآن", en: "Watch Now" },
  readMore: { ar: "اقرأ المزيد", en: "Read More" },
  dragHint: { ar: "اسحب جانباً لعرض المزيد من الأخبار", en: "Drag sideways to see more news" },
  workHours: { ar: "ساعات العمل:", en: "Working hours:" },
  yearsBadge: { ar: "سنوات من الإبداع والابتكار", en: "Years of creativity and innovation" },
} as const;

export type UiKey = keyof typeof UI;

export function ui(lang: Lang, key: UiKey): string {
  return UI[key][lang];
}
