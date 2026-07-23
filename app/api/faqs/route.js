import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export async function GET() {
  const faqs = getSection('faqs') || [];
  return NextResponse.json({ success: true, faqs });
}

export async function POST(request) {
  try {
    const newFaq = await request.json();
    const faqs = getSection('faqs') || [];
    newFaq.id = 'faq-' + Date.now();
    faqs.push(newFaq);
    updateSection('faqs', faqs);
    return NextResponse.json({ success: true, faq: newFaq });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedFaq = await request.json();
    let faqs = getSection('faqs') || [];
    faqs = faqs.map(f => f.id === updatedFaq.id ? updatedFaq : f);
    updateSection('faqs', faqs);
    return NextResponse.json({ success: true, message: 'FAQ updated' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let faqs = getSection('faqs') || [];
    faqs = faqs.filter(f => f.id !== id);
    updateSection('faqs', faqs);
    return NextResponse.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
