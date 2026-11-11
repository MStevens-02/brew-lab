/* Brew Lab — off-grid & survival brewing: no shops, no internet. Wild yeast, foraged sugar, home-made kit,
   maximum strength by fermentation, vinegar, and an honest note on distilling. */
DRINK.wild = { c: '#6fae5b', em: '🏕️', name: 'Off-grid & survival' };

Paths.wild = [
  { name: 'Wild-fruit wine (no shop at all)', time: '2–6 months', hands: '1 hour', cost: '£0', abv: '4–10%',
    what: 'Crush ripe foraged fruit, add water (and honey if you have it), cover with a cloth and let the wild yeast on the skins do the work. This is how wine was made for thousands of years.',
    need: ['Ripe fruit: blackberries, apples, elderberries, plums, rosehips…', 'A clean crock, bucket, glass jar or barrel', 'A cloth and string', 'Boiled water (cooled)', 'Honey or more fruit for extra strength (optional)'],
    steps: ['Pick ripe, unwashed fruit (the bloom on the skin carries yeast); remove leaves, stalks and anything mouldy.', 'Crush it in a scalded vessel and add an equal volume of boiled-then-cooled water.', 'Cover with a cloth; stir twice a day. Within 1–4 days it should foam and smell fruity-yeasty.', 'After ~7 days strain off the fruit into a narrow-necked vessel, fill it nearly full, and seal it with a water lock or a cloth over a tight bung of moss.', 'Leave it until it stops working and clears. Siphon off the sediment with a tube or carefully pour. Drink young or store cool.'],
    learn: 'Wild fermentation, cleanliness without chemicals.', links: [['#/recipe/wild-fruit-wine', 'Recipe'], ['#/guide/survival', 'Survival guide']] },
  { name: 'Wild mead & sap wine', time: '2–6 months', hands: '1 hour', cost: '£0 (with honey or trees)', abv: '8–14%',
    what: 'Honey is the easiest, strongest sugar in nature. If you keep bees, find wild honey or tap birch/maple/sycamore in early spring, you can make mead or sap wine with a home-grown yeast starter.',
    need: ['Honey (about 1 part honey to 3–4 parts water) or fresh tree sap', 'A wild yeast starter (see Medium) or a handful of crushed fruit/raisins', 'Clean vessel with a water lock', 'Pollen, raisins or a few boiled, dead yeast lees as "nutrient"'],
    steps: ['Dissolve the honey in warm, boiled water (or boil the sap down by about half to concentrate it).', 'Cool to blood-warm, then add your active starter and a pinch of pollen or a few crushed raisins for yeast food.', 'Seal with a water lock; keep somewhere steady and cool-ish.', 'Stir or swirl daily for the first week to release gas.', 'Rack off the sediment when it clears; age it as long as you can.'],
    learn: 'Natural sugar sources and seasons.', links: [['#/guide/mead', 'Mead guide'], ['#/recipe/birch-wine', 'Birch sap wine']] },
  { name: 'Catch & keep your own yeast', time: '3–7 days, then forever', hands: 'minutes a day', cost: '£0', abv: '—',
    what: 'Without shops, yeast is the one thing you must never lose. Capture it from fruit skins, flowers or honey water, keep it alive by feeding it, and dry it for storage like Norse brewers did with their yeast rings and logs.',
    need: ['A small jar, cloth, boiled water', 'Fruit skins, crushed berries, dandelion/elderflower heads, or honey', 'Clean cloth, wood or a straw ring for drying yeast'],
    steps: ['Make a weak sugar water (a spoon of honey in a cup of boiled, cooled water). Add a few unwashed berries or fruit skins.', 'Cover with cloth; shake daily. When it fizzes and smells pleasant (bready, fruity, not rotten), it\'s a starter.', 'Feed it a little sugar water every couple of days, or use it to start a brew.', 'Save the creamy sediment (lees) from every good batch; keep the best in a cool place.', 'To store long-term, paint thick sediment onto a clean cloth, wooden stick or straw ring and let it dry in the shade. Crumble a piece into the next brew.'],
    learn: 'Culturing and selecting your own yeast strain.', links: [['#/recipe/wild-yeast-starter', 'Starter recipe'], ['#/guide/yeast', 'Yeast guide']] },
  { name: 'Grow, malt & brew grain', time: 'a season + 4 weeks', hands: 'many days', cost: 'seed grain + effort', abv: '3–6%',
    what: 'The full off-grid beer: grow barley (or oats/wheat), malt it by sprouting and drying, crush it, mash it in hot water, flavour it with wild herbs instead of hops (gruit), and ferment with your own yeast.',
    need: ['Barley or other grain (grown or stored)', 'Trays/cloths for sprouting, a warm dry place or low fire to dry the malt', 'Quern, rocks or a rolling pin to crack it', 'A big pot (or wooden tub + fire-heated stones)', 'Wild hops, or gruit herbs: yarrow, bog myrtle (sweet gale), heather tips, ground ivy'],
    steps: ['Soak the grain a day or two until it sprouts a little root ("chits"); spread it out and keep it damp and turned for 4–5 days.', 'Dry it slowly by a low fire or in the sun: that\'s malt. Rub off the rootlets.', 'Crack it, then soak it in hot (not boiling) water for an hour or two. Without a pot, heat stones in a fire and drop them into a wooden tub ("stone brewing").', 'Strain off the sweet liquid (wort), boil it with hops or herbs if you can, cool it and add your yeast.', 'Ferment a week or two and drink fresh. Old-style ale didn\'t keep long.'],
    learn: 'The whole chain, from field to glass.', links: [['#/drink/grain', 'Malting your own grain'], ['#/guide/starch', 'Starch & enzymes']] },
  { name: 'Maximum strength, no still', time: '6–12 months', hands: 'days', cost: '£0 with honey or dried fruit', abv: '14–18%',
    what: 'The strongest you can get by fermentation alone. Feed sugar in stages to a vigorous, well-fed yeast you\'ve selected over many batches, then age it. Old "sack" meads and fortified-style country wines reached this, and it keeps for years.',
    need: ['A strong, proven yeast saved from your best high-strength batch', 'Plenty of honey, dried fruit or sap syrup', 'Nutrient: raisins, pollen, boiled dead yeast', 'A vessel you can top up and seal'],
    steps: ['Start a normal-strength honey or fruit ferment with an active starter.', 'When it slows, add more honey (a little at a time) so the yeast never sees too much sugar at once ("step-feeding").', 'Keep feeding every few days until it stops eating. That\'s the yeast\'s alcohol limit.', 'Let it settle, rack it, top up to exclude air, and age it cool for months.', 'Save the sediment: that yeast is now your strongest strain.'],
    learn: 'Pushing yeast to its limits, long storage.', links: [['#/guide/survival', 'Why not distil? (survival guide)'], ['#/calc/mead', 'Mead designer']] },
];

