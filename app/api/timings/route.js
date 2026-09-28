import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const timings = await getSection('timings') || [];
  return NextResponse.json({ success: true, timings });
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const success = await updateSection('timings', body);
    if (success) {
      return NextResponse.json({ success: true, message: 'Timings updated successfully' });
    }
    return NextResponse.json({ success: false, message: 'Failed to update timings' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

