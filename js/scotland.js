/* Brew Lab: Off-grid Scotland. A complete living-off-the-land guide built around Scotland:
   month-by-month foraging & brewing calendar, plant guide with deadly lookalikes, water, fire, shelter,
   food, hazards, emergencies, Scottish law, Scottish recipes, a forage brew planner and a printable handbook. */
DRINK.scot = { c: '#5b8fd6', em: '🦌', name: 'Off-grid Scotland' };

const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const range = (a, b) => { const r = []; for (let m = a; ; m = m % 12 + 1) { r.push(m); if (m === b) break; } return r; };

/* ---------- Plants (use: sugar | flavour | bitter | food) ---------- */
const SCOT_PLANTS = [
  { id: 'birch', w: 'Betula pendula', n: 'Birch sap', g: 'beith', em: '🌳', use: 'sugar', m: [3, 4], sugar: 1, where: 'Birch woods everywhere, from the Borders to Sutherland. Silver and downy birch.',
    brew: 'Sap wine, birch beer, or boil 40–100 L down to 1 L of syrup. Sap goes off in 2–3 days unless kept cold.', id_: 'White papery bark with dark diamonds. Tap in the 2–4 weeks before the leaves open.',
    look: 'None dangerous. <b>Needs the landowner\'s permission</b>; one tap per tree (trunk 25 cm+ across), plug the hole after.', risk: 0, recipe: 'birch-wine' },
  { id: 'nettle', w: 'Urtica dioica', n: 'Nettle tops', g: 'feanntag', em: '🌿', use: 'flavour', m: [3, 4, 5], where: 'Field edges, ruins, old croft sites, anywhere the soil is rich.',
    brew: 'Nettle beer (super easy, fizzy, ready in 2 weeks). Also soup, tea, a hop substitute.', id_: 'Stinging hairs, toothed heart-shaped leaves in opposite pairs. Pick only the top 4–6 leaves before flowering.',
    look: 'Dead-nettles look similar but don\'t sting (harmless). Wear gloves.', risk: 0, recipe: 'nettle-beer' },
  { id: 'gorse', w: 'Ulex europaeus', n: 'Gorse flowers', g: 'conasg', em: '💛', use: 'flavour', m: range(1, 12), peak: [4, 5], where: 'Hillsides, coasts, roadsides. Flowers almost all year, peak in spring.',
    brew: 'Gorse wine (coconut and vanilla), gorse mead, flower syrup.', id_: 'Bright yellow pea-flowers on a very spiny evergreen bush; smells of coconut on a sunny day.',
    look: '<b>Broom</b> has similar yellow flowers but <b>no spines</b>: it contains toxic alkaloids, so don\'t use it. Gloves on.', risk: 1, recipe: 'gorse-wine' },
  { id: 'groundivy', w: 'Glechoma hederacea', n: 'Ground ivy (alehoof)', g: '', em: '🍃', use: 'bitter', m: [3, 4, 5, 6], where: 'Woodland edges, hedge bottoms, shady grass.',
    brew: 'The old "alehoof": used to clarify and bitter ale before hops arrived. A small handful per 5 L.', id_: 'Creeping, kidney-shaped scalloped leaves, small violet-blue flowers, square stems, minty-musty smell.',
    look: 'Low risk. Use sparingly: strong.', risk: 0 },
  { id: 'spruce', w: 'Picea sitchensis', n: 'Spruce & pine tips', g: 'giuthas (Scots pine)', em: '🌲', use: 'flavour', m: [5, 6], where: 'Every forestry plantation (Sitka spruce) and native pinewood (Scots pine).',
    brew: 'Spruce beer (an old sailors\' brew that kept scurvy away), tip syrup, gruit ale.', id_: 'Bright lime-green new growth at the branch tips. Needles grow singly (spruce) or in pairs (Scots pine) on a round twig.',
    look: '<b>YEW IS DEADLY.</b> Yew has flat, soft needles in two rows, dark glossy green above, paler below, no cones, red berry-like cups. Every part except the red flesh is poisonous. If in doubt, leave it.', risk: 2 },
  { id: 'elderflower', w: 'Sambucus nigra', n: 'Elderflower', g: 'droman', em: '🌼', use: 'flavour', m: [6, 7], where: 'Hedges, waste ground, villages. Common in the south and east, scarcer in the far north-west.',
    brew: 'Elderflower champagne, elderflower wine, cordial.', id_: 'Flat creamy flower heads on a <b>woody shrub or small tree</b> with corky bark. Leaves of 5–7 toothed leaflets. Smells sweet and musky.',
    look: '<b>Hemlock, hemlock water dropwort and cow parsley</b> also have flat white flower heads, but they grow from the ground on hollow green stems, not on a woody bush. Never pick white umbels from the ground.', risk: 2, recipe: 'elderflower-wine' },
  { id: 'meadowsweet', w: 'Filipendula ulmaria', n: 'Meadowsweet', g: 'crios Chù Chulainn', em: '🤍', use: 'flavour', m: [6, 7, 8], where: 'Wet meadows, ditches and burn sides all over Scotland.',
    brew: 'One of the old "mead worts": flavours mead and ale with honey-almond sweetness. 1–2 heads per 5 L.', id_: 'Frothy cream flowers in irregular clusters on reddish stems; dark leaves, silvery underneath. Smells of honey and marzipan.',
    look: 'Contains aspirin-like compounds: skip it if you can\'t take aspirin. It grows in the same wet places as hemlock water dropwort, so check every stem.', risk: 1 },
  { id: 'bogmyrtle', w: 'Myrica gale', n: 'Bog myrtle (sweet gale)', g: 'roid', em: '🌾', use: 'bitter', m: range(5, 9), where: 'Wet moorland and bogs, especially the west Highlands and islands.',
    brew: 'The classic Scottish gruit herb: bitter, resinous, used in heather ale instead of (or with) hops. 5 g dried per 5 L. Crushed leaves are an old midge repellent.', id_: 'Low bushy shrub, grey-green leaves toothed near the tip, strongly aromatic when rubbed, reddish twigs.',
    look: 'Use sparingly: large amounts were said to cause headaches. Traditionally avoided in pregnancy.', risk: 1, recipe: 'heather-ale' },
  { id: 'thyme', w: 'Thymus praecox', n: 'Wild thyme', g: 'lus an rìgh', em: '🌱', use: 'flavour', m: [6, 7, 8], where: 'Dry grassland, coastal turf, rocky ground, machair.',
    brew: 'Herbal mead, a sprig in ale, tea.', id_: 'Tiny mat-forming plant, little oval leaves, pink-purple flower heads, smells of thyme.', look: 'Low risk.', risk: 0 },
  { id: 'yarrow', w: 'Achillea millefolium', n: 'Yarrow', g: 'earr thalmhainn', em: '🤍', use: 'bitter', m: range(6, 9), where: 'Grassland, roadsides, lawns, coasts.',
    brew: 'A gruit bittering herb. A small handful per 5 L.', id_: 'Very finely divided feathery leaves; flat-topped clusters of small white-pink flowers; tough stringy stem.',
    look: '<b>Beginners confuse it with hemlock and other umbellifers.</b> Yarrow leaves are feathery like a fern and the stem is solid and hairy, not hollow and smooth. If unsure, don\'t.', risk: 2 },
  { id: 'heather', w: 'Calluna', n: 'Heather (ling)', g: 'fraoch', em: '💜', use: 'flavour', m: [8, 9], where: 'Every moor and hill in Scotland.',
    brew: 'Heather ale (Leann fraoich), heather mead. Pick flowering tips when they\'re fully purple. Heather honey from local beekeepers is superb for mead.', id_: 'Tiny scale-like leaves, spikes of small pale purple bell flowers in late summer.',
    look: 'Low risk. Shake out insects; avoid plants next to roads or recently burned (muirburn) ground.', risk: 0, recipe: 'heather-ale' },
  { id: 'raspberry', w: 'Rubus idaeus', n: 'Wild raspberry', g: 'sùbh-craoibh', em: '🍓', use: 'sugar', m: [7, 8], sugar: 5, where: 'Woodland clearings, burn sides, Tayside hedges.',
    brew: 'Raspberry melomel, fruit wine, flavouring ale.', id_: 'Canes with fine prickles; leaves white underneath; red berries that pull off as a hollow cap.', look: 'Low risk.', risk: 0 },
  { id: 'blaeberry', w: 'Vaccinium myrtillus', n: 'Blaeberry (bilberry)', g: 'dearc-mhonaidh', em: '🫐', use: 'sugar', m: [7, 8, 9], sugar: 7, where: 'Pine and birch woods, heather moor. Huge crops in Highland woods.',
    brew: 'Blaeberry wine (deep purple), melomel. About 1.5 kg per 4.5 L.', id_: 'Low bushy shrub, bright green angled stems, small blue-black berries with a crown on the end and purple flesh.',
    look: 'Crowberry (black, bland) and cowberry (red) grow alongside and are edible but sour. Don\'t confuse with any berry growing on a tall plant.', risk: 0, recipe: 'blaeberry-wine' },
  { id: 'bramble', w: 'Blackberry', n: 'Brambles (blackberries)', g: 'smeur', em: '🫐', use: 'sugar', m: [8, 9, 10], sugar: 8, where: 'Hedges, waste ground, woodland edges. Mainly lowland and coast.',
    brew: 'Bramble wine, bramble melomel, hedgerow wine. Old Scots lore says not to pick after Michaelmas (end of September) because "the de\'il spits on them": in truth the late ones go mouldy.', id_: 'Arching thorny stems; black glossy berries.', look: 'Low risk.', risk: 0, recipe: 'blackberry-wine' },
  { id: 'rowan', w: 'Sorbus aucuparia', n: 'Rowan berries', g: 'caorann', em: '🔴', use: 'sugar', m: [8, 9, 10], sugar: 6, where: 'Everywhere, up to the high glens. Traditionally planted by Highland houses to keep witches away.',
    brew: 'Rowan & crab apple wine, rowan jelly. <b>Never use raw:</b> freeze them overnight and pour boiling water over, or cook them.', id_: 'Small tree, leaves of 11–15 toothed leaflets, big clusters of orange-red berries.',
    look: 'Raw berries contain parasorbic acid and upset the stomach; freezing/boiling destroys it. Don\'t mistake for <b>bittersweet</b> (woody nightshade, poisonous), which is a scrambling vine with oval red berries and purple flowers.', risk: 1, recipe: 'rowan-wine' },
  { id: 'elderberry', w: 'Elderberry', n: 'Elderberries', g: 'droman', em: '🟣', use: 'sugar', m: [8, 9, 10], sugar: 10, where: 'Same bushes as the flowers.',
    brew: 'Elderberry wine (port-like with age), mixed hedgerow wine.', id_: 'Drooping heads of small shiny black berries on red stalks.',
    look: 'Use only fully ripe black berries, with every stalk removed; always cook or ferment, never eat raw in quantity. Leaves, stems and green berries make you sick.', risk: 1 },
  { id: 'crabapple', w: 'Malus sylvestris', n: 'Crab apples', g: 'ubhal fiadhain', em: '🍏', use: 'sugar', m: [9, 10], sugar: 9, where: 'Old hedges, woodland edges, abandoned crofts and gardens.',
    brew: 'Wild cider (sharp: blend with sweeter fruit), adds acid and body to rowan and bramble wines.', id_: 'Small spiny tree, little hard yellow-green or red apples.', look: 'Low risk. Don\'t crush pips in quantity.', risk: 0, recipe: 'rowan-wine' },
  { id: 'rosehip', w: 'Rose hip', n: 'Rosehips', g: 'mucag', em: '🌹', use: 'sugar', m: [9, 10, 11], sugar: 6, where: 'Dog rose in hedges; Japanese rose on many coasts and dunes.',
    brew: 'Rosehip wine, rosehip syrup (huge vitamin C: kept wartime children going). Pick after the first frost.', id_: 'Red oval or round hips on thorny rose bushes.',
    look: 'The seeds have irritating hairs: always strain through fine cloth.', risk: 0 },
  { id: 'haws', w: 'Crataegus monogyna', n: 'Hawthorn haws', g: 'sgìtheach', em: '🔴', use: 'sugar', m: [9, 10, 11], sugar: 5, where: 'Hedges and field boundaries everywhere.',
    brew: 'Haw wine (light, slightly appley), hedgerow wine.', id_: 'Thorny shrub, lobed leaves, small dark red berries with one big stone.', look: 'Don\'t crush the stones (they contain cyanide-forming compounds).', risk: 1 },
  { id: 'seabuckthorn', w: 'Hippophae rhamnoides', n: 'Sea buckthorn', g: '', em: '🧡', use: 'sugar', m: [9, 10], sugar: 4, where: 'East-coast dunes, e.g. East Lothian, Fife and Angus.',
    brew: 'Very sour and oily: use 250–500 g in a mead or blend with sweet fruit. Tropical, passion-fruit flavour.', id_: 'Silvery narrow leaves, thorny, packed clusters of bright orange berries on the stems.', look: 'Low risk. Snip whole twigs and freeze; the berries burst if picked singly.', risk: 0 },
  { id: 'sloe', w: 'Prunus spinosa', n: 'Sloes', g: 'àirneag', em: '⚫', use: 'sugar', m: [10, 11], sugar: 7, where: 'Blackthorn hedges and scrub, mainly the south and east.',
    brew: 'Sloe wine, sloe & bramble wine, sloe gin (infused into bought gin). Pick after a frost or freeze them.', id_: 'Very thorny shrub; blue-black berries with a dusty bloom; mouth-puckering.',
    look: 'Don\'t crush the stones. <b>Deadly nightshade</b> berries are shiny black without bloom, on a soft-stemmed plant with a star-shaped green collar. It\'s rare in Scotland, but be sure.', risk: 1 },
  { id: 'juniper', w: 'Juniperus communis', n: 'Juniper berries', g: 'aiteann', em: '🫐', use: 'flavour', m: [9, 10, 11, 12, 1, 2, 3], where: 'Native pinewoods, moorland, Speyside, Deeside and the west. Declining: pick very lightly.',
    brew: 'Gin botanicals (infused into bought neutral spirit), Nordic-style juniper ale, a few in game marinades.', id_: 'Spiky, prickly needles in threes; berries take 2–3 years to ripen from green to blue-black.',
    look: 'Use only ripe blue-black berries. Avoid in pregnancy and with kidney problems.', risk: 1 },
  { id: 'dandelion', w: 'Taraxacum officinale', n: 'Dandelion flowers', g: 'beàrnan-Brìde', em: '🌼', use: 'flavour', m: [4, 5], where: 'Everywhere.', brew: 'Dandelion wine (petals only: the green bits are bitter).', id_: 'Single yellow flower on a hollow milky stem; toothed leaves in a rosette.', look: 'Low risk.', risk: 0 },
  { id: 'wildgarlic', w: 'Allium ursinum', n: 'Wild garlic (ramsons)', g: 'creamh', em: '🧄', use: 'food', m: [3, 4, 5], where: 'Damp woods and burn sides; carpets them in spring.', brew: 'Food, not brewing: soup, pesto, flavouring.', id_: 'Broad shiny leaves growing singly from the ground; <b>strong garlic smell when crushed</b>; white star flowers.',
    look: '<b>Lords-and-ladies</b> (arrow-shaped leaves) and <b>lily of the valley</b> (leaves in pairs, no smell) grow in the same places and are poisonous. Crush every leaf and smell it, and wash your hands between leaves so the smell doesn\'t fool you.', risk: 2 },
  { id: 'sorrel', w: 'Rumex acetosa', n: 'Sorrel', g: 'sealbhag', em: '🍃', use: 'food', m: range(3, 9), where: 'Grassland and hill pasture.', brew: 'Food: a lemony leaf. Contains oxalic acid, so eat in moderation.', id_: 'Arrow-shaped leaves with backward-pointing lobes, sour lemon taste.', look: 'Avoid lords-and-ladies leaves, which are similar in shape but glossy and grow in woods.', risk: 1 },
  { id: 'dulse', w: 'Palmaria palmata', n: 'Dulse & kelp (seaweed)', g: 'duileasg', em: '🌊', use: 'food', m: range(1, 12), peak: [4, 5, 6], where: 'Rocky shores at low tide, especially the islands.',
    brew: 'Food and salt minerals; kelp has even been used in Scottish ale. Cut with scissors, leave the holdfast.', id_: 'Dulse: flat purple-red fronds. Kelp: big brown straps.',
    look: 'No seaweed in the UK is deadly, but avoid anything near sewage outfalls, and rinse and dry well. Watch the tide.', risk: 0 },
  { id: 'hazel', w: 'Corylus avellana', n: 'Hazelnuts', g: 'calltainn', em: '🌰', use: 'food', m: [9, 10], where: 'Hazel woods on the west coast (Atlantic hazel) and in lowland hedges.', brew: 'Food: high-calorie nuts that store well. Squirrels get there first, so pick when the husks start to turn brown.', id_: 'Multi-stemmed shrub, round soft leaves, nuts in a frilly husk.', look: 'Low risk.', risk: 0 },
  { id: 'chanterelle', w: 'Cantharellus cibarius', n: 'Chanterelles', g: '', em: '🍄', use: 'food', m: [7, 8, 9, 10], where: 'Birch and pine woods, mossy banks.', brew: 'Food. <b>Mushrooms only with an expert at your side.</b>', id_: 'Egg-yolk yellow, apricot smell, blunt forked ridges (not true gills) running down the stem.',
    look: '<b>Deadly webcap</b> grows in the same Scottish pine and birch woods and has caused kidney failure here. False chanterelle has true gills. Never eat a mushroom identified from a book or app alone.', risk: 2 },
];

