import React, { useState, useEffect } from 'react';
import { 
  Shield,
  Lock,
  Key,
  Upload,
  X,
  Send,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Clock,
  Activity,
  TrendingUp,
  FileText,
  Zap,
  Wifi,
  CreditCard,
  Info
} from 'lucide-react';

const SecurityDashboard = () => {
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragActive, setDragActive] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  // Mock installed applications
  const installedApps = [
    { id: 1, name: 'Firefox', icon: '🦊', category: 'Browser', version: '121.0', upiSupport: false },
    { id: 2, name: 'Chrome', icon: '🌐', category: 'Browser', version: '120.0.6099', upiSupport: false },
    { id: 3, name: 'Telegram Desktop', icon: '✈️', category: 'Messaging', version: '4.14.3', upiSupport: false },
    { id: 4, name: 'Discord', icon: '💬', category: 'Messaging', version: '0.0.40', upiSupport: false },
    { id: 5, name: 'Spotify', icon: '🎵', category: 'Entertainment', version: '1.2.26', upiSupport: true },
    { id: 6, name: 'Signal', icon: '🔒', category: 'Messaging', version: '6.43.0', upiSupport: false },
    { id: 7, name: 'VS Code', icon: '💻', category: 'Development', version: '1.85.1', upiSupport: false },
    { id: 8, name: 'LibreOffice', icon: '📝', category: 'Productivity', version: '7.6.4', upiSupport: false },
    { id: 9, name: 'GIMP', icon: '🎨', category: 'Graphics', version: '2.10.36', upiSupport: false },
    { id: 10, name: 'VLC Media Player', icon: '🎬', category: 'Entertainment', version: '3.0.20', upiSupport: false },
    { id: 11, name: 'Thunderbird', icon: '📧', category: 'Email', version: '115.6.0', upiSupport: false },
    { id: 12, name: 'Slack', icon: '💼', category: 'Productivity', version: '4.35.126', upiSupport: false },
    { id: 13, name: 'Zoom', icon: '📹', category: 'Communication', version: '5.16.10', upiSupport: false },
    { id: 14, name: 'FileZilla', icon: '📁', category: 'Development', version: '3.66.4', upiSupport: false },
    { id: 15, name: 'Audacity', icon: '🎙️', category: 'Audio', version: '3.4.2', upiSupport: false }
  ];

  // Mock community posts
  const communityPosts = [
    {
      id: 1,
      user: 'SecurityBot',
      avatar: '🤖',
      avatarGradient: 'from-cyan-500 to-blue-600',
      timestamp: '2 hours ago',
      message: '🚨 Security Alert: New phishing campaign targeting Chrome users. Always verify URLs before entering credentials. The fake sites use domains like "chr0me-security.com" with zero instead of O.',
      reactions: { likes: 24, replies: 5 }
    },
    {
      id: 2,
      user: 'Alice Morgan',
      avatar: '👩',
      avatarGradient: 'from-purple-500 to-pink-600',
      timestamp: '4 hours ago',
      message: 'Just enabled 2FA on all my accounts using authenticator apps. Feeling much more secure! Pro tip: Use multiple backup codes and store them encrypted.',
      reactions: { likes: 18, replies: 3 }
    },
    {
      id: 3,
      user: 'David Chen',
      avatar: '👨',
      avatarGradient: 'from-emerald-500 to-teal-600',
      timestamp: '6 hours ago',
      message: 'PSA: Telegram just updated their privacy policy. Key changes include metadata retention period reduced from 12 to 6 months. Kudos to them for transparency! 👏',
      reactions: { likes: 32, replies: 8 }
    },
    {
      id: 4,
      user: 'Sarah Wilson',
      avatar: '👩‍💼',
      avatarGradient: 'from-orange-500 to-red-600',
      timestamp: '8 hours ago',
      message: 'Reminder: Review your browser extensions regularly. I just found 3 extensions I installed years ago that now have sketchy permissions. Removed them immediately.',
      reactions: { likes: 27, replies: 6 }
    },
    {
      id: 5,
      user: 'TechGuardian',
      avatar: '🛡️',
      avatarGradient: 'from-indigo-500 to-purple-600',
      timestamp: '10 hours ago',
      message: 'New tutorial posted: "How to audit app permissions on Linux using AppArmor and SELinux". Link in profile. Perfect for privacy-conscious users!',
      reactions: { likes: 41, replies: 12 }
    },
    {
      id: 6,
      user: 'Mike Rodriguez',
      avatar: '👨‍💻',
      avatarGradient: 'from-blue-500 to-cyan-600',
      timestamp: '12 hours ago',
      message: 'Anyone else notice Spotify asking for more permissions in the latest update? They now want access to contacts. Denied it but curious why they need that.',
      reactions: { likes: 19, replies: 15 }
    },
    {
      id: 7,
      user: 'SecurityBot',
      avatar: '🤖',
      avatarGradient: 'from-cyan-500 to-blue-600',
      timestamp: '14 hours ago',
      message: '📊 Weekly Security Report: 247 members have improved their security scores this week! Average security score increased from 72% to 78%. Keep up the great work! 🎉',
      reactions: { likes: 56, replies: 4 }
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleVaultClick = () => {
    if (!vaultUnlocked) {
      setIsUnlocking(true);
      setTimeout(() => {
        setVaultUnlocked(true);
        setIsUnlocking(false);
      }, 1500);
    }
  };

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
      console.log('Files dropped:', e.dataTransfer.files);
      // Handle file upload logic here
    }
  };

  const handleAppSelect = (app) => {
    setSelectedApp(app);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Message sent:', messageInput);
      setMessageInput('');
    }
  };

  const getAppDetails = (app) => {
    if (!app) return null;

    return {
      uptime: (Math.random() * 2 + 98).toFixed(2) + '%',
      lastDowntime: generateRandomPastDate(),
      lastOnline: generateRecentTimestamp(),
      features: generateFeatures(app.category),
      privacySummary: generatePrivacySummary(app.name),
      recommendations: generateRecommendations(app)
    };
  };

  const generateRandomPastDate = () => {
    const days = Math.floor(Math.random() * 30) + 1;
    return `${days} days ago`;
  };

  const generateRecentTimestamp = () => {
    const minutes = Math.floor(Math.random() * 60);
    return minutes === 0 ? 'Just now' : `${minutes} minutes ago`;
  };

  const generateFeatures = (category) => {
    const features = {
      'Browser': ['Private browsing mode', 'Password manager', 'Extension support', 'Sync across devices'],
      'Messaging': ['End-to-end encryption', 'Group chats', 'File sharing', 'Voice/Video calls'],
      'Entertainment': ['Offline mode', 'High-quality streaming', 'Playlists', 'Cross-platform sync'],
      'Productivity': ['Cloud sync', 'Collaboration tools', 'Templates', 'Export options'],
      'Development': ['Syntax highlighting', 'Git integration', 'Extensions', 'Debugging tools'],
      'Graphics': ['Layer support', 'Filters & effects', 'Custom brushes', 'Export formats'],
      'Email': ['PGP encryption', 'Calendar integration', 'Spam filtering', 'Multiple accounts'],
      'Communication': ['Screen sharing', 'Recording', 'Virtual backgrounds', 'Chat'],
      'Audio': ['Multi-track editing', 'Effects library', 'Noise reduction', 'Export formats']
    };
    return features[category] || ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'];
  };

  const generatePrivacySummary = (appName) => {
    return `${appName} collects minimal user data necessary for core functionality. Data is encrypted in transit and at rest. Third-party analytics are limited to crash reporting and performance metrics. Users can request data deletion at any time. The app complies with GDPR and CCPA regulations. No data is sold to advertisers. Local data storage is used whenever possible to minimize cloud dependency.`;
  };

  const generateRecommendations = (app) => {
    const baseRecommendations = [
      { text: 'Enable two-factor authentication', status: 'warning', icon: AlertTriangle },
      { text: 'Review app permissions regularly', status: 'warning', icon: AlertTriangle },
      { text: 'Keep app updated to latest version', status: app.version.includes('1.') ? 'success' : 'warning', icon: app.version.includes('1.') ? CheckCircle : AlertTriangle }
    ];

    if (app.category === 'Browser') {
      baseRecommendations.push(
        { text: 'Clear browsing data periodically', status: 'warning', icon: AlertTriangle },
        { text: 'Use strong master password', status: 'success', icon: CheckCircle }
      );
    }

    if (app.category === 'Messaging') {
      baseRecommendations.push(
        { text: 'Verify encryption is enabled', status: 'success', icon: CheckCircle },
        { text: 'Limit data retention period', status: 'warning', icon: AlertTriangle }
      );
    }

    return baseRecommendations;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Browser': 'from-blue-500 to-cyan-500',
      'Messaging': 'from-green-500 to-emerald-500',
      'Entertainment': 'from-purple-500 to-pink-500',
      'Productivity': 'from-orange-500 to-amber-500',
      'Development': 'from-indigo-500 to-blue-500',
      'Graphics': 'from-rose-500 to-pink-500',
      'Email': 'from-red-500 to-orange-500',
      'Communication': 'from-cyan-500 to-teal-500',
      'Audio': 'from-violet-500 to-purple-500'
    };
    return colors[category] || 'from-slate-500 to-gray-500';
  };

  const appDetails = selectedApp ? getAppDetails(selectedApp) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden flex">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
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

      {/* Main Content (Left Side) */}
      <div className={`flex-1 transition-all duration-300 ${selectedApp ? 'mr-96' : 'mr-0'}`}>
        <div className="relative z-10 p-8">
          {!vaultUnlocked ? (
            // Vault Lock Screen
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div 
                  onClick={handleVaultClick}
                  className="relative cursor-pointer group inline-block"
                >
                  {/* Outer Glow Ring */}
                  <div className="absolute -inset-12 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse" />
                  
                  {/* Middle Ring */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                  
                  {/* Vault Container */}
                  <div className={`relative w-64 h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-4 border-slate-700 shadow-2xl transform transition-all duration-700 group-hover:scale-110 ${isUnlocking ? 'rotate-180 scale-110' : 'rotate-0'}`}>
                    {/* Lock Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isUnlocking || vaultUnlocked ? (
                        <Key className="w-24 h-24 text-cyan-400 animate-bounce" />
                      ) : (
                        <Lock className="w-24 h-24 text-cyan-400 group-hover:animate-wiggle" />
                      )}
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin-slow" />
                    <div className="absolute inset-4 rounded-full border-2 border-blue-500/20 animate-spin-reverse" />
                  </div>
                </div>
                
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-white mb-3">
                    {vaultUnlocked ? 'Vault Unlocked' : 'Click to Unlock Vault'}
                  </h2>
                  <p className="text-slate-400 text-lg">Access your encrypted security dashboard</p>
                </div>
              </div>
            </div>
          ) : (
            // Unlocked Content
            <div className="space-y-8 animate-slide-down">
              {/* Upload Container */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6">
                  <Upload className="w-6 h-6 text-cyan-400" />
                  <span>Upload Privacy Policies & Documents</span>
                </h3>

                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
                    dragActive 
                      ? 'border-cyan-500 bg-cyan-500/10 scale-105' 
                      : 'border-slate-600 hover:border-cyan-500/50 hover:bg-slate-800/30'
                  }`}
                >
                  <Upload className="w-20 h-20 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 text-xl font-semibold mb-2">
                    Drop PDF, DOCX, URL, or CSV here
                  </p>
                  <p className="text-slate-500 text-sm">
                    Upload privacy policies, terms of service, or credential exports for analysis
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => console.log('Files selected:', e.target.files)}
                    className="hidden"
                    id="file-input"
                  />
                  <label
                    htmlFor="file-input"
                    className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>
              </div>

              {/* Installed Applications */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <span>Installed Applications</span>
                  <span className="text-sm font-normal text-slate-400">({installedApps.length})</span>
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {installedApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleAppSelect(app)}
                      className={`group relative p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                        selectedApp?.id === app.id
                          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                          : 'bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="text-5xl mb-3">{app.icon}</div>
                      <p className={`text-sm font-semibold mb-1 truncate ${
                        selectedApp?.id === app.id ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
                      }`}>
                        {app.name}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getCategoryColor(app.category)} text-white`}>
                        {app.category}
                      </span>
                      {selectedApp?.id === app.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Community Feed */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6">
                  <MessageCircle className="w-6 h-6 text-cyan-400" />
                  <span>Community & Security News</span>
                </h3>

                {/* Feed Area */}
                <div className="max-h-[500px] overflow-y-auto space-y-4 mb-4 custom-scrollbar">
                  {communityPosts.map((post) => (
                    <div key={post.id} className="group p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                      <div className="flex items-start space-x-3">
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarGradient} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
                          {post.avatar}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline space-x-2 mb-1">
                            <span className="font-semibold text-white">{post.user}</span>
                            <span className="text-slate-500 text-xs">{post.timestamp}</span>
                          </div>
                          <p className="text-slate-300 leading-relaxed text-sm mb-3">{post.message}</p>
                          
                          {/* Reactions */}
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors group/like">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-xs font-medium">{post.reactions.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-slate-400 hover:text-cyan-400 transition-colors group/reply">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-xs font-medium">{post.reactions.replies}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Box */}
                <div className="flex items-center space-x-3 pt-4 border-t border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xl flex-shrink-0">
                    👤
                  </div>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Share your security insights..."
                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Privacy Policy Footer */}
              <div className="text-center p-8 bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl backdrop-blur-xl">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-lg font-bold text-white">SecureTrust Privacy Policy</h4>
                </div>
                <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto mb-4">
                  All your data stays <span className="text-cyan-400 font-semibold">offline and encrypted with AES-256</span>. 
                  We never upload credentials or personal information to any server. Your master password never leaves your device. 
                  All monitoring and analysis happens locally. Zero-knowledge architecture ensures complete privacy.
                </p>
                <a href="#" className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                  <span>Read Full Privacy Policy</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar (Fixed) */}
      {selectedApp && (
        <div className="fixed right-0 top-0 h-full w-96 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-l border-slate-700/50 shadow-2xl overflow-y-auto custom-scrollbar animate-slide-in-right z-50">
          {/* App Header */}
          <div className="sticky top-0 z-10 p-6 border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-5xl">{selectedApp.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedApp.name}</h3>
                  <p className="text-slate-400 text-sm">{selectedApp.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 space-y-6">
            {/* Security Overview */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-4">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Security Overview</span>
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Installed:</span>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-medium">Yes</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Version:</span>
                  <span className="text-white font-medium font-mono text-xs">{selectedApp.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated:</span>
                  <span className="text-white font-medium text-xs">{appDetails.lastDowntime}</span>
                </div>
              </div>
            </div>

            {/* UPI / Payment Support */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-4">
                <CreditCard className="w-4 h-4 text-purple-400" />
                <span>UPI / Payment Support</span>
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Payment Integration:</span>
                  {selectedApp.upiSupport ? (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 font-medium text-sm">Supported</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <X className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-500 font-medium text-sm">Not Available</span>
                    </div>
                  )}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {selectedApp.upiSupport 
                    ? 'This app supports UPI payments and integrates with payment gateways. Always verify payment URLs and enable transaction notifications.'
                    : 'This application does not currently support payment integration or UPI transactions.'}
                </p>
              </div>
            </div>

            {/* Uptime & Reliability */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-4">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Uptime & Reliability</span>
              </h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Service Uptime</span>
                    <span className="text-2xl font-bold text-emerald-400">{appDetails.uptime}</span>
                  </div>
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/50"
                      style={{ width: appDetails.uptime }}
                    />
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Downtime:</span>
                    <span className="text-white font-medium">{appDetails.lastDowntime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Checked:</span>
                    <span className="text-white font-medium">{appDetails.lastOnline}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Policy */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-4">
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Privacy Policy</span>
              </h4>
              <div className="space-y-3">
                <p className="text-slate-300 text-xs leading-relaxed">
                  {appDetails.privacySummary}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center space-x-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>View Official Policy</span>
                </a>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-4">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Key Features</span>
              </h4>
              <ul className="space-y-2">
                {appDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-slate-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-4">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <span>Security Recommendations</span>
              </h4>
              <ul className="space-y-3">
                {appDetails.recommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <li key={index} className="flex items-start space-x-3">
                      <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        rec.status === 'success' ? 'text-emerald-400' : 'text-orange-400'
                      }`} />
                      <span className="text-slate-300 text-sm">{rec.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder when no app selected */}
      {!selectedApp && vaultUnlocked && (
        <div className="fixed right-0 top-0 h-full w-96 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-l border-slate-700/50 shadow-2xl flex items-center justify-center animate-slide-in-right">
          <div className="text-center p-8">
            <Info className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-400 mb-2">No App Selected</h3>
            <p className="text-slate-500 text-sm">
              Select an application from the list to view detailed information, security analysis, and recommendations.
            </p>
          </div>
        </div>
      )}

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
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
        .animate-slide-down { animation: slide-down 0.5s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.4s ease-out; }
        
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
    </div>
  );
};

export default SecurityDashboard;