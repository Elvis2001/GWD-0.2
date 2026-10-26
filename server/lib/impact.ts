const BULLET_PREFIX = /^\s*(?:[-*•▪◦·]|\d+[.)])\s+/;

// Sentence end ("...outcomes. Students", "...planning.Take-home") but not
// abbreviations like "U.S." or decimals like "2.5".
const SENTENCE_BOUNDARY = /(?<=[a-z0-9)\]"'’”%])[.!?]+\s*(?=["“]?[A-Z])/;

// List-style comma ("Remi Education, Reinforced ...", "attendance, 1 Pre-test")
// but not thousands separators like "1,200".
const LIST_COMMA = /,\s+(?=["“]?[A-Z0-9])/;

// Run-on "label: value" stats ("Attendance: 54 Students Who Attempted: 34/54").
const STAT_BOUNDARY = /(?<=:\s*[\d/+%]+)\s+(?=[A-Z])/;

function cleanPoint(point: string): string {
  const cleaned = point
    .replace(BULLET_PREFIX, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim()
    .replace(/[.,;:]+$/, "")
    .trim();

  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/**
 * Turns a free-text impact report into display-ready bullet points.
 * Admins can write one point per line; older reports written as a single
 * paragraph are split on semicolons, sentence ends and list-style commas.
 */
export function parseImpactPoints(report: string | null | undefined): string[] {
  if (!report || !report.trim()) return [];

  const lines = report.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const chunks =
    lines.length > 1
      ? lines
      : report
          .replace(/[ \t]+([.,;:!?])/g, "$1")
          .split(/;/)
          .flatMap((part) => part.split(SENTENCE_BOUNDARY))
          .flatMap((part) => part.split(LIST_COMMA))
          .flatMap((part) => part.split(STAT_BOUNDARY));

  return chunks.map(cleanPoint).filter((point) => point.length > 0);
}