/* ---------- Deadly plants & fungi of Scotland ---------- */
const SCOT_DANGER = [
  ['Hemlock water dropwort', 'Burns, ditches, wet ground and shores, especially western Scotland. Roots wash up on beaches after storms.', 'Wild celery, water parsnip, parsnips, cow parsley. Smells of parsley/celery.', 'Thought to be the most poisonous plant in Britain: all parts, especially the "dead man\'s fingers" roots. Cut stems ooze yellow sap.', 'Oenanthe crocata'],
  ['Hemlock', 'Riverbanks, waste ground, roadsides.', 'Cow parsley, wild carrot, elderflower (by beginners), yarrow.', 'Smooth hollow stem with purple blotches; mousey smell. Deadly.', 'Conium maculatum'],
  ['Cowbane', 'Rare: lochsides and marshes.', 'Wild celery and other water umbellifers.', 'Deadly. Another reason to never forage white umbels from wet ground.', 'Cicuta virosa'],
  ['Yew', 'Churchyards, old estates, some woods.', 'Spruce and pine tips (for spruce beer or tea).', 'Flat needles in two rows, no cones. Leaves and seeds deadly.', 'Taxus baccata'],
  ['Foxglove', 'Woods, hillsides, everywhere in summer.', 'Comfrey and borage leaves before flowering.', 'Contains heart poisons. Deadly.', 'Digitalis purpurea'],
  ['Lords-and-ladies', 'Damp woods, often among wild garlic.', 'Wild garlic leaves; red berries in late summer.', 'Burning, swelling mouth and throat.', 'Arum maculatum'],
  ['Lily of the valley', 'Gardens and escapes into woods.', 'Wild garlic.', 'Heart poison.', 'Convallaria majalis'],
  ['Bittersweet (woody nightshade)', 'Hedges, ditches, shingle.', 'Red berries: redcurrants, rowan.', 'Poisonous berries on a scrambling vine with purple flowers.', 'Solanum dulcamara'],
  ['Giant hogweed', 'Riverbanks, especially the Tay, Clyde, Tweed and Don.', 'A handy "tube". Never use any hollow plant stem as a straw or siphon.', 'Sap + sunlight = severe burns and blisters for years.', 'Heracleum mantegazzianum'],
  ['Broom', 'Hillsides with gorse.', 'Gorse flowers.', 'No spines. Toxic alkaloids: don\'t brew with it.', 'Cytisus scoparius'],
  ['Bracken', 'Most hillsides.', 'Fern fiddleheads.', 'Carcinogenic; don\'t eat it or brew with it. Prime tick habitat.', 'Pteridium aquilinum'],
  ['Deadly webcap & death cap', 'Pine and birch woods (webcap); broadleaf woods (death cap).', 'Ceps, chanterelles, "button mushrooms".', 'Kidney and liver failure, often days later. People have needed transplants after eating deadly webcap picked in the Highlands.', 'Cortinarius rubellus'],
  ['Ergot', 'Dark purple-black spurs replacing grains on rye and grasses.', 'Normal grain.', 'Never malt or bake with spurred grain: causes ergotism.', 'Claviceps purpurea'],
];

/* ---------- Month by month ---------- */
const SCOT_MONTHS = [
  { w: 'Coldest. Lowlands 0–6 °C, hills frozen; storms and snow on high ground.', day: [7.5, 6.5], brew: ['Make mead from stored honey', 'Malt and brew stored grain', 'Check and top up ageing wines', 'Rack autumn fruit wines'], live: ['Fuel: keep the woodpile under cover; dry next year\'s wood', 'Check stores for damp and mice', 'Plan the garden: order seed potatoes and oats'], risk: ['Hypothermia', 'Short days: plan to be back by 3 pm', 'Avalanches on the hills (check SAIS)'] },
  { w: 'Cold and wet; snow possible anywhere. Days lengthen fast.', day: [9.5, 8.8], brew: ['Prepare birch-tapping kit (taps, tubing, clean containers)', 'Bottle winter meads', 'Get a wild yeast starter going for spring'], live: ['Chit seed potatoes', 'Mend tools and nets', 'Coppice hazel and willow (with permission)'], risk: ['Hypothermia', 'Ice on paths and burns', 'Avalanches on the hills'] },
  { w: 'Unsettled: sunshine, gales and snow. Lambing starts.', day: [11.7, 11.6], brew: ['Birch sap rises: tap for 2–4 weeks before the leaves open', 'Brew birch sap wine', 'First nettle tops at the month\'s end'], live: ['Plant early potatoes on sheltered ground', 'Sow oats and bere when the soil dries', 'Collect wild garlic'], risk: ['Lambing: keep dogs on a lead', 'Rivers in spate after snowmelt'] },
  { w: 'Mild days, cold nights; often dry in the east. Fire risk on moorland starts.', day: [14, 14.5], brew: ['Nettle beer', 'Gorse wine as gorse peaks', 'Dandelion wine', 'Ground ivy for gruit'], live: ['Plant main-crop potatoes and kale', 'Cairngorms fire ban begins (1 April)'], risk: ['Wildfire: no open fires on dry moorland', 'Ticks wake up', 'Lambing: dogs on leads'] },
  { w: 'Often the driest, sunniest month. Midges arrive.', day: [16, 17], brew: ['Spruce and pine tip beer', 'Gorse mead', 'Bog myrtle comes into leaf for gruit'], live: ['Peat cutting season (with peat rights only)', 'Seaweed at spring low tides', 'Sow turnips (neeps)'], risk: ['Midges at dawn and dusk', 'Ticks', 'Sunburn: long days at altitude'] },
  { w: 'Long light evenings, the "simmer dim" in Shetland. Can be wet.', day: [17.5, 18.5], brew: ['Elderflower champagne and wine', 'Meadowsweet mead', 'Wild thyme and yarrow for gruit'], live: ['Dry peats and wood in the sun', 'Fishing season in full swing (with permission)'], risk: ['Midges at their worst', 'Ticks', 'Adders basking on warm paths', 'Shellfish toxins higher in summer'] },
  { w: 'Warmest month: 14–19 °C in the lowlands. Thundery rain.', day: [16.8, 17.5], brew: ['Wild raspberry melomel', 'First blaeberries', 'Meadowsweet in ale'], live: ['Harvest early potatoes', 'Dry and store herbs', 'Collect firewood for winter'], risk: ['Midges', 'Ticks', 'Stag stalking begins on some estates'] },
  { w: 'Warm but wetter. Heather turns the hills purple.', day: [14.8, 15], brew: ['Heather ale with flowering tips', 'Blaeberry wine', 'First rowan and brambles at the month\'s end'], live: ['Harvest oats and bere (90-day barley in Orkney)', 'Start drying fruit for winter brewing'], risk: ['Stalking season: check "Heading for the Scottish Hills"', 'Midges', 'Ticks'] },
  { w: 'Often settled early, stormy later. The great foraging month.', day: [12.6, 12.3], brew: ['Bramble wine (before Michaelmas!)', 'Rowan & crab apple wine', 'Elderberry wine', 'Sea buckthorn mead', 'Wild cider from crab and garden apples'], live: ['Lift and clamp potatoes', 'Collect hazelnuts', 'Cairngorms fire ban ends (30 September)'], risk: ['Stalking season', 'Ticks', 'Mushroom poisoning: expert ID only'] },
  { w: 'Gales and rain; first frosts. Colours peak.', day: [10.2, 9.5], brew: ['Sloes and rosehips after the first frost', 'Haw wine', 'Rack and top up summer wines'], live: ['Dry and store malt', 'Salt and smoke fish', 'Bring in the peats/wood'], risk: ['Rivers in spate', 'Hind stalking season begins', 'Clocks change: darkness by 5 pm'] },
  { w: 'Dark, wet and windy. Snow on the tops.', day: [8, 7], brew: ['Sloe wine, sloe gin (bought gin)', 'Juniper for gin infusions (pick lightly)', 'Start a long winter mead'], live: ['Check stores, ventilate the root clamp', 'Mend clothing and waterproofs'], risk: ['Hypothermia', 'Short days', 'Winter mountain conditions from now'] },
  { w: 'Darkest month: about 7 hours of daylight in the central belt, under 6 in Shetland.', day: [7, 5.8], brew: ['Atholl brose for Hogmanay', 'Bottle autumn wines', 'Mull spiced wine'], live: ['Fuel and food stores are everything now', 'Keep a fire going safely: carbon monoxide kills in closed bothies'], risk: ['Hypothermia', 'Avalanches', 'Storm damage'] },
];

