import React from 'react';
import { useData } from '../context/DataContext';
import { DollarSign, Activity, AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const StatCard = ({ title, value, sub, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      {sub && <p className="text-xs mt-1 text-gray-400">{sub}</p>}
    </div>
    <div className={`p-3 rounded-xl ${color} text-white shadow-md`}><Icon size={24} /></div>
  </div>
);

const Dashboard = () => {
  const { data, activeCycleId, getCycleStats } = useData();
  
  if (!activeCycleId) return <div className="flex h-full items-center justify-center text-gray-400">يرجى اختيار دورة من القائمة الجانبية</div>;

  const stats = getCycleStats(activeCycleId);
  const chartData = data.dailyRecords
    .filter(r => r.cycleId === activeCycleId)
    .slice(-7)
    .map(r => ({ date: r.date.slice(5), weight: r.weight }));

  return (
    <div className="space-y-6 pb-20">
      <h2 className="text-2xl font-bold text-gray-800">نظرة عامة على الأداء</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="العدد الحالي" value={stats.currentCount} sub={`النافق: ${stats.mortalityRate}%`} icon={Package} color="bg-blue-500" />
        <StatCard title="صافي الربح" value={`${stats.profit.toLocaleString()}`} sub="عملة محلية" icon={DollarSign} color={stats.profit >= 0 ? "bg-green-500" : "bg-red-500"} />
        <StatCard title="معامل التحويل" value={stats.fcr} sub="FCR القياسي: 1.5" icon={Activity} color="bg-purple-500" />
        <StatCard title="استهلاك العلف" value={`${stats.totalFeed}`} sub="كيلوجرام" icon={TrendingUp} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4">منحنى نمو الوزن (آخر 7 أيام)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="weight" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-700 mb-4">تنبيهات النظام</h3>
          <div className="space-y-4">
             {Number(stats.mortalityRate) > 5 && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex gap-2 items-center">
                    <AlertTriangle size={16} /> تحذير: نسبة النافق مرتفعة ({stats.mortalityRate}%)
                </div>
             )}
             <div className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm flex gap-2 items-center">
                 <Activity size={16} /> متوسط الوزن: {stats.avgWeight} جم
             </div>
             {data.inventory.filter(i => i.quantity < 5).map(i => (
                 <div key={i.id} className="p-3 bg-orange-50 text-orange-700 rounded-lg text-sm flex gap-2 items-center">
                    <Package size={16} /> مخزون منخفض: {i.name}
                 </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
