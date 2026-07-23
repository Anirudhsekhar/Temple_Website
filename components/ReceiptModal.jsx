'use client';
import React from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Printer, Download, CheckCircle, Sparkles } from 'lucide-react';

export default function ReceiptModal({ isOpen, onClose, receiptData }) {
  if (!receiptData) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Official Temple Receipt" maxWidth="max-w-xl">
      <div className="space-y-6" id="printable-receipt">
        {/* Success Header */}
        <div className="text-center pb-6 border-b border-[#2A3A33]">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4F8A5B]/20 text-[#4F8A5B] mb-3">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="font-heading text-xl text-[#F3EFE3]">
            Receipt Confirmed
          </h3>
          <p className="text-xs text-[#8FA98B] mt-1">
            May Shree Nagaraja & Nagayakshi bless you with divine grace and health.
          </p>
        </div>

        {/* Temple Branding Header */}
        <div className="bg-[#0F1B16] border border-[#2A3A33] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C6A15B]" />
            <div>
              <h4 className="font-heading text-sm text-[#F3EFE3]">Mevakkatu Shree Nagaraja Kshetram</h4>
              <p className="text-[11px] text-[#6D7B71]">Kerala • Official Digital Receipt</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#6D7B71] block">Receipt No</span>
            <span className="text-xs font-mono font-bold text-[#C6A15B]">{receiptData.receiptId}</span>
          </div>
        </div>

        {/* Receipt Details Grid */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-[#2A3A33]/50">
            <span className="text-[#6D7B71]">Devotee Name:</span>
            <span className="text-[#F3EFE3] font-semibold">{receiptData.devoteeName || receiptData.donorName}</span>
          </div>

          {receiptData.star && (
            <div className="flex justify-between py-2 border-b border-[#2A3A33]/50">
              <span className="text-[#6D7B71]">Birth Star (Nakshatra):</span>
              <span className="text-[#C6A15B] font-semibold">{receiptData.star}</span>
            </div>
          )}

          {receiptData.poojaName && (
            <div className="flex justify-between py-2 border-b border-[#2A3A33]/50">
              <span className="text-[#6D7B71]">Offering / Pooja:</span>
              <span className="text-[#F3EFE3] font-semibold">{receiptData.poojaName}</span>
            </div>
          )}

          {receiptData.purpose && (
            <div className="flex justify-between py-2 border-b border-[#2A3A33]/50">
              <span className="text-[#6D7B71]">Donation Purpose:</span>
              <span className="text-[#F3EFE3] font-semibold">{receiptData.purpose}</span>
            </div>
          )}

          <div className="flex justify-between py-2 border-b border-[#2A3A33]/50">
            <span className="text-[#6D7B71]">Date of Offering:</span>
            <span className="text-[#F3EFE3]">{receiptData.date || new Date(receiptData.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-[#2A3A33]/50">
            <span className="text-[#6D7B71]">Transaction ID:</span>
            <span className="text-[#8FA98B] font-mono text-xs">{receiptData.paymentId || 'TXN-ONLINE-SUCCESS'}</span>
          </div>

          <div className="flex justify-between items-center py-3 bg-[#0F1B16] rounded-xl px-4 mt-4">
            <span className="text-base font-medium text-[#F3EFE3]">Total Amount Paid:</span>
            <span className="text-xl font-heading font-bold text-[#C6A15B]">₹{receiptData.amount}</span>
          </div>
        </div>

        {/* Receipt Footer note */}
        <p className="text-[11px] text-[#6D7B71] text-center italic">
          This digital receipt is generated automatically by Mevakkatu Shree Nagaraja Kshetram Trust system. Present this receipt at the temple counter if collecting prasadam in person.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button variant="primary" size="md" className="flex-1" onClick={handlePrint} icon={Printer}>
            Print / Save PDF
          </Button>
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
