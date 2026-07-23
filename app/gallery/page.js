'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, Maximize2, Filter, X } from 'lucide-react';
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
          setItems(data.gallery || []);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const categories = ['All', ...new Set(items.map((i) => i.category || 'General'))];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((i) => i.category === selectedCategory);

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
          Visual Devotion
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3] tracking-[0.03em]">
          Temple Gallery & Album Archive
        </h1>
        <p className="font-body text-base text-[#C4C0B4] leading-relaxed">
          High-resolution photography capturing the divine ambience of Sarpa Kavu, traditional Deeparadhana, and temple festivals.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#2A3A33] pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#C6A15B] text-[#0F1B16] shadow-gold'
                : 'bg-[#18261F] text-[#C4C0B4] border border-[#2A3A33] hover:border-[#C6A15B] hover:text-[#F3EFE3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-20 text-[#8FA98B]">Loading sacred media archive...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="relative h-64 rounded-[20px] overflow-hidden border border-[#2A3A33] bg-[#18261F] cursor-pointer group shadow-soft"
            >
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B16] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute top-3 right-3 p-2 rounded-lg bg-[#0F1B16]/80 text-[#C6A15B] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C6A15B]">
                  {item.category} • {item.album || 'Photo'}
                </span>
                <h3 className="font-heading text-base text-[#F3EFE3] group-hover:text-[#C6A15B] transition-colors truncate">
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
            <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden border border-[#2A3A33] bg-[#0F1B16]">
              <Image
                src={activeMedia.url}
                alt={activeMedia.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex justify-between items-center text-xs text-[#8FA98B] border-t border-[#2A3A33] pt-4">
              <span>Category: <strong className="text-[#F3EFE3]">{activeMedia.category}</strong></span>
              <span>Album: <strong className="text-[#C6A15B]">{activeMedia.album || 'Sacred Archive'}</strong></span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
