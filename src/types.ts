export type AudienceMarket = "taiwan" | "global" | "mainland";
export type ProductType =
  | "digital-product"
  | "newsletter"
  | "membership"
  | "course"
  | "software"
  | "platform-native";
export type BusinessStage = "individual" | "registered" | "company";
export type DecisionPriority = "speed" | "margin" | "control" | "local-conversion";
export type PlatformKind =
  | "hosted-commerce"
  | "local-gateway"
  | "merchant-of-record"
  | "membership-platform"
  | "native-platform"
  | "publishing-platform"
  | "payout-rail"
  | "payment-processor";
export type VerificationStatus =
  | "official"
  | "conditional"
  | "verify-in-account"
  | "not-recommended";
export type PayoutRoute =
  | "taiwan-bank"
  | "stripe-connect"
  | "international-wire"
  | "payoneer"
  | "paypal-esun"
  | "platform-dependent"
  | "foreign-entity-bank";

export interface CreatorProfile {
  market: AudienceMarket;
  product: ProductType;
  stage: BusinessStage;
  priority: DecisionPriority;
  monthlyRevenueTwd: number;
  b2b: boolean;
  needsRecurring: boolean;
}

export interface SourceRecord {
  id: string;
  title: string;
  publisher: string;
  url: string;
  reviewedAt: string;
  authority: "official" | "government" | "research-input";
  supports: string[];
  notes?: string;
}

export interface PlatformScore {
  speed: number;
  margin: number;
  control: number;
  localConversion: number;
}

export interface PlatformRecord {
  id: string;
  name: string;
  kind: PlatformKind;
  status: VerificationStatus;
  tagline: string;
  bestFor: string[];
  markets: AudienceMarket[];
  products: ProductType[];
  stages: BusinessStage[];
  recurring: boolean;
  taiwanInvoice: "native" | "platform-handled" | "external-required" | "not-applicable";
  payoutRoute: PayoutRoute;
  payoutSummary: string;
  signupUrl: string;
  docsUrl: string;
  feeSummary: string;
  sourceIds: string[];
  caveats: string[];
  score: PlatformScore;
}

export interface ChecklistItem {
  id: string;
  title: string;
  detail: string;
  owner: "creator" | "platform" | "accountant";
  blocking: boolean;
}

export interface Recommendation {
  routeId: string;
  title: string;
  summary: string;
  primaryPlatformIds: string[];
  supportingPlatformIds: string[];
  rationale: string[];
  payoutPath: string[];
  warnings: string[];
  checklist: ChecklistItem[];
}

export type FeeProvider = "polar" | "lemon-squeezy" | "gumroad";

export interface FeeEstimateInput {
  provider: FeeProvider;
  grossUsd: number;
  orders: number;
  internationalCardShare: number;
  subscriptionShare: number;
  payoutCount: number;
  convertToTwd: boolean;
}

export interface FeeEstimate {
  provider: FeeProvider;
  grossUsd: number;
  transactionFeesUsd: number;
  payoutFeesUsd: number;
  estimatedNetUsd: number;
  effectiveRate: number;
  assumptions: string[];
}
