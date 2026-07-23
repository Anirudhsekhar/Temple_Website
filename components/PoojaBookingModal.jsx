'use client';
import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Loader2, CreditCard, Sparkles } from 'lucide-react';
import ReceiptModal from '@/components/ReceiptModal';

const NAKSHATRAS = [
  "Ashwathi", "Bharani", "Karthika", "Rohini", "Makayiram", "Thiruvathira",
  "Punartham", "Pooyyam", "Ayilyam", "Makam", "Pooram", "Uthram", "Atham",
  "Chithira", "Chothi", "Visakam", "Anizham", "Ketta", "Moolam", "Pooradam",
  "Uthradam", "Thiruvonam", "Avittom", "Chathayam", "Poororuttathi", "Uthrattathi", "Revathi"
];

export default function PoojaBookingModal({ isOpen, onClose, selectedPooja }) {
  const [devoteeName, setDevoteeName] = useState('');
  const [star, setStar] = useState(NAKSHATRAS[8]); // Default Ayilyam
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!devoteeName.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/poojas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'book',
          devoteeName,
          star,
          date,
          poojaId: selectedPooja ? selectedPooja.id : 'p-1',
          poojaName: selectedPooja ? selectedPooja.name : 'Special Noorum Palum',
          amount: selectedPooja ? selectedPooja.price : 350
        })
      });

      const data = await res.json();
      if (data.success) {
        setReceiptData(data.booking);
        onClose();
        setReceiptOpen(true);
      }
    } catch (err) {
      console.error('Booking failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Book Pooja Offering" maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Selected Pooja Summary Card */}
          {selectedPooja && (
            <div className="bg-[#0F1B16] border border-[#2A3A33] rounded-xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8FA98B] font-medium block">Selected Offering</span>
                <h4 className="font-heading text-lg text-[#F3EFE3]">{selectedPooja.name}</h4>
                <p className="text-xs text-[#6D7B71]">{selectedPooja.timing}</p>
              </div>
              <div className="text-right">
                <span className="font-heading text-xl text-[#C6A15B]">₹{selectedPooja.price}</span>
              </div>
            </div>
          )}

          {/* Devotee Name */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
              Devotee Full Name *
            </label>
            <input
              type="text"
              required
              value={devoteeName}
              onChange={(e) => setDevoteeName(e.target.value)}
              placeholder="e.g. Ananthakrishnan Nair"
              className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-[#F3EFE3] placeholder-[#6D7B71] focus:outline-none focus:border-[#C6A15B] transition-colors"
            />
          </div>

          {/* Nakshatra / Star */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
              Birth Star (Nakshatra) *
            </label>
            <select
              value={star}
              onChange={(e) => setStar(e.target.value)}
              className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B] transition-colors cursor-pointer"
            >
              {NAKSHATRAS.map((s) => (
                <option key={s} value={s} className="bg-[#0F1B16] text-[#F3EFE3]">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
              Preferred Pooja Date *
            </label>
            <input
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B] transition-colors"
            />
          </div>

          {/* Payment Gateway Note */}
          <div className="p-3 bg-[#23452F]/40 border border-[#2A3A33] rounded-xl flex items-center gap-3 text-xs text-[#8FA98B]">
            <CreditCard className="w-5 h-5 text-[#C6A15B] shrink-0" />
            <span>Secure Online Gateway integration (UPI, Netbanking, Cards). Instant receipt generated upon payment.</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading || !devoteeName.trim()}
              className="flex-1"
              icon={loading ? Loader2 : Sparkles}
            >
              {loading ? 'Processing Offering...' : `Proceed to Pay ₹${selectedPooja ? selectedPooja.price : 350}`}
            </Button>
            <Button variant="ghost" size="md" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Instant Digital Receipt Modal */}
      <ReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        receiptData={receiptData}
      />
    </>
  );
}
