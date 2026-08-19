import "./styles.css";
import { howieYears } from "./howie.js";

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
  { week: "WK 18", opponent: "New York Giants", opp: "giants", logo: "/logos/giants.svg", when: "Date TBD · flex week", loc: "away", tags: ["away"] },
];

const ROCKY = {
  id: "ioE_O7Lm0I4",
  title: "Gonna Fly Now — theme from Rocky",
};
const TIGER = {
  id: "btPJPFnesV4",
  title: "Eye of the Tiger — Survivor / Rocky III",
};

const calls = {
  eagles: "E! A! G! L! E! S! EAGLES!",
  fly: "Fly, Eagles, Fly — on the road to victory.",
  birds: "GO BIRDS. The whole damn city.",
  shove: "Fourth and short. Brotherly Shove. First down.",
};

const tracks = {
  eagles: {
    id: "cugVzMthSIo",
    start: 0,
    end: 8,
    title: "E-A-G-L-E-S — It’s Always Sunny / FXX",
    fallback: TIGER,
  },
  fly: {
    id: "4ujS__0MQMo",
    start: 0,
    title: "Fly Eagles Fly — official in-stadium call",
    fallback: ROCKY,
  },
  birds: {
    id: "THCK0-IYHew",
    start: 320,
    title: "Go Birds — Jalen Hurts, Rocky steps",
    fallback: TIGER,
  },
  shove: {
    id: "DUHhB1C-5ZY",
    start: 12,
    end: 55,
    title: "Brotherly Shove — official Eagles reel",
    fallback: ROCKY,
  },
};

const gamesEl = document.querySelector("#games");
const filters = document.querySelectorAll(".filter");
const pads = document.querySelectorAll(".pad");
const chantOut = document.querySelector("#chantOut");
const chantScreen = document.querySelector("#chantScreen");
const chantTrack = document.querySelector("#chantTrack");

let ytLoader;
let chantPlayer;
let chantPlayerReady;
let activeClip;

function loadYouTubeAPI() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (ytLoader) return ytLoader;
  ytLoader = new Promise((resolve) => {
    const prior = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prior?.();
      resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);
  });
  return ytLoader;
}

function clipPayload(clip) {
  const payload = {
    videoId: clip.id,
    startSeconds: clip.start || 0,
  };
  if (clip.end) payload.endSeconds = clip.end;
  return payload;
}

function showClip(clip) {
  chantScreen.classList.add("is-live");
  chantTrack.textContent = `Now playing · ${clip.title}`;
  chantPlayer.loadVideoById(clipPayload(clip));
}

function onChantError() {
  if (!activeClip || activeClip.usedFallback || !activeClip.fallback) return;
  activeClip.usedFallback = true;
  const fallback = activeClip.fallback;
  chantOut.textContent = "Clip blocked. Rocky takes it from here.";
  showClip(fallback);
}

function getChantPlayer(YT) {
  if (chantPlayerReady) return chantPlayerReady;
  chantPlayerReady = new Promise((resolve) => {
    chantPlayer = new YT.Player("chantPlayer", {
      width: "100%",
      height: "100%",
      videoId: "4ujS__0MQMo",
      playerVars: {
        autoplay: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: () => resolve(chantPlayer),
        onError: onChantError,
      },
    });
  });
  return chantPlayerReady;
}

function playCall(key) {
  stopTiger();
  const clip = { ...tracks[key], usedFallback: false };
  activeClip = clip;
  chantScreen.classList.add("is-live");
  chantTrack.textContent = `Now playing · ${clip.title}`;
  if (chantPlayer?.loadVideoById) {
    chantPlayer.loadVideoById(clipPayload(clip));
    return;
  }
  loadYouTubeAPI()
    .then((YT) => getChantPlayer(YT))
    .then(() => {
      if (activeClip !== clip) return;
      showClip(clip);
    });
}

const TIGER_FALLBACK = "ob8TNqQw2hY";
let tigerPlayer;
let tigerReady;
let tigerOn = false;
let tigerViaChant = false;

