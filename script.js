import { diagnosisJourney, founderTypes } from "./content.js";
import { enhanceIconography } from "./icons.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const legacyJourneyAnchors = {
  "diagnosis-storage": "storage",
  "diagnosis-sharing": "sharing",
  "diagnosis-stage": "stage",
  "diagnosis-region": "industry-region",
  "diagnosis-mvp": "mvp-link",
  "diagnosis-market": "market-funding-intro",
  "diagnosis-customer": "customer-validation",
  "diagnosis-purchase": "purchase-intent",
  "diagnosis-runway": "runway",
  "diagnosis-revenue": "revenue-plan",
  "diagnosis-plan": "business-plan-intro",
  "diagnosis-problem": "problem-definition",
  "diagnosis-solution": "solution",
  "diagnosis-market-size": "differentiation-market",
  "diagnosis-fund-use": "fund-use-plan",
  "diagnosis-org-check": "programs",
  "diagnosis-org-map": "programs",
  "diagnosis-org-detail": "dashboard-return",
  "diagnosis-review": "review",
  "diagnosis-result": "result-summary",
  "diagnosis-scores": "scores",
  "diagnosis-type": "final-type",
  "diagnosis-risk": "risk",
  "diagnosis-next-action": "priority-actions",
  "diagnosis-action-1": "action-interview",
  "diagnosis-action-2": "action-mvp",
  "diagnosis-action-3": "action-funding",
  "diagnosis-action-4": "action-business-plan",
  "diagnosis-support": "programs",
  "diagnosis-dashboard-return": "dashboard-return",
};

const dom = {
  menuButton: $(".menu-button"),
  mobileMenu: $("#mobile-menu"),
  navLinks: $$(".desktop-nav a, .mobile-menu a"),
  sections: $$("main section[id]"),
  journeyRoot: $("[data-journey-root]"),
  journeyGroups: $("[data-journey-groups]"),
  journeySteps: $("[data-journey-steps]"),
  journeyFlow: $("[data-journey-flow]"),
  journeyImage: $("[data-journey-image]"),
  journeyEyebrow: $("[data-journey-eyebrow]"),
  journeyTitle: $("[data-journey-title]"),
  journeyCaption: $("[data-journey-caption]"),
  journeyInput: $("[data-journey-input]"),
  journeyOutput: $("[data-journey-output]"),
  journeyNextText: $("[data-journey-next-text]"),
  journeyRoute: $("[data-journey-route]"),
  journeyCount: $("[data-journey-count]"),
  journeyPrev: $("[data-journey-prev]"),
  journeyNext: $("[data-journey-next]"),
  journeyOpenImageButtons: $$("[data-open-current-image]"),
  founderTypes: $("[data-founder-types]"),
};

const journeyState = {
  groupIndex: 0,
  stepIndex: 0,
};

const flatJourney = diagnosisJourney.flatMap((group, groupIndex) =>
  group.steps.map((step, stepIndex) => ({
    group,
    step,
    groupIndex,
    stepIndex,
  })),
);

let imageModal;

function setActive(items, activeItem) {
  items.forEach((item) => {
    const isActive = item === activeItem;
    item.classList.toggle("active", isActive);
    if (item.matches('[role="tab"]')) item.setAttribute("aria-selected", String(isActive));
  });
}

function bindTabGroup({ tabSelector, panelSelector, tabKey, panelKey }) {
  $$(tabSelector).forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset[tabKey];
      setActive($$(tabSelector), button);
      $$(panelSelector).forEach((panel) => {
        panel.classList.toggle("active", panel.dataset[panelKey] === target);
      });
    });
  });
}

function getCurrentJourneyItem() {
  const group = diagnosisJourney[journeyState.groupIndex];
  const step = group.steps[journeyState.stepIndex];
  return { group, step };
}

function getFlatIndex(groupIndex = journeyState.groupIndex, stepIndex = journeyState.stepIndex) {
  return flatJourney.findIndex((item) => item.groupIndex === groupIndex && item.stepIndex === stepIndex);
}

