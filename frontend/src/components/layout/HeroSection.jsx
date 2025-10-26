// components/layout/HeroSection.jsx
import React from 'react';
import { FiLayers, FiZap, FiShield, FiTrendingUp } from 'react-icons/fi';

const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="bg-gradient-to-br from-white via-orange-50/30 to-blue-50/30 rounded-3xl border border-gray-200 shadow-sm mb-12 overflow-hidden">
      <div className="px-8 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center space-x-4 mb-8">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg">
              <FiLayers className="w-10 h-10 text-white" />
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg">
              <FiZap className="w-10 h-10 text-white" />
            </div>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 p-4 rounded-2xl shadow-lg">
              <FiShield className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Color
            <span className="bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent block md:inline">
              {" "}Palette Generator
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Create beautiful, accessible color palettes using artificial intelligence. 
            Perfect for designers, developers, and creative professionals.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border border-orange-200 shadow-sm">
              <FiTrendingUp className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-700">AI-Generated</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border border-blue-200 shadow-sm">
              <FiShield className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-700">WCAG Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full border border-gray-200 shadow-sm">
              <FiLayers className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Professional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
