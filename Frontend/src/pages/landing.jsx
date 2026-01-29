import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import { CheckCircle, Bot, Languages, FileCheck, Users, Target, Brain, Zap, Database, Search, UserCheck, FileText, Award, Sparkles, Shield, Rocket, ArrowRight, Lock, Key, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

import Top from '../assets/top.json';
import AIscheme from '../assets/AI-scheme.json';
import eligibility from '../assets/eligibility.json';
import chatbot from '../assets/chatbot.json';
import application from '../assets/application.json';

const Landing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationPhase, setAnimationPhase] = useState(0);
  const [roadmapInView, setRoadmapInView] = useState(false);
  const [featuresInView, setFeaturesInView] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'roadmap-section' && entry.isIntersecting) {
            setRoadmapInView(true);
          }
          if (entry.target.id === 'features-section' && entry.isIntersecting) {
            setFeaturesInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const roadmapElement = document.getElementById('roadmap-section');
    const featuresElement = document.getElementById('features-section');
    
    if (roadmapElement) observer.observe(roadmapElement);
    if (featuresElement) observer.observe(featuresElement);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(phaseInterval);
      if (roadmapElement) observer.unobserve(roadmapElement);
      if (featuresElement) observer.unobserve(featuresElement);
    };
  }, []);

  const roadmapSteps = [
    {
      id: 1,
      title: "Secure Credential Storage",
      description: "AES-256 encrypted local storage with zero-knowledge architecture ensures your passwords stay private.",
      icon: <Lock className="w-10 h-10" />,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/20 to-teal-500/20",
      glowColor: "emerald",
      delay: "0ms",
      details: ["AES-256 Encryption", "Local Storage", "Zero-Knowledge", "Master Password"]
    },
    {
      id: 2,
      title: "Security Health Dashboard",
      description: "Real-time monitoring of password strength, MFA status, and platform permissions with actionable insights.",
      icon: <Shield className="w-10 h-10" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      glowColor: "blue",
      delay: "200ms",
      details: ["Password Strength", "MFA Tracking", "Permission Audit", "Risk Scoring"]
    },
    {
      id: 3,
      title: "AI-Powered Analysis",
      description: "Intelligent privacy policy summarization and suspicious URL detection protect you from threats.",
      icon: <Brain className="w-10 h-10" />,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-500/20 to-amber-500/20",
      glowColor: "orange",
      delay: "400ms",
      details: ["Policy Summarization", "URL Detection", "Threat Analysis", "Smart Recommendations"]
    },
    {
      id: 4,
      title: "Community & Trust Insights",
      description: "Anonymous community forum and platform reliability tracking keep you informed and connected.",
      icon: <Users className="w-10 h-10" />,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-500/20 to-indigo-500/20",
      glowColor: "purple",
      delay: "600ms",
      details: ["Anonymous Forum", "Platform Tracking", "Security News", "Trust Scores"]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden min-h-screen">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl shadow-blue-500/5 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg blur-lg opacity-50 animate-pulse" />
              <Shield className="w-8 h-8 text-cyan-400 relative z-10" />
            </div>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent font-extrabold bg-300% animate-gradient-x">
              SecureTrust
            </span>
          </div>
          <div className="flex space-x-4">
            <Link to="/signup" className="relative group px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-full overflow-hidden shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Get Started</span>
            </Link>
            <Link to="/login" className="px-6 py-2.5 bg-transparent border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-300">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-indigo-500/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-3xl animate-float-slow" />
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent animate-pulse delay-300" />
        
        {/* Interactive Mouse Glow */}
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-cyan-500/5 to-transparent rounded-full transition-all duration-700 ease-out pointer-events-none blur-2xl"
          style={{ left: mousePosition.x - 300, top: mousePosition.y - 300 }}
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh]">
          <div className={`lg:w-1/2 lg:pr-12 mb-12 lg:mb-0 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="space-y-8">
              {/* Badge */}
              <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-full transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">Military-Grade Security</span>
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
              </div>

              <div className="space-y-6">
                <div className="overflow-hidden">
                  <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight animate-slide-up-stagger">
                    <span className="inline-block text-white transform transition-all duration-700 delay-100">Your Digital</span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent inline-block transform transition-all duration-700 delay-300 animate-gradient-x bg-300%">
                      Security Guardian
                    </span>
                    <br />
                    <span className="inline-block text-slate-300 transform transition-all duration-700 delay-500 text-5xl lg:text-6xl">
                      Offline & Encrypted
                    </span>
                  </h1>
                </div>
                <p className={`text-xl leading-relaxed text-slate-400 transform transition-all duration-700 delay-700 max-w-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                  Take control of your social media security with <span className="text-cyan-400 font-semibold">encrypted credential storage</span>, <span className="text-blue-400 font-semibold">AI-powered threat detection</span>, and <span className="text-emerald-400 font-semibold">privacy-first monitoring</span>—all offline.
                </p>
              </div>

              <div className={`flex flex-wrap gap-4 transform transition-all duration-700 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Link to="/signup" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-full shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center space-x-2">
                    <Lock className="w-5 h-5" />
                    <span>Secure Your Accounts</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </Link>
                <Link to="/security" className="group relative px-8 py-4 bg-slate-800/50 border-2 border-cyan-500/50 text-cyan-400 font-bold rounded-full hover:bg-cyan-500/10 hover:border-cyan-400 transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
                  <span className="relative z-10 flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Learn More</span>
                  </span>
                </Link>
              </div>

              {/* Stats */}
              <div className={`flex flex-wrap gap-8 pt-8 transform transition-all duration-700 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">256-bit</div>
                  <div className="text-sm text-slate-500 mt-1">AES Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">100%</div>
                  <div className="text-sm text-slate-500 mt-1">Offline Mode</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Zero</div>
                  <div className="text-sm text-slate-500 mt-1">Knowledge</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:w-1/2 flex items-center justify-center relative transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative w-full max-w-2xl">
              {/* Glow Effect Behind Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 blur-3xl animate-pulse" />
              <Lottie 
                animationData={Top} 
                loop={true} 
                autoplay={true} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  filter: 'drop-shadow(0 0 60px rgba(59, 130, 246, 0.3))',
                  position: 'relative',
                  zIndex: 10
                }} 
              />
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div id="features-section" className="mt-32 mb-16">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${featuresInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                Powerful Protection
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-extrabold mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
                Privacy-First Security Features
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse" />
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Military-grade encryption meets AI intelligence to protect your digital identity and social media accounts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-700 ${featuresInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '100ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Lottie animationData={AIscheme} loop={true} autoplay={true} style={{ width: '100%', height: '100%' }} />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-center text-white relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                Encrypted Credential Vault
              </h3>
              <p className="text-sm leading-relaxed text-center text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors duration-300 mb-4">
                Store all your social media passwords with AES-256 encryption. Zero-knowledge architecture means only you can access your data.
              </p>
              <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs rounded-full font-medium">AES-256</span>
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs rounded-full font-medium">Offline</span>
              </div>
            </div>

            <div className={`group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-emerald-500/50 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-700 ${featuresInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Shield className="w-6 h-6 text-emerald-400 animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-28 h-28 mx-auto mb-6 flex items-center justify-center relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Lottie animationData={eligibility} loop={true} autoplay={true} style={{ width: '140%', height: '140%' }} />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-center text-white relative z-10 group-hover:text-emerald-400 transition-colors duration-300">
                Security Health Dashboard
              </h3>
              <p className="text-sm leading-relaxed text-center text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors duration-300 mb-4">
                Monitor password strength, MFA status, platform permissions, and device logins in one comprehensive dashboard.
              </p>
              <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-medium">Real-time</span>
                <span className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 text-teal-400 text-xs rounded-full font-medium">Comprehensive</span>
              </div>
            </div>

            <div className={`group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-orange-500/50 backdrop-blur-xl shadow-2xl hover:shadow-orange-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-700 ${featuresInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '300ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Brain className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-orange-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-28 h-28 mx-auto mb-6 flex items-center justify-center relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Lottie animationData={chatbot} loop={true} autoplay={true} style={{ width: '180%', height: '180%' }} />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-center text-white relative z-10 group-hover:text-orange-400 transition-colors duration-300">
                AI Privacy Assistant
              </h3>
              <p className="text-sm leading-relaxed text-center text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors duration-300 mb-4">
                AI-powered summarization of privacy policies and terms of service, plus intelligent URL threat detection.
              </p>
              <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs rounded-full font-medium">AI-Powered</span>
                <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs rounded-full font-medium">Smart</span>
              </div>
            </div>

            <div className={`group relative p-8 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/50 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transform hover:scale-105 hover:-translate-y-2 transition-all duration-700 ${featuresInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '400ms' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Rocket className="w-6 h-6 text-purple-400 animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-28 h-28 mx-auto mb-6 flex items-center justify-center relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Lottie animationData={application} loop={true} autoplay={true} style={{ width: '180%', height: '180%' }} />
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-center text-white relative z-10 group-hover:text-purple-400 transition-colors duration-300">
                Community Trust Network
              </h3>
              <p className="text-sm leading-relaxed text-center text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors duration-300 mb-4">
                Join anonymous discussions, track platform reliability, and stay updated with curated cybersecurity news.
              </p>
              <div className="flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs rounded-full font-medium">Anonymous</span>
                <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs rounded-full font-medium">Collaborative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div id="roadmap-section" className="mt-40 mb-20 relative">
          <div className={`text-center mb-20 transform transition-all duration-1000 ${roadmapInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/30 rounded-full text-violet-400 text-sm font-semibold">
                Security Layers
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-extrabold relative inline-block mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
                How SecureTrust Protects You
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-pulse" />
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-8 leading-relaxed">
              Four powerful layers of security working together to safeguard your digital presence.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto px-4">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-violet-500/50 via-purple-500/50 to-indigo-500/50 h-full hidden md:block z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-violet-400 to-indigo-400 animate-pulse opacity-30" />
            </div>

            <div className="space-y-16 md:space-y-24">
              {roadmapSteps.map((step, index) => (
                <div key={step.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} transform transition-all duration-1000 ${roadmapInView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
                  
                  {/* Center Number Badge */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 md:block hidden z-10">
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300 animate-pulse`} />
                      <div className={`relative w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform group-hover:scale-110 transition-all duration-300 border-4 border-slate-900`}>
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`group relative w-full md:w-5/12 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-slate-700/50 hover:border-${step.glowColor}-500/50 hover:shadow-${step.glowColor}-500/20 transition-all duration-700 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl blur-xl`} />
                    <div className={`absolute -top-3 -right-3 w-32 h-32 bg-gradient-to-r ${step.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex items-start space-x-6">
                      <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-2xl font-bold text-white group-hover:text-${step.glowColor}-400 transition-colors duration-300 mb-3`}>
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-5">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          {step.details.map((detail, idx) => (
                            <span key={idx} className={`px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r ${step.gradient} text-white shadow-lg`}>
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Corner */}
                    <div className={`absolute top-4 right-4 w-6 h-6 bg-gradient-to-br ${step.gradient} rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />
                  </div>

                  {/* Mobile Number Badge */}
                  <div className="md:hidden flex items-center justify-center w-full mt-6 mb-6">
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-full blur-xl opacity-50`} />
                      <div className={`relative w-14 h-14 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-2xl border-4 border-slate-900`}>
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Connection Arrow */}
                  {index < roadmapSteps.length - 1 && (
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full mt-8 z-10">
                      <ArrowRight className={`w-8 h-8 text-${step.glowColor}-400 rotate-90 animate-bounce`} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={`text-center mt-24 transform transition-all duration-1000 delay-800 ${roadmapInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 rounded-3xl p-12 text-white overflow-hidden max-w-3xl mx-auto shadow-2xl shadow-violet-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float" />
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float-delayed" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl lg:text-4xl font-extrabold mb-4">Secure Your Digital Life Today</h3>
                  <p className="text-lg mb-8 text-violet-100">Join thousands protecting their social media accounts with military-grade encryption.</p>
                  <Link to="/signup" className="inline-flex items-center space-x-2 bg-white text-violet-600 font-bold py-4 px-8 rounded-full hover:bg-slate-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                    <Lock className="w-5 h-5" />
                    <span>Start Protecting Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Section */}
        <div className="mt-40 mb-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                Our Advantages
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient-x">
                Why Choose SecureTrust?
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative text-center p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 hover:border-blue-500/50 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">Privacy-First Design</h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">All data encrypted locally. Zero-knowledge architecture means we never see your passwords.</p>
              </div>
            </div>

            <div className="group relative text-center p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 hover:border-emerald-500/50 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">Complete Transparency</h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">Understand exactly what platforms collect and how your data is used with AI summaries.</p>
              </div>
            </div>

            <div className="group relative text-center p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl border border-slate-700/50 hover:border-orange-500/50 backdrop-blur-xl shadow-2xl hover:shadow-orange-500/20 transform hover:-translate-y-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-orange-500/30 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-300">Proactive Protection</h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">Detect threats before they happen with AI-powered URL scanning and risk analysis.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="py-8 text-slate-500 text-center border-t border-slate-800/50 mt-20">
          <p className="text-sm mb-2">
            © 2025 SecureTrust - Digital Security Monitoring. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 flex items-center justify-center space-x-2">
            <Lock className="w-3 h-3" />
            <span>Your privacy is our priority. Encrypted. Offline. Secure.</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7), 0 0 60px rgba(6, 182, 212, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 30px rgba(59, 130, 246, 0), 0 0 80px rgba(6, 182, 212, 0.6); }
        }
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(100%); } 
        }
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-30px); } 
        }
        @keyframes float-delayed { 
          0%, 100% { transform: translateY(0px) rotate(0deg); } 
          50% { transform: translateY(-20px) rotate(5deg); } 
        }
        @keyframes float-slow { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-15px); } 
        }
        @keyframes gradient-x { 
          0%, 100% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
        }
        @keyframes slide-up-stagger { 
          from { transform: translateY(40px); opacity: 0; } 
          to { transform: translateY(0); opacity: 1; } 
        }

        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
        .animate-slide-up-stagger { animation: slide-up-stagger 1s ease-out forwards; }
        .bg-300% { background-size: 300% 300%; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </div>
  );
};

export default Landing;