'use client';
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldAlert, Loader2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [settings, setSettings] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/content');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
          Reach Temple Administration
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3] tracking-[0.03em]">
          Contact & Location Info
        </h1>
        <p className="font-body text-base text-[#C4C0B4] leading-relaxed">
          We welcome inquiries regarding pooja dates, festival arrangements, and pilgrim guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Form */}
        <Card className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <h2 className="font-heading text-2xl text-[#F3EFE3]">Send a Message</h2>

          {submitted && (
            <div className="p-4 bg-[#23452F] border border-[#4F8A5B] rounded-xl text-sm text-[#F3EFE3] flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#4F8A5B] shrink-0" />
              <span>Thank you. Your message has been sent to temple office.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 Mobile No"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Ayilyam Pooja Query"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">Message *</label>
              <textarea
                required
                rows={5}
                placeholder="Write your inquiry here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading || !name || !email || !message}
              icon={loading ? Loader2 : Send}
            >
              {loading ? 'Sending Message...' : 'Submit Message'}
            </Button>
          </form>
        </Card>

        {/* Contact Info & Google Map */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-4">
            <h3 className="font-heading text-xl text-[#F3EFE3]">Temple Office</h3>
            
            <div className="space-y-3 text-sm text-[#C4C0B4]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
                <span>{settings.address || 'Mevakkatu, Near Sacred Serpent Grove, Kerala 695001, India'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C6A15B] shrink-0" />
                <a href={`tel:${settings.contactPhone || '+914712345678'}`} className="hover:text-[#C6A15B]">
                  {settings.contactPhone || '+91 471 234 5678'}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C6A15B] shrink-0" />
                <a href={`mailto:${settings.contactEmail || 'info@mevakkatusheenagaraja.org'}`} className="hover:text-[#C6A15B]">
                  {settings.contactEmail || 'info@mevakkatusheenagaraja.org'}
                </a>
              </div>
            </div>

            <div className="p-3 bg-[#0F1B16] border border-[#D88A2D]/40 rounded-xl text-xs text-[#D88A2D] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Emergency Helpline: <strong>{settings.emergencyPhone || '+91 984 701 2345'}</strong></span>
            </div>
          </Card>

          {/* Embedded Google Map */}
          <div className="relative h-64 w-full rounded-[20px] overflow-hidden border border-[#2A3A33]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15782.78453412586!2d76.94!3d8.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzEnMTIuMCJOIDc2wrA1Nic0OC4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) invert(0.9) contrast(1.2)' }}
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
