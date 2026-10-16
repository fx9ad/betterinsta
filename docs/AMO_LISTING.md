# Firefox Add-ons (AMO) listing draft

## Name
betterinsta

## Summary (max 250 chars)
Unofficial. Adds a quick search button to Instagram on the web. Press / or click the button, type a query, and jump straight to Instagram's own keyword search.

## Description
betterinsta adds a small round search button to instagram.com so you can jump to Instagram's keyword search without clicking through the sidebar.

- Click the button, or press / when you're not typing, to open the search box
- Enter searches, Esc closes
- The box stays open between searches in the same tab

How it works: the extension builds a link to Instagram's own search page for your query and opens it. It does not read or change Instagram's results, and it makes no network requests of its own. Results depend on the account you're logged into.

Not affiliated with, endorsed by, or sponsored by Instagram or Meta.

Open source (MIT): https://github.com/fx9ad/betterinsta

## Categories
Social & Communication; Search Tools

## Support / homepage
https://github.com/fx9ad/betterinsta

## Privacy policy
Paste the contents of PRIVACY.md.

## Notes to reviewer
- No build step, no minification, no bundler; the submitted zip is the source.
- No remote code, no network requests, no host permissions beyond the content script match on https://www.instagram.com/*.
- Storage use: one sessionStorage key (igrs-open) holding the open/closed state of the search box.
- The only navigation is `location.href` to https://www.instagram.com/explore/search/keyword/?q=<query>.
