'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, TreePine, Shield, Flower2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
          About The Sanctuary
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3] tracking-[0.03em]">
          Mevakkatu Shree Nagaraja Kshetram
        </h1>
        <p className="font-body text-base sm:text-lg text-[#C4C0B4] leading-relaxed">
          A traditional Kerala pilgrimage destination honoring serpent divinity, ecological harmony, and centuries of uncompromised tantric worship.
        </p>
      </div>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative h-96 rounded-[24px] overflow-hidden border border-[#2A3A33] shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop"
            alt="Sarpa Kavu Environment"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl text-[#F3EFE3]">
            Spiritual & Ecological Philosophy
          </h2>
          <p className="text-sm sm:text-base text-[#C4C0B4] leading-relaxed">
            In Kerala, temple traditions view nature not as separate from God, but as the living body of the Divine. The serpent deities (Nagas) symbolize Kundalini energy, vitality, subterranean water purity, and ancestral protection.
          </p>
          <p className="text-sm text-[#8FA98B] leading-relaxed">
            At Mevakkatu Kshetram, every morning begins with prayers for global peace (Loka Samasta Sukhino Bhavantu) and environmental equilibrium, reminding every devotee of our sacred duty to protect trees and water bodies.
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F1B16] border border-[#2A3A33] flex items-center justify-center text-[#C6A15B]">
            <TreePine className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-xl text-[#F3EFE3]">Sarpa Kavu Preservation</h3>
          <p className="text-sm text-[#C4C0B4] leading-relaxed">
            Protecting the ancient bio-reserve of sacred flora, creepers, and medicinal trees that surround the serpent shrines.
          </p>
        </Card>

        <Card className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F1B16] border border-[#2A3A33] flex items-center justify-center text-[#C6A15B]">
            <Flower2 className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-xl text-[#F3EFE3]">Authentic Tantric Rites</h3>
          <p className="text-sm text-[#C4C0B4] leading-relaxed">
            Preserving traditional mantras, Noorum Palum offerings, and Kalamezhuthu Pattu rituals without commercialization.
          </p>
        </Card>

        <Card className="space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#0F1B16] border border-[#2A3A33] flex items-center justify-center text-[#C6A15B]">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-xl text-[#F3EFE3]">Devotee Welfare</h3>
          <p className="text-sm text-[#C4C0B4] leading-relaxed">
            Providing peaceful darshan facilities, free prasadam distribution (Annadanam), and astrological remedies for Rahu-Ketu doshas.
          </p>
        </Card>
      </div>

      {/* Navigation CTA */}
      <div className="text-center pt-8 border-t border-[#2A3A33]">
        <Link href="/history">
          <Button variant="primary" size="md" icon={Sparkles}>
            Explore Temple History
          </Button>
        </Link>
      </div>
    </div>
  );
}
