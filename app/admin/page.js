'use client';
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  LogOut,
  Calendar,
  Clock,
  Image as ImageIcon,
  IndianRupee,
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
  Sparkles,
  X
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ItemModal from '@/components/admin/ItemModal';

export default function AdminPage() {
  // Auth state — email/password only (Google SSO removed per Changes.md)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [emailInput, setEmailInput] = useState('admin@mevakkatusheenagaraja.org');
  const [passwordInput, setPasswordInput] = useState('admin123');
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

  // Timings editing state
  const [editingTimings, setEditingTimings] = useState([]);
  const [timingsSaving, setTimingsSaving] = useState(false);

  // Generic Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, item: null, type: '', endpoint: '', sectionKey: '', fields: [], title: '' });

  const openModal = (type, item, endpoint, sectionKey, fields, title) => {
    setModalConfig({ isOpen: true, item, type, endpoint, sectionKey, fields, title });
  };
  const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));

  const handleSaveModal = async (formData) => {
    const isEdit = !!formData.id;
    const method = isEdit ? 'PUT' : 'POST';
    try {
      const res = await fetch(modalConfig.endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await res.json();
      if (result.success) {
        notifySave(`Item ${isEdit ? 'updated' : 'added'} in ${modalConfig.sectionKey}.`);
        loadAdminData();
        closeModal();
      } else {
        alert(result.error || 'Failed to save item');
      }
    } catch (err) {
      console.error(err);
      alert('Network error saving item');
    }
  };

  // Handle Login — email/password only
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'email',
          email: emailInput,
          password: passwordInput
        })
      });

      const resData = await res.json();
      if (resData.success) {
        setIsAuthenticated(true);
        setAdminUser(resData.user);
        loadAdminData();
      } else {
        setAuthError(resData.message || 'Authentication failed. Check your credentials.');
      }
    } catch (err) {
      setAuthError('Connection error during login. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Fetch all CMS records
  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [c, t, e, p, g, d, m, f, a] = await Promise.all([
        fetch('/api/content', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/timings', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/events', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/poojas', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/gallery', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/donations', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/contact', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/faqs', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/announcements', { cache: 'no-store' }).then(r => r.json())
      ]);

      const timingsArr = t.timings || [];
      setData({
        settings: c.settings || {},
        timings: timingsArr,
        events: e.events || [],
        poojas: p.poojas || [],
        gallery: g.gallery || [],
        donations: d.donations || [],
        messages: m.messages || [],
        faqs: f.faqs || [],
        announcements: a.announcements || []
      });
      // Populate editable timings copy
      setEditingTimings(JSON.parse(JSON.stringify(timingsArr)));
    } catch (err) {
      console.error('Failed loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  // Helper notice
  const notifySave = (msg) => {
    setSaveSuccessMessage(msg);
    setTimeout(() => setSaveSuccessMessage(''), 3500);
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
    if (result.success) notifySave('Website Settings updated successfully.');
  };

  // Handle Save Timings — fixes the "timings not saving" bug
  const handleSaveTimings = async () => {
    setTimingsSaving(true);
    try {
      const res = await fetch('/api/timings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTimings)
      });
      const result = await res.json();
      if (result.success) {
        notifySave('Daily Timings saved successfully.');
        setData(prev => ({ ...prev, timings: [...editingTimings] }));
      } else {
        notifySave('Error saving timings. Please try again.');
      }
    } catch (err) {
      console.error('Timings save error:', err);
    } finally {
      setTimingsSaving(false);
    }
  };

  // Update a timing field inline
  const updateTimingField = (index, field, value) => {
    setEditingTimings(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
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
      notifySave(`New item added to ${sectionKey}.`);
      loadAdminData();
    }
  };

  // Delete Item Generic Helper
  const handleDeleteItem = async (endpoint, id, sectionKey) => {
    const res = await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' });
    const result = await res.json();
    if (result.success) {
      notifySave(`Item deleted from ${sectionKey}.`);
      loadAdminData();
    }
  };

  // If not authenticated, render Admin Login — email/password only
  if (!isAuthenticated) {
    return (
      <div className="py-20 px-5 sm:px-8 max-w-md mx-auto">
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-[#0D1A12] border border-[#9B7A41] flex items-center justify-center text-[#9B7A41] mx-auto mb-2">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="font-heading text-2xl text-[#F7F2E7]">Admin Portal Login</h1>
            <p className="text-xs text-[#4F7A4D]">Mevakkatu Shree Nagaraja Kshetram — CMS</p>
          </div>

          {authError && (
            <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <X className="w-4 h-4 shrink-0" />
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#D8D5C8] flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9B7A41]" /> Admin Email
              </label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none transition-colors"
                placeholder="admin@mevakkatusheenagaraja.org"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#D8D5C8] flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#9B7A41]" /> Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full"
              disabled={authLoading}
              icon={authLoading ? Loader2 : Lock}
            >
              {authLoading ? 'Verifying...' : 'Access Admin Dashboard'}
            </Button>
          </form>

          <p className="text-center text-[10px] text-[#5E645A]">
            Restricted access. Authorized temple administrators only.
          </p>
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
    { id: 'donations', label: 'Donations Audit', icon: IndianRupee },
    { id: 'messages', label: 'Devotee Messages', icon: MessageSquare },
    { id: 'faqs', label: 'Manage FAQs', icon: HelpCircle },
    { id: 'announcements', label: 'Announcements', icon: Bell },
  ];

  return (
    <div className="py-10 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8">

      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#5E645A]/50">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#9B7A41]">
            CMS Control Portal
          </span>
          <h1 className="font-heading text-3xl text-[#F7F2E7]">
            Mevakkatu Temple Admin
          </h1>
          <p className="text-xs text-[#4F7A4D]">
            Logged in as: <strong className="text-[#F7F2E7]">{adminUser?.name || 'Administrator'}</strong> ({adminUser?.email || 'admin'})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { setIsAuthenticated(false); setAdminUser(null); }}
            icon={LogOut}
          >
            Logout
          </Button>
        </div>
      </div>

      {saveSuccessMessage && (
        <div className="p-4 bg-[#233728] border border-[#4F7A4D] rounded-xl text-sm text-[#F7F2E7] flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#4F7A4D]" />
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left ${isActive
                    ? 'bg-[#9B7A41] text-[#0D1A12] font-bold'
                    : 'bg-[#233728]/50 text-[#D8D5C8] border border-[#5E645A]/50 hover:border-[#9B7A41] hover:text-[#F7F2E7]'
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

          {loadingData && (
            <div className="flex items-center justify-center py-20 text-[#4F7A4D]">
              <Loader2 className="w-6 h-6 animate-spin mr-3" />
              Loading temple data...
            </div>
          )}

          {/* TAB 1: WEBSITE SETTINGS */}
          {!loadingData && activeTab === 'settings' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="font-heading text-2xl text-[#F7F2E7]">Homepage & General Settings</h2>
              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Temple Name</label>
                  <input
                    type="text"
                    value={data.settings.templeName || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, templeName: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Hero Title</label>
                  <input
                    type="text"
                    value={data.settings.heroTitle || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, heroTitle: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Temple Tagline</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        setData({ ...data, settings: { ...data.settings, tagline: e.target.value } });
                      }
                    }}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-xs text-[#9B7A41] focus:border-[#9B7A41] focus:outline-none mb-1 cursor-pointer"
                  >
                    <option value="">-- Choose from Sacred Grove Tagline Options --</option>
                    <option value="In the Shade of Elanji, Divinity Breathes">1. In the Shade of Elanji, Divinity Breathes</option>
                    <option value="Where Ancient Serpent Spirits Guard the Sacred Grove">2. Where Ancient Serpent Spirits Guard the Sacred Grove</option>
                    <option value="Resting Beneath Sacred Flora, An Eternal Sanctuary of Peace">3. Resting Beneath Sacred Flora, An Eternal Sanctuary of Peace</option>
                    <option value="Echoes of Silence, Whispering Leaves & Eternal Naga Grace">4. Echoes of Silence, Whispering Leaves & Eternal Naga Grace</option>
                    <option value="Concreting Devotion in the Sacred Shade of Sarpakavu">5. Concreting Devotion in the Sacred Shade of Sarpakavu</option>
                    <option value="Beneath the Ancient Elanji Tree, Where Nature is Deity">6. Beneath the Ancient Elanji Tree, Where Nature is Deity</option>
                    <option value="Timeless Serpent Sanctuary of Kerala's Sacred Grove">7. Timeless Serpent Sanctuary of Kerala's Sacred Grove</option>
                    <option value="Sacred Grove Sanctuary of Ancient Naga Blessing">8. Sacred Grove Sanctuary of Ancient Naga Blessing</option>
                  </select>
                  <input
                    type="text"
                    value={data.settings.tagline || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, tagline: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                    placeholder="Custom tagline..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Hero Subtitle / Description</label>
                  <textarea
                    rows={2}
                    value={data.settings.heroSubtitle || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, heroSubtitle: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#D8D5C8]">Contact Phone</label>
                    <input
                      type="text"
                      value={data.settings.contactPhone || ''}
                      onChange={(e) => setData({ ...data, settings: { ...data.settings, contactPhone: e.target.value } })}
                      className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#D8D5C8]">Contact Email</label>
                    <input
                      type="text"
                      value={data.settings.contactEmail || ''}
                      onChange={(e) => setData({ ...data, settings: { ...data.settings, contactEmail: e.target.value } })}
                      className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Emergency Phone</label>
                  <input
                    type="text"
                    value={data.settings.emergencyPhone || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, emergencyPhone: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Temple Address</label>
                  <textarea
                    rows={2}
                    value={data.settings.address || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, address: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Dress Code Policy</label>
                  <textarea
                    rows={2}
                    value={data.settings.dressCode || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, dressCode: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Parking Info</label>
                  <textarea
                    rows={2}
                    value={data.settings.parking || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, parking: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#D8D5C8]">Photography Policy</label>
                  <textarea
                    rows={2}
                    value={data.settings.photographyPolicy || ''}
                    onChange={(e) => setData({ ...data, settings: { ...data.settings, photographyPolicy: e.target.value } })}
                    className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="md" icon={Save}>
                  Save All Settings
                </Button>
              </form>
            </Card>
          )}

          {/* TAB 2: DAILY TIMINGS — Fully Editable (Bug Fix) */}
          {!loadingData && activeTab === 'timings' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="font-heading text-2xl text-[#F7F2E7]">Daily Ritual Timings</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveTimings}
                  disabled={timingsSaving}
                  icon={timingsSaving ? Loader2 : Save}
                >
                  {timingsSaving ? 'Saving...' : 'Save All Timings'}
                </Button>
              </div>

              <div className="space-y-6">
                {editingTimings.map((t, index) => (
                  <div key={t.id} className="p-5 bg-[#0D1A12] border border-[#5E645A] rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#9B7A41]">
                        Ritual #{index + 1}
                      </span>
                      <Edit className="w-4 h-4 text-[#5E645A]" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-[#5E645A]">
                          Ritual Name
                        </label>
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) => updateTimingField(index, 'name', e.target.value)}
                          className="w-full bg-[#233728]/40 border border-[#5E645A] rounded-lg px-3 py-2 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold uppercase tracking-wider text-[#5E645A]">
                          Time
                        </label>
                        <input
                          type="text"
                          value={t.time}
                          onChange={(e) => updateTimingField(index, 'time', e.target.value)}
                          className="w-full bg-[#233728]/40 border border-[#5E645A] rounded-lg px-3 py-2 text-sm text-[#9B7A41] font-semibold focus:border-[#9B7A41] focus:outline-none"
                          placeholder="e.g. 05:00 AM - 06:00 AM"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#5E645A]">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={t.description}
                        onChange={(e) => updateTimingField(index, 'description', e.target.value)}
                        className="w-full bg-[#233728]/40 border border-[#5E645A] rounded-lg px-3 py-2 text-sm text-[#D8D5C8] focus:border-[#9B7A41] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold uppercase tracking-wider text-[#5E645A]">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={t.image || ''}
                        onChange={(e) => updateTimingField(index, 'image', e.target.value)}
                        className="w-full bg-[#233728]/40 border border-[#5E645A] rounded-lg px-3 py-2 text-xs text-[#D8D5C8] focus:border-[#9B7A41] focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleSaveTimings}
                disabled={timingsSaving}
                icon={timingsSaving ? Loader2 : Save}
              >
                {timingsSaving ? 'Saving...' : 'Save All Timings'}
              </Button>
            </Card>
          )}

          {/* TAB 3: EVENTS & FESTIVALS */}
          {!loadingData && activeTab === 'events' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F7F2E7]">Manage Events & Festivals</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openModal('events', null, '/api/events', 'Events', [
                    { name: 'title', label: 'Event Title', type: 'text', required: true },
                    { name: 'date', label: 'Date', type: 'date', required: true },
                    { name: 'time', label: 'Time', type: 'text', required: true },
                    { name: 'location', label: 'Location', type: 'text', required: true },
                    { name: 'category', label: 'Category', type: 'select', options: [{label:'Festival', value:'Festival'}, {label:'Event', value:'Event'}], required: true },
                    { name: 'description', label: 'Description', type: 'textarea' }
                  ], 'Add Event/Festival')}
                  icon={Plus}
                >
                  Add Festival
                </Button>
              </div>

              <div className="space-y-4">
                {data.events.length === 0 && (
                  <p className="text-sm text-[#5E645A] text-center py-8">No events found. Add one above.</p>
                )}
                {data.events.map((ev) => (
                  <div key={ev.id} className="p-4 bg-[#0D1A12] border border-[#5E645A] rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-base text-[#F7F2E7]">{ev.title}</h4>
                      <p className="text-xs text-[#4F7A4D]">{ev.date} • {ev.time} • {ev.category}</p>
                      <p className="text-xs text-[#D8D5C8] mt-1 line-clamp-2">{ev.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('events', ev, '/api/events', 'Events', [
                          { name: 'title', label: 'Event Title', type: 'text', required: true },
                          { name: 'date', label: 'Date', type: 'date', required: true },
                          { name: 'time', label: 'Time', type: 'text', required: true },
                          { name: 'location', label: 'Location', type: 'text', required: true },
                          { name: 'category', label: 'Category', type: 'select', options: [{label:'Festival', value:'Festival'}, {label:'Event', value:'Event'}], required: true },
                          { name: 'description', label: 'Description', type: 'textarea' }
                        ], 'Edit Event/Festival')}
                        className="p-2 text-[#9B7A41] hover:bg-[#9B7A41]/10 rounded-lg shrink-0"
                        aria-label="Edit event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('/api/events', ev.id, 'Events')}
                        className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg shrink-0"
                        aria-label="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 4: POOJAS */}
          {!loadingData && activeTab === 'poojas' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F7F2E7]">Manage Pooja Offerings</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openModal('poojas', null, '/api/poojas', 'Poojas', [
                    { name: 'name', label: 'Pooja Name', type: 'text', required: true },
                    { name: 'price', label: 'Price (₹)', type: 'number', required: true },
                    { name: 'timing', label: 'Timing', type: 'text', required: true },
                    { name: 'category', label: 'Category', type: 'text', required: true },
                    { name: 'description', label: 'Description', type: 'textarea' }
                  ], 'Add Pooja')}
                  icon={Plus}
                >
                  Add Pooja
                </Button>
              </div>

              <div className="space-y-4">
                {data.poojas.length === 0 && (
                  <p className="text-sm text-[#5E645A] text-center py-8">No poojas found. Add one above.</p>
                )}
                {data.poojas.map((p) => (
                  <div key={p.id} className="p-4 bg-[#0D1A12] border border-[#5E645A] rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-base text-[#F7F2E7]">{p.name} — <span className="text-[#9B7A41]">₹{p.price}</span></h4>
                      <p className="text-xs text-[#4F7A4D]">{p.timing} • Category: {p.category}</p>
                      <p className="text-xs text-[#D8D5C8] mt-1 line-clamp-2">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('poojas', p, '/api/poojas', 'Poojas', [
                          { name: 'name', label: 'Pooja Name', type: 'text', required: true },
                          { name: 'price', label: 'Price (₹)', type: 'number', required: true },
                          { name: 'timing', label: 'Timing', type: 'text', required: true },
                          { name: 'category', label: 'Category', type: 'text', required: true },
                          { name: 'description', label: 'Description', type: 'textarea' }
                        ], 'Edit Pooja')}
                        className="p-2 text-[#9B7A41] hover:bg-[#9B7A41]/10 rounded-lg shrink-0"
                        aria-label="Edit pooja"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('/api/poojas', p.id, 'Poojas')}
                        className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg shrink-0"
                        aria-label="Delete pooja"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 5: GALLERY */}
          {!loadingData && activeTab === 'gallery' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F7F2E7]">Manage Media Gallery</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openModal('gallery', null, '/api/gallery', 'Gallery', [
                    { name: 'title', label: 'Media Title', type: 'text', required: true },
                    { name: 'category', label: 'Category', type: 'text', required: true },
                    { name: 'album', label: 'Album', type: 'text', required: true },
                    { name: 'url', label: 'Upload Image', type: 'file', required: true }
                  ], 'Upload Media')}
                  icon={Plus}
                >
                  Upload Media
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.gallery.length === 0 && (
                  <p className="text-sm text-[#5E645A] text-center py-8 col-span-2">No media found. Upload one above.</p>
                )}
                {data.gallery.map((g) => (
                  <div key={g.id} className="p-3 bg-[#0D1A12] border border-[#5E645A] rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-[#5E645A] shrink-0">
                        <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading text-sm text-[#F7F2E7] truncate max-w-[150px]">{g.title}</h4>
                        <span className="text-[10px] text-[#4F7A4D]">{g.category} • {g.album}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('gallery', g, '/api/gallery', 'Gallery', [
                          { name: 'title', label: 'Media Title', type: 'text', required: true },
                          { name: 'category', label: 'Category', type: 'text', required: true },
                          { name: 'album', label: 'Album', type: 'text', required: true },
                          { name: 'url', label: 'Upload Image', type: 'file', required: true }
                        ], 'Edit Media')}
                        className="p-2 text-[#9B7A41] hover:bg-[#9B7A41]/10 rounded-lg shrink-0"
                        aria-label="Edit media"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('/api/gallery', g.id, 'Gallery')}
                        className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg shrink-0"
                        aria-label="Delete gallery item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 6: DONATIONS AUDIT */}
          {!loadingData && activeTab === 'donations' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="font-heading text-2xl text-[#F7F2E7]">Donation Audit Records</h2>
              <div className="space-y-3">
                {data.donations.length === 0 && (
                  <p className="text-sm text-[#5E645A] text-center py-8">No donation records found.</p>
                )}
                {data.donations.map((d) => (
                  <div key={d.id} className="p-4 bg-[#0D1A12] border border-[#5E645A] rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-semibold text-[#F7F2E7]">{d.donorName} ({d.email})</h4>
                      <p className="text-[#4F7A4D]">Purpose: {d.purpose} • Receipt: {d.receiptId}</p>
                      <p className="text-[#5E645A]">{new Date(d.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-heading text-base text-[#9B7A41]">₹{d.amount}</span>
                      <span className="block text-[10px] text-[#5E645A]">{d.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 7: DEVOTEE MESSAGES */}
          {!loadingData && activeTab === 'messages' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <h2 className="font-heading text-2xl text-[#F7F2E7]">Devotee Messages</h2>
              <div className="space-y-4">
                {data.messages.length === 0 && (
                  <p className="text-sm text-[#5E645A] text-center py-8">No messages received yet.</p>
                )}
                {data.messages.map((m) => (
                  <div key={m.id} className="p-4 bg-[#0D1A12] border border-[#5E645A] rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-[#F7F2E7]">{m.name} ({m.email})</span>
                      <span className="text-[#4F7A4D]">{new Date(m.date).toLocaleDateString('en-IN')}</span>
                    </div>
                    <h5 className="text-xs font-semibold text-[#9B7A41]">{m.subject}</h5>
                    <p className="text-xs text-[#D8D5C8]">{m.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 8: FAQS */}
          {!loadingData && activeTab === 'faqs' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F7F2E7]">Manage FAQs</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openModal('faqs', null, '/api/faqs', 'FAQs', [
                    { name: 'question', label: 'Question', type: 'text', required: true },
                    { name: 'answer', label: 'Answer', type: 'textarea', required: true },
                    { name: 'category', label: 'Category', type: 'text', required: true }
                  ], 'Add FAQ')}
                  icon={Plus}
                >
                  Add FAQ
                </Button>
              </div>

              <div className="space-y-4">
                {data.faqs.length === 0 && (
                  <p className="text-sm text-[#5E645A] text-center py-8">No FAQs found. Add one above.</p>
                )}
                {data.faqs.map((f) => (
                  <div key={f.id} className="p-4 bg-[#0D1A12] border border-[#5E645A] rounded-xl flex items-start justify-between gap-4 text-xs">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#F7F2E7] mb-1">{f.question}</h4>
                      <p className="text-[#D8D5C8] leading-relaxed">{f.answer}</p>
                      <span className="inline-block mt-2 text-[10px] text-[#9B7A41] uppercase font-bold">{f.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('faqs', f, '/api/faqs', 'FAQs', [
                          { name: 'question', label: 'Question', type: 'text', required: true },
                          { name: 'answer', label: 'Answer', type: 'textarea', required: true },
                          { name: 'category', label: 'Category', type: 'text', required: true }
                        ], 'Edit FAQ')}
                        className="p-2 text-[#9B7A41] hover:bg-[#9B7A41]/10 rounded-lg shrink-0"
                        aria-label="Edit FAQ"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('/api/faqs', f.id, 'FAQs')}
                        className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg shrink-0"
                        aria-label="Delete FAQ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* TAB 9: ANNOUNCEMENTS */}
          {!loadingData && activeTab === 'announcements' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-2xl text-[#F7F2E7]">Manage Banners & Announcements</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => openModal('announcements', null, '/api/announcements', 'Announcements', [
                    { name: 'message', label: 'Announcement Message', type: 'textarea', required: true },
                    { name: 'type', label: 'Type', type: 'select', options: [{label:'General', value:'general'}, {label:'Urgent', value:'urgent'}, {label:'Event', value:'event'}], required: true },
                    { name: 'active', label: 'Status', type: 'checkbox', checkboxLabel: 'Active (Show on website)' }
                  ], 'Add Announcement')}
                  icon={Plus}
                >
                  Add Announcement
                </Button>
              </div>

              <div className="space-y-4">
                {data.announcements.length === 0 && (
                  <p className="text-sm text-[#5E645A] text-center py-8">No announcements found. Add one above.</p>
                )}
                {data.announcements.map((a) => (
                  <div key={a.id} className="p-4 bg-[#0D1A12] border border-[#5E645A] rounded-xl flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold mb-1 ${a.active ? 'bg-[#233728] text-[#4F7A4D] border border-[#4F7A4D]' : 'bg-[#3A2D25] text-[#5E645A] border border-[#5E645A]'}`}>
                        {a.active ? 'Active' : 'Inactive'}
                      </span>
                      <p className="text-[#F7F2E7] font-medium">{a.message}</p>
                      <span className="text-[#9B7A41] capitalize">{a.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal('announcements', a, '/api/announcements', 'Announcements', [
                          { name: 'message', label: 'Announcement Message', type: 'textarea', required: true },
                          { name: 'type', label: 'Type', type: 'select', options: [{label:'General', value:'general'}, {label:'Urgent', value:'urgent'}, {label:'Event', value:'event'}], required: true },
                          { name: 'active', label: 'Status', type: 'checkbox', checkboxLabel: 'Active (Show on website)' }
                        ], 'Edit Announcement')}
                        className="p-2 text-[#9B7A41] hover:bg-[#9B7A41]/10 rounded-lg shrink-0"
                        aria-label="Edit announcement"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem('/api/announcements', a.id, 'Announcements')}
                        className="p-2 text-red-400 hover:bg-red-950/40 rounded-lg shrink-0"
                        aria-label="Delete announcement"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

        </div>
      </div>

      <ItemModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onSave={handleSaveModal}
        item={modalConfig.item}
        fields={modalConfig.fields}
        title={modalConfig.title}
      />
    </div>
  );
}

