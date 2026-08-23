import "./roster.css";

function lastName(name) {
  const parts = name.trim().split(/\s+/);
  return parts[parts.length - 1].replace(/[^a-z'-]/gi, "").toLowerCase();
}

function rowsFrom(pairs) {
  return pairs
    .map(
      ([label, value]) =>
        `<div class="stat-row"><dt>${label}</dt><dd>${value}</dd></div>`
    )
    .join("");
}

function legacyToSections(player) {
  const sections = [];
  if (player.pro?.length) {
    sections.push({
      title: "Pro",
      rows: player.pro,
      note: player.proNote || "",
    });
  }
  if (player.school?.length) {
    sections.push({
      title: player.schoolLabel || "College",
      rows: player.school,
      note: player.schoolNote || "",
    });
  }
  return sections;
}

function ensureModal() {
  let modal = document.querySelector("#rosterModal");
  if (modal) return modal;

  modal = document.createElement("dialog");
  modal.className = "stat-modal";
  modal.id = "rosterModal";
  modal.setAttribute("aria-labelledby", "rosterStatName");
  modal.innerHTML = `
    <button class="stat-close" id="rosterStatClose" type="button">Close</button>
    <div class="stat-top">
      <img id="rosterStatPhoto" alt="" />
      <div>
        <p class="eyebrow" id="rosterStatRole"></p>
        <h2 id="rosterStatName"></h2>
        <p class="stat-college" id="rosterStatCollege"></p>
      </div>
    </div>
    <div class="stat-grid" id="rosterStatGrid"></div>
  `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector("#rosterStatClose");
  closeBtn.addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  return modal;
}

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

function openPlayerModal(player, anchor, getStats) {
  const modal = ensureModal();
  let sections = player.sections;
  let photo = player.photo || "";
  let college = player.college || "";
  let role = player.role || "";
  let name = player.name;

  if (!sections?.length && getStats) {
    const legacy = getStats(player.id);
    if (legacy) {
      name = legacy.name || name;
      role = legacy.role || role;
      photo = legacy.photo || photo;
      college = legacy.college || college;
      sections = legacyToSections(legacy);
    }
  }

  const photoEl = modal.querySelector("#rosterStatPhoto");
  photoEl.src = photo || "/logos/eagles.svg";
  photoEl.alt = name;
  photoEl.classList.toggle("is-mark", !photo || photo.endsWith(".svg"));

  modal.querySelector("#rosterStatRole").textContent = role;
  modal.querySelector("#rosterStatName").textContent = name;
  modal.querySelector("#rosterStatCollege").textContent = college;

  const grid = modal.querySelector("#rosterStatGrid");
  if (!sections?.length) {
    grid.innerHTML = `<p class="stat-note">Stats loading soon.</p>`;
  } else if (sections.length === 1) {
    const s = sections[0];
    grid.innerHTML = `
      <section>
        <h3>${s.title}</h3>
        <dl>${rowsFrom(s.rows)}</dl>
        ${s.note ? `<p class="stat-note">${s.note}</p>` : ""}
      </section>
    `;
  } else {
    grid.innerHTML = sections
      .map(
        (s) => `
      <section>
        <h3>${s.title}</h3>
        <dl>${rowsFrom(s.rows)}</dl>
        ${s.note ? `<p class="stat-note">${s.note}</p>` : ""}
      </section>
    `
      )
      .join("");
  }

  modal.showModal();
  pinModal(modal, anchor);
}

function renderList(container, data, getStats) {
  const stars = new Set(data.stars || []);
  const sorted = [...data.players].sort((a, b) =>
    lastName(a.name).localeCompare(lastName(b.name))
  );

  const listHtml = sorted
    .map((p) => {
      const isStar = stars.has(p.id);
      const photo = p.photo || `/logos/${data.team === "nest" ? "eagles" : data.team}.svg`;
      return `
        <li class="roster-row${isStar ? " is-star" : ""}" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.name} stats">
          <span class="roster-num">${p.num}</span>
          <img class="roster-thumb${photo.endsWith(".svg") ? " is-mark" : ""}" src="${photo}" alt="" loading="lazy" />
          <div>
            <p class="roster-name">${p.name}</p>
            <p class="roster-role">${p.role}</p>
          </div>
          <span class="roster-hint">Stats</span>
        </li>
      `;
    })
    .join("");

  const starMonth = data.starMonth
    ? new Date(`${data.starMonth}-01T12:00:00Z`).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "this month";

  container.innerHTML = `
    <div class="roster-meta">
      <span><strong>${data.season || ""}</strong> roster</span>
      <span>Updated ${data.updated || "—"}</span>
      <span>Stars refreshed ${starMonth}</span>
    </div>
    <ul class="roster-list">${listHtml}</ul>
    <p class="roster-stars-note"><em>Gold names</em> — top six by current stats &amp; team value, refreshed monthly.</p>
  `;

  const playerMap = new Map(data.players.map((p) => [p.id, p]));

  container.querySelectorAll(".roster-row").forEach((row) => {
    const open = () => {
      const player = playerMap.get(row.dataset.id);
      if (player) openPlayerModal(player, row, getStats);
    };
    row.addEventListener("click", open);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

export async function initRoster(teamId, containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return null;

  container.classList.add("roster-list-wrap");

  try {
    const res = await fetch(`/data/rosters/${teamId}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderList(container, data, options.getStats);
    return data;
  } catch (err) {
    container.innerHTML = `<p class="section-lead">Roster loading… (${err.message})</p>`;
    return null;
  }
}

window.addEventListener("resize", () => {
  const modal = document.querySelector("#rosterModal");
  if (modal?.open && pinnedAnchor) pinModal(modal, pinnedAnchor);
});

document.querySelector("#rosterModal")?.addEventListener("close", () => {
  pinnedAnchor = null;
});
