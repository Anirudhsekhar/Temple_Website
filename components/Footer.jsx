import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';
import NagaLogo from '@/components/NagaLogo';
import { getSection } from '@/lib/dataStore';

export default async function Footer() {
  const settings = await getSection('settings') || {};

  return (
    <footer className="bg-[#0D1A12] border-t border-[#5E645A]/50 text-[#D8D5C8] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-[#5E645A]/40">

          {/* Brand & Name */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#233728] border border-[#5E645A] flex items-center justify-center">
                <NagaLogo className="w-6 h-6" color="#9B7A41" />
              </div>
              <h3 className="font-heading text-lg text-[#F7F2E7]">
                {settings.templeName || 'Mevakkatu Shree Nagaraja Kshetram'}
              </h3>
            </div>
            <p className="text-xs text-[#D8D5C8]/80 leading-relaxed max-w-sm">
              {settings.heroSubtitle || 'An ancient sacred grove sanctuary dedicated to Nagaraja, Nagayakshi & divine ecological balance.'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-heading text-sm text-[#F7F2E7] uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <Link href="/about" className="hover:text-[#9B7A41] transition-colors">About</Link>
              <Link href="/events" className="hover:text-[#9B7A41] transition-colors">Festivals</Link>
              <Link href="/poojas" className="hover:text-[#9B7A41] transition-colors">Poojas</Link>
              <Link href="/donations" className="hover:text-[#9B7A41] transition-colors">Donations</Link>
              <Link href="/contact" className="hover:text-[#9B7A41] transition-colors">Contact</Link>
              <Link href="/faqs" className="hover:text-[#9B7A41] transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Contact Info & Social Icons */}
          <div className="space-y-3 text-xs">
            <h4 className="font-heading text-sm text-[#F7F2E7] uppercase tracking-wider">Contact</h4>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#9B7A41] shrink-0" />
              <span>{settings.address || 'Mevakkatu, Near Serpent Grove, Kerala 695001'}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#9B7A41] shrink-0" />
              <a href={`tel:${settings.contactPhone || '+914712345678'}`} className="hover:text-[#9B7A41]">{settings.contactPhone || '+91 471 234 5678'}</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#9B7A41] shrink-0" />
              <a href={`mailto:${settings.contactEmail || 'info@mevakkatusheenagaraja.org'}`} className="hover:text-[#9B7A41]">{settings.contactEmail || 'info@mevakkatusheenagaraja.org'}</a>
            </p>
          </div>
        </div>

        {/* Bottom Minimal Copyright & Admin Link */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5E645A] gap-4">
          <p>© {new Date().getFullYear()} {settings.templeName || 'Mevakkatu Shree Nagaraja Kshetram'}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-[#D8D5C8]">
              <Share2 className="w-3.5 h-3.5 text-[#9B7A41]" />
              <span className="text-[11px]">Follow Sacred Updates</span>
            </div>
            <Link href="/admin" className="text-[#9B7A41] hover:text-[#4F7A4D] font-medium border-b border-[#9B7A41]/40 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
