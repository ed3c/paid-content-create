import { platforms, platformById } from "./data/platforms.ts";
import { sources } from "./data/sources.ts";
import { defaultProfile, recommend } from "./domain/recommendation-engine.ts";
import { estimateFees } from "./domain/payout-cost.ts";
import type {
  AudienceMarket,
  BusinessStage,
  CreatorProfile,
  DecisionPriority,
  FeeEstimateInput,
  FeeProvider,
  PlatformRecord,
  ProductType,
  Recommendation,
  VerificationStatus
} from "./types.ts";

const PROFILE_KEY = "creator-revenue-router:profile:v1";
const CHECKLIST_KEY = "creator-revenue-router:checklist:v1";

const statusLabels: Record<VerificationStatus, string> = {
  official: "Official",
  conditional: "Conditional",
  "verify-in-account": "Verify in account",
  "not-recommended": "Not recommended"
};

const marketLabels: Record<AudienceMarket, string> = {
  taiwan: "台灣",
  global: "全球",
  mainland: "中國大陸"
};

const productLabels: Record<ProductType, string> = {
  "digital-product": "數位商品",
  newsletter: "電子報",
  membership: "會員",
  course: "課程",
  software: "軟體 / SaaS",
  "platform-native": "平台原生分潤"
};

const stageLabels: Record<BusinessStage, string> = {
  individual: "個人",
  registered: "工作室 / 行號",
  company: "公司"
};

const providerLabels: Record<FeeProvider, string> = {
  polar: "Polar Starter",
  "lemon-squeezy": "Lemon Squeezy",
  gumroad: "Gumroad Direct"
};

function requiredElement<T extends Element>(
  selector: string,
  scope: ParentNode = document
): T {
  const element = scope.querySelector<T>(selector);
  if (!element) throw new Error(`Missing required element: ${selector}`);
  return element;
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function asNumber(value: FormDataEntryValue | null, fallback = 0): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage can be disabled. The app still works without persistence.
  }
}

function readProfile(form: HTMLFormElement): CreatorProfile {
  const data = new FormData(form);
  return {
    market: String(data.get("market") ?? "taiwan") as AudienceMarket,
    product: String(data.get("product") ?? "newsletter") as ProductType,
    stage: String(data.get("stage") ?? "individual") as BusinessStage,
    priority: String(data.get("priority") ?? "speed") as DecisionPriority,
    monthlyRevenueTwd: Math.max(0, asNumber(data.get("monthlyRevenueTwd"))),
    b2b: data.get("b2b") === "on",
    needsRecurring: data.get("needsRecurring") === "on"
  };
}

function applyProfile(form: HTMLFormElement, profile: CreatorProfile): void {
  const market = form.querySelector<HTMLInputElement>(
    `input[name="market"][value="${profile.market}"]`
  );
  if (market) market.checked = true;

  requiredElement<HTMLSelectElement>('select[name="product"]', form).value =
    profile.product;
  requiredElement<HTMLSelectElement>('select[name="stage"]', form).value =
    profile.stage;
  requiredElement<HTMLSelectElement>('select[name="priority"]', form).value =
    profile.priority;
  requiredElement<HTMLInputElement>('input[name="monthlyRevenueTwd"]', form).value =
    String(profile.monthlyRevenueTwd);
  requiredElement<HTMLInputElement>('input[name="b2b"]', form).checked =
    profile.b2b;
  requiredElement<HTMLInputElement>('input[name="needsRecurring"]', form).checked =
    profile.needsRecurring;
}

function platformStackCard(platform: PlatformRecord): string {
  return `
    <div class="stack-card">
      <div>
        <strong>${escapeHtml(platform.name)}</strong>
        <small>${escapeHtml(platform.tagline)}</small>
      </div>
      <a href="${escapeHtml(platform.signupUrl)}" target="_blank" rel="noreferrer noopener">
        官方入口 ↗
      </a>
    </div>
  `;
}

