import "./allPhilly.css";
import { initAllPhillyEgg, openAllPhillyModal } from "./allPhilly.js";

let eggReady = false;

export const PHILLY_SITES = [
  {
    id: "nest",
    name: "The Nest",
    team: "Eagles",
    path: "/nest/",
    logo: "/logos/eagles.svg",
    accent: "#3ddc97",
  },
  {
    id: "sixers",
    name: "The Process",
    team: "Sixers",
    path: "/sixers/",
    logo: "/logos/sixers.svg",
    accent: "#006bb6",
  },
  {
    id: "flyers",
    name: "The Broad",
    team: "Flyers",
    path: "/flyers/",
    logo: "/logos/flyers.svg",
    accent: "#f74902",
  },
  {
    id: "phillies",
    name: "The Bank",
    team: "Phillies",
    path: "/phillies/",
    logo: "/logos/phillies.svg",
    accent: "#e81828",
  },
];

export function initLeagueNav(currentId) {
  const mount = document.querySelector("#leagueNav");
  if (!mount) return;

  const pills = PHILLY_SITES.map(
    (site) => `
    <a
      href="${site.path}"
      class="league-pill${site.id === currentId ? " is-here" : ""}"
      aria-current="${site.id === currentId ? "page" : "false"}"
      title="${site.team}"
    >
      <img src="${site.logo}" alt="" width="18" height="18" />
      <span class="league-pill-name">${site.name}</span>
    </a>
  `
  ).join("");

  mount.innerHTML = `
    <button
      class="league-all-philly${currentId === "hub" ? " is-here" : ""}"
      type="button"
      id="leagueAllPhilly"
      aria-label="Open ALL PHILLY rankings"
      title="ALL PHILLY — All-Time Top 10 & Hot List"
    >
      ALL PHILLY
    </button>
    <div class="league-pills">${pills}</div>
  `;

  mount.querySelector("#leagueAllPhilly")?.addEventListener("click", (event) => {
    event.preventDefault();
    openAllPhillyModal();
  });

  if (!eggReady) {
    initAllPhillyEgg();
    eggReady = true;
  }
}

export function initSharedChrome() {
  window.addEventListener("load", () => {
    const loader = document.querySelector("#loader");
    if (loader) setTimeout(() => loader.classList.add("is-gone"), 900);
  });

  const cursor = document.querySelector(".cursor");
  if (cursor) {
    window.addEventListener("pointermove", (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    });
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("pointerenter", () => cursor.classList.add("is-hot"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-hot"));
    });
  }

  const navToggle = document.querySelector("#navToggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}
