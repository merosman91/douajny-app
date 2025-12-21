import React, { useRef } from 'react';
import { useData } from '../context/DataContext';
import { Download, Upload, Trash2, Database } from 'lucide-react';

const Settings = () => {
  const { data, setData, showToast } = useData();
  const fileRef = useRef();

  const handleExport = () => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `Douajny_Backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('تم تحميل النسخة الاحتياطية');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setData(parsed);
        showToast('تم استعادة البيانات بنجاح');
      } catch { showToast('ملف غير صالح', 'error'); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={handleExport} className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 cursor-pointer hover:shadow-md transition text-center group">
           <Download className="mx-auto mb-4 text-primary group-hover:scale-110 transition" size={40}/>
           <h3 className="font-bold text-gray-800">تصدير قاعدة البيانات</h3>
           <p className="text-gray-400 text-sm mt-2">حفظ نسخة احتياطية من جميع بيانات المزرعة</p>
        </div>
        <div onClick={()=>fileRef.current.click()} className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 cursor-pointer hover:shadow-md transition text-center group">
           <Upload className="mx-auto mb-4 text-secondary group-hover:scale-110 transition" size={40}/>
           <h3 className="font-bold text-gray-800">استعادة قاعدة البيانات</h3>
           <p className="text-gray-400 text-sm mt-2">استرجاع البيانات من ملف سابق</p>
           <input type="file" ref={fileRef} className="hidden" accept=".json" onChange={handleImport} />
        </div>
      </div>

      <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
         <div className="flex items-center gap-3 text-red-700 mb-2"><Trash2 size={20}/> <h3 className="font-bold">منطقة الخطر</h3></div>
         <p className="text-sm text-red-600 mb-4">هذا الإجراء سيحذف جميع البيانات من المتصفح ولا يمكن التراجع عنه.</p>
         <button onClick={()=>{ if(window.confirm('متأكد؟ سيتم حذف كل شيء!')) { localStorage.clear(); window.location.reload(); } }} className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-100">إعادة ضبط المصنع</button>
      </div>
    </div>
  );
};
export default Settings;
