'use client';
import React from 'react';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';

export default function FloatingContactButton() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#9B7A41] hover:bg-[#4F7A4D] text-[#F7F2E7] font-semibold text-xs rounded-full shadow-lg border border-[#5E645A] transition-all duration-300 hover:scale-105 group"
      aria-label="Contact Temple"
      title="Contact Temple"
    >
      <PhoneCall className="w-4 h-4 text-[#F7F2E7] group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline tracking-wider uppercase font-mono">Contact Temple</span>
    </Link>
  );
}
