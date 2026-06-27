import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchSolvedCount, getSolvedCount, readSolvedCache } from '../LeetCodeService';

function mockFetch(impl: () => Promise<unknown> | unknown) {
  const fn = vi.fn((..._args: unknown[]) => Promise.resolve(impl()));
  vi.stubGlobal('fetch', fn);
  return fn;
}

const ok = (body: unknown) => ({ ok: true, json: async () => body });

describe('fetchSolvedCount', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns totalSolved from a valid response', async () => {
    mockFetch(() => ok({ totalSolved: 903 }));
    expect(await fetchSolvedCount('hengtai')).toBe(903);
  });

  it('falls back to solvedProblem when totalSolved is absent', async () => {
    mockFetch(() => ok({ solvedProblem: 500 }));
    expect(await fetchSolvedCount('hengtai')).toBe(500);
  });

  it('requests the username on the configured endpoint', async () => {
    const fn = mockFetch(() => ok({ totalSolved: 1 }));
    await fetchSolvedCount('hengtai');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(String(fn.mock.calls[0][0])).toContain('/hengtai');
  });

  it('returns null on a non-200 response', async () => {
    mockFetch(() => ({ ok: false, json: async () => ({}) }));
    expect(await fetchSolvedCount('hengtai')).toBeNull();
  });

  it('returns null when the body has no usable count', async () => {
    mockFetch(() => ok({ totalSolved: 'oops' }));
    expect(await fetchSolvedCount('hengtai')).toBeNull();
  });

  it('returns null when the request rejects (network/abort)', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('network'))));
    expect(await fetchSolvedCount('hengtai')).toBeNull();
  });

  it('returns null and does not fetch for an empty username', async () => {
    const fn = mockFetch(() => ok({ totalSolved: 903 }));
    expect(await fetchSolvedCount('')).toBeNull();
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('getSolvedCount (dedup + cache)', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('returns the count and writes it to the cache', async () => {
    mockFetch(() => ok({ totalSolved: 903 }));
    expect(await getSolvedCount('hengtai')).toBe(903);
    expect(readSolvedCache('hengtai')).toBe(903);
  });

  it('dedupes concurrent callers into a single request', async () => {
    const fn = mockFetch(() => ok({ totalSolved: 903 }));
    const [a, b] = await Promise.all([getSolvedCount('hengtai'), getSolvedCount('hengtai')]);
    expect(a).toBe(903);
    expect(b).toBe(903);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('returns null and does not cache on failure', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('offline'))));
    expect(await getSolvedCount('hengtai')).toBeNull();
    expect(readSolvedCache('hengtai')).toBeNull();
  });

  it('readSolvedCache returns null when nothing is cached', () => {
    expect(readSolvedCache('nobody')).toBeNull();
  });
});
