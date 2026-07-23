'use client';
import React, { useState } from 'react';
import { Heart, CreditCard, ShieldCheck, Loader2, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ReceiptModal from '@/components/ReceiptModal';

export default function DonationsPage() {
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [purpose, setPurpose] = useState('Sarpa Kavu Ecological Conservation');
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [receiptOpen, setReceiptOpen] = useState(false);

  const predefinedAmounts = [500, 1000, 2500, 5000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!donorName.trim() || !email.trim() || !finalAmount) return;

    setLoading(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          email,
          amount: finalAmount,
          frequency,
          purpose
        })
      });

      const data = await res.json();
      if (data.success) {
        setReceiptData(data.donation);
        setReceiptOpen(true);
      }
    } catch (err) {
      console.error('Donation submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const currentTotal = customAmount ? Number(customAmount) : amount;

  return (
    <div className="py-16 px-5 sm:px-8 lg:px-12 max-w-5xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C6A15B]">
          Divine Support
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl text-[#F3EFE3] tracking-[0.03em]">
          Online Temple Donation & Seva
        </h1>
        <p className="font-body text-base text-[#C4C0B4] leading-relaxed">
          Support ancient Sarpa Kavu rainforest preservation, daily free meal distribution (Annadanam), and traditional temple restoration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Donation Form */}
        <Card className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Frequency Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
                Donation Frequency
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFrequency('one-time')}
                  className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                    frequency === 'one-time'
                      ? 'bg-[#C6A15B] text-[#0F1B16] border-[#C6A15B]'
                      : 'bg-[#0F1B16] text-[#C4C0B4] border-[#2A3A33]'
                  }`}
                >
                  One-Time Offering
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                    frequency === 'monthly'
                      ? 'bg-[#C6A15B] text-[#0F1B16] border-[#C6A15B]'
                      : 'bg-[#0F1B16] text-[#C4C0B4] border-[#2A3A33]'
                  }`}
                >
                  Recurring Monthly Seva
                </button>
              </div>
            </div>

            {/* Purpose */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
                Select Contribution Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B]"
              >
                <option value="Sarpa Kavu Ecological Conservation">Sarpa Kavu Ecological Conservation</option>
                <option value="Daily Prasada Annadanam">Daily Prasada Annadanam</option>
                <option value="Temple Restoration & Renovation">Temple Restoration & Renovation</option>
                <option value="General Temple Upkeep">General Temple Upkeep</option>
              </select>
            </div>

            {/* Amount Buttons */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
                Select Amount (INR)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setAmount(amt); setCustomAmount(''); }}
                    className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      amount === amt && !customAmount
                        ? 'bg-[#23452F] text-[#C6A15B] border-[#C6A15B]'
                        : 'bg-[#0F1B16] text-[#F3EFE3] border-[#2A3A33]'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Or enter custom amount (₹)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] placeholder-[#6D7B71] focus:outline-none focus:border-[#C6A15B]"
              />
            </div>

            {/* Devotee Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Devotee Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-3 text-sm text-[#F3EFE3] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#C4C0B4]">
                  Email Address *
                </label>
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={loading || !donorName || !email || !currentTotal}
              icon={loading ? Loader2 : Heart}
            >
              {loading ? 'Processing Offering...' : `Donate ₹${currentTotal || 0} Online`}
            </Button>
          </form>
        </Card>

        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-4">
            <h3 className="font-heading text-xl text-[#F3EFE3]">Why Your Contribution Matters</h3>
            <p className="text-sm text-[#C4C0B4] leading-relaxed">
              Mevakkatu Shree Nagaraja Kshetram Trust relies entirely on voluntary offerings to protect the ancient Sarpa Kavu rainforest, perform traditional Tantric rites, and serve hot meals to pilgrims.
            </p>
            <div className="pt-2 border-t border-[#2A3A33] space-y-3 text-xs text-[#8FA98B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                <span>Automated 80G Tax Exemption Digital Receipt</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#C6A15B]" />
                <span>100% Encrypted Payment Security</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Donation Receipt Modal */}
      <ReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        receiptData={receiptData}
      />
    </div>
  );
}
