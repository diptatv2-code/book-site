import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    const { data: recentLogs } = await supabaseAdmin
      .from('visitor_logs')
      .select('session_id, country, page_path, created_at')
      .gte('created_at', fiveMinutesAgo)
      .order('created_at', { ascending: false });

    if (!recentLogs || recentLogs.length === 0) {
      return Response.json({ count: 0, visitors: [] });
    }

    // Group by session_id, keep the most recent entry per session
    const sessionMap = new Map<string, { country: string; page_path: string; last_seen: string }>();
    for (const log of recentLogs) {
      if (!sessionMap.has(log.session_id)) {
        sessionMap.set(log.session_id, {
          country: log.country,
          page_path: log.page_path,
          last_seen: log.created_at,
        });
      }
    }

    const visitors = Array.from(sessionMap.values());

    return Response.json({
      count: visitors.length,
      visitors,
    });
  } catch (error) {
    console.error('Live visitors error:', error);
    return Response.json({ error: 'Failed to fetch live visitors' }, { status: 500 });
  }
}
