import { dbQuery } from '@/lib/db';
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

    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = decodeURIComponent(request.headers.get('x-vercel-ip-city') || 'Unknown');
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'Unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || '';

    // Bot detection
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

    await dbQuery('track_visitor', {
      ip_address: ip,
      user_agent: userAgent,
      page_path: pagePath,
      country,
      city,
      session_id: sessionId,
      referrer,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return Response.json({ success: true });
  }
}
