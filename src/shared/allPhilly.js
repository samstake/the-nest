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

function typingTarget(node) {
  if (!node || node === document.body || node === document.documentElement) return false;
  const tag = node.tagName;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return true;
  if (node.isContentEditable) return true;
  return false;
}

function ensureModal() {
  if (modal) return modal;
  modal = document.createElement("dialog");
  modal.className = "all-philly-modal";
  modal.id = "allPhillyModal";
  modal.innerHTML = `
    <button class="stat-close" type="button" data-close>Close</button>
    <p class="eyebrow">Easter egg unlocked</p>
    <h2>ALL PHILLY Top 10</h2>
    <p class="all-philly-lead">The greatest pros across Eagles, Sixers, Flyers, and Phillies — one city, ten legends.</p>
    <ol class="all-philly-list" id="allPhillyList"></ol>
  `;
  document.body.appendChild(modal);
  modal.querySelector("[data-close]").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
  return modal;
}

function renderList() {
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

export function openAllPhillyModal() {
  ensureModal();
  renderList();
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
