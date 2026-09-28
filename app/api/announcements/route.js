import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const announcements = await getSection('announcements') || [];
  return NextResponse.json({ success: true, announcements });
}

export async function POST(request) {
  try {
    const item = await request.json();
    const announcements = await getSection('announcements') || [];
    item.id = 'ann-' + Date.now();
    announcements.unshift(item);
    await updateSection('announcements', announcements);
    return NextResponse.json({ success: true, item });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedItem = await request.json();
    let announcements = await getSection('announcements') || [];
    announcements = announcements.map(a => a.id === updatedItem.id ? updatedItem : a);
    await updateSection('announcements', announcements);
    return NextResponse.json({ success: true, message: 'Announcement updated' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let announcements = await getSection('announcements') || [];
    announcements = announcements.filter(a => a.id !== id);
    await updateSection('announcements', announcements);
    return NextResponse.json({ success: true, message: 'Announcement deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

