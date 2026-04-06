import { dbQuery } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return Response.json(
        { success: false, message: 'All fields are required: name, email, subject, message' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    const result = await dbQuery('submit_feedback', { name, email, subject, message });

    if (result.error) {
      console.error('Feedback insert error:', result.error);
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
