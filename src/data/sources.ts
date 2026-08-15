import type { SourceRecord } from "../types.ts";

export const REVIEW_DATE = "2026-08-15";

export const sources: SourceRecord[] = [
  {
    id: "stripe-global",
    title: "Stripe global availability",
    publisher: "Stripe",
    url: "https://stripe.com/global",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: [
      "Standalone Stripe Payments country availability",
      "Taiwan is not listed as a directly supported business country"
    ]
  },
  {
    id: "stripe-connect-countries",
    title: "Express connected account availability",
    publisher: "Stripe",
    url: "https://docs.stripe.com/connect/express-accounts",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: [
      "Stripe Connect is a separate capability from opening a standalone Stripe merchant account",
      "Platform-managed connected-account onboarding"
    ],
    notes: "Every platform must still enable Taiwan and approve the creator."
  },
  {
    id: "polar-countries",
    title: "Supported countries",
    publisher: "Polar",
    url: "https://polar.sh/docs/merchant-of-record/supported-countries",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Creator registration and Stripe Connect Express payout availability"]
  },
  {
    id: "polar-pricing",
    title: "Pricing",
    publisher: "Polar",
    url: "https://polar.sh/resources/pricing",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: [
      "Starter and paid-plan transaction fees",
      "International-card and payout pass-through fees"
    ]
  },
  {
    id: "polar-payouts",
    title: "Payouts",
    publisher: "Polar",
    url: "https://polar.sh/docs/features/finance/payouts",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Manual payouts", "Stripe payout fees", "Reverse invoices"]
  },
  {
    id: "lemon-fees",
    title: "Fees",
    publisher: "Lemon Squeezy",
    url: "https://docs.lemonsqueezy.com/help/getting-started/fees",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: [
      "Base platform fee",
      "International, PayPal and subscription surcharges",
      "Non-US payout fee"
    ]
  },
  {
    id: "lemon-payouts",
    title: "Getting paid",
    publisher: "Lemon Squeezy",
    url: "https://docs.lemonsqueezy.com/help/getting-started/getting-paid",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Payout schedule", "Bank or PayPal payout", "Country eligibility"]
  },
  {
    id: "lemon-payments",
    title: "Payment methods",
    publisher: "Lemon Squeezy",
    url: "https://docs.lemonsqueezy.com/help/checkout/payment-methods",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: [
      "Cards, PayPal, Alipay, WeChat Pay and China UnionPay for eligible one-time checkouts",
      "Narrower method set for subscriptions"
    ]
  },
  {
    id: "gumroad-fees",
    title: "Gumroad's fees",
    publisher: "Gumroad",
    url: "https://gumroad.com/help/article/66-gumroads-fees.html",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Direct-sale fee", "Processing fee", "Marketplace fee"]
  },
  {
    id: "gumroad-payouts",
    title: "Getting paid",
    publisher: "Gumroad",
    url: "https://gumroad.com/help/article/13-getting-paid.html",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Country-dependent bank or PayPal payout"]
  },
  {
    id: "portaly-payments",
    title: "Portaly payments and store",
    publisher: "Portaly",
    url: "https://portaly.cc/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Taiwan-first hosted creator commerce", "Hosted checkout and creator storefront"]
  },
  {
    id: "ecpay-support",
    title: "Payment services and application scope",
    publisher: "ECPay",
    url: "https://www.ecpay.com.tw/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Taiwan local payment gateway", "Merchant onboarding", "Payment methods"]
  },
  {
    id: "ecpay-recurring",
    title: "Credit-card recurring payments",
    publisher: "ECPay Developers",
    url: "https://developers.ecpay.com.tw/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Recurring billing API", "Webhook-style payment result flow"]
  },
  {
    id: "ecpay-invoice",
    title: "E-invoice API",
    publisher: "ECPay Developers",
    url: "https://developers.ecpay.com.tw/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Taiwan electronic-invoice integration"]
  },
  {
    id: "newebpay-recurring",
    title: "Periodic payment",
    publisher: "NewebPay",
    url: "https://www.newebpay.com/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Taiwan recurring card payment", "Merchant settlement"]
  },
  {
    id: "newebpay-invoice",
    title: "Electronic invoice service",
    publisher: "NewebPay",
    url: "https://www.newebpay.com/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Taiwan electronic-invoice service"]
  },
  {
    id: "paypal-esun",
    title: "PayPal withdrawal through E.SUN Global Pass",
    publisher: "E.SUN Bank",
    url: "https://www.esunbank.com/zh-tw/personal/deposit/foreign-service/paypal",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Taiwan PayPal withdrawal bridge", "Identity-name matching"]
  },
  {
    id: "mof-online-threshold",
    title: "境內網路交易應注意事項",
    publisher: "中華民國財政部",
    url: "https://www.etax.nat.gov.tw/etwmain/tax-info/network-transaction-taxtation-area/seller/notice",
    reviewedAt: REVIEW_DATE,
    authority: "government",
    supports: [
      "From 2025, monthly registration thresholds are NT$100,000 for goods and NT$50,000 for services",
      "Invoice and business-tax treatment after registration"
    ]
  },
  {
    id: "mof-creator-tax",
    title: "網紅報稅指南與課稅作業規範",
    publisher: "中華民國財政部",
    url: "https://www.mof.gov.tw/singlehtml/384fb3077bb349ea973e7fc6f13b6974?cntId=2c91d7cd83e5448bafb1c71c36f13253",
    reviewedAt: REVIEW_DATE,
    authority: "government",
    supports: [
      "Creator income source allocation",
      "45% simplified expense ratio example for performers",
      "Service-sales registration threshold"
    ]
  },
  {
    id: "mof-overseas-income",
    title: "應計入個人基本所得額之項目",
    publisher: "中華民國財政部",
    url: "https://www.etax.nat.gov.tw/etwmain/alien-tax-service/individual-income-basic-tax/bovNZmM",
    reviewedAt: REVIEW_DATE,
    authority: "government",
    supports: [
      "Overseas income under NT$1,000,000 is excluded from basic income",
      "Overseas income at or above NT$1,000,000 is fully included"
    ]
  },
  {
    id: "x-revenue",
    title: "Creator Revenue Sharing",
    publisher: "X Help Center",
    url: "https://help.x.com/en/using-x/creator-revenue-sharing",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Eligibility, payout cadence, minimum payout and Stripe onboarding"]
  },
  {
    id: "youtube-payments",
    title: "Payment methods for AdSense for YouTube",
    publisher: "Google AdSense Help",
    url: "https://support.google.com/adsense/answer/1714397",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Taiwan payment-method availability"]
  },
  {
    id: "patreon-payouts",
    title: "Payout options",
    publisher: "Patreon Help Center",
    url: "https://support.patreon.com/hc/en-us/articles/203913489",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["PayPal and Payoneer payout availability by country"]
  },
  {
    id: "tiktok-monetization",
    title: "Creator monetization overview",
    publisher: "TikTok Creator Portal",
    url: "https://www.tiktok.com/creators/creator-portal/en-us/category/getting-paid-to-create/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Program-dependent monetization and in-product eligibility"],
    notes: "The official public material does not establish one universal Taiwan payout rail for every program."
  },
  {
    id: "substack-paid",
    title: "Paid subscriptions and Stripe availability",
    publisher: "Substack",
    url: "https://support.substack.com/hc/en-us/articles/360037832191",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Paid publishing depends on Stripe-supported creator onboarding"]
  },
  {
    id: "ghost-paid",
    title: "Paid memberships",
    publisher: "Ghost",
    url: "https://ghost.org/help/paid-memberships/",
    reviewedAt: REVIEW_DATE,
    authority: "official",
    supports: ["Native paid memberships connect to the publisher's Stripe account"]
  },
  {
    id: "pdf-stripe",
    title: "台灣 Stripe 收款限制與解套.pdf",
    publisher: "User-provided research input",
    url: "about:blank#pdf-stripe",
    reviewedAt: REVIEW_DATE,
    authority: "research-input",
    supports: ["Initial hypotheses for Stripe, MoR and Taiwan payout routes"],
    notes: "Used as a research lead, not as controlling legal or platform authority."
  },
  {
    id: "pdf-mainland",
    title: "台灣創作者收款中國大陸指南.pdf",
    publisher: "User-provided research input",
    url: "about:blank#pdf-mainland",
    reviewedAt: REVIEW_DATE,
    authority: "research-input",
    supports: ["Initial hypotheses for cross-strait collection risks and options"],
    notes: "Private agents, underground exchange and unverified crypto routes are excluded."
  },
  {
    id: "pdf-tiktok",
    title: "台灣創作者 TikTok 收益提領.pdf",
    publisher: "User-provided research input",
    url: "about:blank#pdf-tiktok",
    reviewedAt: REVIEW_DATE,
    authority: "research-input",
    supports: ["Initial TikTok payout hypothesis"],
    notes: "Universal PayPal claims were downgraded to verify-in-account because official proof was insufficient."
  },
  {
    id: "pdf-newsletter",
    title: "台灣電子報付費收款管道.pdf",
    publisher: "User-provided research input",
    url: "about:blank#pdf-newsletter",
    reviewedAt: REVIEW_DATE,
    authority: "research-input",
    supports: ["Initial newsletter architecture and platform comparison"]
  },
  {
    id: "pdf-x",
    title: "X 創作者台灣收款指南.pdf",
    publisher: "User-provided research input",
    url: "about:blank#pdf-x",
    reviewedAt: REVIEW_DATE,
    authority: "research-input",
    supports: ["Initial X and Stripe Connect distinction"]
  }
];

export const sourceById = new Map(sources.map((source) => [source.id, source]));
