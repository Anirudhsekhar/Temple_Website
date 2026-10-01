'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function FestivalsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setEvents(data.events || []);
        }
      } catch (err) {
        console.error('Festivals fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-6xl mx-auto space-y-12 text-[#D8D5C8]">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
          Festivals & Sacred Celebrations
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F7F2E7] tracking-[0.03em]">
          Temple Festivals & Annual Rites
        </h1>
        <p className="font-body text-base text-[#D8D5C8] leading-relaxed">
          Stay informed about upcoming Maha Ayilyam Mahotsavam, Sarpa Bali ceremonies, Noorum Palum offerings, and special seasonal celebrations.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-[#4F7A4D]">Loading temple festival calendar...</div>
      ) : (
        <div className="space-y-8">
          {events.map((event) => {
            const isExpanded = expandedEvent === event.id;
            return (
              <Card key={event.id} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-5 relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#5E645A]">
                    <Image
                      src={event.image || "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#0D1A12]/90 text-xs font-semibold text-[#9B7A41] border border-[#5E645A]">
                      {event.category || 'Festival'}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#4F7A4D]">
                      <span className="flex items-center gap-1.5 bg-[#0D1A12] px-3 py-1 rounded-lg border border-[#5E645A] text-[#9B7A41] font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#D8D5C8]">
                        <Clock className="w-3.5 h-3.5 text-[#9B7A41]" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#D8D5C8]">
                        <MapPin className="w-3.5 h-3.5 text-[#9B7A41]" />
                        {event.location || 'Temple Sanctum'}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl sm:text-3xl text-[#F7F2E7]">
                      {event.title}
                    </h2>

                    <p className="text-sm text-[#D8D5C8] leading-relaxed">
                      {event.description}
                    </p>

                    {event.schedule && event.schedule.length > 0 && (
                      <div className="pt-2">
                        <button
                          onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-[#9B7A41] hover:underline"
                        >
                          <span>{isExpanded ? 'Hide Program Timetable' : 'View Program Timetable'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-4 p-4 rounded-xl bg-[#0D1A12] border border-[#5E645A] space-y-2 text-xs">
                            <h4 className="font-semibold text-[#F7F2E7] uppercase tracking-wider mb-2">Detailed Schedule</h4>
                            {event.schedule.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-[#D8D5C8]">
                                <Sparkles className="w-3 h-3 text-[#9B7A41] shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

