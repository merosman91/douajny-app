import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';
import CyclesManagement from './components/CyclesManagement';
import SalesManagement from './components/SalesManagement';
import { LayoutDashboard, History, ShoppingCart, Users, Settings, Menu, X } from 'lucide-react';

const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${active ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-blue-50'}`}
  >
    <Icon size={20} />
    <span className="font-medium">{text}</span>
  </button>
);

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <SplashScreen onFinish={() => setLoading(false)} />;

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'cycles': return <CyclesManagement />;
      case 'sales': return <SalesManagement />;
      default: return <div className="text-center p-10">قريباً...</div>;
    }
  };

  return (
    <DataProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
        )}

        {/* Sidebar */}
        <aside className={`fixed lg:relative z-30 w-64 h-full bg-white border-l border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="text-3xl">🐔</span> دواجنــي
            </h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
                <X size={24} />
            </button>
          </div>
          
          <nav className="px-4 py-2">
            <SidebarItem icon={LayoutDashboard} text="لوحة التحكم" active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
            <SidebarItem icon={History} text="إدارة الدورات" active={currentPage === 'cycles'} onClick={() => setCurrentPage('cycles')} />
            <SidebarItem icon={ShoppingCart} text="المبيعات" active={currentPage === 'sales'} onClick={() => setCurrentPage('sales')} />
            <SidebarItem icon={Users} text="الموظفين" active={currentPage === 'employees'} onClick={() => setCurrentPage('employees')} />
            <div className="my-4 border-t border-gray-100"></div>
            <SidebarItem icon={Settings} text="الإعدادات" active={currentPage === 'settings'} onClick={() => setCurrentPage('settings')} />
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold">A</div>
              <div>
                <p className="text-sm font-bold">المدير العام</p>
                <p className="text-xs text-gray-500">admin@douajny.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white p-4 shadow-sm flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-800">دواجنــي</h1>
                <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                    <Menu size={24} />
                </button>
            </header>

            {/* Content Body */}
            <div className="flex-1 overflow-auto p-4 lg:p-8">
                {renderContent()}
            </div>
        </main>
      </div>
    </DataProvider>
  );
}

export default App;
