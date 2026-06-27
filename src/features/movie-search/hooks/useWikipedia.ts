import { useCallback, useState } from 'react';
import {
  fetchWikipediaSummary,
  type WikipediaSummary,
} from '../services/wikipedia.service';

export function useWikipedia() {
  const [summary, setSummary] = useState<WikipediaSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const lookup = useCallback(async (movieName: string) => {
    setLoading(true);
    setSummary(null);
    setError(false);

    try {
      const result = await fetchWikipediaSummary(movieName);
      setSummary(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setSummary(null);
    setError(false);
  }, []);

  return { summary, loading, error, lookup, clear };
}