/* ---------- Recipes ---------- */
Recipes.push(
{ id: 'nettle-beer', name: 'Nettle beer', drink: 'scot', baseL: 4.5, level: 1, time: '2–3 weeks', og: 1.034, fg: 1.000, abv: '≈4%',
  desc: 'The easiest wild brew in Scotland: young nettle tops, sugar and lemon. Fresh, fizzy and ready in a fortnight.',
  ingredients: [{ q: 1, u: 'kg', n: 'Young nettle tops (a full carrier bag), picked in March–May' }, { q: 4.5, u: 'L', n: 'Water' }, { q: 400, u: 'g', n: 'Sugar (or 500 g honey)' }, { q: 2, u: '', n: 'Lemons, juice (or 1 tbsp cream of tartar)' }, { q: 1, u: 'sachet', n: 'Ale yeast, or a cup of wild yeast starter', fixed: true }],
  steps: ['Wearing gloves, rinse the nettle tops and remove any big stalks.', 'Boil them in the water for 15 minutes; strain off the nettles.', 'Stir in the sugar and lemon juice while hot. Cool to below 25 °C.', 'Add the yeast, cover with a cloth and leave 3–5 days somewhere room-warm until it slows.', 'Bottle in plastic fizzy-drink bottles with ½ tsp sugar each. Check firmness daily; chill once rock hard.', 'Drink within a month: it doesn\'t keep.'] },
{ id: 'gorse-wine', name: 'Gorse flower wine', drink: 'scot', baseL: 4.5, level: 2, time: '4–6 months', og: 1.085, fg: 0.996, abv: '≈11.5%',
  desc: 'Golden, delicate and coconut-scented: Scotland\'s answer to elderflower wine, from flowers you can pick almost all year.',
  ingredients: [{ q: 2, u: 'L', n: 'Gorse flowers, loosely packed (pick on a sunny day, gloves on)' }, { q: 4.5, u: 'L', n: 'Water' }, { q: 1, u: 'kg', n: 'Sugar (or 1.25 kg honey)' }, { q: 2, u: '', n: 'Oranges or lemons, zest + juice' }, { q: 200, u: 'g', n: 'Raisins or sultanas, chopped (body and yeast food)' }, { q: 1, u: 'tsp', n: 'Yeast nutrient (or extra raisins)' }, { q: 1, u: 'sachet', n: 'White wine yeast, or wild yeast starter', fixed: true }],
  steps: ['Pick the flowers without stalks or spines. Check for insects.', 'Boil the water, dissolve the sugar, pour it over the flowers, zest and raisins in a bucket.', 'Cover, cool to below 25 °C, add the citrus juice, nutrient and yeast.', 'Stir daily for 5 days, then strain into a demijohn and fit an airlock.', 'Rack off the sediment after 6 weeks; leave to clear.', 'Bottle when clear. Lovely at 6 months; better at a year.'] },
{ id: 'heather-ale', name: 'Heather ale (Leann fraoich)', drink: 'scot', baseL: 5, level: 3, time: '4–6 weeks', og: 1.050, fg: 1.010, abv: '≈5%',
  desc: 'Scotland\'s legendary ale: malt, flowering heather tips and bog myrtle instead of (or with a few) hops. Floral, honeyed and slightly resinous.',
  ingredients: [{ q: 600, u: 'g', n: 'Light dried malt extract (or mash 1.2 kg pale malt / home-made malt)' }, { q: 100, u: 'g', n: 'Heather honey (optional)' }, { q: 1, u: 'L', n: 'Flowering heather tips, loosely packed (August–September)' }, { q: 5, u: 'g', n: 'Dried bog myrtle (or 2 fresh sprigs). Optional: 5 g Fuggles/Goldings hops' }, { q: 6, u: 'L', n: 'Water' }, { q: 1, u: 'sachet', n: 'Ale yeast (Nottingham / S-04), or wild yeast', fixed: true }],
  steps: ['Pick fully flowering heather tips on a dry day; shake out insects. Keep half aside.', 'Bring the water to the boil, take it off the heat and stir in the malt extract (or mash your grain at 66 °C for an hour and strain).', 'Boil for 45 minutes with half the heather and the bog myrtle (and hops if using).', 'Turn off the heat, stir in the honey and the rest of the heather, and steep 20 minutes.', 'Strain into a fermenter, cool to 18 °C, top up to 5 L and add the yeast.', 'Ferment 1–2 weeks until steady, then bottle with ½ tsp sugar per 500 ml bottle.', 'Condition 2 weeks somewhere room-warm. Drink within 2–3 months.'] },
{ id: 'rowan-wine', name: 'Rowan & crab apple wine', drink: 'scot', baseL: 4.5, level: 2, time: '6–12 months', og: 1.090, fg: 0.998, abv: '≈12%',
  desc: 'A sharp, amber, faintly smoky Highland wine from the two trees by every croft. Bitter rowan is tamed by crab apple and time.',
  ingredients: [{ q: 1, u: 'kg', n: 'Rowan berries, stalks removed, frozen overnight' }, { q: 1.5, u: 'kg', n: 'Crab apples (or cooking apples), chopped' }, { q: 1, u: 'kg', n: 'Sugar (or 1.25 kg honey)' }, { q: 4, u: 'L', n: 'Water' }, { q: 1, u: 'tsp', n: 'Pectolase (helps it clear; optional off-grid)' }, { q: 1, u: 'tsp', n: 'Yeast nutrient' }, { q: 1, u: 'sachet', n: 'Wine yeast, or wild yeast starter', fixed: true }],
  steps: ['Freeze the rowan berries overnight (removes most bitterness).', 'Put berries and chopped apples in a bucket and pour over 4 L of boiling water. This also breaks down the parasorbic acid.', 'Cover, leave 24 hours, then add pectolase.', 'Next day, dissolve the sugar in a little hot water, add it with the nutrient and yeast.', 'Stir daily for 7 days, strain through cloth into a demijohn, airlock.', 'Rack at 2 months and again when clear. Age at least 6 months: it softens a lot.'] },
{ id: 'blaeberry-wine', name: 'Blaeberry wine', drink: 'scot', baseL: 4.5, level: 2, time: '6–9 months', og: 1.090, fg: 0.996, abv: '≈12.5%',
  desc: 'A deep purple, Beaujolais-style wine from Highland blaeberries picked in the pinewoods in late summer.',
  ingredients: [{ q: 1.5, u: 'kg', n: 'Blaeberries (bilberries)' }, { q: 1, u: 'kg', n: 'Sugar (or 1.25 kg honey)' }, { q: 4, u: 'L', n: 'Water' }, { q: 1, u: '', n: 'Lemon, juice' }, { q: 1, u: 'tsp', n: 'Yeast nutrient' }, { q: 1, u: 'sachet', n: 'Red wine yeast, or wild yeast (blaeberries carry plenty)', fixed: true }],
  steps: ['Crush the berries in a bucket.', 'Dissolve the sugar in the water (boiled), pour over the fruit, cool to below 25 °C.', 'Add lemon, nutrient and yeast. Stir daily for 5–7 days.', 'Strain into a demijohn, airlock, and ferment out.', 'Rack when it drops clear; bottle at 4–6 months. Best at a year.'] },
{ id: 'orkney-ale', name: 'Field-to-glass Orkney-style ale', drink: 'scot', baseL: 5, level: 3, time: 'a growing season + 4 weeks', og: 1.045, fg: 1.012, abv: '≈4.5%',
  desc: 'The full off-grid ale, as brewed on Orkney farms for centuries: home-malted bere (or any barley/oats), herbs instead of hops, and your own yeast.',
  ingredients: [{ q: 1.5, u: 'kg', n: 'Home-malted bere, barley or oats (see the steps)' }, { q: 7, u: 'L', n: 'Water' }, { q: 1, u: 'handful', n: 'Bog myrtle, yarrow or heather tips (or wild hops)' }, { q: 1, u: 'cup', n: 'Saved yeast from your last brew, or wild yeast starter', fixed: true }],
  steps: ['Malt: soak the grain 1–2 days (change the water daily) until a tiny white root appears.', 'Spread it 5 cm deep on a clean floor or trays, keep damp, turn twice daily for 4–5 days until the shoot inside is ¾ the grain length.', 'Dry it slowly by a low fire, peat or wood smoke (that\'s where smoky malt comes from), or in sun and wind. Rub off the roots.', 'Crack the malt with a quern, stones or a rolling pin. Steep in 66 °C water for an hour: hot but you can just keep a finger in. No thermometer? Mix equal boiling and cold water.', 'Strain, rinse the grain with a little hot water, boil the liquid with the herbs for 30–60 minutes.', 'Cool to blood-warm, add yeast, cover. Ferment 1–2 weeks somewhere sheltered; drink fresh.'] },
{ id: 'atholl-brose', name: 'Atholl brose', drink: 'scot', baseL: 0.75, level: 1, time: '1 night', abv: '≈15–20%',
  desc: 'The Highlands\' oldest celebration drink, dating back to the 1400s: oat "brose", heather honey and whisky. Not brewed: mixed. Perfect for Hogmanay.',
  ingredients: [{ q: 100, u: 'g', n: 'Medium oatmeal' }, { q: 300, u: 'ml', n: 'Cold water' }, { q: 2, u: 'tbsp', n: 'Heather honey' }, { q: 300, u: 'ml', n: 'Scotch whisky (bought, or your own licensed spirit)' }, { q: 150, u: 'ml', n: 'Double cream (optional)' }],
  steps: ['Stir the oatmeal into the cold water and leave overnight.', 'Strain through a fine cloth, squeezing well; keep the creamy liquid (the brose) and use the oats for porridge.', 'Warm the honey slightly and stir it into the brose.', 'Stir in the whisky (and cream if using). Bottle and chill.', 'Shake before serving in small glasses.'] },
);
Object.assign(META, {
  'nettle-beer': { gear: 0, weeks: 2, taste: ['fizzy', 'light'] },
  'gorse-wine': { gear: 1, weeks: 20, taste: ['wine', 'floral'] },
  'heather-ale': { gear: 1, weeks: 5, taste: ['beer', 'floral'] },
  'rowan-wine': { gear: 1, weeks: 30, taste: ['wine', 'fruity'] },
  'blaeberry-wine': { gear: 1, weeks: 26, taste: ['wine', 'fruity'] },
  'orkney-ale': { gear: 0, weeks: 4, taste: ['beer'] },
  'atholl-brose': { gear: 0, weeks: 0, taste: ['sweet'] },
});

