import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Package, AlertTriangle } from 'lucide-react';

const InventoryManagement = () => {
  const { data, addItem, deleteItem } = useData();
  const [item, setItem] = useState({ name: '', type: 'علف', quantity: 0, unit: 'شيكارة' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem('inventory', item);
    setItem({ name: '', type: 'علف', quantity: 0, unit: 'شيكارة' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">إدارة المخزون</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2">
            <label className="text-sm">اسم الصنف</label>
            <input type="text" required className="w-full p-2 border rounded-lg" 
              value={item.name} onChange={e => setItem({...item, name: e.target.value})} placeholder="مثال: علف بادي 23%" />
        </div>
        <div>
            <label className="text-sm">النوع</label>
            <select className="w-full p-2 border rounded-lg" value={item.type} onChange={e => setItem({...item, type: e.target.value})}>
                <option>علف</option>
                <option>أدوية</option>
                <option>معدات</option>
            </select>
        </div>
        <div>
            <label className="text-sm">الكمية</label>
            <input type="number" required className="w-full p-2 border rounded-lg" 
              value={item.quantity} onChange={e => setItem({...item, quantity: e.target.value})} />
        </div>
        <button className="bg-secondary text-white py-2 rounded-lg">إضافة</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.inventory.map((inv) => (
          <div key={inv.id} className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center border-r-4 border-secondary">
            <div>
              <h3 className="font-bold text-lg">{inv.name}</h3>
              <span className="text-gray-500 text-sm">{inv.type}</span>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{inv.quantity}</p>
              <p className="text-xs text-gray-400">{inv.unit}</p>
            </div>
            <button onClick={() => deleteItem('inventory', inv.id)} className="text-red-400 hover:text-red-600 text-sm">حذف</button>
          </div>
        ))}
        {data.inventory.length === 0 && <p className="text-gray-500 col-span-3 text-center">المخزون فارغ</p>}
      </div>
    </div>
  );
};

export default InventoryManagement;
