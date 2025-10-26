import { useState, useCallback } from 'react';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  // --- Main Text Generation Function ---
  const generateFromText = useCallback(async (prompt, optimize = true) => { // MODIFIED: Added 'optimize' parameter
    setIsLoading(true);
    try {
      const serverIsUp = await checkServerStatus();
      if (serverIsUp) {
        // MODIFIED: Pass the 'optimize' flag to the backend call
        return await generateFromFlask(prompt, optimize);
      } else {
        console.warn("Backend server is not running. Using mock data as a fallback.");
        return await generateMockPalette(prompt);
      }
    } catch (error) {
      console.error('AI Generation failed:', error);
      return await generateMockPalette(prompt);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // --- Other Hook Functions (Image generation, optimization, etc.) ---
  const generateFromImage = useCallback(async (imageFile, useAdvancedAI = true) => {
    setIsLoading(true);
    try {
      return await extractPaletteFromFlask(imageFile, useAdvancedAI);
    } catch (error) {
      console.error('Image processing failed:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const optimizePalette = useCallback(async (hexColors) => {
    setIsLoading(true);
    try {
      // NOTE: Removed 'steps' from the body as the backend doesn't use it.
      const response = await fetch('http://localhost:5001/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ palette: hexColors }),
      });
      if (!response.ok) throw new Error('Optimization failed');
      const data = await response.json();
      return {
        palette: data.palette, // Directly use the detailed palette
        aestheticScore: data.aesthetic_score || 0.5,
        components: data.components || {} // Now correctly receives this from the updated backend
      };
    } catch (error)
    {
      console.error('Palette optimization failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  return { 
    generateFromText, 
    generateFromImage, 
    optimizePalette, 
    isLoading 
  };
};

// --- API & Fallback Logic ---

const checkServerStatus = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch('http://localhost:5001/health', { 
        method: 'GET',
        signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// MODIFIED: This function is now much simpler
const generateFromFlask = async (prompt, optimize) => {
    const response = await fetch('http://localhost:5001/api/generate-palette', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // MODIFIED: Send the 'optimize' flag to the backend
        body: JSON.stringify({ prompt, optimize }),
    });

    if (!response.ok) {
        throw new Error('Flask server returned an error for text generation');
    }
    const data = await response.json();
    if (!data.palette) {
        throw new Error('Invalid palette format from Flask server');
    }
    // CHANGE: No more mapping! The backend data is already in the perfect format.
    return data.palette;
};

const extractPaletteFromFlask = async (imageFile, useAdvancedAI) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('optimize', useAdvancedAI ? 'advanced' : 'basic');
  
  const response = await fetch('http://localhost:5001/api/extract', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) throw new Error('Flask server error during image extraction');
  const data = await response.json();
  // We can also simplify this by trusting the backend's role assignment
  return data.palette;
};

// Mock data for fallback when the server is down
const intelligentThemes = {
    'modern': ['#111827', '#4B5563', '#E5E7EB', '#FFFFFF', '#3B82F6'],
    'tech': ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
    'startup': ['#F97316', '#FB923C', '#FDBA74', '#FED7AA', '#FFF7ED'],
    'ocean': ['#0C4A6E', '#0284C7', '#0EA5E9', '#38BDF8', '#7DD3FC'],
    'sunset': ['#DC2626', '#EA580C', '#F59E0B', '#FBBF24', '#FCD34D'],
    'forest': ['#14532D', '#166534', '#15803D', '#16A34A', '#22C55E'],
};

const generateMockPalette = async (prompt) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const promptLower = prompt.toLowerCase();
  let selectedTheme = 'modern';
  for (const [theme, colors] of Object.entries(intelligentThemes)) {
    if (promptLower.includes(theme)) {
      selectedTheme = theme;
      break;
    }
  }
  const colors = intelligentThemes[selectedTheme];
  return colors.map((hex, index) => ({
    hex,
    rgb: hexToRgb(hex),
    hsl: hexToHsl(hex),
    role: getRoleForIndex(index),
    name: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} ${index + 1}`,
  }));
};

// --- Color Conversion Utilities ---
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'rgb(0, 0, 0)';
  const r = parseInt(result[1], 16), g = parseInt(result[2], 16), b = parseInt(result[3], 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const hexToHsl = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return 'hsl(0, 0%, 0%)';
  let r = parseInt(result[1], 16) / 255, g = parseInt(result[2], 16) / 255, b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  } else { h = s = 0; }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

const getRoleForIndex = (index) => {
  const roles = ['Primary', 'Secondary', 'Accent', 'Background', 'Text', 'Neutral'];
  return roles[index] || `Color ${index + 1}`;
};

