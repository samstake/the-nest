import "../styles.css";
import "../shared/league.css";
import "../shared/team.css";
import { initLeagueNav, initSharedChrome } from "../shared/league.js";
import { initRoster } from "../shared/roster.js";
import { schedule, legends, worldSeries, chants } from "./data.js";

initLeagueNav("phillies");
initSharedChrome();

const legendsEl = document.querySelector("#legendsWall");
const gamesEl = document.querySelector("#games");
const wsEl = document.querySelector("#wsTimeline");
const filters = document.querySelectorAll(".filter");
const pads = document.querySelectorAll(".pad");
const bellBtn = document.querySelector("#bellBtn");
const chantOut = document.querySelector("#chantOut");
const chantScreen = document.querySelector("#chantScreen");
const chantTrack = document.querySelector("#chantTrack");

let ytLoader;
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

legendsEl.innerHTML = legends
  .map(
    (l) => `
  <article class="legend-card">
    <h3>${l.name}</h3>
    <p class="era">${l.era}</p>
    <p>${l.note}</p>
  </article>`
  )
  .join("");

wsEl.innerHTML = worldSeries
  .map(
    (w) => `
  <article class="ws-card">
    <p class="year">${w.year}</p>
    <p>${w.note}</p>
  </article>`
  )
  .join("");

function renderGames(filter = "all") {
  gamesEl.innerHTML = schedule
    .map((game) => {
      const hidden =
        filter !== "all" && !game.tags.includes(filter) ? " is-hidden" : "";
      const tag = game.tags.includes("prime") ? "PRIME" : game.loc.toUpperCase();
      return `
        <article class="game${hidden}">
          <p class="game-week">${game.week}</p>
          <img class="game-logo" src="/logos/phillies.svg" alt="" />
          <h3>${game.opponent}</h3>
          <p class="game-meta">${game.when}</p>
          <p class="game-tag">${tag}</p>
        </article>`;
    })
    .join("");
}

initRoster("phillies", "#rosterList");
renderGames();

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("is-on"));
    btn.classList.add("is-on");
    renderGames(btn.dataset.filter);
  });
});

function getChantPlayer(YT) {
  if (chantReady) return chantReady;
  chantReady = new Promise((resolve) => {
    chantPlayer = new YT.Player("chantPlayer", {
      width: "100%",
      height: "100%",
      videoId: chants.tracks.bell.id,
      playerVars: { autoplay: 0, rel: 0, modestbranding: 1, playsinline: 1, origin: window.location.origin },
      events: { onReady: () => resolve(chantPlayer) },
    });
  });
  return chantReady;
}

function playChant(key) {
  const clip = chants.tracks[key];
  chantOut.textContent = chants.calls[key];
  chantScreen?.classList.add("is-live");
  if (chantTrack) chantTrack.textContent = `Now playing · ${clip.title}`;
  const cue = (player) => {
    player.unMute();
    player.setVolume(100);
    player.loadVideoById({ videoId: clip.id, startSeconds: 0 });
  };
  if (chantPlayer?.loadVideoById) cue(chantPlayer);
  else loadYouTubeAPI().then(getChantPlayer).then(cue);
}

pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    pads.forEach((p) => p.classList.remove("is-hit"));
    pad.classList.add("is-hit");
    playChant(pad.dataset.call);
  });
});

bellBtn?.addEventListener("click", () => {
  bellBtn.classList.add("is-ringing");
  chantOut.textContent = "🔔 DING-DING-DING-DING-DINGER! 🔥";
  playChant("bell");
  document.body.animate(
    [
      { backgroundColor: "var(--ink)" },
      { backgroundColor: "#2a0810" },
      { backgroundColor: "var(--ink)" },
    ],
    { duration: 500, easing: "ease-out" }
  );
  setTimeout(() => bellBtn.classList.remove("is-ringing"), 600);
});

loadYouTubeAPI().then(getChantPlayer);
