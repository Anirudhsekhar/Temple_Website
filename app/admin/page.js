'use client';
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  LogOut,
  Calendar,
  Clock,
  Image as ImageIcon,
  Heart,
  MessageSquare,
  HelpCircle,
  Bell,
  Sliders,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle,
  Loader2,
  Sparkles
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AdminPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [authMethod, setAuthMethod] = useState('email'); // 'email' | 'otp' | 'google'
  const [emailInput, setEmailInput] = useState('admin@mevakkatusheenagaraja.org');
  const [passwordInput, setPasswordInput] = useState('admin123');
  const [phoneInput, setPhoneInput] = useState('+919847012345');
  const [otpInput, setOtpInput] = useState('123456');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Active CMS Tab
  const [activeTab, setActiveTab] = useState('settings');

  // CMS Data Stores
  const [data, setData] = useState({
    settings: {},
    timings: [],
    events: [],
    poojas: [],
    gallery: [],
    donations: [],
    messages: [],
    faqs: [],
    announcements: []
  });
  const [loadingData, setLoadingData] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: authMethod,
          email: emailInput,
          password: passwordInput,
          phone: phoneInput,
          otp: otpInput
        })
      });

      const resData = await res.json();
      if (resData.success) {
        setIsAuthenticated(true);
        setAdminUser(resData.user);
        loadAdminData();
      } else {
        setAuthError(resData.message || 'Authentication failed');
      }
    } catch (err) {
      setAuthError('Connection error during login');
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch all CMS records
  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [c, t, e, p, g, d, m, f, a] = await Promise.all([
        fetch('/api/content').then(r => r.json()),
        fetch('/api/timings').then(r => r.json()),
        fetch('/api/events').then(r => r.json()),
        fetch('/api/poojas').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json()),
        fetch('/api/donations').then(r => r.json()),
        fetch('/api/contact').then(r => r.json()),
        fetch('/api/faqs').then(r => r.json()),
        fetch('/api/announcements').then(r => r.json())
      ]);

      setData({
        settings: c.settings || {},
        timings: t.timings || [],
        events: e.events || [],
        poojas: p.poojas || [],
        gallery: g.gallery || [],
        donations: d.donations || [],
        messages: m.messages || [],
        faqs: f.faqs || [],
        announcements: a.announcements || []
      });
    } catch (err) {
      console.error('Failed loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  // Helper notice
  const notifySave = (msg) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(''), 3000);
  };

  // Handle Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.settings)
    });
    const result = await res.json();
    if (result.success) notifySave('Website Settings updated successfully');
  };

  // Add Item Generic Helper
  const handleAddItem = async (endpoint, payload, sectionKey) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    if (result.success) {
      notifySave(`New item added to ${sectionKey}`);
      loadAdminData();
    }
  };

  // Delete Item Generic Helper
  const handleDeleteItem = async (endpoint, id, sectionKey) => {
    const res = await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      notifySave(`Item deleted from ${sectionKey}`);
      loadAdminData();
    }
  };

  // If not authenticated, render Admin Login Modal/Portal
  if (!isAuthenticated) {
    return (
      <div className="py-20 px-5 sm:px-8 max-w-md mx-auto">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#0F1B16] border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl text-[#F3EFE3]">Admin Portal Login</h1>
            <p className="text-xs text-[#8FA98B]">Mevakkatu Shree Nagaraja Kshetram CMS</p>
          </div>

          {/* Auth Method Selector */}
          <div className="flex border-b border-[#2A3A33]">
            <button
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 text-xs font-semibold ${authMethod === 'email' ? 'text-[#C6A15B] border-b-2 border-[#C6A15B]' : 'text-[#6D7B71]'}`}
            >
              Email Login
            </button>
            <button
              onClick={() => setAuthMethod('otp')}
              className={`flex-1 py-2 text-xs font-semibold ${authMethod === 'otp' ? 'text-[#C6A15B] border-b-2 border-[#C6A15B]' : 'text-[#6D7B71]'}`}
            >
              Phone OTP
            </button>
            <button
              onClick={() => setAuthMethod('google')}
              className={`flex-1 py-2 text-xs font-semibold ${authMethod === 'google' ? 'text-[#C6A15B] border-b-2 border-[#C6A15B]' : 'text-[#6D7B71]'}`}
            >
              Google SSO
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-xs text-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {authMethod === 'email' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs text-[#C4C0B4]">Admin Email</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3] focus:border-[#C6A15B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#C4C0B4]">Password</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3] focus:border-[#C6A15B]"
                  />
                </div>
              </>
            )}

            {authMethod === 'otp' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs text-[#C4C0B4]">Admin Registered Phone</label>
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3] focus:border-[#C6A15B]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#C4C0B4]">Enter 6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3] focus:border-[#C6A15B]"
                  />
                </div>
              </>
            )}

            {authMethod === 'google' && (
              <div className="p-4 bg-[#0F1B16] rounded-xl border border-[#2A3A33] text-center text-xs text-[#C4C0B4] space-y-2">
                <p>Google Workspace Admin Authentication enabled.</p>
                <p className="text-[#8FA98B]">Click below to sign in with authorized Google email.</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={authLoading}
              icon={authLoading ? Loader2 : Lock}
            >
              {authLoading ? 'Verifying Credentials...' : 'Access Admin Dashboard'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Dashboard Navigation Tabs List
  const navTabs = [
    { id: 'settings', label: 'Website Settings', icon: Sliders },
    { id: 'timings', label: 'Daily Timings', icon: Clock },
    { id: 'events', label: 'Events & Festivals', icon: Calendar },
    { id: 'poojas', label: 'Poojas', icon: Sparkles },
    { id: 'gallery', label: 'Gallery Media', icon: ImageIcon },
    { id: 'donations', label: 'Donations Audit', icon: Heart },
    { id: 'messages', label: 'Devotee Messages', icon: MessageSquare },
    { id: 'faqs', label: 'Manage FAQs', icon: HelpCircle },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  return (
    <div className="py-10 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">
      
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#2A3A33]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C6A15B]">
            CMS Control Portal
          </span>
          <h1 className="font-heading text-3xl text-[#F3EFE3]">
            Mevakkatu Temple Admin
          </h1>
          <p className="text-xs text-[#8FA98B]">
            Logged in as: <strong className="text-[#F3EFE3]">{adminUser?.name || 'Administrator'}</strong> ({adminUser?.email || adminUser?.phone || 'admin'})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsAuthenticated(false)}
            icon={LogOut}
          >
            Logout
          </Button>
        </div>
      </div>

      {saveSuccessMessage && (
        <div className="p-4 bg-[#23452F] border border-[#4F8A5B] rounded-xl text-sm text-[#F3EFE3] flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#4F8A5B]" />
          <span>{saveSuccessMessage}</span>
        </div>
      )}

      {/* Main CMS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-1">
          {navTabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-[#C6A15B] text-[#0F1B16] font-bold shadow-gold'
                    : 'bg-[#18261F] text-[#C4C0B4] border border-[#2A3A33] hover:border-[#C6A15B] hover:text-[#F3EFE3]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* CMS Workspace Content */}
        <div className="lg:col-span-9">
          
          {/* TAB 1: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="font-heading text-2xl text-[#F3EFE3]">Homepage & General Settings</h2>
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#C4C0B4]">Temple Name</label>
                  <input
                    type="text"
                    value={data.settings.templeName || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, templeName: e.target.value } })}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#C4C0B4]">Hero Title</label>
                  <input
                    type="text"
                    value={data.settings.heroTitle || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, heroTitle: e.target.value } })}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#C4C0B4]">Hero Subtitle / Description</label>
                  <textarea
                    rows={2}
                    value={data.settings.heroSubtitle || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, heroSubtitle: e.target.value } })}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#C4C0B4]">Contact Phone</label>
                    <input
                      type="text"
                      value={data.settings.contactPhone || ''}
                      onChange={(e) => setData({ ...data, settings: { ...data.settings, contactPhone: e.target.value } })}
                      className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#C4C0B4]">Contact Email</label>
                    <input
                      type="text"
                      value={data.settings.contactEmail || ''}
                      onChange={(e) => setData({ ...data, settings: { ...data.settings, contactEmail: e.target.value } })}
                      className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#C4C0B4]">Dress Code Policy</label>
                  <textarea
                    rows={2}
                    value={data.settings.dressCode || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, dressCode: e.target.value } })}
                    className="w-full bg-[#0F1B16] border border-[#2A3A33] rounded-xl px-4 py-2.5 text-sm text-[#F3EFE3]"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" icon={Save}>
                  Save Settings
                </Button>
              </form>
            </Card>
          )}

          {/* TAB 2: EVENTS & FESTIVALS */}
          {activeTab === 'events' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F3EFE3]">Manage Events & Festivals</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddItem('/api/events', {
                    title: 'New Festival',
                    date: '2026-11-01',
                    time: '06:00 AM',
                    location: 'Main Mandapam',
                    description: 'Festival details...',
                    category: 'Festival'
                  }, 'Events')}
                  icon={Plus}
                >
                  Add Festival
                </Button>
              </div>

              <div className="space-y-4">
                {data.events.map((ev) => (
                  <div key={ev.id} className="p-4 bg-[#0F1B16] border border-[#2A3A33] rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-lg text-[#F3EFE3]">{ev.title}</h4>
                      <p className="text-xs text-[#8FA98B]">{ev.date} • {ev.time} • Category: {ev.category}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem('/api/events', ev.id, 'Events')}
                      className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 3: POOJAS */}
          {activeTab === 'poojas' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F3EFE3]">Manage Pooja Offerings</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddItem('/api/poojas', {
                    name: 'New Seva Offering',
                    description: 'Description of offering...',
                    price: 250,
                    timing: 'Daily Morning',
                    category: 'Serpent Pooja',
                    starsApplicable: ['All Stars']
                  }, 'Poojas')}
                  icon={Plus}
                >
                  Add Pooja
                </Button>
              </div>

              <div className="space-y-4">
                {data.poojas.map((p) => (
                  <div key={p.id} className="p-4 bg-[#0F1B16] border border-[#2A3A33] rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-lg text-[#F3EFE3]">{p.name} — <span className="text-[#C6A15B]">₹{p.price}</span></h4>
                      <p className="text-xs text-[#8FA98B]">{p.timing} • Category: {p.category}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem('/api/poojas', p.id, 'Poojas')}
                      className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 4: TIMINGS */}
          {activeTab === 'timings' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="font-heading text-2xl text-[#F3EFE3]">Daily Ritual Timings</h2>
              <div className="space-y-4">
                {data.timings.map((t) => (
                  <div key={t.id} className="p-4 bg-[#0F1B16] border border-[#2A3A33] rounded-xl space-y-1">
                    <div className="flex justify-between">
                      <h4 className="font-heading text-base text-[#F3EFE3]">{t.name}</h4>
                      <span className="text-xs text-[#C6A15B] font-bold">{t.time}</span>
                    </div>
                    <p className="text-xs text-[#C4C0B4]">{t.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === 'gallery' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F3EFE3]">Manage Media Gallery</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddItem('/api/gallery', {
                    title: 'New Temple Media',
                    category: 'Sarpa Kavu',
                    url: 'https://images.unsplash.com/photo-1545652985-5edd365b12eb?q=80&w=800&auto=format&fit=crop',
                    type: 'image',
                    album: 'Sacred Grove'
                  }, 'Gallery')}
                  icon={Plus}
                >
                  Upload Media
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.gallery.map((g) => (
                  <div key={g.id} className="p-3 bg-[#0F1B16] border border-[#2A3A33] rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-[#2A3A33] shrink-0">
                        <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading text-sm text-[#F3EFE3] truncate max-w-[150px]">{g.title}</h4>
                        <span className="text-[10px] text-[#8FA98B]">{g.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteItem('/api/gallery', g.id, 'Gallery')}
                      className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 6: DONATIONS AUDIT */}
          {activeTab === 'donations' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="font-heading text-2xl text-[#F3EFE3]">Donation Audit Records</h2>
              <div className="space-y-3">
                {data.donations.map((d) => (
                  <div key={d.id} className="p-4 bg-[#0F1B16] border border-[#2A3A33] rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-semibold text-[#F3EFE3]">{d.donorName} ({d.email})</h4>
                      <p className="text-[#8FA98B]">Purpose: {d.purpose} • Receipt: {d.receiptId}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-base text-[#C6A15B]">₹{d.amount}</span>
                      <span className="block text-[10px] text-[#6D7B71]">{d.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 7: DEVOTEE MESSAGES */}
          {activeTab === 'messages' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="font-heading text-2xl text-[#F3EFE3]">Devotee Messages</h2>
              <div className="space-y-4">
                {data.messages.map((m) => (
                  <div key={m.id} className="p-4 bg-[#0F1B16] border border-[#2A3A33] rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#F3EFE3]">{m.name} ({m.email})</span>
                      <span className="text-[#8FA98B]">{new Date(m.date).toLocaleDateString()}</span>
                    </div>
                    <h5 className="text-xs font-semibold text-[#C6A15B]">{m.subject}</h5>
                    <p className="text-xs text-[#C4C0B4]">{m.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 8: FAQS */}
          {activeTab === 'faqs' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F3EFE3]">Manage FAQs</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddItem('/api/faqs', {
                    question: 'New FAQ Question?',
                    answer: 'Answer content...',
                    category: 'General'
                  }, 'FAQs')}
                  icon={Plus}
                >
                  Add FAQ
                </Button>
              </div>

              <div className="space-y-4">
                {data.faqs.map((f) => (
                  <div key={f.id} className="p-4 bg-[#0F1B16] border border-[#2A3A33] rounded-xl flex items-center justify-between gap-4 text-xs">
                    <div>
                      <h4 className="font-semibold text-[#F3EFE3]">{f.question}</h4>
                      <p className="text-[#C4C0B4] mt-1">{f.answer}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem('/api/faqs', f.id, 'FAQs')}
                      className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 9: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F3EFE3]">Manage Banners & Announcements</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAddItem('/api/announcements', {
                    message: 'New Temple Announcement Alert',
                    active: true,
                    type: 'general'
                  }, 'Announcements')}
                  icon={Plus}
                >
                  Add Announcement
                </Button>
              </div>

              <div className="space-y-4">
                {data.announcements.map((a) => (
                  <div key={a.id} className="p-4 bg-[#0F1B16] border border-[#2A3A33] rounded-xl flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold mb-1 ${a.active ? 'bg-green-900/60 text-green-300' : 'bg-gray-800 text-gray-400'}`}>
                        {a.active ? 'Active' : 'Inactive'}
                      </span>
                      <p className="text-[#F3EFE3] font-medium">{a.message}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem('/api/announcements', a.id, 'Announcements')}
                      className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
