'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles, Phone, Mail, MapPin, Clock, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0F1B16] border-t border-[#2A3A33] text-[#C4C0B4] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-[#2A3A33]">
          
          {/* Col 1: Temple Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#18261F] border border-[#2A3A33] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C6A15B]" />
              </div>
              <h3 className="font-heading text-lg text-[#F3EFE3] tracking-[0.02em]">
                Mevakkatu Shree Nagaraja
              </h3>
            </div>
            <p className="text-sm text-[#C4C0B4] leading-relaxed">
              A ancient Kerala serpent temple surrounded by sacred groves (Sarpa Kavu), dedicated to peace, harmony, and ecological sanctity.
            </p>
            <div className="text-xs text-[#8FA98B] font-mono pt-2">
              Registration No: KST-KER-49210
            </div>
          </div>

          {/* Col 2: Darshan Timings */}
          <div className="space-y-4">
            <h4 className="font-heading text-base text-[#F3EFE3] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C6A15B]" />
              Darshan Timings
            </h4>
            <ul className="text-sm space-y-2 text-[#C4C0B4]">
              <li className="flex justify-between border-b border-[#2A3A33]/50 pb-1.5">
                <span>Morning Opening</span>
                <span className="text-[#F3EFE3] font-medium">05:00 AM - 11:30 AM</span>
              </li>
              <li className="flex justify-between border-b border-[#2A3A33]/50 pb-1.5">
                <span>Noorum Palum</span>
                <span className="text-[#C6A15B] font-medium">08:30 AM</span>
              </li>
              <li className="flex justify-between border-b border-[#2A3A33]/50 pb-1.5">
                <span>Evening Darshan</span>
                <span className="text-[#F3EFE3] font-medium">05:00 PM - 07:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Athazha Pooja</span>
                <span className="text-[#8FA98B] font-medium">07:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading text-base text-[#F3EFE3]">
              Quick Access
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#C6A15B] transition-colors">About Temple</Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-[#C6A15B] transition-colors">Temple History</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#C6A15B] transition-colors">Festivals</Link>
              </li>
              <li>
                <Link href="/poojas" className="hover:text-[#C6A15B] transition-colors">Pooja Booking</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#C6A15B] transition-colors">Media Gallery</Link>
              </li>
              <li>
                <Link href="/donations" className="hover:text-[#C6A15B] transition-colors">Online Donation</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C6A15B] transition-colors">Visitor Guidelines</Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-[#C6A15B] transition-colors">Devotee FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="font-heading text-base text-[#F3EFE3]">
              Temple Contact
            </h4>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-1" />
                <span>Mevakkatu, Near Serpent Grove, Thiruvananthapuram Region, Kerala, India</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <a href="tel:+914712345678" className="hover:text-[#C6A15B]">+91 471 234 5678</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <a href="mailto:info@mevakkatusheenagaraja.org" className="hover:text-[#C6A15B]">info@mevakkatusheenagaraja.org</a>
              </p>
              <div className="pt-2 text-xs text-[#D88A2D]">
                Emergency Helpline: +91 984 701 2345
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6D7B71] gap-4">
          <p>© {new Date().getFullYear()} Mevakkatu Shree Nagaraja Kshetram Trust. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-[#C4C0B4]">Privacy & Rules</Link>
            <Link href="/admin" className="hover:text-[#C6A15B]">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
