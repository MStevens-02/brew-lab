# Brew Lab 🍺

Home brewing guides, calculators, recipes and a batch log for **beer, wine, cider and mead**. It runs entirely in the browser with no build step and no backend, and works offline once loaded.

**Live:** https://mstevens-02.github.io/brew-lab/

## What's in it

- **Guides:** fermentation basics, equipment, sanitising, hydrometers & refractometers, kit/extract beer, all-grain BIAB, wine (kits, juice, country wines), cider, mead, bottling & kegging, troubleshooting/off-flavours, and safety & UK law.
- **Calculators:** ABV & attenuation, sugar for target ABV, priming sugar, keg PSI, hydrometer temperature correction, refractometer (Terrill), mash water & strike temp, yeast pitch rate, dilution & blending, mead designer with TOSNA schedule, stabilise & back-sweeten, units/calories/cost, unit converter.
- **Beer recipe designer:** grain bill and hops with live OG/FG/ABV/IBU (Tinseth)/colour (Morey) and a style match.
- **Brew-day timer:** mash and boil countdown with beeping, vibrating hop-addition alarms.
- **Recipes:** 8 starter recipes that scale to any batch size.
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
