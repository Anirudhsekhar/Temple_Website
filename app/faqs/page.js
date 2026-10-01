'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch('/api/faqs', { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          setFaqs(data.faqs || []);
        }
      } catch (err) {
        console.error('FAQs fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-4xl mx-auto space-y-12 text-[#D8D5C8]">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7A41]">
          Devotee Guidance
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F7F2E7] tracking-[0.03em]">
          Frequently Asked Questions
        </h1>
        <p className="font-body text-base text-[#D8D5C8] leading-relaxed max-w-2xl mx-auto">
          Clear guidance regarding temple dress codes, Noorum Palum offerings, online booking, and visitor rules.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B7A41]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions..."
          className="w-full bg-[#233728] border border-[#5E645A] rounded-2xl pl-12 pr-4 py-3.5 text-base text-[#F7F2E7] placeholder-[#5E645A] focus:outline-none focus:border-[#9B7A41]"
        />
      </div>

      {/* Accordion FAQ List */}
      {loading ? (
        <div className="text-center py-12 text-[#4F7A4D]">Loading questions...</div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className="bg-[#233728] border border-[#5E645A] rounded-2xl overflow-hidden transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-heading text-lg text-[#F7F2E7] flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#9B7A41] shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#9B7A41] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#5E645A] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#D8D5C8] leading-relaxed border-t border-[#5E645A]/50">
                    <p>{faq.answer}</p>
                    {faq.category && (
                      <span className="inline-block mt-3 text-[10px] font-semibold uppercase tracking-wider text-[#4F7A4D] bg-[#0D1A12] px-2.5 py-1 rounded-md border border-[#5E645A]">
                        Category: {faq.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

