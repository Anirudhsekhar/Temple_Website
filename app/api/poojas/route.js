import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export async function GET() {
  const poojas = getSection('poojas') || [];
  const bookings = getSection('bookings') || [];
  return NextResponse.json({ success: true, poojas, bookings });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Check if this is a booking action vs adding a new pooja
    if (body.action === 'book') {
      const bookings = getSection('bookings') || [];
      const bookingId = 'book-' + Date.now();
      const receiptId = 'REC-POOJA-' + Math.floor(100000 + Math.random() * 900000);
      const paymentId = 'PAY-SIM-' + Math.floor(100000 + Math.random() * 900000);

      const newBooking = {
        id: bookingId,
        devoteeName: body.devoteeName,
        star: body.star,
        poojaId: body.poojaId,
        poojaName: body.poojaName,
        date: body.date,
        amount: body.amount,
        paymentId,
        receiptId,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      bookings.unshift(newBooking);
      updateSection('bookings', bookings);

      return NextResponse.json({
        success: true,
        booking: newBooking,
        message: 'Pooja booked successfully'
      });
    }

    // Otherwise, adding a new Pooja (Admin action)
    const poojas = getSection('poojas') || [];
    const newPooja = {
      ...body,
      id: 'p-' + Date.now()
    };
    poojas.push(newPooja);
    updateSection('poojas', poojas);
    return NextResponse.json({ success: true, pooja: newPooja });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedPooja = await request.json();
    let poojas = getSection('poojas') || [];
    poojas = poojas.map(p => p.id === updatedPooja.id ? updatedPooja : p);
    updateSection('poojas', poojas);
    return NextResponse.json({ success: true, message: 'Pooja updated successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let poojas = getSection('poojas') || [];
    poojas = poojas.filter(p => p.id !== id);
    updateSection('poojas', poojas);
    return NextResponse.json({ success: true, message: 'Pooja deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
