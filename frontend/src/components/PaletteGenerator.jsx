import React, { useState } from 'react';
import { FiUpload, FiType, FiImage, FiRefreshCw, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Button from './ui/Button';
import Input from './ui/Input';
import { useAI } from '../hooks/useAI';

const PaletteGenerator = ({ onPaletteGenerated, isGenerating, setIsGenerating }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const { generateFromText, generateFromImage } = useAI();

  const handleTextGeneration = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate a palette.');
      return;
    }

    setIsGenerating(true);
    setError('');
    try {
      const palette = await generateFromText(prompt);
      onPaletteGenerated(palette);
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Failed to generate palette. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    setError('');

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(file);
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    handleImageUpload(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setError('');
  };

  // In PaletteGenerator.jsx - Update handleImageGeneration method

  const handleImageGeneration = async () => {
    if (!selectedImage) {
      setError('Please upload an image to extract colors.');
      return;
    }

    setIsGenerating(true);
    setError('');
  
    try {
      // Pass the actual file object to useAI hook
      const palette = await generateFromImage(selectedImage);
      onPaletteGenerated(palette);
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Failed to extract colors from image. Please try a different image or check if the Flask server is running.');
    } finally {
      setIsGenerating(false);
    }
  };

  const promptSuggestions = [
    { text: 'Ocean sunset with warm tones', category: 'Nature', icon: '🌅' },
    { text: 'Modern minimalist tech startup', category: 'Business', icon: '💻' },
    { text: 'Cozy autumn coffee shop vibes', category: 'Lifestyle', icon: '☕' },
    { text: 'Vibrant fitness brand energy', category: 'Health', icon: '💪' },
  ];

  const getRandomSuggestions = () => {
    return promptSuggestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  };

  const [displayedSuggestions, setDisplayedSuggestions] = useState(getRandomSuggestions());

  const refreshSuggestions = () => {
    setDisplayedSuggestions(getRandomSuggestions());
  };

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <FiAlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm text-red-800">{error}</p>
          <button
            onClick={() => setError('')}
            className="ml-auto p-1 text-red-400 hover:text-red-600"
            aria-label="Dismiss error"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'text'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
          }`}
          aria-selected={activeTab === 'text'}
        >
          <FiType className="w-4 h-4 inline-block mr-2" />
          Text Prompt
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'image'
              ? 'bg-blue-500 text-white shadow-sm'
              : 'text-gray-600 hover:text-blue-500 hover:bg-blue-50'
          }`}
          aria-selected={activeTab === 'image'}
        >
          <FiImage className="w-4 h-4 inline-block mr-2" />
          Image Upload
        </button>
      </div>

      {/* Text Prompt Tab */}
      {activeTab === 'text' && (
        <div className="space-y-6">
          <Input
            label="Describe Your Color Vision"
            placeholder="e.g., Ocean sunset or modern tech palette"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            size="lg"
            variant="default"
            icon={<FiType className="w-4 h-4 text-gray-500" />}
          />

          {/* Prompt Suggestions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-gray-900">Try These Prompts</h4>
              <button
                onClick={refreshSuggestions}
                className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 text-sm"
                aria-label="Refresh prompt suggestions"
              >
                <FiRefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {displayedSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(suggestion.text)}
                  className="p-4 text-left bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{suggestion.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{suggestion.text}</p>
                      <p className="text-xs text-gray-500">{suggestion.category}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleTextGeneration}
            disabled={isGenerating || !prompt.trim()}
            variant="primary"
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <FiCheck className="w-5 h-5 mr-2" />
                Generate Palette
              </>
            )}
          </Button>
        </div>
      )}

      {/* Image Upload Tab */}
      {activeTab === 'image' && (
        <div className="space-y-6">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="image-upload"
              disabled={isGenerating}
            />
            {!imagePreview ? (
              <label
                htmlFor="image-upload"
                className={`block border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FiUpload className={`w-8 h-8 mx-auto mb-2 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <p className="text-gray-700 font-medium">Upload or Drag Image</p>
                <p className="text-sm text-gray-500">PNG, JPG, WEBP (Max 10MB)</p>
              </label>
            ) : (
              <div className="relative bg-white border border-gray-200 rounded-lg p-4">
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                  aria-label="Remove image"
                >
                  <FiX className="w-4 h-4 text-gray-600" />
                </button>
                <img
                  src={imagePreview}
                  alt="Selected image"
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                />
                <p className="mt-2 text-sm text-gray-600 text-center">{selectedImage?.name}</p>
              </div>
            )}
          </div>

          <Button
            onClick={handleImageGeneration}
            disabled={isGenerating || !selectedImage}
            variant="primary"
            size="lg"   
            className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Extracting Colors...
              </>
            ) : (
              <>
                <FiImage className="w-5 h-5 mr-2" />
                Extract Palette
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaletteGenerator;