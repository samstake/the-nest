#!/usr/bin/env node
/**
 * Monthly hot-list helper. Run on the 1st of each month (or via GitHub Action):
 *   node scripts/update-hot-philly.mjs
 *
 * Copies the latest month's data forward if the new month file doesn't exist yet,
 * stamping updated metadata. Edit the new JSON file to reflect fresh rankings.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "public/data/hot-philly");

const now = new Date();
const month = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const label = `${monthNames[now.getUTCMonth()]} ${now.getUTCFullYear()}`;

mkdirSync(dataDir, { recursive: true });

const indexPath = join(dataDir, "index.json");
const index = existsSync(indexPath)
  ? JSON.parse(readFileSync(indexPath, "utf8"))
  : { latest: null, months: [] };

const targetPath = join(dataDir, `${month}.json`);

if (!existsSync(targetPath)) {
  const sourceMonth = index.latest;
  const sourcePath = sourceMonth ? join(dataDir, `${sourceMonth}.json`) : null;

  if (sourcePath && existsSync(sourcePath)) {
    const data = JSON.parse(readFileSync(sourcePath, "utf8"));
    data.month = month;
    data.updated = now.toISOString().slice(0, 10);
    data.label = label;
    writeFileSync(targetPath, `${JSON.stringify(data, null, 2)}\n`);
    console.log(`Created ${month}.json from ${sourceMonth}.json — edit rankings before deploy.`);
  } else {
    console.error("No prior hot-philly data to copy. Create a seed JSON first.");
    process.exit(1);
  }
} else {
  console.log(`${month}.json already exists.`);
}

index.latest = month;
index.months = [...new Set([...index.months, month])].sort();
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log(`Index updated. Latest: ${month}`);
