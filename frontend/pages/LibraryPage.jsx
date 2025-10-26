// pages/LibraryPage.jsx
import React from 'react';
import { FiBookmark, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';
import SavedPalettes from '../components/SavedPalettes';

const LibraryPage = () => {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Palette Library</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Manage and organize your saved color palettes with advanced search and filtering
        </p>
      </div>

      {/* Library Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-700">24</div>
              <div className="text-sm text-blue-600">Total Palettes</div>
            </div>
            <FiBookmark className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-700">8</div>
              <div className="text-sm text-orange-600">Favorites</div>
            </div>
            <FiStar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-700">156</div>
              <div className="text-sm text-green-600">Total Uses</div>
            </div>
            <FiTrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-700">3</div>
              <div className="text-sm text-purple-600">Shared</div>
            </div>
            <FiUsers className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">✨ Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
            <h3 className="font-bold text-gray-900 mb-3">🎨 AI Generated</h3>
            <p className="text-sm text-gray-600 mb-4">Palettes created with advanced AI</p>
            <div className="flex space-x-1">
              {['#FF6B35', '#F7931E', '#FFD23F', '#FF8C42', '#C73E1D'].map((color, i) => (
                <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
            <h3 className="font-bold text-gray-900 mb-3">♿ Accessible</h3>
            <p className="text-sm text-gray-600 mb-4">WCAG AAA compliant palettes</p>
            <div className="flex space-x-1">
              {['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'].map((color, i) => (
                <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
            <h3 className="font-bold text-gray-900 mb-3">🌿 Nature Inspired</h3>
            <p className="text-sm text-gray-600 mb-4">Colors extracted from nature photos</p>
            <div className="flex space-x-1">
              {['#2D5016', '#68BB59', '#A4DE6C', '#C3D9B0', '#E8F5E8'].map((color, i) => (
                <div key={i} className="w-6 h-6 rounded" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Library Component */}
      <SavedPalettes />

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">📚 Library Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-1 rounded">
                <FiStar className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Star Favorites</div>
                <div className="text-gray-600">Mark your best palettes for quick access</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-1 rounded">
                <FiTrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Usage Tracking</div>
                <div className="text-gray-600">See which palettes you use most often</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-1 rounded">
                <FiUsers className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Team Sharing</div>
                <div className="text-gray-600">Share palettes with your design team</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 p-1 rounded">
                <FiBookmark className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Smart Organization</div>
                <div className="text-gray-600">Auto-categorization by color properties</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
