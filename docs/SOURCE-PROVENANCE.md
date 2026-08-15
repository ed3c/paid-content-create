# Source Provenance and Claim Governance

## Source hierarchy

| Rank | Source class | Use |
|---:|---|---|
| 1 | Taiwan government / tax authority | Tax thresholds, source rules, filing concepts |
| 2 | Platform official docs / Help Center | Eligibility, fees, payment methods, payouts |
| 3 | User-provided PDFs | Research hypotheses and issue discovery |
| 4 | Inference | Product strategy only; must be labeled |

A lower-ranked source cannot silently override a higher-ranked source.

## User-provided research inputs

The project was initiated from:

- `台灣 Stripe 收款限制與解套.pdf`
- `台灣創作者收款中國大陸指南.pdf`
- `台灣創作者 TikTok 收益提領.pdf`
- `台灣電子報付費收款管道.pdf`
- `X 創作者台灣收款指南.pdf`

These PDFs were useful for identifying questions, platform candidates and operational pain points. They are not treated as primary authority because they contain generated analysis, time-sensitive fees and claims that require official confirmation.

The PDFs are not committed to this repository. Only derived, reviewed decisions are stored.

## Verified and retained claims

### Stripe distinction

Retained:

- Taiwan is not listed for direct standalone Stripe Payments onboarding.
- A platform can separately use Stripe Connect and support Taiwan connected-account payouts.

Impact:

- `stripe-standalone` is `conditional`.
- X and Polar can still be `official` for their own platform-managed routes.

### Local recurring and invoice architecture

Retained:

- ECPay and NewebPay provide Taiwan local payment services.
- Recurring and electronic-invoice capabilities exist, subject to merchant onboarding and product approval.

Impact:

- local gateways are recommended after tax/entity and product-market-fit gates.

### Newsletter architecture

Retained:

- recurring billing stability, list ownership and Taiwan invoice handling are separate design decisions.
- Portaly can act as Taiwan hosted checkout, but email delivery remains an external/owned layer.

### Mainland safety

Retained:

- creator registration and creator payout are different.
- private agents and underground exchange create severe source-of-funds and account-freeze risk.

Impact:

- all such routes are explicitly excluded.

## Downgraded or rejected claims

## TikTok “universal PayPal” claim

PDF hypothesis:

> Taiwan TikTok earnings use PayPal as the only universal official route.

Official verification result:

- TikTok official public creator material describes program-dependent monetization.
- The reviewed official material does not establish one universal Taiwan payout rail across every program.

Decision:

- TikTok status is `verify-in-account`.
- The UI requires the creator to verify the exact program, payer, currency, minimum and payout provider.

## “Foreign remittance equals overseas income”

PDFs sometimes framed foreign platform payouts as overseas income by default.

Official verification result:

- Taiwan creator source analysis is more specific.
- Platform location, advertiser/viewer context, profit contribution and whether the creator is operating a registered business can matter.
- A foreign remittance is evidence of money movement, not a universal source-classification rule.

Decision:

- no route promises overseas-income treatment.
- the application warns that MoR does not remove Taiwan obligations.

## Unifans, Wise and USDT route

PDF hypothesis:

- Unifans + Wise or USDT is the best mainland-to-Taiwan route.

Verification result:

- the project did not establish a complete current official evidence chain for Taiwan creator eligibility, exact payout options, fees, KYC and dispute treatment.
- crypto introduces separate source-of-funds, exchange, custody and tax issues.

Decision:

- not included as a primary platform route.
- may be reconsidered only through an evidence-linked pull request.

## Exact Portaly fees and withholding tactics

PDF hypotheses included specific plans, percentages and suggestions to split withdrawals.

Decision:

- exact fees are omitted from runtime recommendation until confirmed from current official terms.
- the project does not recommend structuring withdrawals to avoid lawful withholding.
- users must follow current platform and Taiwan rules.

## Foreign-company shortcuts

PDFs discussed US LLC and other foreign entities.

Decision:

- a genuine foreign entity remains a conditional later-stage option.
- no promise of “no tax” is made.
- annual filings, banking, beneficial ownership, accounting and Taiwan treatment must be modeled first.

## Review protocol

A claim is refreshed when:

- 90 days have passed
- platform support changes
- a payout fails
- a fee dispute occurs
- a government rule changes
- CI or user evidence shows a mismatch

Each refresh must update:

1. `src/data/sources.ts`
2. affected `src/data/platforms.ts`
3. decision rules, if necessary
4. tests
5. documentation
6. review date

## Claim states

### `official`

The primary source supports the route's core eligibility or capability.

It does not guarantee individual approval.

### `conditional`

The route is real but requires an entity, contract, region, account state or feature approval that is not the default Taiwan path.

### `verify-in-account`

Public documentation is insufficient for the exact Taiwan account/program. The creator must use their own dashboard as evidence.

### `not-recommended`

Reserved for routes that are unsafe, deceptive or structurally non-compliant. Unsafe methods are generally excluded instead of displayed.
