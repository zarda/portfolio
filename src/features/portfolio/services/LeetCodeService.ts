/**
 * LeetCodeService
 *
 * Fetches a user's total solved-problem count from a CORS-enabled LeetCode
 * stats mirror so the value can be displayed live in the browser.
 *
 * The official `leetcode.com/graphql` endpoint does not send CORS headers, so a
 * public mirror is used. The base URL can be overridden via the
 * `VITE_LEETCODE_API` env var to swap mirrors without a code change.
 */

const DEFAULT_ENDPOINT = 'https://leetcode-api-faisalshohag.vercel.app';
const REQUEST_TIMEOUT_MS = 6000;

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
