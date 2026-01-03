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
    <html lang="ar" dir="rtl"> {/* غيرت من en إلى ar وأضفت dir="rtl" */}
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* CSS إضافي لمنع مشاكل QR Code */}
        <style jsx global>{`
          /* إزالة تأثيرات antialiased من العناصر الرسومية */
          svg, canvas, img, .qr-code * {
            -webkit-font-smoothing: auto !important;
            -moz-osx-font-smoothing: auto !important;
            image-rendering: crisp-edges !important;
            image-rendering: -webkit-optimize-contrast !important;
          }
          
          /* منع blur على QR Code */
          .react-qr-code,
          [data-testid="qr-code"],
          svg[width="260"] {
            shape-rendering: crispEdges !important;
            text-rendering: optimizeLegibility !important;
            image-rendering: pixelated !important;
          }
          
          /* إصلاح للعرض على الموبايل */
          @media (max-width: 768px) {
            body {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* QR Code يجب أن يكون بدون تأثيرات */
            svg, canvas {
              -webkit-font-smoothing: auto !important;
              -moz-osx-font-smoothing: auto !important;
            }
          }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        {children}
      </body>
    </html>
  );
}