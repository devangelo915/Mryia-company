import {
  BookOpen,
  Building2,
  Calendar,
  Camera,
  Facebook,
  GraduationCap,
  Instagram,
  Layers,
  Link2,
  Megaphone,
  MessageCircle,
  Music,
  Palette,
  PartyPopper,
  Shirt,
  Twitter,
  Users,
  Video,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  palette: Palette,
  calendar: Calendar,
  users: Users,
  book: BookOpen,
  music: Music,
  layers: Layers,
  megaphone: Megaphone,
  party: PartyPopper,
  graduation: GraduationCap,
  building: Building2,
  camera: Camera,
  shirt: Shirt,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  tiktok: Music,
  link: Link2,
  kwai: Video,
  group: Users,
  whatsapp: MessageCircle,
};

export const ITEM_ICON_OPTIONS = [
  { value: "palette", label: "فن (Palette)" },
  { value: "calendar", label: "تقويم" },
  { value: "users", label: "أشخاص" },
  { value: "book", label: "كتاب" },
  { value: "music", label: "موسيقى" },
  { value: "layers", label: "طبقات" },
  { value: "megaphone", label: "مكبر صوت" },
  { value: "party", label: "احتفال" },
  { value: "graduation", label: "تخرج" },
  { value: "building", label: "مبنى" },
  { value: "camera", label: "كاميرا" },
  { value: "shirt", label: "ملابس" },
];

export const SOCIAL_ICON_OPTIONS = [
  { value: "facebook", label: "فيسبوك" },
  { value: "instagram", label: "انستجرام" },
  { value: "twitter", label: "إكس" },
  { value: "youtube", label: "يوتيوب" },
  { value: "tiktok", label: "تيك توك" },
  { value: "link", label: "رابط" },
  { value: "kwai", label: "كواي" },
  { value: "group", label: "جروب" },
  { value: "whatsapp", label: "واتساب" },
];

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Palette;
}
