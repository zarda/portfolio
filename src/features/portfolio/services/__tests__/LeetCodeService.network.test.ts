import { describe, it, expect } from 'vitest';

/**
 * Opt-in live-network smoke check — skipped by default so CI stays deterministic.
 * Run with `RUN_LIVE_SMOKE=1 npm test` to detect the third-party LeetCode mirror
 * going down or losing its CORS header.
 */

const ENDPOINT = 'https://leetcode-api-faisalshohag.vercel.app/hengtai';

// setupTests preserves the real fetch (the global one is stubbed to block network).
const realFetch = (globalThis as unknown as { realFetch: typeof fetch }).realFetch;

describe.skipIf(!process.env.RUN_LIVE_SMOKE)('LeetCode mirror (live network smoke)', () => {
  it(
    'is reachable, CORS-readable, and returns a positive solved count',
    async () => {
      const response = await realFetch(ENDPOINT);
      expect(response.ok).toBe(true);
      expect(response.headers.get('access-control-allow-origin')).toBe('*');

      const data = (await response.json()) as { totalSolved?: number };
      expect(typeof data.totalSolved).toBe('number');
      expect(data.totalSolved as number).toBeGreaterThan(0);
    },
    20000 // real network through the proxy / cold start can be slow
  );
});
