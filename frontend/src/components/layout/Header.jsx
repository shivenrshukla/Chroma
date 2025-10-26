// components/layout/Header.jsx
import React from 'react';
import { FiLayers, FiZap, FiMenu, FiX, FiSettings, FiBookmark, FiInfo } from 'react-icons/fi';

const Header = ({ isSidebarOpen, setIsSidebarOpen, activeSection, onSectionChange }) => {
  const navigationItems = [
    { id: 'generator', label: 'Generator', icon: FiLayers, theme: 'orange' },
    { id: 'saved', label: 'Library', icon: FiBookmark, theme: 'blue' },
    { id: 'settings', label: 'Settings', icon: FiSettings, theme: 'orange' },
    { id: 'about', label: 'About', icon: FiInfo, theme: 'blue' }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-200"
            >
              {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
            
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onSectionChange('generator')}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-blue-500 p-3.5 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <FiLayers className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full p-1 animate-pulse">
                  <FiZap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
                  ChromaGen
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">AI Color Intelligence</p>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const isOrange = item.theme === 'orange';
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-3 px-6 py-3.5 rounded-2xl font-semibold transition-all duration-300 ${
                    isActive
                      ? isOrange
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-200/50 scale-105'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200/50 scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Status Indicator */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2.5 rounded-full border border-green-200">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">AI Ready</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