/* ---------- Skill ladder ---------- */
Paths.scot = [
  { name: 'Nettle beer', time: '2 weeks', hands: '1 hour', cost: '≈£1', abv: '3–4%',
    what: 'The first brew of the Scottish year. Pick young nettle tops in spring, boil them, add sugar and lemon, ferment a few days and bottle. Hard to get wrong.',
    need: ['A carrier bag of young nettle tops and gloves', 'A big pot and a bucket', 'Sugar or honey, lemons', 'Ale yeast or a wild yeast starter', 'Plastic fizzy-drink bottles'],
    learn: 'Foraging safely, simple wild ferments.', links: [['#/recipe/nettle-beer', 'Recipe'], ['#/scotland/month', 'What\'s in season']] },
  { name: 'Flower wines: gorse & elderflower', time: '4–6 months', hands: '2 hours', cost: '≈£3', abv: '10–12%',
    what: 'Flowers bring the scent; sugar or honey brings the strength. Gorse blooms almost all year; elderflower in June and July.',
    need: ['2 L of flowers', 'Sugar or honey, citrus, raisins', 'Demijohn and airlock (or a narrow jar with a water lock)', 'Wine yeast or wild yeast'],
    learn: 'Wine-making, racking, identifying flowers vs. deadly lookalikes.', links: [['#/recipe/gorse-wine', 'Gorse wine'], ['#/recipe/elderflower-wine', 'Elderflower wine'], ['#/scotland/plants', 'Plant guide']] },
  { name: 'Hedgerow & hill fruit wines', time: '6–12 months', hands: 'a day', cost: '≈£3', abv: '10–13%',
    what: 'Late summer and autumn bring blaeberries, brambles, rowan, crab apples, elderberries and sloes. Learn which need freezing or cooking, and how to balance sour and bitter fruit.',
    need: ['1.5–2.5 kg fruit per 4.5 L', 'Sugar or honey', 'Bucket, straining cloth, demijohn', 'Wine yeast or the wild yeast on the skins'],
    learn: 'Balancing fruit, ageing, using the forage planner.', links: [['#/recipe/blaeberry-wine', 'Blaeberry wine'], ['#/recipe/rowan-wine', 'Rowan & crab apple'], ['#/calc/forage', 'Forage planner']] },
  { name: 'Heather ale with bog myrtle', time: '5 weeks', hands: '4 hours', cost: '≈£6', abv: '4–6%',
    what: 'The legendary Pictish brew, revived. Malt for sugar, flowering heather for perfume, bog myrtle for bitterness: the old Scottish gruit.',
    need: ['Malt extract or malted grain', 'Flowering heather tips (August–September)', 'Dried bog myrtle', 'Big pot, fermenter, bottles'],
    learn: 'Brewing ale without hops, herbal bittering.', links: [['#/recipe/heather-ale', 'Recipe'], ['#/guide/scotland', 'History & legend']] },
  { name: 'Field to glass: grow, malt & brew', time: 'a season', hands: 'many days', cost: 'seed grain', abv: '4–5%',
    what: 'The full self-sufficient chain, as Orkney farmers did for centuries: grow bere or oats, malt them, dry the malt over peat or wood smoke, brew with herbs, and keep your own yeast.',
    need: ['A patch of ground and seed grain (bere, barley or oats)', 'Trays or a clean floor for malting', 'A low fire or smoke for drying', 'Quern or stones', 'Your own saved yeast'],
    learn: 'The whole chain, from soil to glass.', links: [['#/recipe/orkney-ale', 'Recipe'], ['#/scotland/living', 'Growing & stores'], ['#/guide/starch', 'Malting & enzymes']] },
];

/* ---------- Guide: Scotland's wild drinks, history & starter ---------- */
Guides.push({ id: 'scotland', title: 'Scotland\'s wild drinks: history, legend & how to start', drink: 'scot', mins: 9, level: 'All levels',
  summary: 'Heather ale and the Pictish legend, bere barley, birch sap, Atholl brose, bog myrtle gruit and Highland whisky smugglers, plus how to start brewing from the Scottish land.',
  html: `
<p>Scotland has one of the richest brewing histories in the world, and almost all of it was made from what grew on the hill, the shore and the croft. This guide covers the story and points you to the practical tools.</p>
<div class="callout info"><b>Tools</b><div><a href="#/scotland">Off-grid Scotland hub</a>: month-by-month calendar, plant guide with deadly lookalikes, water, fire, shelter, food, hazards, law and a printable handbook.</div></div>

<h3>Heather ale: the legend</h3>
<p>The most famous Scottish drink story is about heather ale. In the legend, a king defeats the Picts and captures the last two who know the secret recipe: a father and son. The father promises to tell it if the king kills his son first, then refuses and takes the secret to his death. Robert Louis Stevenson told it in his 1890 poem <i>Heather Ale: A Galloway Legend</i>.</p>
<p>The truth is less bloody: heather ale never really died out. Records from Islay in the late 1700s describe ale brewed from young heather tops with about a third part malt and a few hops. In 1986 a woman brought a translated Gaelic recipe into a Glasgow home-brew shop, and the Williams brothers turned it into <b>Fraoch</b>, brewed with heather and bog myrtle. <a href="#/recipe/heather-ale">Brew your own →</a></p>

<h3>Gruit: brewing without hops</h3>
<p>Hops don't grow well in Scotland, so for most of history Scottish ale was bittered and preserved with wild herbs: <b>bog myrtle</b> (sweet gale), heather, yarrow, ground ivy and meadowsweet. A blend of herbs like this is called <i>gruit</i>. Bog myrtle also kept midges off, and it's still the badge plant of Clan Campbell.</p>

<h3>Bere: the 90-day barley</h3>
<p><b>Bere</b> (said "bear") is the old Scots word for barley. It's now the name of a six-row landrace that has grown in Orkney and the islands for over a thousand years. It's probably Britain's oldest cereal in continuous cultivation, possibly arriving with Norse settlers. It ripens so fast in the long northern summer that it's called "the 90-day barley". Orkney produced large amounts of malt and ale from bere from at least the 1400s, and farm home-brewing with bere survives on the islands today. <a href="#/recipe/orkney-ale">Field-to-glass ale →</a></p>

<h3>Birch sap: the spring tonic</h3>
<p>Tapping birch trees for sap ("birch water") was once a Highland tradition, and it has been revived in Perthshire. The sap rises for 2–4 weeks around March, before the leaves open. Fresh, it's a faintly sweet water; fermented with sugar or boiled down, it makes wine and syrup. Always ask the landowner first. <a href="#/recipe/birch-wine">Birch sap wine →</a></p>

<h3>Atholl brose</h3>
<p>A legendary Highland drink said to date from the 1400s: the Earl of Atholl is supposed to have captured a rebel by filling the well he drank from with whisky, honey and oatmeal. It's still drunk at Hogmanay and Burns Night. <a href="#/recipe/atholl-brose">Make it →</a></p>

<h3>Whisky smugglers and the bothy stills</h3>
<p>From the 1600s, rising taxes on malt and spirit drove Highland distilling into the glens. By the early 1820s thousands of illicit stills were being found every year, until the 1823 Excise Act made legal distilling affordable. <a href="#/guide/distilling-history">The full story →</a> Today, "Scotch whisky" is a protected name: it must be made in Scotland and matured in oak casks in Scotland for at least three years.</p>

<h3>Where to start</h3>
<ol>
<li><b>Spring:</b> <a href="#/recipe/nettle-beer">nettle beer</a> (super easy) or <a href="#/recipe/birch-wine">birch sap wine</a>.</li>
<li><b>Late spring:</b> <a href="#/recipe/gorse-wine">gorse wine</a>.</li>
<li><b>Summer:</b> <a href="#/recipe/elderflower-wine">elderflower wine</a>, then <a href="#/recipe/heather-ale">heather ale</a> in August.</li>
<li><b>Autumn:</b> <a href="#/recipe/blaeberry-wine">blaeberry</a>, <a href="#/recipe/blackberry-wine">bramble</a> and <a href="#/recipe/rowan-wine">rowan &amp; crab apple</a> wines.</li>
<li><b>Winter:</b> mead from heather honey, malting stored grain, and <a href="#/recipe/atholl-brose">Atholl brose</a> for Hogmanay.</li>
</ol>
${warn('Learn the <a href="#/scotland/danger">deadly plants</a> before you forage anything. Hemlock water dropwort, common in wet ground in western Scotland, is thought to be the most poisonous plant in Britain.')}
` });

/* ---------- Forage brew planner ---------- */
defCalc({ id: 'forage', title: 'Forage brew planner (Scotland)', icon: 'hop', group: 'Wine, cider & mead',
  desc: 'How strong will your foraged wine be? Pick a fruit, enter what you gathered, and see the strength, plus how much honey or sugar you need for the strength you want.',
  render(el) {
    const fruits = SCOT_PLANTS.filter(p => p.use === 'sugar' && p.sugar > 1);
    el.innerHTML = `<div class="calc"><div class="panel" id="ff"></div><div class="panel"><div class="out" id="fo"></div></div></div>`;
    mountForm('forage', $('#ff', el), $('#fo', el), [
      { k: 'fruit', l: 'Fruit', t: 'sel', v: 'bramble', o: fruits.map(f => [f.id, `${f.em} ${f.n}`]) },
      { k: 'kg', l: 'Fruit gathered', v: 2, u: 'kg', step: 0.1 },
      { k: 'L', l: 'Batch size', v: 4.5, u: 'L', step: 0.5 },
      { k: 'honey', l: 'Honey added', v: 0, u: 'kg', step: 0.1 },
      { k: 'sugar', l: 'Sugar added', v: 0.8, u: 'kg', step: 0.1 },
      { k: 'target', l: 'Strength you want', v: 12, u: '%', step: 0.5, hint: 'Wild yeast tops out around 8–12%; wine yeast 13–15%.' },
    ], v => {
      const f = SCOT_PLANTS.find(p => p.id === v.fruit) || fruits[0];
      const juiceSugar = v.kg * 1000 * f.sugar / 100 * 0.85; // most sugar is extracted when fermented on the fruit
      const total = juiceSugar + v.honey * 800 + v.sugar * 1000;
      const gL = total / v.L, abv = gL / 17, og = 1 + gL * 0.385 / 1000;
      const needG = Math.max(0, v.target * 17 * v.L - total);
      const perL = v.kg / v.L;
      const fruitNote = perL < 0.25 ? 'Very little fruit: it will taste thin. Aim for at least 1.2 kg per 4.5 L.' : perL > 0.7 ? 'Lots of fruit: rich flavour; may need longer ageing.' : 'A good amount of fruit for flavour.';
      return `<div class="stats">
        ${stat('Expected strength', fmt(abv, 1), '%', abv > 15 ? '⚠️ too much sugar to ferment dry' : 'if fermented dry', 'big')}
        ${stat('Starting gravity', fmt(og, 3), '', 'roughly')}
        ${stat('Sugar from the fruit', fmt(juiceSugar / 1000, 2), 'kg', `${f.n} ≈ ${f.sugar}% sugar`)}
        ${stat(`For ${v.target}% add`, needG ? fmt(needG / 1000, 2) : '0', 'kg sugar', needG ? `or ${fmt(needG / 800, 2)} kg honey` : 'you already have enough')}
      </div>
      <p class="note">${fruitNote}</p>
      <div class="callout ${f.risk ? 'warn' : 'tip'}"><b>${f.risk ? 'Care' : 'Tip'}</b><div>${f.brew} ${f.risk ? f.look : ''}</div></div>
      <p class="note">Rule of thumb: about 17 g of sugar per litre makes 1% alcohol. Honey is about 80% sugar. Fruit sugar varies with ripeness and the summer, so take a hydrometer reading if you have one.</p>`;
    });
  } });

/* ---------- Search: include plants and dangers ---------- */
{
  const _si = searchIndex;
  searchIndex = function () {
    return _si().concat(
      SCOT_PLANTS.map(p => ({ t: p.n, d: p.brew.replace(/<[^>]+>/g, ''), body: `${p.g} ${p.where} ${p.id_} ${p.look}`.replace(/<[^>]+>/g, ''), href: '#/scotland/plants?p=' + p.id, kind: 'Scottish plant', em: p.em })),
      SCOT_DANGER.map(([n, w, m, e]) => ({ t: n + ' (poisonous)', d: e, body: w + ' ' + m, href: '#/scotland/danger', kind: 'Danger', em: '☠️' })),
    );
  };
}

