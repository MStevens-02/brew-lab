/* Brew Lab — skill ladders: different ways to make each drink, from super easy to expert. */
DRINK.other = { c: 'var(--other)', em: '🫚', name: 'Other brews' };
const TIERS = [
  { name: 'Super easy', c: '#7fd18b' }, { name: 'Easy', c: '#a3d468' }, { name: 'Medium', c: '#f5c542' },
  { name: 'Hard', c: '#f58a3d' }, { name: 'Expert', c: '#ff6b5b' },
];

window.Paths = {
beer: [
  { name: 'One-can beer kit', time: '4–6 weeks', hands: '30 min', cost: '≈£25 kit + £50 starter equipment', abv: '4–5%',
    what: 'A tin of pre-hopped malt extract, a bag of brewing sugar and a yeast sachet. Mix with water, add the yeast and wait. Nothing to boil.',
    need: ['Beer kit (e.g. bitter, lager, IPA, stout)', '1 kg brew enhancer (better than plain sugar)', '25 L fermenting bucket + airlock', 'Sanitiser, spoon, hydrometer', '40 × 500 ml bottles + caps & capper, or a pressure barrel'],
    steps: ['Sanitise everything that will touch the beer.', 'Soften the tin in hot water. Dissolve the extract and enhancer in 3 L of just-boiled water in the bucket.', 'Top up to 23 L with cold tap water and check it\'s 18–22 °C.', 'Take a gravity reading, sprinkle the yeast on, lid and airlock on.', 'Ferment 2 weeks at 18–20 °C until the gravity is stable.', 'Bottle with priming sugar. 2 weeks warm, 2+ weeks cool, then drink.'],
    learn: 'Sanitation, gravity readings, priming and carbonation.', links: [['#/guide/beer-kit', 'Kit guide'], ['#/calc/priming', 'Priming calculator']] },
  { name: 'Upgraded / all-malt kit', time: '5–6 weeks', hands: '1 hour', cost: '≈£30–£40', abv: '4–6%',
    what: 'A two-can (all-malt) kit, or a one-can kit with spraymalt instead of sugar. Add better yeast, a dry hop and temperature control, and it tastes like a proper craft beer.',
    need: ['Two-can kit, or one-can + 1 kg spraymalt', 'Better yeast (US-05, Nottingham, S-04)', '25–50 g hops for dry hopping', 'Stick-on thermometer, and ideally a heat belt + thermostat'],
    steps: ['As super easy, but replace all sugar with malt extract.', 'Ferment at the cool end of the yeast\'s range (17–19 °C) for cleaner flavour.', 'On day 5–7, add dry hops (in a sanitised bag if you like).', 'Give it 3 days after the gravity stabilises before bottling (lets the yeast clean up).', 'Condition at least 3 weeks; it keeps improving.'],
    learn: 'How ingredients and temperature change flavour.', links: [['#/guide/beer-kit', 'Kit upgrade tips'], ['#/calc/yeastpick', 'Yeast picker']] },
  { name: 'Extract + steeping grains + your own hops', time: '5–6 weeks', hands: '2–3 hours', cost: '≈£30 per batch + 15 L pot', abv: '4–7%',
    what: 'You design the beer: steep specialty grains for colour and flavour, boil with malt extract and add your own hops on a schedule. Any style is possible.',
    need: ['15–20 L stock pot', '2.5–3 kg spraymalt', '200–500 g crushed specialty grain + grain bag', 'Hops (bittering + aroma)', 'Digital scales, ice bath or chiller'],
    steps: ['Steep the grains in 6 L of water at 65–70 °C for 30 min, then remove.', 'Stir in the spraymalt off the heat and bring to the boil.', 'Boil 60 min, adding hops at 60 (bitter), 10–15 (flavour) and 0 min (aroma).', 'Chill fast in a sink of ice water, pour into the fermenter and top up with cold water.', 'Pitch, ferment, dry hop if wanted, bottle.'],
    learn: 'Hop schedules, bitterness (IBU), colour, recipe design.', links: [['#/recipe/extract-pale', 'Extract pale ale recipe'], ['#/calc/recipe', 'Recipe designer'], ['#/calc/timer', 'Brew-day timer']] },
  { name: 'All-grain Brew in a Bag', time: '4–8 weeks', hands: '5–6 hours', cost: '≈£20 per batch + £60–£150 kit', abv: 'any',
    what: 'Real malted barley mashed in a big pot with a mesh bag, then a full boil. Total control, cheapest ingredients per pint, and how most serious homebrewers brew.',
    need: ['35 L+ pot (or an all-in-one electric system)', 'Grain bag, strong heat source (outdoor burner or electric)', 'Immersion chiller', 'Crushed base + specialty malts, hops, yeast', 'Accurate thermometer'],
    steps: ['Work out water volumes and strike temperature.', 'Mash at 64–68 °C for 60 min.', 'Lift and drain the bag; take a pre-boil gravity.', 'Boil 60 min with hop additions and Protafloc.', 'Chill to pitching temperature, transfer, aerate, pitch.', 'Ferment with temperature control; package.'],
    learn: 'Mashing, efficiency, full-volume brew days.', links: [['#/guide/beer-biab', 'BIAB guide'], ['#/recipe/best-bitter', 'Best Bitter recipe'], ['#/calc/water', 'Water calculator']] },
  { name: 'Lagers, water chemistry, kegs & yeast', time: '6–12 weeks', hands: 'full day', cost: '£300+ setup', abv: 'any',
    what: 'The deep end: brewing crisp lagers in a temperature-controlled fridge, adjusting water minerals to suit each style, kegging with CO₂, making yeast starters and re-using yeast, pressure fermentation.',
    need: ['Fermentation fridge + controller', 'Water report + brewing salts (gypsum, calcium chloride) + pH meter', 'Cornelius keg, CO₂, regulator, tap', 'Stir plate + flask for yeast starters', 'Pressure-capable fermenter (optional)'],
    steps: ['Get your local water report (Scottish Water publishes them) and adjust calcium, sulphate and chloride to suit the style.', 'Make a 2 L yeast starter 1–2 days ahead for lagers.', 'Ferment lager at 10–12 °C, do a diacetyl rest at 18 °C, then lager near 0 °C for 4–6 weeks.', 'Transfer to a purged keg with no oxygen exposure; force-carbonate.', 'Harvest the yeast cake for the next batch.'],
    learn: 'Professional-level control and consistency.', links: [['#/calc/keg', 'Keg pressure'], ['#/calc/yeast', 'Pitch rate']] },
],
wine: [
  { name: 'Wine kit (everything in a box)', time: '1–6 weeks', hands: '1 hour', cost: '≈£25–£90 for 6 or 30 bottles', abv: '11–13%',
    what: 'Grape concentrate, yeast, stabilisers and finings all in one box with step-by-step instructions. The quickest route to drinkable wine.',
    need: ['Wine kit (7-day kits are fastest; 4–6 week premium kits taste better)', '25 L fermenter + airlock (or a demijohn for 1-gallon kits)', 'Sanitiser, hydrometer, syphon', 'Wine bottles, corks + corker (or screw caps)'],
    steps: ['Follow the kit instructions exactly, especially the timing of the stabiliser and finings sachets.', 'Ferment at 20–24 °C.', 'Degas thoroughly when told to; it helps the wine clear.', 'Bottle once crystal clear. Drinkable straight away; better after a month or two.'],
    learn: 'Fermentation, degassing, finings, bottling.', links: [['#/guide/wine', 'Wine guide']] },
  { name: 'Carton grape-juice wine', time: '2–3 months', hands: '30 min', cost: '≈£8 for 6 bottles', abv: '10–12%',
    what: 'Long-life grape juice, a little sugar, acid, tannin and wine yeast in a demijohn. Very cheap, surprisingly good.',
    need: ['4.5 L white or red grape juice (no preservatives)', '150–175 g sugar, acid, tannin, nutrient', 'Wine yeast', 'Demijohn, bung, airlock, sanitiser, syphon'],
    steps: ['Dissolve the sugar, acid and tannin in a little warm juice.', 'Combine in the demijohn, add nutrient and yeast.', 'Ferment until stable below 1.000, then rack.', 'Let it clear for 4–6 weeks, then bottle.'],
    learn: 'Balancing acid and tannin, racking, clearing.', links: [['#/recipe/carton-white', 'White recipe'], ['#/recipe/carton-red', 'Red recipe'], ['#/calc/juice', 'Juice wizard']] },
  { name: 'Country wine from fruit', time: '6–12 months', hands: '2–3 hours', cost: '≈£5–£10 per gallon (free fruit!)', abv: '11–14%',
    what: 'The British hedgerow tradition: blackberry, elderberry, plum, rhubarb, strawberry. You extract flavour from real fruit, adjust sugar and acid yourself, and age it.',
    need: ['1.5–2 kg fruit per 4.5 L', 'Pectolase, Campden tablets, nutrient, sugar', 'Wide-mouth bucket + straining bag', 'Two demijohns, hydrometer'],
    steps: ['Freeze then thaw the fruit; crush it in a bucket with Campden and pectolase; wait 24 h.', 'Add dissolved sugar and water to your target gravity (≈1.085), then nutrient and yeast.', 'Ferment on the fruit 5–7 days, stirring daily.', 'Strain into a demijohn; ferment dry; rack every 1–2 months until clear.', 'Stabilise, sweeten to taste, bottle and age 6+ months.'],
    learn: 'Fruit extraction, sugar & acid balance, ageing.', links: [['#/recipe/blackberry-wine', 'Blackberry wine'], ['#/calc/sugar', 'Sugar calculator'], ['#/calc/sweeten', 'Back-sweetening']] },
  { name: 'Flower, vegetable & fresh-grape wine', time: '6–18 months', hands: 'half a day', cost: '≈£10–£30', abv: '11–14%',
    what: 'Harder ingredients with little natural sugar, acid or body (elderflower, dandelion, parsnip, beetroot), or crushing real wine grapes. You build the whole wine from scratch.',
    need: ['Acid testing kit (titration) or pH meter', 'Grape concentrate or sultanas for body', 'Fruit press / crusher for grapes', 'Bentonite or two-part finings'],
    steps: ['Build the must: sugar for strength, acid blend for brightness, tannin and raisins/grape concentrate for body.', 'Measure and adjust acidity (aim ≈ pH 3.2–3.5).', 'For grapes: crush, add sulphite, ferment reds on the skins for colour, press whites before fermenting.', 'Rack, fine, age at least 6 months, ideally a year.'],
    learn: 'Building a wine from scratch, acid chemistry.', links: [['#/guide/wine', 'Wine guide'], ['#/guide/troubleshooting', 'Troubleshooting']] },
  { name: 'Grape wine like a winery', time: '1–3 years', hands: 'many days', cost: '£100+', abv: '12–14%',
    what: 'Proper winemaking: malolactic fermentation for softer reds, oak ageing, sulphite management, cold stabilisation, and traditional-method sparkling wine (secondary fermentation in the bottle, riddling and disgorging).',
    need: ['Malolactic bacteria culture', 'Oak barrel or oak staves/chips', 'Sulphite test kit, pH meter', 'Champagne bottles, crown caps, bidules, a riddling rack, a freezer for disgorging'],
    steps: ['After primary, add malolactic bacteria and hold at 18–22 °C until malic acid is converted (paper chromatography test).', 'Age on oak, tasting monthly; manage free SO₂.', 'For sparkling: ferment a dry base wine, add tirage sugar + yeast, bottle under crown caps, age on lees 9+ months.', 'Riddle (turn bottles neck-down daily), freeze the necks, disgorge, top up with dosage and cork.'],
    learn: 'The full craft of winemaking.', links: [['#/calc/sweeten', 'Sulphite & sorbate doses']] },
],
cider: [
  { name: 'Bottle cider (no kit)', time: '2 weeks', hands: '5 min', cost: '≈£3', abv: '≈6%',
    what: 'Yeast straight into a plastic bottle of apple juice with a loose cap or a balloon. The easiest alcohol you can make.',
    need: ['1.5–2 L apple juice in a plastic bottle (no preservatives)', 'Cider or wine yeast sachet', 'Balloon + pin, or just a loose cap'],
    steps: ['Pour off a mugful of juice.', 'Add ¼ sachet of yeast per litre; cap loosely.', 'Leave at room temperature 7–12 days until it stops fizzing.', 'Fridge 2–3 days, pour off the sediment, drink within a week.'],
    learn: 'What fermentation looks, smells and tastes like.', links: [['#/recipe/bottle-cider', 'Recipe'], ['#/calc/label', 'Label checker']] },
  { name: 'Demijohn cider from juice', time: '4–6 weeks', hands: '20 min', cost: '≈£20 setup, £5 per gallon', abv: '6–8%',
    what: 'Supermarket juice in a 4.5 L demijohn with an airlock. Cleaner, clearer, stronger if you like, and you can leave it to mature.',
    need: ['4.5 L apple juice', 'Demijohn, bung, airlock', 'Yeast + nutrient', 'Sanitiser, syphon, bottles'],
    steps: ['Pour the juice in, add nutrient and yeast, fit the airlock.', 'Ferment 1–3 weeks at 15–20 °C until it\'s dry and clearing.', 'Rack off the sediment and leave 2–4 weeks.', 'Bottle still.'],
    learn: 'Sanitising, racking, patience.', links: [['#/recipe/turbo-cider', 'Recipe'], ['#/calc/juice', 'Juice wizard']] },
  { name: 'Flavoured & sparkling cider', time: '6–8 weeks', hands: '1 hour', cost: '≈£10 per gallon', abv: '6–8%',
    what: 'Blend juices, add fruit, spices, hops or oak, then bottle-condition for fizz. This is where cider gets personal.',
    need: ['Hydrometer', 'Fruit, spices, dry hops or oak chips', 'Pressure-safe bottles', 'Priming sugar; erythritol for sweet'],
    steps: ['Ferment juice (plus fruit, honey or sugar) to dryness.', 'Add flavourings in secondary for a few days to 2 weeks, tasting as you go.', 'Prime with ≈6 g/L sugar (add a non-fermentable sweetener for sweet), then bottle.', 'Two weeks warm, then chill.'],
    learn: 'Blending, flavouring, carbonation.', links: [['#/recipe/apple-blackcurrant', 'Apple & blackcurrant'], ['#/calc/priming', 'Priming calculator']] },
  { name: 'Pressing your own apples', time: '2–6 months', hands: 'a full day', cost: '£50–£200 for crusher + press (or borrow)', abv: '5–8%',
    what: 'Real cider from real apples: foraged, from a garden, or from an orchard. Blend sweet, sharp and bittersweet varieties for depth and body that juice can\'t match.',
    need: ['20–25 kg apples per ~10–12 L of juice', 'Scratter/crusher (or a bucket + a fence post!) and a fruit press', 'Campden tablets, or a plan for wild yeast', 'Fermenters with airlocks'],
    steps: ['Wash the apples and cut out rot (a little bruising is fine).', 'Crush to a pulp, then press. Optional: let the pulp sit an hour first for more colour and flavour.', 'Measure gravity and acidity, and blend juices to balance.', 'Either sulphite (1 Campden per 4.5 L) and use cultured yeast, or let wild yeast ferment it cool (10–15 °C).', 'Ferment slowly, rack in late winter, bottle in spring.'],
    learn: 'Apple varieties, blending, wild fermentation.', links: [['#/guide/cider', 'Cider guide'], ['#/guide/yeast', 'Wild yeast']] },
  { name: 'Keeving & traditional-method cider', time: '6–12 months', hands: 'several days', cost: 'varies', abv: '3–8%',
    what: 'The French and West Country art of naturally sweet sparkling cider. Keeving starves the yeast by removing nutrients with a pectin "brown cap", so fermentation stops sweet. Or make champagne-method cider with riddling and disgorging.',
    need: ['Bittersweet apples, ideally late-season', 'Pectin methyl esterase enzyme + calcium chloride', 'Champagne bottles and crown caps', 'A cold place (under 10 °C)'],
    steps: ['Press, then treat the juice with enzyme and calcium.', 'Over 1–3 days a brown gel cap (chapeau brun) rises. Rack the clear juice from between the cap and sediment.', 'Ferment very slowly in the cold, racking to keep nutrients low, until ≈1.020.', 'Bottle at ≈1.020–1.025 so it finishes sweet and naturally sparkling. Use heavy bottles; monitor pressure.'],
    learn: 'Nutrient control, natural sweetness, advanced sparkling.', links: [['#/guide/bottling', 'Carbonation & bottle safety']] },
],
mead: [
  { name: 'Orange & spice beginner mead', time: '2–3 months', hands: '20 min', cost: '≈£10', abv: '≈12%',
    what: 'A famous forgiving beginner recipe: honey, an orange, a few raisins and spices, fermented with ordinary bread yeast. No nutrients or measuring needed.',
    need: ['1.5 kg honey', '1 orange, cut in eighths (peel on)', '25 raisins, 1 cinnamon stick, 1 clove', '1 tsp bread yeast', 'Demijohn + airlock'],
    steps: ['Dissolve the honey in warm water in the demijohn.', 'Add the orange, raisins and spices; top up with cool water to the shoulder.', 'Add the bread yeast, shake hard, fit the airlock.', 'Leave it alone for about 2 months until clear. The fruit drops when it\'s ready.', 'Syphon off and drink. It stays sweet because bread yeast gives up early.'],
    learn: 'That mead is easy. Patience.', links: [['#/guide/mead', 'Mead guide']] },
  { name: 'Quick cyser (apple + honey)', time: '2–4 months', hands: '30 min', cost: '≈£12', abv: '≈10%',
    what: 'Apple juice gives mead the acid and nutrients honey lacks, so it ferments quickly and cleanly.',
    need: ['4 L apple juice', '0.5 kg honey', 'Nutrient, wine yeast (71B)', 'Demijohn, hydrometer'],
    steps: ['Dissolve the honey in warm juice; combine; pitch.', 'Add nutrient over the first 3 days.', 'Rack when stable; sweeten with a little honey after stabilising if wanted.'],
    learn: 'Gravity, nutrients, stabilising.', links: [['#/recipe/quick-cyser', 'Recipe']] },
  { name: 'Traditional mead with staggered nutrients', time: '3–6 months', hands: '1 hour over a week', cost: '≈£15', abv: '12–14%',
    what: 'Just honey, water and good wine yeast, fed properly with a staggered nutrient schedule (TOSNA). Clean, drinkable in months instead of years.',
    need: ['1.5 kg honey per 4.5 L', 'Wine yeast (71B, D47) + Go-Ferm', 'Organic nutrient (Fermaid-O)', 'Hydrometer, scales'],
    steps: ['Mix the must to ≈1.100 and pitch rehydrated yeast.', 'Add nutrient at 24 h, 48 h, 72 h and the ⅓ sugar break; degas daily for a week.', 'Ferment at 16–20 °C, rack when stable, then again when clear.', 'Stabilise, back-sweeten with honey to taste, age 3+ months.'],
    learn: 'Yeast health, nutrient management.', links: [['#/recipe/trad-mead', 'Recipe'], ['#/calc/mead', 'Mead designer']] },
  { name: 'Melomels, metheglins & sack mead', time: '6–12 months', hands: 'a few hours', cost: '≈£20–£40', abv: '12–18%',
    what: 'Fruit meads (melomels), spiced meads (metheglins) and big sweet dessert "sack" meads. Balancing fruit, spice, acid, tannin and residual sugar is a real skill.',
    need: ['1–2 kg fruit per 4.5 L (in primary or secondary)', 'Spices, vanilla, oak', 'Acid blend & tannin for balance', 'High-tolerance yeast for sack mead (EC-1118, M05)'],
    steps: ['Ferment a base mead; add fruit in primary (more colour, less aroma) or secondary (brighter aroma).', 'Add spices sparingly in secondary and taste every few days; pull them early.', 'For sack: start at 1.130+ or step-feed honey until the yeast quits, leaving it sweet.', 'Balance with acid/tannin before bottling. Age 6–12 months.'],
    learn: 'Recipe balance, step feeding, ageing.', links: [['#/calc/mead', 'Mead designer'], ['#/calc/sweeten', 'Back-sweetening']] },
  { name: 'Bochet, braggot & show mead', time: '1–2 years', hands: 'a full day', cost: '≈£30+', abv: '10–16%',
    what: 'Expert styles. Bochet: honey caramelised in a pot (toffee, marshmallow, a real burn risk). Braggot: half beer, half mead, with a mash and hops. Show mead: a flawless traditional mead with nowhere for faults to hide.',
    need: ['Heavy stainless pot, long spoon, gloves (bochet)', 'Mashing gear and hops (braggot)', 'Top-quality varietal honey (show mead)', 'Excellent temperature control'],
    steps: ['Bochet: heat the honey slowly, stirring, until it darkens to the colour you want (30–90 min), then carefully add water. It spits violently.', 'Braggot: mash 2–3 kg malt, boil with a small hop charge, cool, then add honey and ferment with an ale or wine yeast.', 'Show mead: perfect nutrients, a cool ferment (16 °C), gentle racking, long ageing, no additions.', 'Age patiently; enter a competition!'],
    learn: 'Mastery of process and flavour.', links: [['#/guide/mead', 'Mead guide'], ['#/guide/beer-biab', 'Mashing (for braggot)']] },
],
other: [
  { name: 'Alcoholic ginger beer', time: '3–4 weeks', hands: '45 min', cost: '≈£6', abv: '≈6%',
    what: 'Fresh ginger, lemon and sugar with champagne yeast. Fiery, fun, supermarket ingredients.',
    need: ['Fresh ginger, lemons, sugar', 'Champagne yeast, nutrient', 'Fermenter + airlock', 'PET bottles'],
    steps: ['Simmer the ginger and lemon zest, then dissolve the sugar.', 'Cool, top up, pitch the yeast.', 'Ferment dry, then sweeten (non-fermentable) and prime for fizz.'],
    learn: 'Flavour extraction, sweet sparkling basics.', links: [['#/recipe/ginger-beer', 'Recipe']] },
  { name: 'Hard lemonade', time: '3–4 weeks', hands: '30 min', cost: '≈£5', abv: '5–7%',
    what: 'Lemon juice, sugar and water fermented with a tough yeast, then sweetened and carbonated: an alcoholic lemonade.',
    need: ['8–10 lemons per 4.5 L (juice + some zest)', '700 g sugar', 'EC-1118 + plenty of nutrient', 'Erythritol or sucralose, priming sugar'],
    steps: ['Dissolve the sugar in hot water, add the lemon juice and zest, top up to 4.5 L.', 'Add 1.5× the normal nutrient (lemon and sugar have no nitrogen), then pitch.', 'Ferment dry (acidic brews can be slow, so keep it warm).', 'Rack, sweeten with non-fermentable sweetener, prime and bottle.'],
    learn: 'Fermenting nutrient-poor, acidic bases.', links: [['#/calc/sweeten', 'Sweetening'], ['#/calc/priming', 'Priming']] },
  { name: 'Hard seltzer', time: '3–5 weeks', hands: '1 hour', cost: '≈£5 per 20 L', abv: '4–6%',
    what: 'A super-clean sugar base fermented to neutral, cleared until water-white, then flavoured and fizzy. It sounds easy but faults have nowhere to hide.',
    need: ['Dextrose', 'Lots of nutrient (DAP + organic), clean neutral yeast (EC-1118 or kveik)', 'Finings, ideally a keg + CO₂', 'Natural flavourings or fruit purée'],
    steps: ['Dissolve the dextrose to ≈1.040 and add nutrients (more than you\'d think).', 'Ferment warm and fast; add nutrients again on days 2–3.', 'Fine it heavily until crystal clear.', 'Flavour, force-carbonate high (3+ vols) and serve very cold.'],
    learn: 'Yeast nutrition, clarity, carbonation.', links: [['#/calc/keg', 'Keg pressure']] },
  { name: 'Ginger beer plant & natural ferments', time: '1–2 months', hands: 'ongoing', cost: '≈£5', abv: '1–6%',
    what: 'Traditional living cultures (a ginger "bug" or a true ginger beer plant) and wild-fermented sodas you keep alive and feed. Variable and fascinating.',
    need: ['Fresh ginger, sugar, water', 'Jar + cloth, a strainer', 'PET bottles (pressure monitoring essential)'],
    steps: ['Start a ginger bug: 1 tbsp grated ginger + 1 tbsp sugar in 250 ml water; feed daily until bubbly (3–7 days).', 'Add some bug to sweetened ginger tea and ferment under an airlock for a stronger alcoholic version.', 'Bottle with caution: wild cultures are unpredictable, so use PET and check firmness daily.'],
    learn: 'Wild cultures and their risks.', links: [['#/guide/yeast', 'Wild fermentation']] },
  { name: 'Sake-style rice wine', time: '2–3 months', hands: 'many sessions', cost: '≈£20–£40', abv: '14–18%',
    what: 'Rice can\'t ferment by itself: koji mould (Aspergillus oryzae) turns its starch to sugar while yeast ferments it, both at once. A genuine expert project.',
    need: ['Polished sushi rice', 'Koji rice (bought ready-made)', 'Sake or wine yeast, lactic acid', 'Steamer, cold space (10–15 °C), press or cloth'],
    steps: ['Make a yeast starter (moto) with koji, steamed rice, water, lactic acid and yeast.', 'Build the main mash in three additions over four days (sandan shikomi).', 'Ferment cold for 3–4 weeks.', 'Press, settle, rack and pasteurise or keep refrigerated.'],
    learn: 'Parallel saccharification and fermentation.', links: [['#/guide/yeast', 'Yeast guide']] },
],
};
// Shop-juice ladder comes from the juice levels
window.Paths.juice = Data.levels.map(l => ({ name: l.name, time: l.time, hands: l.n === 1 ? '5 min' : l.n < 4 ? '30 min' : '1–2 hours', cost: l.cost, abv: '5–14%',
  what: l.what, need: l.gear, steps: null, learn: l.learn, links: [['#/calc/juice?lvl=' + l.n, 'Plan it in the juice wizard'], ['#/guide/juice', 'Juice guide']] }));

