import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return Response.json(
        { success: false, message: 'All fields are required: name, email, subject, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const { error } = await supabase.from('feedback_messages').insert({
      name,
      email,
      subject,
      message,
      is_read: false,
    });

    if (error) {
      console.error('Feedback insert error:', error);
      return Response.json(
        { success: false, message: 'Failed to submit feedback. Please try again.' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Thank you for your feedback!',
    });
  } catch (error) {
    console.error('Feedback route error:', error);
    return Response.json(
      { success: false, message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
