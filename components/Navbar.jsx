'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Calendar, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import GlobalSearch from '@/components/GlobalSearch';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/history', label: 'History' },
  { href: '/events', label: 'Festivals' },
  { href: '/poojas', label: 'Poojas' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/donations', label: 'Donations' },
  { href: '/contact', label: 'Contact' },
  { href: '/faqs', label: 'FAQs' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0F1B16]/95 backdrop-blur-md border-b border-[#2A3A33] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo / Temple Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#18261F] border border-[#2A3A33] group-hover:border-[#C6A15B] flex items-center justify-center transition-colors">
              <Sparkles className="w-5 h-5 text-[#C6A15B]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl text-[#F3EFE3] tracking-[0.03em] group-hover:text-[#C6A15B] transition-colors">
                Mevakkatu Shree Nagaraja
              </span>
              <span className="text-[10px] font-body uppercase tracking-[0.15em] text-[#8FA98B]">
                Kshetram • Kerala
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#C6A15B] ${
                    isActive ? 'text-[#C6A15B] font-semibold' : 'text-[#C4C0B4]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-[#C4C0B4] hover:text-[#C6A15B] hover:bg-[#18261F] rounded-xl border border-transparent hover:border-[#2A3A33] transition-all"
              aria-label="Open search modal"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/poojas" className="hidden sm:block">
              <Button variant="primary" size="sm" icon={Calendar}>
                Book Pooja
              </Button>
            </Link>

            <Link href="/admin" className="hidden sm:inline-block text-xs font-semibold text-[#8FA98B] hover:text-[#C6A15B] px-3 py-2 border border-[#2A3A33] rounded-lg hover:border-[#C6A15B] transition-colors">
              Admin CMS
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 text-[#F3EFE3] hover:bg-[#18261F] rounded-xl border border-[#2A3A33]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#18261F] border-b border-[#2A3A33] px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base py-2 px-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'bg-[#0F1B16] text-[#C6A15B] font-semibold border border-[#2A3A33]'
                      : 'text-[#C4C0B4] hover:text-[#F3EFE3] hover:bg-[#0F1B16]/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-[#2A3A33] flex flex-col gap-3">
              <Link href="/poojas" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full" icon={Calendar}>
                  Book Pooja Online
                </Button>
              </Link>
              <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-center text-sm font-semibold text-[#8FA98B] hover:text-[#C6A15B] py-2.5 border border-[#2A3A33] rounded-xl">
                Admin Dashboard Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Component */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
