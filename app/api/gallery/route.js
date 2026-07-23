import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export async function GET() {
  const gallery = getSection('gallery') || [];
  return NextResponse.json({ success: true, gallery });
}

export async function POST(request) {
  try {
    const newItem = await request.json();
    const gallery = getSection('gallery') || [];
    newItem.id = 'g-' + Date.now();
    gallery.unshift(newItem);
    updateSection('gallery', gallery);
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let gallery = getSection('gallery') || [];
    gallery = gallery.filter(g => g.id !== id);
    updateSection('gallery', gallery);
    return NextResponse.json({ success: true, message: 'Gallery item removed' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
