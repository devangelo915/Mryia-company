import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mraya-company.vercel.app"),
  title: "مركز مرايا للفنون",
  description: "مركز مرايا للفنون يقدم فعاليات فنية وثقافية، تنظيم حفلات، ورش عمل، ومساحات للإيجار في مصر.",
  robots: "index, follow",
  icons: {
    icon: "/img/mryaya.jpg",
    apple: "/img/mryaya.jpg",
  },
  openGraph: {
    title: "مركز مرايا للفنون",
    description: "مركز مرايا للفنون يقدم فعاليات فنية وثقافية، تنظيم حفلات، ورش عمل، ومساحات للإيجار في مصر.",
    images: ["/img/mryaya.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
