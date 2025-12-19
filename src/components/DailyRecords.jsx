import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const DailyRecords = () => {
  const { data, addItem, activeCycleId } = useData();
  const [record, setRecord] = useState({ date: new Date().toISOString().split('T')[0], mortality: 0, feed: 0, weight: 0 });

  if (!activeCycleId) return <div className="text-center p-10">يرجى تفعيل دورة أولاً</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem('dailyRecords', { ...record, cycleId: activeCycleId });
    setRecord({ ...record, mortality: 0, feed: 0, weight: 0 });
  };

  const cycleRecords = data.dailyRecords.filter(r => r.cycleId === activeCycleId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">السجلات اليومية</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4 text-gray-700">تسجيل بيانات اليوم</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">التاريخ</label>
            <input type="date" required className="w-full p-2 border rounded-lg" 
              value={record.date} onChange={e => setRecord({...record, date: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">الوفيات (عدد)</label>
            <input type="number" className="w-full p-2 border rounded-lg" 
              value={record.mortality} onChange={e => setRecord({...record, mortality: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">العلف المستهلك (كجم)</label>
            <input type="number" className="w-full p-2 border rounded-lg" 
              value={record.feed} onChange={e => setRecord({...record, feed: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">متوسط الوزن (جرام)</label>
            <input type="number" className="w-full p-2 border rounded-lg" 
              value={record.weight} onChange={e => setRecord({...record, weight: e.target.value})} />
          </div>
          <button type="submit" className="md:col-span-4 bg-primary text-white py-2 rounded-lg hover:bg-blue-600">حفظ السجل</button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">التاريخ</th>
              <th className="p-4">الوفيات</th>
              <th className="p-4">العلف</th>
              <th className="p-4">الوزن</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cycleRecords.slice().reverse().map(r => (
              <tr key={r.id}>
                <td className="p-4">{r.date}</td>
                <td className="p-4 text-red-500">{r.mortality}</td>
                <td className="p-4">{r.feed} كجم</td>
                <td className="p-4">{r.weight} جم</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyRecords;
