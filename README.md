# betterinsta

A tiny, unofficial Firefox extension that adds a quick search button to Instagram on the web. Type a query, press Enter, and it opens Instagram's own keyword search page, so you don't have to click through the sidebar.

> Not affiliated with, endorsed by, or sponsored by Instagram or Meta.

## Features

- Round search button at the bottom-right of instagram.com
- Press `/` anywhere (when you're not typing) to open and focus the search box
- `Enter` searches, `Esc` closes the box
- The box stays open between searches in the same tab
- No accounts, no tracking, no network requests of its own

## Install

**From Firefox Add-ons:** _link goes here once published._

**From source (temporary, for testing):**

1. Download or clone this repo.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on** and pick `manifest.json`.

Temporary add-ons are removed when Firefox restarts.

## How it works

The extension injects one small script and stylesheet on `https://www.instagram.com/*`. It does not read, scrape or modify Instagram's results. It builds a URL like `https://www.instagram.com/explore/search/keyword/?q=your+query` and navigates there. What you see is whatever Instagram returns for your logged-in account, so results can differ from the app depending on the account and region.

Slashes and `#` are stripped from queries, because Instagram's web keyword search doesn't handle hashtag-style queries reliably.

## Privacy

The extension collects and transmits nothing. See [PRIVACY.md](PRIVACY.md).

## Development

```bash
npm install          # installs web-ext
npm start            # runs Firefox with the extension loaded
npm run lint         # validates the extension
npm run build        # creates web-ext-artifacts/*.zip
```

## Limitations

- Results are Instagram's own keyword search; this extension cannot improve ranking or personalization.
- If Instagram changes its search URL, the button will need an update.

## License

[MIT](LICENSE)
