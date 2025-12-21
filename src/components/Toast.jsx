import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type }) => {
  const styles = {
    success: 'bg-green-50 text-green-700 border-green-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200'
  };
  const Icon = type === 'error' ? AlertCircle : (type === 'info' ? Info : CheckCircle);

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border toast-anim ${styles[type]}`}>
      <Icon size={18} /> <span className="font-bold text-sm">{message}</span>
    </div>
  );
};
export default Toast;
