const DATA    = window.PORTFOLIO_DATA || {};
const PROFILE = DATA.PROFILE  || { name: "Your Name", email: "yourname@email.com", github: "#", linkedin: "#" };
const ROLES   = DATA.ROLES    || ["Software Engineering Undergraduate"];
const SKILLS  = DATA.SKILLS   || [];
const PROJECTS= DATA.PROJECTS || [];
const EDUCATION=DATA.EDUCATION|| [];

const CHIP_COLORS = ["mint", "violet", "amber", "coral", "sky"];

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

/* ---- Gradient Chips ---- */
function renderChips() {
  const root = $("[data-chip-row]");
  if (!root) return;

  root.innerHTML = ROLES.map((role, i) => {
    const color = CHIP_COLORS[i % CHIP_COLORS.length];
    const delay = (i * 100) + "ms";
    return `<span class="chip" data-color="${color}" style="animation-delay:${delay}">
      <span class="chip-dot"></span>${escapeHtml(role)}
    </span>`;
  }).join("");
}

/* ---- Typewriter ---- */
const TYPEWRITER_PHRASES = [
  "I'm drawn to frontend development.",
  "I'm curious about QA & testing.",
  "I explore the full-stack space.",
  "I turn ideas into real products.",
];

function setupTypewriter() {
  const el = $("[data-typewriter]");
  if (!el) return;

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;
  let paused    = false;

  const SPEED_TYPE   = 48;
  const SPEED_DELETE = 22;
  const PAUSE_END    = 1800;
  const PAUSE_START  = 320;

  function tick() {
    if (paused) return;
    const phrase = TYPEWRITER_PHRASES[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(() => { deleting = true; paused = false; tick(); }, PAUSE_END);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      el.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % TYPEWRITER_PHRASES.length;
        paused = true;
        setTimeout(() => { paused = false; tick(); }, PAUSE_START);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }

  // Start after a brief delay so chips animate first
  setTimeout(tick, 900);
}

/* ---- Social links ---- */
function setSocialLinks() {
  const map = {
    github:   PROFILE.github,
    linkedin: PROFILE.linkedin,
    email:    `mailto:${PROFILE.email}`,
  };

  $all("[data-social]").forEach((a) => {
    const key  = a.getAttribute("data-social");
    const href = map[key];
    if (!href) return;
    a.setAttribute("href", href);
    if (key !== "email" && href !== "#") {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noreferrer");
    }
  });

  $all("[data-social-value]").forEach((el) => {
    const key = el.getAttribute("data-social-value");
    if (key === "email")    el.textContent = PROFILE.email;
    if (key === "github")   el.textContent = formatHandle(PROFILE.github,   "@yourhandle");
    if (key === "linkedin") el.textContent = formatPath(PROFILE.linkedin,   "/in/your-handle");
  });
}

function formatHandle(url, fallback) {
  try {
    const u = new URL(url);
    const h = u.pathname.replaceAll("/", "");
    return h ? `@${h}` : fallback;
  } catch { return fallback; }
}

function formatPath(url, fallback) {
  try {
    const u = new URL(url);
    return (u.pathname && u.pathname !== "/") ? u.pathname : fallback;
  } catch { return fallback; }
}

/* ---- Skills ---- */
function renderSkills() {
  const root = $("[data-skills]");
  if (!root) return;

  root.innerHTML = SKILLS.map((s, i) => `
    <article class="skill reveal" data-reveal style="transition-delay:${i * 60}ms">
      <div class="skill-top">
        <h3 class="skill-title">${escapeHtml(s.title)}</h3>
        <span class="skill-level">${escapeHtml(s.level || "")}</span>
      </div>
      <ul class="skill-items">
        ${(s.items || []).map(it => `<li>${escapeHtml(it)}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

/* ---- Projects ---- */
function renderProjects() {
  const root = $("[data-projects]");
  if (!root) return;

  root.innerHTML = PROJECTS.map((p, i) => {
    const href = `#project=${encodeURIComponent(p.slug || "")}`;
    return `
      <article class="project reveal" data-reveal style="transition-delay:${i * 80}ms">
        <div class="project-head">
          <h3 class="project-title">
            <a class="project-title-link" href="${escapeAttr(href)}">${escapeHtml(p.title)}</a>
          </h3>
          <p class="project-desc">${escapeHtml(p.description)}</p>
        </div>
        <div class="project-badges">
          ${(p.tech || []).map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("")}
        </div>
        <div class="project-links">
          <a href="${escapeAttr(href)}">Details →</a>
        </div>
      </article>
    `;
  }).join("");
}

/* ---- Project detail ---- */
function setupProjectDetails() {
  const detailSection  = $("[data-project-detail]");
  const projectsSection= $("#projects");
  if (!detailSection || !projectsSection) return;

  const titleEl    = $("[data-detail-title]");
  const descEl     = $("[data-detail-desc]");
  const overviewEl = $("[data-detail-overview]");
  const techEl     = $("[data-detail-tech]");
  const hiEl       = $("[data-detail-highlights]");
  const actionsEl  = $("[data-detail-actions]");
  const backEl     = $("[data-project-back]");

  function slugFromHash() {
    const h = window.location.hash || "";
    if (!h.startsWith("#project=")) return "";
    try { return decodeURIComponent(h.slice(9)).trim(); } catch { return h.slice(9).trim(); }
  }

  function showList() {
    detailSection.hidden = true;
    projectsSection.classList.remove("is-hidden");
  }

  function showDetail(slug) {
    const p = PROJECTS.find(x => String(x.slug || "").toLowerCase() === String(slug || "").toLowerCase());
    if (!p) { showList(); return; }

    if (titleEl)  titleEl.textContent  = p.title || "Project";
    if (descEl)   descEl.textContent   = p.description || "";
    if (overviewEl) overviewEl.textContent = p.overview || p.description || "";

    if (techEl) techEl.innerHTML = (p.tech || []).map(t => `<span class="badge">${escapeHtml(t)}</span>`).join("");

    if (hiEl) {
      const hs = Array.isArray(p.highlights) ? p.highlights : [];
      hiEl.innerHTML = hs.length
        ? hs.map(h => `<li>${escapeHtml(h)}</li>`).join("")
        : `<li class="muted">Add highlights in data.js</li>`;
    }

    if (actionsEl) {
      const parts = [];
      const live = p.links?.live;
      const code = p.links?.code;
      if (live && live !== "#") parts.push(`<a href="${escapeAttr(live)}" target="_blank" rel="noreferrer">Live demo</a>`);
      if (code && code !== "#") parts.push(`<a href="${escapeAttr(code)}" target="_blank" rel="noreferrer">GitHub</a>`);
      else parts.push(`<span class="muted" style="font-size:.85rem">Add GitHub link in data.js</span>`);
      actionsEl.innerHTML = parts.join("");
    }

    projectsSection.classList.add("is-hidden");
    detailSection.hidden = false;
    detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
    setupRevealAnimations();
  }

  function sync() {
    const slug = slugFromHash();
    slug ? showDetail(slug) : showList();
  }

  backEl?.addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, "", "#projects");
    showList();
    projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  window.addEventListener("hashchange", sync);
  sync();
}

/* ---- Education ---- */
function renderEducation() {
  const root = $("[data-education]");
  if (!root) return;

  root.innerHTML = EDUCATION.map((e, i) => `
    <li class="timeline-item reveal" data-reveal style="transition-delay:${i * 80}ms">
      <div class="timeline-when">${escapeHtml(e.when)}</div>
      <div class="timeline-what">
        <h3>${escapeHtml(e.title)} · <span class="muted">${escapeHtml(e.org)}</span></h3>
        <p>${escapeHtml(e.details)}</p>
      </div>
    </li>
  `).join("");
}

/* ---- Reveal animations ---- */
function setupRevealAnimations() {
  const nodes = $all("[data-reveal]").filter(el => !el.hasAttribute("data-reveal-ready"));
  if (!nodes.length) return;
  nodes.forEach(el => el.setAttribute("data-reveal-ready", "true"));

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
    nodes.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "60px 0px -8% 0px" });

  nodes.forEach(el => io.observe(el));
}

