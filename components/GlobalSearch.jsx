'use client';
import React, { useState, useEffect } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Modal from '@/components/ui/Modal';

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        if (data.success) {
          setResults(data.results);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search Temple Services & Info" maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B7A41]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search poojas, rituals, festivals, history, timings..."
            className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl pl-12 pr-10 py-3.5 text-[#F7F2E7] placeholder-[#5E645A] focus:outline-none focus:border-[#9B7A41] transition-colors"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5E645A] hover:text-[#F7F2E7]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center justify-center py-8 text-[#9B7A41]">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span className="text-sm">Searching temple records...</span>
          </div>
        )}

        {/* Results List */}
        {!loading && query && results.length === 0 && (
          <div className="text-center py-8 text-[#5E645A]">
            No matching results found for "{query}". Try searching for "Noorum Palum", "Ayilyam", "Timings", or "History".
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-2">
            {results.map((res, idx) => (
              <Link
                key={idx}
                href={res.link}
                onClick={onClose}
                className="block p-4 rounded-xl bg-[#0D1A12]/80 border border-[#5E645A] hover:border-[#9B7A41] hover:bg-[#0D1A12] transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#9B7A41] mb-1">
                      {res.type}
                    </span>
                    <h4 className="font-heading text-lg text-[#F7F2E7] group-hover:text-[#9B7A41] transition-colors">
                      {res.title}
                    </h4>
                    {res.subtitle && (
                      <p className="text-xs text-[#4F7A4D] mt-0.5">{res.subtitle}</p>
                    )}
                    <p className="text-sm text-[#D8D5C8] mt-2 line-clamp-2">
                      {res.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#5E645A] group-hover:text-[#9B7A41] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {!query && (
          <div className="py-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#5E645A] mb-3">
              Popular Searches
            </h5>
            <div className="flex flex-wrap gap-2">
              {['Noorum Palum', 'Ayilyam Mahotsavam', 'Sarpa Kavu', 'Daily Timings', 'Pooja Rate List', 'Dress Code', 'Contact Details'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 rounded-lg bg-[#0D1A12] border border-[#5E645A] text-sm text-[#D8D5C8] hover:text-[#9B7A41] hover:border-[#9B7A41] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
