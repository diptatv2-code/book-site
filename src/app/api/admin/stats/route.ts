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

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekAgoStr = weekAgo.toISOString();

    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const monthAgoStr = monthAgo.toISOString();

    // Total visitors (all time)
    const { count: totalVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true });

    // Today's visitors
    const { count: todayVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart);

    // This week's visitors
    const { count: weekVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgoStr);

    // This month's visitors
    const { count: monthVisitors } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthAgoStr);

    // Daily stats - last 30 days
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    const { data: dailyStats } = await supabaseAdmin
      .from('visitor_stats_daily')
      .select('*')
      .gte('date', thirtyDaysAgo)
      .order('date', { ascending: true });

    // Country stats - top 20
    const { data: countryStats } = await supabaseAdmin
      .from('visitor_stats_country')
      .select('*')
      .order('visitor_count', { ascending: false })
      .limit(20);

    // Page views breakdown
    const { data: pageViewsRaw } = await supabaseAdmin
      .from('visitor_logs')
      .select('page_path');

    // Group page views by path
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
      dailyStats: dailyStats || [],
      countryStats: countryStats || [],
      pageViews,
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
