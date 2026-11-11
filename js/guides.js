/* Brew Lab — long-form guides. HTML strings; links use the app's hash routes. */
const tip = (t) => `<div class="callout tip"><b>Tip</b><div>${t}</div></div>`;
const warn = (t) => `<div class="callout warn"><b>Careful</b><div>${t}</div></div>`;
const calc = (id, label) => `<a class="calc-link" href="#/calc/${id}">${label} →</a>`;

window.Guides = [
{
  id: 'basics', title: 'How fermentation works', drink: 'all', mins: 6, level: 'Start here',
  summary: 'Yeast, sugar, gravity and why your hydrometer is the most important tool you own.',
  html: `
<p>Every drink in this app is made the same way: you give yeast a sugary liquid, and it turns the sugar into <b>alcohol</b> and <b>carbon dioxide</b>. Beer gets its sugar from malted barley, wine from grapes or fruit, cider from apples and mead from honey. Everything else is detail.</p>
<h3>The four stages</h3>
<ol class="steps">
<li><b>Lag phase (0–24 h).</b> The yeast wakes up, takes in oxygen and builds up its cell walls. Nothing seems to happen yet.</li>
<li><b>Growth / active fermentation (1–7 days).</b> The yeast multiplies and eats sugar quickly. You get foam (<i>krausen</i>), a busy airlock and heat. Most of the flavour, good and bad, is decided now, so <b>temperature control matters most in these days</b>.</li>
<li><b>Slowdown (1–3 weeks).</b> Sugar runs low. The yeast cleans up by-products such as diacetyl (butter) and acetaldehyde (green apple).</li>
<li><b>Settling / conditioning.</b> The yeast drops to the bottom (<i>lees</i> or <i>trub</i>) and the drink clears. Wine and mead keep improving in this stage for months.</li>
</ol>
<h3>Gravity: how you measure sugar</h3>
<p>Sugar makes liquid denser than water. A <b>hydrometer</b> measures that density as <b>specific gravity (SG)</b>. Water is 1.000. A wort or must with lots of sugar might be 1.050 or 1.100.</p>
<ul>
<li><b>Original gravity (OG)</b>: reading before fermentation.</li>
<li><b>Final gravity (FG)</b>: reading when fermentation has finished. Alcohol is lighter than water, so a fully dry wine can read below 1.000 (e.g. 0.995).</li>
<li>The drop between the two tells you how much sugar became alcohol: <code>ABV ≈ (OG − FG) × 131.25</code>.</li>
</ul>
${calc('abv', 'ABV calculator')}
${tip('Fermentation is finished when the gravity stays the <b>same for 3 days in a row</b>, not when the airlock stops bubbling. An airlock can go quiet with sugar still left, and it can bubble from temperature changes when there is none.')}
<h3>What decides how strong it gets?</h3>
<p>Two things: <b>how much sugar</b> you start with, and the <b>yeast's alcohol tolerance</b>. Beer yeast usually stops around 8–12%. Wine and champagne yeasts can reach 14–18%. If you start with more sugar than the yeast can handle, it gives up and leaves the rest as sweetness. Mead makers use this on purpose.</p>
${calc('mead', 'See it in the mead calculator')}
<h3>Temperature</h3>
<p>Every yeast has a comfortable range. Too cold and it goes sluggish or stops. Too warm and it makes harsh "fusel" alcohols and solvent flavours. As a rule of thumb, ales like 18–20 °C, lagers 10–13 °C, and wine and cider 16–22 °C. Remember that <b>a fermenter runs a few degrees warmer than the room</b> during active fermentation.</p>
<h3>What should I make first?</h3>
<table class="tbl">
<tr><th>Option</th><th>Effort</th><th>Ready in</th><th>Why</th></tr>
<tr><td><a href="#/recipe/turbo-cider">Shop-juice cider</a></td><td>★☆☆</td><td>4–6 weeks</td><td>Cheapest and easiest. You learn the basics with almost nothing to go wrong.</td></tr>
<tr><td><a href="#/guide/beer-kit">Beer from a kit</a></td><td>★☆☆</td><td>4–6 weeks</td><td>Tastes properly like beer and teaches bottling and carbonation.</td></tr>
<tr><td><a href="#/recipe/ginger-beer">Alcoholic ginger beer</a></td><td>★☆☆</td><td>3–4 weeks</td><td>Fast and fun, made with supermarket ingredients.</td></tr>
<tr><td><a href="#/recipe/trad-mead">Traditional mead</a></td><td>★★☆</td><td>3–12 months</td><td>Few ingredients, but patience pays.</td></tr>
<tr><td><a href="#/guide/beer-biab">All-grain beer (BIAB)</a></td><td>★★★</td><td>4–8 weeks</td><td>Full control over the recipe. A brew day takes about 5 hours.</td></tr>
</table>`
},
{
  id: 'equipment', title: 'Equipment', drink: 'all', mins: 5, level: 'Start here',
  summary: 'What you actually need, what is nice to have, and what to skip.',
  html: `
<h3>Core kit (every drink)</h3>
<table class="tbl">
<tr><th>Item</th><th>What it's for</th><th>Approx. UK cost</th></tr>
<tr><td>Fermenter</td><td>A 4.5 L glass <b>demijohn</b> (1 gallon) for wine, cider and mead trials, or a 25–30 L plastic bucket with lid for beer and big batches</td><td>£8–£25</td></tr>
<tr><td>Airlock + bung / grommet</td><td>Lets CO₂ out and keeps air and bugs out. Fill it with sanitiser or cooled boiled water.</td><td>£2–£4</td></tr>
<tr><td>Hydrometer + trial jar</td><td>Measures gravity. <b>Not optional.</b></td><td>£6–£10</td></tr>
<tr><td>Thermometer</td><td>Stick-on strip for the fermenter, plus a probe for brew day</td><td>£3–£12</td></tr>
<tr><td>No-rinse sanitiser</td><td>Star San, Chemsan, or similar</td><td>£8–£15</td></tr>
<tr><td>Cleaner</td><td>Unscented oxygen cleaner (PBW-style or VWP)</td><td>£5–£10</td></tr>
<tr><td>Syphon tube / auto-syphon</td><td>For racking (moving liquid off the sediment) and bottling</td><td>£5–£15</td></tr>
<tr><td>Bottling wand</td><td>Spring-tipped filler that fills from the bottom up with little splashing</td><td>£3–£5</td></tr>
<tr><td>Bottles + caps/capper</td><td>Re-used beer bottles with crown caps, or swing-tops. Wine needs corks + corker or screw caps.</td><td>£10–£30</td></tr>
<tr><td>Long spoon</td><td>Plastic or stainless steel</td><td>£3</td></tr>
</table>
<h3>Beer extras</h3>
<ul>
<li><b>Big stock pot</b>, 30 L or larger for full-volume BIAB. 15–20 L works for extract or "small batch" brewing.</li>
<li><b>Grain bag</b> (BIAB): a fine mesh bag that fits your pot.</li>
<li><b>Heat source</b>: a hob that can boil 25 L (most can't do it well), a gas burner used outdoors, or an all-in-one electric system.</li>
<li><b>Wort chiller</b>: an immersion coil, or an ice bath in the sink for small batches. "No-chill" in a sealed cube also works.</li>
<li><b>Digital scales</b> to 0.1 g for hops.</li>
</ul>
<h3>Wine, cider and mead extras</h3>
<ul>
<li>Several demijohns, so you can rack from one into another.</li>
<li>Pectolase (pectic enzyme), Campden tablets, potassium sorbate, yeast nutrient, wine tannin, citric/malic acid.</li>
<li>Finings (e.g. a two-part kieselsol/chitosan pack) if you're impatient for clarity.</li>
<li>A fruit press or straining bag for real fruit.</li>
</ul>
<h3>Nice upgrades (in rough order of value)</h3>
<ol>
<li><b>Temperature control</b>: a heat belt or pad with a thermostat (e.g. an Inkbird). This is the single biggest jump in quality.</li>
<li><b>Refractometer</b>: reads gravity from a couple of drops.</li>
<li>A <b>second fermenter</b>, so you can brew again while one batch is conditioning.</li>
<li><b>Kegging</b>: a Cornelius keg, CO₂ and a fridge. No more washing 40 bottles.</li>
<li>A <b>digital hydrometer</b> (e.g. a Tilt or iSpindel) that logs gravity to your phone.</li>
</ol>
${tip('UK homebrew shops sell "starter kits" with a bucket, airlock, hydrometer, syphon, sanitiser and a beer kit for around £50–£70. That is usually cheaper than buying the items separately.')}`
},
{
  id: 'sanitation', title: 'Cleaning & sanitising', drink: 'all', mins: 4, level: 'Start here',
  summary: 'The number one cause of ruined batches, and the easy routine that prevents it.',
  html: `
<p><b>Cleaning</b> removes dirt you can see. <b>Sanitising</b> kills the microbes you can't. You need both, in that order, because sanitiser can't get through grime.</p>
<h3>The routine</h3>
<ol class="steps">
<li><b>Rinse straight after use.</b> Dried-on krausen and yeast are ten times harder to remove later.</li>
<li><b>Clean</b> with an unscented oxygen-based cleaner and a soft cloth. Never use abrasive scourers on plastic, because scratches hide bacteria. Rinse well.</li>
<li><b>Sanitise</b> everything that touches the drink <i>after the boil</i> (or, for wine and cider, everything). With no-rinse acid sanitiser, mix it as the label says (Star San is about 1.5 ml per litre), wet every surface and wait the contact time (usually 30 s – 2 min).</li>
<li><b>Don't rinse</b> a no-rinse sanitiser off. The foam is harmless, so don't fear it.</li>
</ol>
<h3>What needs sanitising?</h3>
<ul>
<li><b>Yes:</b> fermenter, lid, airlock, bung, spoon, syphon, hydrometer, trial jar, bottles, caps, bottling wand, anything touching cooled wort, must or juice.</li>
<li><b>No:</b> the boil kettle and things used before or during a boil (boiling sanitises them).</li>
</ul>
${warn('Don\'t use household bleach or washing-up liquid unless you\'re prepared to rinse many times. Bleach residue leaves chlorophenols (a TCP-like, medicinal flavour), and detergent kills the head on beer. Never mix bleach with acid sanitisers: it releases chlorine gas.')}
${tip('Keep a spray bottle of mixed Star San on hand. Mixed with distilled or RO water, it stays effective for weeks. If it goes cloudy, it\'s spent.')}`
},
{
  id: 'hydrometer', title: 'Using a hydrometer & refractometer', drink: 'all', mins: 4, level: 'Start here',
  summary: 'How to take accurate readings, and correct them for temperature and alcohol.',
  html: `
<h3>Taking a hydrometer reading</h3>
<ol class="steps">
<li>Sanitise the trial jar, the hydrometer and whatever you use to take the sample (a turkey baster or wine thief).</li>
<li>Take enough sample that the hydrometer floats freely without touching the bottom.</li>
<li>Spin it gently to knock off bubbles. Bubbles cling and make it float higher, giving a false high reading.</li>
<li>Read at eye level at the <b>bottom of the meniscus</b> (the flat liquid surface, not the curve climbing the glass).</li>
<li>Note the temperature. Hydrometers are calibrated at a set temperature, usually 20 °C in the UK and EU (some older or US ones use 15.6 °C / 60 °F; check the paper inside).</li>
<li>Don't pour the sample back unless you're very confident about sanitation. Drink it instead; it's part of learning.</li>
</ol>
${calc('hydrotemp', 'Hydrometer temperature correction')}
<h3>Refractometers</h3>
<p>A refractometer measures sugar from 2–3 drops and gives a reading in <b>°Brix</b>. It's brilliant on brew day, but there are two catches:</p>
<ul>
<li><b>Wort correction factor (WCF):</b> beer wort isn't pure sucrose, so readings are usually divided by about 1.04. Calibrate yours with distilled water (it should read 0).</li>
<li><b>Alcohol throws it off.</b> Once fermentation starts, a raw reading is wrong. You need the original Brix and a correction formula (Terrill's), which the calculator below applies.</li>
</ul>
${calc('refrac', 'Refractometer calculator')}
<h3>Gravity scales</h3>
<p>SG, °Plato and °Brix all measure the same thing. As a rule of thumb, <b>4 gravity points ≈ 1 °Plato</b> (1.048 ≈ 12 °P).</p>
${calc('convert', 'Unit & scale converter')}`
},
{
  id: 'beer-kit', title: 'Beer from a kit or extract', drink: 'beer', mins: 8, level: 'Beginner',
  summary: 'Turn a tin of hopped malt or spraymalt into proper beer in an afternoon.',
  html: `
<p>Kit beers use <b>malt extract</b>: wort that has been mashed and concentrated for you. There are three levels:</p>
<ul>
<li><b>One-can kit</b> (e.g. 1.5–1.8 kg tin + 1 kg sugar or brewing enhancer). Easiest. Using spraymalt or brewing enhancer instead of plain sugar gives a better body.</li>
<li><b>Two-can kit</b>: all malt, no sugar needed, noticeably better.</li>
<li><b>Extract + steeping grains + your own hops</b>: you design the recipe. See the <a href="#/recipe/extract-pale">extract pale ale recipe</a>.</li>
</ul>
<h3>Kit method (23 L)</h3>
<ol class="steps">
<li><b>Clean and sanitise</b> the fermenter, lid, spoon, airlock and hydrometer.</li>
<li>Stand the tin in hot water for 10 minutes so the extract pours easily.</li>
<li>Pour the extract (and sugar/enhancer if the kit calls for it) into the fermenter with 2–3 L of just-boiled water. Stir until fully dissolved. Rinse the tin with hot water to get everything out.</li>
<li>Top up to the stated volume with <b>cold</b> tap water, pouring from height to add oxygen, which the yeast needs to grow.</li>
<li>Check that the temperature is <b>18–22 °C</b>. Pitching yeast into hot wort is the most common kit mistake.</li>
<li>Take an <b>OG reading</b> and write it in the <a href="#/log">batch log</a>.</li>
<li>Sprinkle the yeast on top (or rehydrate it first in 100 ml of 25–30 °C boiled water for 15 minutes). Fit the lid and airlock.</li>
<li>Ferment at 18–20 °C for <b>10–14 days</b>, until the gravity is stable for 3 days.</li>
<li>Bottle with priming sugar, keep the bottles warm (around 20 °C) for 2 weeks to carbonate, then move them somewhere cool for 2+ weeks to condition.</li>
</ol>
${calc('priming', 'Priming sugar calculator')}
${tip('Upgrade a kit cheaply: replace the sugar with 1 kg of light spraymalt, add a 20–30 g "hop tea" or dry hop of a matching hop on day 5, ferment at the cool end of the yeast\'s range, and give it an extra 2 weeks in the bottle. That takes it from "homebrew" to "where did you buy this?"')}
<h3>Extract with steeping grains</h3>
<p>Steep crushed specialty grains (crystal, chocolate, etc.) in a bag in 3–5 L of 65–70 °C water for 30 minutes, like a giant tea bag. Remove the bag, add your extract, top up and boil for 30–60 minutes with hops on a schedule. Cool fast, transfer to the fermenter and top up with cold water.</p>
${calc('recipe', 'Design an extract recipe')}`
},
{
  id: 'beer-biab', title: 'All-grain beer (Brew in a Bag)', drink: 'beer', mins: 12, level: 'Intermediate',
  summary: 'Mash real malt, boil with hops, and design any beer you like. A full brew-day walkthrough.',
  html: `
<p><b>Brew in a Bag (BIAB)</b> is all-grain brewing with one pot and a mesh bag. It's how most homebrewers move beyond kits. A typical brew day is 4–6 hours.</p>
<h3>Before brew day</h3>
<ul>
<li>Design or choose your recipe in the ${calc('recipe', 'recipe designer').replace('class="calc-link"', 'class="inline"')}.</li>
<li>Work out water volumes and strike temperature with the ${calc('water', 'mash water calculator').replace('class="calc-link"', 'class="inline"')}.</li>
<li>Buy <b>crushed</b> grain unless you own a mill. Store hops in the freezer.</li>
<li>Plan to treat your water if you need to. Most UK tap water is fine for beer after you remove the chlorine/chloramine with ½ Campden tablet per 25 L. Edinburgh's water is very soft, which is great for pale beers and lagers. Darker beers may like a pinch of calcium salts.</li>
</ul>
<h3>Brew day</h3>
<ol class="steps">
<li><b>Heat the strike water.</b> Put the full volume of water in the pot and heat it to the strike temperature (usually 2–4 °C above your mash target).</li>
<li><b>Mash in.</b> Line the pot with the bag, stir in the grain slowly so there are no dry clumps (dough balls), then check the temperature. Aim for <b>64–68 °C</b>:
  <ul><li><b>63–65 °C</b>: more fermentable, drier and crisper (IPAs, saisons, lagers).</li><li><b>66–67 °C</b>: balanced (most ales).</li><li><b>68–70 °C</b>: fuller body and sweeter (milds, stouts, sweet beers).</li></ul></li>
<li><b>Hold for 60 minutes.</b> Lid on and the pot wrapped in a sleeping bag or blanket. Losing 1–2 °C is fine. Stir once or twice.</li>
<li><b>Optional mash-out:</b> heat to 75–76 °C for 10 minutes to stop enzyme activity and loosen the sugars.</li>
<li><b>Lift the bag</b> and let it drain. A gentle squeeze is fine and adds efficiency; old worries about tannins from squeezing don't apply at normal mash pH.</li>
<li><b>Take a pre-boil gravity reading</b> (cool the sample first) and check it against the calculator's prediction.</li>
<li><b>Boil for 60 minutes</b> with the lid off, so DMS (a cooked-sweetcorn smell) can escape. Watch for boil-over when the hot break forms in the first few minutes.</li>
<li><b>Add hops on schedule.</b> Early hops (60 min) give bitterness, 15–5 minute hops give flavour, and flameout/whirlpool hops give aroma. Use the <a href="#/calc/timer">brew-day timer</a> for alarms. Add half a Protafloc/Whirlfloc tablet at 10–15 minutes for clearer beer.</li>
<li><b>Chill fast</b> to pitching temperature (below 20 °C for ales) with an immersion chiller or ice bath. Fast cooling locks in aroma and reduces infection risk. From here on, <b>everything must be sanitised</b>.</li>
<li><b>Transfer to the fermenter</b>, splashing to aerate. Leave most of the hop and protein sludge behind.</li>
<li><b>Take an OG reading</b>, pitch the yeast and log it.</li>
</ol>
${calc('timer', 'Open brew-day timer')}
<h3>Fermentation & beyond</h3>
<ul>
<li>Ales: 18–20 °C for 7–14 days. Let it rise 1–2 °C near the end to help the yeast clean up.</li>
<li>Lagers: 10–13 °C for 2–3 weeks, a <b>diacetyl rest</b> at 18 °C for 2 days near the end, then cold-condition ("lager") near 0–4 °C for 3–6 weeks.</li>
<li><b>Dry hopping:</b> add hops for 3–5 days near the end of fermentation. Longer can give grassy flavours.</li>
<li><b>Cold crash</b> (chill to 1–4 °C for 1–2 days) before packaging, for clearer beer.</li>
</ul>
${tip('Write down everything: volumes, temperatures, gravities, what went wrong. Your <b>brewhouse efficiency</b> (how much sugar you actually extract) is personal to your setup. Most BIAB brewers get 65–75%. Once you know yours, the recipe designer predicts your OG accurately.')}`
},
{
  id: 'wine', title: 'Wine: kits, juice and country wines', drink: 'wine', mins: 12, level: 'Beginner → Intermediate',
  summary: 'From a 30-bottle kit to blackberry and elderflower wine from the hedgerow.',
  html: `
<h3>Three routes</h3>
<ul>
<li><b>Wine kits</b> (7-day to 6-week kits). Grape concentrate plus additives with good instructions. Follow them exactly; the premium kits are genuinely good.</li>
<li><b>Carton juice wine.</b> Long-life red or white grape juice (with <b>no preservatives</b>), plus sugar, yeast, nutrient, acid and tannin. Cheap, easy and drinkable in 2–3 months.</li>
<li><b>Country wines</b> from fruit, flowers or vegetables: blackberry, elderberry, elderflower, rhubarb, plum, parsnip. This is the traditional British approach.</li>
</ul>
<h3>Country wine method (4.5 L / 1 gallon)</h3>
<ol class="steps">
<li><b>Prepare the fruit.</b> Wash, de-stem and freeze it overnight. Freezing bursts the cells and gives better extraction. Thaw and crush it in a sanitised bucket.</li>
<li><b>Pectolase + Campden.</b> Add 1 crushed Campden tablet (kills wild yeast and bacteria) and 1 tsp pectolase (breaks down pectin so the wine clears). Cover with a cloth and wait <b>24 hours</b>. The sulphite must dissipate before you add yeast.</li>
<li><b>Add sugar and water.</b> Dissolve sugar in some hot water, then add it to the fruit with cool water up to about 4.5 L. Use the gravity calculators to hit your target: an OG of 1.080–1.095 gives 11–13%.</li>
<li><b>Balance it.</b> Add yeast nutrient (as the pack says), and, depending on the fruit, acid (citric/malic) and tannin (¼ tsp or a mug of strong black tea). Taste it: it should be like a tart, slightly too-sweet juice.</li>
<li><b>Pitch wine yeast.</b> Stir daily for 5–7 days, pushing the fruit "cap" down.</li>
<li><b>Strain into a demijohn.</b> Strain off the fruit, squeezing gently, fit an airlock, and ferment until the gravity is stable (usually below 1.000).</li>
<li><b>Rack</b> (syphon off the sediment) into a clean demijohn. Repeat every 1–2 months until it's clear and stops dropping sediment. Keep the headspace small to limit oxidation; top up with similar wine or cooled boiled water.</li>
<li><b>Stabilise & sweeten</b> if you like (see below), then bottle. Most country wines are much better after <b>6–12 months</b>.</li>
</ol>
${calc('sugar', 'Sugar for target ABV')}
<h3>Stabilising and back-sweetening</h3>
<p>If you want sweet wine, you can't just add sugar: live yeast will eat it, and in a sealed bottle that means pressure and possibly an exploding bottle. Instead:</p>
<ol>
<li>Make sure fermentation is finished (stable gravity) and the wine has been racked off the lees.</li>
<li>Add <b>potassium sorbate</b> (about 0.2 g/L) <b>and</b> <b>1 Campden tablet per 4.5 L</b>. You need both: sorbate stops yeast reproducing, and sulphite protects against oxidation and sorbate's geranium fault.</li>
<li>Wait 24–48 hours, then add sugar or syrup to taste.</li>
</ol>
${calc('sweeten', 'Back-sweetening & stabiliser calculator')}
${warn('Stabilisers stop yeast reproducing, but they cannot stop a <b>very active</b> fermentation. Only stabilise a finished, settled wine.')}
<h3>Fruit guide</h3>
<table class="tbl">
<tr><th>Fruit</th><th>Per 4.5 L</th><th>Notes</th></tr>
<tr><td>Blackberry</td><td>1.5–2 kg</td><td>Rich red wine, good tannin. Pick away from roadsides.</td></tr>
<tr><td>Elderberry</td><td>1–1.5 kg</td><td>Port-like, intense. Remove ALL stalks, which are mildly toxic.</td></tr>
<tr><td>Elderflower</td><td>500 ml of heads (flowers only)</td><td>Delicate white. Pick on a sunny morning, add citrus for acid.</td></tr>
<tr><td>Rhubarb</td><td>1.5–2 kg</td><td>Crisp white/rosé. Use stalks only; leaves are toxic.</td></tr>
<tr><td>Plum / damson</td><td>2 kg</td><td>Heavy in pectin, so pectolase is essential.</td></tr>
<tr><td>Strawberry / raspberry</td><td>1.5 kg</td><td>Rosé-style; colour fades over time.</td></tr>
</table>`
},
{
  id: 'cider', title: 'Cider (and perry)', drink: 'cider', mins: 9, level: 'Beginner',
  summary: 'From supermarket juice to pressing your own apples, still or sparkling, dry or sweet.',
  html: `
<h3>Choosing juice</h3>
<ul>
<li><b>Supermarket apple juice</b>: cartons or bottles of 100% juice, <b>no preservatives</b>. Check the label for potassium sorbate, sodium benzoate or "preservative", which stop yeast. Ascorbic acid (vitamin C) is fine. Cloudy juice gives more flavour.</li>
<li><b>Pressed apples</b>: a mix of sweet, sharp and bittersweet varieties. Cooking apples plus eaters works; true cider apples add tannin and body.</li>
<li><b>Perry</b> is the same process with pears. Pears contain sorbitol, which yeast can't ferment, so perry stays naturally a little sweet.</li>
</ul>
<h3>Method (4.5 L shop juice)</h3>
<ol class="steps">
<li>Sanitise a demijohn, funnel, airlock and bung.</li>
<li>Pour in the juice, keeping 10% headspace for foam. Check the gravity (usually around 1.045–1.050, which makes about 6% ABV).</li>
<li>Optional: add sugar to raise the strength. More than about 8% starts to taste "winey" rather than like cider.</li>
<li>Add ½ tsp yeast nutrient and a cider, wine or ale yeast. Fit the airlock.</li>
<li>Ferment at 15–20 °C. Cooler is slower but fruitier. It's usually done in 1–3 weeks and will be <b>bone dry</b> (about 1.000 or below).</li>
<li>Rack off the sediment and leave it for 2–4 weeks to clear.</li>
<li>Bottle still, or prime for sparkling (see below). Young cider is sharp; it improves for 2–3 months.</li>
</ol>
${calc('sugar', 'How much sugar for my target ABV?')}
<h3>Sweet sparkling cider: the tricky one</h3>
<p>The yeast eats sugar either way, so you can't simply have bubbles <i>and</i> sweetness with live yeast. Your options:</p>
<ol>
<li><b>Non-fermentable sweetener.</b> Add xylitol, erythritol, stevia or sucralose with your priming sugar. Easiest and safe. Note: <b>xylitol is toxic to dogs</b>.</li>
<li><b>Kegging.</b> Stabilise, back-sweeten and force-carbonate in a keg.</li>
<li><b>Bottle pasteurisation.</b> Prime with extra sugar, then once a "tester" plastic bottle is firm, heat the bottles to stop the yeast. This is an advanced technique with a real risk of bottles exploding. Research it thoroughly, wear eye protection and never heat over-carbonated bottles.</li>
</ol>
${warn('Never bottle cider (or anything) with sugar still fermenting unless you have calculated the carbonation. Over-primed glass bottles can explode. Always confirm a stable final gravity first.')}
${calc('priming', 'Priming calculator')}
<h3>Tips for better cider</h3>
<ul>
<li>Lacking body? Add ¼ tsp tannin or a mug of strong tea per 4.5 L, or include some bittersweet apples.</li>
<li>Sulphur (eggy) smell? That's common with apple juice because it's low in nutrients. Add nutrient at the start; it usually fades with time.</li>
<li>Try additions: blackcurrant juice, a cinnamon stick, ginger, dry-hopping with 10 g Citra or Nelson Sauvin.</li>
</ul>`
},
{
  id: 'mead', title: 'Mead', drink: 'mead', mins: 10, level: 'Beginner → Intermediate',
  summary: 'Honey wine, the oldest drink there is. Modern nutrient schedules mean it\'s drinkable in months, not years.',
  html: `
<h3>Types of mead</h3>
<table class="tbl">
<tr><th>Name</th><th>What it is</th></tr>
<tr><td>Traditional / show mead</td><td>Honey, water, yeast. Showcases the honey.</td></tr>
<tr><td>Melomel</td><td>With fruit (berries, cherries, etc.)</td></tr>
<tr><td>Cyser</td><td>With apple juice instead of water</td></tr>
<tr><td>Pyment</td><td>With grapes or grape juice</td></tr>
<tr><td>Metheglin</td><td>With spices or herbs (cinnamon, vanilla, ginger…)</td></tr>
<tr><td>Braggot</td><td>Half beer, half mead: honey plus malt</td></tr>
<tr><td>Bochet</td><td>Honey caramelised before fermenting. Toffee, marshmallow.</td></tr>
<tr><td>Session / hydromel</td><td>Low strength (4–8%), often carbonated. Ready in weeks.</td></tr>
</table>
<h3>Strength & sweetness</h3>
<p>Each <b>kg of honey in 4.5 L of finished volume</b> adds roughly 65 gravity points (about 8.5% ABV potential). Whether it ends dry or sweet depends on the yeast's tolerance:</p>
<ul>
<li>1.0–1.2 kg per 4.5 L → about 1.065–1.080 → dry table mead, 9–10%</li>
<li>1.4–1.6 kg → about 1.095–1.105 → standard, 12–14%</li>
<li>1.8–2.0 kg → about 1.120–1.130 → sack (dessert) mead, sweet unless you use a high-tolerance yeast</li>
</ul>
${calc('mead', 'Mead calculator: honey, ABV, sweetness & nutrients')}
<h3>Modern method (4.5 L)</h3>
<ol class="steps">
<li><b>Mix the must.</b> Dissolve the honey in some warm (not boiling) water in a sanitised fermenter, then top up with cool water to 4.5 L. Don't boil the honey; it drives off aroma.</li>
<li><b>Take the OG</b> and log it.</li>
<li><b>Rehydrate the yeast</b>, ideally with Go-Ferm or a similar rehydration nutrient, and pitch. Popular choices are Lalvin 71B (fruity, softens acid), D47 (rich; keep it under 20 °C) and EC-1118 (bone dry, very strong).</li>
<li><b>Feed it on a schedule (staggered nutrient addition).</b> Honey has almost no nitrogen. Without nutrients, mead ferments for months and makes rotten-egg and rocket-fuel flavours. Split the organic nutrient into 4 doses at <b>24 h, 48 h, 72 h and at the "⅓ sugar break"</b> (when a third of the gravity drop has happened).</li>
<li><b>Degas</b> by stirring or swirling gently once or twice a day for the first week. CO₂ is toxic to yeast and stalls the ferment. Add nutrient <i>after</i> degassing, slowly, or it will foam over.</li>
<li>Keep it at <b>16–20 °C</b>; cooler gives a cleaner mead.</li>
<li>When the gravity is stable, <b>rack</b> into a clean demijohn with minimal headspace. Rack again every 1–2 months until it's clear.</li>
<li><b>Stabilise and back-sweeten</b> to taste (honey is ideal), then age it. A traditional mead hits its stride around <b>6–12 months</b>; big sweet meads keep improving for years.</li>
</ol>
${tip('If your mead tastes harsh, "hot" or like nail polish when young, that is normal, and time fixes most of it. Don\'t judge a mead before about 3 months.')}
<h3>Honey choice</h3>
<p>Supermarket blended honey makes perfectly good mead. Single-flower honeys (orange blossom, heather, wildflower, acacia) carry their character into the mead. Scottish heather honey is thick and bold, and makes a famously good mead. Avoid "honey-flavoured syrup" products.</p>`
},
{
  id: 'bottling', title: 'Bottling, kegging & carbonation', drink: 'all', mins: 7, level: 'Beginner',
  summary: 'Get the fizz right without flat beer or bottle bombs.',
  html: `
<h3>How bottle carbonation works</h3>
<p>You add a measured amount of sugar ("priming sugar") to a finished, still drink. The yeast that's left eats it inside the sealed bottle, and the CO₂ has nowhere to go, so it dissolves into the drink. The amount of fizz is measured in <b>volumes of CO₂</b>.</p>
<ul>
<li>Some CO₂ is already dissolved after fermentation. The warmer the fermentation, the less there is. The calculator accounts for that.</li>
<li>Typical targets: British cask-style 1.5–2.0, American pale 2.3–2.6, lager 2.5–2.7, wheat 3.0–4.0, sparkling cider 2.5–3.0.</li>
</ul>
${calc('priming', 'Priming sugar calculator')}
<h3>Bottling method</h3>
<ol class="steps">
<li>Check the gravity is stable for 3 days. <b>This is the most important step.</b></li>
<li>Clean and sanitise the bottles, caps, bottling bucket, syphon and wand.</li>
<li>Boil the priming sugar in about 200 ml of water for 2 minutes and cool it.</li>
<li>Pour the sugar solution into the bottling bucket and syphon the beer onto it gently. Stir slowly so the sugar is evenly mixed without splashing in oxygen.</li>
<li>Fill the bottles from the bottom with a bottling wand, leaving about 2–3 cm of headspace, and cap them.</li>
<li>Keep them at <b>18–22 °C for 2 weeks</b>, then cool. Test one bottle at 1 week if you're curious.</li>
</ol>
${warn('<b>Bottle bombs</b> happen when there is more sugar in the bottle than you intended: bottling before fermentation is finished, poorly mixed priming sugar, infection, or using a recipe for 23 L on 18 L of beer. Standard beer bottles are designed for about 3 volumes; above that, use heavy Belgian or champagne bottles. Store conditioning bottles in a closed box.')}
${tip('Fill one <b>plastic PET bottle</b> along with the glass ones. When it\'s rock hard to squeeze, the rest are carbonated.')}
<h3>Kegging</h3>
<p>Kegging means one container to clean instead of 40, and you can serve beer within days. Force-carbonate by setting the regulator to the pressure for your target volumes at your fridge temperature and waiting 1–2 weeks. You can also "burst carb" at 30 psi for 24–36 hours, then turn it down to serving pressure.</p>
${calc('keg', 'Keg pressure calculator')}`
},
{
  id: 'troubleshooting', title: 'Troubleshooting & off-flavours', drink: 'all', mins: 8, level: 'Reference',
  summary: 'Stuck ferments, weird smells, cloudy beer, gushers. What happened and how to fix it.',
  html: `
<h3>It's not fermenting!</h3>
<ul>
<li><b>Check the gravity, not the airlock.</b> Bucket lids often leak, so the CO₂ escapes round the edge instead of through the airlock.</li>
<li>Give it 48–72 hours. Lag time can be long with cold wort or old yeast.</li>
<li>Too cold? Move it somewhere at 18–22 °C.</li>
<li>Did you pitch into hot wort (over 35–40 °C)? The yeast may be dead. Pitch fresh yeast.</li>
<li>Is there preservative in the juice? Look for sorbate or benzoate on the label. That will stop it.</li>
</ul>
<h3>Stuck fermentation (stopped too high)</h3>
<ol>
<li>Warm it to the top of the yeast's range and gently rouse the yeast (swirl it to get the sediment back into suspension).</li>
<li>For wine and mead: degas it and add yeast nutrient (not DAP if it's above about 9% ABV).</li>
<li>Still stuck? Make a starter with EC-1118, using a little of the stuck liquid plus sugar water, and add it once it's active.</li>
<li>For beer: a high mash temperature makes unfermentable sugars. That may simply <i>be</i> the final gravity.</li>
</ol>
<h3>Off-flavour guide</h3>
<table class="tbl">
<tr><th>Tastes / smells like</th><th>Likely cause</th><th>Fix / prevent</th></tr>
<tr><td>Butter, butterscotch</td><td>Diacetyl: packaged too early, or bacteria</td><td>Give it longer on the yeast; a diacetyl rest for lagers</td></tr>
<tr><td>Green apple, fresh-cut pumpkin</td><td>Acetaldehyde: young beer, pulled off the yeast too soon</td><td>Patience. Leave it 3+ days after the gravity stabilises.</td></tr>
<tr><td>Cooked sweetcorn</td><td>DMS: lid on during the boil, slow chilling, lots of pilsner malt</td><td>Rolling boil with the lid off; chill fast</td></tr>
<tr><td>Rotten eggs, struck match</td><td>Hydrogen sulphide: stressed yeast, low nutrients (common in cider and mead)</td><td>Nutrients; degassing. Usually fades. A clean copper scourer can help in wine.</td></tr>
<tr><td>Solvent, nail polish, "hot" boozy</td><td>Fusel alcohols / esters: fermented too warm</td><td>Control the temperature, especially in the first 3 days. Age it.</td></tr>
<tr><td>Bananas / bubblegum</td><td>Isoamyl acetate: warm fermentation (normal in hefeweizen)</td><td>Ferment cooler, unless you want it</td></tr>
<tr><td>Vinegar</td><td>Acetobacter: air exposure plus bacteria</td><td>Can't be fixed. Limit oxygen and headspace; sanitise.</td></tr>
<tr><td>Sour (unintended)</td><td>Lactobacillus / pediococcus infection</td><td>Sanitation; replace scratched plastic</td></tr>
<tr><td>TCP, plasters, medicinal</td><td>Chlorophenols: chlorine/bleach residue or chlorinated tap water</td><td>Campden in the brewing water; no bleach</td></tr>
<tr><td>Wet cardboard, sherry</td><td>Oxidation</td><td>Avoid splashing after fermentation; minimal headspace</td></tr>
<tr><td>Skunky</td><td>Light-struck hops (UV)</td><td>Brown bottles; keep it out of light</td></tr>
<tr><td>Geraniums</td><td>Sorbate used without sulphite, plus bacteria</td><td>Always pair sorbate with a Campden tablet</td></tr>
<tr><td>Thin, watery cider</td><td>Shop juice lacks tannin and body</td><td>Tannin or strong tea; leave a bit of sweetness</td></tr>
</table>
<h3>Is that mould?</h3>
<p><b>Normal:</b> beige or brown foam (krausen), hop debris, yeast rafts, bubbles, "islands" of yeast. <b>Problem:</b> fuzzy, raised, dry-looking spots (green, black, white) are mould. A wrinkly, film-like skin is a <i>pellicle</i> (wild yeast or bacteria), which isn't dangerous but changes the flavour. Mould on the surface of a high-alcohol wine can sometimes be skimmed off; on a fresh, low-alcohol must, start again.</p>
<h3>Clarity</h3>
<ul>
<li>Beer haze: chill haze (proteins) clears with time cold, Irish moss/Protafloc in the boil, or gelatine finings.</li>
<li>Fruit wine won't clear: pectin haze. Add pectolase. Test it: mix 1 part wine with 3 parts methylated spirit; stringy clots mean pectin.</li>
<li>Patience solves most clarity problems. Gravity pulls the yeast down eventually.</li>
</ul>
<h3>Gushing bottles</h3>
<p>If every bottle gushes, it's too much priming sugar or it was bottled early. If it gets worse over time, it's probably an infection. Chill the bottles right down (CO₂ dissolves better cold), open them over a sink, and drink or vent them soon. Wear eye protection if any have burst.</p>`
},
{
  id: 'safety', title: 'Safety, health & UK law', drink: 'all', mins: 4, level: 'Important',
  summary: 'What\'s legal in the UK, what isn\'t, and how to stay safe.',
  html: `
<h3>The law (UK)</h3>
<ul>
<li><b>Fermented drinks for your own use are legal.</b> You can make beer, wine, cider and mead at home for your own domestic consumption without a licence and without paying duty. Sharing with friends for free is fine.</li>
<li><b>Selling is not.</b> If you sell homemade alcohol, or swap it for money or a "donation", you need HMRC approval, must pay Alcohol Duty, need a premises/personal licence to sell, and must register as a food business. Don't sell at fêtes or online without doing this.</li>
<li><b>Distilling is illegal without an HMRC licence</b>, even for personal use. Owning a small still for water or essential oils is a grey area, but running alcohol through it is an offence. This app does not cover distilling.</li>
<li>The usual laws on drinking ages and drink driving apply to homebrew exactly as they do to shop-bought drinks.</li>
</ul>
${warn('Homebrew strength varies. A "4%" kit can easily end at 5.5%, and a mead can be 14%+. Measure your gravity so you know what you\'re serving, and tell people if it\'s strong.')}
<h3>Health</h3>
<ul>
<li>The UK Chief Medical Officers advise drinking no more than <b>14 units a week</b>, spread over 3 or more days, with several drink-free days. ${calc('units', 'Units & cost calculator').replace('class="calc-link"', 'class="inline"')} shows the units in your homebrew.</li>
<li>Don't drink alcohol if you're pregnant or might be.</li>
<li>Bottle-conditioned drinks contain live yeast sediment. It's harmless but can upset some stomachs; pour gently and leave the last centimetre in the bottle.</li>
</ul>
<h3>Can homebrew make you blind?</h3>
<p><b>No.</b> Fermentation alone doesn't produce dangerous amounts of methanol. Fruit with lots of pectin produces small amounts, similar to commercial wine. The real risk comes from <i>distilling</i>, which concentrates it, and from adulterated illicit spirits. One more reason not to distil.</p>
<h3>Practical hazards</h3>
<ul>
<li><b>Exploding bottles:</b> see <a href="#/guide/bottling">bottling</a>. Always confirm the final gravity first.</li>
<li><b>Boiling wort</b> is heavy and very hot. Lift bags carefully, use a pulley or rack for big BIAB batches, and never carry a full pot of boiling liquid.</li>
<li><b>Gas burners</b> must be used outdoors (carbon monoxide).</li>
<li><b>CO₂</b> builds up in enclosed spaces during fermentation and kegging. Ventilate small rooms and cupboards.</li>
<li><b>Chemicals</b>: keep sanitiser, cleaner and Campden tablets labelled and away from children. Sulphite can trigger reactions in asthmatics.</li>
<li><b>Foraging:</b> be certain what you've picked. Elderberry stalks, unripe berries, rhubarb leaves and many lookalike plants are toxic.</li>
</ul>`
},
];

