import { NextResponse } from 'next/server';
import { getSection, updateSection } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const faqs = await getSection('faqs') || [];
  return NextResponse.json({ success: true, faqs });
}

export async function POST(request) {
  try {
    const newFaq = await request.json();
    const faqs = await getSection('faqs') || [];
    newFaq.id = 'faq-' + Date.now();
    faqs.push(newFaq);
    await updateSection('faqs', faqs);
    return NextResponse.json({ success: true, faq: newFaq });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const updatedFaq = await request.json();
    let faqs = await getSection('faqs') || [];
    faqs = faqs.map(f => f.id === updatedFaq.id ? updatedFaq : f);
    await updateSection('faqs', faqs);
    return NextResponse.json({ success: true, message: 'FAQ updated' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    let faqs = await getSection('faqs') || [];
    faqs = faqs.filter(f => f.id !== id);
    await updateSection('faqs', faqs);
    return NextResponse.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

