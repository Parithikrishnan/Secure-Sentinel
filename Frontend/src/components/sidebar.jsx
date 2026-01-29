import React, { useState, useEffect } from 'react';
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
  Globe,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  ExternalLink,
  RefreshCw,
  Wifi,
  WifiOff,
  TrendingDown,
  FileCheck,
  Zap
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, selectedApp }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [appMonitoring, setAppMonitoring] = useState(null);
  const [isLoadingMonitoring, setIsLoadingMonitoring] = useState(false);

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

  // Fetch app monitoring data when app is selected
  useEffect(() => {
    if (selectedApp) {
      fetchAppMonitoring(selectedApp);
    }
  }, [selectedApp]);

  const fetchAppMonitoring = async (app) => {
    setIsLoadingMonitoring(true);
    
    // Simulate API call to backend that executes Linux commands
    // In production, this would call endpoints that run:
    // - systemctl status <app> (for service status)
    // - ps aux | grep <app> (for process info)
    // - netstat -tuln | grep <app> (for network connections)
    // - journalctl -u <app> --since today (for logs)
    // - curl -I <app-url> (for uptime check)
    
    setTimeout(() => {
      const mockMonitoring = {
        status: {
          isRunning: Math.random() > 0.2,
          uptime: generateUptime(),
          lastOnline: '2 hours ago',
          pid: Math.floor(Math.random() * 10000) + 1000,
          cpu: (Math.random() * 15).toFixed(1) + '%',
          memory: (Math.random() * 500).toFixed(0) + ' MB'
        },
        network: {
          hasInternet: Math.random() > 0.1,
          latency: Math.floor(Math.random() * 100) + 20 + ' ms',
          dataUsage: (Math.random() * 100).toFixed(1) + ' MB today',
          openPorts: [443, 8080, 3000].slice(0, Math.floor(Math.random() * 3) + 1)
        },
        security: {
          httpsEnabled: Math.random() > 0.2,
          certificateValid: Math.random() > 0.1,
          lastSecurityUpdate: generateRandomDate(),
          vulnerabilities: Math.floor(Math.random() * 3)
        },
        permissions: {
          camera: Math.random() > 0.5,
          microphone: Math.random() > 0.5,
          location: Math.random() > 0.5,
          storage: Math.random() > 0.3,
          notifications: Math.random() > 0.3,
          contacts: Math.random() > 0.7
        },
        privacyPolicy: {
          lastUpdated: generateRandomDate(),
          summary: generatePrivacySummary(app.name),
          dataCollection: ['Usage Analytics', 'Device Information', 'Location Data', 'Contact List'],
          dataSharing: ['Advertising Partners', 'Analytics Services'],
          retentionPeriod: '2 years',
          userRights: ['Data Export', 'Account Deletion', 'Opt-out Marketing']
        },
        uptime: {
          last24h: (Math.random() * 10 + 90).toFixed(2) + '%',
          last7days: (Math.random() * 5 + 95).toFixed(2) + '%',
          last30days: (Math.random() * 8 + 92).toFixed(2) + '%',
          incidents: Math.floor(Math.random() * 5),
          averageResponseTime: Math.floor(Math.random() * 200) + 100 + ' ms'
        }
      };
      
      setAppMonitoring(mockMonitoring);
      setIsLoadingMonitoring(false);
    }, 1500);
  };

  const generateUptime = () => {
    const days = Math.floor(Math.random() * 30);
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  const generateRandomDate = () => {
    const days = Math.floor(Math.random() * 90);
    return `${days} days ago`;
  };

  const generatePrivacySummary = (appName) => {
    return `${appName} collects user data including personal information, usage patterns, and device identifiers. Data is shared with third-party analytics and advertising partners. The app uses cookies and tracking technologies. Users can request data deletion and opt-out of targeted advertising. Privacy policy complies with GDPR and CCPA regulations.`;
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const handleRefreshMonitoring = () => {
    if (selectedApp) {
      fetchAppMonitoring(selectedApp);
    }
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

      {/* Scrollable Content */}
      <div className="h-[calc(100%-180px)] overflow-y-auto custom-scrollbar">
        {/* Selected App Monitoring */}
        {selectedApp ? (
          <div className="relative z-10 p-6 space-y-6">
            {/* App Header */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedApp.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedApp.name}</h3>
                    <p className="text-slate-400 text-sm">{selectedApp.version}</p>
                  </div>
                </div>
                <button 
                  onClick={handleRefreshMonitoring}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  disabled={isLoadingMonitoring}
                >
                  <RefreshCw className={`w-4 h-4 text-cyan-400 ${isLoadingMonitoring ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {isLoadingMonitoring ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent" />
              </div>
            ) : appMonitoring && (
              <>
                {/* Status */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-white flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-cyan-400" />
                      <span>Status</span>
                    </h4>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      appMonitoring.status.isRunning 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {appMonitoring.status.isRunning ? 'Running' : 'Stopped'}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Uptime:</span>
                      <span className="text-white font-medium">{appMonitoring.status.uptime}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Last Online:</span>
                      <span className="text-white font-medium">{appMonitoring.status.lastOnline}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>PID:</span>
                      <span className="text-white font-mono">{appMonitoring.status.pid}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>CPU:</span>
                      <span className="text-white font-medium">{appMonitoring.status.cpu}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Memory:</span>
                      <span className="text-white font-medium">{appMonitoring.status.memory}</span>
                    </div>
                  </div>
                </div>

                {/* Network */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-3">
                    {appMonitoring.network.hasInternet ? (
                      <Wifi className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-red-400" />
                    )}
                    <span>Network</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-400">
                      <span>Connection:</span>
                      <span className={`font-medium ${
                        appMonitoring.network.hasInternet ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {appMonitoring.network.hasInternet ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Latency:</span>
                      <span className="text-white font-medium">{appMonitoring.network.latency}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Data Usage:</span>
                      <span className="text-white font-medium">{appMonitoring.network.dataUsage}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Open Ports:</span>
                      <span className="text-white font-mono text-xs">
                        {appMonitoring.network.openPorts.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-3">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span>Security</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">HTTPS:</span>
                      {appMonitoring.security.httpsEnabled ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Certificate:</span>
                      {appMonitoring.security.certificateValid ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Last Update:</span>
                      <span className="text-white font-medium text-xs">{appMonitoring.security.lastSecurityUpdate}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Vulnerabilities:</span>
                      <span className={`font-semibold ${
                        appMonitoring.security.vulnerabilities === 0 ? 'text-emerald-400' : 'text-orange-400'
                      }`}>
                        {appMonitoring.security.vulnerabilities}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Permissions */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-3">
                    <Eye className="w-4 h-4 text-purple-400" />
                    <span>Permissions</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(appMonitoring.permissions).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-slate-400 capitalize">{key}:</span>
                        {value ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Uptime Statistics */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Uptime</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Last 24h</span>
                        <span className="text-white font-semibold">{appMonitoring.uptime.last24h}</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: appMonitoring.uptime.last24h }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Last 7 days</span>
                        <span className="text-white font-semibold">{appMonitoring.uptime.last7days}</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: appMonitoring.uptime.last7days }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Last 30 days</span>
                        <span className="text-white font-semibold">{appMonitoring.uptime.last30days}</span>
                      </div>
                      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: appMonitoring.uptime.last30days }}
                        />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-700/50 space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Incidents:</span>
                        <span className="text-white font-medium">{appMonitoring.uptime.incidents}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Avg Response:</span>
                        <span className="text-white font-medium">{appMonitoring.uptime.averageResponseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Privacy Policy Summary */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-white flex items-center space-x-2 mb-3">
                    <FileCheck className="w-4 h-4 text-violet-400" />
                    <span>Privacy Policy</span>
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="text-slate-400 mb-2">
                        <span className="font-semibold text-white">Last Updated:</span> {appMonitoring.privacyPolicy.lastUpdated}
                      </p>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {appMonitoring.privacyPolicy.summary}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-white mb-2">Data Collection:</p>
                      <ul className="space-y-1">
                        {appMonitoring.privacyPolicy.dataCollection.map((item, idx) => (
                          <li key={idx} className="text-slate-400 flex items-start space-x-2">
                            <span className="text-orange-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-white mb-2">Data Sharing:</p>
                      <ul className="space-y-1">
                        {appMonitoring.privacyPolicy.dataSharing.map((item, idx) => (
                          <li key={idx} className="text-slate-400 flex items-start space-x-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between text-slate-400 pt-2 border-t border-slate-700/50">
                      <span>Retention:</span>
                      <span className="text-white font-medium">{appMonitoring.privacyPolicy.retentionPeriod}</span>
                    </div>
                    
                    <button className="w-full mt-2 px-3 py-2 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 rounded-lg text-violet-400 font-medium transition-colors flex items-center justify-center space-x-2">
                      <ExternalLink className="w-3 h-3" />
                      <span>View Full Policy</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          // Navigation Items (when no app selected)
          <div className="relative z-10 px-6 py-4 space-y-2">
            {/* Security Status Badge */}
            <div className="mb-4">
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

            {navigationItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                    isActive ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                    animation: 'slideInLeft 0.5s ease-out forwards'
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'
                  }`} />
                  
                  {hoveredItem === index && !isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} blur-xl opacity-20`} />
                  )}
                  
                  <div className={`relative flex items-center space-x-4 px-4 py-4 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  }`}>
                    <div className={`relative transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? 'scale-110' : ''
                    }`}>
                      <div className={`p-2 rounded-lg ${
                        isActive ? 'bg-white/20 shadow-lg' : 'bg-slate-700/30 group-hover:bg-slate-700/50'
                      }`}>
                        {item.icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm">{item.label}</div>
                      <div className={`text-xs transition-opacity duration-300 ${
                        isActive ? 'text-white/70 opacity-100' : 'text-slate-500 opacity-0 group-hover:opacity-100'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                    
                    <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} />
                  </div>
                  
                  {isActive && (
                    <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 rounded-r-full bg-gradient-to-b ${item.gradient} shadow-lg`} />
                  )}
                  
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                  )}
                </button>
              );
            })}
          </div>
        )}
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