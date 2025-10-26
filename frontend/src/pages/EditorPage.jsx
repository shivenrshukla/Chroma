// pages/EditorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiEdit3, FiArrowRight, FiZap } from 'react-icons/fi';
import PaletteEditor from '../components/PaletteEditor';
import Button from '../components/ui/Button';

const EditorPage = ({ palette, onPaletteChange }) => {
  if (!palette || palette.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
          <FiEdit3 className="w-16 h-16 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">No Palette to Edit</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Generate a color palette first to start editing and fine-tuning your colors with professional AI tools.
        </p>
        
        <div className="space-y-4">
          <Link to="/generator">
            <Button
              variant="primary"
              size="lg"
              iconLeft={<FiZap className="w-5 h-5" />}
              className="mb-4"
            >
              Generate Palette
            </Button>
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-colors">
              <FiZap className="w-8 h-8 text-orange-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">AI Enhancement</h3>
              <p className="text-sm text-gray-600">Neural network optimization for better aesthetics</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
              <FiEdit3 className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Advanced Tools</h3>
              <p className="text-sm text-gray-600">Lock colors, shuffle, and fine-tune with precision</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-300 transition-colors">
              <FiArrowRight className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="font-bold text-gray-900 mb-2">Quick Themes</h3>
              <p className="text-sm text-gray-600">Warm, cool, monochrome, and nature presets</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Palette Editor</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Fine-tune your colors with advanced AI-powered editing tools and professional presets
        </p>
      </div>

      {/* Current Palette Preview */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Currently Editing</h3>
        <div className="flex justify-center">
          <div className="flex space-x-2 bg-white p-4 rounded-xl shadow-lg">
            {palette.slice(0, 8).map((color, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-lg border-2 border-white shadow-lg"
                style={{ backgroundColor: color.hex }}
                title={color.hex}
              />
            ))}
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          {palette.length} colors • Ready for professional editing
        </p>
      </div>

      {/* Editor Component */}
      <PaletteEditor 
        palette={palette} 
        onPaletteChange={onPaletteChange} 
      />

      {/* Tips Section */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">💡 Pro Editing Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-orange-100 p-2 rounded-lg">
                <FiZap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">AI Enhancement</div>
                <div className="text-sm text-gray-600">Use AI Enhancement for professional aesthetic optimization</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FiEdit3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Lock Colors</div>
                <div className="text-sm text-gray-600">Lock favorite colors before shuffling or using themes</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FiArrowRight className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Show Scores</div>
                <div className="text-sm text-gray-600">Enable AI scores to see aesthetic, harmony, and contrast ratings</div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FiEdit3 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Quick Themes</div>
                <div className="text-sm text-gray-600">Try warm, cool, mono, or nature themes for instant transformation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
