// components/layout/SectionLayout.jsx
import React from 'react';

const SectionLayout = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  theme = 'orange', 
  actions, 
  children 
}) => {
  // Theme configurations with proper object structure
  const themes = {
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
      border: 'border-orange-200',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      titleColor: 'text-gray-900',
      subtitleColor: 'text-gray-600'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-200',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      titleColor: 'text-gray-900',
      subtitleColor: 'text-gray-600'
    },
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-200',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      titleColor: 'text-gray-900',
      subtitleColor: 'text-gray-600'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      border: 'border-purple-200',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      titleColor: 'text-gray-900',
      subtitleColor: 'text-gray-600'
    },
    gray: {
      bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
      border: 'border-gray-200',
      iconBg: 'bg-gradient-to-br from-gray-500 to-gray-600',
      titleColor: 'text-gray-900',
      subtitleColor: 'text-gray-600'
    },
    primary: {
      bg: 'bg-gradient-to-br from-primary-50 to-primary-100',
      border: 'border-primary-200',
      iconBg: 'bg-gradient-to-br from-primary-500 to-primary-600',
      titleColor: 'text-gray-900',
      subtitleColor: 'text-gray-600'
    }
  };

  // Get theme configuration, fallback to orange if theme doesn't exist
  const themeConfig = themes[theme] || themes.orange;

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className={`${themeConfig.bg} ${themeConfig.border} border-2 rounded-2xl p-6 shadow-sm`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Icon */}
            {Icon && (
              <div className={`${themeConfig.iconBg} p-3 rounded-xl shadow-lg flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            )}
            
            {/* Title and Subtitle */}
            <div>
              <h2 className={`text-2xl font-bold ${themeConfig.titleColor}`}>
                {title}
              </h2>
              {subtitle && (
                <p className={`${themeConfig.subtitleColor} mt-1 text-sm sm:text-base`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="flex items-center space-x-3">
              {actions}
            </div>
          )}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        {children}
      </div>
    </section>
  );
};

export default SectionLayout;
