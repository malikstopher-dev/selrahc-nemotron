'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import AdminAuthProvider from '@/components/admin/AdminAuthProvider';

export const dynamic = 'force-dynamic';

const navSections = [
  {
    label: 'Content',
    items: [
      { href: '/admin/content/hero', label: 'Hero Section' },
      { href: '/admin/content/about', label: 'About' },
      { href: '/admin/content/services', label: 'Services' },
      { href: '/admin/content/process', label: 'Process' },
      { href: '/admin/content/testimonials', label: 'Testimonials' },
      { href: '/admin/content/faq', label: 'FAQ' },
      { href: '/admin/content/contact', label: 'Contact Info' },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { href: '/admin/projects', label: 'Projects' },
    ],
  },
  {
    label: 'Media',
    items: [
      { href: '/admin/media', label: 'Media Library' },
    ],
  },
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-arch-dark border-r border-arch-gray/10 z-50 transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-arch-gray/10">
          <Link href="/admin" className="font-heading text-xl text-white">Selrahc</Link>
          <p className="text-arch-gray text-[10px] uppercase tracking-[0.2em] mt-1">CMS Dashboard</p>
        </div>
        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100%-80px)]">
          <Link href="/admin" className={`block text-sm py-2 px-3 rounded transition-colors ${pathname === '/admin' ? 'bg-arch-bronze/10 text-arch-bronze' : 'text-arch-gray hover:text-white'}`}>
            Dashboard
          </Link>
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-arch-gray/50 px-3 mb-2">{section.label}</p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`block text-sm py-2 px-3 rounded transition-colors ${pathname === item.href ? 'bg-arch-bronze/10 text-arch-bronze' : 'text-arch-gray hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-4 border-t border-arch-gray/10">
            <Link href="/" target="_blank" className="block text-sm py-2 px-3 text-arch-gray hover:text-white transition-colors">
              View Site ↗
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}

function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <header className="h-14 bg-arch-dark border-b border-arch-gray/10 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <button onClick={onMenuToggle} className="lg:hidden text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
      <div className="hidden lg:block" />
      <button onClick={handleLogout} className="text-arch-gray hover:text-white text-xs uppercase tracking-[0.15em] transition-colors">
        Sign Out
      </button>
    </header>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-arch-black">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="lg:ml-64">
          <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
          <main className="p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </AdminAuthProvider>
  );
}
