import { useCallback, useState } from 'react';
import {
  fetchWikipediaSummary,
  type WikipediaSummary,
} from '../services/wikipedia.service';

export function useWikipedia() {
  const [summary, setSummary] = useState<WikipediaSummary | null>(null);
  const [loading, setLoading] = useState(false);

  const lookup = useCallback(async (movieName: string) => {
    setLoading(true);
    setSummary(null);

    try {
      const result = await fetchWikipediaSummary(movieName);
      setSummary(result);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setSummary(null);
  }, []);

  return { summary, loading, lookup, clear };
}
