import { colorUtils } from '../utils/colorUtils';

class AIService {
  constructor() {
    this.openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.hfKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    
    // Development mode - skip API calls unless keys are properly configured
    this.developmentMode = true; // Set to false when you have API keys
    this.useMockOnly = this.developmentMode || (!this.openaiKey && !this.hfKey);
  }

  async generateFromText(prompt) {
    // Skip API calls in development mode
    if (this.useMockOnly) {
      console.info('🎨 Development Mode: Using enhanced mock palette generation');
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      return this.generateMockPalette(prompt);
    }

    // Production API logic (when developmentMode = false)
    return this.generateWithAPIs(prompt);
  }

  async generateWithAPIs(prompt) {
    // Try OpenAI first if key exists
    if (this.openaiKey) {
      try {
        return await this.generateWithOpenAI(prompt);
      } catch (error) {
        console.warn('OpenAI failed:', error.message);
      }
    }

    // Fall back to Hugging Face
    if (this.hfKey) {
      try {
        return await this.generateWithHuggingFace(prompt);
      } catch (error) {
        console.warn('Hugging Face failed:', error.message);
      }
    }

    // Final fallback to mock data
    return this.generateMockPalette(prompt);
  }

  // Keep your existing generateWithOpenAI and generateWithHuggingFace methods...