function setJourneyPosition(groupIndex, stepIndex = 0, shouldScroll = false) {
  journeyState.groupIndex = Math.max(0, Math.min(groupIndex, diagnosisJourney.length - 1));
  const group = diagnosisJourney[journeyState.groupIndex];
  journeyState.stepIndex = Math.max(0, Math.min(stepIndex, group.steps.length - 1));
  renderJourney();

  if (shouldScroll) {
    scrollToSectionStart($("#diagnosis"));
  }
}

function selectJourneyStep(stepId, shouldScroll = true) {
  const target = flatJourney.find((item) => item.step.id === stepId);
  if (!target) return false;
  setJourneyPosition(target.groupIndex, target.stepIndex, shouldScroll);
  return true;
}

function renderJourneyGroups() {
  if (!dom.journeyGroups) return;
  dom.journeyGroups.innerHTML = diagnosisJourney
    .map(
      (group, index) => `
        <button
          class="journey-main-tab"
          type="button"
          role="tab"
          aria-selected="${index === journeyState.groupIndex}"
          data-journey-group="${index}"
          data-anchor="diagnosis-${group.id}"
          style="--tab-accent: ${group.tone.accent}; --tab-soft: ${group.tone.soft};"
        >
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${group.title}</strong>
          <em>${group.steps.length}개 화면</em>
        </button>
      `,
    )
    .join("");

  $$("[data-journey-group]", dom.journeyGroups).forEach((button) => {
    button.addEventListener("click", () => {
      setJourneyPosition(Number(button.dataset.journeyGroup), 0);
    });
  });
}

function renderJourneySteps() {
  if (!dom.journeySteps) return;
  const { group } = getCurrentJourneyItem();

  dom.journeySteps.innerHTML = group.steps
    .map(
      (step, index) => `
        <button
          class="journey-sub-tab"
          type="button"
          role="tab"
          aria-selected="${index === journeyState.stepIndex}"
          data-journey-step="${index}"
          data-journey-step-anchor="diagnosis-${step.id}"
        >
          <span>${String(index + 1).padStart(2, "0")}</span>
          ${step.label}
        </button>
      `,
    )
    .join("");

  $$("[data-journey-step]", dom.journeySteps).forEach((button) => {
    button.addEventListener("click", () => {
      setJourneyPosition(journeyState.groupIndex, Number(button.dataset.journeyStep));
    });
  });
}

function renderJourneyFlow() {
  if (!dom.journeyFlow) return;
  const { group } = getCurrentJourneyItem();

  dom.journeyFlow.innerHTML = group.steps
    .map(
      (step, index) => `
        <button
          class="journey-flow-item"
          type="button"
          data-journey-flow-step="${index}"
          aria-current="${index === journeyState.stepIndex ? "step" : "false"}"
        >
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${step.label}</strong>
          <em>${step.next}</em>
        </button>
      `,
    )
    .join("");

  $$("[data-journey-flow-step]", dom.journeyFlow).forEach((button) => {
    button.addEventListener("click", () => {
      setJourneyPosition(journeyState.groupIndex, Number(button.dataset.journeyFlowStep));
    });
  });
}

function renderJourney() {
  if (!dom.journeyRoot) return;

  const { group, step } = getCurrentJourneyItem();
  const flatIndex = getFlatIndex();
  const isFirst = flatIndex <= 0;
  const isLast = flatIndex >= flatJourney.length - 1;

  dom.journeyRoot.style.setProperty("--journey-accent", group.tone.accent);
  dom.journeyRoot.style.setProperty("--journey-soft", group.tone.soft);
  dom.journeyRoot.style.setProperty("--journey-wash", group.tone.wash);

  renderJourneyGroups();
  renderJourneySteps();
  renderJourneyFlow();

  if (dom.journeyImage) {
    dom.journeyImage.src = step.image;
    dom.journeyImage.alt = step.alt;
  }
  if (dom.journeyEyebrow) dom.journeyEyebrow.textContent = `${group.shortLabel} · ${step.label}`;
  if (dom.journeyTitle) dom.journeyTitle.textContent = step.title;
  if (dom.journeyCaption) dom.journeyCaption.textContent = step.role;
  if (dom.journeyInput) dom.journeyInput.textContent = step.input;
  if (dom.journeyOutput) dom.journeyOutput.textContent = step.output;
  if (dom.journeyNextText) dom.journeyNextText.textContent = step.next;
  if (dom.journeyRoute) dom.journeyRoute.textContent = step.route;
  if (dom.journeyCount) dom.journeyCount.textContent = `${flatIndex + 1} / ${flatJourney.length}`;

  dom.journeyPrev?.toggleAttribute("disabled", isFirst);
  dom.journeyNext?.toggleAttribute("disabled", isLast);
}

