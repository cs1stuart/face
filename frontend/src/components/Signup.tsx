import React, { useState } from 'react';
import { registerFace } from '../services/api';
import FaceCapture from './FaceCapture';
import { motion } from 'motion/react';

interface SignupProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCapture = async (descriptor: number[]) => {
    if (!name || !email) {
      alert('Please enter name and email first.');
      return;
    }

    setLoading(true);
    try {
      await registerFace(name, email, descriptor);
      alert('Registration successful!');
      onSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2 text-center">Capture your face to complete registration</p>
        <FaceCapture onCapture={handleCapture} buttonText={loading ? 'Registering...' : 'Capture & Register'} />
      </div>

      <div className="text-center">
        <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline text-sm font-medium">
          Already have an account? Login here
        </button>
      </div>
    </motion.div>
  );
};

export default Signup;