/* ---------- Ladder component ---------- */
function ladder(el, drink) {
  const P = Paths[drink]; if (!P) return;
  const done = store.get('ladder', {});
  let sel = store.get('ladder.sel.' + drink, 0);
  const draw = () => {
    const n = P.filter((_, i) => done[drink + i]).length;
    const p = P[sel], tc = TIERS[sel].c;
    el.innerHTML = `
    <div class="ladder-top"><div class="ladder-prog"><div style="width:${n / P.length * 100}%"></div></div><span class="note">${n}/${P.length} done</span></div>
    <div class="rungs">${P.map((x, i) => `<button class="rung ${i === sel ? 'on' : ''} ${done[drink + i] ? 'done' : ''}" data-r="${i}" style="--t:${TIERS[i].c}"><span class="tn">${done[drink + i] ? '✓ ' : ''}${TIERS[i].name}</span><span class="rn">${x.name}</span></button>`).join('')}</div>
    <div class="panel rung-body fade-in" style="border-color:color-mix(in srgb, ${tc} 45%, transparent)">
      <div class="meta" style="margin:0 0 10px"><span class="pill c" style="--c:${tc}">${TIERS[sel].name}</span><span class="pill">⏱ ${p.time}</span><span class="pill">✋ ${p.hands} hands-on</span><span class="pill">💷 ${p.cost}</span><span class="pill">🍸 ${p.abv}</span></div>
      <h3 style="margin:0 0 8px;font-size:22px;color:var(--text)">${p.name}</h3>
      <p class="prose" style="margin:0 0 14px">${p.what}</p>
      <div class="grid two" style="gap:16px">
        <div><div class="eyebrow" style="color:${tc};margin-bottom:8px">You need</div><ul class="ticks">${p.need.map(x => `<li>${x}</li>`).join('')}</ul></div>
        ${p.steps ? `<div><div class="eyebrow" style="color:${tc};margin-bottom:8px">How</div><ol class="mini-steps">${p.steps.map(x => `<li>${x}</li>`).join('')}</ol></div>` : `<div><div class="eyebrow" style="color:${tc};margin-bottom:8px">How</div><p class="note">The juice wizard builds a full dated plan, shopping list and checklist for this level.</p></div>`}
      </div>
      <p class="note" style="margin-top:12px"><b>You'll learn:</b> ${p.learn}</p>
      <div class="btns">${p.links.map(([h, l], i) => `<a class="btn ${i === 0 ? 'pri' : ''} sm" href="${h}">${l}</a>`).join('')}
        <button class="btn sm ${done[drink + sel] ? '' : 'ghost'}" data-done="1">${done[drink + sel] ? '✓ Done (undo)' : 'Mark as done'}</button></div>
      <div class="btns" style="justify-content:space-between">${sel > 0 ? `<button class="btn sm ghost" data-r="${sel - 1}">← ${TIERS[sel - 1].name}</button>` : '<span></span>'}${sel < P.length - 1 ? `<button class="btn sm ghost" data-r="${sel + 1}">${TIERS[sel + 1].name} →</button>` : ''}</div>
    </div>`;
  };
  el.addEventListener('click', e => {
    const r = e.target.closest('[data-r]');
    if (r) { sel = +r.dataset.r; store.set('ladder.sel.' + drink, sel); draw(); return; }
    if (e.target.closest('[data-done]')) { done[drink + sel] = !done[drink + sel]; store.set('ladder', done); draw(); if (done[drink + sel]) toast(`${TIERS[sel].name} ${DRINK[drink].name.toLowerCase()} done! 🎉`); }
  });
  draw();
}

function pagePaths(el) {
  const order = ['juice', 'cider', 'beer', 'wine', 'mead', 'other', 'bread', 'potato', 'rice', 'grain', 'misc', 'wild'];
  el.innerHTML = `<div class="eyebrow">Level up</div><h1>Skill ladders</h1>
    <p class="lead">Every drink has several ways to make it, from super easy to expert. Start at the bottom, tick off each rung and work your way up. Progress is saved on this device.</p>
    <div class="tier-key">${TIERS.map(t => `<span class="pill c" style="--c:${t.c}">${t.name}</span>`).join('')}</div>
    ${order.map(k => `<div class="section-h"><h2>${DRINK[k].em} ${DRINK[k].name}</h2><a href="${k === 'juice' ? '#/juice' : '#/drink/' + k}">All ${DRINK[k].name.toLowerCase()} →</a></div><div data-ladder="${k}"></div>`).join('')}`;
  $$('[data-ladder]', el).forEach(d => ladder(d, d.dataset.ladder));
}
