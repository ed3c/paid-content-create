# Platform Catalog

> Snapshot reviewed 2026-08-15. Always open the linked official documentation before registration.

| Platform | Type | Best market | Business stage | Recurring | Taiwan invoice posture | Payout route | Verification |
|---|---|---|---|---:|---|---|---|
| Portaly | Hosted creator commerce | Taiwan | Individual → company | Yes | Platform-handled; verify live agreement | Taiwan bank | Official |
| ECPay | Local gateway | Taiwan | Registered/company | Yes | Native integration | Taiwan bank | Official |
| NewebPay | Local gateway | Taiwan | Registered/company | Yes | Native service | Taiwan bank | Official |
| Polar | Merchant of Record | Global | Individual → company | Yes | External Taiwan handling | Stripe Connect | Official |
| Lemon Squeezy | Merchant of Record | Global / mainland one-time | Individual → company | Yes | External Taiwan handling | Bank or PayPal | Official |
| Gumroad | Merchant of Record | Global | Individual → company | Yes | External Taiwan handling | Country-dependent bank/PayPal | Official |
| Patreon | Membership platform | Global | Individual → company | Yes | External Taiwan handling | Payoneer/PayPal by eligibility | Official |
| YouTube / AdSense | Native platform | Taiwan/global | Individual → company | N/A | N/A | Supported AdSense payment method | Official |
| X Monetization | Native platform | Taiwan/global | Individual → company | N/A | N/A | Platform-managed Stripe | Official |
| TikTok Monetization | Native platform | Taiwan/global | Individual → company | Program-dependent | N/A | Program/account-dependent | Verify in account |
| Substack | Publishing platform | Global | Supported-country entity | Yes | External Taiwan handling | Stripe-supported entity bank | Conditional |
| Ghost | Publishing platform | Global/owned | Registered/company | Yes | External Taiwan handling | Own Stripe for native paid | Conditional |
| PayPal + E.SUN | Payout rail | Taiwan | Any | N/A | N/A | PayPal → E.SUN | Official fallback |
| Standalone Stripe | Payment processor | Global | Supported-country company | Yes | External Taiwan handling | Matching entity bank | Conditional for Taiwan |

## Platform notes

## Portaly

Use when:

- Taiwan-first individual MVP
- hosted checkout is more valuable than full control
- the creator can keep email/CRM outside the platform

Do not assume:

- Portaly replaces a full EDM
- every withholding/payout term remains static
- platform-handled documents remove all creator filing obligations

Official entry: <https://portaly.cc/>

## ECPay

Use when:

- Taiwan market dominates
- the creator has a registered entity
- recurring TWD and e-invoice are core requirements

Verify separately:

- foreign cards
- WeChat Pay
- UnionPay
- recurring approval
- settlement cycle
- reserve or risk conditions

Official entry: <https://www.ecpay.com.tw/>

## NewebPay

Use when:

- a registered Taiwan business needs local checkout
- recurring and e-invoice must integrate into an owned system

Official entry: <https://www.newebpay.com/>

## Polar

Use when:

- the offer is software, developer tooling or a digital subscription
- MoR buyer-tax handling is valuable
- Taiwan payout onboarding is accepted

Current public Starter snapshot for new organizations:

- 5% + US$0.50
- international-card and payout pass-through fees can apply

Official pricing: <https://polar.sh/resources/pricing>

## Lemon Squeezy

Use when:

- broad hosted checkout and subscription functions are needed
- one-time payment methods for global or mainland buyers matter
- the creator accepts twice-monthly payout mechanics and fees

Important:

- one-time checkout documents cards, PayPal, Alipay, WeChat Pay and UnionPay
- subscriptions support a narrower method set
- exact methods shown depend on region/device/risk

Official payment methods: <https://docs.lemonsqueezy.com/help/checkout/payment-methods>

## Gumroad

Use when:

- launch speed is the dominant requirement
- the creator accepts higher direct-sale economics

Current direct-sale fee snapshot:

- 10% + US$0.50
- card processing is separate
- discovery sales use a higher marketplace fee

Official fees: <https://gumroad.com/help/article/66-gumroads-fees.html>

## Patreon

Use when:

- the product is ongoing membership and benefits
- community delivery matters more than payment-control depth

Always preserve:

- owned email
- content archive
- member export where permitted
- payout evidence

Official payout help: <https://support.patreon.com/hc/en-us/articles/203913489>

## YouTube

Taiwan payment method availability is documented through AdSense for YouTube. Keep viewer geography and annual revenue reports for Taiwan tax-source analysis.

Official help: <https://support.google.com/adsense/answer/1714397>

## X

X uses platform-managed Stripe onboarding. Do not confuse it with standalone Stripe merchant-account eligibility.

Official help: <https://help.x.com/en/using-x/creator-revenue-sharing>

## TikTok

The public official creator material does not prove one universal Taiwan payout rail across every monetization program. The app therefore requires in-account verification.

Official creator portal: <https://www.tiktok.com/creators/creator-portal/en-us/category/getting-paid-to-create/>

## Substack

Native paid publishing depends on Stripe-supported onboarding. A Taiwan individual should not assume paid activation.

Official support: <https://support.substack.com/>

## Ghost

Ghost native paid memberships connect to the publisher's Stripe account. An external MoR or Taiwan gateway architecture requires custom entitlement integration.

Official help: <https://ghost.org/help/paid-memberships/>

## PayPal + E.SUN

Use only when a platform does not provide a better direct payout rail. Compare explicit fees and FX spread.

Official E.SUN page: <https://www.esunbank.com/zh-tw/personal/deposit/foreign-service/paypal>

## Standalone Stripe

Taiwan is not listed for direct Stripe Payments merchant onboarding. Use only with a genuine supported-country entity, matching bank and complete compliance.

Official availability: <https://stripe.com/global>
