// components/Settings.jsx - Fixed Version
import React, { useState, useEffect } from 'react';
import { FiSettings, FiServer, FiZap, FiEye, FiShield, FiInfo, FiCheck, FiX } from 'react-icons/fi';

const Settings = () => {
  const [serverStatus, setServerStatus] = useState('checking');
  const [settings, setSettings] = useState({
    apiKeys: {
      openai: localStorage.getItem('chromagen-openai-key') || '',
      gemini: localStorage.getItem('chromagen-gemini-key') || ''
    },
    accessibility: {
      wcagLevel: localStorage.getItem('chromagen-wcag-level') || 'AA',
      colorBlindnessSimulation: localStorage.getItem('chromagen-colorblind-sim') === 'true'
    },
    ui: {
      theme: localStorage.getItem('chromagen-theme') || 'light',
      animations: localStorage.getItem('chromagen-animations') !== 'false'
    }
  });

  // Fixed server status checking
  const checkServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/health', {
        method: 'GET',
        timeout: 3000
      });
      
      if (response.ok) {
        const data = await response.json();
        setServerStatus({
          status: 'online',
          service: data.service || 'ChromaGen Backend',
          gemini: data.gemini_status || 'unknown',
          rag: data.rag_status || 'unknown'
        });
      } else {
        setServerStatus('offline');
      }
    } catch (error) {
      setServerStatus('offline');
    }
  };

  useEffect(() => {
    checkServerStatus();
    
    // Check server status every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSettingChange = (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    
    setSettings(newSettings);
    
    // Save to localStorage
    const storageKey = `chromagen-${key}`;
    if (category === 'apiKeys') {
      localStorage.setItem(storageKey, value);
    } else {
      localStorage.setItem(storageKey, value.toString());
    }
  };

  const getStatusIcon = () => {
    if (serverStatus === 'checking') return <div className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full" />;
    if (serverStatus?.status === 'online') return <FiCheck className="w-4 h-4 text-green-600" />;
    return <FiX className="w-4 h-4 text-red-600" />;
  };

  const getStatusColor = () => {
    if (serverStatus === 'checking') return 'bg-orange-50 border-orange-200 text-orange-700';
    if (serverStatus?.status === 'online') return 'bg-green-50 border-green-200 text-green-700';
    return 'bg-red-50 border-red-200 text-red-700';
  };

  return (
    <div className="space-y-8">
      {/* Server Status */}
      <div className={`p-6 rounded-2xl border-2 ${getStatusColor()}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FiServer className="w-6 h-6" />
            <h3 className="text-lg font-bold">Server Status</h3>
          </div>
          <button
            onClick={checkServerStatus}
            className="px-3 py-1 rounded-lg bg-white border border-current hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <div className="font-semibold">Flask Backend</div>
              <div className="text-sm opacity-75">
                {serverStatus === 'checking' ? 'Checking...' : 
                 serverStatus?.status === 'online' ? 'Connected' : 'Offline'}
              </div>
            </div>
          </div>
          
          {serverStatus?.status === 'online' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${serverStatus.gemini === 'available' ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm">Gemini AI</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${serverStatus.rag === 'available' ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm">RAG Database</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <FiZap className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-bold text-gray-900">API Configuration</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OpenAI API Key (Optional)
            </label>
            <input
              type="password"
              value={settings.apiKeys.openai}
              onChange={(e) => handleSettingChange('apiKeys', 'openai', e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">For enhanced text-to-palette generation</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gemini API Key (Configured in Backend)
            </label>
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-200">
              <FiInfo className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                Configure in your Flask backend's .env file
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <FiEye className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Accessibility</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              WCAG Compliance Level
            </label>
            <select
              value={settings.accessibility.wcagLevel}
              onChange={(e) => handleSettingChange('accessibility', 'wcagLevel', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            >
              <option value="AA">AA (Standard)</option>
              <option value="AAA">AAA (Enhanced)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Color Blindness Simulation</h4>
              <p className="text-sm text-gray-500">Show color vision accessibility testing</p>
            </div>
            <button
              onClick={() => handleSettingChange('accessibility', 'colorBlindnessSimulation', !settings.accessibility.colorBlindnessSimulation)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.accessibility.colorBlindnessSimulation ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.accessibility.colorBlindnessSimulation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* UI Preferences */}
      <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
        <div className="flex items-center space-x-3 mb-6">
          <FiSettings className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-900">Interface</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={settings.ui.theme}
              onChange={(e) => handleSettingChange('ui', 'theme', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Animations</h4>
              <p className="text-sm text-gray-500">Enable UI animations and transitions</p>
            </div>
            <button
              onClick={() => handleSettingChange('ui', 'animations', !settings.ui.animations)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.ui.animations ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.ui.animations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <FiShield className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-blue-900">Quick Help</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Getting Started</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Use text prompts for AI generation</li>
              <li>• Upload images for color extraction</li>
              <li>• Test accessibility with WCAG checker</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Troubleshooting</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Ensure Flask server is running</li>
              <li>• Check network connections</li>
              <li>• Refresh server status above</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
