'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TreePine, Shield, Flower2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  const [gallery, setGallery] = useState([]);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('', { cache: 'no-store' });
        const data = await res.json();
        if (data.success && data.gallery) {
          setGallery(data.gallery.slice(0, 3));
        }
      } catch (err) {
        console.error('Failed to fetch gallery for about page:', err);
      }
    }
    fetchGallery();
  }, []);

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
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-16 text-[#D8D5C8]">
      
      {/* 1. Header & Temple Introduction */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
          About The Sanctuary
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F7F2E7] tracking-[0.03em]">
          Mevakkatu Shree Nagaraja Kshetram
        </h1>
        <p className="font-body text-base sm:text-lg text-[#D8D5C8] leading-relaxed">
          A traditional Kerala pilgrimage destination honoring serpent divinity, ecological harmony, and centuries of uncompromised tantric worship.
        </p>
      </div>

      {/* Main Intro Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative h-96 rounded-[24px] overflow-hidden border border-[#5E645A] shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop"
            alt="Sarpa Kavu Environment"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-[#F7F2E7]">
            Temple Introduction
          </h2>
          <p className="text-sm sm:text-base text-[#D8D5C8] leading-relaxed">
            In Kerala, temple traditions view nature not as separate from God, but as the living body of the Divine. The serpent deities (Nagas) symbolize Kundalini energy, vitality, subterranean water purity, and ancestral protection.
          </p>
          <p className="text-sm text-[#4F7A4D] leading-relaxed">
            At Mevakkatu Kshetram, every morning begins with prayers for global peace (Loka Samasta Sukhino Bhavantu) and environmental equilibrium, reminding every devotee of our sacred duty to protect trees and water bodies.
          </p>
        </div>
      </div>

      {/* 2. History Subsection */}
      <section id="history" className="p-8 sm:p-12 rounded-[24px] bg-[#233728] border border-[#5E645A] space-y-8">
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
            Centuries of Heritage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7]">
            Temple History & Swayambhu Legend
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-[#D8D5C8] leading-relaxed">
          <p>
            Legend recounts that several centuries ago, local agriculturalists clearing dense bamboo thickets in Mevakkatu struck a stone with a sickle, which immediately bled sacred white milk. Frightened and awestruck, the village elders summoned learned Vedic Tantris who conducted a Devaprashnam.
          </p>
          <p>
            The Prashnam revealed the divine presence of Lord Nagaraja accompanied by Nagayakshi. The land was immediately consecrated as an inviolable Sarpa Kavu, where no trees were to be felled or flora disturbed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 bg-[#0D1A12] border border-[#5E645A] rounded-xl space-y-2">
            <span className="text-xs font-bold text-[#9B7A41] uppercase">16th Century</span>
            <h4 className="font-heading text-base text-[#F7F2E7]">Swayambhu Consecration</h4>
            <p className="text-xs text-[#D8D5C8]">Enshrined in the sacred grove with granite Chithrakootam idols.</p>
          </div>
          <div className="p-5 bg-[#0D1A12] border border-[#5E645A] rounded-xl space-y-2">
            <span className="text-xs font-bold text-[#9B7A41] uppercase">19th Century</span>
            <h4 className="font-heading text-base text-[#F7F2E7]">Noorum Palum Expansion</h4>
            <p className="text-xs text-[#D8D5C8]">Monthly Ayilyam rituals established for Rahu-Ketu dosha shanti.</p>
          </div>
          <div className="p-5 bg-[#0D1A12] border border-[#5E645A] rounded-xl space-y-2">
            <span className="text-xs font-bold text-[#9B7A41] uppercase">Modern Era</span>
            <h4 className="font-heading text-base text-[#F7F2E7]">Trust Governance</h4>
            <p className="text-xs text-[#D8D5C8]">Official temple trust managing bio-reserve protection & digital services.</p>
          </div>
        </div>
      </section>

      {/* 3. Mission / Spiritual Significance */}
      <div className="space-y-8">
        <h2 className="font-heading text-3xl sm:text-4xl text-[#F7F2E7] text-center">
          Mission & Spiritual Significance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0D1A12] border border-[#5E645A] flex items-center justify-center text-[#9B7A41]">
              <TreePine className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl text-[#F7F2E7]">Sarpa Kavu Bio-Reserve</h3>
            <p className="text-sm text-[#D8D5C8] leading-relaxed">
              Protecting the ancient bio-reserve of sacred flora, creepers, and medicinal trees that surround the serpent shrines.
            </p>
          </Card>

          <Card className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0D1A12] border border-[#5E645A] flex items-center justify-center text-[#9B7A41]">
              <Flower2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl text-[#F7F2E7]">Authentic Rites</h3>
            <p className="text-sm text-[#D8D5C8] leading-relaxed">
              Preserving traditional mantras, Noorum Palum offerings, and Kalamezhuthu Pattu rituals without commercialization.
            </p>
          </Card>

          <Card className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#0D1A12] border border-[#5E645A] flex items-center justify-center text-[#9B7A41]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl text-[#F7F2E7]">Devotee Solace</h3>
            <p className="text-sm text-[#D8D5C8] leading-relaxed">
              Providing peaceful darshan facilities, free prasadam distribution (Annadanam), and astrological remedies for Rahu-Ketu doshas.
            </p>
          </Card>
        </div>
      </div>

      {/* 4. Gallery Preview Carousel (3 Images) */}
      <div className="space-y-8 pt-6 border-t border-[#5E645A]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
              Sacred Imagery
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl text-[#F7F2E7]">
              Gallery Preview
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl bg-[#233728] border border-[#5E645A] text-[#F7F2E7] hover:border-[#9B7A41] transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl bg-[#233728] border border-[#5E645A] text-[#F7F2E7] hover:border-[#9B7A41] transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {gallery.length > 0 && (
          <Card className="p-4 space-y-4">
            <div className="relative h-80 sm:h-[400px] w-full rounded-2xl overflow-hidden border border-[#5E645A]">
              <Image
                src={gallery[carouselIdx]?.url || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop"}
                alt={gallery[carouselIdx]?.title || "Gallery image"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1A12] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-xs text-[#9B7A41] font-semibold uppercase tracking-wider block">
                    {gallery[carouselIdx]?.category}
                  </span>
                  <h4 className="font-heading text-xl text-[#F7F2E7]">
                    {gallery[carouselIdx]?.title}
                  </h4>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

    </div>
  );
}

