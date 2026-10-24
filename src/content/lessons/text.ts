/**
 * Count readable teaching tokens consistently in validation and public metadata.
 * Markdown delimiters and punctuation-only math/layout tokens are not words.
 */
export function countWords(text: string): number {
  return text
    .replace(/[`*_#>|]/g, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}