function moveJourney(offset) {
  const nextFlatIndex = getFlatIndex() + offset;
  const next = flatJourney[nextFlatIndex];
  if (!next) return;
  setJourneyPosition(next.groupIndex, next.stepIndex);
}

function bindJourney() {
  if (!dom.journeyRoot) return;
  renderJourney();
  dom.journeyPrev?.addEventListener("click", () => moveJourney(-1));
  dom.journeyNext?.addEventListener("click", () => moveJourney(1));

  dom.journeyOpenImageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const { group, step } = getCurrentJourneyItem();
      openImageModal(step.image, step.alt, `${group.title} · ${step.title}`);
    });
  });

  dom.journeyImage?.addEventListener("dblclick", () => {
    const { group, step } = getCurrentJourneyItem();
    openImageModal(step.image, step.alt, `${group.title} · ${step.title}`);
  });
}

function renderFounderTypes() {
  if (!dom.founderTypes) return;

  dom.founderTypes.innerHTML = founderTypes
    .map(
      (type, index) => `
        <article class="type-card type-card-${type.tone}${type.featured ? " featured" : ""}">
          <div class="type-card-topline">
            <span>${String(index + 1).padStart(2, "0")}</span>
            ${type.featured ? "<em>live 예시</em>" : ""}
          </div>
          <h4>${type.name}</h4>
          <strong>${type.signal}</strong>
          <p>${type.meaning}</p>
          <dl>
            <dt>핵심 질문</dt>
            <dd>${type.question}</dd>
            <dt>우선 보완</dt>
            <dd>${type.action}</dd>
            <dt>연결하기 좋은 지원</dt>
            <dd>${type.support}</dd>
          </dl>
        </article>
      `,
    )
    .join("");
}

function bindMenu() {
  dom.menuButton?.addEventListener("click", () => {
    const isOpen = dom.menuButton.getAttribute("aria-expanded") === "true";
    dom.menuButton.setAttribute("aria-expanded", String(!isOpen));
    dom.mobileMenu.hidden = isOpen;
  });

  dom.mobileMenu?.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    dom.mobileMenu.hidden = true;
    dom.menuButton.setAttribute("aria-expanded", "false");
  });
}

function bindShotTabs() {
  $$(".shot-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest(".feature-panel");
      const image = panel?.querySelector(".feature-main-image");
      if (!panel || !image) return;

      image.src = button.dataset.shotSrc;
      image.alt = button.dataset.shotAlt || button.textContent.trim();
      setActive($$(".shot-tab", panel), button);
    });
  });
}

function bindAccordion() {
  $$(".accordion summary").forEach((summary) => {
    summary.addEventListener("click", () => {
      const details = summary.parentElement;
      const group = details.closest(".accordion");
      $$("details", group).forEach((item) => {
        if (item !== details) item.removeAttribute("open");
      });
    });
  });
}

function createImageModal() {
  imageModal = document.createElement("div");
  imageModal.className = "image-modal";
  imageModal.hidden = true;
  imageModal.setAttribute("role", "dialog");
  imageModal.setAttribute("aria-modal", "true");
  imageModal.setAttribute("aria-labelledby", "image-modal-title");
  imageModal.innerHTML = `
    <div class="image-modal-backdrop" data-close-image-modal></div>
    <section class="image-modal-panel">
      <header>
        <h2 id="image-modal-title"></h2>
        <button class="secondary-action" type="button" data-close-image-modal>닫기</button>
      </header>
      <img alt="" />
    </section>
  `;
  document.body.append(imageModal);

  imageModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-image-modal]")) closeImageModal();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !imageModal.hidden) closeImageModal();
  });
}

