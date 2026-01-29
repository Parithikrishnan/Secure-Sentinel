import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield,
  Lock,
  Key,
  AlertTriangle,
  Eye,
  Settings,
  User,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Bell,
  FileText,
  TrendingUp,
  Globe
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    { 
      icon: <Shield className="w-5 h-5" />, 
      label: 'Dashboard', 
      path: '/dashboard',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Overview & Stats'
    },
    { 
      icon: <Lock className="w-5 h-5" />, 
      label: 'Vault', 
      path: '/vault',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Credential Storage'
    },
    { 
      icon: <Key className="w-5 h-5" />, 
      label: 'Password Health', 
      path: '/password-health',
      gradient: 'from-orange-500 to-amber-500',
      description: 'Security Analysis'
    },
    { 
      icon: <Eye className="w-5 h-5" />, 
      label: 'Permissions', 
      path: '/permissions',
      gradient: 'from-purple-500 to-indigo-500',
      description: 'App Permissions'
    },
    { 
      icon: <AlertTriangle className="w-5 h-5" />, 
      label: 'Threat Detection', 
      path: '/threats',
      gradient: 'from-red-500 to-rose-500',
      description: 'URL Scanner'
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: 'Privacy Policies', 
      path: '/privacy',
      gradient: 'from-violet-500 to-purple-500',
      description: 'AI Summaries'
    },
    { 
      icon: <Globe className="w-5 h-5" />, 
      label: 'Community', 
      path: '/community',
      gradient: 'from-pink-500 to-rose-500',
      description: 'Trust Network'
    },
    { 
      icon: <TrendingUp className="w-5 h-5" />, 
      label: 'Security Score', 
      path: '/score',
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Your Rating'
    },
    { 
      icon: <Bell className="w-5 h-5" />, 
      label: 'Alerts', 
      path: '/alerts',
      gradient: 'from-amber-500 to-orange-500',
      description: 'Notifications'
    },
    { 
      icon: <Settings className="w-5 h-5" />, 
      label: 'Settings', 
      path: '/settings',
      gradient: 'from-slate-500 to-gray-500',
      description: 'Preferences'
    },
    { 
      icon: <User className="w-5 h-5" />, 
      label: 'Profile', 
      path: '/profile',
      gradient: 'from-indigo-500 to-blue-500',
      description: 'Account Details'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <nav className="fixed left-0 top-0 h-full w-80 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-slate-700/50 shadow-2xl border-r z-30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur-lg opacity-50 animate-pulse" />
            <div className="relative p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
              SecureTrust
            </h2>
            <p className="text-xs text-slate-400 font-medium">Digital Security</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        )}
      </div>

      {/* Security Status Badge */}
      <div className="relative z-10 mx-6 mt-6 mb-4">
        <div className="relative p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-500/0 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 transition-all duration-300" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
              </div>
              <div>
                <p className="text-emerald-400 font-semibold text-sm">System Secure</p>
                <p className="text-slate-400 text-xs">All systems operational</p>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="relative z-10 px-6 py-4 space-y-2 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                isActive
                  ? 'scale-105' 
                  : 'hover:scale-102'
              }`}
              style={{
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
                animation: 'slideInLeft 0.5s ease-out forwards'
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} transition-opacity duration-300 ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
              }`} />
              
              {/* Glow Effect on Hover */}
              {hoveredItem === index && !isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-xl opacity-20`} />
              )}
              
              {/* Content */}
              <div className={`relative flex items-center space-x-4 px-4 py-4 ${
                isActive 
                  ? 'text-white' 
                  : 'text-slate-400 group-hover:text-white'
              }`}>
                {/* Icon Container */}
                <div className={`relative transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? 'scale-110' : ''
                }`}>
                  <div className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-white/20 shadow-lg' 
                      : 'bg-slate-700/30 group-hover:bg-slate-700/50'
                  }`}>
                    {item.icon}
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className={`text-xs transition-opacity duration-300 ${
                    isActive 
                      ? 'text-white/70 opacity-100' 
                      : 'text-slate-500 opacity-0 group-hover:opacity-100'
                  }`}>
                    {item.description}
                  </div>
                </div>
                
                {/* Arrow Indicator */}
                <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                  isActive 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`} />
              </div>
              
              {/* Active Indicator */}
              {isActive && (
                <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 rounded-r-full bg-gradient-to-b ${item.gradient} shadow-lg`} />
              )}
              
              {/* Shine Effect */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span>AES-256 Encrypted</span>
          </div>
          <span className="font-mono">v1.0.0</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-20px); } 
        }
        @keyframes float-delayed { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-15px); } 
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(100%); } 
        }
        @keyframes gradient-x { 
          0%, 100% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .bg-300% { background-size: 300% 300%; }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(59, 130, 246), rgb(6, 182, 212));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(37, 99, 235), rgb(8, 145, 178));
        }
      `}</style>
    </nav>
  );
};

export default Sidebar;