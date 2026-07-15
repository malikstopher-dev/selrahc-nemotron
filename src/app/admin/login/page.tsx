'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-arch-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl text-white">Selrahc Architects</h1>
          <p className="text-arch-gray text-sm mt-2 uppercase tracking-[0.2em]">Content Management</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-arch-dark p-8 space-y-6">
          <div>
            <label className="block text-white text-xs uppercase tracking-[0.15em] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-arch-black text-white px-4 py-3 border border-arch-gray/20 focus:border-arch-bronze outline-none transition-colors text-sm"
              placeholder="admin@selrahcarchitects.com"
            />
          </div>

          <div>
            <label className="block text-white text-xs uppercase tracking-[0.15em] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-arch-black text-white px-4 py-3 border border-arch-gray/20 focus:border-arch-bronze outline-none transition-colors text-sm"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-arch-bronze text-white py-3 text-xs uppercase tracking-[0.2em] hover:bg-arch-bronze/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
