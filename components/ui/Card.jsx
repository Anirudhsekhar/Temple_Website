'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, borderColor: '#C6A15B' } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={`bg-[#18261F] border border-[#2A3A33] rounded-[20px] p-6 shadow-soft transition-colors duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
