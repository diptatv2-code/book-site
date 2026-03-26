import { supabase } from '@/lib/supabase';
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

    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0]?.trim() || realIp || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const sessionId = (await hashString(ip + userAgent)).slice(0, 32);

    let country = 'Unknown';
    let city = 'Unknown';

    try {
      const geoRes = await fetch(`http://ip-api.com/json/${ip}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData.status === 'success') {
          country = geoData.country || 'Unknown';
          city = geoData.city || 'Unknown';
        }
      }
    } catch {
      // Geolocation lookup failed, use defaults
    }

    // Insert visitor log
    await supabase.from('visitor_logs').insert({
      ip_address: ip,
      user_agent: userAgent,
      page_path: pagePath,
      country,
      city,
      session_id: sessionId,
    });

    // Get today's date string
    const today = new Date().toISOString().split('T')[0];

    // Check if this session_id already visited today
    const { count: existingSessionCount } = await supabase
      .from('visitor_logs')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionId)
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lte('created_at', `${today}T23:59:59.999Z`);

    const isNewSession = (existingSessionCount || 0) <= 1;

    // Upsert daily stats
    const { data: existingDaily } = await supabase
      .from('visitor_stats_daily')
      .select('*')
      .eq('date', today)
      .single();

    if (existingDaily) {
      const updateData: Record<string, number> = {
        total_visitors: (existingDaily.total_visitors || 0) + 1,
        page_views: (existingDaily.page_views || 0) + 1,
      };
      if (isNewSession) {
        updateData.unique_visitors = (existingDaily.unique_visitors || 0) + 1;
      }
      await supabase
        .from('visitor_stats_daily')
        .update(updateData)
        .eq('date', today);
    } else {
      await supabase.from('visitor_stats_daily').insert({
        date: today,
        total_visitors: 1,
        unique_visitors: 1,
        page_views: 1,
      });
    }

    // Upsert country stats
    const { data: existingCountry } = await supabase
      .from('visitor_stats_country')
      .select('*')
      .eq('country', country)
      .single();

    if (existingCountry) {
      await supabase
        .from('visitor_stats_country')
        .update({ visitor_count: (existingCountry.visitor_count || 0) + 1 })
        .eq('country', country);
    } else {
      await supabase.from('visitor_stats_country').insert({
        country,
        visitor_count: 1,
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    // Don't fail the request even if tracking errors occur
    return Response.json({ success: true });
  }
}
