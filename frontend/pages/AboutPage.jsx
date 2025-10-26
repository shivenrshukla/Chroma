// pages/AboutPage.jsx
import React from 'react';
import { FiZap, FiShield, FiUsers, FiTrendingUp, FiEye, FiLayers, FiStar, FiEdit3 } from 'react-icons/fi';
import About from '../components/About';

const AboutPage = () => {
  const features = [
    {
      icon: FiZap,
      title: 'AI-Powered Generation',
      description: 'Advanced machine learning algorithms create professional color palettes from text prompts or images using K-means clustering and neural networks.'
    },
    {
      icon: FiShield,
      title: 'Accessibility First',
      description: 'Automatic WCAG AA/AAA compliance testing with comprehensive color blindness simulation using LMS color space technology.'
    },
    {
      icon: FiStar,
      title: 'Smart Role Assignment',
      description: 'AI automatically classifies colors as primary, secondary, or accent based on saturation, luminance, and design theory principles.'
    },
    {
      icon: FiEye,
      title: 'Advanced Vision Testing',
      description: 'Comprehensive color vision simulation for protanopia, deuteranopia, tritanopia, and achromatopsia with accurate LMS modeling.'
    },
    {
      icon: FiEdit3,
      title: 'Professional Editor',
      description: 'Advanced editing tools with color locking, AI enhancement, harmony generation, and quick theme presets for professional workflows.'
    },
    {
      icon: FiTrendingUp,
      title: 'Export & Integration',
      description: 'Multiple export formats including CSS, SCSS, JSON, Adobe ASE, and direct integration with popular design tools.'
    }
  ];

  const techStack = [
    { name: 'React 18', description: 'Modern frontend framework', color: 'blue' },
    { name: 'Flask', description: 'Python backend API', color: 'green' },
    { name: 'scikit-learn', description: 'Machine learning algorithms', color: 'orange' },
    { name: 'PyTorch', description: 'Neural network training', color: 'red' },
    { name: 'Tailwind CSS', description: 'Utility-first styling', color: 'cyan' },
    { name: 'Vite', description: 'Fast build tooling', color: 'purple' }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-700 border-blue-200',
      green: 'bg-green-100 text-green-700 border-green-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      red: 'bg-red-100 text-red-700 border-red-200',
      cyan: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">About ChromaGen</h1>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The world's most advanced AI-powered color palette generator, combining cutting-edge 
          machine learning with professional accessibility testing and design theory.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-12 border-2 border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
          To democratize professional color design by making advanced AI-powered tools accessible 
          to designers, developers, and creators of all skill levels. We believe that beautiful, 
          accessible color palettes should be available to everyone, not just those with years of 
          color theory training.
        </p>
      </div>

      {/* Key Features */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-100 to-blue-100 p-3 rounded-xl">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Technology Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className={`p-6 rounded-2xl border-2 ${getColorClasses(tech.color)} hover:scale-105 transition-transform`}>
              <h3 className="font-bold text-lg mb-2">{tech.name}</h3>
              <p className="text-sm opacity-80">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-gray-900 rounded-3xl p-12 text-white">
        <h2 className="text-3xl font-bold text-center mb-12">ChromaGen by Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
            <div className="text-gray-300">AI Themes</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
            <div className="text-gray-300">WCAG Tested</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-400 mb-2">4</div>
            <div className="text-gray-300">Vision Types</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">10+</div>
            <div className="text-gray-300">Export Formats</div>
          </div>
        </div>
      </div>

      {/* AI Technology Deep Dive */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center">AI Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Machine Learning Pipeline</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• K-means clustering for color extraction</li>
              <li>• Neural networks for aesthetic scoring</li>
              <li>• REINFORCE optimization algorithms</li>
              <li>• LMS color space transformations</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-4">Accessibility Engine</h3>
            <ul className="space-y-2 text-green-800">
              <li>• WCAG 2.1 AA/AAA compliance testing</li>
              <li>• Real-time contrast ratio calculation</li>
              <li>• Color blindness simulation (4 types)</li>
              <li>• Automated accessibility scoring</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main About Component */}
      <div className="bg-white rounded-2xl border-2 border-gray-200">
        <About />
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-orange-500 to-blue-600 rounded-3xl p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Color Workflow?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of designers and developers who trust ChromaGen for their color palette needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
            Start Creating
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors">
            View Examples
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
