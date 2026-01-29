import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Minimize2, Shield, User, Copy, ExternalLink, Sparkles, Lock, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

const SecurityChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your Digital Security Assistant. I can help you understand social media security, credential management, privacy policies, suspicious URLs, and how to enhance your digital trust. How can I assist you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Default responses for common security questions
  const defaultResponses = {
    "how do I secure my social media accounts": `🔐 **Securing Your Social Media Accounts**

🎯 **Key Security Measures**

**Enable Multi-Factor Authentication (MFA)**
- Adds an extra layer of security beyond passwords
- Use authenticator apps like Google Authenticator or Authy
- Avoid SMS-based MFA when possible (SIM swapping risks)

**Use Strong, Unique Passwords**
- Minimum 12-16 characters
- Mix uppercase, lowercase, numbers, and symbols
- Never reuse passwords across platforms
- Consider using a password manager

**Review Login Activity Regularly**
- Check for unrecognized devices or locations
- Set up login alerts
- Remove old or suspicious sessions

**Manage Third-Party App Permissions**
- Review connected apps quarterly
- Revoke access for unused applications
- Only grant necessary permissions

**Enable Account Recovery Options**
- Add backup email addresses
- Set up trusted phone numbers
- Store recovery codes securely offline

🔗 **Need Help?**
👉 Our platform provides automated security health monitoring for all these aspects!`,

    "what is aes-256 encryption": `🔒 **AES-256 Encryption Explained**

🎯 **What is AES-256?**

**Advanced Encryption Standard (AES)**
- Industry-standard encryption algorithm
- 256-bit key length (virtually unbreakable)
- Used by governments, banks, and security professionals
- Approved by NSA for TOP SECRET information

**How It Works**
- Your master password generates a unique encryption key
- All credentials are encrypted before storage
- Data remains scrambled without the correct key
- Even if someone accesses your device, data is unreadable

**Our Implementation**
- Zero-knowledge architecture
- Keys stored only in RAM (never on disk)
- Automatic key wiping after inactivity
- PBKDF2/bcrypt for key derivation
- Protects against brute-force attacks

💡 **Why This Matters**
Your sensitive data is protected even if:
- Your device is stolen
- Malware infects your system
- Cloud storage is compromised
- Unauthorized access occurs

🔗 **Learn More**
👉 https://en.wikipedia.org/wiki/Advanced_Encryption_Standard`,

    "how do I detect phishing urls": `⚠️ **Detecting Suspicious & Phishing URLs**

🎯 **Warning Signs**

**Look for These Red Flags**
- Misspelled domain names (faceb00k.com instead of facebook.com)
- Unusual domain extensions (.xyz, .top, .tk)
- Extra subdomains (secure-login.verify-account.com)
- HTTPS missing or invalid certificate
- Shortened URLs hiding real destination
- Urgent language ("Act now!" "Verify immediately!")

**URL Structure Analysis**
- Check the actual domain (hover before clicking)
- Look for extra characters or hyphens
- Verify legitimate company domains
- Be wary of IP addresses instead of domains

**Our AI Detection Features**
- Real-time URL scanning
- Pattern recognition for known threats
- Domain reputation checking
- Certificate validation
- Redirects analysis

**Best Practices**
- Never click links in unexpected emails
- Type URLs directly into browser
- Use bookmark for important sites
- Enable browser phishing protection
- Verify sender identity before clicking

🔗 **Quick Check**
👉 Our platform provides instant URL analysis before you click!`,

    "what are my privacy risks on social media": `🚨 **Social Media Privacy Risks**

🎯 **Major Risks to Understand**

**Data Collection & Tracking**
- Location tracking through photos and check-ins
- Behavioral profiling from likes and interactions
- Third-party data sharing with advertisers
- Cross-platform tracking cookies
- Facial recognition in photos

**Account Security Threats**
- Account takeover attacks (weak/reused passwords)
- Session hijacking on public Wi-Fi
- Phishing attempts via DMs
- Social engineering attacks
- Credential stuffing from data breaches

**Privacy Policy Concerns**
- Terms of service changes (often unnoticed)
- Data retention policies
- Third-party data selling
- Government data requests
- Data breach notifications delays

**Permission Overreach**
- Apps requesting unnecessary access
- Camera/microphone permissions
- Contact list harvesting
- Location tracking 24/7
- Background data collection

**Our Solution**
- AI-powered policy summarization
- Permission audit dashboard
- Suspicious activity alerts
- Encrypted credential storage
- Security health scoring

💡 **Take Control**
👉 Regular security audits reduce risk by 70%!`,

    "how does your security dashboard work": `📊 **Security Health Dashboard**

🎯 **Comprehensive Monitoring**

**Password Strength Analysis**
- Real-time password scoring
- Breach database checking
- Reuse detection across platforms
- Weak password identification
- Automatic strength recommendations

**Multi-Factor Authentication Status**
- MFA enabled/disabled tracking
- Authentication method recommendations
- Backup code verification
- Recovery option status

**Platform Permissions Audit**
- Connected apps inventory
- Permission level analysis
- Last access timestamps
- Unused app identification
- Revocation recommendations

**Device Login Tracking** (Platform-dependent)
- Active sessions monitoring
- Unknown device alerts
- Geographic location tracking
- Login time patterns
- Suspicious activity detection

**Privacy Policy Updates**
- AI-powered summarization
- Change notifications
- Key terms highlighting
- Risk assessment scoring

**Security Score**
- Overall security health (0-100)
- Category-wise breakdown
- Improvement recommendations
- Trend tracking over time

🔒 **Privacy First**
- All data encrypted locally (AES-256)
- Zero-knowledge architecture
- No data sent to servers
- Optional online features only

💡 **Visual Indicators**
- 🟢 Strong security
- 🟡 Needs attention
- 🔴 Critical issues`,

    "explain zero-knowledge security": `🛡️ **Zero-Knowledge Security Model**

🎯 **What is Zero-Knowledge?**

**Core Principle**
- We never have access to your data
- All encryption happens on your device
- Master password never leaves your device
- No one (not even us) can decrypt your data

**How It Works**

**Step 1: Master Password**
- You create a strong master password
- This password is NEVER sent to any server
- It's the only key to your encrypted data

**Step 2: Key Derivation**
- Your password generates an encryption key using PBKDF2/bcrypt
- Thousands of iterations make brute-force impossible
- Unique salt ensures key uniqueness

**Step 3: Local Encryption**
- All credentials encrypted with AES-256
- Encryption happens entirely on your device
- Encrypted data stored locally

**Step 4: RAM-Only Keys**
- Encryption keys stored only in volatile memory
- Automatically wiped after inactivity
- Never written to disk
- Cleared on app close

**Security Benefits**
- No server-side data breaches possible
- Protection against company compromise
- Complete user control
- Privacy by design
- Immunity to legal data requests

**Trade-offs**
- Lost master password = lost data
- No password recovery possible
- Responsibility lies with user
- Must maintain secure backups

💡 **Why This Matters**
Even if someone hacks our servers, your data remains encrypted and useless without your master password.

🔗 **Industry Standard**
👉 Used by: 1Password, Bitwarden, Signal`,

    "what is the community forum": `💬 **Anonymous Community Forum**

🎯 **Share Insights Safely**

**Purpose**
- Share security experiences anonymously
- Learn from other users' incidents
- Discuss platform-specific concerns
- Get peer support and advice
- Report suspicious activities

**Privacy Protection**
- Complete anonymity (no personal data required)
- End-to-end encrypted discussions
- No IP logging or tracking
- Optional pseudonyms
- Moderated for safety

**Forum Categories**

**🚨 Security Alerts**
- Recent phishing campaigns
- New scam tactics
- Platform vulnerabilities
- Data breach notifications

**💡 Best Practices**
- Security tips and tricks
- Tool recommendations
- Configuration guides
- Recovery stories

**❓ Questions & Support**
- Technical help requests
- Feature clarifications
- Troubleshooting guidance
- General security advice

**📊 Platform Discussions**
- Platform-specific issues
- Policy change discussions
- Feature comparisons
- Reliability reports

**Community Guidelines**
- Respectful communication
- No personal attacks
- Evidence-based claims
- No illegal activities
- Privacy respect

**Trust Score System**
- Helpful contributions rewarded
- Community reputation building
- Expert badges for consistent quality
- Spam/abuse prevention

🔒 **Your Privacy Guaranteed**
- Optional participation
- Anonymous by default
- No data retention after deletion
- Encrypted communications`,

    "how do I get started": `🚀 **Getting Started Guide**

🎯 **Quick Setup (5 Minutes)**

**Step 1: Download & Install**
- Available for Windows, Mac, Linux
- Mobile apps: iOS & Android
- No account required
- Completely free

**Step 2: Create Master Password**
- Choose a strong, memorable password
- Write it down and store securely
- This cannot be recovered if lost
- Required for all future access

**Step 3: Add Your First Account**
- Click "Add Social Media Account"
- Enter platform name and credentials
- All data encrypted automatically
- Stored locally on your device

**Step 4: Run Security Audit**
- Click "Security Health Check"
- Review dashboard insights
- Follow recommendations
- Improve your security score

**Step 5: Enable Monitoring**
- Set up login activity tracking
- Configure permission alerts
- Enable suspicious URL detection
- Customize notification preferences

**Optional: Online Features**
- Join anonymous community forum
- Enable platform reliability tracking
- Subscribe to curated security news
- All optional and privacy-focused

**Next Steps**

**Daily Use**
- Check security dashboard weekly
- Review login activity regularly
- Monitor permission changes
- Stay updated on threats

**Advanced Features**
- AI policy summarization
- Batch credential import
- Security reports export
- Multi-device sync (encrypted)

💡 **Pro Tip**
Set a calendar reminder for monthly security audits!

🔗 **Need Help?**
👉 Visit our documentation: docs.digitaltrust.app
👉 Video tutorials: youtube.com/digitaltrust`,
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text.replace(/<[^>]*>/g, ''));
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        isBot: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newMessage]);
      const userInput = inputValue.toLowerCase();
      setInputValue('');
      setIsTyping(true);

      // Simulate typing delay
      setTimeout(() => {
        setIsTyping(false);
        
        // Check for default responses
        let botResponseText = '';
        for (const [key, value] of Object.entries(defaultResponses)) {
          if (userInput.includes(key.toLowerCase()) || key.toLowerCase().includes(userInput)) {
            botResponseText = value;
            break;
          }
        }

        // Fallback response if no match found
        if (!botResponseText) {
          botResponseText = `I understand you're asking about: "${inputValue}"\n\nWhile I don't have a specific answer for that yet, here are some related topics I can help with:\n\n- Social media account security\n- AES-256 encryption explained\n- Detecting phishing URLs\n- Privacy risks on social media\n- Security dashboard features\n- Zero-knowledge security model\n- Community forum information\n- Getting started guide\n\nPlease ask about any of these topics, or try rephrasing your question!`;
        }

        const botResponse = {
          id: messages.length + 2,
          text: botResponseText,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1500);

      // For production, replace above with API call:
      /*
      try {
        const response = await fetch('http://localhost:3000/api/security-chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputValue }),
          credentials: 'include'
        });

        const data = await response.json();
        setIsTyping(false);
        
        if (response.ok) {
          const botResponse = {
            id: messages.length + 2,
            text: data.response,
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          const errorResponse = {
            id: messages.length + 2,
            text: 'Sorry, something went wrong. Please try again.',
            isBot: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, errorResponse]);
        }
      } catch (error) {
        setIsTyping(false);
        const errorResponse = {
          id: messages.length + 2,
          text: 'Error connecting to the server. Please check your connection.',
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, errorResponse]);
      }
      */
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (message) => {
    setInputValue(message);
    setTimeout(() => handleSend(), 100);
  };

  const formatMessage = (text) => {
    return text
      .replace(/^##+\s?/gm, '')
      .replace(/🔐\s?(.*)/g, '<div class="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-blue-900 mb-1 flex items-center gap-2">🔐 <span>$1</span></span></div>')
      .replace(/🔒\s?(.*)/g, '<div class="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-green-900 mb-1 flex items-center gap-2">🔒 <span>$1</span></span></div>')
      .replace(/⚠️\s?(.*)/g, '<div class="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-orange-900 mb-1 flex items-center gap-2">⚠️ <span>$1</span></span></div>')
      .replace(/🚨\s?(.*)/g, '<div class="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-red-900 mb-1 flex items-center gap-2">🚨 <span>$1</span></span></div>')
      .replace(/🛡️\s?(.*)/g, '<div class="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-purple-900 mb-1 flex items-center gap-2">🛡️ <span>$1</span></span></div>')
      .replace(/📊\s?(.*)/g, '<div class="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-cyan-900 mb-1 flex items-center gap-2">📊 <span>$1</span></span></div>')
      .replace(/💬\s?(.*)/g, '<div class="bg-gradient-to-r from-teal-50 to-green-50 border-l-4 border-teal-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-teal-900 mb-1 flex items-center gap-2">💬 <span>$1</span></span></div>')
      .replace(/🚀\s?(.*)/g, '<div class="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500 p-4 mb-4 rounded-r-xl shadow-sm"><span class="block text-lg font-bold text-indigo-900 mb-1 flex items-center gap-2">🚀 <span>$1</span></span></div>')
      .replace(/(🎯\s?[^<\n]+)/g, '<div class="font-bold text-gray-900 mt-6 mb-3 pb-2 border-b-2 border-blue-400 flex items-center gap-2 text-blue-700">$1</div>')
      .replace(/(💡\s?[^<\n]+)/g, '<div class="font-bold text-gray-900 mt-6 mb-3 pb-2 border-b-2 border-yellow-400 flex items-center gap-2 text-yellow-700">$1</div>')
      .replace(/(🔗\s?[^<\n]+)/g, '<div class="font-bold text-gray-900 mt-6 mb-3 pb-2 border-b-2 border-teal-400 flex items-center gap-2 text-teal-700">$1</div>')
      .replace(/👉\s?(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline font-medium bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 transition-all duration-200 transform hover:-translate-y-0.5"><span>$1</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
      .replace(/^-\s?(.*)/gm, '<div class="flex items-start gap-3 mb-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"><span class="w-3 h-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mt-1.5 flex-shrink-0 shadow-sm"></span><span class="text-sm text-gray-700 leading-relaxed">$1</span></div>')
      .replace(/\n\n/g, '<div class="mb-4"></div>');
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 text-white p-5 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          <Shield size={32} className="relative z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border-0 transition-all duration-300 flex flex-col overflow-hidden backdrop-blur-lg ${
        isMinimized ? 'w-80 h-16' : 'w-[500px] h-[700px]'
      }`} style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 via-transparent to-cyan-400/20"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                Digital Security Assistant
                <Lock size={16} className="text-cyan-300 animate-pulse" />
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xs text-blue-100">Secure • Encrypted • Private</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 relative z-10">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
              {messages.length === 1 ? (
                <div className="text-center space-y-6 animate-fade-in">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                      <Shield size={32} className="text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome to Digital Security Assistant</h3>
                    <p className="text-gray-600 mb-6">Enhance your social media security and digital trust. Start by exploring these topics:</p>
                    <div className="grid gap-3">
                      {[
                        "How do I secure my social media accounts?",
                        "What is AES-256 encryption?",
                        "How do I detect phishing URLs?",
                        "What are my privacy risks on social media?",
                        "How does your security dashboard work?",
                        "Explain zero-knowledge security",
                        "What is the community forum?",
                        "How do I get started?"
                      ].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickAction(question)}
                          className="px-5 py-4 rounded-xl text-sm font-medium text-indigo-700 bg-gradient-to-r from-indigo-50 to-cyan-50 hover:from-indigo-100 hover:to-cyan-100 border border-indigo-200/50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 text-left group backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span>{question}</span>
                            <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <Send size={12} className="text-indigo-600" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-4 ${message.isBot ? 'justify-start' : 'justify-end flex-row-reverse'} animate-fade-in group`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.isBot 
                          ? 'bg-gradient-to-br from-indigo-500 to-cyan-600 text-white border-2 border-indigo-200' 
                          : 'bg-gradient-to-br from-gray-500 to-gray-700 text-white border-2 border-gray-200'
                      }`}>
                        {message.isBot ? <Shield size={18} /> : <User size={18} />}
                      </div>

                      {/* Message Container */}
                      <div className={`flex flex-col ${message.isBot ? 'items-start' : 'items-end'} max-w-[85%]`}>
                        <div
                          className={`relative px-5 py-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-200 group-hover:shadow-xl ${
                            message.isBot
                              ? 'bg-white/90 text-gray-800 border border-gray-100/50 rounded-bl-lg'
                              : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white rounded-br-lg shadow-indigo-200/50'
                          }`}
                        >
                          {message.isBot && (
                            <button
                              onClick={() => copyToClipboard(message.text)}
                              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-all duration-200"
                              title="Copy message"
                            >
                              <Copy size={14} />
                            </button>
                          )}
                          
                          <div
                            className={`prose prose-sm max-w-none ${message.isBot ? 'text-gray-800' : 'text-white'}`}
                            dangerouslySetInnerHTML={{
                              __html: message.isBot ? formatMessage(message.text) : message.text
                            }}
                          />
                        </div>
                        
                        {message.timestamp && (
                          <span className={`text-xs text-gray-400 mt-2 px-1 ${message.isBot ? 'text-left' : 'text-right'}`}>
                            {message.timestamp}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex items-start gap-4 animate-fade-in">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-indigo-200">
                        <Shield size={18} />
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm px-5 py-4 rounded-2xl rounded-bl-lg shadow-lg border border-gray-100/50">
                        <div className="flex space-x-2">
                          <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100/50 p-4 bg-white/80 backdrop-blur-sm flex-shrink-0">
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about digital security..."
                    className="w-full px-5 py-4 pr-12 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white/70 hover:bg-white/90 transition-all duration-200 backdrop-blur-sm shadow-sm placeholder-gray-500"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock size={16} className={`transition-opacity duration-200 ${inputValue.trim() ? 'opacity-100 animate-pulse text-indigo-500' : 'opacity-50'}`} />
                  </div>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-5 py-4 rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:hover:shadow-lg backdrop-blur-sm"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .prose a {
          text-decoration: none !important;
        }
        .prose strong {
          font-weight: 700 !important;
          color: inherit !important;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #4f46e5, #06b6d4);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4338ca, #0891b2);
        }
      `}</style>
    </div>
  );
};

export default SecurityChatbot;