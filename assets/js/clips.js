// Site content. Each clip plays from `youtube` (unlisted video id) when set,
// otherwise from the local preview file in media/ (git-ignored, local only).
window.SITE = {
  // Contact buttons. WHATSAPP: international format, digits only (e.g. "9725XXXXXXXX").
  // While it is empty the WhatsApp button shows as "בקרוב" and does not link anywhere.
  contact: {
    whatsapp: "972545221461",
    email: "navonn3@gmail.com"
  },
  // Media (videos, posters) on R2, bucket broadcaster-site (public r2.dev). To move hosts, change this one URL.
  // Off the live site (local preview, the claude.ai preview) the media/ folder next to the page is used.
  mediaBase: /\.github\.io$/.test(location.hostname) ? "https://pub-449558ab35ee413dad0843abd169887a.r2.dev/" : "",
  sports: [
    {
      id: "basketball",
      name: "כדורסל",
      note: "עונת 2026-27: ליגה לאומית ונוער-על",
      // Reels not rendered yet: greyed "בקרוב", not clickable.
      reels: [
        { id: "bb-1", soon: true, title: "הפועל ת״א, אלופת נערים א׳", context: "ריל | בקרוב" },
        { id: "bb-2", soon: true, title: "הטבעות ומהלכים", context: "ריל | בקרוב" },
        { id: "bb-3", soon: true, title: "ליגה לאומית", context: "ריל | בקרוב" },
        { id: "bb-4", soon: true, title: "ריצות ושלשות", context: "ריל | בקרוב" },
        { id: "bb-5", soon: true, title: "ילדים ובתי ספר", context: "ריל | בקרוב" }
      ],
      clips: [
        { id: "bb-kg-winner", dur: "0:27", title: "תומר כהן, סל הניצחון בשמונה עשיריות", context: "ליגה לאומית, אשקלון/קריית גת–הפועל חיפה 80-79 | 10.11.2026", youtube: null },
        { id: "bb-kg-three", dur: "0:13", title: "כהן רוצה שלשה, ומוצא אותה", context: "ליגה לאומית, אשקלון/קריית גת–הפועל חיפה | רבע רביעי", youtube: null },
        { id: "bb-hz-e94", dur: "0:14", title: "שבתאי סוגר עניין מהפינה", context: "נוער-על, בני הרצליה–מכבי חיפה אסי 77-69 | 16.11.2026", youtube: null },
        { id: "bb-hz-e95", dur: "0:15", title: "נחמיאס והמסמר האחרון", context: "נוער-על, בני הרצליה–מכבי חיפה אסי | הדקה האחרונה", youtube: null },
        { id: "bb-hz-e83", dur: "0:12", title: "שלשה של שבתאי, וכמה שזה חשוב", context: "נוער-על, בני הרצליה–מכבי חיפה אסי | רבע רביעי", youtube: null }
      ]
    },
    {
      id: "football",
      name: "כדורגל",
      note: "גמרי גביע המדינה לנוער, IFA TV",
      // Reels first (21.11, from the reel planning page): 720p phone encode + poster in media/reels/.
      reels: [
        { id: "fb-1", reel: true, dur: "1:06", title: "גמר גביע נערים ב׳: הפועל ת״א", context: "ריל | הפועל ת״א–מכבי נתניה 6-1, 24.5.2026", src: "media/reels/fb-1_phone.mp4?v=2", poster: "media/reels/fb-1.jpg?v=2", youtube: null },
        { id: "fb-2", reel: true, dur: "1:23", title: "עוד גמרים, ושני שערים מאוחרים", context: "ריל | גוסרסקי, דחק וגביע הילדים של מכבי ת״א", src: "media/reels/fb-2_phone.mp4?v=2", poster: "media/reels/fb-2.jpg?v=2", youtube: null }
      ],
      clips: [
        { id: "fb-engelstein", dur: "0:22", title: "אנגלשטיין פותח מחוץ לרחבה", context: "גמר גביע המדינה ילדים א׳, מכבי ת״א–מכבי נתניה", youtube: null },
        { id: "fb-mansour", dur: "0:21", title: "מנסור משלים צמד, 3-0", context: "גמר גביע נערים ג׳, מכבי נתניה–מכבי ת״א", youtube: null },
        { id: "fb-six-one", dur: "0:31", title: "6-1 וגמר עצום", context: "גמר גביע נערים ב׳, הפועל ת״א–מכבי נתניה", youtube: null }
      ]
    },
    {
      id: "handball",
      name: "כדוריד",
      note: "ליגת העל",
      // Reels first (21.11, from the reel planning page): 720p phone encode + poster in media/reels/.
      reels: [
        { id: "hb-1", reel: true, dur: "1:10", title: "חצי גמר הגביע: המהלכים", context: "ריל | ראשון לציון–חולון, חצי גמר גביע המדינה", src: "media/reels/hb-1_phone.mp4?v=2", poster: "media/reels/hb-1.jpg?v=2", youtube: null }
      ],
      clips: [
        { id: "hb-or-levi", dur: "1:34", title: "אור לוי, 10 שערים", context: "ליגת העל", youtube: null },
        { id: "hb-sticky-ball", dur: "0:38", title: "הכדור הדביק", context: "ליגת העל", youtube: null }
      ]
    },
    {
      id: "motorsport",
      name: "מירוץ מכוניות",
      note: "ליגת מרוצי פיג'ו (פרודרייב), מסלול ערד",
      // Reels not rendered yet: greyed "בקרוב", not clickable.
      reels: [
        { id: "ms-1", reel: true, dur: "0:32", title: "אליפות ישראל בקארטינג", context: "ריל | עקיפות ומאבקים על המסלול", src: "media/reels/ms-1_phone.mp4", poster: "media/reels/ms-1.jpg", youtube: null }
      ],
      clips: [
        { id: "ms-race-start", dur: "0:37", title: "הדגל באוויר, וחמאדה כבר עוקף", context: "ליגת מרוצי פיג'ו, מרוץ טורינג | ערד 9.12.22", youtube: null },
        { id: "ms-race-battle", dur: "0:15", title: "איזה קרב מטורף", context: "אהלן מול תומר אורשובסקי | ערד 9.12.22", youtube: null }
      ]
    },
    {
      id: "humor",
      name: "הומור",
      note: "הרגעים המצחיקים מהשידורים",
      reels: [
        { id: "fun-1", reel: true, dur: "0:45", title: "הומור", context: "ריל | הרגעים המצחיקים מהשידורים", src: "media/reels/fun-1_phone.mp4", poster: "media/reels/fun-1.jpg", youtube: null }
      ],
      clips: []
    }
  ],
  // Full broadcasts: links get filled once uploaded (YouTube unlisted).
  // Full broadcasts: games Matan called this season (his calendar + the Leumit assignment sheet),
  // newest first, each linking to the full game on IBBA TV (Pixellot).
  broadcasts: [
    { date: "16.11.2026", game: "בני הרצליה–מכבי חיפה אסי 77-69", league: "נוער-על, מחזור 5", url: "https://tv.ibasketball.co.il/events/6ac7a9b32578dd44b37b2f00/" },
    { date: "10.11.2026", game: "א.ס. אשקלון/קריית גת–הפועל חיפה 80-79", league: "ליגה לאומית, מחזור 5", url: "https://tv.ibasketball.co.il/events/6aee173bc453160d67244ce3/" },
    { date: "9.11.2026", game: "מכבי רחובות–עירוני נס ציונה", league: "נוער-על, מחזור 4", url: "https://tv.ibasketball.co.il/events/6ac7a94e2578dd44b37b2a55/" },
    { date: "6.11.2026", game: "אליצור נתניה–עירוני אשקלון 88-83", league: "ליגה לאומית, מחזור 4", url: "https://tv.ibasketball.co.il/events/6ae471b0001eafc8b5366485/" },
    { date: "2.11.2026", game: "א.ס. רמת השרון–מכבי רעננה", league: "גביע המדינה לנוער, סיבוב א", url: "https://tv.ibasketball.co.il/events/6ae635f2c453160d671939d7/" },
    { date: "23.10.2026", game: "א.ס. אשקלון/קריית גת–מכבי רעננה 84-96", league: "ליגה לאומית, מחזור 2", url: "https://tv.ibasketball.co.il/events/6ad9b406cd2ba8b56da8de3b/" },
    { date: "19.10.2026", game: "מכבי אשדוד–עירוני נס ציונה", league: "נוער-על, מחזור 2", url: "https://tv.ibasketball.co.il/events/6ac7a9412578dd44b37b29cc/" },
    { date: "16.10.2026", game: "א.ס. רמת השרון–מ.כ עוטף דרום 86-78", league: "ליגה לאומית, מחזור 1", url: "https://tv.ibasketball.co.il/events/6acf1761a4a50c18aa11b3a8/" },
    { date: "4.10.2026", game: "עירוני נהריה–הפועל חיפה", league: "גביע ספורטגום לאומית, חצי גמר", url: "https://tv.ibasketball.co.il/events/6ac1fe0fc03642db7f01f010/" }
  ],
  // Podcasts and hosting: vertical (9:16) pieces, so `vert: true`.
  hosting: [
    { id: "pod-zoomin-katzir", vert: true, dur: "0:58", title: "ZOOM IN | דן קציר", context: "מאמן מכבי אשדוד, מתוך ZOOM IN, הפודקאסט שאני מגיש", youtube: null },
    { id: "pod-kadetim", vert: true, dur: "1:54", title: "פודקאסט הקדטים: סיכום האליפות", context: "דייוויד מוזס, רום סטולר והדור הבא", youtube: null },
    { id: "pod-noar-qf", vert: true, dur: "1:36", title: "נבחרת הנוער לפני רבע הגמר", context: "פודקאסט אליפות אירופה עד גיל 18: הסקאוטינג על סלובניה", youtube: null },
    { id: "pod-matamlel-stoler", vert: true, dur: "1:06", title: "מטמלל | רום סטולר", context: "פודקאסט הליגה הלאומית והנוער", youtube: null },
    { id: "pod-matamlel-ashdod", vert: true, dur: "1:01", title: "מטמלל | אשדוד בדרך לסדרת הגמר?", context: "פודקאסט הליגה הלאומית, פרק 29", youtube: null },
    { id: "host-u18-qa-full", vert: true, dur: "1:22", title: "יום מדיה, נבחרת U18: מסי או רונלדו?", context: "ראיונות קצרים עם שחקני הנבחרת לפני אליפות אירופה", youtube: null }
  ]
};
