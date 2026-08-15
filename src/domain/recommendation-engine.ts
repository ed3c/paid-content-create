import { platformById } from "../data/platforms.ts";
import type {
  BusinessStage,
  ChecklistItem,
  CreatorProfile,
  DecisionPriority,
  PlatformRecord,
  Recommendation
} from "../types.ts";

const priorityKey: Record<DecisionPriority, keyof PlatformRecord["score"]> = {
  speed: "speed",
  margin: "margin",
  control: "control",
  "local-conversion": "localConversion"
};

const commonChecklist: ChecklistItem[] = [
  {
    id: "owned-domain",
    title: "建立自有網域與收件名單",
    detail: "所有平台簡介都導向同一個自有 landing page；保存 email consent、來源與退訂狀態。",
    owner: "creator",
    blocking: false
  },
  {
    id: "offer-contract",
    title: "寫清楚商品、交付與退款契約",
    detail: "定義交付內容、授權範圍、更新頻率、取消與退款條件，避免把平台頁面當成唯一契約。",
    owner: "creator",
    blocking: true
  },
  {
    id: "kyc-pack",
    title: "準備一致的 KYC 資料包",
    detail: "姓名、地址、身分證件、銀行帳戶、稅務身分與網站資訊必須一致；不要借名或偽造所在地。",
    owner: "creator",
    blocking: true
  },
  {
    id: "test-order",
    title: "執行真實小額端到端測試",
    detail: "測試付款、退款、通知、權限開通、發票或收據、出金與銀行入帳描述。",
    owner: "creator",
    blocking: true
  },
  {
    id: "evidence-pack",
    title: "每月封存 evidence pack",
    detail: "匯出訂單、平台費、退款、chargeback、payout、匯率、觀眾地區與銀行入帳證明。",
    owner: "creator",
    blocking: false
  }
];

function businessGate(stage: BusinessStage): ChecklistItem[] {
  if (stage === "individual") {
    return [
      {
        id: "tax-threshold",
        title: "監控 NT$50,000 勞務銷售門檻",
        detail: "數位內容、訂閱、顧問或軟體通常涉及勞務分類；達門檻前向所轄國稅局或會計師確認稅籍登記。",
        owner: "accountant",
        blocking: false
      }
    ];
  }

  return [
    {
      id: "invoice-ledger",
      title: "對接發票、總帳與退款",
      detail: "讓 checkout、電子發票、訂閱 entitlement 與會計帳保持同一筆 order/payout identifier。",
      owner: "accountant",
      blocking: true
    }
  ];
}

const routeDefinitions: Record<
  string,
  Omit<Recommendation, "warnings" | "checklist"> & { baseWarnings: string[] }
