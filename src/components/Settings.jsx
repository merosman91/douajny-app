import React from 'react';

const Settings = () => {
  const handleReset = () => {
    if(window.confirm('هل أنت متأكد؟ سيتم حذف جميع البيانات والبدء من جديد!')) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الإعدادات</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-red-600">منطقة الخطر</h3>
          <p className="text-gray-600 mb-4">سيؤدي هذا الإجراء إلى مسح جميع البيانات المخزنة محلياً في المتصفح.</p>
          <button onClick={handleReset} className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100">
              إعادة ضبط المصنع (حذف كل البيانات)
          </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-bold text-lg mb-4">معلومات التطبيق</h3>
          <p className="text-gray-600">الإصدار: 1.0.0</p>
          <p className="text-gray-600">بيانات الاتصال: support@douajny.com</p>
      </div>
    </div>
  );
};

export default Settings;
