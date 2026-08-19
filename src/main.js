import "./styles.css";

const games = [
  { week: "WK 1", opponent: "Washington Commanders", opp: "commanders", logo: "/logos/commanders.svg", when: "Sun Sep 13 · 4:25 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 2", opponent: "Tennessee Titans", opp: "titans", logo: "/logos/titans.svg", when: "Sun Sep 20 · 1:00 PM · FOX", loc: "away", tags: ["away"] },
  { week: "WK 3", opponent: "Chicago Bears", opp: "bears", logo: "/logos/bears.svg", when: "Mon Sep 28 · 8:15 PM · ESPN", loc: "away", tags: ["away", "prime"] },
  { week: "WK 4", opponent: "Los Angeles Rams", opp: "rams", logo: "/logos/rams.png", when: "Sun Oct 4 · 1:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 5", opponent: "Jacksonville Jaguars", opp: "jaguars", logo: "/logos/jaguars.svg", when: "Sun Oct 11 · 9:30 AM · London", loc: "away", tags: ["away"] },
  { week: "WK 6", opponent: "Carolina Panthers", opp: "panthers", logo: "/logos/panthers.svg", when: "Sun Oct 18 · 1:00 PM · CBS", loc: "home", tags: ["home"] },
  { week: "WK 7", opponent: "Dallas Cowboys", opp: "cowboys", logo: "/logos/cowboys.svg", when: "Mon Oct 26 · 8:15 PM · ESPN", loc: "home", tags: ["home", "prime"] },
  { week: "WK 8", opponent: "Washington Commanders", opp: "commanders", logo: "/logos/commanders.svg", when: "Sun Nov 1 · 8:20 PM · NBC", loc: "away", tags: ["away", "prime"] },
  { week: "WK 9", opponent: "New York Giants", opp: "giants", logo: "/logos/giants.svg", when: "Sun Nov 8 · 1:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 10", opponent: "Bye week", opp: "", logo: "", when: "Rest the wings", loc: "bye", tags: [] },
  { week: "WK 11", opponent: "Pittsburgh Steelers", opp: "steelers", logo: "/logos/steelers.svg", when: "Sun Nov 22 · 4:25 PM · CBS", loc: "home", tags: ["home"] },
  { week: "WK 12", opponent: "Dallas Cowboys", opp: "cowboys", logo: "/logos/cowboys.svg", when: "Thu Nov 26 · 4:30 PM · FOX", loc: "away", tags: ["away", "prime"] },
  { week: "WK 13", opponent: "Arizona Cardinals", opp: "cardinals", logo: "/logos/cardinals.svg", when: "Sun Dec 6 · 4:05 PM · FOX", loc: "away", tags: ["away"] },
  { week: "WK 14", opponent: "Indianapolis Colts", opp: "colts", logo: "/logos/colts.svg", when: "Sun Dec 13 · 1:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 15", opponent: "Seattle Seahawks", opp: "seahawks", logo: "/logos/seahawks.svg", when: "Sat Dec 19 · 5:00 PM · FOX", loc: "home", tags: ["home"] },
  { week: "WK 16", opponent: "Houston Texans", opp: "texans", logo: "/logos/texans.svg", when: "Thu Dec 24 · 8:15 PM · Prime", loc: "home", tags: ["home", "prime"] },
  { week: "WK 17", opponent: "San Francisco 49ers", opp: "49ers", logo: "/logos/49ers.svg", when: "Sun Jan 3 · 8:20 PM · NBC", loc: "away", tags: ["away", "prime"] },
  { week: "WK 18", opponent: "New York Giants", opp: "giants", logo: "/logos/giants.svg", when: "Date TBD", loc: "away", tags: ["away"] },
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
      const clickable = game.opp ? " is-match" : "";
      return `
        <article class="game${hidden}${clickable}" data-tags="${game.tags.join(" ")}" data-opp="${game.opp}" ${game.opp ? `tabindex="0" role="button" aria-label="Recent results versus ${game.opponent}"` : ""}>
          <p class="game-week">${game.week}</p>
          ${mark}
          <h3>${game.opponent}</h3>
          <p class="game-meta">${game.when}</p>
          <p class="game-tag">${tag}${game.opp ? " · results" : ""}</p>
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

const rivalResults = {
  commanders: {
    name: "Washington Commanders",
    logo: "/logos/commanders.svg",
    series: "Last six meetings",
    games: [
      { date: "Jan 4, 2026 · Home", note: "Week 18", score: "17–24", wl: "L" },
      { date: "Dec 20, 2025 · Road", note: "Regular season", score: "29–18", wl: "W" },
      { date: "Jan 26, 2025 · Home", note: "NFC Championship", score: "55–23", wl: "W" },
      { date: "Dec 22, 2024 · Road", note: "Regular season", score: "33–36", wl: "L" },
      { date: "Nov 14, 2024 · Home", note: "Regular season", score: "26–18", wl: "W" },
      { date: "Oct 29, 2023 · Road", note: "Regular season", score: "38–31", wl: "W" },
    ],
  },
  titans: {
    name: "Tennessee Titans",
    logo: "/logos/titans.svg",
    series: "Most recent meeting",
    games: [
      { date: "Dec 4, 2022 · Home", note: "Regular season", score: "35–10", wl: "W" },
    ],
  },
  bears: {
    name: "Chicago Bears",
    logo: "/logos/bears.svg",
    series: "Last two meetings",
    games: [
      { date: "Nov 28, 2025 · Home", note: "Black Friday", score: "15–24", wl: "L" },
      { date: "Dec 18, 2022 · Road", note: "Regular season", score: "25–20", wl: "W" },
    ],
  },
  rams: {
    name: "Los Angeles Rams",
    logo: "/logos/rams.png",
    series: "Last four meetings",
    games: [
      { date: "Sep 21, 2025 · Home", note: "Regular season", score: "33–26", wl: "W" },
      { date: "Jan 19, 2025 · Home", note: "NFC Divisional", score: "28–22", wl: "W" },
      { date: "Nov 24, 2024 · Road", note: "Regular season", score: "37–20", wl: "W" },
      { date: "Oct 8, 2023 · Road", note: "Regular season", score: "23–14", wl: "W" },
    ],
  },
  jaguars: {
    name: "Jacksonville Jaguars",
    logo: "/logos/jaguars.svg",
    series: "Last three meetings",
    games: [
      { date: "Nov 3, 2024 · Home", note: "Regular season", score: "28–23", wl: "W" },
      { date: "Oct 2, 2022 · Home", note: "Regular season", score: "29–21", wl: "W" },
      { date: "Oct 28, 2018 · London", note: "Wembley", score: "24–18", wl: "W" },
    ],
  },
  panthers: {
    name: "Carolina Panthers",
    logo: "/logos/panthers.svg",
    series: "Most recent meeting",
    games: [
      { date: "Dec 8, 2024 · Home", note: "Regular season", score: "22–16", wl: "W" },
    ],
  },
  cowboys: {
    name: "Dallas Cowboys",
    logo: "/logos/cowboys.svg",
    series: "Last six meetings",
    games: [
      { date: "Nov 23, 2025 · Road", note: "Regular season", score: "21–24", wl: "L" },
      { date: "Sep 4, 2025 · Home", note: "Kickoff game", score: "24–20", wl: "W" },
      { date: "Dec 29, 2024 · Home", note: "Regular season", score: "41–7", wl: "W" },
      { date: "Nov 10, 2024 · Road", note: "Regular season", score: "34–6", wl: "W" },
      { date: "Dec 10, 2023 · Road", note: "Regular season", score: "13–33", wl: "L" },
      { date: "Nov 5, 2023 · Home", note: "Regular season", score: "28–23", wl: "W" },
    ],
  },
  giants: {
    name: "New York Giants",
    logo: "/logos/giants.svg",
    series: "Last six meetings",
    games: [
      { date: "Oct 26, 2025 · Home", note: "Regular season", score: "38–20", wl: "W" },
      { date: "Oct 9, 2025 · Road", note: "Regular season", score: "17–34", wl: "L" },
      { date: "Jan 5, 2025 · Home", note: "Week 18", score: "20–13", wl: "W" },
      { date: "Oct 20, 2024 · Road", note: "Regular season", score: "28–3", wl: "W" },
      { date: "Jan 7, 2024 · Road", note: "Week 18", score: "10–27", wl: "L" },
      { date: "Dec 25, 2023 · Home", note: "Christmas", score: "33–25", wl: "W" },
    ],
  },
  steelers: {
    name: "Pittsburgh Steelers",
    logo: "/logos/steelers.svg",
    series: "Last two meetings",
    games: [
      { date: "Dec 15, 2024 · Home", note: "Regular season", score: "27–13", wl: "W" },
      { date: "Oct 30, 2022 · Home", note: "Regular season", score: "35–13", wl: "W" },
    ],
  },
  cardinals: {
    name: "Arizona Cardinals",
    logo: "/logos/cardinals.svg",
    series: "Last two meetings",
    games: [
      { date: "Dec 31, 2023 · Home", note: "Regular season", score: "31–35", wl: "L" },
      { date: "Oct 9, 2022 · Road", note: "Regular season", score: "20–17", wl: "W" },
    ],
  },
  colts: {
    name: "Indianapolis Colts",
    logo: "/logos/colts.svg",
    series: "Most recent meeting",
    games: [
      { date: "Nov 20, 2022 · Road", note: "Regular season", score: "17–16", wl: "W" },
    ],
  },
  seahawks: {
    name: "Seattle Seahawks",
    logo: "/logos/seahawks.svg",
    series: "Most recent meeting",
    games: [
      { date: "Dec 18, 2023 · Road", note: "Regular season", score: "17–20", wl: "L" },
    ],
  },
  texans: {
    name: "Houston Texans",
    logo: "/logos/texans.svg",
    series: "Most recent meeting",
    games: [
      { date: "Nov 3, 2022 · Road", note: "Thursday night", score: "29–17", wl: "W" },
    ],
  },
  "49ers": {
    name: "San Francisco 49ers",
    logo: "/logos/49ers.svg",
    series: "Last three meetings",
    games: [
      { date: "Jan 11, 2026 · Home", note: "NFC Wild Card", score: "19–23", wl: "L" },
      { date: "Dec 3, 2023 · Home", note: "Regular season", score: "19–42", wl: "L" },
      { date: "Jan 29, 2023 · Home", note: "NFC Championship", score: "31–7", wl: "W" },
    ],
  },
};

const rivalModal = document.querySelector("#rivalModal");
const rivalClose = document.querySelector("#rivalClose");

function openRival(id) {
  const rival = rivalResults[id];
  if (!rival) return;
  document.querySelector("#rivalLogo").src = rival.logo;
  document.querySelector("#rivalLogo").alt = `${rival.name} logo`;
  document.querySelector("#rivalName").textContent = rival.name;
  document.querySelector("#rivalSeries").textContent = rival.series;
  document.querySelector("#rivalList").innerHTML = rival.games
    .map(
      (game) => `
        <article class="rival-game">
          <p>${game.date}</p>
          <p>${game.note}</p>
          <p class="rival-score">${game.score}</p>
          <p class="rival-wl ${game.wl === "W" ? "is-w" : "is-l"}">${game.wl}</p>
        </article>
      `
    )
    .join("");
  rivalModal.showModal();
}

gamesEl.addEventListener("click", (event) => {
  const row = event.target.closest(".game");
  if (!row?.dataset.opp) return;
  openRival(row.dataset.opp);
});

gamesEl.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const row = event.target.closest(".game");
  if (!row?.dataset.opp) return;
  event.preventDefault();
  openRival(row.dataset.opp);
});

gamesEl.addEventListener("pointerover", (event) => {
  if (event.target.closest(".game.is-match")) cursor.classList.add("is-hot");
});

gamesEl.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget?.closest?.(".game.is-match")) {
    cursor.classList.remove("is-hot");
  }
});

rivalClose.addEventListener("click", () => rivalModal.close());
rivalModal.addEventListener("click", (event) => {
  if (event.target === rivalModal) rivalModal.close();
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

const playerStats = {
  hurts: {
    name: "Jalen Hurts",
    role: "01 · QB",
    photo: "/players/hurts.jpg",
    college: "Alabama · Oklahoma",
    schoolLabel: "College",
    pro: [
      ["Games", "93"],
      ["Comp / Att", "1,542 / 2,393"],
      ["Pass yards", "17,891"],
      ["Pass TDs / INTs", "110 / 45"],
      ["Passer rating", "94.4"],
      ["Rush yards / TDs", "3,554 / 63"],
    ],
    proNote: "NFL career through 2025. Super Bowl LIX MVP. Two Super Bowl starts.",
    school: [
      ["Schools", "Alabama, Oklahoma"],
      ["Games", "56"],
      ["Pass yards", "9,477"],
      ["Pass TDs / INTs", "80 / 20"],
      ["Rush yards / TDs", "3,274 / 43"],
    ],
    schoolNote: "Started at Alabama (2016–18), including the 2017 national title, then a Heisman-finalist year at Oklahoma in 2019.",
  },
  barkley: {
    name: "Saquon Barkley",
    role: "26 · RB",
    photo: "/players/barkley.jpg",
    college: "Penn State",
    schoolLabel: "College",
    pro: [
      ["Games", "106"],
      ["Rush attempts", "1,826"],
      ["Rush yards", "8,356"],
      ["Rush TDs", "55"],
      ["Receptions", "358"],
      ["Rec yards / TDs", "2,651 / 16"],
    ],
    proNote: "NFL career through 2025, Giants (2018–23) then Eagles. 2024 AP Offensive Player of the Year after 2,005 rushing yards.",
    school: [
      ["School", "Penn State"],
      ["Games", "38"],
      ["Rush yards / TDs", "3,843 / 43"],
      ["Receptions", "102"],
      ["Rec yards / TDs", "1,195 / 8"],
    ],
    schoolNote: "Nittany Lion, 2015–17. Fourth in 2017 Heisman voting.",
  },
  smith: {
    name: "DeVonta Smith",
    role: "06 · WR",
    photo: "/players/smith.jpg",
    college: "Alabama",
    schoolLabel: "College",
    pro: [
      ["Games", "80"],
      ["Receptions", "385"],
      ["Receiving yards", "5,019"],
      ["Yards per catch", "13.1"],
      ["Receiving TDs", "31"],
    ],
    proNote: "NFL career through 2025. Fourth 1,000-yard season in 2025.",
    school: [
      ["School", "Alabama"],
      ["Games", "54"],
      ["Receptions", "235"],
      ["Receiving yards", "3,965"],
      ["Receiving TDs", "46"],
    ],
    schoolNote: "2020 Heisman Trophy. National champion. First-round pick in 2021.",
  },
  lemon: {
    name: "Makai Lemon",
    role: "09 · WR",
    photo: "/players/lemon.jpg",
    college: "USC",
    schoolLabel: "College",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 1st round"],
      ["Role", "Rookie WR"],
    ],
    proNote: "No NFL regular-season stats yet. Entering 2026 as a first-round Bird.",
    school: [
      ["School", "USC"],
      ["Seasons", "2023–25"],
      ["Receptions", "137"],
      ["Receiving yards", "2,008"],
      ["Receiving TDs", "14"],
    ],
    schoolNote: "2025 Biletnikoff Award (79–1,156–11). First-round pick, 2026.",
  },
  goedert: {
    name: "Dallas Goedert",
    role: "88 · TE",
    photo: "/players/goedert.jpg",
    college: "South Dakota State",
    schoolLabel: "College",
    pro: [
      ["Games", "108"],
      ["Receptions", "349"],
      ["Receiving yards", "4,085"],
      ["Receiving TDs", "35"],
    ],
    proNote: "NFL career through 2025. Second-round pick in 2018. Two Super Bowl appearances, one win.",
    school: [
      ["School", "South Dakota State"],
      ["Games", "53"],
      ["Receptions", "198"],
      ["Receiving yards", "2,988"],
      ["Receiving TDs", "21"],
    ],
    schoolNote: "Walk-on Jackrabbit, 2014–17. Two-time FCS All-American with back-to-back 1,000-yard seasons.",
  },
  johnson: {
    name: "Lane Johnson",
    role: "65 · OT",
    photo: "/players/johnson.jpg",
    college: "Kilgore College · Oklahoma",
    schoolLabel: "College",
    pro: [
      ["Seasons", "13 (2013–25)"],
      ["Draft", "2013 · 4th overall"],
      ["Pro Bowls", "6"],
      ["Super Bowls", "2 (LII, LIX)"],
    ],
    proNote: "NFL career through 2025. Right tackle. Eagles are historically much better when he plays.",
    school: [
      ["Schools", "Kilgore, Oklahoma"],
      ["Path", "JUCO → FBS"],
      ["Sooners", "2011–12"],
    ],
    schoolNote: "Tight end and quarterback early, then tackle at Oklahoma. First-round pick in 2013.",
  },
  mailata: {
    name: "Jordan Mailata",
    role: "68 · OT",
    photo: "/players/mailata.jpg",
    college: "No college football",
    schoolLabel: "Before the NFL",
    pro: [
      ["Seasons", "8 (2018–25)"],
      ["Starts", "75"],
      ["Entry", "Undrafted, 2018"],
      ["Super Bowls", "2 (LII roster, LIX)"],
    ],
    proNote: "NFL career through 2025. Left tackle. Rugby convert who became a franchise cornerstone.",
    school: [
      ["College football", "None"],
      ["Rugby club", "South Sydney Rabbitohs"],
      ["Sport", "Rugby league"],
      ["Country", "Australia"],
    ],
    schoolNote: "No NCAA career. Left wing for South Sydney, then an Eagles developmental project.",
  },
  carter: {
    name: "Jalen Carter",
    role: "98 · DT",
    photo: "/players/carter.png",
    college: "Georgia",
    schoolLabel: "College",
    pro: [
      ["Seasons", "3 (2023–25)"],
      ["Sacks (first two yrs)", "10.5"],
      ["2025 sacks", "2"],
      ["Pro Bowls", "2"],
    ],
    proNote: "NFL through 2025. Interior disruptor. 2025 Pro Bowl starter; missed time with injury.",
    school: [
      ["School", "Georgia"],
      ["Seasons", "2020–22"],
      ["National titles", "2"],
      ["Draft", "2023 · 9th overall"],
    ],
    schoolNote: "Bulldog on back-to-back CFP championship teams. First-round pick in 2023.",
  },
  baun: {
    name: "Zack Baun",
    role: "53 · LB",
    photo: "/players/baun.jpg",
    college: "Wisconsin",
    schoolLabel: "College",
    pro: [
      ["Games", "94"],
      ["Tackles", "362"],
      ["Sacks", "9.0"],
      ["Interceptions", "4"],
    ],
    proNote: "NFL through 2025. Saints 2020–23, Eagles since 2024. 2024 first-team All-Pro after 151 tackles.",
    school: [
      ["School", "Wisconsin"],
      ["Position then", "Edge rusher"],
      ["2019 sacks", "12.5"],
      ["Draft", "2020 · 3rd round"],
    ],
    schoolNote: "Badger edge, 2016–19. Converted to off-ball linebacker in Philadelphia.",
  },
  mitchell: {
    name: "Quinyon Mitchell",
    role: "27 · CB",
    photo: "/players/mitchell.jpg",
    college: "Toledo",
    schoolLabel: "College",
    pro: [
      ["Games", "32"],
      ["Tackles", "91"],
      ["Passes defended", "29"],
      ["Regular-season INTs", "0"],
    ],
    proNote: "NFL through 2025. First-round pick in 2024. First Pro Bowl in 2026 games (2025 season).",
    school: [
      ["School", "Toledo"],
      ["Games", "45"],
      ["Tackles", "118"],
      ["Interceptions", "6"],
    ],
    schoolNote: "Rocket, 2020–23. First-round pick (22nd overall) in 2024.",
  },
  dejean: {
    name: "Cooper DeJean",
    role: "33 · DB",
    photo: "/players/dejean.jpg",
    college: "Iowa",
    schoolLabel: "College",
    pro: [
      ["Games", "32"],
      ["Tackles", "140"],
      ["Interceptions", "2"],
      ["Passes defended", "22"],
    ],
    proNote: "NFL through 2025. Super Bowl LIX pick-six vs. Mahomes. First Pro Bowl after 2025.",
    school: [
      ["School", "Iowa"],
      ["Games", "30"],
      ["Tackles", "120"],
      ["Interceptions", "7"],
    ],
    schoolNote: "Hawk, 2021–23. Also returned punts. Second-round pick in 2024.",
  },
  elliott: {
    name: "Jake Elliott",
    role: "04 · K",
    photo: "/players/elliott.jpg",
    college: "Memphis",
    schoolLabel: "College",
    pro: [
      ["Seasons", "9 (2017–25)"],
      ["Field goals", "228 / 264"],
      ["FG percent", "86.4%"],
      ["Super Bowls", "2 (LII, LIX)"],
    ],
    proNote: "NFL through 2025. Walk-off 61-yarder to beat the Giants in 2017. Perfect 4-for-4 FGs in Super Bowl LIX.",
    school: [
      ["School", "Memphis"],
      ["Seasons", "2013–16"],
      ["Field goals", "72 / 88"],
      ["FG percent", "81.8%"],
    ],
    schoolNote: "Tiger kicker. Fifth-round pick by Cincinnati in 2017, claimed by Philadelphia that September.",
  },
};

function rowsFrom(pairs) {
  return pairs
    .map(
      ([label, value]) =>
        `<div class="stat-row"><dt>${label}</dt><dd>${value}</dd></div>`
    )
    .join("");
}

const statModal = document.querySelector("#statModal");
const statClose = document.querySelector("#statClose");

function openStats(id) {
  const player = playerStats[id];
  if (!player) return;
  document.querySelector("#statPhoto").src = player.photo;
  document.querySelector("#statPhoto").alt = player.name;
  document.querySelector("#statRole").textContent = player.role;
  document.querySelector("#statName").textContent = player.name;
  document.querySelector("#statCollege").textContent = player.college;
  document.querySelector("#statSchoolLabel").textContent = player.schoolLabel;
  document.querySelector("#statPro").innerHTML = rowsFrom(player.pro);
  document.querySelector("#statSchool").innerHTML = rowsFrom(player.school);
  document.querySelector("#statProNote").textContent = player.proNote;
  document.querySelector("#statSchoolNote").textContent = player.schoolNote;
  statModal.showModal();
}

document.querySelectorAll(".player").forEach((card) => {
  const open = () => openStats(card.dataset.id);
  card.addEventListener("click", open);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open();
    }
  });
  card.addEventListener("pointerenter", () => cursor.classList.add("is-hot"));
  card.addEventListener("pointerleave", () => cursor.classList.remove("is-hot"));
});

statClose.addEventListener("click", () => statModal.close());
statModal.addEventListener("click", (event) => {
  if (event.target === statModal) statModal.close();
});
