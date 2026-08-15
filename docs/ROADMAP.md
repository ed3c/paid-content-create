# Roadmap

## Shipped in v0.1

- Bun + TypeScript single-page guide
- seven deterministic monetization routes
- 14 platform/payout records
- official/government/research source hierarchy
- localStorage profile and checklist
- MoR fee estimator
- print/copy workflow
- source registry UI
- tests and GitHub Actions smoke checks
- no sensitive-data collection

## Phase 2: Evidence maintenance

- add source expiration and stale badges
- add a machine-readable change log per platform
- automate public-page availability checks without authenticated scraping
- generate a quarterly evidence report
- add `lastVerifiedClaimHash` to source records
- notify maintainers when official URLs or core claims change

## Phase 3: Better business modeling

- AOV, churn and support-cost simulator
- local gateway vs MoR break-even model
- payout batching optimizer
- FX and Taiwan receiving-bank fee inputs
- B2B invoice and sponsor pipeline route
- revenue concentration and platform dependency score

## Phase 4: Content business operating system

- owned-offer catalog
- CRM export/import contracts
- entitlement adapter interfaces
- evidence-pack generator
- reconciliation exception queue
- consent and privacy data model
- content-to-offer funnel dashboard

## Phase 5: Optional integrations

Only after a separate threat model:

- read-only OAuth to import platform eligibility
- read-only payout/ledger imports
- webhook verification adapters
- Google Sheets export
- accounting export

The project will not store third-party passwords or automate identity-verification submission.

## Non-goals

- platform credential vault
- automatic KYC
- fake regional onboarding
- tax filing automation without professional validation
- underground exchange or crypto laundering paths
- claiming guaranteed revenue
- LLM-generated runtime decisions without deterministic policy gates
