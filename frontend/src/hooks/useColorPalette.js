// hooks/useColorPalette.js
import { useState, useCallback } from 'react';

export const useColorPalette = () => {
  const [copiedColor, setCopiedColor] = useState('');
  
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(text);
      setTimeout(() => setCopiedColor(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, []);
  
  const checkContrast = useCallback((palette) => {
  // Return early if the palette is invalid or too small
  if (!palette || palette.length < 2) return [];

  const results = [];

  // 1. Identify and separate colors by their role
  const primaries = palette.filter(c => c.role === 'primary' && /^#[0-9A-Fa-f]{6}$/.test(c.hex));
  const secondaries = palette.filter(c => c.role === 'secondary' && /^#[0-9A-Fa-f]{6}$/.test(c.hex));
  const accents = palette.filter(c => c.role === 'accent' && /^#[0-9A-Fa-f]{6}$/.test(c.hex));

  // 2. Test each primary color against all secondary colors
  primaries.forEach(primary => {
    secondaries.forEach(secondary => {
      const ratio = calculateContrastRatio(primary.hex, secondary.hex);
      // Ensure the result is a valid number before adding it
      if (isFinite(ratio)) {
        results.push({
          color1: primary.hex,
          color2: secondary.hex,
          ratio,
          passesAA: ratio >= 4.5,
          passesAAA: ratio >= 7,
          roles: ['primary', 'secondary']
        });
      }
    });
  });

  // 3. Test each secondary color against all accent colors
  secondaries.forEach(secondary => {
    accents.forEach(accent => {
      const ratio = calculateContrastRatio(secondary.hex, accent.hex);
      if (isFinite(ratio)) {
        results.push({
          color1: secondary.hex,
          color2: accent.hex,
          ratio,
          passesAA: ratio >= 4.5,
          passesAAA: ratio >= 7,
          roles: ['secondary', 'accent']
        });
      }
    });
  });

  // 4. Return the results sorted by the highest contrast ratio first
  return results.sort((a, b) => b.ratio - a.ratio);
}, []);
  
  const simulateColorBlindnessLMS = (hex, type) => {
    let [r, g, b] = hexToRgb(hex);

    // Convert sRGB to linear RGB
    const lin = (c) => {
      c = c / 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    r = lin(r); g = lin(g); b = lin(b);

    // RGB to LMS
    let L = 0.31399022 * r + 0.63951294 * g + 0.04649755 * b;
    let M = 0.15537241 * r + 0.75789446 * g + 0.08670142 * b;
    let S = 0.01775239 * r + 0.10944209 * g + 0.87256922 * b;

    // Apply deficiency matrices
    switch (type) {
      case 'protanopia': 
        L = 0; // No L-cone response
        break;
      case 'deuteranopia': 
        M = 0; // No M-cone response
        break;
      case 'tritanopia': 
        S = 0; // No S-cone response
        break;
      default: break;
    }

    // LMS back to linear RGB
    let rLin =  5.47221206*L - 4.6419601*M + 0.16963708*S;
    let gLin = -1.1252419*L + 2.29317094*M - 0.1678952*S;
    let bLin =  0.02980165*L - 0.19318073*M + 1.16364789*S;

    // Linear RGB to sRGB
    const srgb = (c) => {
      c = clamp(c);
      return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };

    r = Math.round(srgb(rLin) * 255);
    g = Math.round(srgb(gLin) * 255);
    b = Math.round(srgb(bLin) * 255);

    return rgbToHex(r, g, b);
  };
  
  return {
    copyToClipboard,
    copiedColor,
    checkContrast,
    simulateColorBlindnessLMS
  };
};

// Contrast calculation utilities
const getLuminance = (hex) => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >>  8) & 0xff;
  const b = (rgb >>  0) & 0xff;
  
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const calculateContrastRatio = (color1, color2) => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

// Color blindness simulation (simplified)
const simulateProtanopia = (hex) => simulateColorBlindnessLMS(hex, 'protanopia');

const simulateDeuteranopia = (hex) => simulateColorBlindnessLMS(hex, 'deuteranopia');

const simulateTritanopia = (hex) => simulateColorBlindnessLMS(hex, 'tritanopia');

const simulateAchromatopsia = (hex) => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  
  const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  return rgbToHex(gray, gray, gray);
};

const hexToRgb = (hex) => {
  const rgb = parseInt(hex.slice(1), 16);
  return [
    (rgb >> 16) & 0xff,
    (rgb >> 8) & 0xff,
    rgb & 0xff
  ];
};

const rgbToHex = (r, g, b) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};

const clamp = (value) => Math.max(0, Math.min(255, value));