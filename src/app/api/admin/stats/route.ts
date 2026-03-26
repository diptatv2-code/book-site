import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const todayStart = `${todayStr}T00:00:00.000Z`;
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Counts from visitor_logs directly (always accurate)
    const { count: totalVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true });

    const { count: todayVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart);

    const { count: weekVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo);

    const { count: monthVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthAgo);

    // Daily stats: try the table first, fallback to computing from logs
    let dailyStats: Array<{ date: string; total_visitors: number; unique_visitors: number; page_views: number }> = [];

    const { data: dailyFromTable } = await supabaseAdmin
      .from('visitor_stats_daily')
      .select('*')
      .gte('date', new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (dailyFromTable && dailyFromTable.length > 0) {
      dailyStats = dailyFromTable;
    } else {
      // Compute from visitor_logs directly
      const { data: logs } = await supabaseAdmin
        .from('visitor_logs')
        .select('created_at, session_id')
        .gte('created_at', monthAgo)
        .order('created_at', { ascending: true });

      if (logs) {
        const byDate: Record<string, { total: number; sessions: Set<string> }> = {};
        for (const log of logs) {
          const date = log.created_at.split('T')[0];
          if (!byDate[date]) byDate[date] = { total: 0, sessions: new Set() };
          byDate[date].total++;
          byDate[date].sessions.add(log.session_id);
        }
        dailyStats = Object.entries(byDate).map(([date, d]) => ({
          date,
          total_visitors: d.total,
          unique_visitors: d.sessions.size,
          page_views: d.total,
        })).sort((a, b) => a.date.localeCompare(b.date));
      }
    }

    // Country stats: try table first, fallback to computing from logs
    let countryStats: Array<{ country: string; visitor_count: number }> = [];

    const { data: countryFromTable } = await supabaseAdmin
      .from('visitor_stats_country')
      .select('*')
      .order('visitor_count', { ascending: false })
      .limit(20);

    if (countryFromTable && countryFromTable.length > 0 && 
        !countryFromTable.every((c: { country: string }) => c.country === 'Unknown')) {
      countryStats = countryFromTable;
    } else {
      // Compute from visitor_logs
      const { data: countryLogs } = await supabaseAdmin
        .from('visitor_logs')
        .select('country');

      if (countryLogs) {
        const byCountry: Record<string, number> = {};
        for (const log of countryLogs) {
          const c = log.country || 'Unknown';
          byCountry[c] = (byCountry[c] || 0) + 1;
        }
        countryStats = Object.entries(byCountry)
          .map(([country, visitor_count]) => ({ country, visitor_count }))
          .sort((a, b) => b.visitor_count - a.visitor_count)
          .slice(0, 20);
      }
    }

    // Page views breakdown
    const { data: pageViewsRaw } = await supabaseAdmin
      .from('visitor_logs')
      .select('page_path');

    const pageViewsMap: Record<string, number> = {};
    if (pageViewsRaw) {
      for (const row of pageViewsRaw) {
        const path = row.page_path || '/';
        pageViewsMap[path] = (pageViewsMap[path] || 0) + 1;
      }
    }
    const pageViews = Object.entries(pageViewsMap)
      .map(([page_path, count]) => ({ page_path, count }))
      .sort((a, b) => b.count - a.count);

    return Response.json({
      totalVisitors: totalVisitors || 0,
      todayVisitors: todayVisitors || 0,
      weekVisitors: weekVisitors || 0,
      monthVisitors: monthVisitors || 0,
      dailyStats,
      countryStats,
      pageViews,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
