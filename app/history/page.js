'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Shield, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function HistoryPage() {
  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-4xl mx-auto space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
          Heritage & Legacy
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3] tracking-[0.03em]">
          Temple History & Sacred Legend
        </h1>
        <p className="font-body text-base sm:text-lg text-[#C4C0B4] leading-relaxed max-w-2xl mx-auto">
          Trace the ancient origins of Mevakkatu Shree Nagaraja Kshetram and the legend of the divine serpent's self-manifested (Swayambhu) presence.
        </p>
      </div>

      {/* Main Narrative Card */}
      <Card className="p-8 sm:p-10 space-y-6">
        <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden border border-[#2A3A33]">
          <Image
            src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1000&auto=format&fit=crop"
            alt="Ancient Serpent Idols"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4 text-base text-[#C4C0B4] leading-relaxed">
          <h2 className="font-heading text-2xl text-[#F3EFE3]">
            The Legend of Swayambhu Serpent Stone
          </h2>
          <p>
            Legend recounts that several centuries ago, local agriculturalists clearing the dense bamboo thickets in Mevakkatu struck a stone with a sickle, which immediately bled sacred white milk. Frightened and awestruck, the village elders summoned learned Vedic Tantris who conducted a Devaprashnam.
          </p>
          <p>
            The Prashnam revealed the divine presence of Lord Nagaraja accompanied by Nagayakshi. The land was immediately consecrated as a inviolable Sarpa Kavu, where no trees were to be felled or flora disturbed.
          </p>
        </div>
      </Card>

      {/* Timeline Milestones */}
      <div className="space-y-8">
        <h3 className="font-heading text-2xl text-[#F3EFE3] text-center">
          Historical Timeline
        </h3>
        
        <div className="space-y-6">
          <div className="p-6 bg-[#18261F] border border-[#2A3A33] rounded-2xl flex flex-col sm:flex-row gap-4 items-start">
            <span className="px-3 py-1 bg-[#0F1B16] border border-[#C6A15B] text-[#C6A15B] font-bold text-sm rounded-lg shrink-0">
              16th Century
            </span>
            <div>
              <h4 className="font-heading text-lg text-[#F3EFE3]">Discovery & Sarpa Kavu Consecration</h4>
              <p className="text-sm text-[#C4C0B4] mt-1">The Swayambhu idol was enshrined in the center of the grove with traditional granite Chithrakootam structures.</p>
            </div>
          </div>

          <div className="p-6 bg-[#18261F] border border-[#2A3A33] rounded-2xl flex flex-col sm:flex-row gap-4 items-start">
            <span className="px-3 py-1 bg-[#0F1B16] border border-[#C6A15B] text-[#C6A15B] font-bold text-sm rounded-lg shrink-0">
              19th Century
            </span>
            <div>
              <h4 className="font-heading text-lg text-[#F3EFE3]">Expansion of Noorum Palum Rituals</h4>
              <p className="text-sm text-[#C4C0B4] mt-1">Royal patronage enabled monthly Ayilyam rituals, drawing devotees seeking healing and lineage blessings.</p>
            </div>
          </div>

          <div className="p-6 bg-[#18261F] border border-[#2A3A33] rounded-2xl flex flex-col sm:flex-row gap-4 items-start">
            <span className="px-3 py-1 bg-[#0F1B16] border border-[#C6A15B] text-[#C6A15B] font-bold text-sm rounded-lg shrink-0">
              Modern Era
            </span>
            <div>
              <h4 className="font-heading text-lg text-[#F3EFE3]">Trust Governance & Digital Services</h4>
              <p className="text-sm text-[#C4C0B4] mt-1">Formation of the official Temple Trust to manage ecological protection, daily Annadanam, and online pooja offerings.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="text-center pt-6 border-t border-[#2A3A33]">
        <Link href="/events">
          <Button variant="primary" size="md" icon={Calendar}>
            Explore Temple Festivals
          </Button>
        </Link>
      </div>
    </div>
  );
}
