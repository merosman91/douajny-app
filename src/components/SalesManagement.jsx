import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const SalesManagement = () => {
  const { data, addItem, activeCycleId } = useData();
  const [sale, setSale] = useState({ customer: '', quantity: '', price: '', notes: '' });

  if (!activeCycleId) return <div className="text-center p-10">يرجى تفعيل دورة أولاً</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = Number(sale.quantity) * Number(sale.price);
    addItem('sales', { ...sale, total, cycleId: activeCycleId });
    setSale({ customer: '', quantity: '', price: '', notes: '' });
  };

  const currentSales = data.sales.filter(s => s.cycleId === activeCycleId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">المبيعات والفواتير</h2>
      
      {/* نموذج إضافة بيع */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold mb-4 text-gray-700">تسجيل فاتورة جديدة</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" placeholder="اسم العميل" required
            className="p-2 border rounded-lg w-full"
            value={sale.customer} onChange={e => setSale({...sale, customer: e.target.value})}
          />
          <input 
            type="number" placeholder="الكمية / العدد" required
            className="p-2 border rounded-lg w-full"
            value={sale.quantity} onChange={e => setSale({...sale, quantity: e.target.value})}
          />
          <input 
            type="number" placeholder="سعر الوحدة" required
            className="p-2 border rounded-lg w-full"
            value={sale.price} onChange={e => setSale({...sale, price: e.target.value})}
          />
          <button type="submit" className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
            إصدار فاتورة
          </button>
        </form>
      </div>

      {/* جدول المبيعات */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">رقم الفاتورة</th>
              <th className="p-4">العميل</th>
              <th className="p-4">الكمية</th>
              <th className="p-4">السعر</th>
              <th className="p-4">الإجمالي</th>
              <th className="p-4">التاريخ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentSales.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4">#{item.id.toString().slice(-4)}</td>
                <td className="p-4 font-medium">{item.customer}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4">{item.price}</td>
                <td className="p-4 text-green-600 font-bold">{item.total.toLocaleString()}</td>
                <td className="p-4 text-gray-500 text-sm">{new Date(item.createdAt).toLocaleDateString('ar-EG')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentSales.length === 0 && <p className="text-center p-6 text-gray-400">لا توجد مبيعات مسجلة لهذه الدورة</p>}
      </div>
    </div>
  );
};

export default SalesManagement;
