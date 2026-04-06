import { dbQuery } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await dbQuery('get_feedback');

    if (result.error) {
      console.error('Feedback fetch error:', result.error);
      return Response.json({ error: 'Failed to fetch feedback messages' }, { status: 500 });
    }

    return Response.json({ messages: result.messages || [] });
  } catch (error) {
    console.error('Feedback route error:', error);
    return Response.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
