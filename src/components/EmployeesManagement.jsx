import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { User, Phone } from 'lucide-react';

const EmployeesManagement = () => {
  const { data, addItem, deleteItem } = useData();
  const [emp, setEmp] = useState({ name: '', role: 'عامل', salary: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem('employees', emp);
    setEmp({ name: '', role: 'عامل', salary: '', phone: '' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">فريق العمل</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm flex flex-wrap gap-4 items-end">
         <div className="flex-1 min-w-[200px]">
             <input type="text" placeholder="اسم الموظف" className="w-full p-2 border rounded-lg" 
                value={emp.name} onChange={e => setEmp({...emp, name: e.target.value})} required />
         </div>
         <div className="w-32">
             <input type="number" placeholder="الراتب" className="w-full p-2 border rounded-lg" 
                value={emp.salary} onChange={e => setEmp({...emp, salary: e.target.value})} />
         </div>
         <div className="flex-1 min-w-[200px]">
             <input type="text" placeholder="رقم الهاتف" className="w-full p-2 border rounded-lg" 
                value={emp.phone} onChange={e => setEmp({...emp, phone: e.target.value})} />
         </div>
         <button className="bg-primary text-white px-6 py-2 rounded-lg">إضافة</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.employees.map(e => (
              <div key={e.id} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                      <h3 className="font-bold">{e.name}</h3>
                      <p className="text-sm text-gray-500">{e.role} - {e.salary} ج.م</p>
                      <div className="flex items-center gap-1 text-xs text-blue-500 mt-1">
                          <Phone size={12} /> {e.phone}
                      </div>
                  </div>
                  <button onClick={() => deleteItem('employees', e.id)} className="text-red-500 text-sm">حذف</button>
              </div>
          ))}
      </div>
    </div>
  );
};

export default EmployeesManagement;
