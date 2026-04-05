import { supabase, supabaseAdmin } from '@/lib/supabase';
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const pagePath = body.page_path || '/';

    // Vercel built-in geolocation headers — free, fast, always works
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = decodeURIComponent(request.headers.get('x-vercel-ip-city') || 'Unknown');
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || '';

    // Bot detection — filter before inserting
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

    const isBot = botPatterns.some(pattern => userAgent.toLowerCase().includes(pattern));
    if (isBot) {
      return Response.json({ success: true, filtered: 'bot' });
    }

    const sessionId = (await hashString(ip + userAgent)).slice(0, 32);

    // Insert visitor log
    await supabase.from('visitor_logs').insert({
      ip_address: ip,
      user_agent: userAgent,
      page_path: pagePath,
      country,
      city,
      session_id: sessionId,
      referrer,
    });

    // Upsert daily stats
    const today = new Date().toISOString().split('T')[0];

    const { data: existingDaily } = await supabaseAdmin
      .from('visitor_stats_daily')
      .select('*')
      .eq('date', today)
      .single();

    if (existingDaily) {
      const { count: sessionCount } = await supabaseAdmin
        .from('visitor_logs')
        .select('*', { count: 'exact', head: true })
        .eq('session_id', sessionId)
        .gte('created_at', `${today}T00:00:00.000Z`);

      const isNew = (sessionCount || 0) <= 1;

      await supabaseAdmin
        .from('visitor_stats_daily')
        .update({
          total_visitors: (existingDaily.total_visitors || 0) + 1,
          page_views: (existingDaily.page_views || 0) + 1,
          unique_visitors: isNew
            ? (existingDaily.unique_visitors || 0) + 1
            : existingDaily.unique_visitors || 0,
          updated_at: new Date().toISOString(),
        })
        .eq('date', today);
    } else {
      await supabaseAdmin.from('visitor_stats_daily').insert({
        date: today,
        total_visitors: 1,
        unique_visitors: 1,
        page_views: 1,
      });
    }

    // Upsert country stats
    if (country !== 'Unknown') {
      const { data: existingCountry } = await supabaseAdmin
        .from('visitor_stats_country')
        .select('*')
        .eq('country', country)
        .single();

      if (existingCountry) {
        await supabaseAdmin
          .from('visitor_stats_country')
          .update({
            visitor_count: (existingCountry.visitor_count || 0) + 1,
            last_visit: new Date().toISOString(),
          })
          .eq('country', country);
      } else {
        await supabaseAdmin.from('visitor_stats_country').insert({
          country,
          visitor_count: 1,
        });
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return Response.json({ success: true });
  }
}
