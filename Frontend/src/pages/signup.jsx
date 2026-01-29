import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import SignupAnimation from '../assets/login.json';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield, Sparkles, UserPlus } from 'lucide-react';

function Signup() {
  const [form, setForm] = useState({ name: '', password: '' });
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:3000/auth/signup', form, {
        headers: { 'Content-Type': 'application/json' },
      });
      setMessage('Signup successful!');
      localStorage.setItem('token', res.data.token);
      setTimeout(() => {
        navigate('/profileform');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden py-12">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-float-slow" />
        
        {/* Interactive Mouse Glow */}
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-cyan-500/5 to-transparent rounded-full transition-all duration-700 ease-out pointer-events-none blur-2xl"
          style={{ left: mousePosition.x - 300, top: mousePosition.y - 300 }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-700/50 max-w-6xl w-full mx-4 flex flex-col md:flex-row items-center gap-12">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl blur-xl" />
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />

        {/* Lottie Animation Section */}
        <div className="md:w-1/2 w-full relative">
          <div className="relative">
            {/* Glow behind animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 blur-3xl animate-pulse" />
            
            {/* Security Badge */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full backdrop-blur-xl">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">Secure Registration</span>
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
            </div>
            
            <Lottie 
              animationData={SignupAnimation} 
              loop={true} 
              className="w-full max-w-md mx-auto relative z-10" 
              style={{ 
                filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))'
              }}
            />
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="md:w-1/2 w-full relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <UserPlus className="w-8 h-8 text-cyan-400" />
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Create Account
              </h2>
            </div>
            <p className="text-slate-400 text-sm">Join SecureTrust and protect your digital life</p>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`mb-6 p-4 rounded-xl border backdrop-blur-sm animate-slide-down ${
              message.includes('successful') 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <p className="font-medium">{message}</p>
              </div>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-6">
            {/* Name Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-12 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm"
                />
              </div>
            </div>


            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full p-4 pl-12 pr-12 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Secure Account</span>
                  </>
                )}
              </span>
              {!isLoading && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800/50 text-slate-400 font-medium backdrop-blur-sm rounded-full border border-slate-700/50">
                OR
              </span>
            </div>
          </div>


          {/* Login Link */}
          <div className="mt-6 text-center">
            <button
              onClick={handleLoginRedirect}
              className="text-slate-400 hover:text-cyan-400 font-medium transition-colors duration-300"
            >
              Already have an account?{' '}
              <span className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline">
                Sign In
              </span>
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-slate-400 leading-relaxed">
                <p className="mb-2">
                  By creating an account, you agree to our <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-cyan-400 hover:text-cyan-300 cursor-pointer hover:underline">Privacy Policy</span>.
                </p>
                <p>
                  Your data is protected with <span className="text-emerald-400 font-semibold">military-grade encryption</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-30px); } 
        }
        @keyframes float-delayed { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-20px); } 
        }
        @keyframes float-slow { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-15px); } 
        }
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(100%); } 
        }
        @keyframes slide-down {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-slide-down { animation: slide-down 0.3s ease-out; }
      `}</style>
    </div>
  );
}

export default Signup;