function recommendationAsText(
  result: Recommendation,
  profile: CreatorProfile
): string {
  const primary = result.primaryPlatformIds
    .map((id) => platformById.get(id)?.name)
    .filter(Boolean)
    .join(" → ");
  const supporting = result.supportingPlatformIds
    .map((id) => platformById.get(id)?.name)
    .filter(Boolean)
    .join(", ");

  return [
    result.title,
    "",
    `市場：${marketLabels[profile.market]}`,
    `商品：${productLabels[profile.product]}`,
    `階段：${stageLabels[profile.stage]}`,
    `主要平台：${primary}`,
    `支援平台：${supporting}`,
    "",
    "出金資料流：",
    result.payoutPath.join(" → "),
    "",
    "為什麼：",
    ...result.rationale.map((item) => `- ${item}`),
    "",
    "風險：",
    ...result.warnings.map((item) => `- ${item}`),
    "",
    "本內容是決策支援，不是法律、稅務、會計或投資建議。"
  ].join("\n");
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

function renderRecommendation(
  container: HTMLElement,
  result: Recommendation,
  profile: CreatorProfile
): void {
  const primary = result.primaryPlatformIds
    .map((id) => platformById.get(id))
    .filter((platform): platform is PlatformRecord => Boolean(platform));
  const supporting = result.supportingPlatformIds
    .map((id) => platformById.get(id))
    .filter((platform): platform is PlatformRecord => Boolean(platform));

  const checklistState = loadJson<Record<string, boolean>>(CHECKLIST_KEY, {});

  container.innerHTML = `
    <header class="result-header">
      <span class="result-label">Recommended route · ${escapeHtml(
        marketLabels[profile.market]
      )}</span>
      <h3>${escapeHtml(result.title)}</h3>
      <p>${escapeHtml(result.summary)}</p>
      <div class="result-actions">
        <button id="copy-plan" class="mini-button" type="button">複製方案</button>
        <button id="print-plan" class="mini-button" type="button">列印方案</button>
      </div>
    </header>
    <div class="result-body">
      <section class="result-section">
        <h4>Primary stack</h4>
        <div class="stack-list">
          ${primary.map(platformStackCard).join("")}
        </div>
      </section>

      <section class="result-section">
        <h4>Supporting options</h4>
        <div class="stack-list">
          ${supporting.map(platformStackCard).join("")}
        </div>
      </section>

      <section class="result-section">
        <h4>Payout data flow</h4>
        <div class="path-flow">
          ${result.payoutPath
            .map(
              (node, index) => `
                <span class="path-node">${escapeHtml(node)}</span>
                ${
                  index < result.payoutPath.length - 1
                    ? '<span class="path-arrow" aria-hidden="true">→</span>'
                    : ""
                }
              `
            )
            .join("")}
        </div>
      </section>

      <section class="result-section">
        <h4>Decision rationale</h4>
        <ol class="reason-list">
          ${result.rationale.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ol>
      </section>

      <section class="result-section warning-box">
        <h4>Risk gates</h4>
        <ul class="warning-list">
          ${result.warnings.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </section>

      <section class="result-section">
        <h4>Launch checklist</h4>
        <div class="checklist">
          ${result.checklist
            .map((item) => {
              const key = `${result.routeId}:${item.id}`;
              const checked = checklistState[key] ? "checked" : "";
              return `
                <label class="check-item">
                  <input
                    type="checkbox"
                    data-check-key="${escapeHtml(key)}"
                    ${checked}
                  />
                  <span>
                    <strong>${escapeHtml(item.title)}${
                      item.blocking ? " · blocking" : ""
                    }</strong>
                    <small>${escapeHtml(item.detail)}</small>
                  </span>
                </label>
              `;
            })
            .join("")}
        </div>
      </section>
    </div>
  `;

  requiredElement<HTMLButtonElement>("#copy-plan", container).addEventListener(
    "click",
    async (event) => {
      const button = event.currentTarget as HTMLButtonElement;
      const copied = await copyText(recommendationAsText(result, profile));
      button.textContent = copied ? "已複製" : "複製失敗";
      window.setTimeout(() => {
        button.textContent = "複製方案";
      }, 1500);
    }
  );

  requiredElement<HTMLButtonElement>("#print-plan", container).addEventListener(
    "click",
    () => window.print()
  );

  container
    .querySelectorAll<HTMLInputElement>("input[data-check-key]")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const state = loadJson<Record<string, boolean>>(CHECKLIST_KEY, {});
        const key = checkbox.dataset.checkKey;
        if (!key) return;
        state[key] = checkbox.checked;
        saveJson(CHECKLIST_KEY, state);
      });
    });
}

