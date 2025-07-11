# Shared RDM Newsletter Template

This project generates an email-friendly `index.html` newsletter from a template + a single “content file”.

## The simple workflow 

1. Edit **only**: `newsletter-data.js`
2. Run: `npm run build`
3. Result is written to: `index.html`

## Quick Start

### For Yearly Updates

1. **Update content**: edit `newsletter-data.js`
2. **Update images**: add/replace files in `images/` (or change paths in `newsletter-data.js`)
3. **Build newsletter**: run `npm run build`
4. **Done**: your updated newsletter is now in `index.html`
