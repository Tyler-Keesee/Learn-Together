import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { timingSafeEqual } from 'node:crypto';
import type { RequestHandler } from './$types';

function authorized(header: string | null, expected: string | undefined): boolean {
  if (!expected || !header?.startsWith('Bearer ')) return false;
  const supplied = Buffer.from(header.slice(7));
  const secret = Buffer.from(expected);
  return supplied.length === secret.length && timingSafeEqual(supplied, secret);
}

// Explicit manual administration only: a GET request must never mutate database schema.
export const POST: RequestHandler = async ({ request, fetch, url }) => {
  if (!authorized(request.headers.get('authorization'), env.MIGRATION_ADMIN_TOKEN)) {
    throw error(401, 'Unauthorized');
  }
  const response = await fetch(new URL('/api/supabase/migrate', url), {
    method: 'POST',
    headers: { authorization: request.headers.get('authorization') || '' }
  });
  return new Response(await response.text(), {
    status: response.status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
  });
};