function openImageModal(src, alt, title) {
  if (!imageModal) createImageModal();
  const image = $("img", imageModal);
  const heading = $("#image-modal-title", imageModal);
  image.src = src;
  image.alt = alt || title;
  heading.textContent = title || alt || "이미지 크게 보기";
  imageModal.hidden = false;
  document.body.classList.add("modal-open");
  $("[data-close-image-modal]", imageModal)?.focus();
}

function closeImageModal() {
  imageModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function bindImageZoom() {
  const zoomSelectors = [
    ".browser-frame img",
    ".phone-frame img",
    ".feature-main-image",
    ".validation-gallery img",
    "[data-journey-image]",
  ].join(",");

  $$(zoomSelectors).forEach((image) => {
    image.classList.add("zoomable-image");
    image.title = "더블클릭하면 크게 볼 수 있습니다.";
    image.addEventListener("dblclick", () => {
      openImageModal(image.currentSrc || image.src, image.alt, image.alt);
    });
  });
}

function scrollToSectionStart(section) {
  if (!section) return;
  const headerHeight = $(".topbar")?.offsetHeight || 82;
  const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
}

function openAnchorRoute(hash) {
  const anchor = hash.replace(/^#/, "");
  if (!anchor) return;

  const journeyStepId = legacyJourneyAnchors[anchor] || anchor.replace(/^diagnosis-/, "");
  if (selectJourneyStep(journeyStepId, false)) {
    scrollToSectionStart($("#diagnosis"));
    return;
  }

  const journeyGroupButton = $(`[data-journey-group][data-anchor="${anchor}"]`);
  if (journeyGroupButton) {
    journeyGroupButton.click();
    scrollToSectionStart($("#diagnosis"));
    return;
  }

  const routeHandlers = [
    {
      button: $(`[data-overview-tab][data-anchor="${anchor}"]`),
      section: "#overview",
    },
    {
      button: $(`[data-feature-tab][data-anchor="${anchor}"]`),
      section: "#dashboard",
    },
    {
      button: $(`[data-tech-tab][data-anchor="${anchor}"]`),
      section: "#tech-info",
    },
  ];

  const directRoute = routeHandlers.find(({ button }) => button);
  if (directRoute) {
    directRoute.button.click();
    scrollToSectionStart($(directRoute.section));
    return;
  }

  const shotButton = $(`.shot-tab[data-anchor="${anchor}"]`);
  if (shotButton) {
    const panel = shotButton.closest("[data-feature-panel]");
    const parentFeature = panel?.dataset.featurePanel;
    $(`[data-feature-tab="${parentFeature}"]`)?.click();
    shotButton.click();
    scrollToSectionStart($("#dashboard"));
    return;
  }

  scrollToSectionStart(document.getElementById(anchor));
}

function bindHashRoutes() {
  window.addEventListener("hashchange", () => openAnchorRoute(window.location.hash));
  window.addEventListener("load", () => {
    openAnchorRoute(window.location.hash);
    window.setTimeout(() => openAnchorRoute(window.location.hash), 150);
  });
}

function bindSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      dom.navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: [0.05, 0.2, 0.5],
    },
  );

  dom.sections.forEach((section) => observer.observe(section));
}

function init() {
  bindMenu();
  bindTabGroup({
    tabSelector: "[data-overview-tab]",
    panelSelector: "[data-overview-panel]",
    tabKey: "overviewTab",
    panelKey: "overviewPanel",
  });
  bindTabGroup({
    tabSelector: "[data-feature-tab]",
    panelSelector: "[data-feature-panel]",
    tabKey: "featureTab",
    panelKey: "featurePanel",
  });
  bindTabGroup({
    tabSelector: "[data-tech-tab]",
    panelSelector: "[data-tech-panel]",
    tabKey: "techTab",
    panelKey: "techPanel",
  });
  bindJourney();
  renderFounderTypes();
  enhanceIconography();
  bindShotTabs();
  bindAccordion();
  bindImageZoom();
  bindHashRoutes();
  bindSectionObserver();
}

init();
