#!/usr/bin/env node
/**
 * Fetch player portrait thumbnails from Wikimedia Commons.
 *   node scripts/download-player-photos.mjs
 *
 * Uses direct URLs where known; falls back to Commons search API with rate limiting.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = join(root, "public/players");
const DELAY_MS = 1200;
const UA = "TheNest/1.0 (player-photo-fetch; contact: github.com/samstake/the-nest)";

/** @type {Record<string, Record<string, { search?: string; url?: string }>>} */
const players = {
  sixers: {
    embiid: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Joel_Embiid_2018.jpg/400px-Joel_Embiid_2018.jpg" },
    maxey: { search: "Tyrese Maxey 76ers" },
    lebron: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/LeBron_James_(51959977144)_%28cropped2%29.jpg/400px-LeBron_James_%2851959977144%29_%28cropped2%29.jpg" },
    brown: { search: "Jaylen Brown Celtics basketball" },
    drummond: { search: "Andre Drummond 76ers" },
    mccain: { search: "Jared McCain Duke basketball" },
    simons: { search: "Anfernee Simons Trail Blazers" },
    "caldwell-pope": { search: "Kentavious Caldwell-Pope Lakers" },
    grimes: { search: "Quentin Grimes Knicks" },
    edgecombe: { search: "VJ Edgecombe" },
    council: { search: "Ricky Council IV 76ers" },
    bona: { search: "Adem Bona UCLA basketball" },
    edwards: { search: "Justin Edwards Kentucky basketball" },
    walker: { search: "Jabari Walker Trail Blazers" },
    barlow: { search: "Dominick Barlow 76ers" },
  },
  flyers: {
    york: { search: "Cam York Philadelphia Flyers" },
    konecny: { search: "Travis Konecny Flyers" },
    zegras: { search: "Trevor Zegras Anaheim Ducks" },
    laughton: { search: "Scott Laughton Flyers" },
    tippett: { search: "Owen Tippett Flyers" },
    michkov: { search: "Matvei Michkov Flyers" },
    foerster: { search: "Tyson Foerster Flyers" },
    vladar: { search: "Dan Vladar Calgary Flames" },
    brink: { search: "Bobby Brink Flyers" },
    andrae: { search: "Emil Andrae Flyers" },
    deslauriers: { search: "Nicolas Deslauriers Flyers" },
    frost: { search: "Morgan Frost Flyers" },
    martone: { search: "Porter Martone" },
    risto: { search: "Rasmus Ristolainen Flyers" },
  },
  phillies: {
    harper: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Bryce_Harper%2C_Phillies.jpg/400px-Bryce_Harper%2C_Phillies.jpg" },
    nola: { search: "Aaron Nola Phillies" },
    realmuto: { search: "J.T. Realmuto Phillies" },
    turner: { search: "Trea Turner Phillies" },
    schwarber: { search: "Kyle Schwarber Phillies" },
    wheeler: { search: "Zack Wheeler Phillies" },
    stott: { search: "Bryson Stott Phillies" },
    bohm: { search: "Alec Bohm Phillies" },
    sanchez: { search: "Cristopher Sanchez Phillies" },
    castellanos: { search: "Nick Castellanos Phillies" },
    luzardo: { search: "Jesús Luzardo Marlins" },
    marsh: { search: "Brandon Marsh Phillies" },
    duran: { search: "Jhoan Durán Twins" },
    wilson: { search: "Garrett Wilson Yankees" },
    clemens: { search: "Kody Clemens Phillies" },
    rojas: { search: "Johan Rojas Phillies" },
  },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function wikiThumb(search, attempt = 0) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: search,
    gsrnamespace: "6",
    gsrlimit: "1",
    prop: "imageinfo",
    iiprop: "url",
    iiurlwidth: "400",
    format: "json",
  });
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { "User-Agent": UA },
  });
  const text = await res.text();
  if (text.startsWith("You are making too many requests")) {
    if (attempt >= 4) return null;
    await sleep(5000 * (attempt + 1));
    return wikiThumb(search, attempt + 1);
  }
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  const page = Object.values(data.query?.pages || {})[0];
  const info = page?.imageinfo?.[0];
  return info?.thumburl || info?.url || null;
}

async function resolveUrl(entry) {
  if (entry.url) return entry.url;
  if (entry.search) return wikiThumb(entry.search);
  return null;
}

async function download(team, id, entry) {
  const dir = join(outRoot, team);
  mkdirSync(dir, { recursive: true });
  const dest = join(dir, `${id}.jpg`);
  if (existsSync(dest) && readFileSync(dest).length > 5000) {
    console.log(`skip ${team}/${id}`);
    return `/players/${team}/${id}.jpg`;
  }
  const url = await resolveUrl(entry);
  if (!url) {
    console.warn(`no image: ${team}/${id}`);
    return null;
  }
  const clean = url.split("?")[0];
  const img = await fetch(clean, { headers: { "User-Agent": UA } });
  if (!img.ok) {
    console.warn(`fetch failed: ${team}/${id} (${img.status})`);
    return null;
  }
  const buf = Buffer.from(await img.arrayBuffer());
  if (buf.length < 3000) {
    console.warn(`too small: ${team}/${id}`);
    return null;
  }
  writeFileSync(dest, buf);
  console.log(`saved ${team}/${id}.jpg (${Math.round(buf.length / 1024)}KB)`);
  return `/players/${team}/${id}.jpg`;
}

function patchRoster(team, photoMap) {
  const path = join(root, "public/data/rosters", `${team}.json`);
  const data = JSON.parse(readFileSync(path, "utf8"));
  let count = 0;
  for (const player of data.players) {
    if (photoMap[player.id]) {
      player.photo = photoMap[player.id];
      count++;
    }
  }
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`patched ${team}.json (${count} photos)`);
}

for (const [team, ids] of Object.entries(players)) {
  const photoMap = {};
  for (const [id, entry] of Object.entries(ids)) {
    const photo = await download(team, id, entry);
    if (photo) photoMap[id] = photo;
    await sleep(DELAY_MS);
  }
  patchRoster(team, photoMap);
}

console.log("Done.");
