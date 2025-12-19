import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Plus, Power, Trash2 } from 'lucide-react';

const CyclesManagement = () => {
  const { data, addItem, deleteItem, activeCycleId, setActiveCycleId } = useData();
  const [showForm, setShowForm] = useState(false);
  const [newCycle, setNewCycle] = useState({ name: '', birdCount: '', type: 'تسمين' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem('cycles', { ...newCycle, isActive: true, startDate: new Date() });
    setShowForm(false);
    setNewCycle({ name: '', birdCount: '', type: 'تسمين' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">إدارة الدورات الإنتاجية</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> إضافة دورة
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input 
              type="text" placeholder="اسم الدورة (مثال: دورة يناير 2024)" required
              className="p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={newCycle.name} onChange={e => setNewCycle({...newCycle, name: e.target.value})}
            />
            <input 
              type="number" placeholder="عدد الطيور" required
              className="p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={newCycle.birdCount} onChange={e => setNewCycle({...newCycle, birdCount: e.target.value})}
            />
            <select 
              className="p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={newCycle.type} onChange={e => setNewCycle({...newCycle, type: e.target.value})}
            >
              <option value="تسمين">تسمين</option>
              <option value="بياض">بياض</option>
              <option value="أمهات">أمهات</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-secondary text-white px-6 py-2 rounded-lg w-full md:w-auto">حفظ الدورة</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.cycles.map(cycle => (
          <div key={cycle.id} className={`bg-white p-6 rounded-xl border-2 transition-all ${activeCycleId === cycle.id ? 'border-primary shadow-lg ring-2 ring-blue-100' : 'border-transparent shadow-sm'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{cycle.name}</h3>
                <span className="text-xs text-gray-500">{new Date(cycle.startDate).toLocaleDateString('ar-EG')}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${cycle.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {cycle.isActive ? 'نشطة' : 'منتهية'}
              </span>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">النوع:</span>
                <span className="font-medium">{cycle.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">العدد المبدئي:</span>
                <span className="font-medium">{cycle.birdCount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setActiveCycleId(cycle.id)}
                disabled={activeCycleId === cycle.id}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeCycleId === cycle.id ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                {activeCycleId === cycle.id ? 'مفعلة حالياً' : 'تفعيل'}
              </button>
              <button 
                onClick={() => deleteItem('cycles', cycle.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CyclesManagement;
