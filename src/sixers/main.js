import "../styles.css";
import "../shared/league.css";
import "./sixers.css";
import { initLeagueNav, initSharedChrome } from "../shared/league.js";
import { roster, schedule, legends, lebronGames, chants } from "./data.js";

initLeagueNav("sixers");
initSharedChrome();

const gamesEl = document.querySelector("#games");
const filters = document.querySelectorAll(".filter");
const squadEl = document.querySelector("#squadGrid");
const legendsEl = document.querySelector("#legendsWall");
const lebronGrid = document.querySelector("#lebronGrid");
const lebronScreen = document.querySelector("#lebronScreen");
const lebronIdle = document.querySelector("#lebronIdle");
const lebronTrack = document.querySelector("#lebronTrack");
const pads = document.querySelectorAll(".pad");
const chantOut = document.querySelector("#chantOut");
const chantScreen = document.querySelector("#chantScreen");
const chantTrack = document.querySelector("#chantTrack");

let ytLoader;
let lebronPlayer;
let lebronReady;
let chantPlayer;
let chantReady;

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

function renderSquad() {
  if (!squadEl) return;
  squadEl.innerHTML = roster
    .map(
      (p) => `
    <article class="squad-card">
      <p class="num">${p.num}</p>
      <h3>${p.name}</h3>
      <p class="role">${p.role}</p>
      <p>${p.note}</p>
    </article>
  `
    )
    .join("");
}

function renderLegends() {
  if (!legendsEl) return;
  legendsEl.innerHTML = legends
    .map(
      (l) => `
    <article class="legend-card">
      <h3>${l.name}</h3>
      <p class="era">${l.era}</p>
      <p>${l.note}</p>
    </article>
  `
    )
    .join("");
}

function renderGames(filter = "all") {
  if (!gamesEl) return;
  gamesEl.innerHTML = schedule
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
      return `
        <article class="game${hidden}" data-tags="${game.tags.join(" ")}">
          <p class="game-week">${game.week}</p>
          <img class="game-logo" src="/logos/sixers.svg" alt="" />
          <h3>${game.opponent}</h3>
          <p class="game-meta">${game.when}</p>
          <p class="game-tag">${tag}</p>
        </article>
      `;
    })
    .join("");
}

function renderLebronShrine() {
  if (!lebronGrid) return;
  lebronGrid.innerHTML = lebronGames
    .map(
      (g) => `
    <article class="lebron-card" data-video="${g.videoId}" data-title="${g.videoTitle}" tabindex="0" role="button" aria-label="Watch ${g.headline}">
      <p class="date">${g.date} · ${g.venue}</p>
      <h3>${g.headline}</h3>
      <p class="line">${g.line}</p>
      <p>${g.note}</p>
    </article>
  `
    )
    .join("");
}

function playLebron(videoId, title) {
  lebronScreen?.classList.add("is-live");
  if (lebronTrack) lebronTrack.textContent = `Now playing · ${title}`;

  const cue = (player) => {
    player.unMute();
    player.setVolume(100);
    player.loadVideoById({ videoId, startSeconds: 0 });
  };

  if (lebronPlayer?.loadVideoById) {
    cue(lebronPlayer);
    return;
  }
  loadYouTubeAPI().then((YT) => {
    if (lebronReady) {
      lebronReady.then(() => cue(lebronPlayer));
      return;
    }
    lebronReady = new Promise((resolve) => {
      lebronPlayer = new YT.Player("lebronPlayer", {
        width: "100%",
        height: "100%",
        videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            event.target.unMute();
            event.target.setVolume(100);
            resolve(lebronPlayer);
          },
        },
      });
    });
  });
}

function getChantPlayer(YT) {
  if (chantReady) return chantReady;
  chantReady = new Promise((resolve) => {
    chantPlayer = new YT.Player("chantPlayer", {
      width: "100%",
      height: "100%",
      videoId: chants.tracks.process.id,
      playerVars: {
        autoplay: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        origin: window.location.origin,
      },
      events: { onReady: () => resolve(chantPlayer) },
    });
  });
  return chantReady;
}

function playChant(key) {
  const clip = chants.tracks[key];
  if (!clip) return;
  chantOut.textContent = chants.calls[key];
  chantScreen?.classList.add("is-live");
  if (chantTrack) chantTrack.textContent = `Now playing · ${clip.title}`;

  const cue = (player) => {
    player.unMute();
    player.setVolume(100);
    player.loadVideoById({ videoId: clip.id, startSeconds: 0 });
  };

  if (chantPlayer?.loadVideoById) {
    cue(chantPlayer);
    return;
  }
  loadYouTubeAPI()
    .then((YT) => getChantPlayer(YT))
    .then((player) => cue(player));
}

renderSquad();
renderLegends();
renderGames();
renderLebronShrine();

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-on"));
    btn.classList.add("is-on");
    renderGames(btn.dataset.filter);
  });
});

lebronGrid?.addEventListener("click", (event) => {
  const card = event.target.closest(".lebron-card");
  if (!card) return;
  lebronGrid.querySelectorAll(".lebron-card").forEach((c) => c.classList.remove("is-active"));
  card.classList.add("is-active");
  playLebron(card.dataset.video, card.dataset.title);
});

lebronGrid?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".lebron-card");
  if (!card) return;
  event.preventDefault();
  card.click();
});

pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    pads.forEach((p) => p.classList.remove("is-hit"));
    pad.classList.add("is-hit");
    playChant(pad.dataset.call);
  });
});

loadYouTubeAPI().then((YT) => getChantPlayer(YT));
