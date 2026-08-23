import "../styles.css";
import "../shared/league.css";
import "../shared/team.css";
import { initLeagueNav, initSharedChrome } from "../shared/league.js";
import { roster, schedule, bullies, cups, chants } from "./data.js";

initLeagueNav("flyers");
initSharedChrome();

const squadEl = document.querySelector("#squadGrid");
const gamesEl = document.querySelector("#games");
const filters = document.querySelectorAll(".filter");
const bulliesEl = document.querySelector("#bulliesGrid");
const pads = document.querySelectorAll(".pad");
const chantOut = document.querySelector("#chantOut");
const chantScreen = document.querySelector("#chantScreen");
const chantTrack = document.querySelector("#chantTrack");
const gritBtn = document.querySelector("#gritBtn");
const gritFill = document.querySelector("#gritFill");

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

function card(html) {
  return html;
}

squadEl.innerHTML = roster
  .map(
    (p) => card(`
  <article class="squad-card">
    <p class="num">${p.num}</p>
    <h3>${p.name}</h3>
    <p class="role">${p.role}</p>
    <p>${p.note}</p>
  </article>`)
  )
  .join("");

bulliesEl.innerHTML = bullies
  .map(
    (b) => card(`
  <article class="bully-card">
    <h3>${b.name}</h3>
    <p class="stat">${b.stat}</p>
    <p>${b.note}</p>
  </article>`)
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
          <img class="game-logo" src="/logos/flyers.svg" alt="" />
          <h3>${game.opponent}</h3>
          <p class="game-meta">${game.when}</p>
          <p class="game-tag">${tag}</p>
        </article>`;
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

function getChantPlayer(YT) {
  if (chantReady) return chantReady;
  chantReady = new Promise((resolve) => {
    chantPlayer = new YT.Player("chantPlayer", {
      width: "100%",
      height: "100%",
      videoId: "4ujS__0MQMo",
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

gritBtn?.addEventListener("click", () => {
  gritBtn.classList.add("is-ringing");
  gritFill.style.width = "100%";
  chantOut.textContent = "GRIT LEVEL: MAXIMUM. Broad Street approved.";
  setTimeout(() => gritBtn.classList.remove("is-ringing"), 400);
});

loadYouTubeAPI().then(getChantPlayer);
