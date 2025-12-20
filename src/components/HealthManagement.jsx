import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Syringe, CheckCircle } from 'lucide-react';

const HealthManagement = () => {
  const { data, addItem, activeCycleId } = useData();
  const [vaccine, setVaccine] = useState({ name: '', date: '', status: 'مجدول' });

  if (!activeCycleId) return <div className="text-center p-10">يرجى تفعيل دورة أولاً</div>;

  const vaccinations = [
    { day: 1, name: 'نيوكاسل + آي بي (رش)' },
    { day: 7, name: 'جمبورو (تقطير)' },
    { day: 14, name: 'جمبورو (مياه شرب)' },
    { day: 18, name: 'نيوكاسل (كلون)' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">الصحة والتحصينات</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* جدول التحصينات القياسي */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Syringe className="text-blue-500" /> جدول التحصينات المقترح
            </h3>
            <div className="space-y-3">
                {vaccinations.map((v, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="font-bold text-blue-800">عمر {v.day} يوم</span>
                        <span>{v.name}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* سجل الملاحظات الصحية */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-4">سجل العلاجات</h3>
             <form onSubmit={(e) => {
                 e.preventDefault();
                 addItem('healthLogs', { ...vaccine, cycleId: activeCycleId });
                 setVaccine({ name: '', date: '', status: 'تم' });
             }} className="space-y-4">
                 <input type="text" placeholder="اسم الدواء / التحصين" className="w-full p-2 border rounded-lg" required 
                    value={vaccine.name} onChange={e => setVaccine({...vaccine, name: e.target.value})} />
                 <input type="date" className="w-full p-2 border rounded-lg" required
                    value={vaccine.date} onChange={e => setVaccine({...vaccine, date: e.target.value})} />
                 <button className="w-full bg-green-500 text-white py-2 rounded-lg">تسجيل</button>
             </form>
             
                {/* استبدل الـ div الأخير الذي يحتوي على "يتم حفظ السجلات هنا..." بهذا الكود */}
<div className="mt-4 max-h-60 overflow-auto space-y-2">
    {data.healthLogs && data.healthLogs
        .filter(log => log.cycleId === activeCycleId)
        .slice().reverse()
        .map((log) => (
        <div key={log.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-r-4 border-green-500">
            <div>
                <p className="font-bold text-gray-800">{log.name}</p>
                <p className="text-xs text-gray-500">{log.date}</p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                {log.status || 'تم'}
            </span>
        </div>
    ))}
    {(!data.healthLogs || data.healthLogs.filter(l => l.cycleId === activeCycleId).length === 0) && 
        <p className="text-center text-gray-400 py-4">لا توجد سجلات صحية لهذه الدورة</p>
    }
</div>

        </div>
      </div>
    </div>
  );
};

export default HealthManagement;
