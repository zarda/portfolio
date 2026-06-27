import { useEffect, useState } from 'react';
import type { LiveStatSource } from '../models';
import { fetchSolvedCount } from '../services/LeetCodeService';

/**
 * useLeetCodeSolved
 *
 * Returns a live LeetCode solved-problem count for a stat's `live` source.
 *
 * - Always called (one per stat) so Rules of Hooks hold; it does nothing and
 *   returns `{ value: null }` when `live` is absent or not a leetcode source.
 * - Stale-while-revalidate: paints the cached value instantly, then revalidates
 *   in the background and updates state + cache. A fresh cache (< TTL) skips the
 *   network call entirely.
 * - Falls back to `null` on any failure; the caller shows the static value.
 */

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const cacheKey = (username: string) => `leetcode:${username}:solved`;

interface CacheEntry {
  value: number;
  ts: number;
}

function readCache(username: string): CacheEntry | null {
  try {
    const raw = localStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    return typeof parsed?.value === 'number' && typeof parsed?.ts === 'number' ? parsed : null;
  } catch {
    return null;
  }
}

function writeCache(username: string, value: number): void {
  try {
    localStorage.setItem(cacheKey(username), JSON.stringify({ value, ts: Date.now() }));
  } catch {
    // ignore storage errors (private mode / quota)
  }
}

export interface LiveStatValue {
  value: number | null;
}

export function useLeetCodeSolved(live?: LiveStatSource): LiveStatValue {
  const username = live?.source === 'leetcode' ? live.username : undefined;

  const [value, setValue] = useState<number | null>(() =>
    username ? (readCache(username)?.value ?? null) : null
  );

  useEffect(() => {
    if (!username) return;
    let active = true;

    const cached = readCache(username);
    if (cached) setValue(cached.value); // instant paint from cache
    if (cached && Date.now() - cached.ts < CACHE_TTL_MS) return; // still fresh

    fetchSolvedCount(username).then((count) => {
      if (!active || count == null) return;
      setValue(count);
      writeCache(username, count);
    });

    return () => {
      active = false;
    };
  }, [username]);

  return { value };
}
