import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWikipediaSummary } from './wikipedia.service';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function jsonResponse(body: object, ok = true) {
  return { ok, json: () => Promise.resolve(body) };
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('fetchWikipediaSummary', () => {
  it('returns summary when "(film)" variant succeeds', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        type: 'standard',
        title: 'Fight Club (film)',
        extract: 'A 1999 film...',
        content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Fight_Club_(film)' } },
      }),
    );

    const result = await fetchWikipediaSummary('Fight Club');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://en.wikipedia.org/api/rest_v1/page/summary/Fight%20Club%20(film)',
    );
    expect(result).toEqual({
      title: 'Fight Club (film)',
      extract: 'A 1999 film...',
      pageUrl: 'https://en.wikipedia.org/wiki/Fight_Club_(film)',
    });
  });

  it('falls back to plain name when "(film)" returns 404', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    mockFetch.mockResolvedValueOnce(
      jsonResponse({
        type: 'standard',
        title: 'Inception',
        extract: 'A 2010 film...',
        content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Inception' } },
      }),
    );

    const result = await fetchWikipediaSummary('Inception');

    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(result?.title).toBe('Inception');
  });

  it('returns null when both attempts fail', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    mockFetch.mockResolvedValueOnce({ ok: false });

    const result = await fetchWikipediaSummary('Unknown Movie');

    expect(result).toBeNull();
  });

  it('returns null when response type is not standard or summary', async () => {
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ type: 'disambiguation' }),
    );
    mockFetch.mockResolvedValueOnce(
      jsonResponse({ type: 'disambiguation' }),
    );

    const result = await fetchWikipediaSummary('Something');

    expect(result).toBeNull();
  });

  it('handles network errors gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await fetchWikipediaSummary('Test');

    expect(result).toBeNull();
  });
});
