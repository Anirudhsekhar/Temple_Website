import React from 'react';

export default function NagaLogo({ className = "w-9 h-9", color = "#9B7A41" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Sacred Halo/Circle */}
      <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="2.5" strokeDasharray="4 2" opacity="0.6" />
      <circle cx="50" cy="50" r="41" stroke={color} strokeWidth="1.5" opacity="0.8" />
      
      {/* 5-Hooded Naga Serpent Silhouette */}
      <path
        d="M50 18 C 42 22, 38 32, 40 40 C 41 45, 45 48, 48 52 C 51 55, 54 58, 52 64 C 50 69, 44 70, 42 75 C 40 80, 46 84, 52 83 C 58 82, 60 76, 56 71 C 52 66, 47 62, 48 57 C 49 54, 52 52, 55 49 C 59 44, 61 36, 57 28 C 55 22, 52 19, 50 18 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Hood details - 5 crowns */}
      <path d="M50 18 L50 28" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M43 21 C45 25, 47 28, 50 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M57 21 C55 25, 53 28, 50 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M37 26 C41 29, 45 32, 50 33" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M63 26 C59 29, 55 32, 50 33" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

      {/* Serpent Eye / Sacred Jewel (Nagamanikyam) */}
      <circle cx="50" cy="24" r="2.5" fill={color} />
      
      {/* Sacred Base Lotus Leaves */}
      <path d="M30 80 C40 76, 45 83, 50 85 C55 83, 60 76, 70 80" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
