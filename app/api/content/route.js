import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export async function GET() {
  const settings = getSection('settings');
  return NextResponse.json({ success: true, settings });
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const success = updateSection('settings', body);
    if (success) {
      return NextResponse.json({ success: true, message: 'Settings updated successfully' });
    }
    return NextResponse.json({ success: false, message: 'Failed to update settings' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
