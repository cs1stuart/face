import React, { useState } from 'react';
import { verifyFace } from '../services/api';
import FaceCapture from './FaceCapture';
import { motion, AnimatePresence } from 'motion/react';
import { XCircle, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
  onSwitchToSignup: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCapture = async (descriptor: number[]) => {
    setLoading(true);
    setShowErrorModal(false);
    try {
      const response = await verifyFace(descriptor);
      if (response.data.success) {
        onLoginSuccess(response.data.user);
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      const msg = err.response?.data?.error || 'Face does not match! Access Denied.';
      setErrorMessage(msg);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Face Login</h2>
        
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-4 text-center">Look at the camera to log in</p>
          <FaceCapture onCapture={handleCapture} buttonText={loading ? 'Verifying...' : 'Scan Face'} />
        </div>

        <div className="text-center">
          <button onClick={onSwitchToSignup} className="text-blue-600 hover:underline text-sm font-medium">
            New user? Create an account
          </button>
        </div>
      </motion.div>

      {/* Error Modal Popup */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center border-4 border-red-100"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-red-100 rounded-full text-red-600">
                  <XCircle size={64} />
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-2">Access Denied!</h3>
              <p className="text-gray-600 mb-8 font-medium">
                {errorMessage === 'Face not recognized' ? 'Face does not match our records.' : errorMessage}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <AlertCircle size={20} />
                  Try Again
                </button>
                <button
                  onClick={onSwitchToSignup}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Create New Account
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
