// components/layout/Layout.jsx - Simple Version (No Theme)
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiLayers, FiZap, FiMenu, FiX, FiSettings, FiBookmark, FiInfo, FiEdit3, FiHome } from 'react-icons/fi';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: FiHome, theme: 'blue' },
    { path: '/generator', label: 'Generator', icon: FiLayers, theme: 'orange' },
    { path: '/editor', label: 'Editor', icon: FiEdit3, theme: 'orange' },
    { path: '/library', label: 'Library', icon: FiBookmark, theme: 'blue' },
    { path: '/settings', label: 'Settings', icon: FiSettings, theme: 'orange' },
    { path: '/about', label: 'About', icon: FiInfo, theme: 'blue' }
  ];

  const isActivePage = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
              
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="bg-gradient-to-br from-orange-500 to-blue-500 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <FiLayers className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full p-1">
                    <FiZap className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">ChromaGen</h1>
                  <p className="text-sm text-gray-500 hidden sm:block">AI Color Intelligence</p>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                const isOrange = item.theme === 'orange';
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? isOrange
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Status Indicator */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePage(item.path);
                const isOrange = item.theme === 'orange';
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? isOrange
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
