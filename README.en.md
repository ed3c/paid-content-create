# Creator Revenue Router Taiwan

An evidence-first Bun + TypeScript decision guide for creator monetization, checkout and payouts in Taiwan.

## Why this exists

Creators often collapse four different questions into one:

1. Can I register?
2. Can my buyer pay?
3. Can I withdraw safely to Taiwan?
4. Can I reconcile, document and report the income?

The application collects a small business profile and returns a deterministic platform stack, payout path, risk gates and launch checklist.

## Default routes

| Situation | Starting route | Durable route |
|---|---|---|
| Taiwan individual MVP | Portaly + owned email/CRM | Migrate to a local gateway after validation |
| Registered Taiwan business | ECPay or NewebPay + e-invoice | Owned subscription and entitlement state |
| Global SaaS | Polar, with Lemon Squeezy as an alternative | MoR + owned product data |
| Global digital products | Lemon Squeezy / Polar; Gumroad for speed | Re-evaluate by AOV, GMV and support load |
| Global membership | Patreon or MoR + owned email/content | Portable member data |
| Platform-native revenue | YouTube / X; verify TikTok in account | Treat native payout as a bonus |
| Mainland China buyers | Verified cross-border one-time checkout | Formal merchant contract only |

## Critical distinction

A platform-managed Stripe Connect payout is not the same product as opening a standalone Stripe Payments merchant account. Taiwan is not listed for direct standalone Stripe Payments onboarding, while a platform can separately support Taiwan connected accounts.

## Run

```bash
bun run test
bun run dev
```

Production:

```bash
bun run build
NODE_ENV=production bun src/server.ts
```

## Privacy and security

The app stores only profile choices and checklist completion in browser localStorage. It does not collect credentials, identity documents, bank details, tax IDs or verification codes. It never submits third-party KYC.

## Documentation

- [Traditional Chinese solution](./docs/SOLUTION.zh-TW.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Data flow](./docs/DATA-FLOW.md)
- [Decision rules](./docs/DECISION-RULES.md)
- [Source provenance](./docs/SOURCE-PROVENANCE.md)
- [Legal disclaimer](./docs/LEGAL-DISCLAIMER.md)

## License

MIT.
