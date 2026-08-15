# Creator Revenue Router Taiwan

> 台灣內容創作者的變現、收款、出金與合規決策導覽。  
> A Bun + TypeScript evidence-first guide for creator monetization and payouts in Taiwan.

[繁體中文](#繁體中文) · [English](./README.en.md) · [完整方案](./docs/SOLUTION.zh-TW.md) · [資料流](./docs/DATA-FLOW.md) · [來源治理](./docs/SOURCE-PROVENANCE.md)

---

## 繁體中文

### 這個專案解決什麼

台灣創作者常把四個不同問題混在一起：

1. **能不能註冊平台**
2. **買家能不能順利付款**
3. **款項能不能安全匯回台灣**
4. **收入能不能對帳、開立憑證並正確申報**

Creator Revenue Router 把這四個問題拆開，依據：

- 受眾市場：台灣、全球、中國大陸
- 商品：數位商品、電子報、會員、課程、SaaS、平台原生分潤
- 商業階段：個人、工作室/行號、公司
- 優先順序：速度、毛利、控制權、台灣付款轉換率
- 月營收、B2B 與 recurring billing 需求

產生一組可執行的：

- 平台順序
- 官方註冊入口
- 出金資料流
- 風險 gate
- launch checklist
- MoR 費用估算

### 核心判斷

| 情境 | 建議起點 | 長期結構 | 優先出金 |
|---|---|---|---|
| 台灣個人 MVP | Portaly + 自有 Email/CRM | 驗證後轉在地 gateway | 平台結算 → 台灣銀行 |
| 台灣規模化 | ECPay / NewebPay + 自有網站 + 電子發票 | 自有訂閱與 entitlement 狀態機 | Merchant settlement → 台灣銀行 |
| 全球 SaaS / 軟體 | Polar；Lemon Squeezy 備援 | MoR + 自有產品資料 | Stripe Connect / bank payout |
| 全球數位商品 | Lemon Squeezy / Polar；速度優先 Gumroad | 依 AOV 與 GMV 重新估算 | 直接 bank / Connect |
| 全球會員 / 電子報 | Patreon 或 MoR + 自有內容與 Email | 避免名單被平台鎖定 | Payoneer / Connect / bank |
| YouTube / X / TikTok | 當成 discovery 與額外分潤 | 導回自有名單與商品 | 平台指定 payout |
| 中國大陸受眾 | 可驗證的 one-time Alipay / WeChat Pay / UnionPay checkout | 通過正式 merchant contract | 官方平台 → 台灣銀行 |

### 關鍵區分：Stripe Payments ≠ Stripe Connect

台灣目前不在 Stripe standalone Payments 的直接開戶國家清單；這不代表所有使用 Stripe 基礎設施的平台都不能匯款到台灣。X、Polar 等平台可使用平台管理的 **Stripe Connect** onboarding。兩者的法律主體、風控、責任與可用國家不同。

本專案不提供：

- 假地址或借名開戶
- 自動提交 KYC
- 儲存身分證、銀行帳號、驗證碼或平台密碼
- 私人代收、地下匯兌或不明資金來源
- 將 MoR 誤包裝成台灣免稅方案

### 一站式的正確邊界

導覽頁可以一站式完成：

- 問題診斷
- 平台排序
- 註冊深連結
- checklist
- 費用估算
- 來源查核
- 列印或儲存方案

導覽頁**不會**替使用者跨站填寫或送出 KYC。各平台需要由創作者本人在官方頁面確認條款、身分、銀行與稅務資料。

## 快速開始

需要 [Bun](https://bun.sh/) 1.3.3 以上。

```bash
bun run test
bun run dev
```

開啟：

```text
http://localhost:3000
```

正式建置與啟動：

```bash
bun run build
NODE_ENV=production bun src/server.ts
```

健康檢查：

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/catalog
```

## 功能

- 無 framework 的 Bun + TypeScript SPA
- 確定性 recommendation engine，可測試、可追溯
- 14 個平台與 payout rail 的驗證目錄
- localStorage profile 與 checklist
- Polar、Lemon Squeezy、Gumroad 費用快照估算
- 官方來源、政府來源與研究輸入分層
- CSP、無 credential collection、無第三方 analytics
- GitHub Actions：決策規則測試、build、server smoke test

## 目錄結構

```text
paid-content-create/
├── .github/workflows/ci.yml
├── public/
│   └── index.html
├── scripts/
│   └── build.ts
├── src/
│   ├── client.ts
│   ├── server.ts
│   ├── styles.css
│   ├── types.ts
│   ├── data/
│   │   ├── platforms.ts
│   │   └── sources.ts
│   └── domain/
│       ├── payout-cost.ts
│       └── recommendation-engine.ts
├── tests/
│   └── run.ts
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATA-FLOW.md
│   ├── DECISION-RULES.md
│   ├── DEPLOYMENT.md
│   ├── LEGAL-DISCLAIMER.md
│   ├── PLATFORM-CATALOG.md
│   ├── ROADMAP.md
│   ├── SOLUTION.zh-TW.md
│   └── SOURCE-PROVENANCE.md
├── AGENTS.md
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
├── package.json
└── tsconfig.json
```

完整元件責任與資料流請讀：

- [Architecture](./docs/ARCHITECTURE.md)
- [Data flow diagrams](./docs/DATA-FLOW.md)
- [Decision rules](./docs/DECISION-RULES.md)

## 資料可信度

來源優先順序：

1. 政府法規與稅務機關
2. 平台官方文件與官方 Help Center
3. 使用者上傳 PDF，僅作 research input
4. 推論，必須明確標記且不可覆蓋官方來源

所有 platform record 都必須有 `sourceIds`。平台政策與費率的 review date 為 **2026-08-15**。詳見 [SOURCE-PROVENANCE.md](./docs/SOURCE-PROVENANCE.md)。

## 安全與隱私

瀏覽器只使用 localStorage 保存選項與 checklist。伺服器沒有登入、資料庫、追蹤像素或 credential endpoint。請讀 [SECURITY.md](./SECURITY.md)。

## License

MIT. 法律、稅務與平台資料不因程式碼授權而成為專業意見；使用前請閱讀 [LEGAL-DISCLAIMER.md](./docs/LEGAL-DISCLAIMER.md)。
