// pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiZap, FiShield, FiTrendingUp, FiArrowRight, FiLayers, FiEdit3, FiBookmark, FiEye, FiUsers, FiStar } from 'react-icons/fi';
import Button from '../components/ui/Button';

const HomePage = () => {
  const features = [
    {
      icon: FiZap,
      title: 'AI-Powered Generation',
      description: 'Advanced machine learning creates perfect color palettes from text prompts or images',
      color: 'orange'
    },
    {
      icon: FiShield,
      title: 'Accessibility First',
      description: 'Automatic WCAG compliance testing ensures your colors work for everyone',
      color: 'green'
    },
    {
      icon: FiTrendingUp,
      title: 'Professional Tools',
      description: 'Color harmony, role assignment, and export features for serious projects',
      color: 'blue'
    },
    {
      icon: FiEye,
      title: 'Color Vision Testing',
      description: 'Advanced color blindness simulation with LMS color space technology',
      color: 'purple'
    },
    {
      icon: FiUsers,
      title: 'Team Collaboration',
      description: 'Share palettes and collaborate with your design team in real-time',
      color: 'indigo'
    },
    {
      icon: FiStar,
      title: 'AI Role Classification',
      description: 'Smart role assignment for primary, secondary, and accent colors',
      color: 'pink'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      orange: 'bg-orange-100 text-orange-600',
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      pink: 'bg-pink-100 text-pink-600'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center py-20">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500 to-blue-500 p-6 rounded-3xl shadow-2xl animate-bounce">
              <FiLayers className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full p-2">
              <FiZap className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">
          ChromaGen
        </h1>
        <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          The world's most advanced AI-powered color palette generator with professional 
          accessibility testing and team collaboration features.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/generator">
            <Button
              variant="primary"
              size="lg"
              iconLeft={<FiZap className="w-6 h-6" />}
              className="text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Start Generating
            </Button>
          </Link>
          <Link to="/about">
            <Button
              variant="outline"
              size="lg"
              iconRight={<FiArrowRight className="w-6 h-6" />}
              className="text-lg px-8 py-4"
            >
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-sm text-gray-600">AI Themes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">WCAG</div>
            <div className="text-sm text-gray-600">Compliant</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
            <div className="text-sm text-gray-600">Export Formats</div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary-300">
              <div className={`inline-flex p-4 rounded-2xl mb-6 ${getColorClasses(feature.color)}`}>
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 rounded-3xl p-12 border-2 border-orange-200">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">What would you like to do?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/generator" className="group">
            <div className="bg-white p-8 rounded-2xl border-2 border-orange-200 group-hover:border-orange-400 transition-all group-hover:scale-105 group-hover:shadow-xl">
              <FiLayers className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Generate Palette</h3>
              <p className="text-gray-600">Create palettes from text prompts or images using advanced AI</p>
            </div>
          </Link>
          
          <Link to="/editor" className="group">
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 group-hover:border-blue-400 transition-all group-hover:scale-105 group-hover:shadow-xl">
              <FiEdit3 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Edit Colors</h3>
              <p className="text-gray-600">Fine-tune with professional AI-powered editing tools</p>
            </div>
          </Link>
          
          <Link to="/library" className="group">
            <div className="bg-white p-8 rounded-2xl border-2 border-green-200 group-hover:border-green-400 transition-all group-hover:scale-105 group-hover:shadow-xl">
              <FiBookmark className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Browse Library</h3>
              <p className="text-gray-600">Explore and manage your saved color palettes</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Technology Showcase */}
      <div className="bg-gray-900 rounded-3xl p-12 text-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            ChromaGen uses cutting-edge machine learning algorithms for professional color generation
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-orange-400 font-bold text-lg mb-2">K-means</div>
            <div className="text-gray-400 text-sm">Clustering</div>
          </div>
          <div>
            <div className="text-blue-400 font-bold text-lg mb-2">Neural Networks</div>
            <div className="text-gray-400 text-sm">Aesthetic Scoring</div>
          </div>
          <div>
            <div className="text-green-400 font-bold text-lg mb-2">LMS Color Space</div>
            <div className="text-gray-400 text-sm">Vision Simulation</div>
          </div>
          <div>
            <div className="text-purple-400 font-bold text-lg mb-2">WCAG Testing</div>
            <div className="text-gray-400 text-sm">Accessibility</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