> = {
  "taiwan-hosted": {
    routeId: "taiwan-hosted",
    title: "台灣個人 MVP：Portaly 收款 + 自有 Email/CRM",
    summary:
      "先用代管結帳降低註冊、發票與收款摩擦，同時把網域、名單、內容原稿與顧客關係留在自己手上。",
    primaryPlatformIds: ["portaly"],
    supportingPlatformIds: ["gumroad", "youtube", "x", "tiktok"],
    rationale: [
      "台幣結帳與台灣消費者熟悉的付款體驗通常比境外 checkout 更容易轉換。",
      "個人階段的目標是驗證價格、留存與退款率，而不是先建完整 billing platform。",
      "平台只負責交易；名單與內容交付要能在未來搬到 ECPay 或 NewebPay。"
    ],
    payoutPath: [
      "台灣讀者",
      "Portaly Hosted Checkout",
      "平台結算與必要文件",
      "台灣銀行帳戶",
      "每月 evidence pack"
    ],
    baseWarnings: [
      "Portaly 不是完整 EDM；付費名單必須同步或匯出到自有發信系統。",
      "正式費率、扣繳與結算規則以註冊時的合約與後台為準。"
    ]
  },
  "taiwan-owned": {
    routeId: "taiwan-owned",
    title: "台灣規模化：自有網站 + ECPay/NewebPay + 電子發票",
    summary:
      "已辦稅籍或公司後，把 checkout、顧客資料、訂閱權限與發票整合成可控的台灣在地商業系統。",
    primaryPlatformIds: ["ecpay", "newebpay"],
    supportingPlatformIds: ["portaly", "ghost", "youtube", "x"],
    rationale: [
      "在地 TWD 收款、定期定額與電子發票是台灣訂閱業務的基本盤。",
      "較低的長期交易成本與完整顧客資料，通常值得初期工程與商務進件成本。",
      "B2B、退款、報帳與企業採購流程更容易被台灣客戶接受。"
    ],
    payoutPath: [
      "台灣讀者或企業",
      "自有網站",
      "ECPay / NewebPay",
      "電子發票與訂閱狀態機",
      "台灣商業銀行帳戶",
      "會計總帳"
    ],
    baseWarnings: [
      "金流 gateway 不會替你完成 dunning、entitlement、升降級與資料一致性。",
      "跨境卡、微信或銀聯等功能要以實際簽約核准項目為準。"
    ]
  },
  "global-software": {
    routeId: "global-software",
    title: "全球 SaaS / Developer Product：Polar 優先，Lemon Squeezy 備援",
    summary:
      "用 MoR 承接全球 buyer-side sales tax、付款與 subscription lifecycle，台灣端專注產品、出金證據與所得合規。",
    primaryPlatformIds: ["polar", "lemon-squeezy"],
    supportingPlatformIds: ["gumroad", "stripe-standalone", "ghost"],
    rationale: [
      "Polar 對開發者產品、entitlement、API 與手動批次出金的契合度高。",
      "Lemon Squeezy 提供成熟 hosted checkout、customer portal、dunning 與多種付款方式。",
      "在營收與組織複雜度足夠以前，不必為了 Stripe 先建立海外公司。"
    ],
    payoutPath: [
      "全球買家",
      "Polar 或 Lemon Squeezy MoR",
      "稅務與退款處理",
      "Connect / bank payout",
      "台灣銀行帳戶",
      "reverse invoice + payout evidence"
    ],
    baseWarnings: [
      "MoR 解決買方消費稅，不會免除台灣稅籍、所得稅、外匯與銀行查核。",
      "台灣企業客戶可能仍要求台灣統一發票。"
    ]
  },
  "global-membership": {
    routeId: "global-membership",
    title: "全球會員 / 電子報：Patreon 或 MoR 收款 + 自有內容與 Email",
    summary:
      "將會員付款和權限交給成熟平台，但用自有網域、內容倉庫與 Email 保留轉移能力。",
    primaryPlatformIds: ["patreon", "lemon-squeezy", "polar"],
    supportingPlatformIds: ["ghost", "substack", "paypal-esun"],
    rationale: [
      "Patreon 適合會員 benefit 與 community；MoR 適合自有產品、權限與 checkout。",
      "Ghost 可作自有內容與 Email 層，但原生付費需要自己的 Stripe。",
      "Substack 的原生付費不應被視為台灣個人可直接啟用的預設路徑。"
    ],
    payoutPath: [
      "全球讀者",
      "Patreon 或 MoR checkout",
      "會員權限 / Email delivery",
      "Payoneer、Connect 或 bank payout",
      "台灣銀行帳戶"
    ],
    baseWarnings: [
      "不要把完整會員關係鎖在單一平台；定期匯出合法可攜的顧客資料。",
      "PayPal + 玉山是 fallback，不是有直接 bank/Connect/Payoneer 時的第一選擇。"
    ]
  },
  "global-products": {
    routeId: "global-products",
    title: "全球數位商品：Lemon Squeezy / Polar；速度優先可用 Gumroad",
    summary:
      "依產品單價、訂單量與工程能力選 MoR；先驗證需求，再根據固定費與抽成遷移。",
    primaryPlatformIds: ["lemon-squeezy", "polar", "gumroad"],
    supportingPlatformIds: ["ghost", "youtube", "x"],
    rationale: [
      "Lemon Squeezy 支付方法與 hosted checkout 完整，適合一般數位商品。",
      "Polar 適合開發者與軟體型商品。",
      "Gumroad 上線最快，但低單價與穩定營收會受到較高費率懲罰。"
    ],
    payoutPath: [
      "全球買家",
      "MoR hosted checkout",
      "數位交付 / license / membership",
      "bank 或 Connect payout",
      "台灣銀行帳戶"
    ],
    baseWarnings: [
      "在定價前先跑費用估算；固定每單費用會傷害低客單價。",
      "每季重新比較退款、chargeback、FX 與 payout 的全成本。"
    ]
  },
  "mainland-crossborder": {
    routeId: "mainland-crossborder",
    title: "中國大陸受眾：只走可驗證的跨境 checkout",
    summary:
      "優先使用官方文件可驗證的 one-time Alipay、WeChat Pay 或 UnionPay checkout，避免私人代收、地下匯兌與借名帳戶。",
    primaryPlatformIds: ["lemon-squeezy", "ecpay"],
    supportingPlatformIds: ["newebpay", "portaly"],
    rationale: [
      "Lemon Squeezy 公開文件列出 Alipay、WeChat Pay 與 China UnionPay，但訂閱付款方法較少。",
      "ECPay/NewebPay 的跨境支付能力取決於台灣 merchant contract 與個別功能核准。",
      "先用單次商品或買斷會員驗證，再決定是否承擔大陸本地帳戶與內容平台風險。"
    ],
    payoutPath: [
      "中國大陸買家",
      "官方核准支付方法",
      "Lemon Squeezy MoR 或台灣金流",
      "合約指定 payout",
      "台灣銀行帳戶",
      "跨境交易證據"
    ],
    baseWarnings: [
      "禁止使用私人代付、代提、地下匯兌、借名支付寶或不明來源加密貨幣。",
      "Alipay/WeChat Pay 等方法是否顯示，會受商品型態、地區、裝置、風控與平台審核影響。",
      "內容可見性、跨境資料與中國大陸平台規則需要另外審查。"
    ]
  },
  "platform-native": {
    routeId: "platform-native",
    title: "平台原生分潤：YouTube / X 為已驗證路線，TikTok 逐帳號確認",
    summary:
      "把平台分潤視為流量紅利；主商業模式仍應導向自有名單、贊助、商品、會員或服務。",
    primaryPlatformIds: ["youtube", "x", "tiktok"],
    supportingPlatformIds: ["portaly", "polar", "lemon-squeezy", "paypal-esun"],
    rationale: [
      "YouTube 的台灣 AdSense 付款方法可由官方支援頁查核。",
      "X 使用平台管理的 Stripe onboarding，與台灣自行開 standalone Stripe 不同。",
      "TikTok 的 monetization program 與 payout rail 必須依帳號後台實際畫面確認。"
    ],
    payoutPath: [
      "平台觀眾",
      "YouTube / X / TikTok monetization",
      "平台指定 payout provider",
      "台灣銀行帳戶",
      "觀眾地區與年度收益證據"
    ],
    baseWarnings: [
      "演算法、資格與分潤公式可單方面變動；不要用 native revenue 支撐固定成本。",
      "保留觀眾地區資料，台灣創作者所得來源判定不等於單純看匯款來自國外。"
    ]
  }
};