/* ---------- Plant photos (Wikipedia / Wikimedia Commons, loaded in the browser) ---------- */
const WAPI = 'https://en.wikipedia.org/w/api.php?format=json&origin=*&redirects=1&';
function wikiLead(title) {
  const cache = store.get('wimg', {});
  if (cache[title]) return Promise.resolve(cache[title]);
  return fetch(WAPI + 'action=query&prop=pageimages|info&inprop=url&piprop=thumbnail&pithumbsize=480&titles=' + encodeURIComponent(title))
    .then(r => r.json()).then(j => {
      const pg = Object.values(j.query?.pages || {})[0] || {};
      const v = { s: pg.thumbnail?.source || '', u: pg.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}` };
      if (v.s) { const c = store.get('wimg', {}); c[title] = v; store.set('wimg', c); }
      return v;
    });
}
const photoBox = (title, name, em) => `<button class="ph" data-wiki="${esc(title)}" data-name="${esc(name)}" aria-label="Photos of ${esc(name)}"><span class="ph-em">${em}</span><span class="ph-tag">📷 Photos</span></button>`;
function hydratePhotos(root) {
  const boxes = $$('.ph[data-wiki]:not(.pend)', root); boxes.forEach(b => b.classList.add('pend'));
  const load = b => wikiLead(b.dataset.wiki).then(v => {
    if (!v.s) { b.classList.add('none'); return; }
    b.classList.add('ok'); b.insertAdjacentHTML('afterbegin', `<img src="${v.s}" alt="${esc(b.dataset.name)}" loading="lazy" decoding="async">`);
  }).catch(() => b.classList.add('none'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); load(e.target); } }), { rootMargin: '300px' });
    boxes.forEach(b => io.observe(b));
  } else boxes.forEach(load);
}
const stripTags = h => String(h || '').replace(/<[^>]+>/g, '').trim();
function openGallery(title, name) {
  $('.gal')?.remove();
  const g = document.createElement('div'); g.className = 'gal'; g.setAttribute('role', 'dialog');
  g.innerHTML = `<div class="gal-box"><div class="gal-top"><b>${esc(name)}</b><button class="gal-x" aria-label="Close">✕</button></div>
    <div class="gal-main"><div class="gal-load">Loading photos…</div></div><div class="gal-strip"></div>
    <p class="gal-cap note"></p>
    <p class="note gal-warn">⚠️ Never identify a plant from photos alone: check every feature in the plant guide and a proper field guide.</p></div>`;
  document.body.appendChild(g);
  const close = () => { g.remove(); document.removeEventListener('keydown', esc_); };
  const esc_ = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', esc_);
  g.addEventListener('click', e => { if (e.target === g || e.target.closest('.gal-x')) close(); });
  fetch(WAPI + 'action=query&generator=images&gimlimit=40&prop=imageinfo&iiprop=url|extmetadata|mime&iiurlwidth=900&titles=' + encodeURIComponent(title))
    .then(r => r.json()).then(j => {
      const imgs = Object.values(j.query?.pages || {}).map(p => ({ t: p.title, i: (p.imageinfo || [])[0] })).filter(x => x.i && /jpe?g|png/.test(x.i.mime) && !/map|distribution|range|icon|logo|flag|commons-|wiki/i.test(x.t)).slice(0, 12);
      if (!imgs.length) throw 0;
      const show = k => {
        const x = imgs[k], m = x.i.extmetadata || {};
        $('.gal-main', g).innerHTML = `<img src="${x.i.thumburl || x.i.url}" alt="${esc(name)}">`;
        $('.gal-cap', g).innerHTML = `${esc(stripTags(m.ImageDescription?.value).slice(0, 160))}<br>Photo: ${esc(stripTags(m.Artist?.value) || 'Wikimedia Commons')} · ${esc(m.LicenseShortName?.value || '')} · <a href="${x.i.descriptionurl}" target="_blank" rel="noopener">source & licence</a>`;
        $$('.gal-strip img', g).forEach((t, i) => t.classList.toggle('on', i === k));
      };
      $('.gal-strip', g).innerHTML = imgs.map((x, k) => `<img src="${x.i.thumburl || x.i.url}" data-k="${k}" alt="" loading="lazy">`).join('');
      $('.gal-strip', g).addEventListener('click', e => { const t = e.target.closest('[data-k]'); if (t) show(+t.dataset.k); });
      show(0);
    }).catch(() => {
      $('.gal-main', g).innerHTML = `<div class="gal-load">Couldn't load photos (are you offline?).<br><a href="https://en.wikipedia.org/wiki/${encodeURIComponent(title)}" target="_blank" rel="noopener">Open on Wikipedia →</a></div>`;
    });
}
document.addEventListener('click', e => { const b = e.target.closest('.ph[data-wiki]'); if (b) openGallery(b.dataset.wiki, b.dataset.name); });
window.addEventListener('hashchange', () => $('.gal')?.remove());

/* ---------- The hub: overview + grouped sections ---------- */
const SCOT_SECTIONS = {
  month: ['📅', 'This month', 'What to forage, brew and do this month, plus daylight and hazards.'],
  plants: ['🌿', 'Plant guide', `${SCOT_PLANTS.length} Scottish plants with photos, seasons, uses and lookalikes.`],
  danger: ['☠️', 'Deadly plants', `${SCOT_DANGER.length} poisonous plants and fungi, with photos.`],
  water: ['💧', 'Water & fire', 'Safe water from burns; tinder, fuel and the fire rules.'],
  shelter: ['⛺', 'Shelter & cold', 'Layers, hypothermia, wild camping and bothies.'],
  living: ['🥔', 'Food & stores', 'Scottish staples, root clamps, salting, fishing rules.'],
  hazards: ['🆘', 'Hazards & 999', 'Mountain rescue, ticks, midges, rivers, adders.'],
  brewing: ['🍺', 'Brewing', 'Fermenting in the cold and the Scottish brewing year.'],
  survival: ['🏕️', 'Survival brewing', 'No shops: wild yeast, home-made kit, vinegar.'],
  distilling: ['⚗️', 'Distilling', 'Licensed only: Scottish conditions, cuts and safety.'],
  law: ['⚖️', 'The law', 'What\'s allowed under Scotland\'s access rights.'],
  handbook: ['🖨️', 'Field handbook', 'Everything on 6 A4 pages to print or save as PDF.'],
};
const SCOT_GROUPS = [['Seasons & plants', ['month', 'plants', 'danger']], ['Staying alive', ['water', 'shelter', 'living', 'hazards']], ['Making drink', ['brewing', 'survival', 'distilling']], ['Rules & print', ['law', 'handbook']]];
const SCOT_ORDER = SCOT_GROUPS.flatMap(g => g[1]);
const SCOT_TABS = SCOT_ORDER.map(k => [k, SCOT_SECTIONS[k][0] + ' ' + SCOT_SECTIONS[k][1]]);

function pageScotland(el, tab) {
  const q = new URLSearchParams((location.hash.split('?')[1]) || '');
  if (!SCOT_SECTIONS[tab]) return scotOverview(el);
  const [em, title] = SCOT_SECTIONS[tab], gi = SCOT_GROUPS.findIndex(g => g[1].includes(tab)), [gname, gkeys] = SCOT_GROUPS[gi];
  const i = SCOT_ORDER.indexOf(tab), prev = SCOT_ORDER[i - 1], next = SCOT_ORDER[i + 1];
  el.innerHTML = `<div class="crumb-row"><nav class="crumbs"><a href="#/scotland">🦌 Off-grid Scotland</a><span>›</span><span>${gname}</span></nav>
      <label class="jump"><span class="sr">Jump to section</span><select id="sjump"><option value="" selected>☰ Jump to…</option><option value="__all">🦌 All sections</option>${SCOT_GROUPS.map(([g, ks]) => `<optgroup label="${g}">${ks.map(k => `<option value="${k}">${SCOT_SECTIONS[k][0]} ${SCOT_SECTIONS[k][1]}</option>`).join('')}</optgroup>`).join('')}</select></label></div>
    <h1 class="sec-h1">${em} ${title}</h1>
    <div class="subnav">${gkeys.map(k => `<a href="#/scotland/${k}" class="${k === tab ? 'on' : ''}">${SCOT_SECTIONS[k][0]} ${SCOT_SECTIONS[k][1]}</a>`).join('')}</div>
    <div id="sc"></div>
    <nav class="pager">${prev ? `<a href="#/scotland/${prev}"><small>← Previous</small><b>${SCOT_SECTIONS[prev][0]} ${SCOT_SECTIONS[prev][1]}</b></a>` : '<span></span>'}
      ${next ? `<a class="nx" href="#/scotland/${next}"><small>Next →</small><b>${SCOT_SECTIONS[next][0]} ${SCOT_SECTIONS[next][1]}</b></a>` : `<a class="nx" href="#/scotland"><small>Done →</small><b>🦌 All sections</b></a>`}</nav>`;
  $('#sjump', el).onchange = e => { const v = e.target.value; if (v) location.hash = v === '__all' ? '#/scotland' : '#/scotland/' + v; };
  store.set('scot.tab', tab);
  const box = $('#sc', el);
  ({ month: scotMonth, plants: scotPlants, danger: scotDanger, water: scotWater, shelter: scotShelter, living: scotLiving, hazards: scotHazards, law: scotLaw, brewing: scotBrewing, survival: scotSurvival, distilling: scotDistilling, handbook: scotHandbook })[tab](box, q);
  hydratePhotos(el);
}

function scotOverview(el) {
  const m = new Date().getMonth() + 1, d = SCOT_MONTHS[m - 1];
  const now = SCOT_PLANTS.filter(p => p.m.includes(m) && p.m.length < 12);
  const last = store.get('scot.tab', '');
  el.innerHTML = `<div class="eyebrow" style="color:${DRINK.scot.c}">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Off-grid Scotland</div><h1>Living off the land in Scotland</h1>
    <p class="lead">What to forage each month, what will kill you, water, fire, shelter, food, staying safe in the hills, the law, and turning it all into drink. Works offline once loaded, and prints as a handbook.</p>
    <a class="panel now-card" href="#/scotland/month"><div><div class="eyebrow">Right now · ${MONTH[m - 1]}</div><h2>${now.length} plants in season</h2>
      <p>${now.slice(0, 6).map(p => p.em + ' ' + p.n).join(' · ')}${now.length > 6 ? ' …' : ''}</p><p class="note">⚠️ ${d.risk.join(' · ')}</p></div><span class="go">Open →</span></a>
    ${last && SCOT_SECTIONS[last] ? `<div class="btns" style="margin:8px 0 0"><a class="btn sm" href="#/scotland/${last}">↩ Carry on: ${SCOT_SECTIONS[last][1]}</a></div>` : ''}
    ${typeof seasonWheel === 'function' ? seasonWheel() : ''}
    ${SCOT_GROUPS.map(([g, ks]) => `<h2>${g}</h2><div class="grid sec-grid">${ks.map(k => `<a class="card sec-tile" href="#/scotland/${k}"><span class="st-em">${SCOT_SECTIONS[k][0]}</span><div><h3>${SCOT_SECTIONS[k][1]}</h3><p>${SCOT_SECTIONS[k][2]}</p></div></a>`).join('')}</div>`).join('')}
    <h2>Also</h2><div class="grid sec-grid">
      <a class="card sec-tile" href="#/drink/scot"><span class="st-em">🪜</span><div><h3>Scottish skill ladder & recipes</h3><p>Nettle beer to field-to-glass ale.</p></div></a>
      <a class="card sec-tile" href="#/calc/forage"><span class="st-em">🧮</span><div><h3>Forage brew planner</h3><p>How strong will your foraged wine be?</p></div></a>
      <a class="card sec-tile" href="#/guide/scotland"><span class="st-em">📜</span><div><h3>History & legend</h3><p>Heather ale, bere barley, gruit.</p></div></a>
      <a class="card sec-tile" href="#/school"><span class="st-em">🎓</span><div><h3>Distilling course</h3><p>5 lessons with quizzes in Brew School.</p></div></a></div>`;
}

const plantCard = (p, m) => `<div class="panel splant" id="pl-${p.id}" style="--c:${['var(--ok)', 'var(--amber)', 'var(--danger)'][p.risk]}">
  ${photoBox(p.w, p.n, p.em)}
  <div class="sp-head"><span class="sp-em">${p.em}</span><div><h3>${p.n}</h3>${p.g ? `<span class="note"><i>${p.g}</i></span>` : ''}</div>
  <span class="pill c" style="margin-left:auto">${['Low risk', 'Take care', 'Deadly lookalike'][p.risk]}</span></div>
  <div class="months">${MON.map((x, i) => `<span class="${p.m.includes(i + 1) ? ((p.peak || p.m).includes(i + 1) ? 'in pk' : 'in') : ''} ${m === i + 1 ? 'now' : ''}">${x[0]}</span>`).join('')}</div>
  <p><b>Where:</b> ${p.where}</p><p><b>Use:</b> ${p.brew}</p><p><b>Identify:</b> ${p.id_}</p>
  <p class="${p.risk === 2 ? 'sp-danger' : ''}"><b>${p.risk === 2 ? '☠️ Lookalikes' : 'Lookalikes & cautions'}:</b> ${p.look}</p>
  ${p.recipe ? `<div class="btns"><a class="btn sm" href="#/recipe/${p.recipe}">Recipe →</a>${p.sugar > 1 ? `<a class="btn sm ghost" href="#/calc/forage?fruit=${p.id}">Plan a brew</a>` : ''}</div>` : (p.sugar > 1 ? `<div class="btns"><a class="btn sm ghost" href="#/calc/forage?fruit=${p.id}">Plan a brew</a></div>` : '')}
</div>`;

