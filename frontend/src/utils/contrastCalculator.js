import { colorUtils } from './colorUtils';

export const contrastCalculator = {
  calculateRatio: (color1, color2) => {
    const lum1 = colorUtils.getLuminance(color1);
    const lum2 = colorUtils.getLuminance(color2);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },

  meetsWCAG: (ratio, level = 'AA', size = 'normal') => {
    const thresholds = {
      AA: { normal: 4.5, large: 3.0 },
      AAA: { normal: 7.0, large: 4.5 }
    };
    
    return ratio >= thresholds[level][size];
  },

  getAccessibilityLevel: (ratio, size = 'normal') => {
    if (contrastCalculator.meetsWCAG(ratio, 'AAA', size)) return 'AAA';
    if (contrastCalculator.meetsWCAG(ratio, 'AA', size)) return 'AA';
    return 'Fail';
  }
};
