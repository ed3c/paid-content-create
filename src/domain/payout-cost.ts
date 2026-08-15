import type { FeeEstimate, FeeEstimateInput } from "../types.ts";

function nonNegative(value: number): number {
  return Number.isFinite(value) ? Math.max(0, value) : 0;
}

function clampShare(value: number): number {
  return Math.min(1, Math.max(0, nonNegative(value)));
}

function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function estimateFees(rawInput: FeeEstimateInput): FeeEstimate {
  const grossUsd = nonNegative(rawInput.grossUsd);
  const orders = Math.max(0, Math.floor(nonNegative(rawInput.orders)));
  const payoutCount = Math.max(0, Math.floor(nonNegative(rawInput.payoutCount)));
  const internationalShare = clampShare(rawInput.internationalCardShare);
  const subscriptionShare = clampShare(rawInput.subscriptionShare);

  let transactionFeesUsd = 0;
  let payoutFeesUsd = 0;
  const assumptions: string[] = [];

  switch (rawInput.provider) {
    case "polar": {
      const base = grossUsd * 0.05 + orders * 0.5;
      const international = grossUsd * internationalShare * 0.015;
      transactionFeesUsd = base + international;
      payoutFeesUsd = payoutCount > 0
        ? 2 + payoutCount * 0.25 + grossUsd * 0.0025
        : 0;

      if (rawInput.convertToTwd && payoutCount > 0) {
        payoutFeesUsd += grossUsd * 0.01;
      }

      assumptions.push(
        "Polar Starter pricing for organizations created on or after 2026-05-27: 5% + US$0.50 per transaction.",
        "Adds 1.5% only to the modeled international-card share.",
        "Models Stripe payout overhead as US$2 in an active payout month plus 0.25% + US$0.25 per payout.",
        rawInput.convertToTwd
          ? "Models a conservative 1% non-EU cross-border currency-conversion fee."
          : "Does not model Taiwan receiving-bank or later FX costs.",
        "Refunds, disputes, taxes and custom/paid Polar plans are excluded."
      );
      break;
    }

    case "lemon-squeezy": {
      const base = grossUsd * 0.05 + orders * 0.5;
      const international = grossUsd * internationalShare * 0.015;
      const subscription = grossUsd * subscriptionShare * 0.005;
      transactionFeesUsd = base + international + subscription;
      payoutFeesUsd = payoutCount > 0 ? grossUsd * 0.01 : 0;

      assumptions.push(
        "Models Lemon Squeezy base fee as 5% + US$0.50 per order.",
        "Adds 1.5% to the modeled international share and 0.5% to the modeled subscription share.",
        "Models a 1% payout fee for a bank account outside the US.",
        "PayPal, abandoned-cart recovery, affiliate, refund, dispute and FX fees are excluded."
      );
      break;
    }

    case "gumroad": {
      transactionFeesUsd =
        grossUsd * 0.1 +
        orders * 0.5 +
        grossUsd * 0.029 +
        orders * 0.3;
      payoutFeesUsd = 0;

      assumptions.push(
        "Models direct sales at 10% + US$0.50 per transaction.",
        "Adds the documented card-processing estimate of 2.9% + US$0.30.",
        "Gumroad Discover sales, PayPal fees, payout fees, refunds, taxes and FX are excluded."
      );
      break;
    }
  }

  transactionFeesUsd = roundMoney(Math.min(grossUsd, nonNegative(transactionFeesUsd)));
  payoutFeesUsd = roundMoney(
    Math.min(Math.max(0, grossUsd - transactionFeesUsd), nonNegative(payoutFeesUsd))
  );
  const estimatedNetUsd = roundMoney(
    Math.max(0, grossUsd - transactionFeesUsd - payoutFeesUsd)
  );
  const effectiveRate = grossUsd > 0
    ? roundMoney(((transactionFeesUsd + payoutFeesUsd) / grossUsd) * 100)
    : 0;

  return {
    provider: rawInput.provider,
    grossUsd: roundMoney(grossUsd),
    transactionFeesUsd,
    payoutFeesUsd,
    estimatedNetUsd,
    effectiveRate,
    assumptions
  };
}
