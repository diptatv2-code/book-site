import { dbQuery } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await dbQuery('cleanup_bots');

    if (result.error) {
      return Response.json({ error: 'Failed to clean up bots' }, { status: 500 });
    }

    return Response.json(result);
  } catch (error) {
    console.error('Bot cleanup error:', error);
    return Response.json({ error: 'Failed to clean up bots' }, { status: 500 });
  }
}
