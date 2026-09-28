import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const events = await getSection('events') || [];
  return NextResponse.json({ success: true, events });
}

export async function POST(request) {
  try {
    const newEvent = await request.json();
    const events = await getSection('events') || [];
    newEvent.id = 'ev-' + Date.now();
    events.push(newEvent);
    await updateSection('events', events);
    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedEvent = await request.json();
    let events = await getSection('events') || [];
    events = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
    await updateSection('events', events);
    return NextResponse.json({ success: true, message: 'Event updated' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let events = await getSection('events') || [];
    events = events.filter(e => e.id !== id);
    await updateSection('events', events);
    return NextResponse.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

