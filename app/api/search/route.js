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

  const terms = q.split(/\s+/).filter(Boolean);
  const matches = (text = '') => {
    const lower = text.toLowerCase();
    return terms.some(t => lower.includes(t));
  };

  const results = [];

  // 1. Timings
  (data.timings || []).forEach(item => {
    if (matches(item.name) || matches(item.description) || matches(item.time)) {
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
    if (matches(item.title) || matches(item.description) || matches(item.category) || matches(item.location)) {
      results.push({
        type: 'Festival / Event',
        title: item.title,
        subtitle: `${item.date} (${item.category})`,
        description: item.description,
        link: '/festivals'
      });
    }
  });

  // 3. Poojas
  (data.poojas || []).forEach(item => {
    if (matches(item.name) || matches(item.description) || matches(item.category) || matches(item.timing)) {
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
    if (matches(item.question) || matches(item.answer) || matches(item.category)) {
      results.push({
        type: 'FAQ',
        title: item.question,
        subtitle: item.category || 'General FAQ',
        description: item.answer,
        link: '/faqs'
      });
    }
  });

  // 5. Announcements
  (data.announcements || []).filter(a => a.active).forEach(item => {
    if (matches(item.message) || matches(item.type)) {
      results.push({
        type: 'Announcement',
        title: 'Temple Announcement',
        subtitle: item.type || 'Notice',
        description: item.message,
        link: '/'
      });
    }
  });

  // 6. General Pages / History / Settings
  const staticPages = [
    { title: 'Temple Introduction & Philosophy', subtitle: 'About Mevakkatu Kshetram', description: 'Sacred grove tradition, Swayambhu serpent legend, and ecological conservation.', link: '/about' },
    { title: 'Temple History & Swayambhu Legend', subtitle: 'Centuries of heritage', description: 'Learn about the ancient origins of Mevakkatu Shree Nagaraja Kshetram.', link: '/about#history' },
    { title: 'Online Donations & Seva', subtitle: 'Support temple upkeep and Annadanam', description: 'Contribute towards daily rituals, temple maintenance, and Sarpa Kavu protection.', link: '/donations' },
    { title: 'Visitor Guidelines & Timings', subtitle: 'Dress code, parking & rules', description: `${data.settings?.dressCode || ''} ${data.settings?.parking || ''}`, link: '/contact' }
  ];

  staticPages.forEach(page => {
    if (matches(page.title) || matches(page.description) || matches(page.subtitle)) {
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
