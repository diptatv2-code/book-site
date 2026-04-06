const API_URL = process.env.DB_API_URL;
const API_SECRET = process.env.DB_API_SECRET;

export async function dbQuery(action: string, data?: Record<string, unknown>) {
  const url = `${API_URL}?action=${action}`;
  const res = await fetch(url, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Secret': API_SECRET || '',
    },
    body: data ? JSON.stringify(data) : undefined,
    cache: 'no-store',
  });
  return res.json();
}
