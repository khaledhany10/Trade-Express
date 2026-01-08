// app/Component/WhatsAppQR.jsx
"use client";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

export default function WhatsAppQR({ data }) {
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [qrSize, setQrSize] = useState(256);

  useEffect(() => {
    if (data && data.customerName) {
      setStatus("creating");
      
      // ✅ بناء رسالة واتساب بطريقة صحيحة
      const buildWhatsAppMessage = () => {
        // بناء الرسالة خطوة بخطوة
        let message = "";
        message += `📦 *طلب شحنة جديد*\n\n`;
        message += `👤 *العميل:* ${data.customerName || ""}\n`;
        if (data.brandName) message += `🏷️ *البراند:* ${data.brandName}\n`;
        message += `📱 *رقم الواتساب:* ${data.phone || ""}\n\n`;
        message += `📍 *العنوان:*\n` + `• المنطقة: ${data.district || ""}\n` + `• الشارع: ${data.streetName || ""}\n`;
        if (data.landmark) message += `• علامة: ${data.landmark}\n\n`;
        message += `📦 *الشحنة:*\n`;
        message += `• النوع: ${data.content || data.customContent || ""}\n`;
        if (data.shipments) message += `• العدد: ${data.shipments}\n`;
        if (data.pickupDate) message += `• التاريخ: ${data.pickupDate}\n\n`;        
        message += `✅ *تم بواسطة نظام 7TE*`;
        
        return message.trim();
      };

      const message = buildWhatsAppMessage();
      
      // ✅ رقم واتساب صحيح مع الكود الدولي
      const whatsappNumber = "201110028075"; // تأكد أن الرقم صحيح
      
      // ✅ بناء رابط واتساب بالطريقة الصحيحة
      // الطريقة الصحيحة: إزالة أي أصفار في البداية وإضافة +
      const cleanNumber = whatsappNumber.replace(/^0+/, "");
      const internationalNumber = `+${cleanNumber}`;
      
      // ✅ ترميز الرسالة بطريقة صحيحة
      const encodedMessage = encodeURIComponent(message);
      
      // ✅ بناء الرابط النهائي
      const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // ✅ إضافة رابط بديل للطوارئ
      const fallbackUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
      
      setWhatsappUrl(url);
      setStatus("ready");
      
    } else {
      setStatus("error");
    }
  }, [data]);

  const openWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // ✅ اختبار QR Code مباشرة برابط بسيط
  const testSimpleQR = () => {
    const testUrl = "https://wa.me/201110028075?text=Hello%20Test";
    window.open(testUrl, '_blank');
  };

  if (status === "creating") {
    return (
      <div className="text-center p-6">
        <div className="w-64 h-64 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl flex items-center justify-center">
          <div className="text-5xl animate-pulse">⏳</div>
        </div>
        <p className="text-lg font-bold text-blue-600 mb-2">جاري إنشاء QR Code...</p>
        <p className="text-gray-600">سيظهر خلال ثواني</p>
      </div>
    );
  }

  if (status === "error" || !data) {
    return (
      <div className="text-center p-6">
        <div className="w-64 h-64 mx-auto mb-4 bg-red-50 rounded-xl flex items-center justify-center">
          <div className="text-5xl text-red-400">⚠️</div>
        </div>
        <p className="text-lg font-bold text-red-600 mb-2">خطأ في البيانات</p>
        <p className="text-gray-600">تأكد من إدخال جميع البيانات المطلوبة</p>
        
      </div>
    );
  }

  return (
    <div className="text-center space-y-6">
      {/* ✅ عنوان واضح */}
      <div className="mb-2">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-2">
          <span className="text-xl">✅</span>
          <span className="font-bold">QR Code جاهز للمسح</span>
        </div>
        <p className="text-sm text-gray-600">استخدم كاميرا الهاتف لمسح الكود</p>
      </div>
      
      {/* ✅ حاوية QR Code مع إعدادات محسنة */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-30"></div>
        <div className="relative bg-white p-6 rounded-xl shadow-2xl border-2 border-green-300 inline-block">
          <div className="w-72 h-72 flex items-center justify-center bg-white p-2 rounded-lg">
            {whatsappUrl ? (
              <QRCode 
                value={whatsappUrl}
                size={280} // حجم أكبر لسهولة المسح
                bgColor="#FFFFFF"
                fgColor="#000000" // لون أسود أفضل للمسح
                level="Q" // مستوى تصحيح أعلى
                style={{ 
                  width: '100%',
                  height: '100%',
                  padding: '8px',
                  borderRadius: '8px'
                }}
              />
            ) : (
              <div className="text-gray-400">Loading QR...</div>
            )}
          </div>
          
          {/* ✅ زوايا زخرفية */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-500 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-500 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-500 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-500 rounded-br-lg"></div>
        </div>
      </div>

      {/* ✅ معلومات المسح */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
          <span>📱</span>
          <span>كيفية المسح:</span>
        </h4>
        <ol className="text-sm text-gray-700 text-right space-y-1">
          <li>1. افتح تطبيق الكاميرا على هاتفك</li>
          <li>2. وجه الكاميرا نحو رمز QR أعلاه</li>
          <li>3. انتظر حتى تظهر نافذة رابط واتساب</li>
          <li>4. اضغط على الرابط لفتح واتساب</li>
        </ol>
      </div>

      {/* ✅ زر الإرسال المباشر */}
      <div className="space-y-3">
        <button
          onClick={openWhatsApp}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-[0.98]"
        >
          <span className="flex items-center justify-center gap-3">
            <span className="text-2xl animate-bounce">💬</span>
            <span>إضغط هنا لإرسال الطلب مباشرة</span>
          </span>
        </button>

      </div>

      {/* ✅ بيانات الطلب */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200">
        <h4 className="font-bold text-gray-800 mb-3">📄 تفاصيل الطلب:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-right">
          <div className="text-gray-600">العميل:</div>
          <div className="font-bold">{data.customerName}</div>
          
          <div className="text-gray-600">الهاتف:</div>
          <div className="font-bold text-blue-600 dir-ltr">{data.phone}</div>
          
          <div className="text-gray-600">العنوان:</div>
          <div className="font-bold">{data.district}</div>
          
          <div className="text-gray-600">المحتويات:</div>
          <div className="font-bold text-purple-600">{data.content || data.customContent}</div>
        </div>
      </div>

      {/* ✅ استكشاف الأخطاء */}
      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 text-xs">
        <p className="font-medium text-yellow-800 mb-1">🔧 إذا لم يعمل المسح:</p>
        <ol className="text-yellow-700 space-y-1">
          <li>• تأكد من أن كاميرا الهاتف تركز جيداً على الكود</li>
          <li>• جرب في إضاءة أفضل</li>
          <li>• استخدم زر الإرسال المباشر أعلاه</li>
          <li>• تأكد من تثبيت واتساب على هاتفك</li>
        </ol>
      </div>
    </div>
  );
}