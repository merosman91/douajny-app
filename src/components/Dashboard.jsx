import React from 'react';
import { useData } from '../context/DataContext';
import { DollarSign, Activity, Package, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="text-white" size={24} />
    </div>
  </div>
);

const Dashboard = () => {
  const { data, activeCycleId, getCycleStats } = useData();
  
  if (!activeCycleId) return <div className="p-10 text-center text-gray-500">الرجاء اختيار أو إنشاء دورة إنتاجية من القائمة الجانبية للبدء.</div>;

  const stats = getCycleStats(activeCycleId);
  const currentCycle = data.cycles.find(c => c.id === activeCycleId);

  // تجهيز بيانات الرسم البياني (مثال: المبيعات حسب النوع)
  const chartData = [
    { name: 'دواجن حية', value: 4000 },
    { name: 'بيض', value: 3000 },
    { name: 'مخلفات', value: 2000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">لوحة التحكم - {currentCycle?.name}</h2>
        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">متصل الآن</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="إجمالي المبيعات" value={`${stats.totalSales.toLocaleString()} ج.م`} icon={DollarSign} color="bg-blue-500" />
        <StatCard title="المصروفات" value={`${stats.totalExpenses.toLocaleString()} ج.م`} icon={Activity} color="bg-red-500" />
        <StatCard title="صافي الربح" value={`${stats.profit.toLocaleString()} ج.م`} icon={Package} color="bg-green-500" />
        <StatCard title="عدد الطيور الحالي" value={currentCycle?.birdCount || 0} icon={AlertCircle} color="bg-orange-500" />
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-gray-700">تحليل المبيعات</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-700">آخر العمليات</h3>
            <div className="space-y-4">
                {data.sales.slice(-5).reverse().map((sale) => (
                    <div key={sale.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-bold text-gray-800">فاتورة #{sale.id.toString().slice(-4)}</p>
                            <p className="text-xs text-gray-500">{new Date(sale.createdAt).toLocaleDateString('ar-EG')}</p>
                        </div>
                        <span className="font-bold text-green-600">+{sale.total} ج.م</span>
                    </div>
                ))}
                 {data.sales.length === 0 && <p className="text-center text-gray-400 py-4">لا توجد عمليات حديثة</p>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
