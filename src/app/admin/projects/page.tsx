'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '@/components/admin/Toast';

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  images: { image_url: string }[];
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newProject, setNewProject] = useState({ id: '', title: '', category: 'residential', location: '', year: '2025', description: '' });

  useEffect(() => {
    fetch('/api/admin/projects').then(r => r.json()).then(({ data }) => setProjects(data || []));
  }, []);

  const create = async () => {
    if (!newProject.id || !newProject.title) return;
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });
    if (res.ok) {
      setProjects(prev => [...prev, { ...newProject, images: [] }]);
      setShowNew(false);
      setNewProject({ id: '', title: '', category: 'residential', location: '', year: '2025', description: '' });
      setToast({ msg: 'Project created', type: 'success' });
    } else {
      setToast({ msg: 'Failed to create project', type: 'error' });
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProjects(prev => prev.filter(p => p.id !== id));
      setToast({ msg: 'Project deleted', type: 'success' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl text-white">Projects</h1>
          <p className="text-arch-gray text-sm mt-1">Manage portfolio projects</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} className="bg-arch-bronze text-white px-4 py-2 text-xs uppercase tracking-[0.15em] hover:bg-arch-bronze/90 transition-colors">
          + New Project
        </button>
      </div>

      {showNew && (
        <div className="bg-arch-dark p-6 border border-arch-gray/10 mb-6 space-y-4 max-w-2xl">
          <input placeholder="URL slug (e.g. my-project)" value={newProject.id} onChange={(e) => setNewProject(p => ({ ...p, id: e.target.value }))} className="w-full bg-arch-black text-white px-4 py-3 border border-arch-gray/20 focus:border-arch-bronze outline-none text-sm" />
          <input placeholder="Title" value={newProject.title} onChange={(e) => setNewProject(p => ({ ...p, title: e.target.value }))} className="w-full bg-arch-black text-white px-4 py-3 border border-arch-gray/20 focus:border-arch-bronze outline-none text-sm" />
          <div className="grid grid-cols-3 gap-4">
            <select value={newProject.category} onChange={(e) => setNewProject(p => ({ ...p, category: e.target.value }))} className="bg-arch-black text-white px-4 py-3 border border-arch-gray/20 text-sm">
              <option value="residential">Residential</option>
              <option value="renovations">Renovations</option>
              <option value="interior">Interior</option>
              <option value="conceptual">Conceptual</option>
              <option value="renderings">Renderings</option>
            </select>
            <input placeholder="Location" value={newProject.location} onChange={(e) => setNewProject(p => ({ ...p, location: e.target.value }))} className="bg-arch-black text-white px-4 py-3 border border-arch-gray/20 text-sm" />
            <input placeholder="Year" value={newProject.year} onChange={(e) => setNewProject(p => ({ ...p, year: e.target.value }))} className="bg-arch-black text-white px-4 py-3 border border-arch-gray/20 text-sm" />
          </div>
          <button onClick={create} className="bg-arch-bronze text-white px-6 py-2 text-xs uppercase tracking-[0.15em] hover:bg-arch-bronze/90">Create</button>
        </div>
      )}

      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id} className="bg-arch-dark p-4 border border-arch-gray/10 flex items-center gap-4">
            <div className="w-16 h-12 bg-arch-black overflow-hidden shrink-0">
              {p.images?.[0] && <img src={p.images[0].image_url} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{p.title}</p>
              <p className="text-arch-gray text-xs">{p.category} &middot; {p.location} &middot; {p.year}</p>
            </div>
            <Link href={`/admin/projects/${p.id}`} className="text-arch-bronze text-xs uppercase tracking-[0.15em] hover:text-arch-bronze/80 shrink-0">Edit</Link>
            <button onClick={() => remove(p.id)} className="text-red-400 text-xs hover:text-red-300 shrink-0">Delete</button>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
