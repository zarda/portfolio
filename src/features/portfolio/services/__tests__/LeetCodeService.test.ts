import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchSolvedCount } from '../LeetCodeService';

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