function scotMonth(box) {
  let m = store.get('scot.month', new Date().getMonth() + 1);
  const draw = () => {
    const d = SCOT_MONTHS[m - 1], cur = new Date().getMonth() + 1;
    const now = SCOT_PLANTS.filter(p => p.m.includes(m) && !(p.m.length === 12 && !(p.peak || []).includes(m)));
    const next = SCOT_PLANTS.filter(p => p.m.includes(m % 12 + 1) && !p.m.includes(m) && p.m.length < 12);
    box.innerHTML = `<div class="mon-pick">${MON.map((x, i) => `<button class="${i + 1 === m ? 'on' : ''} ${i + 1 === cur ? 'cur' : ''}" data-m="${i + 1}">${x}</button>`).join('')}</div>
      <div class="panel mon-hero"><div><div class="eyebrow">${m === cur ? 'This month' : 'Planning ahead'}</div><h2 style="margin:6px 0">${MONTH[m - 1]} in Scotland</h2><p>${d.w}</p></div>
        <div class="stats" style="margin:0">${stat('Daylight', d.day[0], 'h', 'central belt')}${stat('Shetland', d.day[1], 'h', 'daylight')}</div></div>
      <div class="grid two">
        <div class="panel"><div class="eyebrow" style="color:var(--hop)">🍺 Brew this month</div><ul class="ticks">${d.brew.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <div class="panel"><div class="eyebrow" style="color:var(--amber)">🏡 Off-grid jobs</div><ul class="ticks">${d.live.map(x => `<li>${x}</li>`).join('')}</ul></div>
      </div>
      <div class="callout warn"><b>Watch out</b><div>${d.risk.join(' · ')}</div></div>
      <h2>In season: ${now.length} plants</h2>
      <div class="tagcloud">${now.map(p => `<a class="chip" href="#/scotland/plants?p=${p.id}" style="${p.risk === 2 ? 'border-color:var(--danger)' : ''}">${p.em} ${p.n}${p.risk === 2 ? ' ☠️' : ''}</a>`).join('')}</div>
      ${next.length ? `<h3 style="margin-top:20px">Coming next month</h3><div class="tagcloud">${next.map(p => `<a class="chip dim" href="#/scotland/plants?p=${p.id}">${p.em} ${p.n}</a>`).join('')}</div>` : ''}
      <div class="btns" style="margin-top:20px"><button class="btn pri" id="remind">🔔 Remind me when things come into season</button><a class="btn ghost" href="#/scotland/handbook">🖨️ Print the handbook</a></div>
      <p class="note">☠️ = has a deadly lookalike. Daylight figures are approximate; the further north, the shorter the winter days and longer the summer ones.</p>`;
  };
  box.addEventListener('click', e => {
    const b = e.target.closest('[data-m]'); if (b) { m = +b.dataset.m; store.set('scot.month', m); draw(); return; }
    if (e.target.closest('#remind')) {
      const t = new Date(), y = t.getFullYear(); let n = 0;
      const existing = new Set(getRems().map(r => r.text));
      for (let k = 1; k <= 12; k++) {
        const mm = (t.getMonth() + k) % 12 + 1, yy = y + Math.floor((t.getMonth() + k) / 12);
        const starts = SCOT_PLANTS.filter(p => p.m.includes(mm) && !p.m.includes((mm + 10) % 12 + 1) && p.m.length < 12 && p.use !== 'food');
        if (!starts.length) continue;
        const text = `🦌 In season now in Scotland: ${starts.map(p => p.n).join(', ')}`;
        if (existing.has(text)) continue;
        addReminder({ date: `${yy}-${String(mm).padStart(2, '0')}-01`, text, href: '#/scotland/month' }); n++;
      }
      toast(n ? `${n} seasonal reminders added to your calendar` : 'Seasonal reminders are already set');
    }
  });
  draw();
}

function scotPlants(box, q) {
  let f = store.get('scot.pf', 'all'), s = '';
  const m = new Date().getMonth() + 1;
  box.innerHTML = `<div id="pfs"></div><div class="inp search" style="margin:10px 0"><input id="ps" type="search" placeholder="Search plants: rowan, gruit, coconut…"></div><div id="pl" class="grid two"></div>
    <p class="note">${SCOT_PLANTS.length} plants. Month strip: bold = peak, outlined = this month. This is a starting point, not a field guide: carry a proper guide (or learn on a foraging course) and never eat anything you can't identify with 100% certainty.</p>`;
  const draw = () => {
    const list = SCOT_PLANTS.filter(p => (f === 'all' || (f === 'now' ? p.m.includes(m) : p.use === f)) && (!s || (p.n + p.g + p.brew + p.where).toLowerCase().includes(s)));
    $('#pl', box).innerHTML = list.map(p => plantCard(p, m)).join('') || '<div class="empty">No plants match.</div>';
    hydratePhotos(box);
  };
  seg($('#pfs', box), [['all', 'All'], ['now', 'In season'], ['sugar', 'Fruit & sugar'], ['flavour', 'Flavour'], ['bitter', 'Bittering'], ['food', 'Food']], f, v => { f = v; store.set('scot.pf', v); draw(); });
  $('#ps', box).addEventListener('input', e => { s = e.target.value.trim().toLowerCase(); draw(); });
  if (q.get('p')) { f = 'all'; $$('#pfs button', box).forEach(b => b.classList.toggle('on', b.dataset.v === 'all')); }
  draw();
  if (q.get('p')) setTimeout(() => { const c = $('#pl-' + q.get('p'), box); if (c) { c.scrollIntoView({ block: 'center' }); c.classList.add('hl'); } }, 50);
}

function scotDanger(box) {
  box.innerHTML = `<div class="callout warn"><b>Rule one</b><div>If you are not 100% sure, don't pick it, don't taste it, don't brew with it. Most deadly plants in Scotland are in the carrot family (white umbrella-shaped flowers) and grow in <b>wet ground</b>: exactly where you'll be gathering water, meadowsweet and wild garlic.</div></div>
    <div class="danger-list">${SCOT_DANGER.map(([n, w, m, e, wk]) => `<div class="panel dg">${photoBox(wk, n, '☠️')}<h3>☠️ ${n}</h3><p><b>Where:</b> ${w}</p><p><b>Mistaken for:</b> ${m}</p><p><b>Effect:</b> ${e}</p></div>`).join('')}</div>
    <h2>Five habits that keep foragers alive</h2>
    <ol class="mini-steps"><li><b>Never forage white umbels</b> (flat umbrella flower heads) from the ground, except with an expert. Elderflower is safe only because it grows on a woody bush.</li>
    <li><b>Never use a hollow plant stem as a straw, pipe or siphon.</b> Hemlock and hogweed stems are both hollow. Carry a length of food-grade tube.</li>
    <li><b>One new plant at a time.</b> Try a small amount and wait 24 hours.</li>
    <li><b>Mushrooms: expert only.</b> Several Scottish species destroy the kidneys or liver with no symptoms for days.</li>
    <li><b>Apps are not enough.</b> Plant-ID apps have identified hemlock water dropwort as celery. Use them to suggest a name, then check every feature in a proper field guide.</li></ol>
    <div class="callout info"><b>Poisoned?</b><div>Call <b>999</b> if someone collapses, fits, or can't breathe. Otherwise call <b>NHS 24 on 111</b>. Keep a sample of the plant (in a bag, not in your mouth!) to show the doctors.</div></div>`;
}

function scotWater(box) {
  box.innerHTML = `<h2 style="margin-top:0">💧 Water</h2>
    <p class="prose">Scotland is one of the wettest countries in Europe, so finding water is rarely the problem. Making it <b>safe</b> is. Sheep, deer and cattle graze almost every catchment, and their dung carries <i>E. coli</i>, <i>Cryptosporidium</i> and <i>Giardia</i>. Crystal-clear burns can make you very ill.</p>
    <div class="grid two">
      <div class="panel"><div class="eyebrow" style="color:var(--hop)">Choosing a source</div><ul class="ticks">
        <li>Fast-flowing water from high up, <b>above</b> farms, sheep, houses, roads and bothies</li>
        <li>Springs coming straight out of the ground are the best</li>
        <li>Rainwater from a clean roof or tarp into clean containers</li>
        <li>Walk upstream a little to check for a dead sheep or deer</li>
        <li>Brown peaty water is fine once treated: it's just tannins from the peat (and it makes great dark ale)</li>
        <li>Avoid still pools, water below forestry spraying, and anything near old mine workings</li></ul></div>
      <div class="panel"><div class="eyebrow" style="color:var(--amber)">Making it safe</div><ul class="ticks">
        <li><b>Boil:</b> a full rolling boil for 1 minute kills all germs. The best method and free if you have fuel</li>
        <li><b>Filter first:</b> pour cloudy water through a cloth or a sand-and-charcoal filter, then boil</li>
        <li><b>Chlorine dioxide tablets:</b> light; wait the full time on the packet (up to 4 hours for <i>Cryptosporidium</i>)</li>
        <li><b>Hollow-fibre or ceramic filter:</b> removes germs but not chemicals; never let one freeze</li>
        <li><b>Sunlight (SODIS):</b> clear plastic bottle in full sun for 6 hours, 2 days if cloudy. In Scotland it's usually cloudy!</li></ul></div>
    </div>
    ${warn('<b>Wild watercress</b> growing where sheep graze can carry liver fluke. Don\'t eat it raw.')}
    <p class="note">Brewing water: Scottish water is very soft, which is ideal for pale ales and wines. Boiling it for brewing makes it safe at the same time.</p>
    <h2>🔥 Fire & fuel</h2>
    <div class="callout warn"><b>Fire law</b><div><b>Cairngorms National Park:</b> fires and barbecues are banned from 1 April to 30 September every year (fine up to £500). <b>Loch Lomond &amp; the Trossachs:</b> fire and wood-collecting rules apply in the Camping Management Zones from 1 March to 30 September. <b>Everywhere else:</b> the Access Code allows a small fire only if it's safe: never in dry spells, never on peat or near trees, buildings or crops. A stove is always better.</div></div>
    <div class="grid two">
      <div class="panel"><div class="eyebrow" style="color:var(--hop)">Tinder that works in Scottish weather</div><ul class="ticks">
        <li><b>Birch bark</b>: the papery outer layer from fallen birch burns even damp (oily). Peel from dead wood, not live trees</li>
        <li><b>Scots pine resin wood</b> ("fatwood") from old dead stumps</li>
        <li><b>King Alfred's cakes</b>: black ball fungus on dead ash; holds an ember</li>
        <li>Dry grass and bracken from under overhangs; thistle down; cotton wool + Vaseline from your kit</li></ul></div>
      <div class="panel"><div class="eyebrow" style="color:var(--amber)">Fuel & safety</div><ul class="ticks">
        <li>Only dead, fallen wood. <b>Never cut live trees</b> (needs the owner's permission)</li>
        <li>Birch, ash and oak burn best; split wood dries much faster</li>
        <li><b>Peat</b> was the Highland and island fuel for centuries, but cutting it needs peat rights (usually crofters). Peat fires can smoulder underground for weeks and start wildfires</li>
        <li><b>Carbon monoxide</b>: never run a stove or fire inside a closed tent or unventilated bothy</li>
        <li>Leave no trace: put it out completely with water, scatter cold ashes, return turf</li></ul></div>
    </div>`;
}

function scotShelter(box) {
  box.innerHTML = `<p class="prose">Scotland's danger isn't extreme cold, it's <b>wet plus wind</b>. A 5 °C day with rain and a 30 mph wind is enough to kill, and it happens in every month on the hills. Hypothermia is the number one off-grid risk here.</p>
    <div class="grid two">
      <div class="panel"><div class="eyebrow" style="color:var(--hop)">Clothing: layers</div><ul class="ticks">
        <li><b>Base:</b> wool or synthetic, never cotton ("cotton kills": it stays wet and cold)</li>
        <li><b>Mid:</b> fleece or wool jumper; a down or synthetic puffy for stops</li>
        <li><b>Shell:</b> waterproof jacket and trousers with a hood, even in summer</li>
        <li>Hat and gloves all year above 500 m; spare dry clothes in a dry bag</li>
        <li>Wool socks; boots that drain or keep water out</li></ul></div>
      <div class="panel"><div class="eyebrow" style="color:var(--amber)">Hypothermia: spot it</div><ul class="ticks">
        <li><b>Early:</b> shivering, cold hands, grumpy, clumsy ("umbles": stumbles, mumbles, fumbles)</li>
        <li><b>Act:</b> get out of the wind, add dry layers, hat on, eat and drink something warm and sweet, share body heat</li>
        <li><b>Serious:</b> shivering stops, confused, drowsy: call 999 now; handle gently, insulate from the ground</li>
        <li><b>Alcohol makes it worse</b>: it feels warm but dumps heat from your core. No drams until you're safe and warm</li></ul></div>
    </div>
    <h2>Where to sleep</h2>
    <div class="grid two">
      <div class="panel"><h3>⛺ Wild camping</h3><p>Legal on most unenclosed land under the Access Code, if done responsibly: small groups, 2–3 nights in one place, well away from houses, roads and fields with crops or animals. Leave no trace and bury toilet waste 30 m from water. <b>Loch Lomond &amp; the Trossachs:</b> a permit is needed in the Camping Management Zones from 1 March to 30 September.</p></div>
      <div class="panel"><h3>🛖 Bothies</h3><p>Free, unlocked shelters in remote places, most maintained by volunteers of the Mountain Bothies Association. Follow the Bothy Code: leave it cleaner than you found it, carry out rubbish, bring your own fuel, leave dry kindling for the next person, and make room for others.</p></div>
      <div class="panel"><h3>🌲 Natural shelter</h3><p>In an emergency: get out of the wind first. Use the lee side of boulders, banks, or a stand of conifers. Insulate from the ground with heather, bracken or your pack: you lose more heat to wet ground than to air. A cheap orange survival bag weighs 200 g and saves lives.</p></div>
      <div class="panel"><h3>🏚️ Longer term</h3><p>The old Highland "blackhouse" had thick stone-and-turf walls, a thatched roof held down with weighted ropes, a peat fire in the middle of the floor, and the cattle at one end for warmth. Thick walls, low profile, out of the wind, close to water and fuel: the same rules apply today.</p></div>
    </div>`;
}

