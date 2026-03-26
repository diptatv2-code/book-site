'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DailyStat {
  date: string;
  total_visitors: number;
  unique_visitors: number;
  page_views: number;
}

interface CountryStat {
  country: string;
  visitor_count: number;
}

interface PageView {
  page_path: string;
  count: number;
}

interface FeedbackMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface StatsData {
  totalVisitors: number;
  todayVisitors: number;
  weekVisitors: number;
  monthVisitors: number;
  dailyStats: DailyStat[];
  countryStats: CountryStat[];
  pageViews: PageView[];
}

// --- Skeleton Components ---

function CardSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 animate-pulse">
      <div className="h-3 w-24 bg-[#2a2a2a] rounded mb-3" />
      <div className="h-8 w-16 bg-[#2a2a2a] rounded" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 animate-pulse">
      <div className="h-4 w-40 bg-[#2a2a2a] rounded mb-6" />
      <div className="h-72 bg-[#1a1a1a] rounded" />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 animate-pulse">
      <div className="h-4 w-32 bg-[#2a2a2a] rounded mb-4" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between py-3 border-b border-[#1a1a1a]">
          <div className="h-3 w-28 bg-[#2a2a2a] rounded" />
          <div className="h-3 w-12 bg-[#2a2a2a] rounded" />
        </div>
      ))}
    </div>
  );
}

function FeedbackSkeleton() {
  return (
    <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 animate-pulse">
      <div className="h-4 w-44 bg-[#2a2a2a] rounded mb-4" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="py-4 border-b border-[#1a1a1a]">
          <div className="h-3 w-40 bg-[#2a2a2a] rounded mb-2" />
          <div className="h-3 w-64 bg-[#2a2a2a] rounded mb-2" />
          <div className="h-3 w-48 bg-[#2a2a2a] rounded" />
        </div>
      ))}
    </div>
  );
}

// --- Custom Tooltip ---

interface TooltipPayloadEntry {
  value: number;
  name: string;
  color: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 shadow-xl">
      <p className="text-[#888] text-xs mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: <span className="font-semibold">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

// --- Main Dashboard ---

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [feedback, setFeedback] = useState<FeedbackMessage[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [statsRes, feedbackRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/feedback'),
      ]);

