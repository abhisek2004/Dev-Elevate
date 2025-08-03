import React, { InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label for the input
  type?: string; // Default type is text 
  className?: string; // Optional className for additional styling
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, type = "text", className="", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ${className}`}
        {...props}
      />
    </div>
  );
});

export default Input;
