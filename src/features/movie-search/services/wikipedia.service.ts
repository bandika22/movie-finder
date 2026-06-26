const SUMMARY_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';

export type WikipediaSummary = {
  title: string;
  extract: string;
  pageUrl: string;
};

export async function fetchWikipediaSummary(
  movieName: string,
): Promise<WikipediaSummary | null> {
  const candidates = [`${movieName} (film)`, movieName];

  for (const title of candidates) {
    try {
      const response = await fetch(
        `${SUMMARY_API}/${encodeURIComponent(title)}`,
      );

      if (!response.ok) continue;

      const data = await response.json();

      if (data.type === 'standard' || data.type === 'summary') {
        return {
          title: data.title,
          extract: data.extract,
          pageUrl: data.content_urls?.desktop?.page ?? '',
        };
      }
    } catch {
      continue;
    }
  }

  return null;
}
