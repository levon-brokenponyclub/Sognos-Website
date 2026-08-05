// Shared by KnowledgeHubArchive's ArticleCard and the homepage's post tiles.
const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

/** "2026-04-01" → "APR 1, 2026". Takes a Sanity `date` field value
 *  (plain "YYYY-MM-DD", no time/timezone component). */
export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${MONTHS[(month ?? 1) - 1]} ${day}, ${year}`;
}
