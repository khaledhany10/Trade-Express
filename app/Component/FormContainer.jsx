// app/Component/FormContainer.jsx
"use client";
import { FiUser, FiPackage, FiPhone, FiMapPin, FiCalendar, FiArrowRight } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";

export default function FormContainer({
  form,
  handleChange,
  submit,
  isSubmitting,
  filledFieldsCount,
  isFormComplete,
  CAIRO_DISTRICTS,
  LANDMARKS,
  CONTENT_OPTIONS
}) {
  // الحصول على المحتوى المحدد
  const getSelectedContentLabel = () => {
    if (form.content === "other") {
      return form.customContent || "أخرى";
    }
    const selected = CONTENT_OPTIONS.find(opt => opt.id === form.content);
    return selected ? `${selected.emoji} ${selected.label}` : "اختر المحتويات";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <FiPackage className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold">طلب شحنة جديدة</h2>
            <p className="text-sm text-blue-100">اختر المحتويات من القائمة وارسل عبر واتساب</p>
          </div>
        </div>
      </div>
      
      {/* Form */}
      <div className="p-6">
        <form onSubmit={submit} className="space-y-6">
          {/* معلومات العميل */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-blue-600 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              معلومات العميل
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم العميل *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={form.customerName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="أدخل اسم العميل"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم البراند
                </label>
                <input
                  type="text"
                  name="brandName"
                  value={form.brandName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  placeholder="أدخل اسم البراند"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الواتساب *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="مثال: 01234567890"
                required
              />
            </div>
          </div>

          {/* العنوان */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-green-600 flex items-center gap-2">
              <FiMapPin className="w-5 h-5" />
              تفاصيل العنوان
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المنطقة / الحي *
                </label>
                <select
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  required
                >
                  <option value="">اختر المنطقة</option>
                  {CAIRO_DISTRICTS.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  علامة مميزة
                </label>
                <select
                  name="landmark"
                  value={form.landmark}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                  <option value="">اختر علامة</option>
                  {LANDMARKS.map((landmark, index) => (
                    <option key={index} value={landmark}>{landmark}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الشارع / الميدان *
              </label>
              <input
                type="text"
                name="streetName"
                value={form.streetName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3"
                placeholder="العنوان بالتفصيل"
                required
              />
            </div>
          </div>

          {/* الشحنة */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-purple-600 flex items-center gap-2">
              <FiPackage className="w-5 h-5" />
              تفاصيل الشحنة
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عدد الشحنات
                </label>
                <input
                  type="number"
                  name="shipments"
                  value={form.shipments}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  placeholder="العدد"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ الاستلام
                </label>
                <input
                  type="date"
                  name="pickupDate"
                  value={form.pickupDate}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
              </div>
            </div>

            {/* ✅ خيارات المحتويات الجديدة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                اختر نوع المحتويات *
              </label>
              
              {/* العرض المختصر للمحتوى المحدد */}
              {form.content && (
                <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">
                    المحدد: {getSelectedContentLabel()}
                  </p>
                </div>
              )}

              {/* شبكة خيارات المحتويات */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                {CONTENT_OPTIONS.map((option) => (
                  <div key={option.id} className="relative">
                    <input
                      type="radio"
                      id={option.id}
                      name="content"
                      value={option.id}
                      checked={form.content === option.id}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <label
                      htmlFor={option.id}
                      className={`block p-3 text-center rounded-lg border cursor-pointer transition-all duration-200 ${
                        form.content === option.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-200'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.emoji}</div>
                      <div className="text-xs font-medium">{option.label}</div>
                    </label>
                  </div>
                ))}
              </div>

              {/* إذا اختار "أخرى" */}
              {form.content === "other" && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <label className="block text-sm font-medium text-yellow-700 mb-2">
                    ⚠️ حدد المحتويات المخصصة
                  </label>
                  <input
                    type="text"
                    name="customContent"
                    value={form.customContent}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-yellow-300 px-4 py-3 bg-white"
                    placeholder="مثال: مستلزمات مكتبية، أدوات كهربائية، إلخ"
                    required={form.content === "other"}
                  />
                </div>
              )}
            </div>
          </div>

          {/* إحصائيات */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="text-sm text-gray-600">الحقول المكتملة</div>
                <div className="text-lg font-bold text-blue-600">{filledFieldsCount}/9</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">المحتوى</div>
                <div className="text-lg font-bold text-purple-600">
                  {form.content ? getSelectedContentLabel() : "غير محدد"}
                </div>
              </div>
            </div>
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={isSubmitting || !isFormComplete}
            className={`w-full rounded-lg py-4 font-bold text-lg flex items-center justify-center gap-2 ${
              isSubmitting || !isFormComplete
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري الإنشاء...</span>
              </>
            ) : (
              <>
                <TbTruckDelivery className="w-5 h-5" />
                <span>إنشاء رمز واتساب</span>
                <FiArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          
          {!isFormComplete && (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-700">⚠️ يجب ملأ جميع الحقول المطلوبة (*)</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}