Recipes.push(
{ id: 'wild-fruit-wine', name: 'Wild-yeast hedgerow wine (no shop)', drink: 'wild', baseL: 4.5, level: 1, time: '2–6 months', abv: '≈5–10%',
  desc: 'Made with nothing you can\'t forage: fruit, water and the wild yeast on the skins, plus honey if you have it.',
  ingredients: [{ q: 2.5, u: 'kg', n: 'Ripe foraged fruit (blackberries, apples, elderberries, plums), unwashed' }, { q: 3, u: 'L', n: 'Water, boiled and cooled' }, { q: 0.75, u: 'kg', n: 'Honey (optional, for ~10%; without it expect ~4–6%)' }, { q: 1, u: 'handful', n: 'Raisins or dried fruit (yeast food, optional)' }],
  steps: ['Scald your vessel and tools with boiling water. Let them cool.', 'Remove stalks, leaves and any mouldy fruit. Crush the fruit by hand or with a clean wooden pole.', 'Add the cooled boiled water (and honey dissolved in a little warm water). Cover with a cloth tied tight against flies.', 'Stir twice a day. It should start foaming within 1–4 days and smell fruity and yeasty. A vinegary or rotten smell means it\'s gone wrong.', 'After about a week, strain through a cloth into a narrow-necked vessel, filling it nearly to the top.', 'Seal with a water lock (a tube into a cup of water) or a clean cloth bound tight; check daily.', 'When bubbling stops and it clears (weeks to months), siphon or pour it off the sediment into clean bottles or a jar. Keep it cool and full.'] },
{ id: 'wild-yeast-starter', name: 'Wild yeast starter (catch your own)', drink: 'wild', baseL: 0.3, level: 1, time: '3–7 days',
  desc: 'Capture wild yeast from fruit, flowers or honey and keep it going indefinitely: the most important skill when you can\'t buy yeast.',
  ingredients: [{ q: 250, u: 'ml', n: 'Boiled, cooled water' }, { q: 1, u: 'tbsp', n: 'Honey or sugar (or crushed sweet fruit)' }, { q: 1, u: 'handful', n: 'Unwashed berries, grape/apple skins, or dandelion/elderflower heads' }],
  steps: ['Put everything in a clean jar, leaving room at the top. Cover with a cloth.', 'Shake or stir twice a day and keep it somewhere room-warm.', 'In 2–5 days it should fizz and smell pleasant: bready, winey or fruity. If it smells rotten, cheesy or grows fuzz, throw it out and try different fruit.', 'Strain out the solids and feed it a spoon of honey in a little water every 2–3 days to keep it alive.', 'Use about a cupful to start 4–5 L of brew. Always keep some back.', 'To store it dry: let the creamy sediment settle, spread it thinly on a clean cloth, stick or straw ring, and dry it in the shade. A crumbled piece will restart a brew months later.'] },
);
Object.assign(META, {
  'wild-fruit-wine': { gear: 0, weeks: 12, taste: ['wine', 'fruity'] },
  'wild-yeast-starter': { gear: 0, weeks: 1, taste: [] },
});

