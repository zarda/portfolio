import { useEffect, useState } from 'react';
import type { LiveStatSource } from '../models';
import { getSolvedCount, readSolvedCache } from '../services/LeetCodeService';

/**
 * useLeetCodeSolved
 *
 * Returns a live LeetCode solved-problem count for a stat's `live` source.
 *
 * - Always called (one per stat) so Rules of Hooks hold; it does nothing and
 *   returns `{ value: null }` when `live` is absent or not a leetcode source.
 * - Paints the cached value instantly (stale-while-revalidate), then revalidates
 *   via `getSolvedCount`, which shares the in-flight request started by the
 *   startup prefetch — so the value is usually ready by the time this mounts.
 * - Falls back to `null` on any failure; the caller shows the static value.
 */
export interface LiveStatValue {
  value: number | null;
}

export function useLeetCodeSolved(live?: LiveStatSource): LiveStatValue {
  const username = live?.source === 'leetcode' ? live.username : undefined;

  const [value, setValue] = useState<number | null>(() =>
    username ? readSolvedCache(username) : null
  );

  useEffect(() => {
    if (!username) return;
    let active = true;

    const cached = readSolvedCache(username);
    if (cached != null) setValue(cached); // instant paint from cache

    getSolvedCount(username).then((count) => {
      if (active && count != null) setValue(count);
    });

    return () => {
      active = false;
    };
  }, [username]);

  return { value };
}
