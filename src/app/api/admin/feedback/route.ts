import { supabaseAdmin } from '@/lib/supabase';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: messages, error } = await supabaseAdmin
      .from('feedback_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Feedback fetch error:', error);
      return Response.json(
        { error: 'Failed to fetch feedback messages' },
        { status: 500 }
      );
    }

    return Response.json({ messages: messages || [] });
  } catch (error) {
    console.error('Feedback route error:', error);
    return Response.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
