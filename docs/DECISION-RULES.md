# Decision Rules

The runtime is deterministic. It does not call an LLM or the network.

## Input contract

```ts
interface CreatorProfile {
  market: "taiwan" | "global" | "mainland";
  product:
    | "digital-product"
    | "newsletter"
    | "membership"
    | "course"
    | "software"
    | "platform-native";
  stage: "individual" | "registered" | "company";
  priority: "speed" | "margin" | "control" | "local-conversion";
  monthlyRevenueTwd: number;
  b2b: boolean;
  needsRecurring: boolean;
}
```

## Route selection

Rules run in this order:

| Priority | Condition | Route |
|---:|---|---|
| 1 | `market === mainland` | `mainland-crossborder` |
| 2 | `product === platform-native` | `platform-native` |
| 3 | Taiwan + individual | `taiwan-hosted` |
| 4 | Taiwan + registered/company | `taiwan-owned` |
| 5 | Global + software | `global-software` |
| 6 | Global + newsletter/membership | `global-membership` |
| 7 | Remaining global products | `global-products` |

Mainland comes before product because payment and compliance constraints dominate product preference.

## Platform ordering

A route defines a candidate list. `priority` sorts that list using a 1–5 score:

```text
speed            → score.speed
margin           → score.margin
control          → score.control
local-conversion → score.localConversion
```

Priority can reorder eligible platforms. It cannot:

- change a verification status
- make a platform support Taiwan
- bypass a required entity
- convert a one-time method into recurring
- remove a tax or B2B warning

## Dynamic risk gates

### Taiwan service threshold

Condition:

```ts
stage === "individual" && monthlyRevenueTwd >= 50_000
```

Result: immediate tax-registration review warning.

This is a product guardrail based on the official monthly service-sales threshold. Final classification remains case-specific.

### B2B invoice gate

Condition:

```ts
b2b === true && stage === "individual"
```

Result: entity and Taiwan invoice capability becomes a launch gate.

### Mainland recurring gate

Condition:

```ts
market === "mainland" && needsRecurring === true
```

Result: warn that Alipay/WeChat Pay/UnionPay support for one-time checkout does not imply recurring support.

### Premature optimization gate

Condition:

```ts
priority === "margin" && monthlyRevenueTwd < 30_000
```

Result: warn that building a local gateway stack can cost more than hosted-platform fees during validation.

### Control responsibility gate

Condition:

```ts
priority === "control" && stage === "individual"
```

Result: warn that control adds invoice, security, refund, subscription-state and accounting obligations.

## Route summaries

### `taiwan-hosted`

Primary:

- Portaly

Supporting:

- Gumroad
- YouTube
- X
- TikTok

Transition: migrate to a local gateway after revenue, recurring and B2B demand are proven.

### `taiwan-owned`

Primary:

- ECPay
- NewebPay

Supporting:

- Portaly
- Ghost
- YouTube
- X

Transition: build idempotent webhook, subscription, entitlement, invoice and reconciliation states.

### `global-software`

Primary:

- Polar
- Lemon Squeezy

Supporting:

- Gumroad
- standalone Stripe
- Ghost

Standalone Stripe is a conditional later-stage option, not the default Taiwan route.

### `global-membership`

Primary:

- Patreon
- Lemon Squeezy
- Polar

Supporting:

- Ghost
- Substack
- PayPal + E.SUN

Ghost and Substack do not erase the Stripe country/entity requirement for native paid subscriptions.

### `global-products`

Primary:

- Lemon Squeezy
- Polar
- Gumroad

The fee estimator should be used before setting a low price.

### `mainland-crossborder`

Primary:

- Lemon Squeezy
- ECPay

Supporting:

- NewebPay
- Portaly

The route always rejects underground exchange and private collection agents.

### `platform-native`

Primary:

- YouTube
- X
- TikTok

TikTok is always labeled `verify-in-account`.

## Checklist contract

Every recommendation includes:

- owned domain and email
- offer/fulfillment/refund contract
- consistent KYC package
- real end-to-end test order
- monthly evidence pack
- business/tax stage-specific gate

Checklist state is local-only and does not prove external platform approval.

## Tests

`tests/run.ts` covers:

- each major route
- Taiwan threshold warning
- B2B warning
- mainland safety warning
- fee-model invariants
- source-reference integrity
- unique identifiers
- Stripe/TikTok verification-state invariants
