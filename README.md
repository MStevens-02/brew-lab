# Brew Lab 🍺

Home brewing guides, calculators, recipes and a batch log for **beer, wine, cider and mead**. It runs entirely in the browser with no build step and no backend, and works offline once loaded.

**Live:** https://mstevens-02.github.io/brew-lab/

## What's in it

- **Guides:** fermentation basics, equipment, sanitising, hydrometers & refractometers, kit/extract beer, all-grain BIAB, wine (kits, juice, country wines), cider, mead, bottling & kegging, troubleshooting/off-flavours, and safety & UK law.
- **Shop-juice section:** easy→hard levels (bottle brew to sweet sparkling), juice wizard with shopping list/equipment/plan, label checker, 7 juice recipes.
- **Skill ladders:** every drink (beer, wine, cider, mead, shop juice, other brews) made five ways, super easy to expert, with progress tracking.
- **Yeast:** full yeast guide + yeast picker.
- **Calculators:** ABV & attenuation, sugar for target ABV, priming sugar, keg PSI, hydrometer temperature correction, refractometer (Terrill), mash water & strike temp, yeast pitch rate, dilution & blending, mead designer with TOSNA schedule, stabilise & back-sweeten, units/calories/cost, unit converter.
- **Beer recipe designer:** grain bill and hops with live OG/FG/ABV/IBU (Tinseth)/colour (Morey) and a style match.
- **Brew-day timer:** mash and boil countdown with beeping, vibrating hop-addition alarms.
- **Recipes:** 33 recipes with search & filters, all scalable, each with a step-by-step brew-along mode (timers + calendar reminders).
- **Calendar & reminders:** month view of every batch milestone + custom reminders, due banner, app badge, notifications, one-tap export to phone calendar (.ics with alarms).
- **Your brewery:** cellar with bottle counts & ready dates, tasting notes & star ratings, shopping list (one-tap from recipes), printable bottle labels, global search.
- **Plan & buy:** batch shopping planner (14 drink types; exact amounts → packs to buy → cost → shopping list).
- **Beyond fruit:** bread & kvass, potato, rice wine, corn & grains, unusual ferments, each with a 5-level skill ladder, 12 recipes and a starch guide (fermentation only, no distilling).
- **Off-grid Scotland:** a complete living-off-the-land hub for Scotland: month-by-month forage & brew calendar with reminders, 28 plants with lookalike warnings, deadly plants, water, fire, shelter, food & stores, hazards and 999, Scottish law, 7 Scottish recipes, a skill ladder, forage brew planner and a printable field handbook.
- **Survival:** off-grid brewing guide + ladder, and a safety-first survival distilling guide with still run planner (for licensed UK / NZ use only).
- **Help:** first-time tour, feature guide, What's new, link back to all my tools on every page.
- **Learn:** Brew School (10 lessons, 32 quiz questions, printable certificate), flashcards with spaced repetition, fermentation simulator, Problem Doctor troubleshooter, flavour finder, 6 more beginner guides (first 6 weeks, tasting, sweetness methods, flavour additions, ageing, scaling/units).
- **Notifications:** inbox with unread badge, per-type preferences and quiet-morning hour, background checks on installed Android app (periodic sync), tappable notifications that open the right page, tip of the day.
- **Newbie help:** daily fermentation coach on every batch, illustrated "Kit explained", tap-to-explain jargon in guides, achievements, "Ready to bottle?" safety check.
- **Looks:** light / dark / auto theme, text-size setting, tablet icon-rail layout, small-phone and landscape fixes.
- **More:** favourites, "jump back in", welcome card, stats dashboard, batch photos, cost per pint & money saved, "brew this again", keyboard shortcuts (/ search, h g c r l k).
- **App:** installable PWA with PNG icons & shortcuts, offline support, backup/restore of all data.
- **Beginner toolkit:** "find your first brew" quiz, "Is this normal?" checker, hydrometer reading trainer, beginner FAQ & 10 classic mistakes.
- **Batch log:** gravity readings, fermentation curve, live ABV, timeline, JSON export/import (stored in localStorage).
- **Reference:** beer styles, malts, hops, yeasts, glossary.

## Structure

```
index.html            app shell
css/style.css
js/calc.js            pure brewing maths (Node-testable)
js/data.js            grains, hops, yeasts, styles
js/guides.js          guide content + glossary
js/recipes.js
js/core.js            helpers + calculator form engine
js/calcs.js           standard calculators
js/tools.js           recipe designer, timer, batch log
js/app.js             pages + hash router
sw.js                 offline cache
```

All figures are estimates. Measure your own gravities. Brewing for personal use is legal in the UK; selling it or distilling needs HMRC approval.
