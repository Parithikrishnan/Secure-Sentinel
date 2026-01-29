import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Upload,
  X,
  Plus,
  Sparkles,
  ShieldCheck,
  Globe,
  Smartphone,
  Monitor,
  ChevronRight,
  Trash2,
  Edit,
  Save
} from 'lucide-react';

const SecurityDashboard = () => {
  const [username] = useState('John Doe');
  const [isLoaded, setIsLoaded] = useState(false);
  const [vaultOpen, setVaultOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragActive, setDragActive] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [credentials, setCredentials] = useState([
    { id: 1, name: 'Facebook', username: 'john@email.com', category: 'social', icon: '📘', lastUpdated: '2 days ago' },
    { id: 2, name: 'Instagram', username: 'johndoe', category: 'social', icon: '📷', lastUpdated: '5 days ago' },
    { id: 3, name: 'Gmail', username: 'john.doe@gmail.com', category: 'email', icon: '📧', lastUpdated: '1 week ago' }
  ]);
  const [newCredential, setNewCredential] = useState({
    name: '',
    username: '',
    password: '',
    url: '',
    category: 'social'
  });

  // Suggested system apps
  const suggestedApps = [
    { name: 'Chrome', icon: '🌐', category: 'browser' },
    { name: 'Facebook', icon: '📘', category: 'social' },
    { name: 'Instagram', icon: '📷', category: 'social' },
    { name: 'Twitter', icon: '🐦', category: 'social' },
    { name: 'LinkedIn', icon: '💼', category: 'social' },
    { name: 'Gmail', icon: '📧', category: 'email' },
    { name: 'WhatsApp', icon: '💬', category: 'messaging' },
    { name: 'Telegram', icon: '✈️', category: 'messaging' },
    { name: 'Netflix', icon: '🎬', category: 'entertainment' },
    { name: 'Spotify', icon: '🎵', category: 'entertainment' },
    { name: 'Banking App', icon: '🏦', category: 'finance' },
    { name: 'PayPal', icon: '💰', category: 'finance' }
  ];

  const securityStats = [
    {
      title: 'Stored Credentials',
      value: credentials.length,
      icon: <Key className="w-7 h-7" />,
      gradient: 'from-blue-500 to-cyan-500',
      status: 'good'
    },
    {
      title: 'Weak Passwords',
      value: '2',
      icon: <AlertTriangle className="w-7 h-7" />,
      gradient: 'from-orange-500 to-amber-500',
      status: 'warning'
    },
    {
      title: 'MFA Enabled',
      value: '5',
      icon: <ShieldCheck className="w-7 h-7" />,
      gradient: 'from-emerald-500 to-teal-500',
      status: 'good'
    },
    {
      title: 'Security Score',
      value: '78%',
      icon: <Shield className="w-7 h-7" />,
      gradient: 'from-purple-500 to-indigo-500',
      status: 'good'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file drop (CSV import)
      console.log('File dropped:', e.dataTransfer.files[0]);
    }
  };

  const handleAddCredential = () => {
    if (newCredential.name && newCredential.username && newCredential.password) {
      const credential = {
        id: credentials.length + 1,
        name: newCredential.name,
        username: newCredential.username,
        category: newCredential.category,
        icon: getCategoryIcon(newCredential.category),
        lastUpdated: 'Just now'
      };
      setCredentials([...credentials, credential]);
      setNewCredential({ name: '', username: '', password: '', url: '', category: 'social' });
      setShowAddForm(false);
    }
  };

  const handleSuggestedAppClick = (app) => {
    setNewCredential({
      ...newCredential,
      name: app.name,
      category: app.category
    });
    setShowAddForm(true);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      social: '📱',
      email: '📧',
      messaging: '💬',
      entertainment: '🎬',
      finance: '💰',
      browser: '🌐'
    };
    return icons[category] || '🔐';
  };

  const getCategoryColor = (category) => {
    const colors = {
      social: 'from-blue-500 to-cyan-500',
      email: 'from-red-500 to-pink-500',
      messaging: 'from-green-500 to-emerald-500',
      entertainment: 'from-purple-500 to-indigo-500',
      finance: 'from-orange-500 to-amber-500',
      browser: 'from-slate-500 to-gray-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
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
        
        {/* Mouse Glow */}
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-cyan-500/5 to-transparent rounded-full transition-all duration-700 ease-out blur-2xl"
          style={{ left: mousePosition.x - 300, top: mousePosition.y - 300 }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6 border-b border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="w-8 h-8 text-cyan-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Welcome, {username}
              </h1>
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-slate-400 text-sm ml-11">Your credentials are secured with AES-256 encryption</p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">Secure</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityStats.map((stat, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/20 transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${stat.gradient}`} />
            </div>
          ))}
        </div>

        {/* Central Vault */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className={`text-center mb-8 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '400ms' }}>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Your Encrypted Vault
            </h2>
            <p className="text-slate-400">Click the vault to manage your credentials</p>
          </div>

          {/* Vault Icon */}
          <div 
            onClick={() => setVaultOpen(!vaultOpen)}
            className={`relative cursor-pointer group ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            style={{ transitionDelay: '600ms', transition: 'all 1s ease-out' }}
          >
            {/* Outer Glow Ring */}
            <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
            
            {/* Middle Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
            
            {/* Vault Container */}
            <div className={`relative w-48 h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-slate-700 shadow-2xl transform transition-all duration-700 group-hover:scale-110 ${vaultOpen ? 'rotate-180' : 'rotate-0'}`}>
              {/* Lock Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {vaultOpen ? (
                  <Key className="w-20 h-20 text-cyan-400 animate-bounce" />
                ) : (
                  <Lock className="w-20 h-20 text-cyan-400 group-hover:animate-wiggle" />
                )}
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border-2 border-blue-500/20 animate-spin-reverse" />
            </div>
            
            {/* Status Text */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className={`text-sm font-semibold ${vaultOpen ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {vaultOpen ? 'Vault Unlocked' : 'Click to Unlock'}
              </span>
            </div>
          </div>
        </div>

        {/* Vault Content */}
        {vaultOpen && (
          <div className="space-y-8 animate-slide-down">
            {/* Add Credential Section */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-3">
                  <Plus className="w-6 h-6 text-cyan-400" />
                  <span>Add New Credential</span>
                </h3>
                {!showAddForm && (
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
                  >
                    Add Manually
                  </button>
                )}
              </div>

              {/* Drag & Drop Zone */}
              {!showAddForm && (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-cyan-500 bg-cyan-500/10' 
                      : 'border-slate-600 hover:border-cyan-500/50 hover:bg-slate-800/30'
                  }`}
                >
                  <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 text-lg font-semibold mb-2">
                    Drag & Drop CSV File
                  </p>
                  <p className="text-slate-500 text-sm">
                    Or browse to upload your credential export file
                  </p>
                </div>
              )}

              {/* Add Form */}
              {showAddForm && (
                <div className="space-y-6 animate-slide-down">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="App/Website Name"
                        value={newCredential.name}
                        onChange={(e) => setNewCredential({...newCredential, name: e.target.value})}
                        className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-500"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="text"
                        placeholder="Username/Email"
                        value={newCredential.username}
                        onChange={(e) => setNewCredential({...newCredential, username: e.target.value})}
                        className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-500"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="password"
                        placeholder="Password"
                        value={newCredential.password}
                        onChange={(e) => setNewCredential({...newCredential, password: e.target.value})}
                        className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-500"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="url"
                        placeholder="URL (optional)"
                        value={newCredential.url}
                        onChange={(e) => setNewCredential({...newCredential, url: e.target.value})}
                        className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={handleAddCredential}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Save className="w-5 h-5" />
                        <span>Save Credential</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-4 bg-slate-700/50 text-slate-300 rounded-xl font-semibold hover:bg-slate-600/50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Suggested Apps */}
              {!showAddForm && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-slate-300 mb-4">Suggested Apps</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {suggestedApps.map((app, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedAppClick(app)}
                        className="group relative p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="text-4xl mb-2">{app.icon}</div>
                        <p className="text-slate-300 text-sm font-medium group-hover:text-cyan-400 transition-colors">
                          {app.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stored Credentials */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6">
                <Key className="w-6 h-6 text-cyan-400" />
                <span>Stored Credentials</span>
                <span className="text-sm font-normal text-slate-400">({credentials.length})</span>
              </h3>

              <div className="space-y-4">
                {credentials.map((cred, index) => (
                  <div
                    key={cred.id}
                    className="group relative p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl hover:border-cyan-500/50 hover:bg-slate-700/30 transition-all duration-300 transform hover:scale-102"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(cred.category)} flex items-center justify-center text-2xl shadow-lg`}>
                          {cred.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {cred.name}
                          </h4>
                          <p className="text-slate-400 text-sm">{cred.username}</p>
                          <p className="text-slate-500 text-xs mt-1">Updated {cred.lastUpdated}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-blue-600/50 transition-colors">
                          <Eye className="w-5 h-5 text-slate-300" />
                        </button>
                        <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-emerald-600/50 transition-colors">
                          <Edit className="w-5 h-5 text-slate-300" />
                        </button>
                        <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-red-600/50 transition-colors">
                          <Trash2 className="w-5 h-5 text-slate-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-30px); } 
        }
        @keyframes float-delayed { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-20px); } 
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default SecurityDashboard;