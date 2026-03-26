import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token?.value) {
      return false;
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return false;
    }

    const jwtSecret = `admin_secret_${adminPassword}`;
    jwt.verify(token.value, jwtSecret);
    return true;
  } catch {
    return false;
  }
}
