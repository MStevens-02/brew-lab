/* Brew Lab — survival section: building & running a simple pot still safely (legal contexts only),
   plus a still run planner / dilution calculator. */

Guides.push({ id: 'survival-still', title: 'Survival distilling: building & running a simple pot still safely', drink: 'wild', mins: 18, level: 'Expert · licensed / NZ only',
  summary: 'If you\'re legally allowed to distil (New Zealand, or a UK HMRC licence), here\'s how a simple pot still works, what it must and must never be made of, improvised builds, running the cuts, and the safety rules that matter.',
  html: `
<div class="callout warn"><b>Read first</b><div><b>Only distil where it's legal.</b> In the UK you need an HMRC licence (and must follow its conditions, including rules on owning a still), even for personal use. In New Zealand distilling for your own consumption is legal; selling isn't. Elsewhere, check your local law.<br><br><b>It's genuinely dangerous done badly:</b> fire, burst equipment and contaminated spirit are the real risks. Most of them come from <b>pressure</b> and <b>bad materials</b>. If you can, learn your first run with an experienced distiller or club.</div></div>

<h3>1. The idea in one paragraph</h3>
<p>You start with a fully fermented, clear liquid (the <b>wash</b>, a bit like strong unhopped beer or rough wine). Alcohol boils at about <b>78 °C</b> and water at <b>100 °C</b>, so when you heat the wash gently, the vapour coming off contains much more alcohol than the liquid. That vapour travels up and out through a pipe, gets cooled until it turns back into liquid, and drips out as spirit. A still doesn't create alcohol; it <b>separates</b> what fermentation already made.</p>

<h3>2. The four parts of a pot still</h3>
<div class="hist-grid">
<div class="panel"><h3>① Boiler (pot)</h3><p>Holds the wash over a gentle heat. It needs a lid that seals well enough to direct the vapour, but it is <b>never</b> a pressure vessel.</p></div>
<div class="panel"><h3>② Head / riser</h3><p>A short tube or dome above the pot. A little height helps any splashes fall back. A thermometer here tells you the vapour temperature.</p></div>
<div class="panel"><h3>③ Condenser</h3><p>Cools the vapour back to liquid: a copper coil ("worm") in a bucket of cold water, or a tube inside a water jacket (Liebig).</p></div>
<div class="panel"><h3>④ Outlet & jars</h3><p><b>Always open to the air.</b> Spirit drips into small glass jars. Nothing at the outlet should ever be sealed or capped.</p></div>
</div>

<h3>3. Materials: what's safe and what isn't</h3>
<table class="tbl"><tr><th>Part</th><th>✅ Use</th><th>❌ Never use</th></tr>
<tr><td>Boiler</td><td>Stainless steel stockpot, stainless milk churn or keg <i>with an open, unrestricted outlet</i>; a pressure cooker with the weight removed and the safety valve left working; heavy enamelled pot (no chips)</td><td>Gas cylinders; anything you'd clamp shut; galvanised buckets/bins; chipped enamel; plastic; unknown or painted metal; aluminium if you have any alternative (acidic washes corrode it)</td></tr>
<tr><td>Vapour pipe & coil</td><td><b>Copper</b> (best: it also removes sulphur off-flavours) or stainless steel; borosilicate lab glass</td><td>Car or heater <b>radiators</b>; anything with <b>lead solder</b>; galvanised or brass of unknown origin; PVC, rubber or any plastic hose</td></tr>
<tr><td>Joints & seals</td><td><b>Flour paste</b> (flour or rye flour + water, smeared over joints, the traditional "slobber"); food-grade silicone; compression fittings; lead-free (silver-bearing) solder</td><td>Lead solder; bathroom sealant; glue; tape on hot parts</td></tr>
<tr><td>Cooling water</td><td>Any clean water; silicone or garden hose is fine for <i>water only</i></td><td></td></tr>
<tr><td>Collection</td><td>Small glass jars or bottles</td><td>Plastic bottles (spirit dissolves some plastics); one big container (you can't make cuts)</td></tr></table>
${tip('Why flour paste? It\'s food-safe, free, seals joints when it dries, and, crucially, it gives way if pressure ever builds, acting as a crude safety valve. It\'s how traditional stills were sealed for centuries.')}

<h3>4. Three improvised builds</h3>
<h3 style="font-size:16px">A. Stockpot & copper worm (simplest)</h3>
<ol class="steps">
<li>Take a stainless stockpot (20–30 L) with a close-fitting lid. Drill a hole in the centre of the lid just big enough for your copper tube (10–15 mm pipe is typical).</li>
<li>Fit a short vertical piece of copper (the riser, 15–30 cm) through the lid, then a gentle downward bend into the condenser. Seal around it with flour paste; seal the lid rim with flour paste too.</li>
<li>Make the worm: wind 3–5 m of soft copper tube around a bottle or post into a coil, keeping a steady downward slope with no dips where liquid could pool and block it.</li>
<li>Sit the coil in a bucket with the outlet coming out low down through a sealed hole (or over the rim, still sloping down). Fill the bucket with cold water and change or top it up as it warms.</li>
<li>Check the whole path slopes downhill from the riser to the outlet, and that the outlet is open.</li></ol>
<h3 style="font-size:16px">B. Pressure-cooker conversion (common in survival books)</h3>
<ul><li>Remove the weight/jiggler from the steam vent and connect copper tube to the vent (a snug compression fitting or flour-pasted joint).</li>
<li><b>Leave the pressure-cooker's safety valve fully working</b>, and never put the weight back on. You are using the lid's seal, not its pressure.</li>
<li>Small vent bores block easily: strain the wash extremely well and never overfill.</li></ul>
<h3 style="font-size:16px">C. Liebig (tube-in-tube) condenser, if you can't make a coil</h3>
<ul><li>A straight copper vapour tube runs through a wider tube or pipe (water jacket) sealed at both ends around it.</li>
<li>Cold water goes <b>in at the bottom (outlet end)</b> and out at the top, opposite to the vapour flow. A gravity tank or a hand-filled bucket works.</li>
<li>Keep it angled downward toward the outlet.</li></ul>

<h3>5. Preparing the wash</h3>
<ul><li><b>Ferment it completely dry</b> (stable gravity / no sweetness) and let it clear. Any wash works: fruit, sugar, honey, grain.</li>
<li><b>Strain out every solid</b> through cloth, then let it settle and pour off the clear liquid. Solids scorch (burnt flavours) and can block the pipe (pressure).</li>
<li>Expect a wash of roughly 8–14% ABV. Wild-yeast washes are weaker (6–10%): more water, less spirit.</li>
<li>Fruit washes produce more methanol than sugar or grain washes (from pectin), so be generous with the foreshot discard.</li></ul>
${calc('still', 'Plan a run: yield, foreshots & dilution')}

<h3>6. Setting up safely</h3>
<ul class="ticks">
<li><b>Outdoors or a very well-ventilated space.</b> Alcohol vapour is flammable and heavier than air; it pools near the floor.</li>
<li><b>Gentle, controllable heat.</b> An electric hotplate is safest. With a fire or gas burner, keep the flame small, shielded, and as far from the outlet and jars as possible.</li>
<li><b>Fill no more than ⅔ full.</b> Washes foam ("puking"), and foam in the pipe blocks it.</li>
<li><b>Fire extinguisher (CO₂/foam) or fire blanket within reach.</b> Never water on an alcohol fire spreading across a floor. No smoking, no candles.</li>
<li><b>Never leave it unattended</b>, not even for a minute.</li>
<li><b>Leak-test</b> by heating a pot of plain water first: look and feel for steam escaping at joints and fix it with flour paste before you ever use a wash.</li></ul>

<h3>7. Running it: heat, flow and cuts</h3>
<ol class="steps">
<li><b>Warm up slowly.</b> Heat gently until the coil starts to warm and the first drips appear. Rushing gives a violent boil, foam and smeared cuts.</li>
<li><b>Aim for a steady drip-to-thin-stream</b>, not a gush. Turn the heat down if it spits or the outlet runs hot. The spirit should come out cool; if it's warm, change the cooling water.</li>
<li><b>Collect in small, numbered jars</b> (100–250 ml each). This is what lets you make cuts.</li>
<li><b>Make your cuts</b> (below) by smell and taste, jar by jar, and with a thermometer if you have one.</li>
<li><b>Stop</b> when the spirit coming off is weak (it no longer smells strongly of alcohol, or a drop on a spoon won't light, if you're testing that way), or when the head temperature is well into the 90s °C. Turn off the heat <b>before</b> disturbing anything.</li></ol>

<h3>8. The cuts: the part that keeps you safe</h3>
<table class="tbl"><tr><th>Fraction</th><th>When</th><th>Smell / taste</th><th>What to do</th></tr>
<tr><td><b>Foreshots</b></td><td>The very first drips</td><td>Sharp, solvent, acetone, "nail-polish remover"</td><td><b>Throw away. Never drink.</b> At least <b>50 ml per 20 L of wash</b> (more for fruit washes). Pour away well clear of any flame.</td></tr>
<tr><td><b>Heads</b></td><td>Next</td><td>Harsh, solventy, but fading; burns the nose</td><td>Set aside in their own jars. Re-run with your next wash, don't drink.</td></tr>
<tr><td><b>Hearts</b></td><td>The middle (most of the run)</td><td>Clean, sweet, smooth, the "spirit" you want</td><td>Keep. This is what you drink.</td></tr>
<tr><td><b>Tails</b></td><td>The end</td><td>Wet cardboard, oily, "wet dog", cloudy; strength falling</td><td>Set aside to re-run later. Stop drinking-collection here.</td></tr></table>
<ul><li><b>Judging jars:</b> rub a few drops on your palm and smell as it evaporates, or dilute a splash with water to taste. Compare each jar with its neighbours. The changes are gradual, so cut on the safe side.</li>
<li><b>Thermometer guide (vapour at the head, rough):</b> hearts mostly come over with the vapour in the high 70s to low 80s °C. As it climbs past the mid-80s into the 90s you're moving into tails.</li>
<li><b>About methanol:</b> some is spread throughout the run, so discarding foreshots isn't a magic fix. It's simply standard good practice, along with not drinking heads. Historically, most poisonings came from adulterated or industrial alcohol and from lead in bad equipment, not from carefully cut runs.</li></ul>

<h3>9. After the run</h3>
<ul><li><b>Measure strength</b> with a spirit hydrometer (alcoholmeter) at 20 °C if you possibly can. Off-grid, the "bead" (how big and lasting the bubbles are when you shake the jar) is only a rough guide.</li>
<li><b>Dilute</b> the hearts to drinking strength (around 40%) with clean boiled water, adding it slowly and stirring. Use the calculator for exact amounts. Diluting too fast can make it cloudy.</li>
<li><b>Rest it</b> for a few days, loosely covered, to let harsh notes blow off, then store it sealed in glass.</li>
<li><b>Ageing:</b> a handful of toasted oak chips (or charred oak sticks) for weeks to months gives colour and smoothness. Taste regularly.</li>
<li><b>Yield reality:</b> 20 L of 10% wash holds about 2 L of pure alcohol; after cuts, expect roughly <b>2–3 L of 40% spirit</b>.</li>
<li><b>Survival uses:</b> spirit above 60–70% works as an antiseptic, for tinctures and as a burnable fuel, which fermented drinks can't do.</li></ul>

<h3>10. Troubleshooting</h3>
<table class="tbl"><tr><th>Problem</th><th>Likely cause</th><th>Fix</th></tr>
<tr><td>Nothing coming out, pot getting hot</td><td>Leak or <b>blockage</b></td><td><b>Turn off the heat immediately.</b> Let it cool, check the pipe is clear, and only then restart. Never heat a still with a blocked outlet.</td></tr>
<tr><td>Steam or vapour escaping at joints</td><td>Poor seal</td><td>Heat off, cool, re-seal with flour paste.</td></tr>
<tr><td>Spirit comes out warm or as vapour</td><td>Condenser overwhelmed</td><td>Turn the heat down; use colder or fresher cooling water.</td></tr>
<tr><td>Wash spitting into the pipe ("puking")</td><td>Too full, too hot, foamy wash</td><td>Fill less, heat more gently, strain better.</td></tr>
<tr><td>Burnt or scorched taste</td><td>Solids in the pot, heat too high</td><td>Strain the wash better; gentler heat.</td></tr>
<tr><td>Harsh, solventy spirit</td><td>Cuts too wide (heads in the hearts)</td><td>Re-run it, or cut tighter next time.</td></tr>
<tr><td>Oily, cardboard taste</td><td>Collected too far into tails</td><td>Stop the hearts earlier.</td></tr></table>

<h3>11. The non-negotiables</h3>
<ol class="steps">
<li><b>Never let it pressurise.</b> The outlet is always open, the pipe slopes downhill and is never blocked, and the pot is never more than ⅔ full.</li>
<li><b>Nothing the vapour or spirit touches may contain lead, zinc or plastic.</b></li>
<li><b>Always discard the foreshots and set aside the heads.</b></li>
<li><b>Never unattended, never near an open flame at the outlet, fire extinguisher in reach.</b></li>
<li><b>Legal first</b>: licensed in the UK, personal-use only in NZ, never sell it.</li></ol>
<p class="note">See also: <a href="#/guide/survival">Off-grid & survival brewing</a> (making the wash with no shops) and <a href="#/guide/distilling-history">A history of distilling</a>.</p>`,
});

