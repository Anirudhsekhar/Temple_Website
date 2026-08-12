'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, Calendar } from 'lucide-react';
import Button from '@/components/ui/Button';
import GlobalSearch from '@/components/GlobalSearch';
import NagaLogo from '@/components/NagaLogo';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/festivals', label: 'Festivals' },
  { href: '/poojas', label: 'Poojas' },
  { href: '/donations', label: 'Donations' },
  { href: '/contact', label: 'Contact' },
  { href: '/faqs', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0D1A12]/95 backdrop-blur-md border-b border-[#5E645A]/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo / Temple Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#233728] border border-[#5E645A] group-hover:border-[#9B7A41] flex items-center justify-center transition-colors">
              <NagaLogo className="w-6 h-6" color="#9B7A41" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg sm:text-xl text-[#F7F2E7] tracking-[0.03em] group-hover:text-[#9B7A41] transition-colors">
                Mevakkatu Shree Nagaraja
              </span>
              <span className="text-[10px] font-body uppercase tracking-[0.18em] text-[#4F7A4D]">
                Sacred Serpent Grove • Kerala
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-[#9B7A41] ${
                    isActive ? 'text-[#9B7A41] font-semibold border-b-2 border-[#9B7A41] pb-1' : 'text-[#D8D5C8]'
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
              className="p-2.5 text-[#D8D5C8] hover:text-[#9B7A41] hover:bg-[#233728] rounded-xl border border-transparent hover:border-[#5E645A] transition-all"
              aria-label="Open search modal"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link href="/poojas" className="hidden sm:block">
              <Button variant="primary" size="sm" icon={Calendar}>
                Book Pooja
              </Button>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-[#F7F2E7] hover:bg-[#233728] rounded-xl border border-[#5E645A]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#233728] border-b border-[#5E645A] px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base py-2 px-3 rounded-lg transition-colors ${
                    pathname === link.href
                      ? 'bg-[#0D1A12] text-[#9B7A41] font-semibold border border-[#5E645A]'
                      : 'text-[#D8D5C8] hover:text-[#F7F2E7] hover:bg-[#0D1A12]/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-[#5E645A] flex flex-col gap-3">
              <Link href="/poojas" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full" icon={Calendar}>
                  Book Pooja Online
                </Button>
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
