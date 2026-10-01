'use client';
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PoojaBookingModal from '@/components/PoojaBookingModal';

const CATEGORIES = [
  'All',
  'Daily Poojas',
  'Special Poojas',
  'Festival Poojas',
  'Monthly Offerings'
];

export default function PoojasPage() {
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    async function fetchPoojas() {
      try {
        const res = await fetch('/api/poojas', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setPoojas(data.poojas || []);
        }
      } catch (err) {
        console.error('Poojas fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPoojas();
  }, []);

  const filteredPoojas = poojas.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory ||
      (selectedCategory === 'Daily Poojas' && (p.category === 'Daily' || p.category === 'Serpent Pooja' || p.category === 'Nivedyam' || p.category === 'Abhishekam')) ||
      (selectedCategory === 'Special Poojas' && (p.category === 'Special' || p.category === 'Grand Ritual' || p.category === 'Archana')) ||
      (selectedCategory === 'Festival Poojas' && p.category === 'Festival') ||
      (selectedCategory === 'Monthly Offerings' && p.category === 'Monthly');
      
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookClick = (pooja) => {
    setSelectedPooja(pooja);
    setBookingOpen(true);
  };

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12 text-[#D8D5C8]">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
          Sacred Offerings
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F7F2E7] tracking-[0.03em]">
          Pooja Offerings & Online Booking
        </h1>
        <p className="font-body text-base text-[#D8D5C8] leading-relaxed">
          Perform sacred sevas for Shree Nagaraja & Nagayakshi from anywhere in the world with instant digital receipt generation.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#233728] p-4 rounded-2xl border border-[#5E645A]">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B7A41]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search poojas by name or benefit..."
            className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#F7F2E7] placeholder-[#5E645A] focus:outline-none focus:border-[#9B7A41]"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-[#5E645A] font-semibold uppercase tracking-wider hidden lg:inline mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-[#9B7A41]" /> Filter:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#9B7A41] text-[#F7F2E7] shadow-md border border-[#5E645A]'
                  : 'bg-[#0D1A12] text-[#D8D5C8] border border-[#5E645A] hover:border-[#9B7A41] hover:text-[#9B7A41]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Poojas Grid */}
      {loading ? (
        <div className="text-center py-16 text-[#4F7A4D]">Loading sacred offerings...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoojas.map((pooja) => (
            <Card key={pooja.id} className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9B7A41] bg-[#0D1A12] px-2.5 py-1 rounded-md border border-[#5E645A]">
                    {pooja.category || 'Pooja'}
                  </span>
                  <span className="font-heading text-2xl text-[#9B7A41] font-bold">
                    ₹{pooja.price}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-[#F7F2E7] font-normal">
                  {pooja.name}
                </h3>

                <p className="text-sm text-[#D8D5C8] leading-relaxed">
                  {pooja.description}
                </p>

                <div className="space-y-1.5 text-xs text-[#4F7A4D] border-t border-[#5E645A]/50 pt-3">
                  <div>Timing: <strong className="text-[#F7F2E7]">{pooja.timing}</strong></div>
                  <div>Applicable Stars: <strong className="text-[#9B7A41]">{pooja.starsApplicable ? pooja.starsApplicable.join(', ') : 'All Stars'}</strong></div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => handleBookClick(pooja)}
                  icon={Calendar}
                >
                  Book Pooja (₹{pooja.price})
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pooja Booking Modal */}
      <PoojaBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedPooja={selectedPooja}
      />
    </div>
  );
}

