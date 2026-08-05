'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon = null,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-body font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9B7A41] focus:ring-offset-2 focus:ring-offset-[#0D1A12] disabled:opacity-50 disabled:cursor-not-allowed tracking-[0.06em]";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-lg gap-2",
    md: "px-6 py-3 text-base rounded-xl gap-2.5",
    lg: "px-8 py-4 text-lg rounded-2xl gap-3"
  };

  const variantStyles = {
    primary: "bg-[#9B7A41] text-[#F7F2E7] hover:bg-[#4F7A4D] shadow-md font-bold border border-[#5E645A]",
    secondary: "bg-[#233728] text-[#F7F2E7] border border-[#5E645A] hover:border-[#9B7A41] hover:text-[#9B7A41]",
    ghost: "bg-transparent text-[#D8D5C8] hover:text-[#F7F2E7] hover:bg-[#233728]"
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ y: disabled ? 0 : -2 }}
      transition={{ duration: 0.2 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 stroke-[1.75]" />}
      <span>{children}</span>
    </motion.button>
  );
}
