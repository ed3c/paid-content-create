import type { PlatformRecord } from "../types.ts";

export const platforms: PlatformRecord[] = [
  {
    id: "portaly",
    name: "Portaly",
    kind: "hosted-commerce",
    status: "official",
    tagline: "Taiwan-first hosted checkout for an individual creator MVP.",
    bestFor: [
      "Taiwan-first paid newsletter",
      "Digital downloads",
      "Membership or sponsorship validation",
      "Creators who do not want to build checkout and invoice plumbing first"
    ],
    markets: ["taiwan"],
    products: ["digital-product", "newsletter", "membership", "course"],
    stages: ["individual", "registered", "company"],
    recurring: true,
    taiwanInvoice: "platform-handled",
    payoutRoute: "taiwan-bank",
    payoutSummary: "Platform-managed settlement to a Taiwan bank account; confirm the current schedule and required tax documents during onboarding.",
    signupUrl: "https://portaly.cc/",
    docsUrl: "https://portaly.cc/",
    feeSummary: "Plan and transaction pricing changes over time; verify the live pricing page before launch.",
    sourceIds: ["portaly-payments", "pdf-newsletter"],
    caveats: [
      "Treat Portaly as checkout and storefront infrastructure, not as a complete newsletter delivery system.",
      "Export or synchronize customer email data to an owned CRM or email service.",
      "Confirm payout, withholding and electronic-invoice handling in the live merchant agreement."
    ],
    score: { speed: 5, margin: 3, control: 3, localConversion: 5 }
  },
  {
    id: "ecpay",
    name: "ECPay",
    kind: "local-gateway",
    status: "official",
    tagline: "Taiwan local gateway for high-conversion TWD checkout and owned customer data.",
    bestFor: [
      "Registered Taiwan creator businesses",
      "Recurring card billing",
      "Taiwan electronic invoices",
      "Owned website and CRM"
    ],
    markets: ["taiwan", "mainland"],
    products: ["digital-product", "newsletter", "membership", "course", "software"],
    stages: ["registered", "company"],
    recurring: true,
    taiwanInvoice: "native",
    payoutRoute: "taiwan-bank",
    payoutSummary: "Merchant settlement goes to the approved Taiwan bank account under the contract.",
    signupUrl: "https://www.ecpay.com.tw/",
    docsUrl: "https://developers.ecpay.com.tw/",
    feeSummary: "Contract pricing and payment-method fees depend on merchant review and enabled services.",
    sourceIds: ["ecpay-support", "ecpay-recurring", "ecpay-invoice", "mof-online-threshold", "pdf-newsletter", "pdf-mainland"],
    caveats: [
      "Recurring billing, foreign cards, WeChat Pay or UnionPay may require separate approval.",
      "The creator owns subscription state, retries, entitlement and refund orchestration.",
      "A registered tax entity and compliant invoicing flow are the durable path at scale."
    ],
    score: { speed: 2, margin: 5, control: 5, localConversion: 5 }
  },
  {
    id: "newebpay",
    name: "NewebPay",
    kind: "local-gateway",
    status: "official",
    tagline: "Taiwan local payment and e-invoice stack for a controlled creator business.",
    bestFor: [
      "Taiwan recurring subscriptions",
      "Courses and memberships",
      "Owned checkout",
      "B2B customers needing Taiwan invoices"
    ],
    markets: ["taiwan", "mainland"],
    products: ["digital-product", "newsletter", "membership", "course", "software"],
    stages: ["registered", "company"],
    recurring: true,
    taiwanInvoice: "native",
    payoutRoute: "taiwan-bank",
    payoutSummary: "Merchant settlement goes to the approved Taiwan bank account under the contract.",
    signupUrl: "https://www.newebpay.com/",
    docsUrl: "https://www.newebpay.com/website/Page/content/download_api",
    feeSummary: "Contract and service fees vary by merchant type, risk and enabled payment methods.",
    sourceIds: ["newebpay-recurring", "newebpay-invoice", "mof-online-threshold", "pdf-newsletter", "pdf-mainland"],
    caveats: [
      "Merchant onboarding and feature approval are not instant.",
      "Subscription retries, access control and failed-payment recovery remain your responsibility.",
      "Verify cross-border payment-method availability in the signed contract."
    ],
    score: { speed: 2, margin: 5, control: 5, localConversion: 5 }
  },
  {
    id: "polar",
    name: "Polar",
    kind: "merchant-of-record",
    status: "official",
    tagline: "Developer-focused Merchant of Record with Taiwan creator payouts through a connected account.",
    bestFor: [
      "SaaS",
      "Developer tools",
      "Paid open-source benefits",
      "Global digital subscriptions"
    ],
    markets: ["global", "taiwan"],
    products: ["software", "digital-product", "membership", "newsletter"],
    stages: ["individual", "registered", "company"],
    recurring: true,
    taiwanInvoice: "external-required",
    payoutRoute: "stripe-connect",
    payoutSummary: "Polar balance → manual withdrawal → Stripe Connect Express → approved Taiwan payout account.",
    signupUrl: "https://polar.sh/signup",
    docsUrl: "https://polar.sh/docs",
    feeSummary: "New Starter organizations: 5% + US$0.50; international-card and payout fees can apply.",
    sourceIds: ["polar-countries", "polar-pricing", "polar-payouts", "stripe-connect-countries", "pdf-stripe", "pdf-newsletter"],
    caveats: [
      "MoR handles buyer-side sales tax/VAT, not the creator's Taiwan income tax or business registration.",
      "Taiwan B2B customers may still require a Taiwan invoice.",
      "Batch payouts to reduce fixed payout overhead and keep reverse invoices with the monthly evidence pack."
    ],
    score: { speed: 4, margin: 4, control: 4, localConversion: 2 }
  },
  {
    id: "lemon-squeezy",
    name: "Lemon Squeezy",
    kind: "merchant-of-record",
    status: "official",
    tagline: "Global MoR with hosted checkout, subscriptions and broad one-time payment methods.",
    bestFor: [
      "Global digital products",
      "Software licenses",
      "Courses",
      "One-time China-facing checkout experiments"
    ],
    markets: ["global", "taiwan", "mainland"],
    products: ["software", "digital-product", "membership", "newsletter", "course"],
    stages: ["individual", "registered", "company"],
    recurring: true,
    taiwanInvoice: "external-required",
    payoutRoute: "stripe-connect",
    payoutSummary: "Lemon Squeezy → bank payout or verified PayPal; non-US payout fees and holding periods apply.",
    signupUrl: "https://app.lemonsqueezy.com/register",
    docsUrl: "https://docs.lemonsqueezy.com/",
    feeSummary: "5% + US$0.50 base; additional international, PayPal, subscription and payout fees may apply.",
    sourceIds: ["lemon-fees", "lemon-payouts", "lemon-payments", "pdf-stripe", "pdf-mainland"],
    caveats: [
      "Alipay, WeChat Pay and UnionPay are documented for eligible one-time checkout; subscriptions support a narrower method set.",
      "Store activation and product approval are required before live sales.",
      "Buyer-side tax handling does not replace Taiwan creator tax and bookkeeping."
    ],
    score: { speed: 4, margin: 3, control: 4, localConversion: 2 }
  },
  {
    id: "gumroad",
    name: "Gumroad",
    kind: "merchant-of-record",
    status: "official",
    tagline: "Fastest global digital-product launch, with a high fee ceiling.",
    bestFor: [
      "First digital download",
      "Small catalog",
      "Audience validation",
      "Creators who value speed over margin"
    ],
    markets: ["global", "taiwan"],
    products: ["digital-product", "newsletter", "membership", "course", "software"],
    stages: ["individual", "registered", "company"],
    recurring: true,
    taiwanInvoice: "external-required",
    payoutRoute: "international-wire",
    payoutSummary: "Country-dependent bank or PayPal payout; confirm the live payout method during account setup.",
    signupUrl: "https://gumroad.com/signup",
    docsUrl: "https://gumroad.com/help",
    feeSummary: "Direct sales: 10% + US$0.50 plus card processing; discovery sales use a higher marketplace fee.",
    sourceIds: ["gumroad-fees", "gumroad-payouts", "pdf-stripe"],
    caveats: [
      "The fixed fee makes low-priced products expensive.",
      "Move to a lower-cost controlled stack after product-market fit.",
      "Keep customer exports and fulfillment logic portable."
    ],
    score: { speed: 5, margin: 1, control: 3, localConversion: 2 }
  },
  {
    id: "patreon",
    name: "Patreon",
    kind: "membership-platform",
    status: "official",
    tagline: "Membership delivery and community tooling with PayPal or Payoneer payout options.",
    bestFor: [
      "Membership communities",
      "Behind-the-scenes media",
      "Serialized content",
      "Creators who need benefits and access tiers"
    ],
    markets: ["global", "taiwan"],
    products: ["membership", "newsletter", "course", "platform-native"],
    stages: ["individual", "registered", "company"],
    recurring: true,
    taiwanInvoice: "external-required",
    payoutRoute: "payoneer",
    payoutSummary: "Patreon balance → eligible Payoneer or PayPal payout → Taiwan bank route.",
    signupUrl: "https://www.patreon.com/create",
    docsUrl: "https://support.patreon.com/",
    feeSummary: "Platform, payment processing and payout fees depend on the creator plan and buyer method.",
    sourceIds: ["patreon-payouts", "pdf-mainland"],
    caveats: [
      "Audience relationship and discovery remain platform-dependent.",
      "Payout methods vary by country and account eligibility.",
      "Export member data and preserve an owned email channel."
    ],
    score: { speed: 4, margin: 2, control: 2, localConversion: 2 }
  },
  {
    id: "youtube",
    name: "YouTube / AdSense",
    kind: "native-platform",
    status: "official",
    tagline: "Use native revenue as an acquisition dividend, not as the only business model.",
    bestFor: [
      "Long-form video",
      "Search-driven evergreen content",
      "Ads, memberships and sponsorship discovery"
    ],
    markets: ["taiwan", "global"],
    products: ["platform-native"],
    stages: ["individual", "registered", "company"],
    recurring: false,
    taiwanInvoice: "not-applicable",
    payoutRoute: "international-wire",
    payoutSummary: "AdSense for YouTube → supported payment method, including wire for Taiwan → Taiwan bank.",
    signupUrl: "https://studio.youtube.com/",
    docsUrl: "https://support.google.com/youtube/topic/9153642",
    feeSummary: "Revenue share and eligibility vary by monetization product.",
    sourceIds: ["youtube-payments"],
    caveats: [
      "Eligibility and payment profile verification are mandatory.",
      "Algorithmic revenue is volatile; capture email and sell an owned offer.",
      "Retain annual earnings and audience geography reports."
    ],
    score: { speed: 2, margin: 2, control: 1, localConversion: 3 }
  },
  {
    id: "x",
    name: "X Creator Monetization",
    kind: "native-platform",
    status: "official",
    tagline: "Taiwan creators can use platform-managed Stripe onboarding where eligible.",
    bestFor: [
      "Technical commentary",
      "Fast distribution",
      "Audience conversations",
      "Traffic into a newsletter or product"
    ],
    markets: ["taiwan", "global"],
    products: ["platform-native", "newsletter"],
    stages: ["individual", "registered", "company"],
    recurring: false,
    taiwanInvoice: "not-applicable",
    payoutRoute: "stripe-connect",
    payoutSummary: "X monetization → Stripe platform onboarding → approved Taiwan payout account.",
    signupUrl: "https://x.com/settings/monetization",
    docsUrl: "https://help.x.com/en/using-x/creator-revenue-sharing",
    feeSummary: "Eligibility, revenue formula and payout terms are platform-controlled and can change.",
    sourceIds: ["x-revenue", "stripe-connect-countries", "pdf-x"],
    caveats: [
      "A platform-managed Stripe connected account is not the same as opening standalone Stripe Payments in Taiwan.",
      "Treat native revenue as upside, not predictable subscription MRR.",
      "Use original content and route the audience to an owned list."
    ],
    score: { speed: 3, margin: 2, control: 1, localConversion: 3 }
  },
  {
    id: "tiktok",
    name: "TikTok Monetization",
    kind: "native-platform",
    status: "verify-in-account",
    tagline: "Program and payout availability must be checked inside the Taiwan account.",
    bestFor: [
      "Short-form discovery",
      "Live commerce",
      "Top-of-funnel audience growth"
    ],
    markets: ["taiwan", "global"],
    products: ["platform-native"],
    stages: ["individual", "registered", "company"],
    recurring: false,
    taiwanInvoice: "not-applicable",
    payoutRoute: "platform-dependent",
    payoutSummary: "Open the active monetization program in TikTok and use the payout rail presented for that account and region.",
    signupUrl: "https://www.tiktok.com/creator-center/",
    docsUrl: "https://www.tiktok.com/creators/creator-portal/en-us/category/getting-paid-to-create/",
    feeSummary: "Program-specific; verify current eligibility, revenue share, minimum payout and fees in-product.",
    sourceIds: ["tiktok-monetization", "pdf-tiktok"],
    caveats: [
      "Do not assume every Taiwan monetization program universally pays through PayPal.",
      "Record the program name, legal payer, payout currency and statement before relying on it.",
      "Use TikTok as discovery and move repeat buyers to an owned channel."
    ],
    score: { speed: 3, margin: 1, control: 1, localConversion: 3 }
  },
  {
    id: "substack",
    name: "Substack",
    kind: "publishing-platform",
    status: "conditional",
    tagline: "Excellent publishing UX, but native paid subscriptions depend on Stripe eligibility.",
    bestFor: [
      "Global newsletter distribution",
      "Writers with a supported Stripe business entity",
      "Creators willing to accept platform economics"
    ],
    markets: ["global"],
    products: ["newsletter", "membership"],
    stages: ["company"],
    recurring: true,
    taiwanInvoice: "external-required",
    payoutRoute: "foreign-entity-bank",
    payoutSummary: "Subscriber → Substack/Stripe → bank account of a Stripe-supported legal entity.",
    signupUrl: "https://substack.com/signup",
    docsUrl: "https://support.substack.com/",
    feeSummary: "Platform fee plus Stripe processing; verify the current paid-publishing terms.",
    sourceIds: ["substack-paid", "stripe-global", "pdf-newsletter"],
    caveats: [
      "A Taiwan individual or Taiwan company cannot assume native paid subscriptions will activate without a Stripe-supported entity.",
      "Do not misrepresent country, entity or banking details.",
      "For Taiwan-first creators, use Substack as free publishing or choose a local hosted checkout."
    ],
    score: { speed: 3, margin: 2, control: 2, localConversion: 1 }
  },
  {
    id: "ghost",
    name: "Ghost",
    kind: "publishing-platform",
    status: "conditional",
    tagline: "Best owned publishing layer when you already have a compliant payment rail.",
    bestFor: [
      "Owned newsletter and website",
      "SEO and content archive",
      "Creators with a Stripe-supported entity or external entitlement integration"
    ],
    markets: ["global", "taiwan"],
    products: ["newsletter", "membership"],
    stages: ["registered", "company"],
    recurring: true,
    taiwanInvoice: "external-required",
    payoutRoute: "foreign-entity-bank",
    payoutSummary: "Ghost native paid membership → your connected Stripe account; external MoR integration requires custom entitlement logic.",
    signupUrl: "https://ghost.org/pricing/",
    docsUrl: "https://ghost.org/help/paid-memberships/",
    feeSummary: "Ghost does not add a transaction fee to native Stripe memberships, but hosting and payment fees remain.",
    sourceIds: ["ghost-paid", "stripe-global", "pdf-newsletter"],
    caveats: [
      "Native paid memberships require the publisher's own Stripe account.",
      "Using Polar, Lemon Squeezy or a local gateway with Ghost is a custom architecture, not a one-click native path.",
      "Ghost remains valuable as the owned content and email layer."
    ],
    score: { speed: 2, margin: 4, control: 5, localConversion: 2 }
  },
  {
    id: "paypal-esun",
    name: "PayPal + E.SUN Global Pass",
    kind: "payout-rail",
    status: "official",
    tagline: "Fallback withdrawal bridge for platforms that only offer PayPal.",
    bestFor: [
      "Patreon or other PayPal-only payouts",
      "Low-frequency withdrawals",
      "Creators who cannot choose direct bank or Payoneer"
    ],
    markets: ["taiwan", "global"],
    products: ["digital-product", "newsletter", "membership", "course", "platform-native"],
    stages: ["individual", "registered", "company"],
    recurring: false,
    taiwanInvoice: "not-applicable",
    payoutRoute: "paypal-esun",
    payoutSummary: "Platform → verified PayPal → E.SUN Global Pass → Taiwan TWD or foreign-currency account.",
    signupUrl: "https://www.paypal.com/tw/webapps/mpp/account-selection",
    docsUrl: "https://www.esunbank.com/zh-tw/personal/deposit/foreign-service/paypal",
    feeSummary: "Withdrawal and FX costs depend on currency and destination account; compare both TWD and foreign-currency paths.",
    sourceIds: ["paypal-esun", "pdf-tiktok", "pdf-mainland"],
    caveats: [
      "Prefer direct bank, Stripe Connect or Payoneer when the platform offers them.",
      "PayPal account name must match the receiving bank identity.",
      "Do not optimize only for visible fees; model the FX spread."
    ],
    score: { speed: 3, margin: 1, control: 2, localConversion: 3 }
  },
  {
    id: "stripe-standalone",
    name: "Standalone Stripe Payments",
    kind: "payment-processor",
    status: "conditional",
    tagline: "Not a direct Taiwan merchant-account route; use only with a real supported-country entity.",
    bestFor: [
      "Global company with a genuine supported-country legal entity",
      "Advanced subscription billing",
      "Teams prepared for cross-border accounting and compliance"
    ],
    markets: ["global"],
    products: ["software", "digital-product", "newsletter", "membership", "course"],
    stages: ["company"],
    recurring: true,
    taiwanInvoice: "external-required",
    payoutRoute: "foreign-entity-bank",
    payoutSummary: "Buyer → Stripe Payments account of supported-country entity → matching entity bank → compliant owner distribution.",
    signupUrl: "https://stripe.com/global",
    docsUrl: "https://docs.stripe.com/payments",
    feeSummary: "Pricing depends on the supported-country account, cards, FX and billing products.",
    sourceIds: ["stripe-global", "pdf-stripe"],
    caveats: [
      "Taiwan is not listed for direct standalone Stripe Payments merchant onboarding.",
      "Never use false addresses, borrowed entities or mismatched bank accounts.",
      "A foreign entity adds annual filings, accounting, banking and beneficial-owner obligations."
    ],
    score: { speed: 1, margin: 4, control: 5, localConversion: 1 }
  }
];

export const platformById = new Map(platforms.map((platform) => [platform.id, platform]));
