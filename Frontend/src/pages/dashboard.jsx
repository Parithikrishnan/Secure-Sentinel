import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield,
  Lock,
  Key,
  Upload,
  X,
  Send,
  Search,
  Hash,
  Users,
  Smile,
  Paperclip,
  MoreVertical,
  FileText,
  ExternalLink,
  Download
} from 'lucide-react';
import Sidebar from '../components/sidebar';

const Dashboard = () => {
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [installedApps, setInstalledApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Community Chat State
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'SecurityBot',
      avatar: '🤖',
      message: 'Welcome to SecureTrust Community! Share your security insights and experiences here.',
      timestamp: '10:30 AM',
      isBot: true
    },
    {
      id: 2,
      user: 'Alice',
      avatar: '👩',
      message: 'Just discovered a phishing attempt on my Facebook account. The URL had a slight misspelling - "faceb00k" instead of "facebook". Always double check!',
      timestamp: '10:32 AM',
      isBot: false
    },
    {
      id: 3,
      user: 'Bob',
      avatar: '👨',
      message: 'Thanks for sharing! I enabled 2FA on all my accounts after reading the community posts here. Feeling much more secure now.',
      timestamp: '10:35 AM',
      isBot: false
    }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const messagesEndRef = useRef(null);

  const channels = [
    { id: 'general', name: 'general', icon: '💬', description: 'General discussions' },
    { id: 'security-alerts', name: 'security-alerts', icon: '🚨', description: 'Latest threats' },
    { id: 'tips-tricks', name: 'tips-tricks', icon: '💡', description: 'Security tips' },
    { id: 'ask-experts', name: 'ask-experts', icon: '🎓', description: 'Expert advice' },
    { id: 'platform-issues', name: 'platform-issues', icon: '⚠️', description: 'Report issues' }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch installed applications from Linux system
  useEffect(() => {
    if (vaultUnlocked) {
      fetchInstalledApps();
    }
  }, [vaultUnlocked]);

  const fetchInstalledApps = async () => {
    try {
      // Simulate fetching installed apps - in production, this would call a backend API
      // that executes Linux commands like: dpkg --get-selections | grep -v deinstall
      const mockApps = [
        { 
          id: 1, 
          name: 'Firefox', 
          icon: '🦊', 
          category: 'browser',
          version: '121.0',
          installed: true 
        },
        { 
          id: 2, 
          name: 'Chrome', 
          icon: '🌐', 
          category: 'browser',
          version: '120.0.6099.129',
          installed: true 
        },
        { 
          id: 3, 
          name: 'Telegram', 
          icon: '✈️', 
          category: 'messaging',
          version: '4.14.3',
          installed: true 
        },
        { 
          id: 4, 
          name: 'Discord', 
          icon: '💬', 
          category: 'messaging',
          version: '0.0.40',
          installed: true 
        },
        { 
          id: 5, 
          name: 'Spotify', 
          icon: '🎵', 
          category: 'entertainment',
          version: '1.2.26.1187',
          installed: true 
        },
        { 
          id: 6, 
          name: 'Slack', 
          icon: '💼', 
          category: 'productivity',
          version: '4.35.126',
          installed: true 
        },
        { 
          id: 7, 
          name: 'VS Code', 
          icon: '💻', 
          category: 'development',
          version: '1.85.1',
          installed: true 
        },
        { 
          id: 8, 
          name: 'Thunderbird', 
          icon: '📧', 
          category: 'email',
          version: '115.6.0',
          installed: true 
        },
        { 
          id: 9, 
          name: 'Signal', 
          icon: '🔒', 
          category: 'messaging',
          version: '6.43.0',
          installed: true 
        },
        { 
          id: 10, 
          name: 'VLC', 
          icon: '🎬', 
          category: 'entertainment',
          version: '3.0.20',
          installed: true 
        }
      ];
      
      setInstalledApps(mockApps);
    } catch (error) {
      console.error('Error fetching installed apps:', error);
    }
  };

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
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = files.map((file, index) => ({
      id: uploadedFiles.length + index + 1,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type || 'unknown',
      icon: getFileIcon(file.name)
    }));
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      txt: '📃',
      csv: '📊',
      xls: '📊',
      xlsx: '📊',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      zip: '📦',
      rar: '📦'
    };
    return icons[ext] || '📁';
  };

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    // This will trigger the sidebar to show app details
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        avatar: '👤',
        message: messageInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isBot: false
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        selectedApp={selectedApp}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Mouse Glow Effect */}
        <div 
          className="fixed w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-cyan-500/5 to-transparent rounded-full transition-all duration-700 ease-out blur-2xl pointer-events-none z-0"
          style={{ left: mousePosition.x - 300, top: mousePosition.y - 300 }}
        />

        {/* Top Header */}
        <header className="relative z-10 px-8 py-4 border-b border-slate-800/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <Shield className="w-6 h-6 text-cyan-400" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">Security Dashboard</h1>
                <p className="text-slate-400 text-sm">Monitor and protect your digital assets</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm font-medium">Vault {vaultUnlocked ? 'Unlocked' : 'Locked'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto relative z-10">
          {!vaultUnlocked ? (
            // Vault Lock Screen
            <div className="flex items-center justify-center h-full p-8">
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
                  <h2 className="text-3xl font-bold text-white mb-3">Click to Unlock Vault</h2>
                  <p className="text-slate-400 text-lg">Access your encrypted credential storage</p>
                </div>
              </div>
            </div>
          ) : (
            // Unlocked Content
            <div className="p-8 space-y-8">
              {/* File Upload Container */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6">
                  <Upload className="w-6 h-6 text-cyan-400" />
                  <span>Upload Documents & Resources</span>
                </h3>

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
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.zip,.rar"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-300 text-lg font-semibold mb-2">
                      Drag & Drop Files Here
                    </p>
                    <p className="text-slate-500 text-sm">
                      Supports: PDF, DOC, TXT, CSV, Images, Archives, URLs
                    </p>
                  </label>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-lg font-semibold text-white">Uploaded Files</h4>
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{file.icon}</span>
                          <div>
                            <p className="text-white font-medium">{file.name}</p>
                            <p className="text-slate-400 text-sm">{file.size}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-red-600/20 rounded-lg transition-colors">
                          <X className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50'
                          : 'bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="text-5xl mb-3">{app.icon}</div>
                      <p className={`text-sm font-semibold mb-1 ${
                        selectedApp?.id === app.id ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
                      }`}>
                        {app.name}
                      </p>
                      <p className="text-xs text-slate-400">{app.version}</p>
                      {selectedApp?.id === app.id && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Community Chat Section */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="flex h-[600px]">
                  {/* Channels Sidebar */}
                  <div className="w-64 border-r border-slate-700/50 p-4">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                      <Hash className="w-5 h-5 text-cyan-400" />
                      <span>Channels</span>
                    </h3>
                    <div className="space-y-2">
                      {channels.map((channel) => (
                        <button
                          key={channel.id}
                          onClick={() => setActiveChannel(channel.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                            activeChannel === channel.id
                              ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                              : 'text-slate-400 hover:bg-slate-700/30 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span>{channel.icon}</span>
                            <span className="font-medium text-sm">{channel.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-700/50">
                      <div className="flex items-center space-x-2 text-slate-400 text-sm">
                        <Users className="w-4 h-4" />
                        <span>247 members online</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="px-6 py-4 border-b border-slate-700/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                            <Hash className="w-5 h-5 text-cyan-400" />
                            <span>{channels.find(ch => ch.id === activeChannel)?.name}</span>
                          </h3>
                          <p className="text-slate-400 text-sm">
                            {channels.find(ch => ch.id === activeChannel)?.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <Search className="w-5 h-5 text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="flex items-start space-x-3 group">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl flex-shrink-0">
                            {msg.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline space-x-2 mb-1">
                              <span className={`font-semibold ${msg.isBot ? 'text-cyan-400' : 'text-white'}`}>
                                {msg.user}
                              </span>
                              <span className="text-slate-500 text-xs">{msg.timestamp}</span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-slate-700/50">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                          <Paperclip className="w-5 h-5 text-slate-400" />
                        </button>
                        <input
                          type="text"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={`Message #${channels.find(ch => ch.id === activeChannel)?.name}`}
                          className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-slate-500"
                        />
                        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                          <Smile className="w-5 h-5 text-slate-400" />
                        </button>
                        <button
                          onClick={handleSendMessage}
                          disabled={!messageInput.trim()}
                          className="px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Privacy Policy Section */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-3 mb-6">
                  <FileText className="w-6 h-6 text-cyan-400" />
                  <span>SecureTrust Privacy Policy</span>
                </h3>

                <div className="space-y-6 text-slate-300">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">1. Data Collection & Storage</h4>
                    <p className="leading-relaxed mb-3">
                      SecureTrust operates on a <span className="text-cyan-400 font-semibold">zero-knowledge architecture</span>. 
                      We do not have access to your encrypted credentials. All data is stored locally on your device using 
                      AES-256 encryption with keys derived from your master password.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                      <li>Master passwords are never transmitted or stored on our servers</li>
                      <li>Encryption keys exist only in RAM and are wiped after inactivity</li>
                      <li>No telemetry or usage tracking</li>
                      <li>All data processing happens offline-first</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">2. Community Features</h4>
                    <p className="leading-relaxed mb-3">
                      Our optional community forum is <span className="text-cyan-400 font-semibold">anonymous by design</span>:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                      <li>No personal information required to participate</li>
                      <li>No IP address logging or tracking</li>
                      <li>End-to-end encrypted discussions</li>
                      <li>Optional pseudonyms for all users</li>
                      <li>Community data can be deleted at any time</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">3. Third-Party Integrations</h4>
                    <p className="leading-relaxed mb-3">
                      When monitoring platform APIs (with user permission):
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                      <li>API tokens are encrypted and stored locally</li>
                      <li>We never store or access your platform credentials</li>
                      <li>Monitoring data is processed locally and encrypted</li>
                      <li>You can revoke API access at any time</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">4. AI Features</h4>
                    <p className="leading-relaxed mb-3">
                      Our AI-powered features (policy summarization, URL detection):
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                      <li>Run entirely offline using local ML models</li>
                      <li>No data sent to external AI services</li>
                      <li>Models are updated securely and verified</li>
                      <li>Processing happens on your device only</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3">5. Your Rights</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-slate-400">
                      <li>Export all your data at any time</li>
                      <li>Delete your account and all associated data</li>
                      <li>Opt-out of optional online features</li>
                      <li>Request information about our security practices</li>
                      <li>Audit our open-source code</li>
                    </ul>
                  </div>

                  <div className="mt-8 p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <h5 className="text-lg font-semibold text-cyan-400 mb-2">Our Commitment</h5>
                        <p className="text-slate-300 leading-relaxed">
                          SecureTrust is built on the principle of <span className="font-semibold">privacy by design</span>. 
                          We believe your data belongs to you, and we've architected our system to ensure we cannot 
                          access your information even if compelled to do so. Your security and privacy are not negotiable.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                    <p className="text-slate-500 text-sm">Last updated: January 29, 2026</p>
                    <div className="flex items-center space-x-3">
                      <a href="#" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">View Full Policy</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Download PDF</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
      `}</style>
    </div>
  );
};

export default Dashboard;