# Security Policy

## Supported version

Only the current `main` branch is supported.

## Security posture

This application is intentionally low-trust and low-data:

- no user accounts
- no database
- no third-party analytics
- no payment processing
- no platform API keys
- no identity or banking document upload
- no automated KYC submission
- only localStorage for non-sensitive preferences and checklist state

The Bun server exposes only:

- static assets
- `GET /health`
- `GET /api/catalog`

Security headers include CSP, frame blocking, referrer policy, MIME sniffing protection and a restrictive Permissions Policy.

## Never add

- credential collection
- bank account or identity-document forms
- OAuth token storage without a separate threat model
- automated scraping behind authenticated platform accounts
- instructions that bypass platform country or KYC controls
- secret values in source control

## Reporting

Open a private GitHub security advisory for vulnerabilities. Do not include live credentials, personal data or exploitable financial-account details in a public issue.

## Deployment

Terminate TLS at the hosting platform, keep Bun updated, serve the repository from a non-privileged runtime user where applicable, and monitor dependency/action advisories.
