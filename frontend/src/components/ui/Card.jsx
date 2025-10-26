import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  hover = true,
  border = true,
  interactive = false,
  loading = false,
  ...props 
}) => {
  const baseClasses = 'transition-all duration-300 ease-out relative overflow-hidden';
  
  const variants = {
    default: 'bg-white rounded-2xl border-gray-200',
    compact: 'bg-white rounded-xl border-gray-200',
    minimal: 'bg-white rounded-lg border-gray-100',
    elevated: 'bg-white rounded-2xl border-gray-100 shadow-lg',
    
    // Enhanced palette-focused variants
    palette: 'bg-gradient-to-br from-white via-gray-50/20 to-primary-50/10 rounded-2xl border-gray-200/60',
    feature: 'bg-white rounded-2xl border-primary-100 ring-1 ring-primary-50/50',
    glass: 'bg-white/90 backdrop-blur-md rounded-2xl border-gray-200/60',
    
    // Orange theme variants
    warm: 'bg-gradient-to-br from-primary-50/60 via-white to-orange-50/40 rounded-2xl border-primary-200/50',
    orange: 'bg-gradient-to-br from-orange-50 to-primary-50 rounded-2xl border-primary-200',
    
    // Blue theme variants  
    cool: 'bg-gradient-to-br from-blue-50/60 via-white to-secondary-50/40 rounded-2xl border-blue-200/50',
    blue: 'bg-gradient-to-br from-blue-50 to-secondary-50 rounded-2xl border-blue-200',
    
    // Professional variants
    accent: 'bg-white rounded-2xl border-primary-200 ring-1 ring-primary-100/80',
    professional: 'bg-white rounded-3xl border-gray-200 shadow-sm',
    premium: 'bg-gradient-to-br from-white to-gray-50/30 rounded-2xl border-gray-200/80 shadow-md',
    
    // Special states
    success: 'bg-gradient-to-br from-green-50 to-white rounded-2xl border-green-200',
    warning: 'bg-gradient-to-br from-amber-50 to-white rounded-2xl border-amber-200',
    error: 'bg-gradient-to-br from-red-50 to-white rounded-2xl border-red-200',
    info: 'bg-gradient-to-br from-blue-50 to-white rounded-2xl border-blue-200'
  };
  
  const paddings = {
    none: 'p-0',
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
    '2xl': 'p-12'
  };
  
  const shadows = {
    none: 'shadow-none',
    xs: 'shadow-sm',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg shadow-gray-200/60',
    xl: 'shadow-xl shadow-gray-300/40',
    '2xl': 'shadow-2xl shadow-gray-300/30',
    
    // Themed shadows
    orange: 'shadow-lg shadow-orange-200/40',
    blue: 'shadow-lg shadow-blue-200/40',
    warm: 'shadow-lg shadow-primary-200/30',
    cool: 'shadow-lg shadow-blue-200/30',
    primary: 'shadow-lg shadow-primary-100/50'
  };
  
  const borders = border ? {
    default: 'border',
    compact: 'border', 
    minimal: 'border',
    elevated: 'border',
    palette: 'border',
    feature: 'border',
    glass: 'border',
    warm: 'border',
    orange: 'border-2',
    cool: 'border',
    blue: 'border-2', 
    accent: 'border',
    professional: 'border',
    premium: 'border',
    success: 'border-2',
    warning: 'border-2',
    error: 'border-2',
    info: 'border-2'
  } : { [variant]: '' };
  
  const hoverEffects = hover ? {
    default: 'hover:shadow-lg hover:shadow-gray-200/70 hover:-translate-y-1 hover:scale-[1.02]',
    compact: 'hover:shadow-md hover:-translate-y-0.5 hover:scale-[1.01]',
    minimal: 'hover:shadow-sm hover:border-gray-200 hover:bg-gray-50/30',
    elevated: 'hover:shadow-2xl hover:shadow-gray-300/60 hover:-translate-y-2 hover:scale-[1.02]',
    
    palette: 'hover:shadow-lg hover:shadow-primary-200/40 hover:-translate-y-1 hover:ring-2 hover:ring-primary-100 hover:scale-[1.01]',
    feature: 'hover:shadow-xl hover:shadow-primary-200/50 hover:-translate-y-1 hover:ring-2 hover:ring-primary-200 hover:scale-[1.02]',
    glass: 'hover:shadow-lg hover:bg-white/95 hover:-translate-y-1 hover:backdrop-blur-lg',
    
    warm: 'hover:shadow-xl hover:shadow-primary-300/40 hover:-translate-y-1 hover:ring-2 hover:ring-primary-200 hover:scale-[1.01]',
    orange: 'hover:shadow-xl hover:shadow-orange-300/50 hover:-translate-y-1 hover:border-orange-300 hover:scale-[1.02]',
    
    cool: 'hover:shadow-xl hover:shadow-blue-300/40 hover:-translate-y-1 hover:ring-2 hover:ring-blue-200 hover:scale-[1.01]',
    blue: 'hover:shadow-xl hover:shadow-blue-300/50 hover:-translate-y-1 hover:border-blue-300 hover:scale-[1.02]',
    
    accent: 'hover:shadow-lg hover:shadow-primary-200/60 hover:-translate-y-1 hover:ring-2 hover:ring-primary-200 hover:scale-[1.01]',
    professional: 'hover:shadow-lg hover:shadow-gray-200/60 hover:-translate-y-0.5',
    premium: 'hover:shadow-xl hover:shadow-gray-300/50 hover:-translate-y-1 hover:scale-[1.01]',
    
    success: 'hover:shadow-lg hover:shadow-green-200/50 hover:-translate-y-0.5 hover:border-green-300',
    warning: 'hover:shadow-lg hover:shadow-amber-200/50 hover:-translate-y-0.5 hover:border-amber-300', 
    error: 'hover:shadow-lg hover:shadow-red-200/50 hover:-translate-y-0.5 hover:border-red-300',
    info: 'hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-0.5 hover:border-blue-300'
  } : {};

  const interactiveStyles = interactive ? 'cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-100 focus:ring-offset-2' : '';
  
  const getVariantClasses = () => {
    const variantClass = variants[variant] || variants.default;
    const borderClass = borders[variant] || '';
    return `${variantClass} ${borderClass}`;
  };

  return (
    <div 
      className={`
        ${baseClasses} 
        ${getVariantClasses()}
        ${paddings[padding]} 
        ${shadows[shadow]} 
        ${hoverEffects[variant] || ''} 
        ${interactiveStyles}
        ${loading ? 'animate-pulse' : ''}
        ${className}
      `} 
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      {...props}
    >
      {/* Loading State Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-10 rounded-inherit">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-4 h-4 bg-primary-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-4 h-4 bg-primary-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className={loading ? 'opacity-50' : ''}>
        {children}
      </div>
      
      {/* Decorative Elements for Premium Variants */}
      {(variant === 'premium' || variant === 'feature') && (
        <>
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-100/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-100/20 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
        </>
      )}
    </div>
  );
};

export default Card;
