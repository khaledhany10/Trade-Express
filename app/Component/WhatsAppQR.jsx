"use client";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function WhatsAppQR({ data }) {
  const [copied, setCopied] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [optimizedMessage, setOptimizedMessage] = useState("");

  useEffect(() => {
    if (data.phone) {
      generateOptimizedMessage();
    }
  }, [data]);

  const generateOptimizedMessage = () => {
    // تقليل طول الرسالة مع الحفاظ على كل البيانات
    const message = `طلب بيك اب جديد:
👤 ${data.customerName || "غير محدد"}
📞 ${data.phone}
🏷️ ${data.brandName || "غير محدد"}
📦 ${data.shipments || "غير محدد"}
🗓️ ${data.pickupDate || "غير محدد"}
📍 ${data.pickupLocation?.substring(0, 120) || "غير محدد"}
📝 ${data.content?.substring(0, 100) || "غير محدد"}`;

    setOptimizedMessage(message);

    // إنشاء الرابط
    const whatsappNumber = "201110028075";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // إذا كان الرابط طويل جداً، نستخدم حلاً ذكياً
    if (url.length > 2000) {
      // الحل: تقسيم الرسالة لعدة رسائل متتالية
      const urlPart1 = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`طلب بيك اب جديد - جزء 1/2\n👤 ${data.customerName}\n📞 ${data.phone}\n🏷️ ${data.brandName}\n📦 ${data.shipments}`)}`;
      
      // تخزين الجزء الثاني في متغير للنسخ فقط
      const messagePart2 = `طلب بيك اب جديد - جزء 2/2\n🗓️ ${data.pickupDate}\n📍 ${data.pickupLocation}\n📝 ${data.content}`;
      
      // نستخدم فقط الجزء الأول للQR Code
      setWhatsappUrl(urlPart1);
      
      // نعرض للمستخدم طريقة إرسال الجزء الثاني
      console.log("الجزء الثاني:", messagePart2);
    } else {
      setWhatsappUrl(url);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(whatsappUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const openWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  if (!data.phone) {
    return (
      <div className="text-center p-8">
        <div className="w-64 h-64 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center">
          <div className="text-6xl">📱</div>
        </div>
        <p className="text-2xl font-bold text-cyan-400">أدخل البيانات أولاً</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      <h3 className="text-3xl font-bold text-white">📲 إرسال طلب البيك أب</h3>
      
      {/* QR Code */}
      <div className="bg-white p-6 rounded-3xl inline-block border-4 border-cyan-600">
        <div className="w-72 h-72 flex items-center justify-center p-2">
          <QRCode 
  value={whatsappUrl}
  size={260}
  bgColor="#FFFFFF"
  fgColor="#000000"
  level="H"
/>
        </div>
      </div>

      <p className="text-cyan-300 text-lg">✅ QR Code يحمل جميع البيانات</p>
      
      {/* زر الإرسال */}
      <button
        onClick={openWhatsApp}
        className="w-full py-5 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold text-xl transition-all hover:scale-[1.02] shadow-lg"
      >
        💬 إضغط لإرسال جميع البيانات
      </button>

      {/* عرض البيانات المختصرة */}
      <div className="p-4 rounded-xl bg-gray-900/50">
        <p className="text-cyan-300 text-lg mb-3">📋 البيانات المرسلة:</p>
        <pre className="text-right text-sm text-white whitespace-pre-wrap bg-black/30 p-3 rounded-lg">
          {optimizedMessage}
        </pre>
        
        <div className="mt-4 text-left text-xs text-gray-400">
          <p>طول الرسالة: {optimizedMessage.length} حرف</p>
          <p>طول الرابط: {whatsappUrl.length} حرف</p>
          {whatsappUrl.length > 2000 && (
            <p className="text-yellow-400 mt-2">
              ⚠️ سيتم إرسال البيانات على جزأين
            </p>
          )}
        </div>
      </div>
      
      {/* اقتراحات لتقليل الطول */}
      {optimizedMessage.length > 1000 && (
        <div className="p-4 rounded-xl bg-yellow-900/20">
          <p className="text-yellow-300 mb-2">💡 اقتراحات لتقليل حجم الرسالة:</p>
          <ul className="text-right text-sm text-gray-300 space-y-1">
            <li>• تقليل طول العنوان</li>
            <li>• استخدام رموز بدلاً من نصوص طويلة</li>
            <li>• إزالة المسافات الزائدة</li>
            <li>• تقليل التفاصيل غير الضرورية</li>
          </ul>
        </div>
      )}
    </div>
  );
}