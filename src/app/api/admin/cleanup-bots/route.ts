import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const botPatterns = [
  'bot', 'crawl', 'spider', 'slurp', 'bingbot', 'googlebot', 'yandex',
  'baidu', 'duckduckbot', 'facebookexternalhit', 'twitterbot', 'linkedinbot',
  'whatsapp', 'telegram', 'pinterest', 'semrush', 'ahref', 'mj12bot',
  'dotbot', 'petalbot', 'bytespider', 'gptbot', 'claudebot', 'anthropic',
  'applebot', 'archive.org', 'uptimerobot', 'pingdom', 'statuspage',
  'headlesschrome', 'phantomjs', 'selenium', 'puppeteer', 'playwright',
  'lighthouse', 'pagespeed', 'gtmetrix', 'curl', 'wget', 'python-requests',
  'go-http-client', 'java/', 'ruby/', 'perl/', 'php/',
];

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Build OR filter for all bot patterns
    const orFilter = botPatterns.map(p => `user_agent.ilike.%${p}%`).join(',');

    // Count bot rows before deleting
    const { count: botCount } = await supabaseAdmin
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .or(orFilter);

    // Delete bot rows
    await supabaseAdmin
      .from('visitor_logs')
      .delete()
      .or(orFilter);

    // Recalculate visitor_stats_daily from clean data
    await supabaseAdmin.from('visitor_stats_daily').delete().gte('date', '2000-01-01');

    const { data: logs } = await supabaseAdmin
      .from('visitor_logs')
      .select('created_at, session_id')
      .order('created_at', { ascending: true });

    if (logs && logs.length > 0) {
      const byDate: Record<string, { total: number; sessions: Set<string> }> = {};
      for (const log of logs) {
        const date = log.created_at.split('T')[0];
        if (!byDate[date]) byDate[date] = { total: 0, sessions: new Set() };
        byDate[date].total++;
        byDate[date].sessions.add(log.session_id);
      }

      const dailyRows = Object.entries(byDate).map(([date, d]) => ({
        date,
        total_visitors: d.total,
        unique_visitors: d.sessions.size,
        page_views: d.total,
      }));

      await supabaseAdmin.from('visitor_stats_daily').upsert(dailyRows, { onConflict: 'date' });
    }

    // Recalculate visitor_stats_country from clean data
    await supabaseAdmin.from('visitor_stats_country').delete().neq('country', '');

    const { data: countryLogs } = await supabaseAdmin
      .from('visitor_logs')
      .select('country');

    if (countryLogs && countryLogs.length > 0) {
      const byCountry: Record<string, number> = {};
      for (const log of countryLogs) {
        const c = log.country || 'Unknown';
        byCountry[c] = (byCountry[c] || 0) + 1;
      }

      const countryRows = Object.entries(byCountry).map(([country, visitor_count]) => ({
        country,
        visitor_count,
        last_visit: new Date().toISOString(),
      }));

      await supabaseAdmin.from('visitor_stats_country').upsert(countryRows, { onConflict: 'country' });
    }

    return Response.json({
      success: true,
      removed: botCount || 0,
      message: `Removed ${botCount || 0} bot entries and recalculated stats`,
    });
  } catch (error) {
    console.error('Bot cleanup error:', error);
    return Response.json({ error: 'Failed to clean up bots' }, { status: 500 });
  }
}
