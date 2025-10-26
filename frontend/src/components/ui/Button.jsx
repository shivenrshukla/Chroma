import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  variant = 'primary', 
  size = 'md',
  className = '',
  fullWidth = false,
  iconLeft,
  iconRight,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-4 transform active:scale-[0.96] disabled:transform-none disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    // Primary orange theme
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 active:from-primary-700 active:to-primary-800 text-white shadow-orange hover:shadow-orange-lg focus:ring-primary-200 disabled:bg-gradient-to-r disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:text-gray-500',
    
    // Secondary blue theme  
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 active:from-secondary-700 active:to-secondary-800 text-white shadow-blue hover:shadow-blue-lg focus:ring-secondary-200 disabled:bg-gradient-to-r disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:text-gray-500',
    
    // Enhanced outline variants
    outline: 'border-2 border-primary-500 hover:bg-primary-50 hover:border-primary-600 active:bg-primary-100 text-primary-600 hover:text-primary-700 focus:ring-primary-200 disabled:border-gray-200 disabled:text-gray-400 disabled:bg-transparent disabled:hover:bg-transparent',
    outlineSecondary: 'border-2 border-secondary-500 hover:bg-secondary-50 hover:border-secondary-600 active:bg-secondary-100 text-secondary-600 hover:text-secondary-700 focus:ring-secondary-200 disabled:border-gray-200 disabled:text-gray-400 disabled:bg-transparent',
    
    // Ghost variants
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-800 active:bg-gray-200 focus:ring-gray-200 disabled:text-gray-400 disabled:bg-transparent disabled:hover:bg-transparent',
    ghostPrimary: 'text-primary-600 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100 focus:ring-primary-200 disabled:text-gray-400 disabled:bg-transparent',
    ghostSecondary: 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-700 active:bg-secondary-100 focus:ring-secondary-200 disabled:text-gray-400 disabled:bg-transparent',
    
    // Soft/subtle variants
    soft: 'bg-primary-100 hover:bg-primary-200 active:bg-primary-300 text-primary-700 hover:text-primary-800 focus:ring-primary-200 disabled:bg-gray-100 disabled:text-gray-400',
    softSecondary: 'bg-secondary-100 hover:bg-secondary-200 active:bg-secondary-300 text-secondary-700 hover:text-secondary-800 focus:ring-secondary-200 disabled:bg-gray-100 disabled:text-gray-400',
    
    // Status variants
    success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-green-200 disabled:bg-gray-300 disabled:shadow-none disabled:text-gray-500',
    warning: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl focus:ring-amber-200 disabled:bg-gray-300 disabled:shadow-none disabled:text-gray-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-200 disabled:bg-gray-300 disabled:shadow-none disabled:text-gray-500',
    
    // Special variants
    premium: 'bg-gradient-to-r from-primary-500 via-orange-500 to-primary-600 hover:from-primary-600 hover:via-orange-600 hover:to-primary-700 text-white shadow-xl hover:shadow-2xl focus:ring-primary-200 disabled:bg-gray-300 disabled:shadow-none disabled:text-gray-500',
    glass: 'bg-white/90 backdrop-blur-sm border border-gray-200/60 hover:bg-white hover:border-gray-300 text-gray-700 hover:text-gray-900 focus:ring-gray-200 disabled:bg-gray-100/50 disabled:text-gray-400 disabled:border-gray-200',
  };
  
  const sizes = {
    xs: 'px-3 py-2 text-xs min-h-[32px] gap-1.5',
    sm: 'px-4 py-2.5 text-sm min-h-[36px] gap-2',
    md: 'px-5 py-3 text-sm min-h-[44px] gap-2',
    lg: 'px-6 py-3.5 text-base min-h-[48px] gap-2.5',
    xl: 'px-8 py-4 text-lg min-h-[56px] gap-3',
    '2xl': 'px-10 py-5 text-xl min-h-[64px] gap-3'
  };

  const getIconSize = () => {
    switch(size) {
      case 'xs': return 'w-3 h-3';
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-4 h-4';
      case 'lg': return 'w-5 h-5';
      case 'xl': return 'w-5 h-5';
      case '2xl': return 'w-6 h-6';
      default: return 'w-4 h-4';
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className={`flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
        {/* Left Icon */}
        {iconLeft && !loading && (
          <span className={`flex-shrink-0 ${getIconSize()}`}>
            {iconLeft}
          </span>
        )}
        
        {/* Text Content */}
        <span className="flex-shrink-0">
          {children}
        </span>
        
        {/* Right Icon */}
        {iconRight && !loading && (
          <span className={`flex-shrink-0 ${getIconSize()}`}>
            {iconRight}
          </span>
        )}
      </div>
      
      {/* Ripple Effect (for premium variants) */}
      {(variant === 'premium' || variant === 'primary') && !isDisabled && (
        <div className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
        </div>
      )}
    </button>
  );
};

export default Button;
