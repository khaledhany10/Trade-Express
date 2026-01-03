"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import WhatsAppQR from "./Component/WhatsAppQR";
import { FiArrowUp, FiChevronDown } from "react-icons/fi";

// تعريف الثوابت خارج المكون لتجنب إعادة الإنشاء
const COMPANY_POLICIES = [
  "✅ الشحنات يجب أن تكون مغلفة بشكل آمن ومتين",
  "✅ يجب إرفاق فاتورة أصلية مع كل شحنة",
  "✅ الالتزام بالمواعيد المتفق عليها للاستلام",
  "✅ التأكد من مطابقة المحتويات للبيانات المدخلة",
  "✅ في حالة التأخير، يجب إبلاغ العميل قبل الموعد",
  "✅ الشحنات الخطرة أو الممنوعة غير مسموح بها",
  "✅ يجب تسليم الشحنات في العبوة الأصلية",
  "✅ الحق في رفض الشحنات غير المطابقة للشروط"
];

const MAX_CONTENT_LENGTH = 150;
const INITIAL_FORM_STATE = {
  customerName: "",
  brandName: "",
  phone: "",
  pickupLocation: "",
  shipments: "",
  pickupDate: "",
  content: "" 
};

// مكونات فرعية محسنة
const LogoComponent = () => {
  const handleImageError = useCallback((e) => {
    e.target.onerror = null;
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='40' viewBox='0 0 64 40'%3E%3Ctext x='32' y='25' text-anchor='middle' font-family='Arial' font-size='20' font-weight='bold' fill='%2306b6d4'%3E7TE%3C/text%3E%3C/svg%3E";
  }, []);

  return (
    <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-cyan-500/20 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="w-16 h-10 object-contain"
        loading="lazy"
        onError={handleImageError}
      />
    </div>
  );
};

const HeaderButton = ({ onClick, emoji, text, variant = "cyan" }) => {
  const colors = variant === "blue" 
    ? "from-blue-600/20 to-cyan-600/20 hover:from-blue-600/30 hover:to-cyan-600/30 border-blue-500/30 hover:border-blue-500/50 text-blue-300"
    : "from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${colors} text-sm font-medium transition-all duration-300`}
    >
      {emoji} {text}
    </button>
  );
};

const FormInput = ({ label, name, type = "text", value, onChange, placeholder, required = false, min }) => (
  <div>
    <label className="block text-sm font-medium text-cyan-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300"
      placeholder={placeholder}
      required={required}
      min={min}
    />
  </div>
);

const ContentTextarea = ({ content, contentLength, onChange }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <label className="block text-sm font-medium text-cyan-300">
        محتويات الشحنة
      </label>
      <div className={`text-xs ${contentLength > MAX_CONTENT_LENGTH - 50 ? 'text-yellow-400' : 'text-gray-400'}`}>
        {contentLength} / {MAX_CONTENT_LENGTH} حرف
      </div>
    </div>
    <textarea
      name="content"
      value={content}
      onChange={onChange}
      className="w-full rounded-xl border border-cyan-700 bg-gray-800 px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-300 min-h-[100px] resize-none"
      placeholder="وصف محتويات الشحنة (مثال: ملابس - إلكترونيات - مستلزمات منزلية...)"
      maxLength={MAX_CONTENT_LENGTH}
      rows="3"
    />
    <div className="mt-1 text-xs text-gray-400">
      {contentLength > MAX_CONTENT_LENGTH - 50 ? (
        <span className="text-yellow-400">
          ⚠️ اقتربت من الحد الأقصى للحروف
        </span>
      ) : (
        "يمكنك كتابة وصف مفصل لمحتويات الشحنة"
      )}
    </div>
  </div>
);

const QRLoadingPlaceholder = ({ onScrollToForm }) => (
  <div className="text-center">
    <div className="w-48 h-48 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-cyan-800/30 animate-pulse">
      <div className="text-5xl text-cyan-400/30">📱</div>
    </div>
    <p className="text-xl font-medium text-cyan-300 mb-3">⏳ في انتظار البيانات</p>
    <p className="text-gray-400 max-w-sm">
      املأ النموذج على اليسار وسيظهر رمز QR هنا تلقائياً
    </p>
    <button
      onClick={onScrollToForm}
      className="mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/30 hover:to-blue-600/30 text-cyan-300 text-sm font-medium transition-all duration-300 border border-cyan-500/30"
    >
      📝 الانتقال للنموذج
    </button>
  </div>
);

const Instructions = () => (
  <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
    <p className="text-cyan-300 font-medium mb-2">💡 تعليمات الاستخدام:</p>
    <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
      <li>املأ جميع الحقول المطلوبة (*)</li>
      <li>اضغط على "إنشاء رمز الاستلام"</li>
      <li>امسح رمز QR بكاميرا الهاتف</li>
      <li>سيفتح واتساب مع الرسالة جاهزة للإرسال</li>
      <li>الرسالة ترسل تلقائياً للرقم الأساسي</li>
      <li className="text-cyan-300 font-medium mt-2">
        ⚠️ ملاحظة: محتويات الشحنة محددة بـ {MAX_CONTENT_LENGTH} حرف كحد أقصى
      </li>
    </ol>
  </div>
);