function pickRoute(profile: CreatorProfile): string {
  if (profile.market === "mainland") return "mainland-crossborder";
  if (profile.product === "platform-native") return "platform-native";

  if (profile.market === "taiwan") {
    return profile.stage === "individual" ? "taiwan-hosted" : "taiwan-owned";
  }

  if (profile.product === "software") return "global-software";
  if (profile.product === "newsletter" || profile.product === "membership") {
    return "global-membership";
  }

  return "global-products";
}

function sortByPriority(ids: string[], priority: DecisionPriority): string[] {
  const key = priorityKey[priority];
  return [...ids].sort((a, b) => {
    const aPlatform = platformById.get(a);
    const bPlatform = platformById.get(b);
    return (bPlatform?.score[key] ?? 0) - (aPlatform?.score[key] ?? 0);
  });
}

function dynamicWarnings(profile: CreatorProfile): string[] {
  const warnings: string[] = [];

  if (profile.stage === "individual" && profile.monthlyRevenueTwd >= 50_000) {
    warnings.push(
      "你填寫的月營收已達或超過 NT$50,000。台灣網路銷售勞務的稅籍登記門檻需要立即確認，不要把 MoR payout 誤當成免登記。"
    );
  }

  if (profile.b2b && profile.stage === "individual") {
    warnings.push(
      "你要服務 B2B，但仍是個人階段。台灣企業通常需要可報帳憑證；請把工作室/行號/公司與發票能力設為 launch gate。"
    );
  }

  if (profile.needsRecurring && profile.market === "mainland") {
    warnings.push(
      "中國大陸常用錢包在 recurring checkout 的支援比單次付款窄；先驗證實際 checkout，不要把 one-time method 當成自動續訂能力。"
    );
  }

  if (profile.priority === "margin" && profile.monthlyRevenueTwd < 30_000) {
    warnings.push(
      "目前營收仍在驗證期。過早自建金流可能讓工程、稅務與維運成本高於平台抽成；先量測轉換與留存。"
    );
  }

  if (profile.priority === "control" && profile.stage === "individual") {
    warnings.push(
      "高控制權通常伴隨稅籍、發票、退款、資安與訂閱狀態機責任；用 hosted checkout 起步，再以可攜資料設計保留遷移能力。"
    );
  }

  return warnings;
}

export function recommend(profile: CreatorProfile): Recommendation {
  const routeId = pickRoute(profile);
  const route = routeDefinitions[routeId];

  if (!route) {
    throw new Error(`Unknown recommendation route: ${routeId}`);
  }

  return {
    routeId,
    title: route.title,
    summary: route.summary,
    primaryPlatformIds: sortByPriority(route.primaryPlatformIds, profile.priority),
    supportingPlatformIds: sortByPriority(route.supportingPlatformIds, profile.priority),
    rationale: route.rationale,
    payoutPath: route.payoutPath,
    warnings: [...route.baseWarnings, ...dynamicWarnings(profile)],
    checklist: [...commonChecklist, ...businessGate(profile.stage)]
  };
}

export function defaultProfile(): CreatorProfile {
  return {
    market: "taiwan",
    product: "newsletter",
    stage: "individual",
    priority: "speed",
    monthlyRevenueTwd: 20_000,
    b2b: false,
    needsRecurring: true
  };
}
