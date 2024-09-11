// src/components/Button.jsx
import React from 'react';

function Button({ label, onClick, variant = 'primary', type = 'button', className = '' }) {
  const baseStyles = 'inline-flex items-center border-0 py-2 px-6 focus:outline-none rounded text-base';
  const variants = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {label}
    </button>
  );
}

export default Button;
