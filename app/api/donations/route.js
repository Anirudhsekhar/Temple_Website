import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export async function GET() {
  const donations = getSection('donations') || [];
  return NextResponse.json({ success: true, donations });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const donations = getSection('donations') || [];
    const receiptId = 'REC-DON-' + Math.floor(100000 + Math.random() * 900000);

    const newDonation = {
      id: 'don-' + Date.now(),
      donorName: body.donorName,
      email: body.email,
      amount: Number(body.amount),
      frequency: body.frequency || 'one-time',
      purpose: body.purpose || 'General Temple Maintenance',
      receiptId,
      createdAt: new Date().toISOString()
    };

    donations.unshift(newDonation);
    updateSection('donations', donations);

    return NextResponse.json({
      success: true,
      donation: newDonation,
      message: 'Donation processed successfully'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