function isMobileLayout() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function pauseChant() {
  try {
    chantPlayer?.pauseVideo?.();
  } catch {
    /* player may not be ready */
  }
}

function stopTiger() {
  tigerOn = false;
  if (tigerViaChant) {
    tigerViaChant = false;
    try {
      chantPlayer?.pauseVideo?.();
    } catch {
      /* player may not be ready */
    }
    chantScreen.classList.remove("is-live");
    chantTrack.textContent = "";
    chantOut.textContent = "Waiting on the crowd…";
    return;
  }
  try {
    tigerPlayer?.pauseVideo?.();
  } catch {
    /* player may not be ready */
  }
}

function cueTiger(player) {
  player.unMute();
  player.setVolume(100);
  try {
    player.seekTo(0, true);
    player.playVideo();
  } catch {
    player.loadVideoById({ videoId: TIGER.id, startSeconds: 0 });
    player.playVideo();
  }
}

function getTigerPlayer(YT) {
  if (tigerReady) return tigerReady;
  tigerReady = new Promise((resolve) => {
    tigerPlayer = new YT.Player("tigerPlayer", {
      width: 200,
      height: 200,
      videoId: TIGER.id,
      playerVars: {
        autoplay: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: () => resolve(tigerPlayer),
        onError: () => {
          tigerPlayer.loadVideoById({ videoId: TIGER_FALLBACK });
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) tigerOn = false;
        },
      },
    });
  });
  return tigerReady;
}

function playTigerViaChant() {
  tigerViaChant = true;
  activeClip = null;
  chantScreen.classList.add("is-live");
  chantTrack.textContent = `Now playing · ${TIGER.title}`;
  chantOut.textContent = "Eye of the Tiger. Rocky takes the stairs.";

  const cue = (player) => {
    player.unMute();
    player.setVolume(100);
    player.loadVideoById({ videoId: TIGER.id, startSeconds: 0 });
  };

  if (chantPlayer?.loadVideoById) {
    cue(chantPlayer);
    return;
  }
  loadYouTubeAPI()
    .then((YT) => getChantPlayer(YT))
    .then((player) => {
      if (!tigerOn) return;
      cue(player);
    });
}

function playTiger() {
  tigerOn = true;

  if (isMobileLayout()) {
    playTigerViaChant();
    return;
  }

  pauseChant();
  if (tigerPlayer?.loadVideoById) {
    cueTiger(tigerPlayer);
    return;
  }
  loadYouTubeAPI()
    .then((YT) => getTigerPlayer(YT))
    .then((player) => {
      if (!tigerOn) return;
      cueTiger(player);
    });
}

loadYouTubeAPI().then((YT) => {
  getChantPlayer(YT);
  getTigerPlayer(YT);
});

function typingTarget(node) {
  if (!node || node === document.body || node === document.documentElement) {
    return false;
  }
  const tag = node.tagName;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return true;
  if (node.isContentEditable) return true;
  return false;
}

function tigerBlocked() {
  return Boolean(document.querySelector("dialog[open]"));
}

function toggleTiger() {
  if (tigerBlocked()) return;
  if (tigerOn) stopTiger();
  else playTiger();
}

const TIGER_DOUBLE_MS = 450;
let lastVolumeUp = 0;

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && tigerOn) {
    stopTiger();
    return;
  }
  if (event.code !== "KeyT") return;
  if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
  if (typingTarget(event.target)) return;
  if (tigerBlocked()) return;
  event.preventDefault();
  toggleTiger();
});

window.addEventListener("keydown", (event) => {
  const isVolumeUp =
    event.code === "AudioVolumeUp" || event.keyCode === 175;
  if (!isVolumeUp || event.repeat) return;
  if (tigerBlocked()) return;

  const now = Date.now();
  if (now - lastVolumeUp < TIGER_DOUBLE_MS) {
    lastVolumeUp = 0;
    toggleTiger();
  } else {
    lastVolumeUp = now;
  }
});

const navBrand = document.querySelector("header.nav .nav-brand");

