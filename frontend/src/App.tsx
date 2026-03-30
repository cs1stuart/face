import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { motion, AnimatePresence } from 'motion/react';
import { User, LogOut, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'login' | 'signup'>('login');

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-2xl text-center border border-white"
        >
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-green-100 rounded-full text-green-600">
              <ShieldCheck size={64} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Hello, <span className="font-bold text-blue-600">{user.name}</span>
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl mb-8 text-left">
            <div className="flex items-center gap-3 text-gray-700 mb-2">
              <User size={20} />
              <span className="font-medium">{user.email}</span>
            </div>
            <p className="text-sm text-gray-500">Access Granted via Face Recognition</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
          >
            <LogOut size={20} />
            Logout
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-2">FaceAuth <span className="text-blue-600">Pro</span></h1>
        <p className="text-gray-500 font-medium">Secure biometric authentication for the modern web</p>
      </div>
      
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {view === 'login' ? (
            <Login key="login" onLoginSuccess={setUser} onSwitchToSignup={() => setView('signup')} />
          ) : (
            <Signup key="signup" onSuccess={() => setView('login')} onSwitchToLogin={() => setView('login')} />
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-12 text-gray-400 text-sm">
        &copy; 2026 FaceAuth Pro. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
