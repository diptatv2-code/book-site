import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return Response.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (email !== adminEmail || password !== adminPassword) {
      return Response.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create JWT token signed with a secret derived from admin password
    const jwtSecret = `admin_secret_${adminPassword}`;
    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Set httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
