import fs from "fs";
import path from "path";

function escapeCell(value: string): string {
  const str = String(value ?? "");
  // Wrap in quotes if contains comma, quote, or newline
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function appendToCsv(filename: string, row: Record<string, string>): void {
  const dir = path.join(process.cwd(), "data");
  const filePath = path.join(dir, filename);

  const headers = Object.keys(row);
  const values = headers.map((h) => escapeCell(row[h]));

  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, headers.map(escapeCell).join(",") + "\n", "utf8");
  }

  fs.appendFileSync(filePath, values.join(",") + "\n", "utf8");
}
