import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Daily = () => {
  const { data, addItem, activeCycleId } = useData();
  const [record, setRecord] = useState({ date: new Date().toISOString().split('T')[0], mortality: '', feed: '', weight: '' });

  if (!activeCycleId) return <div className="text-center p-10 text-gray-400">يرجى تفعيل دورة</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
         <h3 className="font-bold text-lg mb-4">تسجيل بيانات اليوم</h3>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <input type="date" className="border p-2 rounded-lg" value={record.date} onChange={e=>setRecord({...record, date: e.target.value})} />
             <input type="number" placeholder="وفيات (عدد)" className="border p-2 rounded-lg" value={record.mortality} onChange={e=>setRecord({...record, mortality: e.target.value})} />
             <input type="number" placeholder="علف (كجم)" className="border p-2 rounded-lg" value={record.feed} onChange={e=>setRecord({...record, feed: e.target.value})} />
             <input type="number" placeholder="متوسط وزن (جم)" className="border p-2 rounded-lg" value={record.weight} onChange={e=>setRecord({...record, weight: e.target.value})} />
             <button onClick={() => { addItem('dailyRecords', {...record, cycleId: activeCycleId}); setRecord({...record, mortality:'', feed:'', weight:''}) }} className="bg-secondary text-white py-2 rounded-lg md:col-span-4 hover:bg-emerald-600">تسجيل البيانات</button>
         </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-right">
              <thead className="bg-gray-50"><tr><th className="p-4">التاريخ</th><th className="p-4">النافق</th><th className="p-4">العلف</th><th className="p-4">الوزن</th></tr></thead>
              <tbody>
                  {data.dailyRecords.filter(r=>r.cycleId === activeCycleId).slice().reverse().map(r => (
                      <tr key={r.id} className="border-t hover:bg-gray-50">
                          <td className="p-4">{r.date}</td><td className="p-4 text-red-600 font-bold">{r.mortality}</td><td className="p-4">{r.feed} كجم</td><td className="p-4 text-primary font-bold">{r.weight} جم</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};
export default Daily;
