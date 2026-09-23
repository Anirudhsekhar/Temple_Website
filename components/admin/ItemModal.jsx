'use client';
import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Save } from 'lucide-react';

export default function ItemModal({ isOpen, onClose, onSave, item, fields, title }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      const initial = {};
      fields.forEach(f => {
        initial[f.name] = f.default !== undefined ? f.default : '';
      });
      setFormData(initial);
    }
  }, [item, isOpen, fields]);

  const handleChange = (e, field) => {
    if (field.type === 'checkbox') {
      setFormData(prev => ({ ...prev, [field.name]: e.target.checked }));
    } else if (field.type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, [field.name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [field.name]: e.target.value }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-4">
        {fields.map(f => (
          <div key={f.name} className="space-y-1">
            <label className="text-xs font-semibold text-[#D8D5C8]">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                rows={4}
                value={formData[f.name] || ''}
                onChange={e => handleChange(e, f)}
                className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                required={f.required}
              />
            ) : f.type === 'checkbox' ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  checked={!!formData[f.name]}
                  onChange={e => handleChange(e, f)}
                  className="w-4 h-4 rounded border-[#5E645A] bg-[#0D1A12] text-[#9B7A41] focus:ring-[#9B7A41]"
                />
                <span className="text-sm text-[#D8D5C8]">{f.checkboxLabel || 'Enable'}</span>
              </div>
            ) : f.type === 'select' ? (
              <select
                value={formData[f.name] || ''}
                onChange={e => handleChange(e, f)}
                className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                required={f.required}
              >
                <option value="">Select...</option>
                {f.options.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            ) : f.type === 'file' ? (
              <div className="space-y-2">
                {formData[f.name] && formData[f.name].startsWith('data:image') && (
                  <img src={formData[f.name]} alt="Preview" className="h-20 object-contain rounded border border-[#5E645A]" />
                )}
                {formData[f.name] && !formData[f.name].startsWith('data:image') && (
                  <img src={formData[f.name]} alt="Current URL" className="h-20 object-contain rounded border border-[#5E645A]" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleChange(e, f)}
                  className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#9B7A41] file:text-[#0D1A12] hover:file:bg-[#F7F2E7]"
                  required={f.required && !formData[f.name]}
                />
              </div>
            ) : (
              <input
                type={f.type || 'text'}
                value={formData[f.name] || ''}
                onChange={e => handleChange(e, f)}
                className="w-full bg-[#0D1A12] border border-[#5E645A] rounded-xl px-4 py-2.5 text-sm text-[#F7F2E7] focus:border-[#9B7A41] focus:outline-none"
                required={f.required}
              />
            )}
          </div>
        ))}
        <div className="pt-4 flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" icon={Save}>Save</Button>
        </div>
      </form>
    </Modal>
  );
}
