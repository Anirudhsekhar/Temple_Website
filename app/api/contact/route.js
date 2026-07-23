import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export async function GET() {
  const messages = getSection('messages') || [];
  return NextResponse.json({ success: true, messages });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const messages = getSection('messages') || [];

    const newMessage = {
      id: 'msg-' + Date.now(),
      name: body.name,
      email: body.email,
      phone: body.phone || '',
      subject: body.subject || 'General Inquiry',
      message: body.message,
      date: new Date().toISOString(),
      status: 'Unread'
    };

    messages.unshift(newMessage);
    updateSection('messages', messages);

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. Temple authority will reach out if required.'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
