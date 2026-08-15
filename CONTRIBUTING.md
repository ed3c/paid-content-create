# Contributing

## Before opening a change

Read `AGENTS.md` and `docs/SOURCE-PROVENANCE.md`.

A platform or tax-policy update must include:

1. a primary-source URL
2. the exact claim it supports
3. a review date
4. the affected platform or decision rule
5. a regression test when behavior changes

## Local verification

```bash
bun run test
bun run build
NODE_ENV=production bun src/server.ts
```

Then verify:

```bash
curl --fail http://localhost:3000/health
curl --fail http://localhost:3000/api/catalog
```

## Pull request structure

Use this body:

```markdown
## Problem
## Evidence
## Decision-rule change
## User-visible change
## Tests
## Risk and rollback
```

Do not combine unrelated platform-policy updates in one pull request.
