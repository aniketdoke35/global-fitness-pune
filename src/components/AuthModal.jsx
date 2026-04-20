import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Phone } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, initialType = 'join' }) => {
  const [type, setType] = useState(initialType);
  
  useEffect(() => {
    if (isOpen) {
      setType(initialType);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-bgSecondary border border-glassBorder rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-fade-in-up">
        {/* Header Tabs */}
        <div className="flex border-b border-glassBorder">
          <button 
            className={`flex-1 py-4 text-center font-heading font-bold text-lg transition-colors ${type === 'login' ? 'text-accentPrimary border-b-2 border-accentPrimary bg-bgPrimary/50' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
            onClick={() => setType('login')}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-4 text-center font-heading font-bold text-lg transition-colors ${type === 'join' ? 'text-accentPrimary border-b-2 border-accentPrimary bg-bgPrimary/50' : 'text-textSecondary hover:text-white hover:bg-white/5'}`}
            onClick={() => setType('join')}
          >
            Join Gym
          </button>
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-textSecondary hover:text-white transition-colors bg-bgPrimary/50 p-1 rounded-full border border-glassBorder hover:border-textPrimary"
        >
          <X size={20} />
        </button>

        {/* Form Body */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-heading text-white mb-2">
              {type === 'login' ? 'Welcome Back' : 'Start Journey'}
            </h2>
            <p className="text-textSecondary text-sm">
              {type === 'login' ? 'Enter your details to access your account' : 'Fill out the form below to become a member'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { 
            e.preventDefault(); 
            if (type === 'login') {
              window.location.href = '/dashboard';
            } else {
              onClose();
              alert('Registration successful! Please login to continue.');
            }
          }}>
            {type === 'join' && (
              <>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={20} />
                  <input type="text" required placeholder="Full Name" className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 pl-12 text-white placeholder-textMuted focus:outline-none focus:border-accentPrimary transition-colors" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={20} />
                  <input type="tel" required placeholder="Phone Number" className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 pl-12 text-white placeholder-textMuted focus:outline-none focus:border-accentPrimary transition-colors" />
                </div>
              </>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={20} />
              <input type="email" required placeholder="Email Address" className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 pl-12 text-white placeholder-textMuted focus:outline-none focus:border-accentPrimary transition-colors" />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted" size={20} />
              <input type="password" required placeholder="Password" className="w-full bg-bgPrimary border border-glassBorder rounded-lg px-4 py-3 pl-12 text-white placeholder-textMuted focus:outline-none focus:border-accentPrimary transition-colors" />
            </div>

            {type === 'login' && (
              <div className="flex justify-end mt-2">
                <a href="#" className="text-sm border-b border-transparent text-accentPrimary hover:border-accentPrimary transition-all">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="w-full bg-accentPrimary text-black font-bold uppercase tracking-wider py-4 rounded-lg mt-6 hover:bg-[#b3e600] transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(204,255,0,0.2)]">
              {type === 'login' ? 'Sign In' : 'Complete Registration'}
            </button>
            
            {type === 'join' && (
              <p className="text-xs text-center text-textMuted mt-4 px-4">
                By joining, you agree to our Terms of Service & Privacy Policy.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
