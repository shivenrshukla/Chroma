// components/PaletteEditor.jsx
import React, { useState } from 'react';
import { FiEdit3, FiTrash2, FiPlus, FiShuffle, FiLock, FiUnlock, FiRotateCw, FiZap, FiTrendingUp, FiStar, FiEye } from 'react-icons/fi';
import Button from './ui/Button';
import { useAI } from '../hooks/useAI';

const PaletteEditor = ({ palette, onPaletteChange }) => {
  const [lockedColors, setLockedColors] = useState(new Set());
  const [editingNames, setEditingNames] = useState({});
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showScores, setShowScores] = useState(false);
  const { optimizePalette } = useAI();

  const handleColorChange = (index, newColor) => {
    const newPalette = [...palette];
    newPalette[index] = { 
      ...newPalette[index], 
      hex: newColor,
      rgb: hexToRgb(newColor),
      hsl: hexToHsl(newColor)
    };
    onPaletteChange(newPalette);
  };

  const handleNameChange = (index, newName) => {
    const newPalette = [...palette];
    newPalette[index] = { 
      ...newPalette[index], 
      role: newName || `Color ${index + 1}`
    };
    onPaletteChange(newPalette);
  };

  const addColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const newColor = {
      hex: randomColor,
      rgb: hexToRgb(randomColor),
      hsl: hexToHsl(randomColor),
      role: `Color ${palette.length + 1}`,
      aestheticScore: 0.5,
      harmonyScore: 0.5,
      contrastScore: 0.5
    };
    onPaletteChange([...palette, newColor]);
  };

  const removeColor = (index) => {
    if (palette.length > 1) {
      const newPalette = palette.filter((_, i) => i !== index);
      onPaletteChange(newPalette);
      
      // Update locked colors indices
      const newLocked = new Set();
      lockedColors.forEach(lockedIndex => {
        if (lockedIndex < index) {
          newLocked.add(lockedIndex);
        } else if (lockedIndex > index) {
          newLocked.add(lockedIndex - 1);
        }
      });
      setLockedColors(newLocked);
    }
  };

  const toggleLock = (index) => {
    const newLocked = new Set(lockedColors);
    if (newLocked.has(index)) {
      newLocked.delete(index);
    } else {
      newLocked.add(index);
    }
    setLockedColors(newLocked);
  };

  const shuffleUnlockedColors = () => {
    const newPalette = [...palette];
    const unlockedIndices = palette.map((_, i) => i).filter(i => !lockedColors.has(i));
    
    unlockedIndices.forEach(index => {
      const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
      newPalette[index] = {
        ...newPalette[index],
        hex: randomColor,
        rgb: hexToRgb(randomColor),
        hsl: hexToHsl(randomColor)
      };
    });
    
    onPaletteChange(newPalette);
  };

  const generateAnalogous = () => {
    const newPalette = [...palette];
    const baseColor = palette[0] || { hex: '#3B82F6' };
    const baseHsl = hexToHslValues(baseColor.hex);
    
    newPalette.forEach((_, index) => {
      if (!lockedColors.has(index)) {
        const hueShift = (index * 30) % 360; // 30 degree shifts
        const newHue = (baseHsl.h + hueShift) % 360;
        const newColor = hslToHex(newHue, baseHsl.s, baseHsl.l);
        
        newPalette[index] = {
          ...newPalette[index],
          hex: newColor,
          rgb: hexToRgb(newColor),
          hsl: hexToHsl(newColor)
        };
      }
    });
    
    onPaletteChange(newPalette);
  };

  const handleAIOptimization = async () => {
    setIsOptimizing(true);
    try {
      const hexColors = palette.map(color => color.hex);
      const result = await optimizePalette(hexColors);
      onPaletteChange(result.palette);
      
      // Show success message with scores
      console.log('AI Optimization Complete:', {
        aestheticScore: result.aestheticScore,
        components: result.components
      });
    } catch (error) {
      console.error('AI optimization failed:', error);
      alert('AI optimization failed. Please ensure the Flask server is running.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const startEditingName = (index) => {
    setEditingNames({ ...editingNames, [index]: true });
  };

  const stopEditingName = (index) => {
    const newEditingNames = { ...editingNames };
    delete newEditingNames[index];
    setEditingNames(newEditingNames);
  };

  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Advanced Palette Editor</h3>
          <p className="text-gray-600">Fine-tune your colors with professional AI-powered tools</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => setShowScores(!showScores)}
            variant="ghost"
            size="sm"
            iconLeft={<FiEye className="w-4 h-4" />}
          >
            {showScores ? 'Hide' : 'Show'} Scores
          </Button>
          <Button
            onClick={shuffleUnlockedColors}
            variant="ghost"
            size="sm"
            iconLeft={<FiShuffle className="w-4 h-4" />}
          >
            Shuffle
          </Button>
          <Button
            onClick={generateAnalogous}
            variant="outline"
            size="sm"
            iconLeft={<FiRotateCw className="w-4 h-4" />}
          >
            Analogous
          </Button>
          <Button
            onClick={handleAIOptimization}
            variant="primary"
            size="sm"
            iconLeft={<FiZap className="w-4 h-4" />}
            loading={isOptimizing}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          >
            {isOptimizing ? 'Optimizing...' : 'AI Enhance'}
          </Button>
          <Button
            onClick={addColor}
            variant="primary"
            size="sm"
            iconLeft={<FiPlus className="w-4 h-4" />}
            disabled={palette.length >= 12}
          >
            Add Color
          </Button>
        </div>
      </div>

      {/* AI Enhancement Info */}
      {isOptimizing && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <div>
              <h4 className="font-bold text-purple-900">AI Enhancement in Progress</h4>
              <p className="text-sm text-purple-800 mt-1">
                Analyzing harmony, contrast, accessibility, and aesthetic appeal...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Color Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {palette.map((color, index) => (
          <div key={`${index}-${color.hex}`} className="bg-white rounded-2xl border-2 border-gray-200 p-6 space-y-4 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md">
                  #{index + 1}
                </span>
                {lockedColors.has(index) && (
                  <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded-md">
                    🔒 Locked
                  </span>
                )}
                {color.role && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                    {color.role}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => toggleLock(index)}
                  className={`p-2 rounded-lg transition-colors ${
                    lockedColors.has(index)
                      ? 'text-primary-600 bg-primary-100 hover:bg-primary-200'
                      : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }`}
                  title={lockedColors.has(index) ? 'Unlock color' : 'Lock color'}
                >
                  {lockedColors.has(index) ? <FiLock className="w-4 h-4" /> : <FiUnlock className="w-4 h-4" />}
                </button>
                {palette.length > 1 && (
                  <button
                    onClick={() => removeColor(index)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove color"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Native Color Picker and Preview */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  disabled={lockedColors.has(index)}
                  className={`w-16 h-16 rounded-xl border-3 border-white shadow-lg cursor-pointer transition-all ${
                    lockedColors.has(index) 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105 hover:shadow-xl'
                  }`}
                  title="Click to change color"
                />
                {lockedColors.has(index) && (
                  <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                    <FiLock className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="font-mono text-sm font-bold text-gray-900 mb-1">
                  {color.hex.toUpperCase()}
                </div>
                <div className="text-xs text-gray-600 space-y-0.5 font-medium">
                  <div>{color.rgb}</div>
                  <div>{color.hsl}</div>
                </div>
              </div>
            </div>

            {/* AI Scores */}
            {showScores && (color.aestheticScore || color.harmonyScore || color.contrastScore) && (
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wide">AI Scores</h5>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {color.aestheticScore && (
                    <div className={`px-2 py-1 rounded-md text-center ${getScoreColor(color.aestheticScore)}`}>
                      <div className="font-bold">Aesthetic</div>
                      <div>{(color.aestheticScore * 100).toFixed(0)}%</div>
                    </div>
                  )}
                  {color.harmonyScore && (
                    <div className={`px-2 py-1 rounded-md text-center ${getScoreColor(color.harmonyScore)}`}>
                      <div className="font-bold">Harmony</div>
                      <div>{(color.harmonyScore * 100).toFixed(0)}%</div>
                    </div>
                  )}
                  {color.contrastScore && (
                    <div className={`px-2 py-1 rounded-md text-center ${getScoreColor(color.contrastScore)}`}>
                      <div className="font-bold">Contrast</div>
                      <div>{(color.contrastScore * 100).toFixed(0)}%</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Color Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Color Name
              </label>
              {editingNames[index] ? (
                <input
                  type="text"
                  defaultValue={color.role || `Color ${index + 1}`}
                  onBlur={(e) => {
                    handleNameChange(index, e.target.value);
                    stopEditingName(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleNameChange(index, e.target.value);
                      stopEditingName(index);
                    } else if (e.key === 'Escape') {
                      stopEditingName(index);
                    }
                  }}
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => startEditingName(index)}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-gray-800 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors border-2 border-transparent hover:border-primary-200"
                >
                  {color.role || `Color ${index + 1}`}
                </button>
              )}
            </div>

            {/* Color Usage Suggestions */}
            <div className="text-xs text-gray-600 bg-gray-100 rounded-lg p-3 border border-gray-200">
              <div className="font-bold mb-1 text-gray-800">Suggested Use:</div>
              <div className="font-medium">{getColorUsageSuggestion(color.hex, index)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Messages */}
      {palette.length >= 12 && (
        <div className="text-center p-4 bg-amber-50 border-2 border-amber-300 rounded-xl">
          <p className="text-sm text-amber-800 font-bold">
            Maximum of 12 colors reached for optimal performance
          </p>
        </div>
      )}

      {lockedColors.size > 0 && (
        <div className="text-center p-4 bg-primary-50 border-2 border-primary-300 rounded-xl">
          <p className="text-sm text-primary-800 font-bold">
            🔒 {lockedColors.size} color{lockedColors.size > 1 ? 's' : ''} locked - {palette.length - lockedColors.size} will change during operations
          </p>
        </div>
      )}

      {/* Quick Palette Themes */}
      <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-900">Quick Palette Themes</h4>
          <FiStar className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => {
              const warmColors = ['#FF6B35', '#F7931E', '#FFD23F', '#FF8C42', '#C73E1D'];
              const newPalette = palette.map((color, index) => 
                lockedColors.has(index) ? color : {
                  ...color,
                  hex: warmColors[index % warmColors.length],
                  rgb: hexToRgb(warmColors[index % warmColors.length]),
                  hsl: hexToHsl(warmColors[index % warmColors.length]),
                  aestheticScore: 0.8,
                  harmonyScore: 0.9,
                  contrastScore: 0.7
                }
              );
              onPaletteChange(newPalette);
            }}
            className="p-4 text-left bg-orange-50 hover:bg-orange-100 border-2 border-orange-300 hover:border-orange-400 rounded-xl transition-all hover:scale-105"
          >
            <div className="font-bold text-orange-800 text-sm mb-1">🔥 Warm</div>
            <div className="text-xs text-orange-700 font-medium">Orange & red tones</div>
          </button>

          <button
            onClick={() => {
              const coolColors = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'];
              const newPalette = palette.map((color, index) => 
                lockedColors.has(index) ? color : {
                  ...color,
                  hex: coolColors[index % coolColors.length],
                  rgb: hexToRgb(coolColors[index % coolColors.length]),
                  hsl: hexToHsl(coolColors[index % coolColors.length]),
                  aestheticScore: 0.8,
                  harmonyScore: 0.9,
                  contrastScore: 0.8
                }
              );
              onPaletteChange(newPalette);
            }}
            className="p-4 text-left bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 hover:border-blue-400 rounded-xl transition-all hover:scale-105"
          >
            <div className="font-bold text-blue-800 text-sm mb-1">❄️ Cool</div>
            <div className="text-xs text-blue-700 font-medium">Blue & cyan tones</div>
          </button>

          <button
            onClick={() => {
              const grayShades = ['#1F2937', '#374151', '#6B7280', '#9CA3AF', '#F3F4F6'];
              const newPalette = palette.map((color, index) => 
                lockedColors.has(index) ? color : {
                  ...color,
                  hex: grayShades[index % grayShades.length],
                  rgb: hexToRgb(grayShades[index % grayShades.length]),
                  hsl: hexToHsl(grayShades[index % grayShades.length]),
                  aestheticScore: 0.7,
                  harmonyScore: 0.8,
                  contrastScore: 0.9
                }
              );
              onPaletteChange(newPalette);
            }}
            className="p-4 text-left bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 hover:border-gray-400 rounded-xl transition-all hover:scale-105"
          >
            <div className="font-bold text-gray-800 text-sm mb-1">⚫ Mono</div>
            <div className="text-xs text-gray-700 font-medium">Grayscale tones</div>
          </button>

          <button
            onClick={() => {
              const natureColors = ['#2D5016', '#68BB59', '#A4DE6C', '#C3D9B0', '#E8F5E8'];
              const newPalette = palette.map((color, index) => 
                lockedColors.has(index) ? color : {
                  ...color,
                  hex: natureColors[index % natureColors.length],
                  rgb: hexToRgb(natureColors[index % natureColors.length]),
                  hsl: hexToHsl(natureColors[index % natureColors.length]),
                  aestheticScore: 0.8,
                  harmonyScore: 0.8,
                  contrastScore: 0.7
                }
              );
              onPaletteChange(newPalette);
            }}
            className="p-4 text-left bg-green-50 hover:bg-green-100 border-2 border-green-300 hover:border-green-400 rounded-xl transition-all hover:scale-105"
          >
            <div className="font-bold text-green-800 text-sm mb-1">🌿 Nature</div>
            <div className="text-xs text-green-700 font-medium">Forest & earth tones</div>
          </button>
        </div>
      </div>

      {/* Advanced AI Info */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
            <FiZap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-purple-900 mb-2">AI Enhancement Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-purple-800">
              <div className="flex items-start space-x-2">
                <FiTrendingUp className="w-4 h-4 text-purple-600 mt-0.5" />
                <span className="font-medium">Aesthetic scoring with trained neural networks</span>
              </div>
              <div className="flex items-start space-x-2">
                <FiRotateCw className="w-4 h-4 text-purple-600 mt-0.5" />
                <span className="font-medium">Color harmony optimization</span>
              </div>
              <div className="flex items-start space-x-2">
                <FiEye className="w-4 h-4 text-purple-600 mt-0.5" />
                <span className="font-medium">WCAG accessibility compliance</span>
              </div>
              <div className="flex items-start space-x-2">
                <FiStar className="w-4 h-4 text-purple-600 mt-0.5" />
                <span className="font-medium">Professional role assignment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility functions (same as before)
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'rgb(0, 0, 0)';
  
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  
  return `rgb(${r}, ${g}, ${b})`;
};

const hexToHsl = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'hsl(0, 0%, 0%)';
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

const hexToHslValues = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const hslToHex = (h, s, l) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const getColorUsageSuggestion = (hex, index) => {
  const suggestions = [
    'Primary brand color, main CTAs',
    'Secondary actions, accents',
    'Highlights, success states',
    'Background, subtle elements',
    'Text, borders, details',
    'Neutral tones, dividers',
    'Success indicators, highlights',
    'Warning states, caution',
    'Error states, alerts',
    'Info states, links'
  ];
  
  const hsl = hexToHslValues(hex);
  
  if (hsl.l < 20) return 'Dark backgrounds, text on light';
  if (hsl.l > 80) return 'Light backgrounds, subtle elements';
  if (hsl.s > 70) return 'Accent colors, highlights, CTAs';
  if (hsl.s < 30) return 'Neutral backgrounds, borders';
  
  return suggestions[index % suggestions.length];
};

export default PaletteEditor;
