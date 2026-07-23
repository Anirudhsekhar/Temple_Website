'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-5 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#18261F] border border-red-900/50 flex items-center justify-center text-[#D88A2D]">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3]">
        Temporary System Disturbance
      </h1>
      <p className="text-base text-[#C4C0B4] max-w-md mx-auto leading-relaxed">
        An unexpected error occurred while loading this section. Please refresh or try again shortly.
      </p>
      <div className="pt-2 flex items-center justify-center gap-4">
        <Button variant="primary" size="md" onClick={() => reset()} icon={RotateCcw}>
          Try Refreshing
        </Button>
        <Link href="/">
          <Button variant="secondary" size="md">
            Go to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