window.Glossary = [
  ['ABV', 'Alcohol by volume: the percentage of the drink that is ethanol.'],
  ['Airlock', 'One-way valve that lets CO₂ out of the fermenter and stops air and bugs getting in.'],
  ['Alpha acid (AA%)', 'The bittering compound in hops. Higher AA means more bitterness per gram when boiled.'],
  ['Attenuation', 'How much of the sugar the yeast ate, as a %. 75% apparent attenuation from 1.048 gives FG 1.012.'],
  ['Back-sweetening', 'Adding sugar or honey after fermentation (and after stabilising) to make the drink sweeter.'],
  ['BIAB', 'Brew in a Bag. All-grain brewing where the grain sits in a mesh bag in the boil pot.'],
  ['Brix', 'Sugar measurement used by refractometers and winemakers; about the same as °Plato.'],
  ['Campden tablet', 'Sodium or potassium metabisulphite. Releases SO₂ to sterilise must, remove chlorine and prevent oxidation.'],
  ['Cold crash', 'Chilling a finished beer to near 0 °C so the yeast and haze drop out.'],
  ['Conditioning', 'The period after fermentation where flavours mature and carbonation develops.'],
  ['Cyser', 'Mead made with apple juice.'],
  ['Degassing', 'Stirring CO₂ out of wine or mead, which helps fermentation and clearing.'],
  ['Demijohn', '4.5 litre (1 imperial gallon) glass fermenting jar. The standard UK wine and cider vessel.'],
  ['Diacetyl', 'Buttery off-flavour produced by yeast and normally cleaned up again by it.'],
  ['DME / spraymalt', 'Dried malt extract. Powdered wort.'],
  ['Dry hopping', 'Adding hops after the boil, during or after fermentation, for aroma without bitterness.'],
  ['EBC / SRM', 'Beer colour scales. EBC ≈ SRM × 1.97.'],
  ['Efficiency', 'How much of the grain\'s potential sugar ends up in your wort. BIAB is typically 65–75%.'],
  ['Esters', 'Fruity flavour compounds from yeast (banana, pear, red apple). More of them at warmer temperatures.'],
  ['FG', 'Final gravity: the reading when fermentation is finished.'],
  ['Finings', 'Agents that help drop haze: gelatine, isinglass, kieselsol/chitosan, bentonite.'],
  ['Flocculation', 'How readily yeast clumps and settles. High flocculation means clearer beer sooner.'],
  ['Fusels', 'Harsh, hot "higher" alcohols from warm or stressed fermentation.'],
  ['Gravity points', 'The bit after the "1.0": 1.048 is 48 points.'],
  ['Hot break', 'Proteins that clump in the first minutes of the boil, causing foam-over.'],
  ['IBU', 'International Bitterness Units: how bitter a beer is, from about 10 (wheat beer) to 100 (DIPA).'],
  ['Krausen', 'The thick foam head on fermenting beer.'],
  ['Lees / trub', 'Sediment of dead yeast, proteins and hop matter.'],
  ['Mash', 'Steeping crushed malt in hot water (64–68 °C) so enzymes turn starch into sugar.'],
  ['Melomel', 'Mead made with fruit.'],
  ['Metheglin', 'Mead made with spices or herbs.'],
  ['Must', 'Unfermented fruit or honey mixture for wine or mead.'],
  ['OG', 'Original gravity: the reading before fermentation.'],
  ['Pectolase', 'Pectic enzyme. Breaks down fruit pectin for better juice extraction and clarity.'],
  ['Pitching', 'Adding yeast.'],
  ['Plato (°P)', 'Gravity expressed as % sugar by weight. About 4 points of SG per °P.'],
  ['Priming', 'Adding a measured amount of sugar at bottling to create carbonation.'],
  ['Racking', 'Syphoning liquid off its sediment into a clean vessel.'],
  ['Sanitiser', 'Chemical that kills microbes on clean surfaces (e.g. Star San). Different from cleaner.'],
  ['Sorbate', 'Potassium sorbate. Stops yeast reproducing, so sweetened wine doesn\'t re-ferment.'],
  ['Sparging', 'Rinsing grain with hot water to wash out more sugar.'],
  ['Strike water', 'The hot water you add grain to; heated above the mash target so it settles at the right temperature.'],
  ['TOSNA', 'Tailored Organic Staggered Nutrient Addition. The modern way to feed mead yeast.'],
  ['Volumes of CO₂', 'Unit of carbonation: litres of CO₂ dissolved per litre of liquid.'],
  ['Wort', 'Unfermented beer: the sugary liquid from the mash.'],
  ['YAN', 'Yeast assimilable nitrogen: the food yeast needs besides sugar. Honey has almost none.'],
];
