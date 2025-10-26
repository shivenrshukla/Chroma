export const colorUtils = {
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `rgb(${r}, ${g}, ${b})`;
  },

  hexToHsl: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return null;
    
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
    
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  },

  rgbToHex: (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  getLuminance: (hex) => {
    const rgb = colorUtils.hexToRgbValues(hex);
    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  },

  hexToRgbValues: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  },

  // Color blindness simulation (simplified)
  simulateProtanopia: (hex) => {
    const [r, g, b] = colorUtils.hexToRgbValues(hex);
    const newR = Math.round(0.567 * r + 0.433 * g);
    const newG = Math.round(0.558 * r + 0.442 * g);
    const newB = b;
    return colorUtils.rgbToHex(Math.min(255, newR), Math.min(255, newG), newB);
  },

  simulateDeuteranopia: (hex) => {
    const [r, g, b] = colorUtils.hexToRgbValues(hex);
    const newR = Math.round(0.625 * r + 0.375 * g);
    const newG = Math.round(0.7 * r + 0.3 * g);
    const newB = b;
    return colorUtils.rgbToHex(Math.min(255, newR), Math.min(255, newG), newB);
  },

  simulateTritanopia: (hex) => {
    const [r, g, b] = colorUtils.hexToRgbValues(hex);
    const newR = r;
    const newG = Math.round(0.967 * g + 0.033 * b);
    const newB = Math.round(0.817 * g + 0.183 * b);
    return colorUtils.rgbToHex(newR, Math.min(255, newG), Math.min(255, newB));
  },

  simulateAchromatopsia: (hex) => {
    const [r, g, b] = colorUtils.hexToRgbValues(hex);
    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    return colorUtils.rgbToHex(gray, gray, gray);
  }
};
