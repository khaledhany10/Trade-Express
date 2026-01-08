// app/page.js
"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import WhatsAppQR from "./Component/WhatsAppQR";
import FormContainer from "./Component/FormContainer";
import { FiArrowUp, FiArrowRight } from "react-icons/fi";

// البيانات
const CAIRO_DISTRICTS = [
  "المعادي", "المقطم", "مدينة نصر", "التجمع الخامس", "الرحاب", "الشروق",
  "6 أكتوبر", "الهرم", "الدقي", "المهندسين", "مصر الجديدة", "الزمالك"
];

const LANDMARKS = ["مدرسة", "مستشفى", "مسجد", "كنيسة", "سوبر ماركت", "بنك"];

// ✅ خيارات المحتويات المحددة
const CONTENT_OPTIONS = [
  { id: "clothes", label: "ملابس", emoji: "👕" },
  { id: "shoes", label: "أحذية", emoji: "👟" },
  { id: "electronics", label: "إلكترونيات", emoji: "📱" },
  { id: "accessories", label: "إكسسوارات", emoji: "💎" },
  { id: "cosmetics", label: "مستحضرات تجميل", emoji: "💄" },
  { id: "home", label: "مستلزمات منزلية", emoji: "🏠" },
  { id: "toys", label: "ألعاب أطفال", emoji: "🧸" },
  { id: "books", label: "كتب ومجلات", emoji: "📚" },
  { id: "sports", label: "مستلزمات رياضية", emoji: "⚽" },
  { id: "food", label: "مواد غذائية", emoji: "🍎" },
  { id: "documents", label: "مستندات وأوراق", emoji: "📄" },
  { id: "medical", label: "مستلزمات طبية", emoji: "💊" },
  { id: "furniture", label: "أثاث", emoji: "🛋️" },
  { id: "bags", label: "حقائب", emoji: "👜" },
  { id: "other", label: "أخرى", emoji: "📦" }
];

// ✅ INITIAL_FORM_STATE محدث
const INITIAL_FORM_STATE = {
  customerName: "",
  brandName: "",
  phone: "",
  district: "",
  landmark: "",
  streetName: "",
  shipments: "",
  pickupDate: "",
  content: "", // سيكون ID من CONTENT_OPTIONS
  customContent: "" // للمحتوى المخصص إذا اختار "أخرى"
};

