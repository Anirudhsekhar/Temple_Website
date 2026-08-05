'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HistoryRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/about#history');
  }, [router]);

  return (
    <div className="py-24 text-center text-[#D8D5C8]">
      <p className="text-sm">Redirecting to Temple History inside About section...</p>
    </div>
  );
}
