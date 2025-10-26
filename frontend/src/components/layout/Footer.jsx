// components/layout/Footer.jsx
import React from 'react';
import { FiHeart, FiGithub, FiTwitter, FiMail, FiZap, FiShield, FiLayers, FiExternalLink } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { label: 'Generator', href: '#generator' },
    { label: 'Library', href: '#library' },
    { label: 'Settings', href: '#settings' },
    { label: 'About', href: '#about' }
  ];

  const resources = [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Color Theory', href: '#' },
    { label: 'WCAG Guidelines', href: '#', external: true }
  ];

  const legal = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Support', href: '#' }
  ];

  const socialLinks = [
    { 
      icon: FiGithub, 
      href: '#', 
      label: 'GitHub',
      color: 'hover:text-gray-900 hover:bg-gray-100'
    },
    { 
      icon: FiTwitter, 
      href: '#', 
      label: 'Twitter',
      color: 'hover:text-blue-600 hover:bg-blue-50'
    },
    { 
      icon: FiMail, 
      href: '#', 
      label: 'Email',
      color: 'hover:text-orange-600 hover:bg-orange-50'
    }
  ];

  const features = [
    { icon: FiZap, label: 'AI Generation', color: 'text-orange-500' },
    { icon: FiShield, label: 'WCAG Testing', color: 'text-green-500' },
    { icon: FiLayers, label: 'Smart Export', color: 'text-blue-500' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-blue-500 p-3 rounded-xl shadow-lg">
                  <FiLayers className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full p-1">
                  <FiZap className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">ChromaGen</h3>
                <p className="text-sm text-gray-600">AI Color Intelligence</p>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6 max-w-sm">
              Empowering designers and developers with AI-powered color palette generation, 
              accessibility testing, and professional color tools.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={feature.label}
                    className="flex items-center space-x-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200"
                  >
                    <Icon className={`w-3 h-3 ${feature.color}`} />
                    <span className="text-xs font-medium text-gray-700">{feature.label}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`p-3 text-gray-400 ${social.color} rounded-xl transition-all duration-200 hover:scale-110`}
                    title={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-orange-600 transition-colors font-medium text-sm flex items-center space-x-2 group"
                  >
                    <span>{link.label}</span>
                    <div className="w-0 group-hover:w-4 h-px bg-orange-500 transition-all duration-200"></div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Resources</h4>
            <ul className="space-y-4">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm flex items-center space-x-2 group"
                    {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    <span>{link.label}</span>
                    {link.external && <FiExternalLink className="w-3 h-3 opacity-50" />}
                    <div className="w-0 group-hover:w-4 h-px bg-blue-500 transition-all duration-200"></div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wide">Legal & Support</h4>
            <ul className="space-y-4">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm flex items-center space-x-2 group"
                  >
                    <span>{link.label}</span>
                    <div className="w-0 group-hover:w-4 h-px bg-gray-500 transition-all duration-200"></div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Status Indicator */}
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
              </div>
              <p className="text-xs text-green-600">AI services running smoothly</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Side */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span>Made with</span>
                <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for designers worldwide</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>© {currentYear} ChromaGen</span>
                <span className="hidden sm:inline">•</span>
                <span>Open Source</span>
                <span className="hidden sm:inline">•</span>
                <span>MIT License</span>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-50 to-blue-50 px-4 py-2 rounded-full border border-orange-200">
                <span className="text-sm font-semibold text-gray-700">Version 1.0.0-beta</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
            ChromaGen uses artificial intelligence to create accessible color palettes. 
            All generated palettes are tested for WCAG AA/AAA compliance and color blindness compatibility. 
            Perfect for web design, branding, UI/UX projects, and creative workflows.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
