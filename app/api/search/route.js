import { NextResponse } from 'next/server';
import { getTempleData } from '@/lib/dataStore';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ success: true, results: [] });
  }

  const data = getTempleData();
  if (!data) {
    return NextResponse.json({ success: true, results: [] });
  }

  const results = [];

  // 1. Timings
  (data.timings || []).forEach(item => {
    if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)) {
      results.push({
        type: 'Timing / Ritual',
        title: item.name,
        subtitle: item.time,
        description: item.description,
        link: '/#daily-rituals'
      });
    }
  });

  // 2. Events & Festivals
  (data.events || []).forEach(item => {
    if (item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)) {
      results.push({
        type: 'Festival / Event',
        title: item.title,
        subtitle: `${item.date} (${item.category})`,
        description: item.description,
        link: '/events'
      });
    }
  });

  // 3. Poojas
  (data.poojas || []).forEach(item => {
    if (item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)) {
      results.push({
        type: 'Pooja Offering',
        title: item.name,
        subtitle: `₹${item.price} - ${item.timing}`,
        description: item.description,
        link: '/poojas'
      });
    }
  });

  // 4. FAQs
  (data.faqs || []).forEach(item => {
    if (item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)) {
      results.push({
        type: 'FAQ',
        title: item.question,
        subtitle: item.category,
        description: item.answer,
        link: '/faqs'
      });
    }
  });

  // 5. General Pages / History
  const staticPages = [
    { title: 'Temple History & Heritage', subtitle: 'Ancient Sarpa Kavu roots', description: 'Learn about the centuries-old history of Mevakkatu Shree Nagaraja Kshetram.', link: '/history' },
    { title: 'Sacred Grove (Sarpa Kavu)', subtitle: 'Serpentine Flora & Divine Sanctity', description: 'Explore the preserved natural serpent grove and ecological sanctuary.', link: '/about' },
    { title: 'Online Donations & Seva', subtitle: 'Support temple upkeep and Annadanam', description: 'Contribute towards daily rituals, temple maintenance, and Sarpa Kavu protection.', link: '/donations' },
    { title: 'Visitor Guidelines & Timings', subtitle: 'Dress code, parking & rules', description: 'Essential visitor rules, dress code, parking info, and contact details.', link: '/contact' }
  ];

  staticPages.forEach(page => {
    if (page.title.toLowerCase().includes(q) || page.description.toLowerCase().includes(q)) {
      results.push({
        type: 'Page Info',
        title: page.title,
        subtitle: page.subtitle,
        description: page.description,
        link: page.link
      });
    }
  });

  return NextResponse.json({ success: true, query: q, results });
}