/* ---------- Still run planner ---------- */
defCalc({ id: 'still', title: 'Still run planner & dilution', icon: 'flask', group: 'Distilling (licensed / NZ)',
  desc: 'From your wash volume and strength: pure alcohol, minimum foreshots to discard, expected spirit, and exactly how much water to dilute to drinking strength.',
  render(el) {
    el.innerHTML = `<div class="callout warn"><b>Legal</b><div>For use only where distilling is legal for you (UK HMRC licence, New Zealand personal use). <a href="#/guide/survival-still">Read the safety guide first.</a></div></div>
      <div class="calc"><div class="panel" id="sf"></div><div class="panel"><div class="out" id="so"></div></div></div>`;
    mountForm('still', $('#sf', el), $('#so', el), [
      { k: 'L', l: 'Wash volume', v: 20, u: 'L', step: 1 },
      { k: 'abv', l: 'Wash strength', v: 10, u: '%', step: 0.5, hint: 'From OG/FG: use the ABV calculator.' },
      { k: 'type', l: 'Wash type', t: 'sel', v: 'sugar', o: [['sugar', 'Sugar / honey'], ['grain', 'Grain'], ['fruit', 'Fruit (more methanol: bigger discard)']] },
      { k: 'pot', l: 'Pot size', v: 30, u: 'L', step: 1 },
      { k: 'got', l: 'Hearts collected', v: 2.5, u: 'L', step: 0.1, hint: 'For dilution below.' },
      { k: 'gotabv', l: 'Hearts strength', v: 60, u: '%', step: 1 },
      { k: 'target', l: 'Target drinking strength', v: 40, u: '%', step: 1 },
    ], v => {
      const pure = v.L * v.abv / 100;
      const fore = v.L / 20 * (v.type === 'fruit' ? 100 : 50);
      const fill = v.L / v.pot * 100;
      const hearts40 = pure * 0.55 / 0.4; // rough, conservative: ~55% of the alcohol ends up in drinkable hearts
      const water = v.gotabv > v.target ? v.got * (v.gotabv / v.target - 1) : 0;
      return `<div class="stats">
        ${stat('Discard at least', fmt(fore, 0), 'ml', 'foreshots: never drink', 'big')}
        ${stat('Pure alcohol in wash', fmt(pure, 2), 'L')}
        ${stat('Expect ≈', fmt(hearts40, 1), 'L', 'of 40% spirit after cuts (rough)')}
        ${stat('Pot fill', fmt(fill, 0), '%', fill > 67 ? '⚠️ too full: max ⅔' : 'OK (max ⅔)')}
        ${stat('Water to dilute', fmt(water, 2), 'L', `${v.got} L at ${v.gotabv}% → ${fmt(v.got + water, 2)} L at ${v.target}%`)}
      </div>
      ${fill > 67 ? `<div class="callout warn"><b>Too full</b><div>Reduce the wash to ${fmt(v.pot * 0.67, 1)} L or less to avoid foaming into the pipe.</div></div>` : ''}
      <p class="note">Dilution assumes simple volume maths (slight contraction happens when alcohol and water mix, so check with an alcoholmeter at 20 °C). Add the water slowly and stir.</p>`;
    });
  } });
