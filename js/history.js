/* Brew Lab — history of home brewing, bans, bootleggers & moonshine. */
const era = (yr, title, body, em = '•') => `<div class="tl-item"><div class="tl-dot"></div><div class="panel"><div class="meta" style="margin:0 0 6px"><span class="pill c" style="--c:var(--amber)">${yr}</span></div><h3 style="margin:2px 0 6px;color:var(--text)">${em} ${title}</h3><p style="margin:0">${body}</p></div></div>`;

Guides.push({ id: 'history', title: 'A history of booze, bans & bootleggers', drink: 'all', mins: 12, level: 'History',
  summary: 'From 9,000-year-old Chinese rice wine to Scottish whisky smugglers, Prohibition, moonshine runners and why home brewing is legal today.',
  html: `
<p>People have been fermenting things for longer than they've been writing. And for almost as long, governments have tried to tax it, control it or ban it, while ordinary people found ways around them. Here's the whole story, from ancient jars to your demijohn.</p>

<h3>🏺 Part 1: The ancient world</h3>
<div class="timeline">
${era('c. 7000 BC', 'The oldest known brew', 'Chemical traces in pottery from Jiahu, a Neolithic village in China, show a fermented drink made from rice, honey and fruit (hawthorn or grape). It\'s the earliest alcohol we have evidence for, roughly 9,000 years old.', '🍚')}
${era('c. 6000 BC', 'Wine in the Caucasus', 'Clay jars in what is now Georgia contain residues of grape wine. Georgians still ferment wine in buried clay vessels (qvevri) today.', '🍇')}
${era('c. 3500–1800 BC', 'Beer builds civilisations', 'In Mesopotamia beer was a daily food. A Sumerian hymn to Ninkasi, goddess of brewing, doubles as one of the oldest written brewing recipes: bread baked from sprouted grain, soaked and fermented. In Egypt, workers building the pyramids received beer as part of their rations.', '🍞')}
${era('Ancient Europe', 'Mead & ale everywhere', 'Honey mead was prized by Celts, Saxons and Norse; ale was brewed in almost every household. Nobody knew yeast existed: the foam was "godisgood", a gift from the gods, and brewers saved a stick or a cloth from a good batch to start the next one (unknowingly carrying the yeast).', '🍯')}
</div>

<h3>🍺 Part 2: Britain brews at home</h3>
<div class="timeline">
${era('Middle Ages', 'Alewives & ale-conners', 'Most ale was brewed by women ("alewives" or "brewsters") at home, and sold from the house when a bush or pole was hung outside, the origin of pub signs. Towns appointed official "ale-conners" to check quality and price.', '👩‍🌾')}
${era('1400s–1500s', 'Hops arrive', 'Unhopped English "ale" met hopped Flemish "beer". Hops preserved beer far better, and after a long fight beer won. Monasteries were major brewers until Henry VIII dissolved them.', '🌿')}
${era('1720–1751', 'The Gin Craze', 'Cheap, unregulated gin swept London. Thousands of shops sold it, quality was dire, and Hogarth\'s print "Gin Lane" (1751) showed the misery. A series of Gin Acts, especially in 1751, finally brought it under control with licensing and tax.', '🍸')}
${era('1880', 'A licence to brew at home', 'The Free Mash Tun Act changed how beer was taxed and required home brewers to buy a small licence. Many people quietly ignored it.', '📜')}
${era('1914–1918', 'War-time limits', 'During the First World War the government cut beer strength and restricted pub opening hours to keep munitions workers sober. Some of those afternoon-closing rules lasted for decades.', '🕰️')}
${era('April 1963', 'Home brewing set free', 'Chancellor Reginald Maudling abolished the home-brewing licence in his Budget. With sugar rationing over and malt extract in shops like Boots, home brewing boomed through the 1960s and 70s: the era of "wine circles", demijohns on every kitchen counter and beer kits.', '🎉')}
</div>

<h3>🥃 Part 3: Scotland's whisky smugglers</h3>
<p>This is the British bootlegging story, and it happened in the hills around where many of us live. Scotland started taxing whisky in the 1600s, and over the following century and a half the duties and rules piled up. Highland farmers had been distilling their spare barley for generations, so they simply carried on, secretly.</p>
<ul>
<li><b>Hidden stills:</b> small copper stills were hidden in glens, caves and bothies, near running water for cooling, and often worked at night so the smoke wasn't spotted.</li>
<li><b>The "gaugers":</b> excisemen (gaugers) hunted for stills and seized them. Locals almost never informed. Smugglers moved whisky by pony over hill tracks, with lookouts and signals to warn of the excise. Robert Burns, famously, worked as an exciseman.</li>
<li><b>The scale:</b> by the early 1820s around <b>14,000 illegal stills a year</b> were being confiscated, and it's estimated that over half the whisky drunk in Scotland paid no tax.</li>
<li><b>The fix (1823):</b> the Excise Act made a legal licence affordable (£10 plus duty per gallon). George Smith of Glenlivet was among the first farmers to go legal in 1824. His old smuggling neighbours were so angry he reportedly carried a pair of pistols for protection. Within a decade or so, smuggling had largely died out, and many famous distilleries began life as illicit stills that went legit.</li>
</ul>
${tip('Many Scotch whisky distilleries proudly date themselves to 1824 or soon after: the year illegal stills came in from the hills.')}

<h3>🇺🇸 Part 4: American Prohibition (1920–1933)</h3>
<p>The temperance movement had campaigned for decades, and in 1919 the US ratified the <b>18th Amendment</b>. From <b>January 1920</b>, making, transporting and selling "intoxicating liquors" was banned nationwide, enforced by the Volstead Act. Drinking itself wasn't technically a crime, and that loophole mattered.</p>
<div class="hist-grid">
<div class="panel"><h3>🚤 Rum-runners</h3><p>Ships loaded with Caribbean rum and Canadian whisky anchored just outside US waters (Rum Row), and fast boats ran the cargo ashore at night. Captain Bill McCoy was famous for never watering down his liquor, one of the stories behind the phrase "the real McCoy".</p></div>
<div class="panel"><h3>🚚 Bootleggers & gangsters</h3><p>"Bootlegger" comes from smugglers hiding flasks in their boot tops. Organised crime made fortunes supplying cities. Al Capone ran Chicago\'s illegal booze trade, and he was eventually jailed in 1931 for tax evasion, not for bootlegging.</p></div>
<div class="panel"><h3>🚪 Speakeasies</h3><p>Hidden bars behind fake shops and locked doors with passwords. You "spoke easy" (quietly) so neighbours didn\'t report it. Cocktails took off partly because mixers hid the taste of rough liquor.</p></div>
<div class="panel"><h3>🛁 Bathtub gin</h3><p>Cheap alcohol mixed with juniper and other flavourings. Supposedly "bathtub" because the jugs were too tall for a sink tap. It was often harsh, and when it was made with the wrong kind of alcohol, dangerous.</p></div>
<div class="panel"><h3>🍇 Wine bricks & loopholes</h3><p>Home wine for "personal use" was tolerated, so grape growers sold blocks of grape concentrate with a cheeky label warning buyers <i>not</i> to dissolve them in water and leave them somewhere warm, or they might ferment. Doctors could prescribe "medicinal" whisky, and sacramental wine was allowed for churches.</p></div>
<div class="panel"><h3>☠️ Poisoned alcohol</h3><p>Industrial alcohol was legally "denatured" with toxic chemicals so nobody would drink it. Bootleggers stole and re-sold it anyway, and the government made the denaturing formulas deadlier. Historians estimate thousands of people died from poisoned liquor during Prohibition, with some estimates as high as 10,000.</p></div>
</div>
<p><b>The end:</b> crime, corruption and lost tax revenue during the Great Depression turned the public against it. The <b>21st Amendment</b> repealed Prohibition on <b>5 December 1933</b>, the only time a US constitutional amendment has been repealed. Home <i>wine</i>-making was explicitly allowed again, but home <i>beer</i> brewing was accidentally left out of the law until President Carter signed H.R. 1337 on <b>14 October 1978</b> (effective February 1979). Home distilling remains illegal federally in the US to this day.</p>

<h3>🌙 Part 5: Moonshine & the moonshiners</h3>
<p>"Moonshine" is illegally distilled spirit, named because it was made by the light of the moon to avoid being caught. It's older than Prohibition: Scots-Irish settlers brought distilling to the Appalachian mountains in the 1700s, and when the new US government taxed whiskey, the 1794 <b>Whiskey Rebellion</b> broke out in Pennsylvania.</p>
<ul>
<li><b>How they did it (in broad strokes):</b> moonshiners fermented a sweet "mash", traditionally corn meal, later mostly cheap sugar (called "sugarhead"), in barrels until it became a weak beer-like wash. They then heated it in a hidden copper still beside a cold mountain creek. Alcohol boils at a lower temperature than water, so its vapour was collected and cooled back into liquid through a coiled pipe (the "worm") sitting in the creek. The clear, unaged result was called <b>white lightning</b>, mountain dew or corn liquor.</li>
<li><b>Testing strength:</b> with no hydrometer, they shook the jar and judged the strength by the size of the bubbles (the "bead") and how long they lasted.</li>
<li><b>Why it was dangerous:</b> badly made or corner-cutting moonshine could contain poisonous impurities. Some makers used old car radiators as condensers, which leached <b>lead</b> into the drink. Others added chemicals to fake strength or colour. Blindness, poisoning and still explosions were real. "Moonshine will make you go blind" wasn't just a saying.</li>
<li><b>The runners & NASCAR:</b> drivers ran moonshine out of the hills at night in ordinary-looking cars with tuned engines and stiff suspension to outrun the revenue agents. They started racing each other for fun and bragging rights, and that culture fed directly into stock-car racing and the founding of NASCAR in 1948. Junior Johnson, a racing legend, learned to drive running moonshine.</li>
<li><b>Today:</b> "moonshine" is sold legally as a style of unaged corn whiskey made in licensed distilleries.</li>
</ul>
${warn('Home distilling is still illegal in the UK without an HMRC licence, even for your own use, and still dangerous (fire, explosions, toxic impurities). Brew Lab only covers fermenting, which has been perfectly legal at home here since 1963.')}

<h3>🌍 Part 6: Bans around the world</h3>
<table class="tbl"><tr><th>Country</th><th>Ban</th><th>What happened</th></tr>
<tr><td>🇷🇺 Russia / USSR</td><td>1914–1925</td><td>Brought in at the start of WWI, then extended. Home-made <i>samogon</i> (moonshine) flourished.</td></tr>
<tr><td>🇮🇸 Iceland</td><td>1915–1933; <b>beer until 1989</b></td><td>Wine came back in 1922 because Spain wouldn't buy Icelandic fish otherwise. Spirits came back after a 1933 vote, but strong beer stayed banned for 74 years. 1 March is still celebrated as <b>Beer Day</b>.</td></tr>
<tr><td>🇳🇴 Norway</td><td>1916–1927</td><td>Spirits and fortified wine banned; smuggling by sea boomed.</td></tr>
<tr><td>🇫🇮 Finland</td><td>1919–1932</td><td>Widely ignored; smuggling from Estonia and organised crime grew until a referendum ended it.</td></tr>
<tr><td>🇺🇸 USA</td><td>1920–1933</td><td>As above. Some "dry" counties still exist today.</td></tr>
<tr><td>🇮🇳 India (some states)</td><td>ongoing</td><td>Some states, such as Gujarat, ban alcohol today; illegal "hooch" tragedies still happen.</td></tr></table>

<h3>🔎 Myth vs fact</h3>
<table class="tbl"><tr><th>Myth</th><th>Fact</th></tr>
<tr><td>"In the old days everyone drank beer because the water was poisonous."</td><td>Partly exaggerated. People did drink water, but ale was a cheap source of calories and was enjoyed in its own right.</td></tr>
<tr><td>"Home brewing was illegal in Britain."</td><td>It just needed a cheap licence (1880–1963), which many people never bought.</td></tr>
<tr><td>"Homebrew beer or wine can make you blind."</td><td>No. Fermentation alone doesn't make dangerous methanol levels. The blinding stories come from badly <i>distilled</i> spirits and poisoned industrial alcohol.</td></tr>
<tr><td>"Prohibition stopped people drinking."</td><td>It reduced drinking somewhat at first, but created huge illegal markets, organised crime and dangerous liquor.</td></tr></table>

<h3>🍻 Where that leaves you</h3>
<p>Your demijohn of cider is part of a 9,000-year-old tradition, and thanks to 1963 it's completely legal. Brew for yourself, share with friends, but don't sell it and don't distil. Cheers to the alewives, the Highland farmers and everyone in between.</p>
<p class="note">Further reading: UK Parliament Hansard (Budget, 3 April 1963), the American Homebrewers Association\'s history of H.R. 1337, BBC "Why Iceland banned beer", the National Trust for Scotland and Glenlivet\'s "Pioneering Spirit" illicit-stills project, and Deborah Blum\'s writing on Prohibition-era poisoned alcohol.</p>`,
});
