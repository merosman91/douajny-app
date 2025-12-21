import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, PlayCircle, Trash2 } from 'lucide-react';

const Cycles = () => {
  const { data, addItem, deleteItem, activeCycleId, setActiveCycleId } = useData();
  const [form, setForm] = useState({ name: '', birdCount: '', type: 'تسمين' });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h3 className="font-bold text-lg mb-4">إضافة دورة جديدة</h3>
        <div className="flex gap-4 flex-wrap">
           <input className="border p-2 rounded-lg flex-1" placeholder="اسم الدورة (مثال: يناير 2024)" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
           <input className="border p-2 rounded-lg w-32" type="number" placeholder="العدد" value={form.birdCount} onChange={e=>setForm({...form, birdCount: e.target.value})} />
           <button onClick={() => { addItem('cycles', {...form, startDate: new Date(), isActive: true}); setForm({name:'', birdCount:'', type:'تسمين'}) }} className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-sky-600"><Plus size={18}/> حفظ</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {data.cycles.map(cycle => (
             <div key={cycle.id} className={`p-6 rounded-2xl border-2 transition-all bg-white relative ${activeCycleId === cycle.id ? 'border-primary ring-4 ring-sky-50' : 'border-transparent shadow-sm'}`}>
                 <div className="flex justify-between mb-2">
                     <h3 className="font-bold text-xl">{cycle.name}</h3>
                     <span className="text-xs bg-gray-100 px-2 py-1 rounded">{new Date(cycle.startDate).toLocaleDateString('ar-EG')}</span>
                 </div>
                 <p className="text-gray-500 mb-4">العدد: {cycle.birdCount} طائر</p>
                 <div className="flex gap-2">
                     <button onClick={() => setActiveCycleId(cycle.id)} className={`flex-1 py-2 rounded-lg text-sm font-bold ${activeCycleId === cycle.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                         {activeCycleId === cycle.id ? 'نشطة حالياً' : 'تفعيل'}
                     </button>
                     <button onClick={() => deleteItem('cycles', cycle.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};
export default Cycles;
