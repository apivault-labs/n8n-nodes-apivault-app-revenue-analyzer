# n8n-nodes-apivault-app-revenue-analyzer

An [n8n](https://n8n.io) community node for **Mobile App Revenue & Competitor Analyzer**, powered by the [`apivault_labs/app-revenue-analyzer` Apify Actor](https://apify.com/apivault_labs/app-revenue-analyzer).

Estimate any iOS app's revenue and downloads, see chart positions, update cadence, in-app purchases, developer portfolio and direct competitors. Paste an App Store link or app ID. Bulk, no login, no API key. Pay per result, $1/1K. CSV/JSON/Excel/API.

The node is a thin connector: collection, analysis, retries and billing run in the hosted Actor. It contains no private scraper implementation or embedded credentials.

## Installation

1. Open **Settings → Community Nodes** in your n8n instance.
2. Select **Install**.
3. Enter `n8n-nodes-apivault-app-revenue-analyzer` and confirm.

## Credentials

Create an **Apify API** credential in n8n and paste your personal token from [Apify Console → Integrations](https://console.apify.com/account/integrations). The token is sent to Apify as a bearer credential and is never bundled with this package.

## Usage

Add **Mobile App Revenue & Competitor Analyzer** to a workflow, fill the public Actor inputs below, and execute the node. Every Dataset result becomes one n8n item, so it can flow into Sheets, databases, CRMs, alerts or your own code. The node respects n8n's **Continue On Fail** behavior.

| Input | Type | Description |
|---|---|---|
| `mode` | `string` | analyze = full reports for given apps. search = find top apps for keywords with estimates (ASO research). |
| `searchTerms` | `array` | App-store keywords to search, e.g. 'meditation', 'budget tracker'. |
| `maxSearchResults` | `integer` | How many top results to return per keyword (1-50). |
| `maxConcurrency` | `integer` | How many apps are processed in parallel (analyze mode). Higher = faster bulk runs. |
| `targets` | `array` | Each item can be an App Store URL (apps.apple.com/.../id123456), a numeric App Store app ID, or a Google Play package name (v1: Play inputs return a free pointer to the iOS twin). |
| `country` | `string` | Two-letter App Store country code (us, gb, de, ...). Affects ratings, charts and pricing. |

## Pricing

The package is free. Actor runs are billed by Apify using the pricing shown on the [Actor page](https://apify.com/apivault_labs/app-revenue-analyzer); platform usage may also apply.

## Resources

- [Actor and live input schema](https://apify.com/apivault_labs/app-revenue-analyzer)
- [Source repository](https://github.com/apivault-labs/n8n-nodes-apivault-app-revenue-analyzer)
- [n8n community-node documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT. The hosted Actor is a separate paid service governed by Apify terms.
