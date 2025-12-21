import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import Dashboard from './components/Dashboard';
import Cycles from './components/Cycles';
import Daily from './components/Daily';
import Financials from './components/Financials';
import Settings from './components/Settings';
import Toast from './components/Toast';
import { LayoutDashboard, Calendar, ClipboardList, Wallet, Settings as SettingsIcon, Menu, X, Egg } from 'lucide-react';

const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-1 ${active ? 'bg-primary text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-50'}`}>
    <Icon size={20} strokeWidth={active ? 2.5 : 2} /> <span className={`font-medium ${active ? 'font-bold' : ''}`}>{text}</span>
  </button>
);

const AppContent = () => {
  const [page, setPage] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useData();

  const nav = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {toast && <Toast message={toast.message} type={toast.type} />}
      
      {/* Sidebar */}
      <aside className={`fixed lg:relative z-40 w-72 h-full bg-white border-l border-slate-100 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
            <h1 className="text-2xl font-black text-primary flex items-center gap-2"><Egg className="fill-current"/> دواجنــي</h1>
            <button onClick={()=>setMenuOpen(false)} className="lg:hidden text-slate-400"><X/></button>
        </div>
        <nav className="px-4 space-y-1">
            <SidebarItem icon={LayoutDashboard} text="لوحة التحكم" active={page==='dashboard'} onClick={()=>nav('dashboard')} />
            <SidebarItem icon={Calendar} text="إدارة الدورات" active={page==='cycles'} onClick={()=>nav('cycles')} />
            <SidebarItem icon={ClipboardList} text="السجلات اليومية" active={page==='daily'} onClick={()=>nav('daily')} />
            <SidebarItem icon={Wallet} text="المالية والمبيعات" active={page==='finance'} onClick={()=>nav('finance')} />
            <div className="py-4"><hr className="border-slate-100"/></div>
            <SidebarItem icon={SettingsIcon} text="الإعدادات" active={page==='settings'} onClick={()=>nav('settings')} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="lg:hidden bg-white p-4 flex justify-between items-center shadow-sm z-30">
             <h1 className="font-bold text-lg text-primary">دواجنــي ERP</h1>
             <button onClick={()=>setMenuOpen(true)}><Menu/></button>
        </header>
        <div className="flex-1 overflow-auto p-4 lg:p-8">
            <div className="max-w-6xl mx-auto animate-fade-in">
                {page === 'dashboard' && <Dashboard />}
                {page === 'cycles' && <Cycles />}
                {page === 'daily' && <Daily />}
                {page === 'finance' && <Financials />}
                {page === 'settings' && <Settings />}
            </div>
        </div>
      </main>
      
      {menuOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={()=>setMenuOpen(false)}></div>}
    </div>
  );
};

export default function App() {
  return <DataProvider><AppContent /></DataProvider>;
}
