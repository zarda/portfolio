/**
 * LeetCodeService
 *
 * Fetches a user's total solved-problem count from a CORS-enabled LeetCode
 * stats mirror so the value can be displayed live in the browser.
 *
 * The official `leetcode.com/graphql` endpoint does not send CORS headers, so a
 * public mirror is used. The base URL can be overridden via the
 * `VITE_LEETCODE_API` env var to swap mirrors without a code change.
 *
 * `getSolvedCount` is the entry point used by the app: it dedupes concurrent
 * callers (the startup prefetch and the component hook share one request) and
 * writes a localStorage cache so repeat visits paint instantly.
 */

const DEFAULT_ENDPOINT = 'https://leetcode-api-faisalshohag.vercel.app';
const REQUEST_TIMEOUT_MS = 8000;
const CACHE_PREFIX = 'leetcode:';
const cacheKey = (username: string) => `${CACHE_PREFIX}${username}:solved`;

/** API response shape (only the fields we read; mirrors vary slightly). */
interface LeetCodeStatsResponse {
  totalSolved?: number;
  solvedProblem?: number;
}

function getBaseUrl(): string {
  const override = import.meta.env?.VITE_LEETCODE_API;
  const base = typeof override === 'string' && override.length > 0 ? override : DEFAULT_ENDPOINT;
  return base.replace(/\/+$/, '');
}

/** Last-known solved count for `username` from localStorage, or null. */
export function readSolvedCache(username: string): number | null {
  try {
    const raw = localStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value?: unknown };
    return typeof parsed?.value === 'number' ? parsed.value : null;
  } catch {
    return null;
  }
}

function writeSolvedCache(username: string, value: number): void {
  try {
    localStorage.setItem(cacheKey(username), JSON.stringify({ value, ts: Date.now() }));
  } catch {
    // ignore storage errors (private mode / quota)
  }
}

/**
 * Fetch the total number of problems solved by `username`.
 * Returns the count, or `null` on any failure (network, non-200, bad body,
 * timeout) so callers can fall back gracefully.
 */
export async function fetchSolvedCount(username: string): Promise<number | null> {
  if (!username) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${getBaseUrl()}/${encodeURIComponent(username)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;

    const data = (await response.json()) as LeetCodeStatsResponse;
    const count = data.totalSolved ?? data.solvedProblem;
    return typeof count === 'number' && Number.isFinite(count) && count >= 0 ? count : null;
  } catch {
    // Aborted, offline, or malformed response — fall back to the static value.
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// In-flight requests per username so the startup prefetch and the hook that
// renders the stat share a single network call instead of firing two.
const inFlight = new Map<string, Promise<number | null>>();

/**
 * Get the solved count for `username`, deduping concurrent callers and caching
 * successful results. Safe to call eagerly (e.g. on app startup) to warm the
 * cache before the component that needs it mounts.
 */
export function getSolvedCount(username: string): Promise<number | null> {
  if (!username) return Promise.resolve(null);

  const existing = inFlight.get(username);
  if (existing) return existing;

  const request = fetchSolvedCount(username).then((count) => {
    if (count != null) writeSolvedCache(username, count);
    return count;
  });
  inFlight.set(username, request);
  // Clear once settled so a later visit revalidates instead of reusing a stale
  // resolved promise.
  void request.finally(() => inFlight.delete(username));
  return request;
}
