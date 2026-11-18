# Accessibility checklist (Phase 5)

Target: WCAG 2.2 AA. Site: https://garretthead00.github.io/garretthead-portfolio/

## Automated (runs on every pull request)

`npm run test:a11y` (`e2e/a11y.e2e.ts`) fails the build if any of these break:

- axe-core finds no WCAG 2.2 AA violations at 320, 390, 768 and 1440 px.
- The skip link is the first Tab stop and moves focus into `<main>`.
- The active section link is underlined, not marked by color alone.
- At 390 px, no focused element is hidden under the header or the tab bar.

Checked once in Chrome during Phase 5 (not in CI): no horizontal scrolling at 320 px or at 1280 px zoomed to 400%; no clipped text with WCAG text-spacing overrides; forced colors (tiger visible, buttons and tech labels outlined, active tab underlined); `prefers-contrast: more` (stronger borders, lighter footer text).

## Manual passes

Tick each item and add your initials and the date. The phase is signed off when every item passes or has a note.

### Keyboard only (any desktop browser)

- [ ] The first Tab shows "Skip to content"; Enter jumps past the header, and the next Tab lands on "Connect on LinkedIn".
- [ ] Tab order follows the page: header, hero, company links, footer (Reduce motion, LinkedIn, GitHub).
- [ ] Every focused item shows a gold ring and is never hidden behind the header.
- [ ] "Reduce motion" toggles with Space and Enter, and stays as you left it after a reload.

### VoiceOver on macOS (Safari)

- [ ] The rotor's Landmarks list shows banner, the "Sections" navigation, main and content info.
- [ ] The rotor's Headings list shows one h1 (Garrett Head), h2 per section, h3 per skill group and per company.
- [ ] Nav links announce "current location" for the section in view.
- [ ] Icon-only links announce "LinkedIn" and "GitHub"; company links announce "<Company> on LinkedIn".
- [ ] "Reduce motion" announces as a toggle button with its pressed state.
- [ ] The tiger reads as "Tiger illustration in purple and gold"; the header logo is skipped.

### VoiceOver on iOS (Safari)

- [ ] Swiping through the page reaches everything in reading order, with the bottom tab bar last.
- [ ] Tab bar items announce their names and which one is the current location.
- [ ] Double-tapping a tab bar item moves to that section, and its heading is not hidden under the header or the bar.

### TalkBack on Android (Chrome)

- [ ] The same as iOS: reading order, tab bar names and current location, section jumps.

### NVDA on Windows (Firefox or Chrome), if a Windows machine is available

- [ ] H and D (heading and landmark navigation) match the macOS lists above.
- [ ] Browse mode reads every role card, including its dates and tech labels.

### Display settings

- [ ] 200% browser zoom at 1280 px wide: nothing overlaps or is cut off.
- [ ] 400% browser zoom: one column, no sideways scrolling.
- [ ] Windows Contrast themes (forced colors): all text readable, tiger visible, buttons and pills outlined, active nav underlined.
- [ ] macOS Increase contrast: borders and footer text get stronger.
- [ ] OS Reduce motion on: sections fade in without sliding; "Reduce motion" shows On.

## Sign-off

| Pass | Result | Notes | Initials / date |
| ---- | ------ | ----- | --------------- |
| Keyboard | | | |
| VoiceOver macOS | | | |
| VoiceOver iOS | | | |
| TalkBack | | | |
| NVDA | | | |
| Display settings | | | |
