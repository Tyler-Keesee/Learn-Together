import { createHash, timingSafeEqual } from 'node:crypto';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Administrative migrations are disabled unless explicitly configured on the server.
export function assertMigrationAuthorized(request: Request): void {
  const secret = env.MIGRATION_ADMIN_TOKEN;
  if (!secret || secret.length < 32) {
    throw error(503, 'Administrative migrations are disabled.');
  }
  const supplied = request.headers.get('x-migration-token') || '';
  const expectedHash = createHash('sha256').update(secret).digest();
  const receivedHash = createHash('sha256').update(supplied).digest();
  if (!timingSafeEqual(expectedHash, receivedHash)) {
    throw error(403, 'Forbidden');
  }
}
