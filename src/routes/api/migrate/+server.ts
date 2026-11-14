import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { assertMigrationAuthorized } from '$lib/server/migrationGuard';

// Compatibility alias; only explicit authorized POST can perform schema changes.
// The service-role key is never accepted from the request or sent to the browser.
export const POST: RequestHandler = async ({ request, fetch }) => {
  assertMigrationAuthorized(request);
  const response = await fetch('/api/supabase/migrate', {
    method: 'POST',
    headers: { 'x-migration-token': request.headers.get('x-migration-token') || '' },
  });
  if (!response.ok) {
    throw error(response.status, 'Migration failed.');
  }
  return json({ success: true, message: 'Migration completed successfully' });
};
