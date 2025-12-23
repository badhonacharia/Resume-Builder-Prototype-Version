
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onAuth: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('demo@resumaker.pro');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Demo User');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    onAuth({ id: '1', email, name });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-10 text-center text-white">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <i className="fas fa-file-invoice text-3xl"></i>
          </div>
          <h1 className="text-2xl font-bold">ResuMaker Pro AI</h1>
          <p className="text-blue-100 mt-2">Create professional resumes in minutes.</p>
        </div>
        
        <div className="p-10">
          <div className="flex mb-8 bg-gray-100 p-1 rounded-xl">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${mode === 'login' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-lg font-bold transition-all ${mode === 'signup' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <i className="fas fa-user absolute left-4 top-3 text-gray-400"></i>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                    placeholder="Enter your full name" 
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-3 text-gray-400"></i>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-3 text-gray-400"></i>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all mt-6">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500 text-sm">
            By continuing, you agree to our <span className="text-blue-600 cursor-pointer">Terms of Service</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
