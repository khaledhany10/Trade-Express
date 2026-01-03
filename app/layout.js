import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "7|Trade|Express - نظام استلام الشحنات",
  description: "تطبيق لإنشاء رموز QR لعمليات الاستلام عبر واتساب للشحنات من منصة 7TradeExpress، يسهل عملية توصيل الشحنات وتسجيل الاستلام بشكل آمن وسريع",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
