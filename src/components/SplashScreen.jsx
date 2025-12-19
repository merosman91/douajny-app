import React, { useEffect, useState } from 'react';
import { Egg } from 'lucide-react';

const SplashScreen = ({ onFinish }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setTimeout(() => setFade(true), 2500);
    setTimeout(() => onFinish(), 3000);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark text-white transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}>
      <div className="bg-white p-6 rounded-full shadow-2xl mb-6 animate-bounce">
        <Egg size={64} className="text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-2 text-primary">دواجنــي</h1>
      <p className="text-gray-400">الإدارة الذكية لمزارع الدواجن</p>
      <div className="absolute bottom-10 text-sm text-gray-500">
        الإصدار 1.0.0 | تم التطوير بواسطة AI
      </div>
    </div>
  );
};

export default SplashScreen;
