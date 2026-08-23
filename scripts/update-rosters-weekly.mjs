#!/usr/bin/env node
/**
 * Weekly roster metadata bump. Run via GitHub Action or:
 *   node scripts/update-rosters-weekly.mjs
 *
 * Stamps `updated` on all roster JSON files. On the first week of a new month,
 * also rolls `starMonth` forward so editors can refresh gold-name stars.
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "public/data/rosters");

const now = new Date();
const today = now.toISOString().slice(0, 10);
const month = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
const isNewMonthWeek = now.getUTCDate() <= 7;

const indexPath = join(dataDir, "index.json");
const index = existsSync(indexPath)
  ? JSON.parse(readFileSync(indexPath, "utf8"))
  : { teams: ["nest", "sixers", "flyers", "phillies"], updated: today };

for (const team of index.teams) {
  const path = join(dataDir, `${team}.json`);
  if (!existsSync(path)) {
    console.warn(`Missing ${team}.json — skip`);
    continue;
  }
  const data = JSON.parse(readFileSync(path, "utf8"));
  data.updated = today;
  if (isNewMonthWeek && data.starMonth !== month) {
    console.log(`${team}: starMonth ${data.starMonth || "?"} → ${month} (edit stars array)`);
    data.starMonth = month;
  }
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Updated ${team}.json (${today})`);
}

index.updated = today;
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);
console.log("Roster index stamped.");
