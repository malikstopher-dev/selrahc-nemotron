'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const sections = [
  { href: '/admin/content/hero', label: 'Hero Section', desc: 'Headline, subheadline, CTA text, hero images' },
  { href: '/admin/content/about', label: 'About', desc: 'Founder bio, mission, vision, values' },
  { href: '/admin/content/services', label: 'Services', desc: 'Service descriptions and specializations' },
  { href: '/admin/projects', label: 'Projects', desc: 'Portfolio projects and images' },
  { href: '/admin/content/process', label: 'Process', desc: '6-stage process steps' },
  { href: '/admin/content/testimonials', label: 'Testimonials', desc: 'Client testimonials' },
  { href: '/admin/content/faq', label: 'FAQ', desc: 'Frequently asked questions' },
  { href: '/admin/content/contact', label: 'Contact Info', desc: 'Address, phone, email' },
  { href: '/admin/media', label: 'Media Library', desc: 'Upload and manage images' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, testimonials: 0, faq: 0 });
  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/projects').then(r => r.json()),
      fetch('/api/admin/testimonials').then(r => r.json()),
      fetch('/api/admin/faq').then(r => r.json()),
    ]).then(([projects, testimonials, faq]) => {
      setStats({
        projects: projects.data?.length || 0,
        testimonials: testimonials.data?.length || 0,
        faq: faq.data?.length || 0,
      });
    });
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    const res = await fetch('/api/admin/seed', { method: 'POST' });
    if (res.ok) {
      setSeeded(true);
      window.location.reload();
    }
    setSeeding(false);
  };

  return (
    <div>
      <h1 className="font-heading text-2xl md:text-3xl text-white mb-2">Dashboard</h1>
      <p className="text-arch-gray text-sm mb-8">Manage your website content</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-arch-dark p-6 border border-arch-gray/10">
          <p className="text-arch-gray text-xs uppercase tracking-[0.15em]">Projects</p>
          <p className="text-white text-3xl font-heading mt-2">{stats.projects}</p>
        </div>
        <div className="bg-arch-dark p-6 border border-arch-gray/10">
          <p className="text-arch-gray text-xs uppercase tracking-[0.15em]">Testimonials</p>
          <p className="text-white text-3xl font-heading mt-2">{stats.testimonials}</p>
        </div>
        <div className="bg-arch-dark p-6 border border-arch-gray/10">
          <p className="text-arch-gray text-xs uppercase tracking-[0.15em]">FAQ Items</p>
          <p className="text-white text-3xl font-heading mt-2">{stats.faq}</p>
        </div>
      </div>

      {stats.projects === 0 && !seeded && (
        <div className="bg-arch-dark p-6 border border-arch-bronze/30 mb-8">
          <p className="text-white text-sm mb-3">No content found. Import your existing website content into the CMS?</p>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-arch-bronze text-white px-6 py-2 text-xs uppercase tracking-[0.15em] hover:bg-arch-bronze/90 transition-colors disabled:opacity-50"
          >
            {seeding ? 'Importing...' : 'Import Existing Content'}
          </button>
        </div>
      )}

      <h2 className="text-white text-sm uppercase tracking-[0.15em] mb-4">Edit Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="block bg-arch-dark p-6 border border-arch-gray/10 hover:border-arch-bronze/50 transition-colors group"
          >
            <h3 className="text-white font-heading text-lg group-hover:text-arch-bronze transition-colors">{s.label}</h3>
            <p className="text-arch-gray text-sm mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
