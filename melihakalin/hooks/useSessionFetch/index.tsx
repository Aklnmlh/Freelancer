import { headers } from 'next/headers';

export async function useSessionFetch(
  target: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: any
) {
  const data = await fetch(process.env.NEXT_PUBLIC_SITE_URL + target, {
    method,
    body: JSON.stringify(body),
    headers: headers(),
  });
  const parsed = await data.json();
  return parsed;
}
