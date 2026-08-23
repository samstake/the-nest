import "../styles.css";
import "../shared/league.css";
import "./hub.css";
import { initLeagueNav, initSharedChrome, PHILLY_SITES } from "../shared/league.js";

initLeagueNav("hub");
initSharedChrome();

const grid = document.querySelector("#hubGrid");
if (grid) {
  const blurbs = {
    nest: "Midnight green. Two Lombardi trophies. Fly, Eagles, Fly.",
    sixers: "Banner 17 loading. Embiid, Maxey, LeBron, Jaylen Brown.",
    flyers: "Orange and black. The 2026 run. Broad Street forever.",
    phillies: "Red October. Ring the bell. Fightin' Phils at The Bank.",
  };

  grid.innerHTML = PHILLY_SITES.map(
    (site) => `
    <a class="hub-card" href="${site.path}" data-site="${site.id}">
      <img src="${site.logo}" alt="" />
      <p class="hub-team">${site.team}</p>
      <h2>${site.name}</h2>
      <p>${blurbs[site.id]}</p>
      <span class="hub-enter">Enter →</span>
    </a>
  `
  ).join("");
}
