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
             
             <div className="mt-4 max-h-40 overflow-auto">
                 {/* هنا يتم عرض السجلات المخزنة في healthLogs إذا قمت بإضافتها للكونتكس */}
                 <p className="text-sm text-gray-500 text-center">يتم حفظ السجلات هنا...</p>
             </div>
        </div>
      </div>
    </div>
  );
};

export default HealthManagement;
