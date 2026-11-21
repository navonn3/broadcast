(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  // Videos and posters live on R2 on the live site: SITE.mediaBase is its public URL ("" = same folder).
  const M = (p) => p ? (S.mediaBase || "") + p : "";

  // Durations are "m:ss"; a card shows the clip count and the total running time.
  const secs = (d) => { const [m, s] = (d || "0:00").split(":").map(Number); return m * 60 + s; };
  const mmss = (t) => Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");

  function player(c) {
    if (c.youtube) {
      return `<iframe src="https://www.youtube-nocookie.com/embed/${c.youtube}?rel=0" title="${c.title}"
        loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }
    return `<video controls preload="none" playsinline poster="${M(c.poster || `media/posters/${c.id}.jpg`)}"
      src="${M(c.src || `media/clips/${c.id}.mp4`)}" aria-label="${c.title}"></video>`;
  }
  // A reel that is not rendered yet: greyed frame, no video, nothing to click.
  const soon = (c) => `<figure class="clip soon" aria-disabled="true">
      <div class="frame"><span>בקרוב</span></div>
      <figcaption><strong>${c.title}</strong><span>${c.context}</span></figcaption>
    </figure>`;
  const clip = (c) => c.soon ? soon(c) : `<figure class="clip${c.vert ? " vert" : ""}">
      <div class="frame">${player(c)}</div>
      <figcaption><strong>${c.title}</strong></figcaption>
    </figure>`;

  // One card per category: the sports, then hosting. Full broadcasts are the bar under the grid.
  // Rendered reels replace the single clips (Matan 21.11): a sport with a rendered reel shows
  // only its reels. Until then it keeps its singles; reels marked `soon` are not shown.
  // A sport with nothing playable yet gets no card.
  // Cards (Matan 22.11): a photo, the colourful 3D icon at the bottom and a small orange bar.
  // No visible name; the aria-label carries it.
  const ICON = { basketball: "bb", football: "fb", handball: "hb", motorsport: "ms", humor: "fun", hosting: "pod" };
  const cards = S.cards || {};
  const cats = S.sports.map((s) => {
    const ready = (s.reels || []).filter((r) => !r.soon), play = ready.length ? ready : s.clips;
    const first = play[0];
    return {
      id: s.id, name: s.name, note: s.note, clips: play,
      poster: M(cards[s.id] || (first && (first.poster || `media/posters/${first.id}.jpg`)) || "")
    };
  }).filter((c) => c.clips.length);
  cats.push({
    id: "hosting", name: "פודקאסטים והנחיה", note: "ZOOM IN, מטמלל, פודקאסטים של הנבחרות וימי מדיה.", clips: S.hosting,
    poster: M(cards.hosting || (S.hosting[0] ? `media/posters/${S.hosting[0].id}.jpg` : ""))
  });

  const grid = $("catGrid");
  grid.innerHTML = cats.map((c, i) => `<button class="cat" type="button" data-i="${i}" aria-label="${c.name}">
      ${c.poster ? `<img class="cat-photo" src="${c.poster}" alt="" loading="lazy">` : ""}
      ${ICON[c.id] ? `<img class="cat-icon" src="assets/img/icons/${ICON[c.id]}.webp" alt="">` : ""}
      <span class="cat-accent" aria-hidden="true"></span>
    </button>`).join("");

  // Full broadcasts: a full-width bar that opens a list under it (accordion).
  const bar = $("bcBar"), acc = $("bcAcc");
  if (bar) {
    bar.setAttribute("aria-label", `שידורים מלאים, ${S.broadcasts.length} משחקים`);
    if (cards.broadcasts) $("bcPhoto").style.backgroundImage = `url('${M(cards.broadcasts)}')`;
    $("bcList").innerHTML = S.broadcasts.map((b) => `<li>
        <span class="bc-game">${b.game}</span>
        <span class="bc-meta">${[b.date, b.league, b.lang].filter(Boolean).join(" | ")}</span>
        <span class="bc-link">${b.url ? `<a href="${b.url}" target="_blank" rel="noopener">לצפייה בפיקסלוט</a>` : `<span class="soon">בקרוב</span>`}</span>
      </li>`).join("");
    bar.addEventListener("click", () => {
      const open = bar.getAttribute("aria-expanded") === "true";
      bar.setAttribute("aria-expanded", String(!open)); acc.hidden = open;
    });
  }

  const sheet = $("sheet");
  const body = $("sheetBody");
  function open(c) {
    $("sheetTitle").textContent = c.name;
    $("sheetNote").textContent = c.note || "";
    if (c.broadcasts) {
      body.innerHTML = `<ul class="bc">${c.broadcasts.map((b) => `<li>
        <span class="bc-game">${b.game}</span>
        <span class="bc-meta">${[b.date, b.league, b.lang].filter(Boolean).join(" | ")}</span>
        <span class="bc-link">${b.url ? `<a href="${b.url}" target="_blank" rel="noopener">לצפייה בפיקסלוט</a>` : `<span class="soon">בקרוב</span>`}</span>
      </li>`).join("")}</ul>`;
    } else {
      body.innerHTML = c.clips.map(clip).join("");
    }
    // One video: the sheet opens straight into it, playing (the tap is the user gesture).
    // Two or more: one per row, title only (Matan 21.11).
    const one = !c.broadcasts && c.clips.length === 1;
    body.classList.toggle("one", one);
    if (typeof sheet.showModal === "function") sheet.showModal(); else sheet.setAttribute("open", "");
    body.scrollTop = 0;
    if (one) { const v = body.querySelector("video"); if (v) { v.preload = "auto"; v.play().catch(() => {}); } }
  }
  function close() {
    body.querySelectorAll("video").forEach((v) => v.pause());
    if (sheet.open && typeof sheet.close === "function") sheet.close(); else sheet.removeAttribute("open");
  }
  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".cat");
    if (b && !b.disabled) open(cats[+b.dataset.i]);
  });
  $("sheetClose").addEventListener("click", close);
  sheet.addEventListener("click", (e) => { if (e.target === sheet || e.target.closest("[data-close]")) close(); });
  sheet.addEventListener("close", () => {
    body.querySelectorAll("video").forEach((v) => v.pause());
  });

  // Contact: number and address come from SITE.contact in clips.js (buttons after the Pixellot Academy look B).
  const w = S.contact.whatsapp, phone = w ? "0" + w.slice(3, 5) + "-" + w.slice(5) : "";
  ["ctWhatsapp", "ctWhatsapp2"].forEach((id) => { $(id).href = "https://wa.me/" + w; });
  ["ctMail", "ctMail2"].forEach((id) => { $(id).href = "mailto:" + S.contact.email; });
  document.querySelectorAll(".waNum").forEach((e) => (e.textContent = phone));
  document.querySelectorAll(".mailAddr").forEach((e) => (e.textContent = S.contact.email));
})();