Guides.push({ id: 'survival', title: 'Off-grid & survival brewing: no shops, no internet', drink: 'wild', mins: 15, level: 'Survival',
  summary: 'How people made alcohol before shops existed: wild yeast, foraged sugar, home-made vessels and airlocks, measuring without a hydrometer, maximum strength, vinegar, and the truth about distilling.',
  html: `
<p>Imagine no shops and no internet: no yeast sachets, no sanitiser, no hydrometer. People brewed like this for about 9,000 years, so it absolutely works. You just need the right sugar, yeast you can catch and keep, clean vessels, and patience. This guide is written for that situation, and it's also a brilliant way to brew for free from hedgerows today.</p>
${calc('juice', 'Back in the modern world? The juice wizard is easier')}

<h3>1. Why you'd bother</h3>
<ul><li><b>Calories & morale.</b> A pint of ale has roughly 180–250 kcal, and a shared drink matters to people.</li>
<li><b>Preserving.</b> Fruit that would rot becomes wine that keeps for months or years, and wine becomes <b>vinegar</b>, which pickles and preserves food (see section 9).</li>
<li><b>Trade.</b> Historically, ale, cider and spirit were currency.</li>
<li><b>Water.</b> Boiling water for brewing makes it safer; old ale was boiled. Remember, though: <b>boiled water is the safe drink</b>. Alcohol is not a substitute for water and dehydrates you.</li></ul>
${warn('Alcohol at fermented strengths (under ~20%) is <b>not</b> strong enough to disinfect wounds or sterilise tools reliably. That needs ~60–70%+. For cleaning and sanitising off-grid, rely on <b>boiling water</b>, heat and sunlight.')}

<h3>2. Sugar: where to find it, season by season (UK)</h3>
<table class="tbl"><tr><th>Season</th><th>Sugar source</th><th>Notes</th></tr>
<tr><td>🌱 Late Feb–Mar</td><td>Birch, sycamore or maple <b>sap</b></td><td>Only ~1–2% sugar, so boil it down to concentrate it. One tap per mature tree, with permission; plug the hole after.</td></tr>
<tr><td>🌸 May–Jun</td><td>Elderflower, gorse, dandelion, hawthorn blossom</td><td>Flavour, not sugar: add honey or fruit.</td></tr>
<tr><td>☀️ Summer</td><td><b>Honey</b>, wild strawberries, raspberries, bilberries</td><td>Honey is the strongest natural sugar (~80%) and it keeps forever.</td></tr>
<tr><td>🍂 Aug–Oct</td><td><b>Apples</b>, blackberries, elderberries, plums, damsons, sloes, rowan, rosehips, crab apples, pears</td><td>The great brewing season. Apples alone make cider (about 5–7%).</td></tr>
<tr><td>❄️ Winter</td><td>Stored honey, <b>dried fruit</b>, stored grain (malt it), roots (parsnip, beet, carrot)</td><td>Dry fruit in autumn specifically for winter brewing.</td></tr></table>
<p><b>Rule of thumb:</b> roughly <b>17 g of sugar per litre gives about 1% alcohol</b>. Ripe fruit juice is 8–15% sugar (5–8% ABV); honey water at 1 part honey to 3 parts water ferments to about 12–14%.</p>
${warn('<b>Only use plants you can identify with 100% certainty.</b> Deadly look-alikes exist (hemlock vs cow parsley and elderflower; yew; cherry laurel; foxglove). Never use: yew (any part), rhubarb leaves, elder stalks/leaves/unripe berries, green or sprouting potatoes, or grain with dark ergot growths (especially rye).')}

<h3>3. Yeast: catch it, keep it, never lose it</h3>
<ul><li><b>Where it lives:</b> the dusty bloom on grapes, plums, sloes and apples; flowers; honey; tree sap; and the air of a brewing room.</li>
<li><b>Catch it:</b> a weak honey or fruit water with unwashed fruit skins, covered with cloth and shaken daily, becomes fizzy and pleasant-smelling in a few days. <a href="#/recipe/wild-yeast-starter">Starter recipe →</a></li>
<li><b>Keep it alive:</b> feed it a little sugar water every few days, or simply keep a jar of the sediment (lees) from your last good brew somewhere cool.</li>
<li><b>Store it dry, the Norse way:</b> Scandinavian farmhouse brewers dried yeast on carved wooden "yeast logs", straw rings or cloths and hung them up between brews; Norwegian kveik yeast survived centuries this way. Smear thick, creamy sediment on clean wood or cloth and dry it in the shade.</li>
<li><b>Select the best:</b> always save yeast from the batch that tasted best and fermented strongest. Over many generations you breed your own house strain.</li>
<li>Bread yeast and sourdough starter both work in a pinch.</li></ul>

<h3>4. Vessels, airlocks & tools from scratch</h3>
<table class="tbl"><tr><th>Need</th><th>Off-grid options</th><th>Avoid</th></tr>
<tr><td>Fermenter</td><td>Glazed stoneware crock, glass jars/bottles, wooden barrel or tub, food-grade bucket, a well-cleaned dried gourd</td><td><b>Lead-glazed or unknown old pottery</b> (acid leaches lead), aluminium, galvanised metal, bins that held chemicals</td></tr>
<tr><td>Airlock</td><td>A tube from the lid into a cup of water; a cloth bound tight; a balloon or a bladder pricked with a pin; a lid resting loosely</td><td>Sealing tight while it's fermenting (it will burst)</td></tr>
<tr><td>Siphon</td><td>Any flexible tube; a hollow plant stem (e.g. elder with the pith pushed out, cleaned and boiled); or just careful pouring</td><td></td></tr>
<tr><td>Strainer</td><td>Clean cloth, sacking, a basket lined with grass or straw (scalded)</td><td></td></tr>
<tr><td>Heat</td><td>Fire, a stove, or <b>stone brewing</b>: heat clean river stones in a fire and drop them into the liquid</td><td>Stones from rivers can crack and explode in fire; use dry stones and stand back</td></tr></table>
<p><b>Cleaning without chemicals:</b> scrub with hot water and sand or ash, then scald with boiling water and let things dry in the sun (UV helps). Wood ash in water makes a mild lye cleaner; rinse it off well. Keep everything covered from flies.</p>

<h3>5. Measuring without a hydrometer</h3>
<ul><li><b>The egg test</b> (from old mead and wine recipes): add honey or sugar until a fresh egg floats with a patch about the size of a coin showing. That's roughly the right sweetness for a strong wine (very approximate; eggs vary).</li>
<li><b>Taste:</b> sweet at the start; when it tastes <b>dry</b> (no sweetness left) and has stopped fizzing, it's finished.</li>
<li><b>Watch it:</b> bubbles in the water lock slow down and stop; the liquid clears from the top down; sediment settles.</li>
<li><b>Count sugar:</b> if you know roughly how much honey or sugar went in, 17 g/L ≈ 1% gives you a fair estimate.</li></ul>

<h3>6. Recipes that need nothing from a shop</h3>
<ul><li><b>Wild hedgerow wine</b>: crushed fruit + water (+ honey). <a href="#/recipe/wild-fruit-wine">Recipe</a></li>
<li><b>Cider</b>: crush and press apples (a clean cloth, a board and heavy stones work), let the wild yeast go, seal under a water lock.</li>
<li><b>Mead</b>: 1 part honey, 3–4 parts boiled water, a cup of starter, a few raisins or a pinch of pollen.</li>
<li><b>Sap wine</b>: boil down birch or maple sap, add honey or dried fruit, ferment.</li>
<li><b>Kvass</b>: stale (or home-baked) dark bread soaked in hot water, plus a little honey and starter. Low alcohol, but fast and nourishing. <a href="#/drink/bread">Bread ladder</a></li>
<li><b>Gruit ale</b>: home-malted grain flavoured with yarrow, bog myrtle or heather instead of hops. <a href="#/drink/wild">See the ladder</a></li></ul>

<h3>7. How strong can you get without distilling?</h3>
<p>Yeast eventually poisons itself with alcohol. Wild yeasts usually stop at <b>6–12%</b>. Selected, well-fed, step-fed yeast can reach <b>14–18%</b>, as strong as sherry, and this is the realistic maximum without a still.</p>
<ol class="steps"><li><b>Use the strongest yeast you have</b>, saved from your best high-strength batch.</li>
<li><b>Feed it nutrients</b>: raisins, a pinch of pollen, or a spoon of boiled (dead) yeast sediment. Honey especially needs this.</li>
<li><b>Step-feed the sugar</b>: start at normal strength, then add more honey or syrup a little at a time each time it slows, rather than all at once. Too much sugar at the start stalls yeast.</li>
<li><b>Keep it steady and cool</b> (15–20 °C) and swirl it daily in the first weeks.</li>
<li><b>Age it</b> sealed and topped up. Strong ferments need months, but they keep for years.</li></ol>
<p><b>Freeze concentration ("jacking"):</b> historically, colonial Americans left cider outside in freezing winters and removed the ice to make stronger "applejack". It concentrates the alcohol, but it <b>also concentrates everything else</b>, including the methanol and harsh fusel alcohols that distillers would separate out (the "applejack headache"). Legally, intentionally concentrating alcohol is generally treated like distilling in the UK. It's a piece of history rather than something we recommend.</p>

<h3>8. What about distilling?</h3>
<p>Distilling separates and concentrates alcohol up to spirit strength. It was how survival-era farmers turned surplus grain into something portable, tradeable and long-lasting. But in a real off-grid situation:</p>
<ul><li><b>It costs a lot of fuel</b>: wood or gas you'd need for cooking, boiling water and warmth.</li>
<li><b>It shrinks your drink</b>: 20 L of wine yields only a few litres of spirit, and you lose all the calories in the leftovers.</li>
<li><b>Improvised stills are genuinely dangerous</b>: blocked pipes cause explosions, alcohol vapour catches fire, and improvised metal parts (old radiators, solder, galvanised pipe) poison the spirit with lead and zinc. Without skill, the result can contain harmful fractions.</li>
<li><b>Legally</b> it needs an HMRC licence in the UK; in New Zealand hobby distilling for your own use is legal.</li></ul>
<p>If you're licensed or in New Zealand and want to learn properly, use a dedicated distilling course or book written for legal hobby distillers, with purpose-built equipment. Brew Lab doesn't teach still-building or running. Read the <a href="#/guide/distilling-history">history of distilling</a> for how the old pot stills worked.</p>

<h3>9. Turn it into vinegar (a survival superpower)</h3>
<p>Leave wine or cider open to the air under a cloth, add a splash of unpasteurised vinegar or the "mother" (a jelly-like skin) if you have it, and keep it warm (20–30 °C). In 3–6 weeks acetic bacteria turn the alcohol into <b>vinegar</b>. It pickles vegetables, preserves food through winter, cleans surfaces and makes food safer. Keep vinegar <b>well away</b> from your brewing gear and yeast, or everything will turn sour.</p>

<h3>10. Off-grid safety checklist</h3>
<ul class="ticks"><li>Scald everything with boiling water; cover brews from flies and animals.</li>
<li>Throw away anything fuzzy-mouldy, slimy-ropey or rotten-smelling while young and weak.</li>
<li>Never seal a vessel tight while it's still fermenting.</li>
<li>Ventilate small spaces: fermenting brews give off CO₂, which can suffocate in cellars or pits.</li>
<li>100% plant identification, or don't use it.</li>
<li>Drink water first. Alcohol adds calories, not hydration.</li></ul>
${tip('Start practising now: a wild-yeast hedgerow wine this autumn and a jar of starter you keep alive are the two skills that matter most. When the shops are open, you\'ll just have better wine.')}`,
});
