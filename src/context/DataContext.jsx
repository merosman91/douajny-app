import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

// 👇 هنا كان الخطأ، أضفنا healthLogs
const initialData = {
  cycles: [],
  inventory: [],
  sales: [],
  employees: [],
  expenses: [],
  dailyRecords: [],
  healthLogs: [] // ✅ تمت الإضافة لمنع الانهيار
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('douajny_db');
    // دمج البيانات المحفوظة مع البيانات الأولية لضمان وجود الحقول الجديدة
    return saved ? { ...initialData, ...JSON.parse(saved) } : initialData;
  });

  const [activeCycleId, setActiveCycleId] = useState(() => {
    return localStorage.getItem('douajny_active_cycle') || null;
  });

  useEffect(() => {
    localStorage.setItem('douajny_db', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (activeCycleId) localStorage.setItem('douajny_active_cycle', activeCycleId);
  }, [activeCycleId]);

  const addItem = (collection, item) => {
    // حماية إضافية: التأكد أن المصفوفة موجودة قبل الإضافة
    const targetCollection = data[collection] || []; 
    setData(prev => ({
      ...prev,
      [collection]: [...targetCollection, { ...item, id: Date.now(), createdAt: new Date() }]
    }));
  };

  const updateItem = (collection, id, updates) => {
    setData(prev => ({
      ...prev,
      [collection]: prev[collection].map(item => item.id === id ? { ...item, ...updates } : item)
    }));
  };

  const deleteItem = (collection, id) => {
    setData(prev => ({
      ...prev,
      [collection]: prev[collection].filter(item => item.id !== id)
    }));
  };

  const getCycleStats = (cycleId) => {
    if (!cycleId) return { totalSales: 0, totalExpenses: 0, profit: 0 };
    const cycleSales = data.sales?.filter(s => s.cycleId === cycleId) || [];
    const totalSales = cycleSales.reduce((sum, item) => sum + Number(item.total), 0);
    const cycleExpenses = data.expenses?.filter(e => e.cycleId === cycleId) || [];
    const totalExpenses = cycleExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    
    return { totalSales, totalExpenses, profit: totalSales - totalExpenses };
  };

  return (
    <DataContext.Provider value={{ 
      data, 
      addItem, 
      updateItem, 
      deleteItem, 
      activeCycleId, 
      setActiveCycleId,
      getCycleStats 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
