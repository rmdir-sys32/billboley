# BolBill MVP

A buildless, browser-local voice-text billing prototype. Open `dist/index.html`, or serve `dist` with `python -m http.server 4173 --directory dist`.

Use Wispr Flow to dictate into the command field, then select **Add to bill**. Flow runs separately; this prototype does not embed or control it. Typing and product buttons work without Flow.

Supported examples:

- `Do kilo chawal, aadha kilo chini, aur do doodh ke packet`
- `दो किलो चावल और आधा किलो चीनी`
- `Chawal ek kilo kar do`
- `Chini hata do`
- `250 ml tel`

Use commas or “aur” between items. Catalogue and prices are illustrative. Milk is one fixed 500 ml packet variant. Unknown words, mismatched units, and unsupported variants reject the entire command without changing the bill. This is a bounded parser, not general speech understanding. No audio is recorded by this app.

Review the receipt and explicitly confirm to save. History and draft recovery use browser local storage, without cloud backup. Payment status is merchant-reported, not verified. No stock tracking, legal tax invoicing, credit ledger, or branch sharing is included.

Run meaningful parser checks: `node billing.test.cjs`.
