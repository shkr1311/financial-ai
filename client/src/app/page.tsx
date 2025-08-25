'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Building2,
  Newspaper,
  Target,
  Shield,
  Users,
  ArrowRight,
  Play,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const features = [
  {
    icon: BarChart3,
    title: 'Market Dashboard',
    description:
      'Real-time market data with interactive charts and sector analysis',
    href: '/market-dashboard',
    available: true,
  },
  {
    icon: TrendingUp,
    title: 'Stock Personality Tags',
    description:
      'AI-powered personality analysis for stocks with confidence scores',
    href: '/stock-personality',
    available: true,
  },
  {
    icon: Building2,
    title: 'Company Financials',
    description:
      'Comprehensive financial data, ratios, and historical analysis',
    href: '/company-financials',
    available: true,
  },
  {
    icon: Newspaper,
    title: 'News & Sentiment',
    description: 'AI-generated sentiment analysis from financial news sources',
    href: '/news-sentiment',
    available: true,
  },
  {
    icon: Target,
    title: 'Pattern Detection',
    description: 'Automated technical pattern recognition with trade setups',
    href: '/pattern-detection',
    available: true,
  },
  {
    icon: Shield,
    title: 'Risk Meter',
    description: 'Advanced risk assessment with AI-powered volatility analysis',
    href: '/risk-meter',
    available: true,
  },
  {
    icon: Users,
    title: 'Community + Collaboration',
    description:
      "Interactive traders' hub for discussions, doubt-solving, and strategy sharing",
    href: '/community',
    available: true,
  },
];