  generateMockPalette(prompt) {
    const promptLower = prompt.toLowerCase();
    
    // Comprehensive palette database
    const paletteDatabase = {
      // Nature & Outdoors
      ocean: ['#001845', '#023E7D', '#0353A4', '#0466C8', '#4CC9F0'],
      sea: ['#012A4A', '#013A63', '#01497C', '#014F86', '#2A6F97'],
      sunset: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
      sunrise: ['#F72585', '#B5179E', '#7209B7', '#480CA8', '#3A0CA3'],
      forest: ['#2D3016', '#414833', '#5F6F52', '#A4B494', '#C3D9B0'],
      mountain: ['#3C2415', '#5A4634', '#8B7765', '#C0A888', '#E6D2B5'],
      
      // Modern & Tech
      tech: ['#03045E', '#023E7D', '#0077B6', '#0096C7', '#00B4D8'],
      modern: ['#212529', '#343A40', '#6C757D', '#ADB5BD', '#F8F9FA'],
      minimal: ['#000000', '#333333', '#666666', '#999999', '#CCCCCC'],
      futuristic: ['#240046', '#3C096C', '#5A189A', '#7B2CBF', '#9D4EDD'],
      cyber: ['#08F7FE', '#09FBD3', '#FE53BB', '#F5D300', '#00FF41'],
      
      // Warm Themes  
      cozy: ['#8B4513', '#A0522D', '#CD853F', '#DEB887', '#F5DEB3'],
      warm: ['#7F1D1D', '#991B1B', '#DC2626', '#EF4444', '#FCA5A5'],
      autumn: ['#92400E', '#B45309', '#D97706', '#F59E0B', '#FDE68A'],
      coffee: ['#3C2415', '#8B4513', '#A0522D', '#CD853F', '#DEB887'],
      
      // Cool Themes
      cool: ['#1E3A8A', '#1D4ED8', '#2563EB', '#3B82F6', '#93C5FD'],
      ice: ['#0C4A6E', '#0284C7', '#0EA5E9', '#38BDF8', '#BAE6FD'],
      arctic: ['#164E63', '#0891B2', '#06B6D4', '#67E8F9', '#CFFAFE'],
      winter: ['#1F2937', '#374151', '#4B5563', '#9CA3AF', '#F3F4F6'],
      
      // Brand Themes
      fitness: ['#7C2D12', '#DC2626', '#EF4444', '#F87171', '#FCA5A5'],
      health: ['#14532D', '#166534', '#15803D', '#16A34A', '#4ADE80'],
      creative: ['#581C87', '#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'],
      professional: ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#DBEAFE'],
      luxury: ['#431407', '#92400E', '#D97706', '#F59E0B', '#FDE68A'],
      
      // Mood Themes
      energetic: ['#DC2626', '#EA580C', '#F59E0B', '#EAB308', '#84CC16'],
      calm: ['#065F46', '#059669', '#10B981', '#34D399', '#A7F3D0'],
      vibrant: ['#C2410C', '#DC2626', '#E11D48', '#BE185D', '#A21CAF'],
      elegant: ['#1F2937', '#374151', '#6B7280', '#9CA3AF', '#E5E7EB'],
      playful: ['#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
    };

    // Enhanced keyword matching
    let selectedPalette = paletteDatabase.modern; // default
    
    for (const [theme, colors] of Object.entries(paletteDatabase)) {
      const keywords = this.getThemeKeywords(theme);
      if (keywords.some(keyword => promptLower.includes(keyword))) {
        selectedPalette = colors;
        break;
      }
    }
    
    // Add intelligent variations based on prompt context
    if (promptLower.includes('dark')) {
      selectedPalette = this.darkenPalette(selectedPalette);
    } else if (promptLower.includes('light') || promptLower.includes('bright')) {
      selectedPalette = this.lightenPalette(selectedPalette);
    } else if (promptLower.includes('pastel')) {
      selectedPalette = this.pastelizePalette(selectedPalette);
    }
    
    return this.formatPalette(selectedPalette);
  }

  getThemeKeywords(theme) {
    const keywordMap = {
      ocean: ['ocean', 'sea', 'water', 'blue', 'marine', 'aqua', 'nautical'],
      sunset: ['sunset', 'orange', 'warm', 'evening', 'dusk'],
      forest: ['forest', 'green', 'nature', 'wood', 'tree', 'natural'],
      tech: ['tech', 'technology', 'digital', 'startup', 'software', 'app'],
      fitness: ['fitness', 'gym', 'sport', 'energy', 'active', 'health'],
      coffee: ['coffee', 'cafe', 'brown', 'espresso', 'latte', 'cozy']
    };
    return keywordMap[theme] || [theme];
  }

  darkenPalette(colors) {
    return colors.map(hex => {
      const [r, g, b] = colorUtils.hexToRgbValues(hex);
      return colorUtils.rgbToHex(
        Math.max(0, Math.floor(r * 0.7)),
        Math.max(0, Math.floor(g * 0.7)),
        Math.max(0, Math.floor(b * 0.7))
      );
    });
  }

  lightenPalette(colors) {
    return colors.map(hex => {
      const [r, g, b] = colorUtils.hexToRgbValues(hex);
      return colorUtils.rgbToHex(
        Math.min(255, Math.floor(r + (255 - r) * 0.4)),
        Math.min(255, Math.floor(g + (255 - g) * 0.4)),
        Math.min(255, Math.floor(b + (255 - b) * 0.4))
      );
    });
  }

  pastelizePalette(colors) {
    return colors.map(hex => {
      const [r, g, b] = colorUtils.hexToRgbValues(hex);
      return colorUtils.rgbToHex(
        Math.floor((r + 255) / 2),
        Math.floor((g + 255) / 2),
        Math.floor((b + 255) / 2)
      );
    });
  }

  formatPalette(hexColors) {
    const roles = ['Primary', 'Secondary', 'Accent', 'Supporting', 'Highlight'];
    
    return hexColors.map((hex, index) => {
      const cleanHex = hex.startsWith('#') ? hex : `#${hex}`;
      return {
        hex: cleanHex,
        rgb: colorUtils.hexToRgb(cleanHex),
        hsl: colorUtils.hexToHsl(cleanHex),
        role: roles[index] || `Color ${index + 1}`
      };
    });
  }

  async generateFromImage(imageData) {
    console.info('🖼️  Image Analysis: Extracting color palette');
    
    // Add realistic delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);
        
        const imageData = ctx.getImageData(0, 0, 150, 150);
        const colors = this.extractDominantColors(imageData.data);
        
        const palette = colors.map((color, index) => ({
          hex: color,
          rgb: colorUtils.hexToRgb(color),
          hsl: colorUtils.hexToHsl(color),
          role: ['Dominant', 'Secondary', 'Accent', 'Supporting', 'Highlight'][index]
        }));
        
        resolve(palette);
      };
      
      img.src = imageData;
    });
  }

  extractDominantColors(imageData) {
    const colorCounts = new Map();
    
    // Sample every 8th pixel for better performance
    for (let i = 0; i < imageData.length; i += 32) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];
      
      // Skip transparent pixels
      if (a < 128) continue;
      
      // Quantize colors to reduce noise (group similar colors)
      const qr = Math.floor(r / 24) * 24;
      const qg = Math.floor(g / 24) * 24;
      const qb = Math.floor(b / 24) * 24;
      
      const hex = colorUtils.rgbToHex(qr, qg, qb);
      colorCounts.set(hex, (colorCounts.get(hex) || 0) + 1);
    }
    
    // Get top 5 most frequent colors
    return Array.from(colorCounts.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([color]) => color);
  }
}

export const aiService = new AIService();