/* ---- Nav ---- */
function setupNav() {
  const toggle = $("[data-nav-toggle]");
  const nav    = $("[data-nav]");
  if (!toggle || !nav) return;

  const close = () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); };
  const open  = () => { nav.classList.add("open");    toggle.setAttribute("aria-expanded","true");  };

  toggle.addEventListener("click", () => {
    toggle.getAttribute("aria-expanded") === "true" ? close() : open();
  });

  $all('a[href^="#"]', nav).forEach(a => a.addEventListener("click", close));

  document.addEventListener("click", e => {
    if (!(e.target instanceof Node)) return;
    if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
  });

  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

/* ---- Contact form ---- */
function setupContactForm() {
  const form = $("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    const fd      = new FormData(form);
    const name    = String(fd.get("name")    || "").trim();
    const email   = String(fd.get("email")   || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject = `Portfolio contact from ${name || "someone"}`;
    const body    = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    const mailto  = `mailto:${encodeURIComponent(PROFILE.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

/* ---- Helpers ---- */
function escapeHtml(s) {
  return String(s)
    .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
    .replaceAll('"',"&quot;").replaceAll("'","&#39;");
}

function escapeAttr(s) { return escapeHtml(s).replaceAll("`","&#96;"); }

/* ---- Bootstrap ---- */
function main() {
  const year = $("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  renderChips();
  setupTypewriter();
  setSocialLinks();
  renderSkills();
  renderProjects();
  renderEducation();

  setupNav();
  setupProjectDetails();
  setupContactForm();
  setupRevealAnimations();
}

main();