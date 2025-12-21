import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Financials = () => {
  const { data, addItem, activeCycleId, deleteItem } = useData();
  const [tab, setTab] = useState('expenses'); // expenses or sales
  const [form, setForm] = useState({ item: '', amount: '', category: 'علف', notes: '' });

  if (!activeCycleId) return <div className="text-center p-10 text-gray-400">يرجى تفعيل دورة</div>;

  const handleSubmit = () => {
      const collection = tab === 'expenses' ? 'expenses' : 'sales';
      addItem(collection, { ...form, cycleId: activeCycleId, total: form.amount }); // total used for sales
      setForm({ item: '', amount: '', category: 'علف', notes: '' });
  };

  const list = tab === 'expenses' 
      ? data.expenses.filter(e => e.cycleId === activeCycleId) 
      : data.sales.filter(s => s.cycleId === activeCycleId);

  return (
    <div className="space-y-6">
      <div className="flex gap-4 bg-white p-2 rounded-xl w-fit shadow-sm">
          <button onClick={()=>setTab('expenses')} className={`px-6 py-2 rounded-lg transition-colors ${tab==='expenses' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>المصروفات</button>
          <button onClick={()=>setTab('sales')} className={`px-6 py-2 rounded-lg transition-colors ${tab==='sales' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>المبيعات</button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg mb-4">{tab === 'expenses' ? 'تسجيل مصروف' : 'تسجيل بيع'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input className="border p-2 rounded-lg md:col-span-2" placeholder={tab==='expenses' ? 'بند المصروف' : 'اسم العميل / الصنف'} value={form.item} onChange={e=>setForm({...form, item: e.target.value})} />
              <input type="number" className="border p-2 rounded-lg" placeholder="القيمة الإجمالية" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} />
              <button onClick={handleSubmit} className={`text-white py-2 rounded-lg ${tab==='expenses' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}>حفظ</button>
          </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-right">
              <thead className="bg-gray-50"><tr><th className="p-4">التاريخ</th><th className="p-4">البند</th><th className="p-4">القيمة</th><th className="p-4">حذف</th></tr></thead>
              <tbody>
                  {list.slice().reverse().map(i => (
                      <tr key={i.id} className="border-t">
                          <td className="p-4 text-gray-500 text-sm">{new Date(i.createdAt).toLocaleDateString('ar-EG')}</td>
                          <td className="p-4 font-bold">{i.item}</td>
                          <td className={`p-4 font-bold ${tab==='expenses'?'text-red-600':'text-green-600'}`}>{Number(i.amount || i.total).toLocaleString()}</td>
                          <td className="p-4"><button onClick={()=>deleteItem(tab==='expenses'?'expenses':'sales', i.id)} className="text-red-400 text-sm">حذف</button></td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};
export default Financials;