      if (statsRes.status === 401 || feedbackRes.status === 401) {
        router.push('/admin');
        return;
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (feedbackRes.ok) {
        const feedbackData = await feedbackRes.json();
        setFeedback(feedbackData.messages || []);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoadingStats(false);
      setLoadingFeedback(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin');
  };

  const overviewCards = [
    { label: 'Total Visitors', value: stats?.totalVisitors ?? 0, icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
    { label: 'Today', value: stats?.todayVisitors ?? 0, icon: 'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z' },
    { label: 'This Week', value: stats?.weekVisitors ?? 0, icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
    { label: 'This Month', value: stats?.monthVisitors ?? 0, icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
  ];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTimestamp = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#222] border border-[#333] rounded-lg text-sm text-[#ccc] transition-colors disabled:opacity-50"
            >
              <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 14.652" />
              </svg>
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-sm text-red-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats
              ? [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
              : overviewCards.map((card) => (
                  <div
                    key={card.label}
                    className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c9a84c]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#888]">{card.label}</span>
                      <svg className="w-5 h-5 text-[#c9a84c]/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                      </svg>
                    </div>
                    <p className="text-3xl font-bold text-[#c9a84c]">
                      {card.value.toLocaleString()}
                    </p>
                  </div>
                ))}
          </div>
        </section>

        {/* Daily Chart */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-4">
            Daily Visitors (Last 30 Days)
          </h2>
          {loadingStats ? (
            <ChartSkeleton />
          ) : (
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
              {stats && stats.dailyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart
                    data={stats.dailyStats.map((d) => ({
                      ...d,
                      dateLabel: formatDate(d.date),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                    <XAxis
                      dataKey="dateLabel"
                      stroke="#555"
                      tick={{ fill: '#888', fontSize: 12 }}
                      tickLine={{ stroke: '#333' }}
                    />
                    <YAxis
                      stroke="#555"
                      tick={{ fill: '#888', fontSize: 12 }}
                      tickLine={{ stroke: '#333' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="total_visitors"
                      name="Total Visitors"
                      stroke="#c9a84c"
                      strokeWidth={2}
                      dot={{ fill: '#c9a84c', r: 3, strokeWidth: 0 }}
                      activeDot={{ fill: '#c9a84c', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="unique_visitors"
                      name="Unique Visitors"
                      stroke="#6b8f4c"
                      strokeWidth={2}
                      dot={{ fill: '#6b8f4c', r: 3, strokeWidth: 0 }}
                      activeDot={{ fill: '#6b8f4c', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="page_views"
                      name="Page Views"
                      stroke="#4c7fc9"
                      strokeWidth={2}
                      dot={{ fill: '#4c7fc9', r: 3, strokeWidth: 0 }}
                      activeDot={{ fill: '#4c7fc9', r: 5, strokeWidth: 2, stroke: '#fff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-72 flex items-center justify-center text-[#555]">
                  No visitor data available yet
                </div>
              )}
              {stats && stats.dailyStats.length > 0 && (
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#1f1f1f]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#c9a84c]" />
                    <span className="text-xs text-[#888]">Total Visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#6b8f4c]" />
                    <span className="text-xs text-[#888]">Unique Visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4c7fc9]" />
                    <span className="text-xs text-[#888]">Page Views</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Two-column layout for Country & Page Views */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Country Stats */}
          <section>
            <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-4">
              Top Countries
            </h2>
            {loadingStats ? (
              <TableSkeleton />
            ) : (
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2a2a2a]">
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#888] uppercase tracking-wider">
                        Country
                      </th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-[#888] uppercase tracking-wider">
                        Visitors
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats && stats.countryStats.length > 0 ? (
                      stats.countryStats.map((row, i) => (
                        <tr
                          key={row.country}
                          className={`border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors ${
                            i === 0 ? 'bg-[#c9a84c]/5' : ''
                          }`}
                        >
                          <td className="px-6 py-3 text-sm text-[#ddd]">
                            <span className="flex items-center gap-2">
                              <span className="text-xs text-[#555] w-5">{i + 1}.</span>
                              {row.country}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-sm text-right">
                            <span className={i === 0 ? 'text-[#c9a84c] font-semibold' : 'text-[#aaa]'}>
                              {row.visitor_count.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-[#555] text-sm">
                          No country data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Page Views */}
          <section>
            <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-4">
              Page Views
            </h2>
            {loadingStats ? (
              <TableSkeleton />
            ) : (
              <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#2a2a2a]">
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#888] uppercase tracking-wider">
                        Page
                      </th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-[#888] uppercase tracking-wider">
                        Views
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats && stats.pageViews.length > 0 ? (
                      stats.pageViews.map((row, i) => (
                        <tr
                          key={row.page_path}
                          className={`border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors ${
                            i === 0 ? 'bg-[#c9a84c]/5' : ''
                          }`}
                        >
                          <td className="px-6 py-3 text-sm">
                            <code className="text-[#c9a84c]/80 bg-[#c9a84c]/5 px-2 py-0.5 rounded text-xs">
                              {row.page_path}
                            </code>
                          </td>
                          <td className="px-6 py-3 text-sm text-right">
                            <span className={i === 0 ? 'text-[#c9a84c] font-semibold' : 'text-[#aaa]'}>
                              {row.count.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-[#555] text-sm">
                          No page view data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        {/* Feedback Messages */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-[#888] uppercase tracking-wider mb-4">
            Feedback Messages
          </h2>
          {loadingFeedback ? (
            <FeedbackSkeleton />
          ) : (
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl overflow-hidden">
              {feedback.length > 0 ? (
                <div className="divide-y divide-[#1a1a1a]">
                  {feedback.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-6 hover:bg-[#1a1a1a] transition-colors ${
                        !msg.is_read ? 'border-l-2 border-l-[#c9a84c]' : 'border-l-2 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] text-sm font-semibold">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-sm font-medium text-white">{msg.name}</span>
                            <span className="text-xs text-[#666] ml-2">{msg.email}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!msg.is_read && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/20">
                              New
                            </span>
                          )}
                          <span className="text-xs text-[#555]">
                            {formatTimestamp(msg.created_at)}
                          </span>
                        </div>
                      </div>
                      <h3 className={`text-sm mb-1 ${!msg.is_read ? 'font-semibold text-white' : 'text-[#bbb]'}`}>
                        {msg.subject}
                      </h3>
                      <p className="text-sm text-[#888] leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-[#555]">
                  <svg className="w-12 h-12 mx-auto mb-3 text-[#333]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                  </svg>
                  <p className="text-sm">No feedback messages yet</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
