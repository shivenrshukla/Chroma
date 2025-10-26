import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiAlertCircle, FiCheck, FiInfo } from 'react-icons/fi';

const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  className = '',
  error,
  success,
  hint,
  required = false,
  disabled = false,
  icon,
  size = 'md',
  variant = 'default',
  loading = false,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const baseClasses = 'w-full transition-all duration-300 focus:outline-none placeholder:text-gray-400 font-medium';
  
  const variants = {
    default: 'bg-white border border-gray-200 hover:border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 shadow-sm hover:shadow-md',
    minimal: 'bg-gray-50 border border-gray-100 hover:border-gray-200 focus:border-primary-400 focus:ring-3 focus:ring-primary-50 focus:bg-white hover:bg-gray-100/50',
    glass: 'bg-white/90 backdrop-blur-sm border border-gray-200/60 hover:border-gray-300/80 focus:border-primary-400 focus:ring-4 focus:ring-primary-100/50 shadow-lg',
    outline: 'bg-transparent border-2 border-gray-300 hover:border-gray-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-100',
    warm: 'bg-gradient-to-r from-primary-50/40 to-orange-50/40 border border-primary-200 hover:border-primary-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 focus:bg-white shadow-sm'
  };
  
  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs rounded-lg',
    sm: 'px-3 py-2.5 text-sm rounded-lg',
    md: 'px-4 py-3.5 text-sm rounded-xl',
    lg: 'px-5 py-4 text-base rounded-xl',
    xl: 'px-6 py-5 text-lg rounded-2xl'
  };

  const getStateClasses = () => {
    if (error) return 'border-red-400 hover:border-red-500 focus:border-red-500 focus:ring-red-100 bg-red-50/50 shadow-sm';
    if (success) return 'border-green-400 hover:border-green-500 focus:border-green-500 focus:ring-green-100 bg-green-50/30 shadow-sm';
    if (disabled) return 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed opacity-75';
    return variants[variant];
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getIconPadding = () => {
    const hasLeftIcon = icon;
    const hasRightIcon = type === 'password' || error || success || loading;
    
    let padding = '';
    if (hasLeftIcon) {
      padding += size === 'lg' || size === 'xl' ? 'pl-12 ' : 'pl-10 ';
    }
    if (hasRightIcon) {
      padding += size === 'lg' || size === 'xl' ? 'pr-12 ' : 'pr-10 ';
    }
    return padding;
  };

  return (
    <div className="space-y-2">
      {/* Enhanced Label */}
      {label && (
        <label className="block text-sm font-bold text-gray-800">
          <span>{label}</span>
          {required && <span className="text-red-500 ml-1 text-base">*</span>}
          {!required && (
            <span className="text-gray-400 ml-2 text-xs font-normal">(optional)</span>
          )}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative group">
        {/* Left Icon */}
        {icon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
            error ? 'text-red-500' : 
            success ? 'text-green-500' : 
            isFocused ? 'text-primary-500' : 'text-gray-400'
          } ${size === 'lg' || size === 'xl' ? 'left-4' : 'left-3'}`}>
            {icon}
          </div>
        )}
        
        {/* Input Field */}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            ${baseClasses} 
            ${sizes[size]} 
            ${getStateClasses()}
            ${getIconPadding()}
            ${className}
          `}
          {...props}
        />
        
        {/* Right Side Icons */}
        <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 ${
          size === 'lg' || size === 'xl' ? 'right-4' : 'right-3'
        }`}>
          {/* Loading Spinner */}
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-300 border-t-primary-600"></div>
          )}
          
          {/* Status Icons */}
          {!loading && !type.includes('password') && (error || success) && (
            <div>
              {error && <FiAlertCircle className="w-4 h-4 text-red-500" />}
              {success && <FiCheck className="w-4 h-4 text-green-500" />}
            </div>
          )}
          
          {/* Password Toggle */}
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-primary-600 transition-colors p-1 rounded-lg hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-100"
              tabIndex={-1}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        {/* Enhanced Focus Ring */}
        {isFocused && !error && !disabled && (
          <div className="absolute inset-0 rounded-xl ring-4 ring-primary-100 pointer-events-none animate-pulse" />
        )}
        
        {/* Floating Label Effect (for minimal variant) */}
        {variant === 'minimal' && value && (
          <div className="absolute -top-2 left-3 px-2 bg-white">
            <span className="text-xs font-medium text-primary-600">{label}</span>
          </div>
        )}
      </div>
      
      {/* Enhanced Helper Text */}
      <div className="min-h-[24px]">
        {error && (
          <div className="flex items-start space-x-2 animate-in slide-in-from-top-1 duration-200">
            <FiAlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-600 font-medium">{error}</p>
          </div>
        )}
        {success && !error && (
          <div className="flex items-start space-x-2 animate-in slide-in-from-top-1 duration-200">
            <FiCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-600 font-medium">{success}</p>
          </div>
        )}
        {hint && !error && !success && (
          <div className="flex items-start space-x-2">
            <FiInfo className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-500 leading-relaxed">{hint}</p>
          </div>
        )}
      </div>
      
      {/* Character Counter (for text inputs with maxLength) */}
      {props.maxLength && type === 'text' && (
        <div className="text-right">
          <span className={`text-xs ${
            value?.length > props.maxLength * 0.9 
              ? 'text-amber-600' 
              : value?.length === props.maxLength 
                ? 'text-red-500' 
                : 'text-gray-400'
          }`}>
            {value?.length || 0}/{props.maxLength}
          </span>
        </div>
      )}
    </div>
  );
};

export default Input;
