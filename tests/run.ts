import assert from "node:assert/strict";
import { platforms } from "../src/data/platforms.ts";
import { sources } from "../src/data/sources.ts";
import { estimateFees } from "../src/domain/payout-cost.ts";
import { recommend } from "../src/domain/recommendation-engine.ts";
import type { CreatorProfile } from "../src/types.ts";

let passed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    passed += 1;
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    throw error;
  }
}

function profile(overrides: Partial<CreatorProfile> = {}): CreatorProfile {
  return {
    market: "taiwan",
    product: "newsletter",
    stage: "individual",
    priority: "speed",
    monthlyRevenueTwd: 20_000,
    b2b: false,
    needsRecurring: true,
    ...overrides
  };
}

test("Taiwan individual newsletter recommends Portaly", () => {
  const result = recommend(profile());
  assert.equal(result.routeId, "taiwan-hosted");
  assert.equal(result.primaryPlatformIds[0], "portaly");
});

test("Taiwan registered subscription recommends a local gateway", () => {
  const result = recommend(
    profile({ stage: "registered", priority: "control" })
  );
  assert.equal(result.routeId, "taiwan-owned");
  assert.ok(
    result.primaryPlatformIds.includes("ecpay") ||
      result.primaryPlatformIds.includes("newebpay")
  );
});

test("Global software recommends Polar and Lemon Squeezy", () => {
  const result = recommend(
    profile({ market: "global", product: "software", priority: "control" })
  );
  assert.equal(result.routeId, "global-software");
  assert.ok(result.primaryPlatformIds.includes("polar"));
  assert.ok(result.primaryPlatformIds.includes("lemon-squeezy"));
});

test("Mainland route explicitly rejects underground exchange", () => {
  const result = recommend(
    profile({ market: "mainland", product: "digital-product" })
  );
  assert.equal(result.routeId, "mainland-crossborder");
  assert.ok(
    result.warnings.some(
      (warning) =>
        warning.includes("地下匯兌") &&
        warning.includes("私人代付")
    )
  );
});

test("Individual service revenue at NT$50,000 creates a tax gate", () => {
  const result = recommend(profile({ monthlyRevenueTwd: 50_000 }));
  assert.ok(result.warnings.some((warning) => warning.includes("NT$50,000")));
});

test("B2B individual route creates an invoice/entity warning", () => {
  const result = recommend(profile({ b2b: true }));
  assert.ok(result.warnings.some((warning) => warning.includes("B2B")));
});

test("Zero gross creates a zero fee estimate", () => {
  const estimate = estimateFees({
    provider: "polar",
    grossUsd: 0,
    orders: 0,
    internationalCardShare: 0,
    subscriptionShare: 0,
    payoutCount: 0,
    convertToTwd: false
  });
  assert.equal(estimate.estimatedNetUsd, 0);
  assert.equal(estimate.effectiveRate, 0);
});

test("Fixed fees hurt lower average order value", () => {
  const lowAov = estimateFees({
    provider: "polar",
    grossUsd: 1_000,
    orders: 100,
    internationalCardShare: 1,
    subscriptionShare: 0,
    payoutCount: 1,
    convertToTwd: false
  });
  const highAov = estimateFees({
    provider: "polar",
    grossUsd: 1_000,
    orders: 10,
    internationalCardShare: 1,
    subscriptionShare: 0,
    payoutCount: 1,
    convertToTwd: false
  });
  assert.ok(lowAov.effectiveRate > highAov.effectiveRate);
});

test("Gumroad direct estimate includes platform and processing fees", () => {
  const estimate = estimateFees({
    provider: "gumroad",
    grossUsd: 1_000,
    orders: 20,
    internationalCardShare: 0,
    subscriptionShare: 0,
    payoutCount: 0,
    convertToTwd: false
  });
  assert.equal(estimate.transactionFeesUsd, 145);
});

test("All platform source references resolve", () => {
  const sourceIds = new Set(sources.map((source) => source.id));
  for (const platform of platforms) {
    assert.ok(platform.sourceIds.length > 0, `${platform.id} has no sources`);
    for (const sourceId of platform.sourceIds) {
      assert.ok(sourceIds.has(sourceId), `${platform.id} missing source ${sourceId}`);
    }
  }
});

test("Platform and source identifiers are unique", () => {
  assert.equal(new Set(platforms.map((item) => item.id)).size, platforms.length);
  assert.equal(new Set(sources.map((item) => item.id)).size, sources.length);
});

test("Standalone Stripe is conditional and TikTok is verify-in-account", () => {
  assert.equal(
    platforms.find((item) => item.id === "stripe-standalone")?.status,
    "conditional"
  );
  assert.equal(
    platforms.find((item) => item.id === "tiktok")?.status,
    "verify-in-account"
  );
});

console.log(`\n${passed} tests passed.`);