const FooterButton = ({ onClick, text, color }) => {
  const colorClasses = {
    cyan: "text-cyan-300 hover:text-cyan-400",
    blue: "text-blue-300 hover:text-blue-400",
    purple: "text-purple-300 hover:text-purple-400"
  };

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} transition-all duration-300 text-sm hover:scale-105`}
    >
      {text}
    </button>
  );
};

// المكون الرئيسي
export default function Home() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [showQR, setShowQR] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contentLength, setContentLength] = useState(0);

  // Refs للتمرير السلس
  const formRef = useRef(null);
  const qrRef = useRef(null);
  const policiesRef = useRef(null);

  // استخدام useMemo للبيانات المشتقة
  const qrData = useMemo(() => ({ 
    ...form, 
    companyPolicies: COMPANY_POLICIES 
  }), [form]);

  // استخدام useMemo للقائمة الثابتة
  const policiesList = useMemo(() => (
    <div className="space-y-3">
      {COMPANY_POLICIES.map((policy, index) => (
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
  ), []);

  // التحقق من موضع الـ Scroll مع throttle
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // استخدام useCallback للوظائف
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);

  const scrollToQR = useCallback(() => {
    qrRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);

  const scrollToPolicies = useCallback(() => {
    policiesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, []);

  // تحسين handleChange لتجنب إعادة render زائدة
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (name === "content") {
      if (value.length <= MAX_CONTENT_LENGTH) {
        setForm(prev => {
          if (prev.content === value) return prev;
          return { ...prev, [name]: value };
        });
        setContentLength(value.length);
      }
    } else {
      setForm(prev => {
        if (prev[name] === value) return prev;
        return { ...prev, [name]: value };
      });
    }
  }, []);

  const openMaps = useCallback(() => {
    window.open("https://www.google.com/maps", "_blank");
  }, []);

  const submit = useCallback((e) => {
    e.preventDefault();
    if (!form.phone) {
      alert("⚠️ يرجى إدخال رقم الهاتف أولاً");
      return;
    }
    setShowQR(true);
    // استخدام requestAnimationFrame بدلاً من setTimeout
    requestAnimationFrame(() => {
      scrollToQR();
    });
  }, [form.phone, scrollToQR]);

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    setContentLength(0);
    setShowQR(false);
    requestAnimationFrame(() => {
      scrollToForm();
    });
  }, [scrollToForm]);

  // ActionButtons كمكون فرعي
  const ActionButtons = useMemo(() => (
    <div className="grid grid-cols-2 gap-4 pt-4">
      <button
        type="submit"
        disabled={contentLength > MAX_CONTENT_LENGTH}
        className="col-span-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-4 font-bold text-lg transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
  ), [contentLength, showQR, resetForm]);

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
            <LogoComponent />
            
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
            <HeaderButton onClick={scrollToForm} emoji="📝" text="النموذج" />
            <HeaderButton onClick={scrollToQR} emoji="🔗" text="QR Code" variant="blue" />
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
                  <FormInput
                    label="اسم العميل *"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    placeholder="أدخل اسم العميل"
                    required
                  />

                  <FormInput
                    label="اسم البراند *"
                    name="brandName"
                    value={form.brandName}
                    onChange={handleChange}
                    placeholder="أدخل اسم البراند"
                    required
                  />
                </div>

                {/* Phone */}
                <FormInput
                  label="رقم الواتساب *"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="مثال: 01234567890"
                  required
                />

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
                  <FormInput
                    label="عدد الشحنات"
                    name="shipments"
                    type="number"
                    value={form.shipments}
                    onChange={handleChange}
                    placeholder="العدد"
                    min="0"
                  />

                  <FormInput
                    label="تاريخ الاستلام"
                    name="pickupDate"
                    type="date"
                    value={form.pickupDate}
                    onChange={handleChange}
                  />
                </div>

                {/* محتويات الشحنة مع عداد الحروف */}
                <ContentTextarea
                  content={form.content}
                  contentLength={contentLength}
                  onChange={handleChange}
                />

                {/* Action Buttons */}
                {ActionButtons}
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
              {policiesList}
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
                  <WhatsAppQR data={qrData} />
                </div>
              ) : (
                <QRLoadingPlaceholder onScrollToForm={scrollToForm} />
              )}
            </div>

            {/* Instructions */}
            <Instructions />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 px-6 py-5 border-t border-gray-800 bg-black/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <FooterButton onClick={scrollToForm} text="📝 النموذج" color="cyan" />
            <span className="text-gray-600 hidden md:inline">•</span>
            <FooterButton onClick={scrollToQR} text="🔗 QR Code" color="blue" />
            <span className="text-gray-600 hidden md:inline">•</span>
            <FooterButton onClick={scrollToPolicies} text="📋 السياسات" color="purple" />
          </div>
          <p className="text-gray-500 text-sm">
            نظام إدارة طلبات البيك أب © {new Date().getFullYear()} | جميع الحقوق محفوظة
          </p>
          <p className="text-gray-600 text-xs mt-2">
            محتويات الشحنة محددة بـ {MAX_CONTENT_LENGTH} حرف لتجنب مشاكل الـ QR Code
          </p>
        </div>
      </footer>
    </div>
  );
}