const tickerData = [
  { symbol: 'NIFTY 50', price: '19,674.25', change: '+1.2%', positive: true },
  { symbol: 'S&P 500', price: '4,327.78', change: '+0.8%', positive: true },
  { symbol: 'GOLD', price: '$1,987.45', change: '-0.3%', positive: false },
  { symbol: 'USD/INR', price: '83.12', change: '+0.1%', positive: true },
  { symbol: 'CRUDE OIL', price: '$78.92', change: '-1.1%', positive: false },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Page() {
  const [currentTickerIndex, setCurrentTickerIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ get auth state from store
  const { authUser, isAuthenticated, checkAuth, isCheckingAuth, logout } =
    useAuthStore();

  useEffect(() => {
    checkAuth(); // ✅ check auth on mount
  }, [checkAuth]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTickerIndex((prev) => (prev + 1) % tickerData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (feature: (typeof features)[0]) => {
    if (feature.available) {
      window.location.href = feature.href;
    } else {
      scrollToSection('features');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
      {/* Navigation */}
      <nav className='fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-2'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center'>
                <BarChart3 className='w-5 h-5 text-slate-900' />
              </div>
              <span className='text-xl font-bold text-white'>FinanceAI</span>
            </div>

            <div className='hidden md:flex items-center text-sm lg:text-base space-x-4'>
              {features.map((feature) => (
                <button
                  key={feature.title}
                  onClick={() => handleFeatureClick(feature)}
                  className={`text-sm font-medium transition-colors ${
                    feature.available
                      ? 'text-slate-300 hover:text-teal-400 cursor-pointer'
                      : 'text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            <div className='flex items-center space-x-4'>
              {/* ✅ Only show Sign In if NOT authenticated */}
              {!isCheckingAuth && !isAuthenticated && (
                <Link
                  href='/signin'
                  className='text-slate-300 hover:text-white transition-colors'
                >
                  Sign In
                </Link>
              )}
              {isAuthenticated && (
                <>
                  <span className='text-teal-400 font-semibold'>
                    Hi, {authUser?.fullName || 'User'}
                  </span>
                  <button
                    onClick={logout}
                    className='bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2'
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Mobile Hamburger */}
              <button
                className='md:hidden text-slate-300 hover:text-white'
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                {menuOpen ? (
                  <X className='w-6 h-6' />
                ) : (
                  <Menu className='w-6 h-6' />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className='md:hidden fixed top-16 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 px-4 py-4 space-y-4'>
          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => {
                handleFeatureClick(feature);
                setMenuOpen(false);
              }}
              className={`block w-full text-left text-sm font-medium transition-colors ${
                feature.available
                  ? 'text-slate-300 hover:text-teal-400'
                  : 'text-slate-500 cursor-not-allowed'
              }`}
            >
              {feature.title}
            </button>
          ))}
        </div>
      )}

      {/* Live Ticker */}
      <div className='fixed top-16 w-full z-40 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 overflow-hidden'>
        <div className='ticker-scroll py-2'>
          <div className='flex items-center space-x-8 text-sm'>
            {tickerData.map((item, index) => (
              <div
                key={index}
                className='flex items-center space-x-2 whitespace-nowrap'
              >
                <span className='text-slate-300 font-medium'>
                  {item.symbol}
                </span>
                <span className='text-white font-semibold'>{item.price}</span>
                <span
                  className={`font-medium ${
                    item.positive ? 'text-teal-400' : 'text-red-400'
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className='pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='space-y-8'>
            <h1 className='text-5xl md:text-7xl font-bold text-white leading-tight'>
              Smarter Trading.
              <br />
              <span className='bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent'>
                Clearer Insights.
              </span>
            </h1>

            <p className='text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed'>
              Harness the power of AI to make informed trading decisions with
              real-time market analysis, sentiment tracking, and pattern
              recognition.
            </p>

            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-8'>
              <button className='bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-cyan-600 transition-all transform hover:scale-105 flex items-center space-x-2'>
                <span>Start Free Trial</span>
                <ArrowRight className='w-5 h-5' />
              </button>

              <button className='glass-hover px-8 py-4 rounded-xl font-semibold text-lg text-white border border-slate-600 hover:border-teal-400 transition-all flex items-center space-x-2'>
                <Play className='w-5 h-5' />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>

        <div className='flex justify-center mt-16'>
          <button
            onClick={() => scrollToSection('features')}
            className='animate-bounce text-slate-400 hover:text-teal-400 transition-colors'
          >
            <ChevronDown className='w-8 h-8' />
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id='features' className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
              Powerful Trading Tools
            </h2>
            <p className='text-xl text-slate-300 max-w-3xl mx-auto'>
              Everything you need to make smarter trading decisions, powered by
              advanced AI and real-time data.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;

              return (
                <div
                  key={feature.title}
                  onClick={() => handleFeatureClick(feature)}
                  className={`glass p-8 rounded-2xl border border-slate-700/50 transition-all duration-300 ${
                    feature.available
                      ? 'hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-400/10 cursor-pointer transform hover:scale-105'
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className='flex items-center justify-between mb-6'>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        feature.available
                          ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-400/30'
                          : 'bg-slate-700/50 border border-slate-600'
                      }`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${
                          feature.available ? 'text-teal-400' : 'text-slate-500'
                        }`}
                      />
                    </div>

                    {!feature.available && (
                      <span className='text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded-full'>
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h3 className='text-xl font-semibold text-white mb-3'>
                    {feature.title}
                  </h3>

                  <p className='text-slate-300 leading-relaxed'>
                    {feature.description}
                  </p>

                  {feature.available && (
                    <div className='flex items-center text-teal-400 mt-4 text-sm font-medium'>
                      <span>Explore Feature</span>
                      <ArrowRight className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-slate-900/50 border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg flex items-center justify-center'>
                  <BarChart3 className='w-5 h-5 text-slate-900' />
                </div>
                <span className='text-xl font-bold text-white'>FinanceAI</span>
              </div>
              <p className='text-slate-400'>
                AI-powered financial intelligence for smarter trading decisions.
              </p>
            </div>

            <div>
              <h4 className='text-white font-semibold mb-4'>Features</h4>
              <ul className='space-y-2'>
                {features.slice(0, 3).map((feature) => (
                  <li key={feature.title}>
                    <button
                      onClick={() => handleFeatureClick(feature)}
                      className='text-slate-400 hover:text-teal-400 transition-colors'
                    >
                      {feature.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-white font-semibold mb-4'>More Tools</h4>
              <ul className='space-y-2 text-slate-400'>
                {features.slice(3).map((feature) => (
                  <li key={feature.title}>
                    <a
                      href={feature.href}
                      className='hover:text-teal-400 transition-colors'
                    >
                      {feature.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-white font-semibold mb-4'>Company</h4>
              <ul className='space-y-2 text-slate-400'>
                <li>
                  <a href='#' className='hover:text-teal-400 transition-colors'>
                    About
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-teal-400 transition-colors'>
                    Careers
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-teal-400 transition-colors'>
                    Contact
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-teal-400 transition-colors'>
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400'>
            <p>&copy; 2024 FinanceAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
