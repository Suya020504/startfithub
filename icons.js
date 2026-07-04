const iconPaths = {
  activity: '<path d="M22 12h-4l-3 7L9 5l-3 7H2"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  badgeCheck: '<path d="M7.5 4.2 12 2l4.5 2.2 5 1-.7 5 2.2 4.6-4.4 2.4-2.1 4.8-4.5-2.1-4.5 2.1-2.1-4.8L1 14.8l2.2-4.6-.7-5 5-1Z"/><path d="m8.8 12.1 2.2 2.2 4.6-4.8"/>',
  barChart: '<path d="M3 3v18h18"/><path d="M7 16v-5"/><path d="M12 16V7"/><path d="M17 16v-8"/>',
  bookOpen: '<path d="M12 7v14"/><path d="M3 5.8A2.8 2.8 0 0 1 5.8 3H12v18H5.8A2.8 2.8 0 0 1 3 18.2Z"/><path d="M12 3h6.2A2.8 2.8 0 0 1 21 5.8v12.4a2.8 2.8 0 0 1-2.8 2.8H12Z"/>',
  brain: '<path d="M8 5a3 3 0 0 0-3 3 3 3 0 0 0-2 2.8A3.2 3.2 0 0 0 6.2 14H8"/><path d="M16 5a3 3 0 0 1 3 3 3 3 0 0 1 2 2.8A3.2 3.2 0 0 1 17.8 14H16"/><path d="M8 5v14a3 3 0 0 0 3-3"/><path d="M16 5v14a3 3 0 0 1-3-3"/><path d="M8 10h3"/><path d="M13 10h3"/><path d="M8 15h3"/><path d="M13 15h3"/>',
  building: '<path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16"/><path d="M2 21h20"/><path d="M8 7h1"/><path d="M12 7h1"/><path d="M8 11h1"/><path d="M12 11h1"/><path d="M8 15h1"/><path d="M12 15h1"/><path d="M17 9h1a2 2 0 0 1 2 2v10"/>',
  chartLine: '<path d="M3 3v18h18"/><path d="m6 15 4-4 3 3 5-7"/>',
  chevronsUp: '<path d="m7 11 5-5 5 5"/><path d="m7 18 5-5 5 5"/>',
  circleDollar: '<circle cx="12" cy="12" r="10"/><path d="M16 8h-5a2.5 2.5 0 0 0 0 5h2a2.5 2.5 0 0 1 0 5H8"/><path d="M12 6v2"/><path d="M12 18v2"/>',
  clipboardCheck: '<path d="M9 5h6"/><path d="M9 3h6v4H9z"/><path d="M7 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><path d="m8.5 14 2.2 2.2 4.8-5.2"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
  fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
  gauge: '<path d="M21 12a9 9 0 1 0-18 0"/><path d="M12 12l4-4"/><path d="M7 13h.01"/><path d="M17 13h.01"/><path d="M12 17h.01"/>',
  handshake: '<path d="m11 17 2 2a2.8 2.8 0 0 0 4 0l3-3a2 2 0 0 0 0-3l-5-5"/><path d="m9 7 2-2a2.8 2.8 0 0 1 4 0l1 1"/><path d="m2 12 5-5 4 4-5 5Z"/><path d="m13 9 4 4"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  mapPinned: '<path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3Z"/><path d="M9 3v15"/><path d="M15 6v15"/><circle cx="17" cy="9" r="2"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/>',
  pieChart: '<path d="M21 12a9 9 0 1 1-9-9v9Z"/><path d="M12 3a9 9 0 0 1 9 9h-9Z"/>',
  presentation: '<path d="M3 4h18"/><path d="M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4"/><path d="m8 22 4-6 4 6"/>',
  route: '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 6h4a5 5 0 0 1 0 10H8"/>',
  searchCheck: '<path d="m21 21-4.3-4.3"/><circle cx="11" cy="11" r="8"/><path d="m8.5 11 1.7 1.7 3.8-4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
  sparkles: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8Z"/><path d="m5 2 .8 2.2L8 5l-2.2.8L5 8l-.8-2.2L2 5l2.2-.8Z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
};

const textIconRules = [
  ["Privacy", "lock"],
  ["개인정보", "lock"],
  ["공유", "shield"],
  ["기관", "building"],
  ["정책금융", "circleDollar"],
  ["자금", "circleDollar"],
  ["시장", "target"],
  ["고객", "user"],
  ["MVP", "presentation"],
  ["성장", "chartLine"],
  ["AI", "brain"],
  ["데이터", "database"],
  ["사업계획", "fileText"],
  ["진단", "gauge"],
  ["보완", "clipboardCheck"],
  ["상담", "message"],
];

const navIcons = {
  overview: "pieChart",
  diagnosis: "route",
  dashboard: "barChart",
  validation: "badgeCheck",
  data: "database",
  safety: "shield",
  faq: "message",
};

const featureIcons = {
  summary: "barChart",
  ai: "brain",
  org: "building",
  consult: "message",
  growth: "chartLine",
  mypage: "user",
};

export function icon(name, className = "icon") {
  const template = document.createElement("template");
  template.innerHTML = `
    <svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${iconPaths[name] ?? iconPaths.sparkles}
    </svg>
  `.trim();
  return template.content.firstElementChild;
}

function pickIcon(text, fallback = "sparkles") {
  const normalized = text.replace(/\s+/g, " ");
  const matched = textIconRules.find(([keyword]) => normalized.includes(keyword));
  return matched?.[1] ?? fallback;
}

function prependIcon(element, name, className) {
  if (!element || element.querySelector(":scope > .icon")) return;
  element.prepend(icon(name, className));
  element.classList.add("with-icon");
}

export function enhanceIconography() {
  document.querySelectorAll(".desktop-nav a, .mobile-menu a").forEach((link) => {
    const key = link.getAttribute("href")?.replace("#", "");
    prependIcon(link, navIcons[key] ?? "sparkles", "icon nav-icon");
  });

  document.querySelectorAll(".feature-tab").forEach((button) => {
    prependIcon(button, featureIcons[button.dataset.featureTab] ?? "sparkles", "icon tab-icon");
  });

  document.querySelectorAll(".process-cards article, .metric-grid article, .data-grid article, .safety-grid article").forEach(
    (card, index) => {
      const label = card.querySelector("strong, h3")?.textContent ?? "";
      card.style.setProperty("--card-accent-index", String((index % 4) + 1));
      prependIcon(card, pickIcon(label), "icon card-icon");
    }
  );

  document.querySelectorAll(".diagnosis-flow article").forEach((card) => {
    const iconName = pickIcon(card.textContent ?? "", "route");
    prependIcon(card, iconName, "icon flow-icon");
  });

  prependIcon(document.querySelector(".hero-note"), "sparkles", "icon note-icon");
  prependIcon(document.querySelector(".menu-button"), "menu", "icon button-icon");
  prependIcon(document.querySelector(".carousel-prev"), "arrowLeft", "icon button-icon");
  document.querySelector(".carousel-next")?.append(icon("arrowRight", "icon button-icon"));
}
