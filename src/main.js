import "./styles.css";

const games = [
  { week: "WK 1", opponent: "Washington Commanders", logo: "/logos/commanders.svg", when: "Sun Sep 13 · 4:25 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 2", opponent: "Tennessee Titans", logo: "/logos/titans.svg", when: "Sun Sep 20 · 1:00 PM · FOX", loc: "away", tags: ["away"] },
  { week: "WK 3", opponent: "Chicago Bears", logo: "/logos/bears.svg", when: "Mon Sep 28 · 8:15 PM · ESPN", loc: "away", tags: ["away", "prime"] },
  { week: "WK 4", opponent: "Los Angeles Rams", logo: "/logos/rams.png", when: "Sun Oct 4 · 1:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 5", opponent: "Jacksonville Jaguars", logo: "/logos/jaguars.svg", when: "Sun Oct 11 · 9:30 AM · London", loc: "away", tags: ["away"] },
  { week: "WK 6", opponent: "Carolina Panthers", logo: "/logos/panthers.svg", when: "Sun Oct 18 · 1:00 PM · CBS", loc: "home", tags: ["home"] },
  { week: "WK 7", opponent: "Dallas Cowboys", logo: "/logos/cowboys.svg", when: "Mon Oct 26 · 8:15 PM · ESPN", loc: "home", tags: ["home", "prime"] },
  { week: "WK 8", opponent: "Washington Commanders", logo: "/logos/commanders.svg", when: "Sun Nov 1 · 8:20 PM · NBC", loc: "away", tags: ["away", "prime"] },
  { week: "WK 9", opponent: "New York Giants", logo: "/logos/giants.svg", when: "Sun Nov 8 · 1:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 10", opponent: "Bye week", logo: "", when: "Rest the wings", loc: "bye", tags: [] },
  { week: "WK 11", opponent: "Pittsburgh Steelers", logo: "/logos/steelers.svg", when: "Sun Nov 22 · 4:25 PM · CBS", loc: "home", tags: ["home"] },
  { week: "WK 12", opponent: "Dallas Cowboys", logo: "/logos/cowboys.svg", when: "Thu Nov 26 · 4:30 PM · FOX", loc: "away", tags: ["away", "prime"] },
  { week: "WK 13", opponent: "Arizona Cardinals", logo: "/logos/cardinals.svg", when: "Sun Dec 6 · 4:05 PM · FOX", loc: "away", tags: ["away"] },
  { week: "WK 14", opponent: "Indianapolis Colts", logo: "/logos/colts.svg", when: "Sun Dec 13 · 1:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 15", opponent: "Seattle Seahawks", logo: "/logos/seahawks.svg", when: "Sat Dec 19 · 5:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 16", opponent: "Houston Texans", logo: "/logos/texans.svg", when: "Thu Dec 24 · 8:15 PM · Prime", loc: "home", tags: ["home", "prime"] },
  { week: "WK 17", opponent: "San Francisco 49ers", logo: "/logos/49ers.svg", when: "Sun Jan 3 · 8:20 PM · NBC", loc: "away", tags: ["away", "prime"] },
  { week: "WK 18", opponent: "New York Giants", logo: "/logos/giants.svg", when: "Date TBD", loc: "away", tags: ["away"] },
];

const calls = {
  eagles: "E! A! G! L! E! S! EAGLES!",
  fly: "Fly, Eagles, Fly — on the road to victory.",
  birds: "GO BIRDS. The whole damn city.",
  shove: "Fourth and short. Brotherly Shove. First down.",
};

const gamesEl = document.querySelector("#games");
const filters = document.querySelectorAll(".filter");
const pads = document.querySelectorAll(".pad");
const chantOut = document.querySelector("#chantOut");
const loader = document.querySelector("#loader");
const cursor = document.querySelector(".cursor");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector(".nav-links");

function renderGames(filter = "all") {
  gamesEl.innerHTML = games
    .map((game) => {
      const hidden =
        filter !== "all" && !game.tags.includes(filter) ? " is-hidden" : "";
      const tag =
        game.loc === "bye"
          ? "BYE"
          : game.tags.includes("prime")
            ? game.loc === "home"
              ? "HOME · PRIME"
              : "ROAD · PRIME"
            : game.loc === "home"
              ? "HOME"
              : "ROAD";
      const mark = game.logo
        ? `<img class="game-logo" src="${game.logo}" alt="" />`
        : `<span class="game-logo game-logo-bye" aria-hidden="true"></span>`;
      return `
        <article class="game${hidden}" data-tags="${game.tags.join(" ")}">
          <p class="game-week">${game.week}</p>
          ${mark}
          <h3>${game.opponent}</h3>
          <p class="game-meta">${game.when}</p>
          <p class="game-tag">${tag}</p>
        </article>
      `;
    })
    .join("");
}

renderGames();

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-on"));
    btn.classList.add("is-on");
    renderGames(btn.dataset.filter);
  });
});

pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    pads.forEach((p) => p.classList.remove("is-hit"));
    pad.classList.add("is-hit");
    chantOut.textContent = calls[pad.dataset.call];
    document.body.animate(
      [
        { backgroundColor: "#07110f" },
        { backgroundColor: "#0b3d3a" },
        { backgroundColor: "#07110f" },
      ],
      { duration: 420, easing: "ease-out" }
    );
  });
});

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("is-gone"), 900);
});

window.addEventListener("pointermove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("pointerenter", () => cursor.classList.add("is-hot"));
  el.addEventListener("pointerleave", () => cursor.classList.remove("is-hot"));
});

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