function scotLiving(box) {
  box.innerHTML = `<p class="prose">For centuries people lived off Scottish land on a simple, tough diet. The same foods are still the best bet for anyone growing their own here: they cope with a short, cool, wet season.</p>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Food</th><th>Why it works in Scotland</th><th>How it was used</th></tr>
      <tr><td>🌾 <b>Oats</b></td><td>Thrive in cool, wet, acid soil</td><td>Porridge, oatcakes, brose (oatmeal + boiling water), skirlie, Atholl brose. Stored as meal in a wooden chest (a "girnal")</td></tr>
      <tr><td>🌾 <b>Bere / barley</b></td><td>Bere ripens in about 90 days in long northern summers</td><td>Bannocks, broth, malt for ale and whisky</td></tr>
      <tr><td>🥔 <b>Potatoes</b></td><td>Huge yield per acre; a Highland staple since the 1700s</td><td>Stored all winter in a clamp (see below)</td></tr>
      <tr><td>🥬 <b>Kale</b></td><td>Hardy through frost and gales; every cottage had a "kailyard"</td><td>Broth, greens all winter</td></tr>
      <tr><td>🟣 <b>Turnips (neeps)</b></td><td>Grow fast in cool weather, store well</td><td>Neeps, animal feed</td></tr>
      <tr><td>🐟 <b>Fish</b></td><td>Long coastline; sea fishing from the shore needs no licence</td><td>Salted, smoked, dried (Shetland and the Hebrides)</td></tr>
      <tr><td>🍯 <b>Honey</b></td><td>Heather honey is world-famous</td><td>Sugar for mead and cooking; keeps forever</td></tr>
      <tr><td>🌿 <b>Wild greens</b></td><td>Nettles, wild garlic, sorrel, seaweed</td><td>Spring vitamins after a long winter</td></tr></table></div>
    <h2>Storing food without power</h2>
    <div class="grid two">
      <div class="panel"><h3>🥔 Root clamp</h3><p>Pile dry, unwashed potatoes or neeps on a bed of straw on well-drained ground, cover with 20 cm of straw then 15 cm of soil, with a straw "chimney" for air. Keeps them through winter frost.</p></div>
      <div class="panel"><h3>🧂 Salting & smoking</h3><p>Fish and meat were packed in salt, smoked over peat or wood, or wind-dried in stone huts (Shetland "skeos"). Smoke the same way you dry malt.</p></div>
      <div class="panel"><h3>🫙 Drying & bottling</h3><p>Dry berries, apple rings, mushrooms (identified!) and herbs by a stove or in an airy loft. Dried fruit is your winter brewing sugar.</p></div>
      <div class="panel"><h3>🍷 Fermenting</h3><p>Wine and mead keep for years; fruit that would rot in a week becomes something that lasts. Wine left open turns to <b>vinegar</b>, which pickles vegetables and fish. <a href="#/guide/survival">Survival brewing guide →</a></p></div>
    </div>
    <h2>Rules for wild food</h2>
    <ul class="ticks"><li><b>Shellfish</b> (mussels, cockles) can carry toxins, especially in summer, and pollution near outfalls. Check Food Standards Scotland notices and cook thoroughly</li>
    <li><b>Fishing</b>: freshwater fishing always needs permission from whoever owns the fishing rights. Fishing for salmon or sea trout on a Sunday is illegal in Scotland</li>
    <li><b>Hunting</b> is not part of access rights: it needs the landowner's permission and the right firearms licence</li>
    <li>Take no more than you need and never strip a patch: leave plenty for wildlife and other people</li></ul>`;
}

function scotHazards(box) {
  box.innerHTML = `<div class="panel sos"><div class="eyebrow" style="color:var(--danger)">🆘 Emergency</div>
      <h2 style="margin:6px 0 10px">Dial 999 or 112 → ask for <u>Police</u> → then <u>Mountain Rescue</u></h2>
      <p>On the coast or at sea, ask for the <b>Coastguard</b>. In Scotland, Police Scotland call out all mountain rescue teams. Mountain rescue is free, any time, any weather.</p>
      <div class="grid two" style="margin-top:12px">
        <div><b>Before you go:</b> text <b>register</b> to <b>999</b> and follow the reply. A text needs far less signal than a call, but you can only text 999 if your phone is registered.</div>
        <div><b>Tell them:</b> where you are (grid reference or named place), how many people, injuries, your phone number. Then <b>stay put</b> and save battery.</div>
      </div>
      <p class="note" style="margin-top:10px">No signal? The mountain distress signal is <b>six</b> whistle blasts or torch flashes, then a minute's pause, repeated. The reply is three. Non-urgent medical help: <b>NHS 24 on 111</b>.</p></div>
    <div class="grid two">
      <div class="panel"><h3>🕷️ Ticks & Lyme disease</h3><p>The Highlands have some of the highest Lyme disease rates in the UK. Ticks wait on bracken, heather and long grass, mostly from spring to autumn. Wear long trousers tucked into socks, check your whole body every evening, and remove ticks with a tick-twister (twist, don't squeeze). See a GP if you get a spreading red rash or flu-like illness within weeks.</p></div>
      <div class="panel"><h3>🦟 Midges</h3><p>May to September, worst on still, damp, cloudy days and at dawn and dusk, especially in the west. A head net is the only sure defence. Camp on breezy, high ground. Bog myrtle was the traditional repellent.</p></div>
      <div class="panel"><h3>🌊 Rivers & tides</h3><p>Burns rise frighteningly fast after rain or snowmelt: a calm ford in the morning can be impassable by afternoon. Never cross a river in spate; wait or walk round. Watch the tides on sandflats and causeways, especially the Solway.</p></div>
      <div class="panel"><h3>⛰️ Weather & mountains</h3><p>Check the Mountain Weather Information Service (MWIS) or the Met Office mountain forecast. In winter, check the Scottish Avalanche Information Service (SAIS). Carry a paper map and compass: phones die in the cold.</p></div>
      <div class="panel"><h3>🐍 Adders</h3><p>Scotland's only venomous snake. Bites are rare and almost never fatal, but go to hospital: keep calm and still, remove rings and watches, don't cut or suck the bite.</p></div>
      <div class="panel"><h3>🐄 Animals & stalking</h3><p>Cows with calves are dangerous: keep well clear and let a dog go if chased. Keep dogs on leads near sheep, especially at lambing (March–May). During deer stalking (mainly July–February), check the "Heading for the Scottish Hills" service and follow estate advice.</p></div>
    </div>
    <h2>Off-grid first-aid kit</h2>
    <ul class="ticks"><li>Survival bag, whistle, head torch, foil blanket</li><li>Tick remover, midge net, antihistamine</li><li>Blister plasters, tape, wound dressings, bandages, triangular bandage</li><li>Painkillers, rehydration salts, any personal medication</li><li>Water purification tablets, a lighter and a fire steel</li><li>Paper OS map in a waterproof case, compass, power bank</li></ul>`;
}

function scotLaw(box) {
  const row = (t, ok, d) => `<tr><td><b>${t}</b></td><td>${ok}</td><td>${d}</td></tr>`;
  box.innerHTML = `<p class="prose">Scotland has some of the best access rights in the world, thanks to the Land Reform (Scotland) Act 2003 and the Scottish Outdoor Access Code. But they come with responsibilities, and some things always need permission. This is a plain-English summary, not legal advice.</p>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Activity</th><th>Allowed?</th><th>Details</th></tr>
      ${row('Walking, cycling, wild camping', '✅ Yes', 'On most land and inland water, responsibly. Not in gardens, fields of crops, or near houses. Permit zones in Loch Lomond &amp; the Trossachs, 1 March–30 September.')}
      ${row('Picking berries, flowers, fungi for yourself', '✅ Yes', 'Customary picking for your own use is accepted. Take only what you need.')}
      ${row('Foraging to sell', '❌ Permission', 'Commercial gathering isn\'t covered by access rights: ask the landowner.')}
      ${row('Uprooting any wild plant', '❌ Permission', 'An offence without the landowner\'s permission (Wildlife and Countryside Act 1981). Specially protected plants: never.')}
      ${row('Tapping birch trees, cutting live wood', '❌ Permission', 'The tree belongs to the landowner. Ask first.')}
      ${row('Lighting fires', '⚠️ Depends', 'Responsibly only, never in dry spells. Banned 1 April–30 September in the Cairngorms National Park (up to £500 fine).')}
      ${row('Cutting peat', '❌ Rights needed', 'Only with peat-cutting rights (usually crofters) or the owner\'s permission.')}
      ${row('Freshwater fishing', '❌ Permission', 'Fishing rights are privately owned: buy a permit. No salmon or sea trout fishing on Sundays.')}
      ${row('Sea fishing from the shore', '✅ Yes', 'No licence needed; respect size limits and local rules.')}
      ${row('Hunting & shooting', '❌ Permission', 'Excluded from access rights. Needs the landowner and the right licences.')}
      ${row('Brewing beer, wine, cider, mead at home', '✅ Yes', 'Legal for your own use with no licence (since 1963). You can give it away but not sell it without licences and duty.')}
      ${row('Distilling', '❌ Licence', 'Only with an HMRC distiller\'s licence, whatever the size of the still. <a href="#/guide/survival-still">Licensed guide →</a>')}
      ${row('Calling it "Scotch whisky"', '⚠️ Protected', 'Only if made in Scotland from malted barley (plus other cereals for grain whisky), matured in oak casks in Scotland for at least 3 years, and bottled at 40% or more.')}
    </table></div>
    <h2>The three Access Code principles</h2>
    <div class="grid"><div class="panel"><h3>🙋 Take responsibility</h3><p>For your own actions and safety.</p></div><div class="panel"><h3>🤝 Respect others</h3><p>Their privacy, livelihoods and land.</p></div><div class="panel"><h3>🌿 Care for the environment</h3><p>Leave it as you found it.</p></div></div>`;
}

function scotBrewing(box) {
  box.innerHTML = `<h2 style="margin-top:0">Fermenting in a cold country</h2>
    <p class="prose">Scotland's problem is the opposite of most brewing advice: it's rarely too warm. Unheated sheds, bothies and crofts sit at 5–14 °C for much of the year, where ale and wine yeasts slow right down or stop.</p>
    <div class="grid two">
      <div class="panel"><h3>🔥 Keeping a brew warm off-grid</h3><ul class="ticks"><li>Put the fermenter in a <b>hay box</b>: a crate packed with straw, wool or old blankets</li><li>Next to (not on) the stove, or in the warmest room at night</li><li>Swap in bottles of hot water morning and evening</li><li>Use a bigger batch: more liquid holds heat longer</li><li>Start your yeast warm (20–25 °C) and it makes its own heat for the first days</li></ul></div>
      <div class="panel"><h3>❄️ Using the cold</h3><ul class="ticks"><li>Winter is perfect for slow, clean ferments: mead and fruit wines taste better for it</li><li>Lager-style beers ferment happily at 8–12 °C if you have lager yeast</li><li>An outhouse in January is a free fridge for clearing wine and conditioning bottles</li><li>Summer (15–19 °C indoors) is ideal for ales and wild ferments</li></ul></div>
    </div>
    <h2>The Scottish brewing year</h2>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Season</th><th>Brew</th></tr>
      <tr><td>Mar–Apr</td><td><a href="#/recipe/birch-wine">Birch sap wine</a>, <a href="#/recipe/nettle-beer">nettle beer</a></td></tr>
      <tr><td>Apr–May</td><td><a href="#/recipe/gorse-wine">Gorse wine</a>, dandelion wine, spruce-tip beer</td></tr>
      <tr><td>Jun–Jul</td><td><a href="#/recipe/elderflower-wine">Elderflower wine</a>, meadowsweet mead, wild raspberry melomel</td></tr>
      <tr><td>Aug–Sep</td><td><a href="#/recipe/heather-ale">Heather ale</a>, <a href="#/recipe/blaeberry-wine">blaeberry wine</a>, <a href="#/recipe/blackberry-wine">bramble wine</a></td></tr>
      <tr><td>Sep–Nov</td><td><a href="#/recipe/rowan-wine">Rowan &amp; crab apple</a>, elderberry, rosehip, haw and sloe wines; wild cider</td></tr>
      <tr><td>Dec–Feb</td><td>Heather-honey mead, <a href="#/recipe/orkney-ale">home-malted ale</a>, <a href="#/recipe/atholl-brose">Atholl brose</a></td></tr></table></div>
    <h2>Recipes</h2><div class="grid">${Recipes.filter(r => r.drink === 'scot').map(recipeCard).join('')}</div>
    <div class="btns"><a class="btn pri" href="#/calc/forage">🧮 Forage brew planner</a><a class="btn" href="#/drink/scot">🪜 Skill ladder</a><a class="btn ghost" href="#/guide/scotland">📜 History & legend</a></div>`;
}

