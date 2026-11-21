(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  // Videos and posters live on R2 on the live site: SITE.mediaBase is its public URL ("" = same folder).
  const M = (p) => (S.mediaBase || "") + p;

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
      <figcaption><strong>${c.title}</strong><span>${c.context}${c.dur ? ` | <span class="dur">${c.dur}</span>` : ""}</span></figcaption>
    </figure>`;

  // One card per category: the sports, then full broadcasts and hosting.
  // Rendered reels replace the single clips (Matan 21.11): a sport with a rendered reel shows
  // only its reels. Until then it keeps its singles; reels marked `soon` are not shown.
  // A sport with nothing playable yet gets no card.
  const cats = S.sports.map((s) => {
    const ready = (s.reels || []).filter((r) => !r.soon), play = ready.length ? ready : s.clips;
    const n = play.length;
    const count = ready.length ? (n === 1 ? "ריל אחד" : `${n} רילים`) : `${n} קטעים`;
    const first = play[0];
    return {
      id: s.id, name: s.name, note: s.note, clips: play,
      meta: `${count} | ${mmss(play.reduce((a, c) => a + secs(c.dur), 0))}`,
      poster: first && M(first.poster || `media/posters/${first.id}.jpg`)
    };
  }).filter((c) => c.clips.length);
  cats.push({
    id: "broadcasts", name: "שידורים מלאים", note: "המשחקים ששידרתי העונה, מהשריקה הראשונה ועד האחרונה, ב-IBBA TV (פיקסלוט).",
    meta: `${S.broadcasts.length} משחקים`, broadcasts: S.broadcasts
  });
  cats.push({
    id: "hosting", name: "פודקאסטים והנחיה", note: "ZOOM IN, מטמלל, פודקאסטים של הנבחרות וימי מדיה.", clips: S.hosting,
    meta: `${S.hosting.length} קטעים | ${mmss(S.hosting.reduce((a, c) => a + secs(c.dur), 0))}`, poster: S.hosting[0] && M(`media/posters/${S.hosting[0].id}.jpg`)
  });

  const grid = $("catGrid");
  grid.innerHTML = cats.map((c, i) => {
    const soon = !!c.soon;
    const bg = c.poster ? ` style="background-image:url('${c.poster}')"` : "";
    return `<button class="cat${soon ? " cat-soon" : ""}${c.poster ? "" : " cat-plain"}" type="button" data-i="${i}"${soon ? " disabled" : ""}${bg}>
      <span class="cat-go" aria-hidden="true">${soon ? "…" : "‹"}</span>
      <span class="cat-name">${c.name}</span>
      <span class="cat-meta">${c.meta}</span>
    </button>`;
  }).join("");

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
    if (typeof sheet.showModal === "function") sheet.showModal(); else sheet.setAttribute("open", "");
    body.scrollTop = 0;
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

  // Contact: number and address come from SITE.contact in clips.js.
  ["ctWhatsapp", "ctWhatsapp2"].forEach((id) => {
    const wa = $(id);
    if (S.contact.whatsapp) {
      wa.href = "https://wa.me/" + S.contact.whatsapp;
    } else {
      wa.textContent = "וואטסאפ (בקרוב)";
      wa.setAttribute("aria-disabled", "true");
    }
  });
  const mail = $("ctEmail");
  mail.href = "mailto:" + S.contact.email;
  mail.textContent = S.contact.email;
  const copy = $("copyMail");
  copy.addEventListener("click", () => {
    const done = () => { copy.textContent = "הועתק"; setTimeout(() => (copy.textContent = "העתק"), 1600); };
    const pick = () => { const r = document.createRange(); r.selectNodeContents(mail); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(S.contact.email).then(done, pick);
    } else pick();
  });
})();