if (navBrand) {
  navBrand.addEventListener(
    "click",
    (event) => {
      if (!isMobileLayout()) return;
      event.preventDefault();
      toggleTiger();
    },
    true
  );
}

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
    playCall(pad.dataset.call);
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
  stowers: {
    name: "Eli Stowers",
    role: "R2 · TE",
    photo: "/logos/eagles.svg",
    college: "Texas A&M · New Mexico State · Vanderbilt",
    schoolLabel: "College",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 2nd round · 54"],
      ["Role", "Rookie TE"],
    ],
    proNote: "No NFL regular-season stats yet. Mackey Award tight end landed in the second.",
    school: [
      ["School", "Vanderbilt (final)"],
      ["2025", "62–769–4"],
      ["2024", "49–638–5"],
      ["Honor", "2025 John Mackey Award"],
    ],
    schoolNote: "Started at Texas A&M, a year at New Mexico State, then two years at Vanderbilt. Combine TE records in the vertical (45.5) and broad jump (11-3).",
  },
  bell: {
    name: "Markel Bell",
    role: "R3 · OT",
    photo: "/logos/eagles.svg",
    college: "Holmes · Miami",
    schoolLabel: "College",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 3rd round · 68"],
      ["Size", "6-9 · 346"],
    ],
    proNote: "No NFL stats yet. Left tackle size for the next decade of Birds.",
    school: [
      ["Path", "Holmes CC → Miami"],
      ["2025", "Started 16 at LT"],
      ["Honor", "Third-team All-ACC"],
      ["Miami games", "29 (21 starts)"],
    ],
    schoolNote: "JUCO All-Region, then two years at Miami, including a CFP run. Third-team All-ACC in 2025.",
  },
  payton: {
    name: "Cole Payton",
    role: "R5 · QB",
    photo: "/logos/eagles.svg",
    college: "North Dakota State",
    schoolLabel: "College",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 5th round · 178"],
      ["Role", "Rookie QB"],
    ],
    proNote: "No NFL stats yet. FCS dual-threat behind Hurts and McKee.",
    school: [
      ["School", "North Dakota State"],
      ["2025 pass", "161–224 · 16 TD · 4 INT"],
      ["2025 rush", "777 yards · 13 TD"],
      ["Honor", "Second-team FCS All-American"],
    ],
    schoolNote: "Led FCS in passer rating (193.8) in 2025. Championship-program backup who finally started.",
  },
  morris: {
    name: "Micah Morris",
    role: "R6 · G",
    photo: "/logos/eagles.svg",
    college: "Georgia",
    schoolLabel: "College",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 6th round · 207"],
      ["Size", "6-5 · 334"],
    ],
    proNote: "No NFL stats yet. Georgia interior with two national titles on the résumé.",
    school: [
      ["School", "Georgia"],
      ["Titles", "2 national (2021, 2022)"],
      ["2024", "5 starts at RG"],
      ["2025", "Started all 14 at LG"],
    ],
    schoolNote: "Five years in Athens. Started every game at left guard as a senior.",
  },
  wisniewski: {
    name: "Cole Wisniewski",
    role: "R7 · S",
    photo: "/logos/eagles.svg",
    college: "Texas Tech",
    schoolLabel: "College",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 7th round · 244"],
      ["Role", "Rookie safety"],
    ],
    proNote: "No NFL stats yet. Seventh-round safety with length.",
    school: [
      ["School", "Texas Tech"],
      ["Position", "Safety"],
      ["Size", "6-3 · 219"],
    ],
    schoolNote: "Red Raider safety. Developmental piece for Fangio’s back end.",
  },
  bernard: {
    name: "Uar Bernard",
    role: "R7 · DT",
    photo: "/logos/eagles.svg",
    college: "International Player Pathway",
    schoolLabel: "Path",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 7th round · 251"],
      ["Program", "IPP"],
    ],
    proNote: "No NFL stats yet. Nigeria-to-Philly via the International Player Pathway.",
    school: [
      ["College football", "None"],
      ["Country", "Nigeria"],
      ["Door", "Osi Umenyiora camp"],
      ["Pro day", "4.63 forty · 39-inch vert"],
    ],
    schoolNote: "Spotted playing basketball, then the IPP. Outstanding workout numbers for a 306-pound tackle.",
  },
  jamesnewby: {
    name: "Keyshawn James-Newby",
    role: "R7 · EDGE",
    photo: "/logos/eagles.svg",
    college: "Montana Tech · Idaho · New Mexico",
    schoolLabel: "College",
    pro: [
      ["NFL games", "0"],
      ["Draft", "2026 · 7th round · 252"],
      ["Role", "Rookie EDGE"],
    ],
    proNote: "No NFL stats yet. Production rusher who climbed from NAIA to the Mountain West.",
    school: [
      ["2025", "15 TFL · 9 sacks"],
      ["2024 Idaho", "14.5 TFL · 10 sacks"],
      ["Honor", "First-team All-Mountain West"],
    ],
    schoolNote: "Montana Tech, Idaho, then New Mexico. First-team All-MW in 2025.",
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
  sirianni: {
    name: "Nick Sirianni",
    role: "Head coach · Year 6",
    photo: "/players/sirianni.jpg",
    college: "Mount Union",
    schoolLabel: "College",
    pro: [
      ["Regular season", "59–26"],
      ["Postseason", "6–4"],
      ["Career", "65–30"],
      ["Super Bowl", "LIX champion"],
      ["NFC titles", "2"],
      ["NFC East titles", "3"],
    ],
    proNote: "Eagles head coach since 2021. Playoffs in all five completed seasons. Super Bowl LVII appearance, Super Bowl LIX win. 2026 is year six.",
    school: [
      ["School", "Mount Union"],
      ["Position", "Wide receiver"],
      ["National titles", "3 (2000–02)"],
      ["Senior year", "998 yards · 13 TDs"],
    ],
    schoolNote: "Three-year starter for the Purple Raiders. Began coaching at Mount Union, then IUP, Chiefs, Chargers, and Colts OC before Philadelphia.",
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
let pinnedAnchor = null;

function pinModal(modal, anchor) {
  pinnedAnchor = anchor;
  modal.classList.add("is-pinned");
  const place = () => {
    if (!modal.open || !pinnedAnchor) return;
    const pad = 12;
    const box = pinnedAnchor.getBoundingClientRect();
    const width = modal.offsetWidth;
    const height = modal.offsetHeight;
    let left = box.left + (box.width - width) / 2;
    let top = box.top + 12;
    left = Math.max(pad, Math.min(left, window.innerWidth - width - pad));
    top = Math.max(pad, Math.min(top, window.innerHeight - height - pad));
    modal.style.left = `${left}px`;
    modal.style.top = `${top}px`;
  };
  requestAnimationFrame(() => requestAnimationFrame(place));
}

function openStats(id, anchor) {
  const player = playerStats[id];
  if (!player) return;
  const photo = document.querySelector("#statPhoto");
  photo.src = player.photo;
  photo.alt = player.name;
  photo.classList.toggle("is-mark", player.photo.endsWith(".svg"));
  document.querySelector("#statRole").textContent = player.role;
  document.querySelector("#statName").textContent = player.name;
  document.querySelector("#statCollege").textContent = player.college;
  document.querySelector("#statSchoolLabel").textContent = player.schoolLabel;
  document.querySelector("#statPro").innerHTML = rowsFrom(player.pro);
  document.querySelector("#statSchool").innerHTML = rowsFrom(player.school);
  document.querySelector("#statProNote").textContent = player.proNote;
  document.querySelector("#statSchoolNote").textContent = player.schoolNote;
  statModal.showModal();
  pinModal(statModal, anchor);
}

document.querySelectorAll(".player, .coach").forEach((card) => {
  const open = () => openStats(card.dataset.id, card);
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
statModal.addEventListener("close", () => {
  statModal.classList.remove("is-pinned");
  statModal.style.left = "";
  statModal.style.top = "";
  pinnedAnchor = null;
});
window.addEventListener("resize", () => {
  if (statModal.open && pinnedAnchor) pinModal(statModal, pinnedAnchor);
});

function gradeClass(grade) {
  if (grade === "INC") return "is-inc";
  const letter = grade[0];
  if (letter === "A") return "is-a";
  if (letter === "B") return "is-b";
  if (letter === "C") return "is-c";
  if (letter === "D") return "is-d";
  return "is-f";
}

function gradeScore(grade) {
  if (!grade || grade === "INC") return null;
  const base = { A: 11, B: 8, C: 5, D: 2, F: 0 }[grade[0]] ?? 0;
  if (grade.includes("+")) return base + 1;
  if (grade.includes("-")) return base - 1;
  return base;
}

function yearStrength(entry) {
  const scores = [gradeScore(entry.draftGrade), gradeScore(entry.faGrade)].filter(
    (score) => score !== null
  );
  if (!scores.length) return { letter: "INC", cls: "is-inc" };
  const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  if (avg >= 10) return { letter: "A", cls: "is-a" };
  if (avg >= 7) return { letter: "B", cls: "is-b" };
  if (avg >= 4) return { letter: "C", cls: "is-c" };
  if (avg >= 1.5) return { letter: "D", cls: "is-d" };
  return { letter: "F", cls: "is-f" };
}

const howieYearBar = document.querySelector("#howieYears");
const howieBoard = document.querySelector("#howieBoard");

howieYearBar.innerHTML = howieYears
  .map((year) => {
    const strength = yearStrength(year);
    return `<button type="button" class="howie-year ${strength.cls}" data-year="${year.year}" aria-label="${year.year}, overall ${strength.letter}">${year.year}</button>`;
  })
  .join("");

function renderHowie(year) {
  const data = howieYears.find((entry) => entry.year === year);
  if (!data) return;
  howieYearBar.querySelectorAll(".howie-year").forEach((btn) => {
    btn.classList.toggle("is-on", Number(btn.dataset.year) === year);
  });
  const chipNote = data.chip ? `<p class="howie-chip">Chip Kelly had personnel. Still on the mountain so the record is honest.</p>` : "";
  const overall = yearStrength(data);
  howieBoard.innerHTML = `
    <div class="howie-summary">
      <p class="eyebrow">${data.tag}</p>
      <h3>${data.year}</h3>
      ${chipNote}
      <div class="howie-grades">
        <p>Overall <strong class="grade ${overall.cls}">${overall.letter}</strong></p>
        <p>Draft class <strong class="grade ${gradeClass(data.draftGrade)}">${data.draftGrade}</strong></p>
        <p>Free-agent class <strong class="grade ${gradeClass(data.faGrade)}">${data.faGrade}</strong></p>
      </div>
    </div>
    <div class="howie-cols">
      <section>
        <h4>Draft</h4>
        <p class="howie-blurb">${data.draftNote}</p>
        ${data.picks
          .map(
            (pick) => `
          <article class="howie-row">
            <p>${pick.rnd}</p>
            <p><strong>${pick.name}</strong> · ${pick.pos} · ${pick.school}</p>
            <p class="grade ${gradeClass(pick.grade)}">${pick.grade}</p>
          </article>
        `
          )
          .join("")}
      </section>
      <section>
        <h4>Free agency</h4>
        <p class="howie-blurb">${data.faNote}</p>
        ${data.fas
          .map(
            (signing) => `
          <article class="howie-row">
            <p>${signing.how}</p>
            <p><strong>${signing.name}</strong></p>
            <p class="grade ${gradeClass(signing.grade)}">${signing.grade}</p>
          </article>
        `
          )
          .join("")}
      </section>
    </div>
  `;
}

howieYearBar.addEventListener("click", (event) => {
  const btn = event.target.closest(".howie-year");
  if (!btn) return;
  renderHowie(Number(btn.dataset.year));
});

renderHowie(2026);
