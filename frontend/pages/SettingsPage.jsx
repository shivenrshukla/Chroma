// pages/SettingsPage.jsx
import React from 'react';
import { FiSettings, FiZap, FiShield, FiUsers } from 'react-icons/fi';
import Settings from '../components/Settings';

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Settings & Configuration</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Customize your ChromaGen experience and configure AI services
        </p>
      </div>

      {/* Quick Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200">
          <div className="flex items-center space-x-3 mb-4">
            <FiZap className="w-6 h-6 text-orange-600" />
            <h3 className="font-bold text-orange-900">AI Services</h3>
          </div>
          <p className="text-sm text-orange-800">Configure OpenAI API keys and advanced AI features</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <FiShield className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-blue-900">Accessibility</h3>
          </div>
          <p className="text-sm text-blue-800">Set WCAG compliance levels and color vision preferences</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <FiUsers className="w-6 h-6 text-green-600" />
            <h3 className="font-bold text-green-900">Collaboration</h3>
          </div>
          <p className="text-sm text-green-800">Team settings and sharing preferences</p>
        </div>
      </div>

      {/* Main Settings Component */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
        <Settings />
      </div>

      {/* Advanced Configuration */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">⚙️ Advanced Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Flask Backend</h4>
              <p className="text-gray-600 mb-3">Local AI processing server</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-medium text-xs">Connected</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Export Settings</h4>
              <p className="text-gray-600 mb-3">Default export formats and preferences</p>
              <div className="text-xs text-gray-500">CSS, SCSS, JSON, Adobe ASE</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Color Space</h4>
              <p className="text-gray-600 mb-3">Default color space for calculations</p>
              <div className="text-xs text-gray-500">sRGB, LAB, LMS supported</div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
              <p className="text-gray-600 mb-3">Optimization and caching settings</p>
              <div className="text-xs text-gray-500">Auto-save, local caching enabled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
