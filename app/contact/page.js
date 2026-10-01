'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ShieldAlert, ShieldCheck, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function ContactPage() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/content', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setSettings(data.settings || {});
        }
      } catch (err) {
        console.error('Settings fetch error:', err);
      }
    }
    fetchSettings();
  }, []);

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-12 text-[#D8D5C8]">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
          Devotee Guidance & Reach
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F7F2E7] tracking-[0.03em]">
          Contact & Location Details
        </h1>
        <p className="font-body text-base text-[#D8D5C8] leading-relaxed">
          Official contact details, emergency helpline, visitor guidelines, and Google Maps location for Mevakkatu Shree Nagaraja Kshetram.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Details Card */}
        <Card className="p-8 space-y-6">
          <h2 className="font-heading text-2xl text-[#F7F2E7] border-b border-[#5E645A] pb-3">
            Temple Administration Office
          </h2>
          
          <div className="space-y-4 text-sm text-[#D8D5C8]">
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-[#9B7A41] shrink-0 mt-1" />
              <div>
                <span className="text-xs text-[#5E645A] block uppercase font-semibold">Address</span>
                <span className="text-[#F7F2E7] font-medium">{settings.address || 'Mevakkatu, Near Sacred Serpent Grove, Kerala 695001, India'}</span>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-5 h-5 text-[#9B7A41] shrink-0 mt-1" />
              <div>
                <span className="text-xs text-[#5E645A] block uppercase font-semibold">Temple Office Phone</span>
                <a href={`tel:${settings.contactPhone || '+914712345678'}`} className="text-[#F7F2E7] hover:text-[#9B7A41] font-medium">
                  {settings.contactPhone || '+91 471 234 5678'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-[#9B7A41] shrink-0 mt-1" />
              <div>
                <span className="text-xs text-[#5E645A] block uppercase font-semibold">Official Email</span>
                <a href={`mailto:${settings.contactEmail || 'info@mevakkatusheenagaraja.org'}`} className="text-[#F7F2E7] hover:text-[#9B7A41] font-medium">
                  {settings.contactEmail || 'info@mevakkatusheenagaraja.org'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Clock className="w-5 h-5 text-[#9B7A41] shrink-0 mt-1" />
              <div>
                <span className="text-xs text-[#5E645A] block uppercase font-semibold">Darshan Hours</span>
                <span className="text-[#F7F2E7] font-medium">{settings.openingHours || 'Morning: 05:00 AM - 11:30 AM | Evening: 05:00 PM - 07:30 PM'}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0D1A12] border border-[#9B7A41]/50 rounded-xl text-xs text-[#F7F2E7] flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-[#9B7A41] shrink-0" />
            <div>
              <span className="text-[#9B7A41] font-bold block uppercase">24x7 Emergency Helpline</span>
              <span>{settings.emergencyPhone || '+91 984 701 2345'}</span>
            </div>
          </div>
        </Card>

        {/* Visitor Rules & Map */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="font-heading text-xl text-[#F7F2E7] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#9B7A41]" />
              Visitor Guidelines
            </h3>
            <div className="space-y-3 text-xs text-[#D8D5C8]">
              <div>
                <strong className="text-[#F7F2E7] block mb-1">Dress Code:</strong>
                <p>{settings.dressCode || 'Traditional Dhoti/Mundu for Gents. Traditional Saree, Set Mundu, or Salwar for Ladies.'}</p>
              </div>
              <div>
                <strong className="text-[#F7F2E7] block mb-1">Parking Facility:</strong>
                <p>{settings.parking || 'Ample vehicle parking available in the outer temple grounds.'}</p>
              </div>
              <div>
                <strong className="text-[#F7F2E7] block mb-1">Photography Policy:</strong>
                <p>{settings.photographyPolicy || 'Strictly forbidden inside inner sanctum and Sarpa Kavu.'}</p>
              </div>
            </div>
          </Card>

          {/* Google Maps Location */}
          <div className="relative h-64 w-full rounded-[20px] overflow-hidden border border-[#5E645A]">
            <iframe
              src={settings.mapsUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15782.78453412586!2d76.94!3d8.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzEnMTIuMCJOIDc2wrA1Nic0OC4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.85) invert(0.9) contrast(1.2)' }}
              allowFullScreen=""
              loading="lazy"
              title="Temple Location Map"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

