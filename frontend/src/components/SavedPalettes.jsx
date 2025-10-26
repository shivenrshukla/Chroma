import React, { useState, useEffect } from 'react';
import { FiBookmark, FiTrash2, FiDownload, FiShare2, FiSearch, FiGrid, FiList, FiTrendingUp, FiLayers, FiTag } from 'react-icons/fi';
import Button from './ui/Button';
import Input from './ui/Input';

const SavedPalettes = () => {
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedPalettes, setSelectedPalettes] = useState(new Set());

  useEffect(() => {
    // Load saved palettes from localStorage
    const saved = localStorage.getItem('chromagen-saved-palettes');
    if (saved) {
      setSavedPalettes(JSON.parse(saved));
    }
  }, []);

  const mockPalettes = [
    {
      id: 1,
      name: 'Ocean Sunset',
      colors: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4D96FF'],
      createdAt: new Date().toISOString(),
      tags: ['nature', 'warm', 'vibrant']
    },
    {
      id: 2,
      name: 'Corporate Modern',
      colors: ['#2D3748', '#4A5568', '#718096', '#A0AEC0', '#E2E8F0'],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      tags: ['business', 'minimal', 'professional']
    },
    {
      id: 3,
      name: 'Forest Dreams',
      colors: ['#1A202C', '#2D5016', '#68BB59', '#A4DE6C', '#C3D9B0'],
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      tags: ['nature', 'green', 'calm']
    },
    {
      id: 4,
      name: 'Warm Autumn',
      colors: ['#D2691E', '#CD853F', '#F4A460', '#DEB887', '#FFDEAD'],
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      tags: ['autumn', 'warm', 'cozy']
    },
    {
      id: 5,
      name: 'Tech Startup',
      colors: ['#1F2937', '#374151', '#6B7280', '#9CA3AF', '#F3F4F6'],
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      tags: ['tech', 'modern', 'sleek']
    },
    {
      id: 6,
      name: 'Vibrant Energy',
      colors: ['#FF4500', '#FF6B35', '#FFA500', '#FFD700', '#32CD32'],
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      tags: ['vibrant', 'energy', 'bright']
    },
    {
      id: 7,
      name: 'Cool Blues',
      colors: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
      createdAt: new Date(Date.now() - 518400000).toISOString(),
      tags: ['blue', 'cool', 'professional']
    },
    {
      id: 8,
      name: 'Monochrome Elegant',
      colors: ['#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF'],
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      tags: ['monochrome', 'elegant', 'minimal']
    }
  ];

  const displayPalettes = savedPalettes.length > 0 ? savedPalettes : mockPalettes;

  const filteredPalettes = displayPalettes.filter(palette =>
    palette.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    palette.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const deletePalette = (id) => {
    const updated = savedPalettes.filter(p => p.id !== id);
    setSavedPalettes(updated);
    localStorage.setItem('chromagen-saved-palettes', JSON.stringify(updated));
  };

  const exportPalette = (palette) => {
    const dataStr = JSON.stringify(palette, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${palette.name.toLowerCase().replace(/\s+/g, '-')}-palette.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const sharePalette = (palette) => {
    if (navigator.share) {
      navigator.share({
        title: `${palette.name} Color Palette`,
        text: `Check out this color palette: ${palette.colors.join(', ')}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const shareText = `${palette.name}: ${palette.colors.join(', ')}`;
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg">
              <FiBookmark className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Palette Library</h1>
          </div>
          <p className="text-gray-600">
            {filteredPalettes.length} palette{filteredPalettes.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search by name or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<FiSearch className="w-4 h-4" />}
            size="sm"
            className="w-72"
          />
          
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Grid view"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="List view"
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Banner */}
      {filteredPalettes.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 via-white to-orange-50 border border-blue-200 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <FiLayers className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Your Collection</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <FiTrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{displayPalettes.length} total</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiTag className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{new Set(displayPalettes.flatMap(p => p.tags)).size} tags</span>
                </div>
              </div>
            </div>
            {searchTerm && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-blue-600 font-medium">
                  Showing {filteredPalettes.length} of {displayPalettes.length} palettes
                </span>
                <Button
                  onClick={() => setSearchTerm('')}
                  variant="ghost"
                  size="xs"
                  className="text-blue-600 hover:bg-blue-50"
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Palettes Grid/List */}
      {filteredPalettes.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <FiBookmark className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">
            {searchTerm ? 'No matching palettes found' : 'No saved palettes yet'}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">
            {searchTerm 
              ? `No palettes match "${searchTerm}". Try different search terms or browse all palettes.` 
              : 'Start creating and saving beautiful color palettes to build your personal collection.'}
          </p>
          {searchTerm && (
            <Button
              onClick={() => setSearchTerm('')}
              variant="outline"
              size="md"
            >
              Browse All Palettes
            </Button>
          )}
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredPalettes.map((palette) => (
            <div key={palette.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
              {/* Palette Preview */}
              <div className="grid grid-cols-5 gap-1 h-16 rounded-xl overflow-hidden mb-4 shadow-sm ring-1 ring-gray-100">
                {palette.colors.map((color, index) => (
                  <div
                    key={index}
                    className="h-full cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: color }}
                    title={`${color} - Click to copy`}
                    onClick={() => navigator.clipboard.writeText(color)}
                  />
                ))}
              </div>
              
              {/* Palette Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors text-lg">
                    {palette.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Created {new Date(palette.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {palette.tags.map((tag) => (
                    <button
                      key={tag}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 text-xs rounded-full transition-colors font-medium"
                      onClick={() => setSearchTerm(tag)}
                      title={`Search for "${tag}" palettes`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
                
                {/* Color Count & Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{palette.colors.length} colors</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-600 font-medium">Saved</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => exportPalette(palette)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Download palette"
                    >
                      <FiDownload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => sharePalette(palette)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Share palette"
                    >
                      <FiShare2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => deletePalette(palette.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete palette"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Footer Stats */}
      {filteredPalettes.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">Collection Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-1">{displayPalettes.length}</div>
              <div className="text-sm font-medium text-gray-600">Total Palettes</div>
            </div>
            <div className="p-4 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {displayPalettes.reduce((acc, p) => acc + p.colors.length, 0)}
              </div>
              <div className="text-sm font-medium text-gray-600">Total Colors</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-gray-700 mb-1">
                {new Set(displayPalettes.flatMap(p => p.tags)).size}
              </div>
              <div className="text-sm font-medium text-gray-600">Unique Tags</div>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {Math.round(displayPalettes.length / 30 * 10) / 10}
              </div>
              <div className="text-sm font-medium text-gray-600">Per Month</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPalettes;
