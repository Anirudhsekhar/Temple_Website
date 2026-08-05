'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        if (data.success) {
          // Requirement 16: Remove Rituals category from Gallery
          const filtered = (data.gallery || []).filter((i) => i.category !== 'Rituals');
          setItems(filtered);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const categories = ['All', ...new Set(items.map((i) => i.category || 'General').filter((c) => c !== 'Rituals'))];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 text-[#D8D5C8]">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
          Visual Devotion
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F7F2E7] tracking-[0.03em]">
          Temple Gallery & Album Archive
        </h1>
        <p className="font-body text-base text-[#D8D5C8] leading-relaxed">
          High-resolution photography capturing the divine ambience of Sarpa Kavu, ancient stone idols, and traditional temple architecture.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#5E645A]/50 pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#9B7A41] text-[#F7F2E7] shadow-md border border-[#5E645A]'
                : 'bg-[#233728] text-[#D8D5C8] border border-[#5E645A] hover:border-[#9B7A41] hover:text-[#F7F2E7]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#4F7A4D]">Loading sacred media archive...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="relative h-64 rounded-[20px] overflow-hidden border border-[#5E645A] bg-[#233728] cursor-pointer group shadow-soft"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A12] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-3 right-3 p-2 rounded-lg bg-[#0D1A12]/80 text-[#9B7A41] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9B7A41]">
                  {item.category} • {item.album || 'Photo'}
                </span>
                <h3 className="font-heading text-base text-[#F7F2E7] group-hover:text-[#9B7A41] transition-colors truncate">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeMedia && (
        <Modal
          isOpen={!!activeMedia}
          onClose={() => setActiveMedia(null)}
          title={activeMedia.title}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden border border-[#5E645A] bg-[#0D1A12]">
              <Image
                src={activeMedia.url}
                alt={activeMedia.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex justify-between items-center text-xs text-[#4F7A4D] border-t border-[#5E645A] pt-4">
              <span>Category: <strong className="text-[#F7F2E7]">{activeMedia.category}</strong></span>
              <span>Album: <strong className="text-[#9B7A41]">{activeMedia.album || 'Sacred Archive'}</strong></span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
