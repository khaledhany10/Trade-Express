"use client";
import { useState, useRef, useEffect } from "react";
import WhatsAppQR from "./Component/WhatsAppQR";
import { FiArrowUp, FiChevronDown } from "react-icons/fi";

export default function Home() {
  const [form, setForm] = useState({
    customerName: "",
    brandName: "",
    phone: "",
    pickupLocation: "",
    shipments: "",
    pickupDate: "",
    content: "" 
  });
  const [showQR, setShowQR] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contentLength, setContentLength] = useState(0);
  const maxContentLength = 150;

  // Refs للتمرير السلس
  const formRef = useRef(null);
  const qrRef = useRef(null);
  const policiesRef = useRef(null);

  // السياسات الثابتة
  const companyPolicies = [
    "✅ الشحنات يجب أن تكون مغلفة بشكل آمن ومتين",
    "✅ يجب إرفاق فاتورة أصلية مع كل شحنة",
    "✅ الالتزام بالمواعيد المتفق عليها للاستلام",
    "✅ التأكد من مطابقة المحتويات للبيانات المدخلة",
    "✅ في حالة التأخير، يجب إبلاغ العميل قبل الموعد",
    "✅ الشحنات الخطرة أو الممنوعة غير مسموح بها",
    "✅ يجب تسليم الشحنات في العبوة الأصلية",
    "✅ الحق في رفض الشحنات غير المطابقة للشروط"
  ];

  // التحقق من موضع الـ Scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // تحديث عدد الحروف عند تغيير المحتوى
  useEffect(() => {
    setContentLength(form.content.length);
  }, [form.content]);

  // وظائف التمرير السلس
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const scrollToQR = () => {
    qrRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const scrollToPolicies = () => {
    policiesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // تحديد عدد الحروف لمحتويات الشحنة فقط
    if (name === "content") {
      if (value.length <= maxContentLength) {
        setForm(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const openMaps = () => {
    window.open("https://www.google.com/maps", "_blank");
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.phone) {
      alert("⚠️ يرجى إدخال رقم الهاتف أولاً");
      return;
    }
    setShowQR(true);
    // التمرير تلقائياً إلى QR بعد الإنشاء
    setTimeout(() => {
      scrollToQR();
    }, 300);
  };

  const resetForm = () => {
    setForm({
      customerName: "",
      brandName: "",
      phone: "",
      pickupLocation: "",
      shipments: "",
      pickupDate: "",
      content: ""
    });
    setContentLength(0);
    setShowQR(false);
    // العودة إلى الفورم
    setTimeout(() => {
      scrollToForm();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* زر التمرير للأعلى */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110"
          aria-label="التمرير إلى الأعلى"
        >
          <FiArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Header مع قائمة سريعة */}
      <header className="sticky top-0 z-40 px-6 py-4 bg-black/90 backdrop-blur-lg border-b border-cyan-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-cyan-500/20 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-16 h-10 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='40' viewBox='0 0 64 40'%3E%3Ctext x='32' y='25' text-anchor='middle' font-family='Arial' font-size='20' font-weight='bold' fill='%2306b6d4'%3E7TE%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                7 | Trade | Express
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-[2px] w-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <p className="text-cyan-300/80 text-sm font-medium">
                  نظام إدارة الشحنات السريع
                </p>
                <div className="h-[2px] w-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={scrollToForm}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-cyan-300 text-sm font-medium transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500/50"
            >
              📝 النموذج
            </button>
            <button
              onClick={scrollToQR}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 text-blue-300 text-sm font-medium transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
            >
              🔗 QR Code
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* زر التمرير للأسفل */}
        <div className="flex justify-center mb-8">
          <button
            onClick={scrollToForm}
            className="animate-bounce w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="التمرير للأسفل"
          >
            <FiChevronDown className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Form & Policies */}
          <div className="space-y-8">
            {/* Form Card */}
            <div ref={formRef} className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-cyan-800/50 shadow-xl transition-all duration-500 hover:border-cyan-600/50 hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📝</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">بيانات طلب البيك أب</h2>
                  <p className="text-gray-400">املأ الحقول المطلوبة بسرعة</p>
                </div>
              </div>

              <form onSubmit={submit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      اسم العميل *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                      placeholder="أدخل اسم العميل"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      اسم البراند *
                    </label>
                    <input
                      type="text"
                      name="brandName"
                      value={form.brandName}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                      placeholder="أدخل اسم البراند"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    رقم الواتساب *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                    placeholder="مثال: 01234567890"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    موقع الاستلام *
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={openMaps}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-5 py-3.5 font-medium transition-all duration-300 hover:scale-105 shrink-0"
                    >
                      <span>📍</span>
                      <span className="hidden sm:inline">خرائط جوجل</span>
                    </button>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={form.pickupLocation}
                      onChange={handleChange}
                      className="flex-1 rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                      placeholder="رابط الموقع من Google Maps"
                      required
                    />
                  </div>
                </div>

                {/* Shipments & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      عدد الشحنات
                    </label>
                    <input
                      type="number"
                      name="shipments"
                      value={form.shipments}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                      placeholder="العدد"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cyan-300 mb-2">
                      تاريخ الاستلام
                    </label>
                    <input
                      type="date"
                      name="pickupDate"
                      value={form.pickupDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* محتويات الشحنة مع عداد الحروف */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-cyan-300">
                      محتويات الشحنة
                    </label>
                    <div className={`text-xs ${contentLength > maxContentLength - 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {contentLength} / {maxContentLength} حرف
                    </div>
                  </div>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 min-h-[100px] resize-none"
                    placeholder="وصف محتويات الشحنة (مثال: ملابس - إلكترونيات - مستلزمات منزلية...)"
                    maxLength={maxContentLength}
                    rows="3"
                  />
                  <div className="mt-1 text-xs text-gray-400">
                    {contentLength > maxContentLength - 50 ? (
                      <span className="text-yellow-400">
                        ⚠️ اقتربت من الحد الأقصى للحروف
                      </span>
                    ) : (
                      "يمكنك كتابة وصف مفصل لمحتويات الشحنة"
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={contentLength > maxContentLength}
                    className="col-span-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-4 font-bold text-lg transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    onClick={() => {
                      if (contentLength <= maxContentLength) {
                        setTimeout(() => {
                          scrollToQR();
                        }, 1000);
                      }
                    }}
                  >
                    🚀 إنشاء رمز الاستلام
                  </button>
                  
                  {showQR && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="col-span-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 py-3 font-medium transition-all duration-300 hover:scale-[1.02]"
                    >
                      🔄 طلب جديد
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Policies Card */}
            <div ref={policiesRef} className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-800/50 shadow-xl transition-all duration-500 hover:border-purple-600/50 hover:shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">سياسات الشركة</h2>
                  <p className="text-gray-400">شروط يجب الالتزام بها</p>
                </div>
              </div>

              <div className="space-y-3">
                {companyPolicies.map((policy, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700 transition-all duration-300 hover:bg-gray-800/70 hover:border-purple-500/30"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <p className="text-sm text-gray-300">{policy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - QR Code */}
          <div ref={qrRef} className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-800/50 shadow-xl transition-all duration-500 hover:border-blue-600/50 hover:shadow-2xl h-fit">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl">🔗</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">رمز الاستجابة السريعة</h2>
                <p className="text-gray-400">امسح لإرسال الطلب تلقائياً</p>
              </div>
            </div>

            {/* QR Display Area */}
            <div className="min-h-[400px] flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-black/50 border-2 border-dashed border-cyan-800/30">
              {showQR ? (
                <div className="w-full">
                  <WhatsAppQR data={{ ...form, companyPolicies }} />
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-cyan-800/30 animate-pulse">
                    <div className="text-5xl text-cyan-400/30">📱</div>
                  </div>
                  <p className="text-xl font-medium text-cyan-300 mb-3">⏳ في انتظار البيانات</p>
                  <p className="text-gray-400 max-w-sm">
                    املأ النموذج على اليسار وسيظهر رمز QR هنا تلقائياً
                  </p>
                  <button
                    onClick={scrollToForm}
                    className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-cyan-300 text-sm font-medium transition-all duration-300 border border-cyan-500/30"
                  >
                    📝 الانتقال للنموذج
                  </button>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
              <p className="text-cyan-300 font-medium mb-2">💡 تعليمات الاستخدام:</p>
              <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                <li>املأ جميع الحقول المطلوبة (*)</li>
                <li>اضغط على "إنشاء رمز الاستلام"</li>
                <li>امسح رمز QR بكاميرا الهاتف</li>
                <li>سيفتح واتساب مع الرسالة جاهزة للإرسال</li>
                <li>الرسالة ترسل تلقائياً للرقم الأساسي</li>
                <li className="text-cyan-300 font-medium mt-2">
                  ⚠️ ملاحظة: محتويات الشحنة محددة بـ {maxContentLength} حرف كحد أقصى
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 px-6 py-5 border-t border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <button
              onClick={scrollToForm}
              className="text-cyan-300 hover:text-cyan-400 transition-all duration-300 text-sm hover:scale-105"
            >
              📝 النموذج
            </button>
            <span className="text-gray-600 hidden md:inline">•</span>
            <button
              onClick={scrollToQR}
              className="text-blue-300 hover:text-blue-400 transition-all duration-300 text-sm hover:scale-105"
            >
              🔗 QR Code
            </button>
            <span className="text-gray-600 hidden md:inline">•</span>
            <button
              onClick={scrollToPolicies}
              className="text-purple-300 hover:text-purple-400 transition-all duration-300 text-sm hover:scale-105"
            >
              📋 السياسات
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            نظام إدارة طلبات البيك أب © {new Date().getFullYear()} | جميع الحقوق محفوظة
          </p>
          <p className="text-gray-600 text-xs mt-2">
            محتويات الشحنة محددة بـ {maxContentLength} حرف لتجنب مشاكل الـ QR Code
          </p>
        </div>
      </footer>
    </div>
  );
}