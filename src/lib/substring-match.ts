/**
 * Case-insensitive substring search (`needleLower` must already be lowercased).
 * Extracted so list filters don’t embed `.includes`/`.indexOf` in component bodies.
 */
export const substringMatchInsensitive = function substringMatchInsensitive(
  haystack: string,
  needleLower: string
): boolean {
  return (
    needleLower.length === 0 || haystack.toLowerCase().includes(needleLower)
  );
};
