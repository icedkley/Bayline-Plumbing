# Bayline Plumbing — Demonstration Site

A portfolio demonstration build for a fictional residential and
commercial plumbing company in Corpus Christi, TX. It is not a real
business and does not generate real leads.

## File structure

    bayline/
    ├── index.html
    ├── services/
    │   ├── index.html
    │   └── water-heater-repair.html
    ├── css/
    │   ├── tokens.css      (CSS custom properties)
    │   ├── base.css        (reset, typography, utilities)
    │   └── components.css  (buttons, header, footer, cards, forms)
    ├── js/
    │   └── main.js         (nav, FAQ, form validation, reveal)
    └── images/
        ├── hero-plumber.png
        └── tankless-heater.jpg

## How to view

Open `index.html` in a browser. No build step, no server required.

## Where to swap content

- **Images:** drop replacements into `images/` using the same
  filenames, or update the `src` in the HTML.
- **Phone number:** search for `tel:+13615550123` across the three
  HTML files. There are multiple occurrences per page.
- **License number:** search for `#M-00000`. Appears in the header
  line and in the homepage value strip.
- **Email:** search for `hello@baylineplumbing.example`.

## Note

This is a demonstration build, not a real business. The pricing
ranges on the water heater page are illustrative and marked with an
HTML comment for replacement before any live use.