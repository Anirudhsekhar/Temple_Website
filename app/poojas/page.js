'use client';
import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Calendar, Filter, CheckCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PoojaBookingModal from '@/components/PoojaBookingModal';

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
        const res = await fetch('/api/poojas');
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

  const categories = ['All', ...new Set(poojas.map((p) => p.category || 'General'))];

  const filteredPoojas = poojas.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookClick = (pooja) => {
    setSelectedPooja(pooja);
    setBookingOpen(true);
  };

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
          Sacred Offerings
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3] tracking-[0.03em]">
          Pooja Offerings & Online Booking
        </h1>
        <p className="font-body text-base text-[#C4C0B4] leading-relaxed">
          Perform sacred sevas for Shree Nagaraja & Nagayakshi from anywhere in the world with instant digital receipt generation.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#18261F] p-4 rounded-2xl border border-[#2A3A33]">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C6A15B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search poojas by name or benefit..."
            className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl pl-11 pr-4 py-2.5 text-sm text-[#F3EFE3] placeholder-[#6D7B71] focus:outline-none focus:border-[#C6A15B]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C6A15B] text-[#0F1B16]'
                  : 'bg-[#0F1B16] text-[#C4C0B4] border border-[#2A3A33] hover:border-[#C6A15B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Poojas Grid */}
      {loading ? (
        <div className="text-center py-16 text-[#8FA98B]">Loading sacred offerings...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPoojas.map((pooja) => (
            <Card key={pooja.id} className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C6A15B] bg-[#0F1B16] px-2.5 py-1 rounded-md border border-[#2A3A33]">
                    {pooja.category || 'Pooja'}
                  </span>
                  <span className="font-heading text-2xl text-[#C6A15B] font-bold">
                    ₹{pooja.price}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-[#F3EFE3] font-normal">
                  {pooja.name}
                </h3>

                <p className="text-sm text-[#C4C0B4] leading-relaxed">
                  {pooja.description}
                </p>

                <div className="space-y-1.5 text-xs text-[#8FA98B] border-t border-[#2A3A33]/50 pt-3">
                  <div>Timing: <strong className="text-[#F3EFE3]">{pooja.timing}</strong></div>
                  <div>Applicable Stars: <strong className="text-[#C6A15B]">{pooja.starsApplicable ? pooja.starsApplicable.join(', ') : 'All Stars'}</strong></div>
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
