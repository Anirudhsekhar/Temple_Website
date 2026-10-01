'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  ArrowRight,
  Flower2,
  ChevronLeft
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PoojaBookingModal from '@/components/PoojaBookingModal';
import NagaLogo from '@/components/NagaLogo';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [contentRes, timingsRes, eventsRes, poojasRes, galleryRes] = await Promise.all([
          fetch('/api/content', { cache: 'no-store' }),
          fetch('/api/timings', { cache: 'no-store' }),
          fetch('/api/events', { cache: 'no-store' }),
          fetch('/api/poojas', { cache: 'no-store' }),
          fetch('/api/gallery', { cache: 'no-store' })
        ]);

        const content = await contentRes.json();
        const timings = await timingsRes.json();
        const events = await eventsRes.json();
        const poojas = await poojasRes.json();
        const gallery = await galleryRes.json();

        setData({
          settings: content.settings || {},
          timings: timings.timings || [],
          events: events.events || [],
          poojas: poojas.poojas || [],
          gallery: gallery.gallery || []
        });
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openBookingForPooja = (pooja) => {
    setSelectedPooja(pooja);
    setBookingOpen(true);
  };

  const settings = data?.settings || {};
  const timings = data?.timings || [];
  const events = data?.events || [];
  const poojas = data?.poojas || [];
  const gallery = (data?.gallery || []).slice(0, 3); // Display exactly 3 images on homepage about carousel

  const nextSlide = () => {
    if (gallery.length > 0) {
      setCarouselIdx((prev) => (prev + 1) % gallery.length);
    }
  };

  const prevSlide = () => {
    if (gallery.length > 0) {
      setCarouselIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <div className="space-y-0 text-[#D8D5C8]">
      
      {/* ----------------------------------------------------
          SECTION 1: HERO SECTION (Sacred Grove Canopy & Mist)
      ---------------------------------------------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-24 px-5 sm:px-8 overflow-hidden bg-[#0D1A12]">
        {/* Subtle Elanji Tree & Mist Layers */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#9B7A41_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0D1A12] via-[#233728]/40 to-transparent pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#233728] border border-[#5E645A] text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]"
          >
            <NagaLogo className="w-5 h-5" color="#9B7A41" />
            <span>Sacred Serpent Sanctuary • Kerala</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F7F2E7] leading-[1.15] tracking-[0.06em]"
          >
            {settings.heroTitle || 'Mevakkatu Shree Nagaraja Kshetram'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-body text-base sm:text-xl text-[#D8D5C8] max-w-2xl mx-auto leading-relaxed"
          >
            {settings.tagline || 'Where Sacred Flora and Ancient Serpent Spirits Abide'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => openBookingForPooja(poojas[0] || null)}
              icon={Calendar}
            >
              Book Pooja Online
            </Button>
            <Link href="#daily-rituals">
              <Button variant="secondary" size="lg" icon={Clock}>
                Explore Daily Timings
              </Button>
            </Link>
          </motion.div>

          {/* Timings Summary Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="pt-8 border-t border-[#5E645A]/50 inline-flex flex-wrap items-center justify-center gap-6 text-sm text-[#4F7A4D]"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9B7A41]" />
              <span>Morning: <strong className="text-[#F7F2E7]">05:00 AM - 11:30 AM</strong></span>
            </span>
            <span className="hidden sm:inline text-[#5E645A]">|</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9B7A41]" />
              <span>Evening: <strong className="text-[#F7F2E7]">05:00 PM - 07:30 PM</strong></span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 2: ABOUT & HISTORY MERGED SECTION (With 3-Image Carousel)
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#233728]/30 border-y border-[#5E645A]/50">
        <div className="max-w-6xl mx-auto space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41] block">
                The Sacred Grove Tradition
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7] tracking-[0.03em] leading-tight">
                An Ancient Sanctuary of Serpent Divinity & Sacred Flora
              </h2>
              <p className="font-body text-base text-[#D8D5C8] leading-relaxed">
                Mevakkatu Shree Nagaraja Kshetram is a centuries-old Kerala temple renowned for its unblemished spiritual peace and natural sacred grove (Sarpa Kavu). Here, the serpent gods Shree Nagaraja, Nagayakshi, and Nagachamundi are revered as guardians of ecological equilibrium and lineage prosperity.
              </p>
              <p className="font-body text-sm text-[#4F7A4D] leading-relaxed">
                <strong>Ancient Origin & History:</strong> Legend recounts that centuries ago, local agriculturalists struck a Swayambhu idol that bled holy white milk. The land was consecrated as an inviolable Sarpa Kavu bio-reserve.
              </p>
              <div className="pt-2">
                <Link href="/about">
                  <Button variant="secondary" size="md" icon={ArrowRight}>
                    Read Complete History & About
                  </Button>
                </Link>
              </div>
            </div>

            {/* 3-Image Carousel inside About section */}
            <div className="lg:col-span-6 relative">
              {gallery.length > 0 ? (
                <div className="relative h-80 sm:h-96 w-full rounded-[24px] overflow-hidden border border-[#5E645A] shadow-soft group">
                  <Image
                    src={gallery[carouselIdx]?.url || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"}
                    alt={gallery[carouselIdx]?.title || "Sacred Grove"}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A12] via-transparent to-transparent opacity-75" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#9B7A41] uppercase tracking-wider block font-semibold text-[10px]">
                        {gallery[carouselIdx]?.category || 'Sacred Grove'}
                      </span>
                      <span className="text-[#F7F2E7] font-heading text-sm">
                        {gallery[carouselIdx]?.title}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="p-2 rounded-full bg-[#0D1A12]/80 hover:bg-[#9B7A41] text-[#F7F2E7] transition-colors"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2 rounded-full bg-[#0D1A12]/80 hover:bg-[#9B7A41] text-[#F7F2E7] transition-colors"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-80 w-full rounded-[24px] bg-[#233728] border border-[#5E645A] flex items-center justify-center text-[#5E645A]">
                  Sacred Gallery Loading...
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 3: MIDDLE CTA - "VIEW FESTIVALS"
      ---------------------------------------------------- */}
      <section className="py-16 px-5 sm:px-8 bg-[#3A2D25]/40 border-b border-[#5E645A]/50">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
            Annual Celebrations & Rites
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7]">
            Experience Ayilyam Mahotsavam & Sarpa Bali
          </h2>
          <p className="text-sm sm:text-base text-[#D8D5C8] max-w-2xl mx-auto leading-relaxed">
            Join the sacred chants, Pulluvan Pattu, and traditional Noorum Palum offerings performed during upcoming festival dates.
          </p>
          <div className="pt-2">
            <Link href="/festivals">
              <Button variant="primary" size="lg" icon={Calendar}>
                View All Festivals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 4: DAILY RITUALS & TIMINGS
      ---------------------------------------------------- */}
      <section id="daily-rituals" className="py-20 px-5 sm:px-8 lg:px-12 bg-[#0D1A12]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
              Sacred Schedule
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7]">
              Daily Rituals & Pooja Timings
            </h2>
            <p className="text-sm text-[#D8D5C8]">
              Rituals at Mevakkatu follow authentic Kerala Tantric rites handed down through traditional priest lineages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timings.map((item) => (
              <Card key={item.id} className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 border border-[#5E645A]">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-md bg-[#0D1A12] text-xs font-semibold text-[#9B7A41] border border-[#5E645A] mb-2">
                    {item.time}
                  </span>
                  <h3 className="font-heading text-lg text-[#F7F2E7] font-normal">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#D8D5C8] mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#5E645A]/50 flex justify-between items-center text-xs text-[#4F7A4D]">
                  <span>Daily Darshan</span>
                  <Flower2 className="w-4 h-4 text-[#9B7A41]" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 5: REDUCED HOMEPAGE POOJAS (Top 3 Poojas)
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#233728]/30 border-y border-[#5E645A]/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41] block mb-2">
                Sacred Offerings
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7]">
                Featured Temple Poojas
              </h2>
            </div>
            <Link href="/poojas">
              <Button variant="primary" size="sm" icon={ChevronRight}>
                View All Poojas
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {poojas.slice(0, 3).map((pooja) => (
              <Card key={pooja.id} className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7A41]">
                      {pooja.category || 'Serpent Pooja'}
                    </span>
                    <span className="text-lg font-heading font-bold text-[#F7F2E7]">
                      ₹{pooja.price}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-[#F7F2E7]">
                    {pooja.name}
                  </h3>
                  <p className="text-sm text-[#D8D5C8] leading-relaxed line-clamp-3">
                    {pooja.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#5E645A]/50 flex items-center justify-between">
                  <span className="text-xs text-[#4F7A4D]">{pooja.timing || 'Daily Morning'}</span>
                  <Button variant="secondary" size="sm" onClick={() => openBookingForPooja(pooja)}>
                    Book Offering
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 6: VISITOR INFORMATION
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#0D1A12]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
              Devotee Guide
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7]">
              Visitor Information & Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dress Code Card */}
            <Card className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D1A12] border border-[#5E645A] flex items-center justify-center text-[#9B7A41]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl text-[#F7F2E7]">Dress Code</h3>
              <p className="text-sm text-[#D8D5C8] leading-relaxed">
                {settings.dressCode || 'Traditional Dhoti/Mundu for Gents (Upper cloth allowed outside inner sanctum). Sarees, Set Mundu, or Salwar for Ladies.'}
              </p>
            </Card>

            {/* Parking & Conduct */}
            <Card className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D1A12] border border-[#5E645A] flex items-center justify-center text-[#9B7A41]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl text-[#F7F2E7]">Parking & Conduct</h3>
              <p className="text-sm text-[#D8D5C8] leading-relaxed">
                {settings.parking || 'Ample vehicle parking available. Footwear must be removed at outer counter. Maintain quiet solitude near Sarpa Kavu.'}
              </p>
            </Card>

            {/* Photography Policy */}
            <Card className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D1A12] border border-[#5E645A] flex items-center justify-center text-[#9B7A41]">
                <Flower2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl text-[#F7F2E7]">Photography Policy</h3>
              <p className="text-sm text-[#D8D5C8] leading-relaxed">
                {settings.photographyPolicy || 'Strictly forbidden inside inner sanctum and Sarpa Kavu. Allowed only in outer temple compound.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 7: DONATION CTA (Simplified, No Heart Graphics)
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#233728]/30 border-t border-[#5E645A]/50">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 text-center space-y-6 bg-[#233728] border-[#5E645A]">
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7]">
              Support Temple Upkeep & Sarpa Kavu Conservation
            </h2>
            <p className="text-base text-[#D8D5C8] max-w-xl mx-auto leading-relaxed">
              Your contributions sustain daily Annadanam, ancient Sarpa Kavu flora preservation, and traditional Tantric rituals.
            </p>
            <div className="pt-2">
              <Link href="/donations">
                <Button variant="primary" size="lg">
                  Contribute Online Now
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Pooja Booking Modal */}
      <PoojaBookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedPooja={selectedPooja}
      />
    </div>
  );
}