function renderCatalog(): void {
  const grid = requiredElement<HTMLElement>("#platform-grid");
  const search = requiredElement<HTMLInputElement>("#catalog-search");
  const market = requiredElement<HTMLSelectElement>("#catalog-market");
  const status = requiredElement<HTMLSelectElement>("#catalog-status");

  const render = (): void => {
    const query = search.value.trim().toLocaleLowerCase("zh-Hant-TW");
    const marketValue = market.value;
    const statusValue = status.value;

    const filtered = platforms.filter((platform) => {
      const haystack = [
        platform.name,
        platform.tagline,
        platform.feeSummary,
        platform.payoutSummary,
        ...platform.bestFor,
        ...platform.caveats
      ]
        .join(" ")
        .toLocaleLowerCase("zh-Hant-TW");

      return (
        (!query || haystack.includes(query)) &&
        (marketValue === "all" ||
          platform.markets.includes(marketValue as AudienceMarket)) &&
        (statusValue === "all" || platform.status === statusValue)
      );
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results">
          找不到符合條件的平台。清除搜尋或切換市場與驗證狀態。
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map(
        (platform) => `
          <article class="platform-card">
            <div class="platform-topline">
              <span class="platform-kind">${escapeHtml(
                platform.kind.replaceAll("-", " ")
              )}</span>
              <span class="status-badge status-${escapeHtml(platform.status)}">
                ${escapeHtml(statusLabels[platform.status])}
              </span>
            </div>
            <h3>${escapeHtml(platform.name)}</h3>
            <p class="platform-tagline">${escapeHtml(platform.tagline)}</p>

            <dl class="platform-meta">
              <div>
                <dt>市場</dt>
                <dd>${platform.markets
                  .map((item) => marketLabels[item])
                  .map(escapeHtml)
                  .join(" · ")}</dd>
              </div>
              <div>
                <dt>適合</dt>
                <dd>${platform.products
                  .slice(0, 3)
                  .map((item) => productLabels[item])
                  .map(escapeHtml)
                  .join(" · ")}</dd>
              </div>
              <div>
                <dt>出金</dt>
                <dd>${escapeHtml(platform.payoutSummary)}</dd>
              </div>
              <div>
                <dt>費率</dt>
                <dd>${escapeHtml(platform.feeSummary)}</dd>
              </div>
            </dl>

            <p class="platform-caveat">${escapeHtml(platform.caveats[0] ?? "")}</p>

            <div class="platform-actions">
              <a href="${escapeHtml(
                platform.signupUrl
              )}" target="_blank" rel="noreferrer noopener">註冊入口 ↗</a>
              <a href="${escapeHtml(
                platform.docsUrl
              )}" target="_blank" rel="noreferrer noopener">官方文件</a>
            </div>
          </article>
        `
      )
      .join("");
  };

  [search, market, status].forEach((control) => {
    control.addEventListener("input", render);
    control.addEventListener("change", render);
  });

  render();
}

function readFeeInput(form: HTMLFormElement): FeeEstimateInput {
  const data = new FormData(form);
  return {
    provider: String(data.get("provider") ?? "polar") as FeeProvider,
    grossUsd: asNumber(data.get("grossUsd")),
    orders: asNumber(data.get("orders")),
    payoutCount: asNumber(data.get("payoutCount")),
    internationalCardShare:
      asNumber(data.get("internationalCardShare")) / 100,
    subscriptionShare: asNumber(data.get("subscriptionShare")) / 100,
    convertToTwd: data.get("convertToTwd") === "on"
  };
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function renderFeeEstimate(form: HTMLFormElement): void {
  const input = readFeeInput(form);
  const estimate = estimateFees(input);
  const container = requiredElement<HTMLElement>("#fee-result");

  container.innerHTML = `
    <div class="fee-hero">
      <span>${escapeHtml(providerLabels[estimate.provider])} · estimated net</span>
      <strong>${escapeHtml(formatUsd(estimate.estimatedNetUsd))}</strong>
    </div>

    <div class="fee-metrics">
      <div class="fee-metric">
        <span>交易費</span>
        <strong>${escapeHtml(formatUsd(estimate.transactionFeesUsd))}</strong>
      </div>
      <div class="fee-metric">
        <span>出金 / FX</span>
        <strong>${escapeHtml(formatUsd(estimate.payoutFeesUsd))}</strong>
      </div>
      <div class="fee-metric">
        <span>有效費率</span>
        <strong>${escapeHtml(estimate.effectiveRate.toFixed(2))}%</strong>
      </div>
    </div>

    <h4>Assumptions</h4>
    <ul class="assumption-list">
      ${estimate.assumptions
        .map((assumption) => `<li>${escapeHtml(assumption)}</li>`)
        .join("")}
    </ul>
  `;
}

function renderSources(): void {
  const list = requiredElement<HTMLElement>("#source-list");
  const order = { government: 0, official: 1, "research-input": 2 };

  list.innerHTML = [...sources]
    .sort(
      (a, b) =>
        order[a.authority] - order[b.authority] ||
        a.publisher.localeCompare(b.publisher)
    )
    .map((source) => {
      const title =
        source.authority === "research-input"
          ? `<span class="source-title">${escapeHtml(source.title)}</span>`
          : `<a href="${escapeHtml(
              source.url
            )}" target="_blank" rel="noreferrer noopener">${escapeHtml(
              source.title
            )} ↗</a>`;

      return `
        <div class="source-row">
          <span class="source-type ${escapeHtml(source.authority)}">
            ${escapeHtml(source.authority.replace("-", " "))}
          </span>
          <div>
            ${title}
            <div><small>${escapeHtml(source.publisher)}</small></div>
          </div>
          <small>reviewed ${escapeHtml(source.reviewedAt)}</small>
        </div>
      `;
    })
    .join("");
}

function setupRouter(): void {
  const form = requiredElement<HTMLFormElement>("#router-form");
  const container = requiredElement<HTMLElement>("#recommendation");
  const savedProfile = loadJson<CreatorProfile>(PROFILE_KEY, defaultProfile());

  applyProfile(form, savedProfile);

  const update = (): void => {
    const profile = readProfile(form);
    saveJson(PROFILE_KEY, profile);
    renderRecommendation(container, recommend(profile), profile);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    update();
  });

  form.addEventListener("change", () => {
    const profile = readProfile(form);
    saveJson(PROFILE_KEY, profile);
  });

  update();
}

function setupFeeCalculator(): void {
  const form = requiredElement<HTMLFormElement>("#fee-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderFeeEstimate(form);
  });
  form.addEventListener("input", () => renderFeeEstimate(form));
  form.addEventListener("change", () => renderFeeEstimate(form));
  renderFeeEstimate(form);
}

function setupPrint(): void {
  requiredElement<HTMLButtonElement>("#print-button").addEventListener(
    "click",
    () => window.print()
  );
}

function setupNavigation(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>(".site-nav a")];
  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.hash))
    .filter((section): section is HTMLElement => Boolean(section));

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      links.forEach((link) => {
        const active = link.hash === `#${visible.target.id}`;
        link.toggleAttribute("aria-current", active);
      });
    },
    { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.25, 0.5] }
  );

  sections.forEach((section) => observer.observe(section));
}

function main(): void {
  setupRouter();
  renderCatalog();
  setupFeeCalculator();
  renderSources();
  setupPrint();
  setupNavigation();
}

main();
