# 🎨 مرايا — مركز الفن الإبداعي

<div align="center">

![مرايا للفنون](./img/mryaya.jpg)

**منصة رقمية احترافية تجمع بين الفن والتكنولوجيا لتقديم تجربة إبداعية فريدة**

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

[🚀 تشغيل المشروع](#-كيفية-التشغيل) • [✨ الميزات](#-الميزات-الرئيسية) • [📞 التواصل](#-التواصل-والدعم)

</div>

---

## 📋 نبذة عن المشروع

**مرايا** هو موقع ويب رسمي لـ **مركز مرايا للفنون** في المنيا، مصر. منصة إبداعية شاملة تهدف إلى:

- 🎭 عرض الفنون والمسرح الأسود والإبداعات
- 👥 تجميع الفنانين والجماهير في مساحة واحدة
- 📅 تنظيم الفعاليات والحفلات والورش الفنية
- 🎓 تقديم كورسات فنية متخصصة للكبار والأطفال
- 📸 خدمات التصوير والإنتاج الإعلامي
- 👗 توفير الأزياء التنكرية والمسرحية

---

## ✨ الميزات الرئيسية

- **🖥️ واجهة مستخدم حديثة** — تصميم استجابي متوافق مع جميع الأجهزة
- **🌀 رسوم متحركة سلسة** — مكتبة Motion لتجارب بصرية احترافية
- **🌙 تصميم أنيق** — نظام ألوان داكن وأبيض بأسلوب فني راقٍ
- **🌐 دعم كامل للعربية** — محتوى بالعربية مع دعم الكتابة من اليمين لليسار
- **💬 تواصل فوري** — نموذج اتصال مرتبط مباشرة بـ WhatsApp
- **🗺️ خريطة تفاعلية** — تحديد موقع المركز عبر Google Maps
- **📹 محتوى مرئي** — فيديوهات YouTube مضمّنة داخل الموقع
- **🖼️ معرض صور** — عرض أخبار وأعمال المركز مع Lightbox

---

## 🛠️ التقنيات المستخدمة

| التقنية | الإصدار | الدور |
|---------|---------|-------|
| **React** | 19.0.0 | مكتبة واجهة المستخدم |
| **TypeScript** | 5.8.2 | لغة البرمجة المكتوبة بقوة |
| **Vite** | 6.2.0 | أداة البناء السريعة |
| **Tailwind CSS** | 4.1.14 | إطار العمل للتصاميم |
| **Motion** | 12.23.24 | مكتبة الرسوم المتحركة |
| **Lucide React** | 0.546.0 | مكتبة الأيقونات |
| **Google Fonts** | — | خطَّي Almarai و Playfair Display |
| **Express** | 4.21.2 | خادم الويب (اختياري) |

---

## 📋 المتطلبات

قبل البدء، تأكد من توفر:

- **Node.js** الإصدار `20.19.0` أو أحدث
- **npm** أو **yarn** لإدارة المكتبات

---

## 🚀 كيفية التشغيل

### 1️⃣ استنساخ المشروع

```bash
git clone https://github.com/your-repo/merya.git
cd merya
```

### 2️⃣ تثبيت المكتبات

```bash
npm install
```

### 3️⃣ إعداد المتغيرات البيئية

أنشئ ملف `.env.local` في جذر المشروع:


### 4️⃣ تشغيل خادم التطوير

```bash
npm run dev
```

الخادم سيعمل على:
- 🌐 **Local**: `http://localhost:3000`
- 📡 **Network**: `http://0.0.0.0:3000`

---

## 📦 الأوامر المتاحة

```bash
# تشغيل خادم التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة الإصدار الإنتاجي محلياً
npm run preview

# تنظيف مجلد dist
npm run clean

# فحص الأخطاء في TypeScript
npm run lint
```

---

## 📁 هيكل المشروع

```
merya/
├── src/
│   ├── main.tsx          # نقطة الدخول الرئيسية
│   ├── App.tsx           # جميع مكونات الموقع
│   └── index.css         # الأنماط والرسوم المتحركة
├── img/                  # الصور والأصول البصرية (33 ملف)
├── index.html            # ملف HTML الرئيسي
├── package.json          # إعدادات المشروع والمكتبات
├── tsconfig.json         # إعدادات TypeScript
├── vite.config.ts        # إعدادات Vite
└── README.md             # هذا الملف
```

---

## 🎯 أقسام الموقع

| القسم | الوصف |
|-------|-------|
| 🏠 **الرئيسية** | صفحة رئيسية بخلفية كاملة مع أزرار تنقل |
| 📖 **عن المركز** | قصة المركز وتخصصه في المسرح الأسود |
| 📊 **الإحصائيات** | أرقام الإنتاج (23 عرض، 180+ حفلة، 1750+ زي) |
| 💼 **الخدمات** | 6 خدمات رئيسية مع صور توضيحية |
| 🎬 **الفيديوهات** | برومو المركز وعروض المسرح الأسود |
| 👥 **الفريق** | 18 عضواً مقسّمين: إدارة، تنظيم، فريق فني |
| 📰 **الأخبار** | آخر الأنشطة مع معرض صور تفاعلي |
| 📞 **التواصل** | نموذج اتصال + WhatsApp + وسائل تواصل اجتماعي |

---

## 🔐 الأمان

- **متغيرات البيئة** — لا تشارك مفاتيح API الخاصة بك أبداً
- **CORS** — تأكد من تهيئة CORS بشكل صحيح عند النشر الإنتاجي
- **`.env.local`** — مُضاف تلقائياً في `.gitignore`

---

## 📞 التواصل والدعم

للأسئلة والاستفسارات حول مركز مرايا:

- 📧 **البريد الإلكتروني:** androwanakonda@gmail.com
- 📱 **واتساب / هاتف:** 01010535278
- 📍 **العنوان:** المنيا — بجوار مستشفى المبرة، عمارة د. أحمد سيد، الدور الثالث
- 🕐 **ساعات العمل:** يومياً من 12 ظهراً حتى 9 مساءً (الجمعة عطلة)

**وسائل التواصل:**

[![Facebook](https://img.shields.io/badge/Facebook-مرايا-1877F2?style=flat-square&logo=facebook)](https://www.facebook.com/مرايا-520910381366968/)
[![Instagram](https://img.shields.io/badge/Instagram-mrayatheater-E4405F?style=flat-square&logo=instagram)](https://instagram.com/mrayatheater)
[![YouTube](https://img.shields.io/badge/YouTube-مرايا-FF0000?style=flat-square&logo=youtube)](https://youtube.com/channel/UCVwpzxVrCXOZSK2ReCvYD_g)
[![TikTok](https://img.shields.io/badge/TikTok-mraya.team-000000?style=flat-square&logo=tiktok)](https://www.tiktok.com/@mraya.team)
[![X](https://img.shields.io/badge/X-mraya__centr-000000?style=flat-square&logo=x)](https://x.com/mraya_centr)

---

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة **Apache 2.0**

```
SPDX-License-Identifier: Apache-2.0
```

---

## 👨‍💻 المطوّر

<div align="center">

تم تصميم وتطوير هذا الموقع بالكامل بواسطة:

### **Eng. Angluos Rezq**
### م. انجيلوس رزق

> *"صنع بشغف وخبرة لخدمة مركز مرايا للفنون"*

</div>

---

<div align="center">

**© 2024 مركز مرايا للفنون — جميع الحقوق محفوظة**

صنع بـ ❤️ بواسطة **م. انجيلوس رزق**

</div>
