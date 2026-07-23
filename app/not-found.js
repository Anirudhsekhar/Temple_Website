'use client';
import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#18261F] border border-[#2A3A33] flex items-center justify-center text-[#C6A15B]">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3]">
        404 — Sacred Path Not Found
      </h1>
      <p className="text-base text-[#C4C0B4] max-w-md mx-auto leading-relaxed">
        The page or resource you are looking for may have been moved or is currently unavailable.
      </p>
      <div className="pt-2">
        <Link href="/">
          <Button variant="primary" size="md" icon={Home}>
            Return to Temple Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
