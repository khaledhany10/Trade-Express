// app/Component/QRDisplay.jsx
"use client";
import WhatsAppQR from "./WhatsAppQR";
import { FiEdit2, FiX } from "react-icons/fi";

export default function QRDisplay({ form, editData, resetForm }) {
  // دبيوجنج: شوف البيانات اللي جايه
  console.log("QRDisplay received form data:", form);
  console.log("Customer Name:", form.customerName);
  console.log("Phone:", form.phone);

  // بيانات مضمونة
  const qrData = {
    customerName: form?.customerName || "اسم العميل",
    brandName: form?.brandName || "",
    phone: form?.phone || "01000000000",
    district: form?.district || "",
    landmark: form?.landmark || "",
    streetName: form?.streetName || "",
    shipments: form?.shipments || "",
    pickupDate: form?.pickupDate || "",
    content: form?.content || ""
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-xl mb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={editData}
            className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center"
          >
            <FiX className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold">طلبك جاهز للإرسال</h2>
            <p className="text-sm text-green-100">البيانات متوفرة</p>
          </div>
          
          <button
            onClick={resetForm}
            className="w-10 h-10 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center"
          >
            <span>🔄</span>
          </button>
        </div>
      </div>

      {/* عرض البيانات الواصلة (للتأكد) */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-bold text-blue-800 mb-2">البيانات الواصلة:</h4>
        <div className="text-sm text-gray-700">
          <p>👤 العميل: <span className="font-bold">{qrData.customerName}</span></p>
          <p>📞 الهاتف: <span className="font-bold">{qrData.phone}</span></p>
          <p>📍 المنطقة: <span className="font-bold">{qrData.district}</span></p>
        </div>
      </div>

      {/* QR Code */}
      <div className="mb-6">
        <WhatsAppQR data={qrData} />
      </div>

      {/* أزرار */}
      <div className="flex gap-2">
        <button
          onClick={editData}
          className="flex-1 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          تعديل البيانات
        </button>
        <button
          onClick={resetForm}
          className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          طلب جديد
        </button>
      </div>
    </div>
  );
}