# AGENTS.md

## Mission

Maintain an evidence-first decision system for Taiwan creator monetization and payouts.

The repository is not a marketing list. Every recommendation must preserve the distinction between:

- registration eligibility
- buyer payment availability
- creator payout availability
- Taiwan tax, invoice and accounting obligations

## Hard rules

1. Never add fake-address, borrowed-entity, private-agent, underground-exchange or KYC-bypass instructions.
2. Never collect passwords, identity documents, bank credentials, tax IDs, OTP codes or API secrets.
3. Do not upgrade a user-provided PDF claim to `official` without a matching primary source.
4. A Merchant of Record handles buyer-side transaction tax; it does not erase Taiwan creator obligations.
5. A Stripe Connect connected account is not a standalone Stripe Payments merchant account.
6. TikTok payout claims remain `verify-in-account` unless an official Taiwan program document proves the exact rail.
7. Changes to fees, country support, tax thresholds or eligibility require a new `reviewedAt` date and source update.
8. Keep recommendations deterministic. Do not introduce an LLM into the runtime decision path.
9. Preserve repository visibility and ownership. Do not change public/private state or transfer access.
10. Do not merge when tests or the production build fail.

## Change workflow

1. Read:
   - `docs/SOLUTION.zh-TW.md`
   - `docs/SOURCE-PROVENANCE.md`
   - `docs/DECISION-RULES.md`
2. Update official sources first in `src/data/sources.ts`.
3. Update platform records in `src/data/platforms.ts`.
4. Change decision logic in `src/domain/recommendation-engine.ts`.
5. Add or update tests in `tests/run.ts`.
6. Run:
   ```bash
   bun run test
   bun run build
   ```
7. Update affected docs and review date.
8. Deliver through a pull request with evidence links and a migration note.

## Definition of done

- Every platform references at least one source.
- All source IDs resolve.
- No unsupported universal payout claim is introduced.
- No sensitive-data collection endpoint exists.
- Tests pass.
- Build succeeds.
- `/health` and `/api/catalog` return 200.
- Documentation and UI express the same recommendation.
