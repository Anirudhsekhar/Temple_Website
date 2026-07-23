'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Heart,
  ArrowRight,
  Flower2,
  TreePine,
  CheckCircle2,
  Phone
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PoojaBookingModal from '@/components/PoojaBookingModal';

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [contentRes, timingsRes, eventsRes, poojasRes, galleryRes] = await Promise.all([
          fetch('/api/content'),
          fetch('/api/timings'),
          fetch('/api/events'),
          fetch('/api/poojas'),
          fetch('/api/gallery')
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
  const gallery = data?.gallery || [];

  return (
    <div className="space-y-0">
      
      {/* ----------------------------------------------------
          SECTION 1: HERO SECTION
      ---------------------------------------------------- */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 px-5 sm:px-8 overflow-hidden bg-[#0F1B16]">
        {/* Ambient Dark Overlay with Soft Glow */}
        <div className="absolute inset-0 z-0 opacity-25 mix-blend-overlay pointer-events-none bg-[radial-gradient(#C6A15B_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#18261F] border border-[#2A3A33] text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spiritual Sanctuary in Kerala</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F3EFE3] leading-[1.1] tracking-[0.08em]"
          >
            {settings.heroTitle || 'Mevakkatu Shree Nagaraja Kshetram'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-lg sm:text-xl text-[#C4C0B4] max-w-2xl mx-auto leading-relaxed"
          >
            {settings.heroSubtitle || 'Experience the calm, sacred presence of serpent divinity amidst ancient Sarpa Kavu flora.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
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
                Explore Daily Rituals
              </Button>
            </Link>
          </motion.div>

          {/* Timings Summary Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6 border-t border-[#2A3A33]/80 inline-flex flex-wrap items-center justify-center gap-6 text-sm text-[#8FA98B]"
          >
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C6A15B]" />
              <span>Morning: <strong>05:00 AM - 11:30 AM</strong></span>
            </span>
            <span className="hidden sm:inline text-[#2A3A33]">|</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C6A15B]" />
              <span>Evening: <strong>05:00 PM - 07:30 PM</strong></span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 2: TEMPLE INTRODUCTION
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#18261F]/40 border-y border-[#2A3A33]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B] block">
              Sacred Heritage
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3] tracking-[0.03em] leading-tight">
              A Quiet Sanctuary of Serpent Divinity & Sacred Flora
            </h2>
            <p className="font-body text-base sm:text-lg text-[#C4C0B4] leading-relaxed">
              Mevakkatu Shree Nagaraja Kshetram is a centuries-old Kerala temple renowned for its unblemished spiritual peace and natural sacred grove (Sarpa Kavu). Here, the serpent gods Shree Nagaraja, Nagayakshi, and Nagachamundi are revered as guardians of ecological equilibrium and lineage prosperity.
            </p>
            <p className="font-body text-sm sm:text-base text-[#8FA98B] leading-relaxed">
              Devotees visit from across the nation to seek freedom from Rahu-Ketu astrological doshas, skin afflictions, and ancestral burdens through traditional Noorum Palum offerings and Sarpa Bali.
            </p>
            <div className="pt-2">
              <Link href="/about">
                <Button variant="secondary" size="md" icon={ArrowRight}>
                  Learn More About Our Philosophy
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-[24px] overflow-hidden border border-[#2A3A33] shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1545652985-5edd365b12eb?q=80&w=800&auto=format&fit=crop"
                alt="Mevakkatu Temple Architecture"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B16] via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 3: TEMPLE HISTORY PREVIEW
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#0F1B16]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
            Ancient Origin
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3] tracking-[0.03em]">
            Centuries of Spiritual Continuity
          </h2>
          <p className="font-body text-base sm:text-lg text-[#C4C0B4] leading-relaxed max-w-2xl mx-auto">
            Rooted in Kerala's ancient tradition of honoring nature and serpentine protectors, Mevakkatu temple has preserved its pristine Sarpa Kavu ecosystem without commercial alteration for generations.
          </p>
          <div className="pt-4">
            <Link href="/history">
              <Button variant="ghost" size="md" icon={ChevronRight}>
                Read Full Temple History
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 4: SACRED GROVE (SARPA KAVU)
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#18261F] border-y border-[#2A3A33]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-[24px] overflow-hidden border border-[#2A3A33]">
              <Image
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
                alt="Sarpa Kavu Flora"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8FA98B]">
              <TreePine className="w-4 h-4 text-[#C6A15B]" />
              <span>Sacred Ecology</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3] tracking-[0.03em]">
              The Sarpa Kavu Sanctuary
            </h2>
            <p className="font-body text-base text-[#C4C0B4] leading-relaxed">
              The Sarpa Kavu at Mevakkatu is a mini rainforest micro-climate housing rare medicinal herbs, ancient creepers, and carved granite serpent idols (Chithrakootam). Devotees enter with quiet reverence, feeling the cool divine energy that permeates the sacred trees.
            </p>
            <ul className="space-y-3 text-sm text-[#8FA98B]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Untouched natural forest preserve dedicated exclusively to serpent deities</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Morning rituals of milk and turmeric (Noorum Palum) performed daily</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <span>Habitat for indigenous species maintaining ecological harmony</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 5: DAILY RITUALS & TIMINGS
      ---------------------------------------------------- */}
      <section id="daily-rituals" className="py-20 px-5 sm:px-8 lg:px-12 bg-[#0F1B16]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
              Sacred Schedule
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3]">
              Daily Rituals & Pooja Timings
            </h2>
            <p className="text-sm text-[#C4C0B4]">
              Rituals at Mevakkatu follow authentic Kerala Tantric rites handed down through traditional priest lineages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timings.map((item) => (
              <Card key={item.id} className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4 border border-[#2A3A33]">
                    <Image
                      src={item.image || "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-md bg-[#0F1B16] text-xs font-semibold text-[#C6A15B] border border-[#2A3A33] mb-2">
                    {item.time}
                  </span>
                  <h3 className="font-heading text-lg text-[#F3EFE3] font-normal">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#C4C0B4] mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#2A3A33]/50 flex justify-between items-center text-xs text-[#8FA98B]">
                  <span>Daily Darshan</span>
                  <Flower2 className="w-4 h-4 text-[#C6A15B]" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 6: UPCOMING FESTIVALS
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#18261F]/40 border-y border-[#2A3A33]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B] block mb-2">
                Celebrations
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3]">
                Upcoming Festivals & Mahotsavams
              </h2>
            </div>
            <Link href="/events">
              <Button variant="secondary" size="sm" icon={ChevronRight}>
                View All Festivals
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.slice(0, 3).map((event) => (
              <Card key={event.id} className="space-y-4">
                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-[#2A3A33]">
                  <Image
                    src={event.image || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop"}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#0F1B16]/90 text-xs font-semibold text-[#C6A15B] border border-[#2A3A33]">
                    {event.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-[#8FA98B] flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <h3 className="font-heading text-xl text-[#F3EFE3]">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#C4C0B4] line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 7: GALLERY PREVIEW
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#0F1B16]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B] block mb-2">
                Visual Sanctuary
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3]">
                Gallery & Sacred Media
              </h2>
            </div>
            <Link href="/gallery">
              <Button variant="ghost" size="sm" icon={ChevronRight}>
                View Full Gallery
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.slice(0, 4).map((item) => (
              <div key={item.id} className="relative h-56 rounded-2xl overflow-hidden border border-[#2A3A33] group">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B16] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C6A15B] block">
                    {item.category}
                  </span>
                  <h4 className="font-heading text-sm text-[#F3EFE3] truncate">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 8: VISITOR INFORMATION
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#18261F] border-y border-[#2A3A33]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
              Devotee Guide
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3]">
              Visitor Information & Rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dress Code Card */}
            <Card className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F1B16] border border-[#2A3A33] flex items-center justify-center text-[#C6A15B]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl text-[#F3EFE3]">Dress Code</h3>
              <p className="text-sm text-[#C4C0B4] leading-relaxed">
                {settings.dressCode || 'Traditional Dhoti/Mundu for Gents (Upper cloth allowed outside inner sanctum). Sarees, Set Mundu, or Salwar for Ladies.'}
              </p>
            </Card>

            {/* Parking & Rules Card */}
            <Card className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F1B16] border border-[#2A3A33] flex items-center justify-center text-[#C6A15B]">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl text-[#F3EFE3]">Parking & Conduct</h3>
              <p className="text-sm text-[#C4C0B4] leading-relaxed">
                {settings.parking || 'Ample vehicle parking available. Footwear must be removed at outer counter. Maintain quiet solitude near Sarpa Kavu.'}
              </p>
            </Card>

            {/* Photography Policy Card */}
            <Card className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#0F1B16] border border-[#2A3A33] flex items-center justify-center text-[#C6A15B]">
                <Flower2 className="w-5 h-5" />
              </div>
              <h3 className="font-heading text-xl text-[#F3EFE3]">Photography Policy</h3>
              <p className="text-sm text-[#C4C0B4] leading-relaxed">
                {settings.photographyPolicy || 'Strictly forbidden inside inner sanctum and Sarpa Kavu. Allowed only in outer temple compound.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SECTION 9: DONATION CTA
      ---------------------------------------------------- */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#0F1B16]">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 text-center space-y-6 bg-gradient-to-b from-[#18261F] to-[#0F1B16] border-[#C6A15B]/30 shadow-gold">
            <div className="w-12 h-12 rounded-full bg-[#0F1B16] border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#F3EFE3]">
              Support Temple Upkeep & Sarpa Kavu Conservation
            </h2>
            <p className="text-base text-[#C4C0B4] max-w-xl mx-auto leading-relaxed">
              Your valuable offerings sustain daily Annadanam, ancient Sarpa Kavu flora preservation, and traditional Tantric rituals.
            </p>
            <div className="pt-2">
              <Link href="/donations">
                <Button variant="primary" size="lg" icon={Heart}>
                  Donate Online Now
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
