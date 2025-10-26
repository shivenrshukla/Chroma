import React from 'react';
import { FiInfo, FiHeart, FiGithub, FiTwitter, FiMail, FiZap, FiShield, FiUsers, FiTrendingUp, FiAward, FiCode, FiEye } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: FiZap,
      title: 'AI-Powered Generation',
      description: 'Create stunning palettes from text descriptions using advanced AI models'
    },
    {
      icon: FiEye,
      title: 'Smart Image Extraction',
      description: 'Extract beautiful color combinations from any uploaded image'
    },
    {
      icon: FiShield,
      title: 'WCAG Compliance',
      description: 'Real-time accessibility checking ensures your designs are inclusive'
    },
    {
      icon: FiUsers,
      title: 'Color Vision Testing',
      description: 'Simulate different types of color blindness for better accessibility'
    },
    {
      icon: FiCode,
      title: 'Developer Friendly',
      description: 'Export in multiple formats: HEX, RGB, HSL, CSS, SCSS, and JSON'
    },
    {
      icon: FiTrendingUp,
      title: 'Continuous Learning',
      description: 'AI models improve with every generation for better results'
    }
  ];

  const techStack = [
    { name: 'React 18', category: 'Frontend' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'OpenAI GPT', category: 'AI Engine' },
    { name: 'Hugging Face', category: 'ML Models' },
    { name: 'TensorFlow.js', category: 'ML Runtime' },
    { name: 'Web Workers', category: 'Performance' },
    { name: 'Canvas API', category: 'Graphics' }
  ];

  const stats = [
    { value: '50+', label: 'AI Themes', color: 'orange' },
    { value: '100%', label: 'WCAG Ready', color: 'blue' },
    { value: '6+', label: 'Export Formats', color: 'green' },
    { value: '∞', label: 'Possibilities', color: 'purple' }
  ];

  return (
    <div className="space-y-12">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="relative mb-8">
          <div className="bg-gradient-to-br from-primary-500 via-orange-500 to-primary-600 p-6 rounded-3xl w-28 h-28 mx-auto shadow-xl">
            <FiInfo className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-2 shadow-lg">
            <FiZap className="w-4 h-4 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 via-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
          ChromaGen
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The future of accessible color palette generation, powered by artificial intelligence 
          and built for designers who care about inclusive experiences.
        </p>
        
        {/* Version Badge */}
        <div className="mt-6 inline-flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Version 1.0.0 Beta • Live</span>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gradient-to-br from-white via-primary-50/30 to-blue-50/30 border border-gray-200 rounded-3xl p-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
          ChromaGen democratizes professional color palette creation by combining the power of 
          artificial intelligence with rigorous accessibility standards. We believe that beautiful, 
          inclusive design should be accessible to everyone, regardless of their design experience 
          or visual abilities.
        </p>
        
        <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <FiUsers className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Inclusive</span>
          </div>
          <div className="text-center">
            <FiZap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">AI-Powered</span>
          </div>
          <div className="text-center">
            <FiShield className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-700">Accessible</span>
          </div>
        </div>
      </div>

      {/* Enhanced Features Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = ['primary', 'blue', 'orange', 'green', 'purple', 'indigo'];
            const color = colors[index % colors.length];
            
            return (
              <div key={feature.title} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300 group">
                <div className={`inline-flex p-3 rounded-2xl mb-6 ${
                  color === 'primary' ? 'bg-primary-100' :
                  color === 'blue' ? 'bg-blue-100' :
                  color === 'orange' ? 'bg-orange-100' :
                  color === 'green' ? 'bg-green-100' :
                  color === 'purple' ? 'bg-purple-100' :
                  'bg-indigo-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    color === 'primary' ? 'text-primary-600' :
                    color === 'blue' ? 'text-blue-600' :
                    color === 'orange' ? 'text-orange-600' :
                    color === 'green' ? 'text-green-600' :
                    color === 'purple' ? 'text-purple-600' :
                    'text-indigo-600'
                  } group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-white border border-gray-200 rounded-3xl p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built With Modern Tech</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech) => (
            <div key={tech.name} className="text-center group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-primary-50 hover:to-orange-50 px-4 py-6 rounded-2xl transition-all duration-300 border border-gray-200 hover:border-primary-200 hover:shadow-lg">
                <div className="font-bold text-gray-900 mb-1">{tech.name}</div>
                <div className="text-sm text-gray-500">{tech.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Version & Build Info */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl">
              <FiCode className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Version Information</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Current Version', value: 'v1.0.0-beta', type: 'version' },
              { label: 'Release Date', value: 'September 2025', type: 'text' },
              { label: 'License', value: 'MIT Open Source', type: 'text' },
              { label: 'Build Number', value: '#2025092001', type: 'build' }
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600 font-medium">{item.label}:</span>
                <span className={`font-semibold ${
                  item.type === 'version' ? 'bg-primary-100 text-primary-800 px-3 py-1 rounded-lg text-sm' :
                  item.type === 'build' ? 'bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-mono' :
                  'text-gray-900'
                }`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Stats */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl">
              <FiTrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Project Stats</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`text-center p-4 rounded-2xl ${
                stat.color === 'orange' ? 'bg-orange-50' :
                stat.color === 'blue' ? 'bg-blue-50' :
                stat.color === 'green' ? 'bg-green-50' :
                'bg-purple-50'
              }`}>
                <div className={`text-3xl font-bold mb-2 ${
                  stat.color === 'orange' ? 'text-orange-600' :
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  'text-purple-600'
                }`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Contact Section */}
      <div className="bg-gradient-to-br from-primary-50 via-orange-50 to-blue-50 border border-primary-200 rounded-3xl p-10 text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you! Share your feedback, report issues, or contribute to making 
            ChromaGen even better for the design community.
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mb-8">
          {[
            { icon: FiGithub, label: 'GitHub', href: '#', color: 'gray' },
            { icon: FiTwitter, label: 'Twitter', href: '#', color: 'blue' },
            { icon: FiMail, label: 'Email', href: '#', color: 'orange' }
          ].map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className={`group p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-110 ${
                  social.color === 'blue' ? 'hover:border-blue-300 hover:bg-blue-50' :
                  social.color === 'orange' ? 'hover:border-orange-300 hover:bg-orange-50' :
                  'hover:border-gray-300 hover:bg-gray-50'
                }`}
                title={social.label}
              >
                <Icon className={`w-6 h-6 transition-colors ${
                  social.color === 'blue' ? 'text-gray-600 group-hover:text-blue-600' :
                  social.color === 'orange' ? 'text-gray-600 group-hover:text-orange-600' :
                  'text-gray-600 group-hover:text-gray-800'
                }`} />
              </a>
            );
          })}
        </div>
        
        <div className="flex items-center justify-center space-x-8 pt-8 border-t border-primary-200/50 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Open Source</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Community Driven</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Built for Designers</span>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="text-center pt-12 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-gray-600 mb-6 text-lg">
          <span>Made with</span>
          <FiHeart className="w-5 h-5 text-red-500 animate-pulse" />
          <span>for designers and developers worldwide</span>
        </div>
        
        <div className="flex items-center justify-center space-x-6 mb-4 text-sm text-gray-500">
          <span>ChromaGen © 2025</span>
          <span>•</span>
          <span>MIT Licensed</span>
          <span>•</span>
          <span>Open Source</span>
        </div>
        
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Empowering creative minds with accessible color intelligence through the power of artificial intelligence
        </p>
      </div>
    </div>
  );
};

export default About;