function scotSurvival(box) {
  const sec = (h, em, t, d) => `<a class="card" href="${h}"><div style="font-size:26px;margin-bottom:6px">${em}</div><h3>${t}</h3><p>${d}</p></a>`;
  box.innerHTML = `<p class="prose">If the shops shut and the internet went down, this is how you'd keep making drink in Scotland with nothing bought: wild yeast, foraged sugar, home-made kit. The full guide covers it step by step; here's how it fits the Scottish year.</p>
    <div class="callout info"><b>Full guide</b><div><a href="#/guide/survival">Off-grid & survival brewing: no shops, no internet →</a> (10 sections, 15 minutes)</div></div>
    <div class="grid">
      ${sec('#/guide/survival', '🍯', 'Sugar from the land', 'Birch sap in March, heather honey, blaeberries, brambles, rowan and crab apples in autumn, dried fruit for winter.')}
      ${sec('#/recipe/wild-yeast-starter', '🦠', 'Catch & keep yeast', 'Blaeberries, sloes and crab apples carry plenty of wild yeast. Dry your best sediment on wood or cloth for next year.')}
      ${sec('#/guide/survival', '🪣', 'Vessels & airlocks', 'Crocks, glass jars and barrels; a tube into a cup of water as an airlock. Never a hollow plant stem.')}
      ${sec('#/guide/survival', '📏', 'No hydrometer?', 'Measure sugar by weight and taste; the egg-float test; 17 g sugar per litre ≈ 1%.')}
      ${sec('#/guide/survival', '💪', 'Maximum strength', 'Step-feed honey to a strong saved yeast for 14–18% without a still.')}
      ${sec('#/guide/survival', '🫙', 'Vinegar', 'Wine left open becomes vinegar: pickles fish, kale and neeps through a Scottish winter.')}
    </div>
    <h2>Off-grid in Scotland: what changes</h2>
    <ul class="ticks"><li><b>Cold:</b> wild ferments crawl below 12 °C. Start them warm and use a hay box (see Brewing)</li>
    <li><b>Water:</b> plentiful, but boil it, which also sterilises your kit</li>
    <li><b>Fuel:</b> boiling wort and water takes a lot of wood; dead fallen wood only, and check fire rules</li>
    <li><b>Season:</b> the big brewing sugar arrives August–October. Dry fruit and store honey then, or you'll have nothing to brew in spring</li>
    <li><b>Grain:</b> bere and oats are the crops that ripen here: malt them for ale (<a href="#/recipe/orkney-ale">recipe</a>)</li></ul>
    <h2>Skill ladders</h2><div class="btns"><a class="btn pri" href="#/drink/scot">🦌 Off-grid Scotland ladder</a><a class="btn" href="#/drink/wild">🏕️ Survival brewing ladder</a></div>`;
}

function scotDistilling(box) {
  box.innerHTML = `<div class="callout warn"><b>Legal first</b><div>In Scotland (as everywhere in the UK) you can only distil with an <b>HMRC distiller's licence</b>, and you must follow its conditions, whatever the size of the still. Never sell or give away spirit without the right licences and duty paid. Everything here assumes you hold a licence.</div></div>
    <p class="prose">Scotland is the spiritual home of the pot still. For two centuries, Highland smugglers ran small copper stills in hidden bothies beside burns, using peat fires for heat and cold burn water for the condenser. The same basic set-up is in the full guide, done safely.</p>
    <div class="callout info"><b>Full guide</b><div><a href="#/guide/survival-still">Survival distilling: building & running a simple pot still safely →</a> (11 sections: parts, safe materials, three improvised builds, the wash, set-up, running, cuts, troubleshooting, non-negotiables)</div></div>
    <div class="grid two">
      <div class="panel"><h3>🌊 Scotland's advantages</h3><ul class="ticks">
        <li><b>Cold water everywhere:</b> burn water at 5–10 °C makes a very efficient condenser (a coil sitting in a bucket fed from the burn)</li>
        <li><b>Grain:</b> home-malted bere or barley makes a whisky-style wash (<a href="#/recipe/orkney-ale">malting steps</a>; skip the herbs)</li>
        <li><b>Heather honey</b> makes a clean, floral honey wash</li>
        <li><b>Cool weather</b> keeps the collection jars cool, so less alcohol is lost</li></ul></div>
      <div class="panel"><h3>⚠️ Scotland's risks</h3><ul class="ticks">
        <li><b>Fire:</b> an open flame under a still is the most dangerous set-up there is. Alcohol vapour catches fire. Run it outdoors or well ventilated, never in a closed bothy or tent, with a fire blanket and water to hand</li>
        <li><b>Peat and wood fires</b> are hard to control. Steady, gentle heat matters more than speed; a water bath or sand bath makes it much safer</li>
        <li><b>Fruit washes</b> (bramble, rowan, crab apple, elderberry) make more methanol: discard bigger foreshots</li>
        <li><b>Fire rules:</b> no open flames outdoors in the Cairngorms from 1 April to 30 September</li></ul></div>
    </div>
    <h2>The cuts, in one table</h2>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Part</th><th>What it is</th><th>What to do</th></tr>
      <tr><td><b>Foreshots</b></td><td>The first drips: methanol and acetone, smells like solvent or nail varnish</td><td><b>Always throw away.</b> At least 50 ml per 20 L of wash (100 ml+ for fruit)</td></tr>
      <tr><td><b>Heads</b></td><td>Sharp, solvent-like, harsh</td><td>Collect in small numbered jars; keep separate</td></tr>
      <tr><td><b>Hearts</b></td><td>Clean, sweet, smooth: the spirit you keep</td><td>Collect in numbered jars; blend the best ones by smell and taste (diluted)</td></tr>
      <tr><td><b>Tails</b></td><td>Wet cardboard, oily, wet dog; strength falls fast</td><td>Stop collecting or keep separate for the next run</td></tr></table></div>
    <h2>Non-negotiables</h2>
    <ol class="mini-steps"><li>Licence first.</li><li>Only copper, stainless steel or glass touch hot vapour or spirit. <b>No plastic, lead solder, galvanised metal or aluminium.</b></li><li>Never seal the still: it must always be open to the air through the condenser.</li><li>Fill the pot no more than two-thirds.</li><li>Always discard the foreshots.</li><li>Never leave it running unattended; no smoking or flames near the collection jars.</li><li>Dilute to drinking strength before tasting, and drink responsibly.</li></ol>
    <div class="btns"><a class="btn pri" href="#/guide/survival-still">⚗️ Full distilling guide</a><a class="btn" href="#/calc/still">🧮 Still run planner</a><a class="btn ghost" href="#/guide/distilling-history">📜 Smugglers & bothy stills</a></div>`;
}

function scotHandbook(box) {
  const cell = s => String(s).replace(/<a [^>]*>|<\/a>/g, '');
  box.innerHTML = `<div class="callout info"><b>Offline</b><div>Print this page or save it as a PDF (in the print dialog choose "Save as PDF") and keep a copy in your pack. Phones die; paper doesn't.</div></div>
    <div class="btns"><button class="btn pri" id="hbp">🖨️ Print / save as PDF</button></div>
    <div id="hb" class="handbook">
      <h1>Off-grid Scotland: field handbook</h1><p class="note">Brew Lab · ${nice(today())}</p>
      <h2>🆘 Emergency</h2><p><b>999 / 112 → Police → Mountain Rescue</b> (Coastguard on the coast). Register for text: send <b>register</b> to 999 before you go. Give location, casualties, phone number; stay put. Distress: 6 blasts or flashes a minute (reply 3). NHS 24: 111.</p>
      <h2>📅 Forage & brew calendar</h2>
      <table class="tbl"><tr><th>Month</th><th>In season</th><th>Brew</th><th>Watch out</th></tr>
        ${SCOT_MONTHS.map((d, i) => `<tr><td><b>${MON[i]}</b></td><td>${SCOT_PLANTS.filter(p => p.m.includes(i + 1) && p.m.length < 12).map(p => p.n + (p.risk === 2 ? ' ☠' : '')).join(', ') || '—'}</td><td>${d.brew.slice(0, 3).join('; ')}</td><td>${d.risk.join('; ')}</td></tr>`).join('')}</table>
      <h2>☠️ Deadly plants</h2>
      <table class="tbl"><tr><th>Plant</th><th>Mistaken for</th><th>Notes</th></tr>${SCOT_DANGER.map(([n, , m, e]) => `<tr><td><b>${n}</b></td><td>${m}</td><td>${e}</td></tr>`).join('')}</table>
      <p><b>Rules:</b> never forage white umbels from the ground · never use a hollow stem as a straw or siphon · one new plant at a time · mushrooms with an expert only.</p>
      <h2>🌿 Plants for brewing</h2>
      <table class="tbl"><tr><th>Plant</th><th>Months</th><th>Use</th><th>Caution</th></tr>${SCOT_PLANTS.filter(p => p.use !== 'food').map(p => `<tr><td><b>${p.n}</b></td><td>${(p.peak || p.m).length === 12 ? 'All year' : (p.peak || p.m).map(x => MON[x - 1]).join(' ')}</td><td>${cell(p.brew)}</td><td>${p.risk ? cell(p.look) : '—'}</td></tr>`).join('')}</table>
      <h2>💧 Water</h2><p>Collect high, fast-flowing, above livestock and houses. Filter through cloth, then boil for 1 minute (or use tablets for the full time on the packet). Peaty brown water is safe once treated.</p>
      <h2>🔥 Fire</h2><p>No fires 1 Apr–30 Sep in the Cairngorms. Elsewhere only small, safe fires: never on peat, near trees or in dry spells. Dead fallen wood only. Tinder: birch bark, pine fatwood, King Alfred's cakes. No stoves in closed tents (carbon monoxide).</p>
      <h2>🧥 Cold</h2><p>Wet + wind = hypothermia in any month. Wool or synthetic layers, waterproofs, hat and gloves. Signs: shivering, stumbling, mumbling, fumbling. Shelter, dry layers, warm sweet drinks, no alcohol.</p>
      <h2>🍺 Brewing ratios</h2><p>17 g sugar per litre ≈ 1% alcohol · honey ≈ 80% sugar · 1 kg sugar in 4.5 L ≈ 1.085 SG ≈ 11–12% · fruit wine: 1.5–2.5 kg fruit + 1 kg sugar or 1.25 kg honey per 4.5 L · wild yeast tops out around 8–12% · freeze rowan, cook elderberries, strain rosehips.</p>
      <h2>🏕️ Survival brewing</h2><p>Catch yeast in a jar of honey water with unwashed berries; save and dry your best sediment. Airlock = tube into a cup of water. Boil water and kit. Dry fruit and store honey in autumn for spring brewing. Step-feed honey for 14–18% without a still. Wine left open becomes vinegar for pickling.</p>
      <h2>⚗️ Distilling (HMRC licence only)</h2><p>Copper, stainless steel or glass only: no plastic, lead solder, galvanised metal or aluminium. Never seal the still. Fill the pot no more than ⅔. Gentle, steady heat (water or sand bath); outdoors or well ventilated; fire blanket and water ready; never unattended. <b>Always discard foreshots</b>: at least 50 ml per 20 L of wash, 100 ml+ for fruit. Collect heads, hearts and tails in small numbered jars; keep only clean hearts. Cool burn water makes a good condenser.</p>
      <h2>⚖️ Law</h2><p>Personal-use foraging OK; selling, uprooting, tapping trees, cutting peat, freshwater fishing and hunting need permission. Home brewing legal without a licence; distilling needs an HMRC licence.</p>
    </div>`;
  $('#hbp', box).onclick = () => { document.body.classList.add('printing-hb'); window.print(); setTimeout(() => document.body.classList.remove('printing-hb'), 500); };
}
