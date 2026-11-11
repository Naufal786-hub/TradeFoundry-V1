# TradeFoundry Terminal

A responsive, dark institutional-style market dashboard branded with the supplied TradeFoundry logo.

## Included
- Market overview dashboard
- TradingView interactive advanced charts (XAUUSD and other symbols)
- Cross-asset / intermarket monitor
- Economic calendar with impact and currency filters
- Market news timeline with category tabs
- Forex cross rates, crypto screener and equity heatmap
- Jakarta clock and session indicator
- Responsive mobile navigation and scrollable sections

## Run locally
This is a static site. Open `index.html` in a browser, or run a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository, for example `tradefoundry-terminal`.
2. Upload **all files and folders** in this project (keep `assets/`).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. GitHub will provide the public Pages URL after deployment.

## Data and important notes
- Live charts, heatmap, market overview, news timeline, forex rates, crypto screener and economic calendar are embedded from TradingView.
- A network connection is required. Some widgets may be limited by symbol availability, region, browser privacy settings or third-party service changes.
- TradingView widgets provide their own timestamps, quotes and source links. This project does not scrape or independently validate the feed.
- This starter version uses third-party embedded widgets, not a proprietary market-data backend. It does not calculate verified daily intermarket percentage returns or maintain a custom historical database.
- For a production-grade terminal with a unified API, server-side caching, verified economic event timestamps, historical correlation calculations and custom news aggregation, connect licensed market-data/news APIs and store secrets in server-side environment variables. Never put private API keys in frontend JavaScript.
- The page date in the overview heading is a static label; update it or wire it to a live date before production use.

## Brand
TradeFoundry — LEARN / ANALYZE / TRADE / GROW
