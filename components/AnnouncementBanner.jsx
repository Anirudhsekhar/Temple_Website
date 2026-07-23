'use client';
import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch('/api/announcements');
        const data = await res.json();
        if (data.success && data.announcements) {
          const active = data.announcements.filter(a => a.active);
          setAnnouncements(active);
        }
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
      }
    }
    fetchAnnouncements();
  }, []);

  if (dismissed || announcements.length === 0) return null;

  const current = announcements[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-[#23452F] border-b border-[#2A3A33] text-[#F3EFE3] px-4 py-2.5 text-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A15B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A15B]"></span>
            </span>
            <div className="flex items-center gap-2 truncate">
              <Bell className="w-4 h-4 text-[#C6A15B] shrink-0" />
              <span className="font-medium text-xs sm:text-sm tracking-wide truncate">
                {current.message}
              </span>
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-[#8FA98B] hover:text-[#F3EFE3] p-1 rounded-md hover:bg-[#18261F] transition-colors shrink-0"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
