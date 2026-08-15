# Data Flow Diagrams

## 1. Evidence compilation

```mermaid
flowchart LR
  PDFs[User-provided PDFs] --> Hypotheses[Research hypotheses]
  Hypotheses --> VerificationQueue[Verification queue]

  Gov[Government sources] --> SourceRegistry[Source registry]
  PlatformDocs[Official platform docs] --> SourceRegistry
  VerificationQueue -->|verified| SourceRegistry
  VerificationQueue -->|not proven| Conditional[Conditional / verify-in-account]

  SourceRegistry --> PlatformCatalog[Platform catalog]
  Conditional --> PlatformCatalog
  PlatformCatalog --> Rules[Recommendation rules]
  Rules --> UI[Guide UI]
  Rules --> Tests[Regression tests]
```

## 2. Creator decision flow

```mermaid
flowchart TD
  Profile[Creator profile] --> Market{Primary paying market?}
  Market -->|Taiwan| Stage{Individual?}
  Stage -->|Yes| TWHosted[Portaly + owned Email]
  Stage -->|No| TWOwned[ECPay / NewebPay + e-invoice]

  Market -->|Global| Product{Product type?}
  Product -->|Software| Polar[Polar / Lemon Squeezy]
  Product -->|Membership or newsletter| Membership[Patreon or MoR + owned content]
  Product -->|Digital product / course| GlobalProduct[Lemon / Polar / Gumroad]
  Product -->|Native platform| Native[YouTube / X / verify TikTok]

  Market -->|Mainland China| Mainland[Verified one-time cross-border checkout]

  TWHosted --> Gates[Risk gates + checklist]
  TWOwned --> Gates
  Polar --> Gates
  Membership --> Gates
  GlobalProduct --> Gates
  Native --> Gates
  Mainland --> Gates
```

## 3. Money and evidence flow

```mermaid
flowchart LR
  Buyer[Buyer] --> Offer[Owned offer]
  Offer --> Checkout{Checkout route}

  Checkout -->|Taiwan hosted| Portaly[Portaly]
  Checkout -->|Taiwan owned| Local[ECPay / NewebPay]
  Checkout -->|Global| MoR[Polar / Lemon / Gumroad]
  Checkout -->|Native| NativePlatform[YouTube / X / TikTok]

  Portaly --> TWBank[Taiwan bank]
  Local --> Invoice[Taiwan e-invoice]
  Invoice --> TWBank

  MoR --> Payout{Payout rail}
  NativePlatform --> Payout

  Payout --> Connect[Stripe Connect]
  Payout --> Wire[Bank / wire]
  Payout --> Payoneer[Payoneer]
  Payout --> PayPal[PayPal]
  PayPal --> Esun[E.SUN Global Pass]

  Connect --> TWBank
  Wire --> TWBank
  Payoneer --> TWBank
  Esun --> TWBank

  Checkout --> OrderLedger[Order ledger]
  Invoice --> OrderLedger
  Payout --> PayoutLedger[Payout ledger]
  TWBank --> BankStatement[Bank statement]

  OrderLedger --> Evidence[Monthly evidence pack]
  PayoutLedger --> Evidence
  BankStatement --> Evidence
  Evidence --> Tax[Tax / accounting review]
```

## 4. Subscription transaction state

```mermaid
stateDiagram-v2
  [*] --> Pending
  Pending --> Paid: payment succeeded
  Pending --> Failed: payment failed
  Paid --> Active: entitlement granted
  Active --> PastDue: renewal failed
  PastDue --> Active: retry recovered
  PastDue --> Cancelled: retry exhausted / customer cancels
  Active --> Refunded: approved refund
  Active --> Disputed: chargeback opened
  Disputed --> Active: dispute won
  Disputed --> Revoked: dispute lost
  Refunded --> Revoked
  Cancelled --> Expired: access period ends
  Revoked --> [*]
  Expired --> [*]
```

## 5. Registration guide boundary

```mermaid
sequenceDiagram
  participant U as Creator
  participant G as Guide
  participant P as Official platform
  participant B as Bank
  participant A as Accountant / tax authority

  U->>G: Select market, product, stage and priority
  G-->>U: Platform order, payout path and checklist
  U->>P: Open official registration link
  P->>U: Terms, KYC, tax and bank forms
  U->>P: Submit directly on official domain
  P-->>U: Approval / review / rejection
  U->>P: Run test payment and refund
  P->>B: Send approved payout
  B-->>U: Credit and statement descriptor
  U->>G: Mark checklist locally
  U->>A: Provide evidence pack for classification and filing

  Note over G,P: The guide never receives credentials, OTP, identity documents or bank details.
```

## 6. Source refresh flow

```mermaid
flowchart TD
  Schedule[Quarterly or incident trigger] --> Fetch[Review primary sources]
  Fetch --> Changed{Policy changed?}
  Changed -->|No| Stamp[Update reviewedAt only with evidence]
  Changed -->|Yes| Source[Update source record]
  Source --> Platform[Update platform record]
  Platform --> Rule{Decision behavior changes?}
  Rule -->|Yes| Tests[Add regression test]
  Rule -->|No| Docs[Update docs]
  Tests --> Docs
  Docs --> CI[Run test + build + smoke]
  CI --> PR[Evidence-linked pull request]
```
