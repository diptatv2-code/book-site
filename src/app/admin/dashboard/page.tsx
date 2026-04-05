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

interface LiveVisitor {
  country: string;
  page_path: string;
  last_seen: string;
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
    <div className="warm-card p-6 animate-pulse">
      <div className="h-3 w-24 bg-[#EBE6E0] rounded mb-3" />
      <div className="h-8 w-16 bg-[#EBE6E0] rounded" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="warm-card p-6 animate-pulse">
      <div className="h-4 w-40 bg-[#EBE6E0] rounded mb-6" />
      <div className="h-72 bg-[#FAF8F5] rounded" />
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="warm-card p-6 animate-pulse">
      <div className="h-4 w-32 bg-[#EBE6E0] rounded mb-4" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between py-3 border-b border-[#EBE6E0]">
          <div className="h-3 w-28 bg-[#EBE6E0] rounded" />
          <div className="h-3 w-12 bg-[#EBE6E0] rounded" />
        </div>
      ))}
    </div>
  );
}

function FeedbackSkeleton() {
  return (
    <div className="warm-card p-6 animate-pulse">
      <div className="h-4 w-44 bg-[#EBE6E0] rounded mb-4" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="py-4 border-b border-[#EBE6E0]">
          <div className="h-3 w-40 bg-[#EBE6E0] rounded mb-2" />
          <div className="h-3 w-64 bg-[#EBE6E0] rounded mb-2" />
          <div className="h-3 w-48 bg-[#EBE6E0] rounded" />
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
    <div className="bg-white border border-[#EBE6E0] rounded-lg px-4 py-3 shadow-lg">
      <p className="text-[#6B5E56] text-xs mb-1 font-ui">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-ui" style={{ color: entry.color }}>
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
  const [liveVisitors, setLiveVisitors] = useState<LiveVisitor[]>([]);
  const [liveCount, setLiveCount] = useState(0);

  const fetchLiveVisitors = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/live-visitors');
      if (res.ok) {
        const data = await res.json();
        setLiveCount(data.count);
        setLiveVisitors(data.visitors || []);
      }
    } catch (error) {
      console.error('Failed to fetch live visitors:', error);
    }
  }, []);

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
    fetchLiveVisitors();
    const interval = setInterval(fetchLiveVisitors, 30000);
    return () => clearInterval(interval);
  }, [fetchData, fetchLiveVisitors]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin');
  };

  const cardColors = ['text-[#8B1A2B]', 'text-[#1B2A4A]', 'text-[#C9A84C]', 'text-[#8B1A2B]'];

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
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#EBE6E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1B2A4A]/10 border border-[#1B2A4A]/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#1B2A4A]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-[#1B2A4A] font-heading">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#FAF8F5] border border-[#DDD5CC] rounded-lg text-sm text-[#2C2420] transition-colors disabled:opacity-50 font-ui"
            >
              <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M2.985 14.652" />
              </svg>
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1A2B]/10 hover:bg-[#8B1A2B]/15 border border-[#8B1A2B]/20 rounded-lg text-sm text-[#8B1A2B] transition-colors font-ui"
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
        {/* Live Now */}
        <section className="mb-8">
          <div className="warm-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-sm font-semibold text-green-700 font-ui">Live</span>
              <span className="text-2xl font-bold text-[#1B2A4A] font-heading">{liveCount}</span>
              <span className="text-sm text-[#6B5E56] font-ui">
                {liveCount === 1 ? 'active visitor' : 'active visitors'}
              </span>
            </div>
            {liveCount > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {liveVisitors.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#FAF8F5] rounded-lg px-4 py-3 border border-[#EBE6E0]">
                    <span className="text-sm text-[#2C2420] font-ui">{v.country}</span>
                    <span className="text-[#DDD5CC]">&middot;</span>
                    <code className="text-xs text-[#1B2A4A] bg-[#1B2A4A]/5 px-2 py-0.5 rounded font-mono truncate">
                      {v.page_path}
                    </code>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#8A7E76] font-body">No active visitors right now</p>
            )}
          </div>
        </section>

        {/* Overview Cards */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-[#6B5E56] uppercase tracking-wider mb-4 font-ui">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loadingStats
              ? [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
              : overviewCards.map((card, idx) => (
                  <div
                    key={card.label}
                    className="warm-card p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-[#6B5E56] font-ui">{card.label}</span>
                      <svg className="w-5 h-5 text-[#C9A84C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                      </svg>
                    </div>
                    <p className={`text-3xl font-bold font-heading ${cardColors[idx]}`}>
                      {card.value.toLocaleString()}
                    </p>
                  </div>
                ))}
          </div>
        </section>

        {/* Daily Chart */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-[#6B5E56] uppercase tracking-wider mb-4 font-ui">
            Daily Visitors (Last 30 Days)
          </h2>
          {loadingStats ? (
            <ChartSkeleton />
          ) : (
            <div className="warm-card p-6">
              {stats && stats.dailyStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart
                    data={stats.dailyStats.map((d) => ({
                      ...d,
                      dateLabel: formatDate(d.date),
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#C9A84C" strokeOpacity={0.2} />
                    <XAxis
                      dataKey="dateLabel"
                      stroke="#DDD5CC"
                      tick={{ fill: '#6B5E56', fontSize: 12 }}
                      tickLine={{ stroke: '#DDD5CC' }}
                    />
                    <YAxis
                      stroke="#DDD5CC"
                      tick={{ fill: '#6B5E56', fontSize: 12 }}
                      tickLine={{ stroke: '#DDD5CC' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="total_visitors"
                      name="Total Visitors"
                      stroke="#8B1A2B"
                      strokeWidth={2}
                      dot={{ fill: '#8B1A2B', r: 3, strokeWidth: 0 }}
                      activeDot={{ fill: '#8B1A2B', r: 5, strokeWidth: 2, stroke: '#FAF8F5' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="unique_visitors"
                      name="Unique Visitors"
                      stroke="#1B2A4A"
                      strokeWidth={2}
                      dot={{ fill: '#1B2A4A', r: 3, strokeWidth: 0 }}
                      activeDot={{ fill: '#1B2A4A', r: 5, strokeWidth: 2, stroke: '#FAF8F5' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="page_views"
                      name="Page Views"
                      stroke="#C9A84C"
                      strokeWidth={2}
                      dot={{ fill: '#C9A84C', r: 3, strokeWidth: 0 }}
                      activeDot={{ fill: '#C9A84C', r: 5, strokeWidth: 2, stroke: '#FAF8F5' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-72 flex items-center justify-center text-[#8A7E76] font-body">
                  No visitor data available yet
                </div>
              )}
              {stats && stats.dailyStats.length > 0 && (
                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#EBE6E0]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8B1A2B]" />
                    <span className="text-xs text-[#6B5E56] font-ui">Total Visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#1B2A4A]" />
                    <span className="text-xs text-[#6B5E56] font-ui">Unique Visitors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#C9A84C]" />
                    <span className="text-xs text-[#6B5E56] font-ui">Page Views</span>
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
            <h2 className="text-sm font-medium text-[#6B5E56] uppercase tracking-wider mb-4 font-ui">
              Top Countries
            </h2>
            {loadingStats ? (
              <TableSkeleton />
            ) : (
              <div className="warm-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#EBE6E0]">
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6B5E56] uppercase tracking-wider font-ui">
                        Country
                      </th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-[#6B5E56] uppercase tracking-wider font-ui">
                        Visitors
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats && stats.countryStats.length > 0 ? (
                      stats.countryStats.map((row, i) => (
                        <tr
                          key={row.country}
                          className={`border-b border-[#EBE6E0] transition-colors hover:bg-[#FAF8F5] ${
                            i % 2 === 0 ? 'bg-white' : 'bg-[#FDFCFA]'
                          }`}
                        >
                          <td className="px-6 py-3 text-sm text-[#2C2420] font-body">
                            <span className="flex items-center gap-2">
                              <span className="text-xs text-[#8A7E76] w-5 font-ui">{i + 1}.</span>
                              {row.country}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-sm text-right font-ui">
                            <span className={i === 0 ? 'text-[#8B1A2B] font-semibold' : 'text-[#6B5E56]'}>
                              {row.visitor_count.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-[#8A7E76] text-sm font-body">
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
            <h2 className="text-sm font-medium text-[#6B5E56] uppercase tracking-wider mb-4 font-ui">
              Page Views
            </h2>
            {loadingStats ? (
              <TableSkeleton />
            ) : (
              <div className="warm-card overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#EBE6E0]">
                      <th className="text-left px-6 py-3 text-xs font-medium text-[#6B5E56] uppercase tracking-wider font-ui">
                        Page
                      </th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-[#6B5E56] uppercase tracking-wider font-ui">
                        Views
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats && stats.pageViews.length > 0 ? (
                      stats.pageViews.map((row, i) => (
                        <tr
                          key={row.page_path}
                          className={`border-b border-[#EBE6E0] transition-colors hover:bg-[#FAF8F5] ${
                            i % 2 === 0 ? 'bg-white' : 'bg-[#FDFCFA]'
                          }`}
                        >
                          <td className="px-6 py-3 text-sm font-body">
                            <code className="text-[#1B2A4A] bg-[#1B2A4A]/5 px-2 py-0.5 rounded text-xs font-mono">
                              {row.page_path}
                            </code>
                          </td>
                          <td className="px-6 py-3 text-sm text-right font-ui">
                            <span className={i === 0 ? 'text-[#8B1A2B] font-semibold' : 'text-[#6B5E56]'}>
                              {row.count.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-[#8A7E76] text-sm font-body">
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
          <h2 className="text-sm font-medium text-[#6B5E56] uppercase tracking-wider mb-4 font-ui">
            Feedback Messages
          </h2>
          {loadingFeedback ? (
            <FeedbackSkeleton />
          ) : (
            <div className="space-y-4">
              {feedback.length > 0 ? (
                feedback.map((msg) => (
                  <div
                    key={msg.id}
                    className={`warm-card p-6 ${
                      !msg.is_read ? 'border-l-[3px] border-l-[#8B1A2B]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1B2A4A]/10 flex items-center justify-center text-[#1B2A4A] text-sm font-semibold font-ui">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-[#2C2420] font-ui">{msg.name}</span>
                          <span className="text-xs text-[#8A7E76] ml-2 font-ui">{msg.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!msg.is_read && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#8B1A2B]/10 text-[#8B1A2B] border border-[#8B1A2B]/20 font-ui">
                            New
                          </span>
                        )}
                        <span className="text-xs text-[#8A7E76] font-ui">
                          {formatTimestamp(msg.created_at)}
                        </span>
                      </div>
                    </div>
                    <h3 className={`text-sm mb-1 font-heading ${!msg.is_read ? 'font-semibold text-[#2C2420]' : 'text-[#6B5E56]'}`}>
                      {msg.subject}
                    </h3>
                    <p className="text-sm text-[#6B5E56] leading-relaxed font-body">{msg.message}</p>
                  </div>
                ))
              ) : (
                <div className="warm-card p-12 text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-[#DDD5CC]" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                  </svg>
                  <p className="text-sm text-[#8A7E76] font-body">No feedback messages yet</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
