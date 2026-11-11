/* Brew School advanced module: Distilling (licensed UK / NZ personal use). 5 lessons with quizzes. */
const DLESSONS = [
{ id: 'd1', t: 'What distilling is (and the law)', mins: 4, em: '⚖️',
  body: `<p>Distilling does <b>not make alcohol</b>. Yeast does that, in the fermented "wash". A still only <b>separates</b> the alcohol that's already there, so it can't be stronger or better than the wash you put in.</p>
  <p>It works because alcohol (ethanol) boils at about <b>78 °C</b> and water at <b>100 °C</b>. Heat the wash gently and the vapour coming off is richer in alcohol than the liquid. Cool that vapour and it condenses back into a stronger liquid: the spirit.</p>
  <p><b>The law comes first.</b> In the UK, including Scotland, you need an <b>HMRC distiller's licence</b> to distil at all, however small the still and even for your own use. New Zealand allows distilling for personal use. Nowhere lets you sell spirit without licences and duty.</p>`,
  keys: ['A still separates alcohol; it doesn\'t make it', 'Ethanol boils ≈78 °C, water 100 °C', 'UK: HMRC licence needed, whatever the size'],
  links: [['#/guide/survival-still', 'Full distilling guide'], ['#/guide/distilling-history', 'History of distilling']],
  quiz: [
    { q: 'Where does the alcohol in a spirit come from?', o: ['The still makes it', 'The yeast, during fermentation of the wash', 'The copper', 'Adding sugar to the spirit'], a: 1, why: 'The still only concentrates alcohol that fermentation already made.' },
    { q: 'Why does distilling work?', o: ['Alcohol is heavier than water', 'Alcohol boils at a lower temperature than water', 'Copper attracts alcohol', 'Water evaporates first'], a: 1, why: 'Ethanol boils at about 78 °C, so the vapour is richer in alcohol.' },
    { q: 'In Scotland, can you distil a little at home for your own use without a licence?', o: ['Yes, under 5 litres', 'Yes, if it\'s not sold', 'No: you need an HMRC licence', 'Only whisky'], a: 2, why: 'UK law needs a licence for any distilling, whatever the size.' },
  ] },
{ id: 'd2', t: 'The pot still & safe materials', mins: 5, em: '⚗️',
  body: `<p>A simple <b>pot still</b> has four parts: a <b>boiler</b> (pot) to heat the wash, a <b>head</b> or riser where vapour collects, a <b>condenser</b> where cold water turns vapour back to liquid, and an <b>outlet</b> into small collection jars.</p>
  <p>Only <b>copper, stainless steel or glass</b> should touch hot vapour or spirit. Copper also removes sulphur smells. <b>Never</b> use plastic, rubber, lead solder, galvanised (zinc-coated) metal or aluminium: hot alcohol pulls toxins out of them.</p>
  <p>The most important rule: a still must <b>never be sealed</b>. It must always be open to the air through the condenser, or pressure builds and it can burst.</p>`,
  keys: ['Boiler → head → condenser → jars', 'Copper, stainless or glass only', 'Never sealed: always open through the condenser'],
  links: [['#/guide/survival-still', 'Parts & materials (sections 2–4)']],
  quiz: [
    { q: 'Which of these is safe for parts that touch hot spirit vapour?', o: ['Plastic tubing', 'Galvanised steel', 'Copper', 'Lead-soldered joints'], a: 2, why: 'Copper, stainless steel and glass are safe; the others leach toxins.' },
    { q: 'What does the condenser do?', o: ['Heats the wash', 'Cools vapour back into liquid', 'Filters out methanol', 'Adds flavour'], a: 1, why: 'Cold water around a coil or pipe turns the vapour back into liquid spirit.' },
    { q: 'Why must a still never be sealed shut?', o: ['It tastes better open', 'Pressure would build up and it could burst', 'It needs oxygen to work', 'It\'s the law'], a: 1, why: 'Heated vapour needs a free path out through the condenser.' },
  ] },
{ id: 'd3', t: 'The wash', mins: 4, em: '🪣',
  body: `<p>The wash is just a fermented liquid, usually <b>8–12%</b>. Sugar or honey washes make a clean neutral spirit; a <b>grain</b> wash (malted barley, like bere) gives whisky-style spirit; <b>fruit</b> washes give brandy-style spirit but contain more <b>methanol</b> from the fruit's pectin.</p>
  <p>Ferment it fully dry, then let it <b>settle and clear</b>. Siphon it off the sediment: yeast and solids in the pot can scorch and give burnt, harsh flavours.</p>
  <p>Fill the pot <b>no more than two-thirds</b>, so foam can't surge up into the condenser.</p>`,
  keys: ['Wash ≈ 8–12%, fermented fully dry', 'Fruit washes = more methanol', 'Clear wash; fill the pot ≤ ⅔'],
  links: [['#/calc/still', 'Still run planner'], ['#/recipe/orkney-ale', 'Malting grain (Orkney ale)']],
  quiz: [
    { q: 'Which wash makes the most methanol?', o: ['Sugar', 'Honey', 'Fruit', 'Malted barley'], a: 2, why: 'Fruit pectin breaks down to methanol, so fruit washes need bigger discards.' },
    { q: 'Why clear the wash before distilling?', o: ['To make it stronger', 'Sediment scorches and gives harsh, burnt flavours', 'It\'s easier to pour', 'To remove sugar'], a: 1, why: 'Solids on the bottom of a heated pot burn.' },
    { q: 'How full should the pot be?', o: ['Full to the top', 'No more than two-thirds', 'A quarter', 'It doesn\'t matter'], a: 1, why: 'Leaves room for foam so it can\'t push into the condenser.' },
  ] },
{ id: 'd4', t: 'Running the still & the cuts', mins: 6, em: '✂️',
  body: `<p>Heat <b>gently and steadily</b>. As it comes up to temperature the first spirit drips out. Collect it in <b>small numbered jars</b>, so you can sort it later.</p>
  <ol><li><b>Foreshots</b>: the very first drips. They contain methanol and acetone (smells of solvent or nail varnish). <b>Always throw them away</b>: at least 50 ml per 20 L of wash, more for fruit.</li>
  <li><b>Heads</b>: sharp, solvent-like, harsh. Keep separate.</li>
  <li><b>Hearts</b>: clean, sweet and smooth. This is the spirit you keep.</li>
  <li><b>Tails</b>: wet cardboard, oily, "wet dog", as the strength falls. Stop, or keep separate.</li></ol>
  <p>Choosing where heads end and tails start is called making the <b>cuts</b>. Judge each jar by smell, and by taste only after diluting a few drops.</p>`,
  keys: ['Gentle, steady heat; small numbered jars', 'Always discard foreshots', 'Keep only clean hearts'],
  links: [['#/guide/survival-still', 'Running & cuts (sections 7–8)'], ['#/scotland/distilling', 'Distilling in Scotland']],
  quiz: [
    { q: 'What must always be thrown away?', o: ['Hearts', 'Foreshots', 'Tails', 'The whole run'], a: 1, why: 'Foreshots carry the most methanol and acetone.' },
    { q: 'Which part is the clean spirit you keep?', o: ['Foreshots', 'Heads', 'Hearts', 'Tails'], a: 2, why: 'Hearts are the clean middle of the run.' },
    { q: 'Why collect in many small jars?', o: ['It looks nice', 'So you can judge each part and make the cuts accurately', 'It cools faster', 'It\'s required by law'], a: 1, why: 'Small jars let you separate heads, hearts and tails precisely.' },
  ] },
{ id: 'd5', t: 'Safety, dilution & ageing', mins: 5, em: '🔥',
  body: `<p>Alcohol vapour <b>catches fire easily</b>. Run outdoors or somewhere well ventilated, never in a closed room, tent or bothy. Keep a fire blanket and water to hand. Keep flames and smoking away from the jars, and <b>never leave a running still unattended</b>.</p>
  <p>Open flames are the riskiest heat source. A <b>water bath</b> or sand bath gives gentle, even heat and is much safer.</p>
  <p>Fresh hearts are often 60–70%. <b>Dilute</b> slowly with clean water to drinking strength (about 40%). The still run planner works out how much water. Oak ageing (chips or sticks) adds colour and softens the spirit over weeks to months.</p>`,
  keys: ['Ventilation, fire blanket, never unattended', 'Water or sand bath beats open flame', 'Dilute to ≈40% before drinking'],
  links: [['#/calc/still', 'Dilution calculator'], ['#/guide/survival-still', 'The non-negotiables (section 11)']],
  quiz: [
    { q: 'What\'s the safest way to heat a small pot still?', o: ['A blowtorch', 'A water or sand bath', 'An open campfire', 'A sealed pressure cooker'], a: 1, why: 'Gentle, even heat with no flame near the vapour.' },
    { q: 'Where should you never run a still?', o: ['Outdoors', 'A well-ventilated shed', 'A closed tent or bothy', 'With a fire blanket nearby'], a: 2, why: 'Vapour builds up and can ignite, and fires produce carbon monoxide.' },
    { q: 'Fresh hearts at 65%: what next?', o: ['Drink it neat', 'Dilute slowly to about 40%', 'Add more foreshots', 'Seal it in plastic'], a: 1, why: 'Dilute to drinking strength; the planner calculates the water.' },
  ] },
];
