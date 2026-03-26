'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] px-4">
      <div className="w-full max-w-md">
        <div className="warm-card p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1B2A4A]/10 border border-[#1B2A4A]/20 mb-4">
              <svg
                className="w-8 h-8 text-[#1B2A4A]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#1B2A4A] font-heading">Admin Login</h1>
            <p className="text-[#6B5E56] text-sm mt-1 font-body">Sign in to access the dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center font-ui">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2C2420] mb-2 font-ui">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-white border border-[#EBE6E0] rounded-lg text-[#2C2420] placeholder-[#8A7E76] focus:outline-none focus:border-[#8B1A2B]/40 focus:ring-2 focus:ring-[#8B1A2B]/20 transition-all font-body"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2C2420] mb-2 font-ui">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border border-[#EBE6E0] rounded-lg text-[#2C2420] placeholder-[#8A7E76] focus:outline-none focus:border-[#8B1A2B]/40 focus:ring-2 focus:ring-[#8B1A2B]/20 transition-all font-body"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#8B1A2B] hover:bg-[#A63244] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-ui"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[#8A7E76] text-xs mt-6 font-ui">
          Protected admin area
        </p>
      </div>
    </div>
  );
}
