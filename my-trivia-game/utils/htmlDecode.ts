// utils/htmlDecode.ts

/**
 * Decodes HTML-encoded strings into readable text.
 *
 * The Open Trivia DB API returns text containing HTML entities
 * (e.g. &quot; instead of ", &amp; instead of &).
 * This function converts those entities back into normal characters.
 */
export function htmlDecode(input: string) {
  // Create a DOM document from the HTML-encoded string
  // The browser automatically parses and decodes HTML entities
  const doc = new DOMParser().parseFromString(input, 'text/html');

  // Extract and return the decoded text content
  // Fallback to an empty string if parsing fails
  return doc.documentElement.textContent || '';
}
