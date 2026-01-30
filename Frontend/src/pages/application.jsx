import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hash, Send, Search, Users, Bell, Settings, Plus, Smile, Paperclip, MoreVertical,
  Pin, ThumbsUp, MessageCircle, Star, Calendar, MapPin, DollarSign, CheckCircle,
  Info, X, ChevronDown, MessageSquare
} from 'lucide-react';

const CommunityChat = () => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({});
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [onlineUsers] = useState(247);
  const messagesEndRef = useRef(null);

  // Channels
  const channels = [
    { id: 'general', name: 'general', icon: '💬', description: 'General discussions about schemes' },
    { id: 'agriculture', name: 'agriculture', icon: '🌾', description: 'Agricultural schemes & support' },
    { id: 'business', name: 'business-startups', icon: '💼', description: 'Business & startup schemes' },
    { id: 'education', name: 'education', icon: '🎓', description: 'Educational schemes' },
    { id: 'healthcare', name: 'healthcare', icon: '🏥', description: 'Health & wellness schemes' },
    { id: 'women', name: 'women-empowerment', icon: '👩', description: 'Women empowerment programs' },
    { id: 'help', name: 'help-support', icon: '🆘', description: 'Get help with applications' },
    { id: 'announcements', name: 'announcements', icon: '📢', description: 'Official scheme updates' }
  ];

  // Schemes (keeping your original 4 schemes)
  const schemes = [
    {
      id: 1,
      name: 'Soil Health Card',
      category: 'Agriculture',
      description: 'Providing farmers with comprehensive nutrient management solutions to improve soil quality and increase crop yield',
      eligibility: 'Small and marginal farmers with cultivable land',
      amount: '₹6,000 per year',
      deadline: '2025-12-31',
      applicants: '12M+',
      status: 'Active',
      rating: 4.8,
      location: 'Pan India',
      helpline: '1800-180-1551',
      email: 'soilhealth@gov.in',
      website: 'soilhealth.dac.gov.in'
    },
    {
      id: 2,
      name: 'Startup India Initiative',
      category: 'Business',
      description: 'Comprehensive support ecosystem for startups and entrepreneurs to foster innovation and business growth',
      eligibility: 'Innovative startups with DPIIT recognition',
      amount: 'Up to ₹10 Lakhs',
      deadline: '2025-10-15',
      applicants: '500K+',
      status: 'Active',
      rating: 4.6,
      location: 'Pan India',
      helpline: '1800-115-565',
      email: 'startupindia@gov.in',
      website: 'startupindia.gov.in'
    },
    {
      id: 3,
      name: 'Beti Bachao Beti Padhao',
      category: 'Education',
      description: 'Promotes girls\' education and empowerment through comprehensive support and awareness programs',
      eligibility: 'Girl child and women empowerment initiatives',
      amount: 'Varies by component',
      deadline: '2025-11-30',
      applicants: '2M+',
      status: 'Active',
      rating: 4.9,
      location: 'Pan India',
      helpline: '1800-266-1919',
      email: 'betibachao@gov.in',
      website: 'wcd.nic.in'
    },
    {
      id: 4,
      name: 'Ayushman Bharat',
      category: 'Healthcare',
      description: 'National health protection scheme providing cashless healthcare services to vulnerable families',
      eligibility: 'Families identified through SECC database',
      amount: 'Up to ₹5 Lakhs per family',
      deadline: '2025-12-31',
      applicants: '50M+',
      status: 'Active',
      rating: 4.7,
      location: 'Pan India',
      helpline: '14555',
      email: 'pmjay@gov.in',
      website: 'pmjay.gov.in'
    }
  ];

  // Initial messages (keeping your structure)
  const initialMessages = {
    general: [
      {
        id: 1, user: 'SchemeBot', avatar: '🤖', role: 'Bot', timestamp: '10:00 AM',
        message: 'Welcome to the Government Schemes Community! 🎉 This is a space to discuss schemes...',
        reactions: { thumbsUp: 45, heart: 23 }, pinned: true
      },
      // ... your other messages ...
    ],
    agriculture: [{ id: 1, user: 'FarmerConnect', avatar: '🌾', role: 'Bot', timestamp: '9:00 AM', message: 'Welcome to #agriculture!...', pinned: true }],
    business: [{ id: 1, user: 'StartupHelper', avatar: '💼', role: 'Bot', timestamp: '9:00 AM', message: 'Welcome to #business-startups!...', pinned: true }],
    education: [{ id: 1, user: 'EduBot', avatar: '🎓', role: 'Bot', timestamp: '9:00 AM', message: 'Welcome to #education!...', pinned: true }],
    healthcare: [{ id: 1, user: 'HealthBot', avatar: '🏥', role: 'Bot', timestamp: '9:00 AM', message: 'Welcome to #healthcare!...', pinned: true }],
    women: [{ id: 1, user: 'EmpowerBot', avatar: '👩', role: 'Bot', timestamp: '9:00 AM', message: 'Welcome to #women-empowerment!...', pinned: true }],
    help: [{ id: 1, user: 'SupportBot', avatar: '🆘', role: 'Bot', timestamp: '9:00 AM', message: 'Welcome to #help-support!...', pinned: true }],
    announcements: [{ id: 1, user: 'Admin', avatar: '📢', role: 'Admin', timestamp: 'Today', message: '🎯 New Scheme Alert...', pinned: true }]
  };

  useEffect(() => {
    if (!messages[activeChannel]) {
      setMessages(prev => ({ ...prev, [activeChannel]: initialMessages[activeChannel] || [] }));
    }
  }, [activeChannel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChannel]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMessage = {
      id: Date.now(),
      user: 'You',
      avatar: '👤',
      role: 'Member',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: messageInput,
      reactions: {},
      replies: 0
    };
    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMessage]
    }));
    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      Bot: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
      Admin: 'text-red-400 bg-red-400/10 border-red-400/20',
      Moderator: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      Member: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    };
    return colors[role] || colors.Member;
  };

  const currentChannel = channels.find(ch => ch.id === activeChannel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex overflow-hidden">

      {/* LEFT SIDEBAR - Channels */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm h-screen sticky top-0 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-gray-900 font-bold text-lg">Schemes Community</h1>
              <p className="text-gray-500 text-xs flex items-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                {onlineUsers} members online
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
            Text Channels
          </div>
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg transition-all ${
                activeChannel === channel.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{channel.icon}</span>
              <Hash className={`w-4 h-4 ${activeChannel === channel.id ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="flex-1 text-left text-sm font-medium truncate">{channel.name}</span>
              {messages[channel.id]?.length > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${activeChannel === channel.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                  {messages[channel.id].length}
                </span>
              )}
            </button>
          ))}

          <button className="w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 mt-2">
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Add Channel</span>
          </button>

          <div className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2 mt-6 pt-6 border-t border-gray-200">
            Quick Access
          </div>
          {schemes.map(scheme => (
            <button
              key={scheme.id}
              onClick={() => setSelectedScheme(scheme)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                selectedScheme?.id === scheme.id ? 'bg-purple-50 text-purple-600 border border-purple-200' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xs text-white font-bold shadow-sm">
                {scheme.name.charAt(0)}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium truncate">{scheme.name}</p>
                <p className="text-xs text-gray-400 truncate">{scheme.category}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg relative">
              👤
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 text-sm font-semibold truncate">Guest User</p>
              <p className="text-gray-500 text-xs truncate">#1234</p>
            </div>
            <button className="p-2 hover:bg-gray-200 rounded-lg">
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN + RIGHT SIDEBAR FLEX CONTAINER */}
      <div className="flex flex-1 overflow-hidden">

        {/* MAIN CHAT AREA */}
        <div
          className={`flex-1 flex flex-col bg-white transition-all duration-300 ease-in-out ${
            selectedScheme ? 'mr-96' : 'mr-0'
          }`}
        >
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currentChannel?.icon}</span>
              <Hash className="w-5 h-5 text-gray-400" />
              <div>
                <h2 className="text-gray-900 font-semibold text-lg">{currentChannel?.name}</h2>
                <p className="text-gray-500 text-xs">{currentChannel?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2.5 hover:bg-gray-100 rounded-lg"><Bell className="w-5 h-5 text-gray-500" /></button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg"><Pin className="w-5 h-5 text-gray-500" /></button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg"><Users className="w-5 h-5 text-gray-500" /></button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg"><Search className="w-5 h-5 text-gray-500" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar bg-gray-50">
            {(messages[activeChannel] || []).map(msg => (
              <div key={msg.id} className="mb-5 group hover:bg-white/80 -mx-4 px-4 py-3 rounded-xl transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="font-semibold text-gray-900 hover:underline cursor-pointer text-sm">{msg.user}</span>
                      {msg.role && <span className={`text-xs px-2.5 py-0.5 rounded border ${getRoleColor(msg.role)}`}>{msg.role}</span>}
                      <span className="text-gray-400 text-xs">{msg.timestamp}</span>
                      {msg.pinned && <Pin className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm break-words">{msg.message}</p>

                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                      <div className="flex items-center space-x-2 mt-3">
                        {Object.entries(msg.reactions).map(([key, count]) => (
                          <button
                            key={key}
                            className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-full text-xs transition-colors shadow-sm"
                          >
                            {key === 'thumbsUp' && <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />}
                            {key === 'heart' && <span>❤️</span>}
                            {key === 'celebrate' && <span>🎉</span>}
                            <span className="text-gray-600 font-semibold">{count}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {msg.replies > 0 && (
                      <button className="flex items-center space-x-2 mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <MessageCircle className="w-4 h-4" />
                        <span>{msg.replies} {msg.replies === 1 ? 'reply' : 'replies'}</span>
                      </button>
                    )}
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><ThumbsUp className="w-4 h-4 text-gray-400" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-5 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-3">
              <button className="p-3 hover:bg-gray-100 rounded-lg flex-shrink-0">
                <Plus className="w-5 h-5 text-gray-500" />
              </button>
              <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <textarea
                  value={messageInput}
                  onChange={e => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${currentChannel?.name}`}
                  className="w-full px-4 py-3 bg-transparent text-gray-900 placeholder-gray-400 resize-none focus:outline-none text-sm"
                  rows={1}
                  style={{ maxHeight: '120px' }}
                />
                <div className="flex items-center justify-between px-3 pb-2.5">
                  <div className="flex space-x-2">
                    <button className="p-1.5 hover:bg-gray-200 rounded"><Paperclip className="w-4 h-4 text-gray-400" /></button>
                    <button className="p-1.5 hover:bg-gray-200 rounded"><Smile className="w-4 h-4 text-gray-400" /></button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 text-sm flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - Scheme Details */}
        <AnimatePresence>
          {selectedScheme && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 384, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-white border-l border-gray-200 overflow-y-auto custom-scrollbar shadow-2xl flex-shrink-0"
            >
              <div className="sticky top-0 z-10 p-6 border-b border-gray-200 bg-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedScheme.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100">
                        {selectedScheme.category}
                      </span>
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-900 text-xs font-bold">{selectedScheme.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedScheme(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Description</h4>
                  <p className="text-gray-700 leading-relaxed text-sm">{selectedScheme.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600 text-xs font-medium">Amount</span>
                    </div>
                    <p className="text-gray-900 font-bold text-sm">{selectedScheme.amount}</p>
                  </div>
                  {/* ... rest of your stats grid, eligibility, contact, actions, support ... */}
                </div>

                {/* Paste the rest of your scheme details content here */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CommunityChat;