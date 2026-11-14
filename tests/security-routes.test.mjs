import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read = path => fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
test('privileged database migrations are POST-only and authorized', () => {
  for (const path of [
    'src/routes/api/migrate/+server.ts',
    'src/routes/api/supabase/migrate/+server.ts'
  ]) {
    const src = read(path);
    assert.doesNotMatch(src, /export const GET\b/);
    assert.match(src, /export const POST\b/);
    assert.match(src, /assertMigrationAuthorized\(request\)/);
  }
});
test('migration guard fails closed and compares hashed tokens in constant time', () => {
  const src = read('src/lib/server/migrationGuard.ts');
  assert.match(src, /MIGRATION_ADMIN_TOKEN/);
  assert.match(src, /secret\.length < 32/);
  assert.match(src, /timingSafeEqual/);
  assert.match(src, /\$env\/dynamic\/private/);
});
