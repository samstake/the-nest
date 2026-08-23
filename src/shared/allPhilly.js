export const ALL_PHILLY_TOP_10 = [
  {
    rank: 1,
    name: "Julius Erving",
    team: "Sixers",
    logo: "/logos/sixers.svg",
    note: "Dr. J transcended sport. ABA and NBA. The coolest athlete Philadelphia ever produced.",
  },
  {
    rank: 2,
    name: "Mike Schmidt",
    team: "Phillies",
    logo: "/logos/phillies.svg",
    note: "524 homers. Three MVPs. The standard for every Phillie who followed.",
  },
  {
    rank: 3,
    name: "Reggie White",
    team: "Eagles",
    logo: "/logos/eagles.svg",
    note: "Minister of Defense. 124 sacks in midnight green. Dominion on and off the field.",
  },
  {
    rank: 4,
    name: "Bobby Clarke",
    team: "Flyers",
    logo: "/logos/flyers.svg",
    note: "Two Cups as captain. The toothless heart of the Broad Street Bullies.",
  },
  {
    rank: 5,
    name: "Allen Iverson",
    team: "Sixers",
    logo: "/logos/sixers.svg",
    note: "MVP 2001. Changed culture. The Answer for a generation of Philly fans.",
  },
  {
    rank: 6,
    name: "Steve Carlton",
    team: "Phillies",
    logo: "/logos/phillies.svg",
    note: "Lefty. Four Cy Youngs. 329 wins. The mound belonged to him.",
  },
  {
    rank: 7,
    name: "Brian Dawkins",
    team: "Eagles",
    logo: "/logos/eagles.svg",
    note: "Weapon X. Four All-Pros. Fear in the secondary and love in the city.",
  },
  {
    rank: 8,
    name: "Bernie Parent",
    team: "Flyers",
    logo: "/logos/flyers.svg",
    note: "Two Vezinas. Two Cups. Only the Lord saves more than Bernie.",
  },
  {
    rank: 9,
    name: "Bryce Harper",
    team: "Phillies",
    logo: "/logos/phillies.svg",
    note: "Two MVPs. 2024 NLCS MVP. Chose Philly. Delivered October.",
  },
  {
    rank: 10,
    name: "Jalen Hurts",
    team: "Eagles",
    logo: "/logos/eagles.svg",
    note: "Super Bowl LIX MVP. Two NFC titles. The face of the new Eagles dynasty.",
  },
];

let buffer = "";
let modal;
let hotCache = null;

function typingTarget(node) {
  if (!node || node === document.body || node === document.documentElement) return false;
  const tag = node.tagName;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return true;
  if (node.isContentEditable) return true;
  return false;
}

function currentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

async function loadHotList() {
  if (hotCache?.month === currentMonthKey()) return hotCache;

  const month = currentMonthKey();

  try {
    let res = await fetch(`/data/hot-philly/${month}.json`);
    if (!res.ok) {
      const indexRes = await fetch("/data/hot-philly/index.json");
      if (!indexRes.ok) throw new Error("no index");
      const index = await indexRes.json();
      res = await fetch(`/data/hot-philly/${index.latest}.json`);
      if (!res.ok) throw new Error("no latest");
    }
    hotCache = await res.json();
    return hotCache;
  } catch {
    return null;
  }
}

function renderAllTimeList() {
  const list = modal.querySelector("#allPhillyList");
  list.innerHTML = ALL_PHILLY_TOP_10.map(
    (entry) => `
    <li class="all-philly-row">
      <span class="all-philly-rank">${entry.rank}</span>
      <img src="${entry.logo}" alt="" width="28" height="28" />
      <div>
        <strong>${entry.name}</strong>
        <span class="all-philly-team">${entry.team}</span>
        <p>${entry.note}</p>
      </div>
    </li>
  `
  ).join("");
}

function renderHotList(data) {
  const list = modal.querySelector("#hotPhillyList");
  const meta = modal.querySelector("#hotPhillyMeta");

  if (!data?.players?.length) {
    meta.textContent = "Hot list unavailable — check back soon.";
    list.innerHTML = "";
    return;
  }

  meta.textContent = `${data.label} · PVI rankings · Refreshed monthly`;

  list.innerHTML = data.players
    .map(
      (entry) => `
    <li class="all-philly-row hot-row${entry.inSeason ? " is-live" : ""}">
      <span class="all-philly-rank">${entry.rank}</span>
      <img src="${entry.logo}" alt="" width="28" height="28" />
      <div>
        <strong>${entry.name}</strong>
        <span class="all-philly-team">${entry.team}</span>
        <span class="hot-pvi">PVI ${entry.pvi}</span>
        ${entry.inSeason ? '<span class="hot-badge">In season</span>' : ""}
        <p>${entry.note}</p>
      </div>
    </li>
  `
    )
    .join("");
}

function setHotLoading() {
  modal.querySelector("#hotPhillyMeta").textContent = "Loading this month's hot list…";
  modal.querySelector("#hotPhillyList").innerHTML = "";
}

function ensureModal() {
  if (modal) return modal;
  modal = document.createElement("dialog");
  modal.className = "all-philly-modal";
  modal.id = "allPhillyModal";
  modal.innerHTML = `
    <button class="stat-close" type="button" data-close>Close</button>
    <p class="eyebrow">Easter egg unlocked</p>
    <h2>ALL PHILLY</h2>
    <p class="all-philly-lead">All-time legends vs. this month's hottest pros — four teams, one city.</p>
    <div class="all-philly-columns">
      <section class="all-philly-col">
        <h3 class="all-philly-col-title">All-Time Top 10</h3>
        <p class="all-philly-col-sub">Franchise legends across every era.</p>
        <ol class="all-philly-list" id="allPhillyList"></ol>
      </section>
      <section class="all-philly-col">
        <h3 class="all-philly-col-title">Hot List <span class="hot-flame" aria-hidden="true">🔥</span></h3>
        <p class="all-philly-col-sub" id="hotPhillyMeta">Loading…</p>
        <ol class="all-philly-list" id="hotPhillyList"></ol>
      </section>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector("[data-close]").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
  return modal;
}

async function renderLists() {
  renderAllTimeList();
  setHotLoading();
  const hot = await loadHotList();
  renderHotList(hot);
}

export function openAllPhillyModal() {
  ensureModal();
  renderLists();
  if (!modal.open) modal.showModal();
}

export function initAllPhillyEgg() {
  ensureModal();

  window.addEventListener("keydown", (event) => {
    if (document.querySelector("dialog[open]:not(#allPhillyModal)")) return;
    if (typingTarget(event.target)) return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    if (event.key === "Escape" && modal?.open) {
      modal.close();
      buffer = "";
      return;
    }

    if (event.key.length !== 1) return;
    buffer = (buffer + event.key.toLowerCase()).slice(-6);
    if (buffer === "philly") {
      event.preventDefault();
      buffer = "";
      openAllPhillyModal();
    }
  });
}