export default function Home() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [showQR, setShowQR] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrData, setQrData] = useState(null);

  // ✅ تحضير بيانات QR
  const prepareQrData = useCallback(() => {
    // الحصول على نص المحتوى من الـ ID
    const getContentText = () => {
      if (form.content === "other" && form.customContent) {
        return form.customContent;
      }
      
      const selectedOption = CONTENT_OPTIONS.find(opt => opt.id === form.content);
      return selectedOption ? selectedOption.label : "";
    };

    const data = {
      customerName: form.customerName || "",
      brandName: form.brandName || "",
      phone: form.phone || "",
      district: form.district || "",
      landmark: form.landmark || "",
      streetName: form.streetName || "",
      shipments: form.shipments || "",
      pickupDate: form.pickupDate || "",
      content: getContentText(), // نص المحتوى
      contentId: form.content, // ID المحتوى
      customContent: form.customContent || "" // محتوى مخصص
    };
    
    setQrData(data);
    return data;
  }, [form]);

  // ✅ التحقق من السكرول
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ✅ handleChange محدث
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    if (name === "content" && value !== "other") {
      // إذا اختار أي خيار غير "أخرى"، نحذف المحتوى المخصص
      setForm(prev => ({ 
        ...prev, 
        [name]: value,
        customContent: "" 
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  // ✅ Submit function
  const submit = useCallback(async (e) => {
    e.preventDefault();
    
    // التحقق من الحقول المطلوبة
    if (!form.customerName || !form.phone || !form.district || !form.streetName) {
      alert("⚠️ يرجى ملء جميع الحقول المطلوبة (*)");
      return;
    }
    
    // التحقق من اختيار نوع المحتوى
    if (!form.content) {
      alert("⚠️ يرجى اختيار نوع المحتويات");
      return;
    }
    
    // إذا اختار "أخرى" ولم يدخل محتوى مخصص
    if (form.content === "other" && !form.customContent.trim()) {
      alert("⚠️ يرجى تحديد المحتويات في خانة 'أخرى'");
      return;
    }
    
    setIsSubmitting(true);
    
    // تحضير البيانات
    const preparedData = prepareQrData();
    
    // تأخير بسيط
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setIsSubmitting(false);
    setShowQR(true);
  }, [form, prepareQrData]);

  // ✅ Reset form
  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    setQrData(null);
    setShowQR(false);
  }, []);

  // ✅ Edit data
  const editData = useCallback(() => {
    setShowQR(false);
  }, []);

  // ✅ حساب الحقول المكتملة
  const filledFieldsCount = useMemo(() => {
    return Object.values(form).filter(v => 
      v !== null && v !== undefined && v.toString().trim() !== ''
    ).length;
  }, [form]);

  // ✅ التحقق من اكتمال الفورم
  const isFormComplete = useMemo(() => {
    const required = ['customerName', 'phone', 'district', 'streetName', 'content'];
    
    // التحقق من الحقول الأساسية
    let complete = required.every(field => {
      const value = form[field];
      return value !== null && value !== undefined && value.toString().trim() !== '';
    });
    
    // إذا اختار "أخرى"، نتحقق من المحتوى المخصص
    if (complete && form.content === "other") {
      complete = form.customContent && form.customContent.trim() !== '';
    }
    
    return complete;
  }, [form]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* زر التمرير للأعلى */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center shadow-lg"
        >
          <FiArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Header */}
      <header className="sticky top-0 bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center bg-white">
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  className="w-8 h-6 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='40'%3E%3Ctext x='32' y='25' text-anchor='middle' font-family='Arial' font-size='20' font-weight='bold' fill='%231F2937'%3E7TE%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">نظام طلبات الشحن 7TE</h1>
                <p className="text-xs text-gray-600">اختر المحتويات من القائمة وارسل عبر واتساب</p>
              </div>
            </div>
            
            {showQR && (
              <button
                onClick={editData}
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 border border-gray-300"
              >
                <FiArrowRight className="w-4 h-4" />
                <span>العودة للنموذج</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {!showQR ? (
          <FormContainer 
            form={form}
            handleChange={handleChange}
            submit={submit}
            isSubmitting={isSubmitting}
            filledFieldsCount={filledFieldsCount}
            isFormComplete={isFormComplete}
            CAIRO_DISTRICTS={CAIRO_DISTRICTS}
            LANDMARKS={LANDMARKS}
            CONTENT_OPTIONS={CONTENT_OPTIONS}
          />
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
            <div className="bg-green-600 text-white p-4 rounded-t-xl mb-4">
              <h2 className="text-xl font-bold text-center">✅ طلبك جاهز للإرسال!</h2>
            </div>
            
            {qrData ? (
              <WhatsAppQR data={qrData} />
            ) : (
              <div className="text-center p-6">
                <div className="w-64 h-64 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-5xl">⏳</div>
                </div>
                <p className="text-lg font-bold text-gray-700">جاري تحضير رمز QR...</p>
              </div>
            )}
            
            <div className="mt-6 flex gap-2">
              <button
                onClick={editData}
                className="flex-1 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                ✏️ تعديل البيانات
              </button>
              <button
                onClick={resetForm}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                🔄 طلب جديد
              </button>
            </div>
          </div>
        )}

        {isSubmitting && (
          <div className="fixed inset-0 bg-white/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-700 font-medium">جاري إنشاء رمز واتساب...</p>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-600">نظام طلبات الشحن 7TE | {new Date().getFullYear()} ©</p>
        </div>
      </footer>
    </div>
  );
}