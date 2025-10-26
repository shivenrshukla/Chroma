// components/ColorHarmony.jsx
import React, { useState } from 'react';
import { FiRotateCw, FiTrendingUp, FiZap, FiLayers } from 'react-icons/fi';
import Button from './ui/Button';
import Card from './ui/Card';

const ColorHarmony = ({ baseColor, onPaletteGenerated }) => {
  const [activeHarmony, setActiveHarmony] = useState('complementary');

  const harmonyTypes = [
    {
      id: 'complementary',
      name: 'Complementary',
      description: 'Colors opposite on the color wheel',
      icon: '🎯'
    },
    {
      id: 'triadic',
      name: 'Triadic',
      description: 'Three evenly spaced colors',
      icon: '🔺'
    },
    {
      id: 'analogous',
      name: 'Analogous',
      description: 'Adjacent colors on the wheel',
      icon: '🌊'
    },
    {
      id: 'splitComplementary',
      name: 'Split Complementary',
      description: 'Base + two adjacent to complement',
      icon: '⚡'
    },
    {
      id: 'tetradic',
      name: 'Tetradic',
      description: 'Two complementary pairs',
      icon: '💎'
    },
    {
      id: 'monochromatic',
      name: 'Monochromatic',
      description: 'Shades of the same hue',
      icon: '📊'
    }
  ];

  const generateHarmony = (type, base = '#F97316') => {
    const hsl = hexToHsl(base);
    let colors = [];

    switch (type) {
      case 'complementary':
        colors = [
          base,
          hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 30)),
          hslToHex((hsl.h + 180) % 360, hsl.s, Math.min(80, hsl.l + 20)),
          hslToHex(hsl.h, Math.max(30, hsl.s - 20), Math.min(90, hsl.l + 30))
        ];
        break;

      case 'triadic':
        colors = [
          base,
          hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 25)),
          hslToHex((hsl.h + 120) % 360, hsl.s, Math.min(85, hsl.l + 20))
        ];
        break;

      case 'analogous':
        colors = [
          hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h - 15 + 360) % 360, hsl.s, hsl.l),
          base,
          hslToHex((hsl.h + 15) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l)
        ];
        break;

      case 'splitComplementary':
        colors = [
          base,
          hslToHex((hsl.h + 150) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, hsl.s, Math.max(25, hsl.l - 20)),
          hslToHex((hsl.h + 180) % 360, Math.max(40, hsl.s - 15), Math.min(80, hsl.l + 15))
        ];
        break;

      case 'tetradic':
        colors = [
          base,
          hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
          hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l),
          hslToHex(hsl.h, Math.max(30, hsl.s - 10), Math.min(85, hsl.l + 15))
        ];
        break;

      case 'monochromatic':
        colors = [
          hslToHex(hsl.h, hsl.s, Math.max(15, hsl.l - 40)),
          hslToHex(hsl.h, hsl.s, Math.max(25, hsl.l - 20)),
          base,
          hslToHex(hsl.h, hsl.s, Math.min(75, hsl.l + 15)),
          hslToHex(hsl.h, Math.max(20, hsl.s - 15), Math.min(90, hsl.l + 30))
        ];
        break;

      default:
        colors = [base];
    }

    return colors.map((hex, index) => ({
      hex,
      rgb: hexToRgb(hex),
      hsl: hexToHslString(hex),
      role: ['Primary', 'Secondary', 'Accent', 'Background', 'Text'][index] || `Color ${index + 1}`
    }));
  };

  const handleGenerate = () => {
    const palette = generateHarmony(activeHarmony, baseColor);
    onPaletteGenerated(palette);
  };

  return (
    <Card variant="default" padding="lg" className="border-2 border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
            <FiRotateCw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Color Harmony Generator</h3>
            <p className="text-gray-700 font-medium">Create palettes based on color theory</p>
          </div>
        </div>
      </div>

      {/* Base Color Display */}
      <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-300">
        <div className="flex items-center space-x-4">
          <div 
            className="w-16 h-16 rounded-xl border-3 border-white shadow-lg"
            style={{ backgroundColor: baseColor }}
          />
          <div>
            <h4 className="font-bold text-gray-900">Base Color</h4>
            <p className="text-gray-700 font-mono font-medium">{baseColor}</p>
          </div>
        </div>
      </div>

      {/* Harmony Types Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {harmonyTypes.map((harmony) => (
          <button
            key={harmony.id}
            onClick={() => setActiveHarmony(harmony.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              activeHarmony === harmony.id
                ? 'border-orange-500 bg-orange-50 shadow-lg'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            }`}
          >
            <div className="text-2xl mb-2">{harmony.icon}</div>
            <h4 className={`font-bold mb-1 ${
              activeHarmony === harmony.id ? 'text-orange-900' : 'text-gray-900'
            }`}>
              {harmony.name}
            </h4>
            <p className={`text-xs ${
              activeHarmony === harmony.id ? 'text-orange-700' : 'text-gray-600'
            } font-medium`}>
              {harmony.description}
            </p>
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-900 mb-4">Preview</h4>
        <div className="flex rounded-xl overflow-hidden shadow-lg border-2 border-gray-300 h-16">
          {generateHarmony(activeHarmony, baseColor).map((color, index) => (
            <div
              key={index}
              className="flex-1 flex items-center justify-center text-white font-bold text-sm shadow-inner"
              style={{ backgroundColor: color.hex }}
              title={color.hex}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        variant="primary"
        size="lg"
        fullWidth={true}
        iconLeft={<FiZap className="w-5 h-5" />}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
      >
        Generate {harmonyTypes.find(h => h.id === activeHarmony)?.name} Palette
      </Button>
    </Card>
  );
};

// Utility functions
const hexToHsl = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

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

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const hexToHslString = (hex) => {
  const hsl = hexToHsl(hex);
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
};

export default ColorHarmony;
