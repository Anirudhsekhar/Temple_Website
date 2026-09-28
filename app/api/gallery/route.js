import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const gallery = await getSection('gallery') || [];
  return NextResponse.json({ success: true, gallery });
}

export async function POST(request) {
  try {
    const newItem = await request.json();
    const gallery = await getSection('gallery') || [];
    newItem.id = 'gal-' + Date.now();
    gallery.push(newItem);
    await updateSection('gallery', gallery);
    return NextResponse.json({ success: true, gallery: newItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedItem = await request.json();
    let gallery = await getSection('gallery') || [];
    gallery = gallery.map(g => g.id === updatedItem.id ? updatedItem : g);
    await updateSection('gallery', gallery);
    return NextResponse.json({ success: true, message: 'Gallery updated' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let gallery = await getSection('gallery') || [];
    gallery = gallery.filter(g => g.id !== id);
    await updateSection('gallery', gallery);
    return NextResponse.json({ success: true, message: 'Gallery deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
