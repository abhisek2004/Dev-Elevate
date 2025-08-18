import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className = '', ...props }, ref) => {
    const { state } = useGlobalState();
    
    return (
      <div className="w-full">
        {label && (
          <label className={`block mb-2 text-sm font-medium ${
            state.darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 border rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed
              ${state.darkMode 
                ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' 
                : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className={`mt-1 text-sm ${
            state.darkMode ? 'text-red-400' : 'text-red-600'
          }`}>{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
