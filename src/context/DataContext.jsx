import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const initialData = {
  cycles: [],
  inventory: [],
  sales: [],
  employees: [],
  expenses: [],
  dailyRecords: [],
  healthLogs: []
};

export const DataProvider = ({ children }) => {
  // 1. Load Data
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('douajny_db_v2');
      return saved ? { ...initialData, ...JSON.parse(saved) } : initialData;
    } catch {
      return initialData;
    }
  });

  const [activeCycleId, setActiveCycleId] = useState(() => localStorage.getItem('douajny_active_cycle') || null);
  const [toast, setToast] = useState(null);

  // 2. Persist Data
  useEffect(() => {
    localStorage.setItem('douajny_db_v2', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (activeCycleId) localStorage.setItem('douajny_active_cycle', activeCycleId);
  }, [activeCycleId]);

  // 3. Helper Functions
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  };

  const addItem = (collection, item) => {
    setData(prev => ({
      ...prev,
      [collection]: [...(prev[collection] || []), { ...item, id: Date.now(), createdAt: new Date() }]
    }));
    showToast('تمت الإضافة بنجاح');
  };

  const updateItem = (collection, id, updates) => {
    setData(prev => ({
      ...prev,
      [collection]: prev[collection].map(item => item.id === id ? { ...item, ...updates } : item)
    }));
    showToast('تم التحديث بنجاح', 'info');
  };

  const deleteItem = (collection, id) => {
    if(!window.confirm('هل أنت متأكد من الحذف؟')) return;
    setData(prev => ({
      ...prev,
      [collection]: prev[collection].filter(item => item.id !== id)
    }));
    showToast('تم الحذف', 'error');
  };

  // 4. Advanced KPI Calculations
  const getCycleStats = (cycleId) => {
    if (!cycleId) return null;
    
    const cycle = data.cycles.find(c => c.id === cycleId);
    if (!cycle) return null;

    const currentSales = data.sales.filter(s => s.cycleId === cycleId);
    const currentExpenses = data.expenses.filter(e => e.cycleId === cycleId);
    const currentDaily = data.dailyRecords.filter(r => r.cycleId === cycleId);

    const totalSales = currentSales.reduce((sum, i) => sum + Number(i.total), 0);
    const totalExpenses = currentExpenses.reduce((sum, i) => sum + Number(i.amount), 0);
    
    const totalMortality = currentDaily.reduce((sum, i) => sum + Number(i.mortality), 0);
    const totalFeed = currentDaily.reduce((sum, i) => sum + Number(i.feed), 0);
    
    const startCount = Number(cycle.birdCount) || 0;
    const currentCount = startCount - totalMortality;
    const mortalityRate = startCount > 0 ? ((totalMortality / startCount) * 100).toFixed(2) : 0;
    
    // FCR Calculation
    const lastWeight = currentDaily.length > 0 ? Number(currentDaily[currentDaily.length - 1].weight) : 0; // grams
    const totalWeightKg = (currentCount * lastWeight) / 1000;
    const fcr = (totalWeightKg > 0 && totalFeed > 0) ? (totalFeed / totalWeightKg).toFixed(2) : '0.00';

    return {
      totalSales,
      totalExpenses,
      profit: totalSales - totalExpenses,
      currentCount,
      mortalityRate,
      totalFeed,
      fcr,
      avgWeight: lastWeight
    };
  };

  return (
    <DataContext.Provider value={{ data, setData, addItem, updateItem, deleteItem, activeCycleId, setActiveCycleId, getCycleStats, toast, showToast }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
