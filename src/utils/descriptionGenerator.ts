import { WorldStyle } from '../types';

const medievalFantasyDescriptions = [
  "A weathered fortress perched on molten rock, its blackened walls pulse with heat. Inside, ancient forges blaze and dragon bones are said to lie buried.",
  "Twisting woods surround this forgotten hamlet where brambles grow overnight. Locals speak of trees that walk and whisper secrets to those who dare to listen.",
  "Nestled in a misty valley, this quiet settlement is veiled by enchantments. Time flows strangely here, and outsiders often forget why they came.",
  "Carved into the side of a snow-capped peak, this stronghold overlooks the world. Its wind-beaten banners bear a sigil long erased from history.",
  "A sleepy village wrapped in ivy and moss, where no one dreams and the well always tastes faintly of flowers and sorrow.",
  "Hidden among hills, this trading post thrives on secrets. Every building is painted red to ward off unseen watchers lurking in the fields.",
  "Frozen year-round, this lakeside camp survives through rituals to an ancient ice spirit. No fire stays lit without its blessing.",
  "This burned-out ruin still echoes with laughter on windless days. Children say invisible dancers spin beneath the moonlight, reenacting a long-dead festival.",
  "Far from roads, this cloistered sanctuary is guarded by spirits of the forest. Its walls are made of woven roots and blessed silence.",
  "Set between cliffs and crashing waves, this fishing town's shore is littered with shipwrecks. Locals hang fishbones over doorways to ward off sea curses.",
  "Built entirely of stone pulled from an ancient ruin, the town thrums with quiet energy. At night, the stones seem to shift imperceptibly.",
  "A gloomy village draped in permanent twilight. No stars shine here, and every mirror reflects just a little too much.",
  "This crossroads camp sees countless travelers, yet none ever stay long. Its tents never move, and the fire burns even when no one's near.",
  "Once a grand city, now only its towers remain. Birds nest in shattered spires, and the wind hums songs no one remembers.",
  "A mountaintop monastery where the wind speaks prophecy. Monks here never speak - they listen, write, and weep.",
  "Surrounded by golden wheat, this idyllic town celebrates a harvest festival that never ends. No one has aged here in over a century.",
  "Deep in a canyon, homes are carved into glowing crystal walls. Light dances here without a source, and shadows sometimes don't align.",
  "This riverside village only appears during storms. Fishermen trade with it cautiously, then row away fast before it vanishes again.",
  "Hidden behind a waterfall, this lush grove bears trees with golden leaves and fruit that grants visions - or madness.",
  "A cursed battlefield turned town, where weapons grow from the ground like weeds and every newborn is born holding something sharp."
];

const steampunkDescriptions = [
  "Perched atop iron scaffolds, this skyport hums with engines and gaslights. Airships dock beside brass towers while soot-streaked mechanics scurry like clockwork ants below.",
  "Beneath an amber smog sky, this city runs on gears and ambition. Steam vents hiss from cobbled streets, hiding tunnels teeming with secrets and spies.",
  "Built into the side of a cliff, this mining hub drills for æther gas. Machinery never stops, and neither do the engineers who live here.",
  "A floating market drifts above the clouds, tethered by chains and promises. Traders exchange exotic wares, encrypted codes, and rumors of rebellion.",
  "This repurposed observatory houses inventors and thinkers. Its domed roof creaks open to stargaze, while the basement hides blueprints for forbidden machines.",
  "Choked by gears and copper pipes, this metropolis thrums with ceaseless motion. Automatons outnumber humans, and no one remembers the last true silence.",
  "Built on a rusting bridge spanning a dried riverbed, this settlement survives on scavenged tech and steam-powered farming rigs.",
  "A mechanical island city floats in the sky, its altitude adjusted by massive turbines. Only those with clearance codes can land safely.",
  "Nestled in a crater, this laboratory-town glows at night. The air buzzes with static, and failed experiments occasionally wander off into the mist.",
  "This underground station-turned-settlement is layered with brass conduits and encrypted signage. A railway still runs—but no one's certain where it goes.",
  "A lavish resort run entirely by automata, where guests sip absinthe under gaslit chandeliers. Some check in and never quite check out.",
  "Located in an ancient library converted into a research hub, its archives stretch deeper than the town above it dares to admit.",
  "Built around a broken airship, this town scavenged its hull to form walls, towers, and taverns. The original captain still rules from the cockpit.",
  "This coastal factory pumps steam into the sea, fogging the waters. Submersibles dock beneath it, hidden from prying eyes and government patrols.",
  "A rogue guild operates here, disguised as a teahouse. Beneath the kettle room lies a weapons lab powered by wind-up hearts.",
  "Hidden inside a mountain, this old imperial armory has become a haven for rogue tinkerers. It's rumored to house a sentient engine.",
  "This town balances on six walking legs, migrating daily across the plains. No two visits land in the same location.",
  "Surrounded by gears the size of houses, this maintenance colony spins perpetually with a world-sized clock. Losing track of time here is fatal.",
  "Once a quaint village, now overtaken by runaway steam tech. The chimneys breathe, the doors blink, and the bells never ring the same twice.",
  "A glass-domed city at the bottom of a lake, run by a steam core older than memory. Entry requires both a dive suit and a favor."
];

const postApocalypticDescriptions = [
  "Crumbling skyscrapers pierce the dusty sky, their broken windows howling with the wind. Beneath them, scavengers pick through the rusted bones of the old world.",
  "A crater turned settlement, where huts of scrap metal and plastic shield survivors from acid rains and prowling beasts mutated by the fallout.",
  "An abandoned trainyard now serves as a nomad market. Rusted locomotives house traders, warlords, and thieves, all bartering with relics of the dead past.",
  "Buried deep in salt flats, this bunker city survives on rationed air and forgotten tech. Outsiders rarely leave with what they came for.",
  "Skulls decorate the barricades around this fortress-town, a brutal reminder of the price of entry. Inside, warbands rule and loyalty is measured in blood.",
  "A forest of twisted metal where trees never grew back. The earth glows faintly at night, and only the desperate or mad dare enter.",
  "Built atop a collapsed dam, this stronghold controls the last known water reserve. Power shifts with every assassination and whispered betrayal.",
  "Once a grand stadium, now a brutal arena. Gladiators fight for scraps while crowds of ragged survivors cheer, gamble, and plot their next betrayal.",
  "Concrete ruins spiral around a black pit, rumored to hold the last working reactor. Many have ventured in. None have ever returned.",
  "This ghost city lies half-sunken into a toxic swamp. The old street signs poke out like fingers, pointing nowhere. Something in the mist watches.",
  "A shattered highway cradles this moving convoy town. Survivors build homes atop rusting cars, always rolling, always running from something worse behind them.",
  "The skeletal remains of a shopping mall serve as a hub for trade, crime, and forgotten luxury. Half-collapsed escalators lead to kingdoms of rats.",
  "A glass desert stretches beyond this settlement's crumbling walls. Heat shimmers on the horizon, but no oasis ever comes—only mirages and death.",
  "Set in the hollowed-out remains of a corporate tower, this enclave uses shattered windows as sniper nests against raiders and beasts.",
  "A rusted oil rig transformed into a floating citadel. Its chains reach into the ocean's black depths, pulling up monsters both mechanical and organic.",
  "Beneath a cracked highway overpass, a colony of scavengers lights fires in shopping carts, trading old-world batteries for moldy rations and safe passage.",
  "Towering rusted wind turbines surround this village. Most have stopped spinning, but some still creak at night, whispering old-world secrets in the desert wind.",
  "An underground metro station turned city-state. Layers of grime and graffiti coat every surface, and the deeper levels are ruled by creatures not fully human.",
  "A sunken theme park, its giant statues broken and half-drowned. Children's songs still echo at dusk, carried by winds no longer heard by human ears.",
  "This fortified canyon settlement draws water from a trickling river below. Only those who brave the raider gauntlets on the cliffs can reach its gates."
];

const cyberpunkDescriptions = [
  "Neon signs flicker on shattered skyscrapers, casting sickly light over narrow alleyways where street gangs, cyber-enhanced hustlers, and black market tech dealers fight for survival.",
  "A floating casino city drifts above polluted waters, ruled by AI cartels and flesh brokers offering eternal youth—or death—for the right price.",
  "Beneath the glimmering corporate towers lies a labyrinth of steam tunnels and data havens, where renegades trade stolen memories and outlawed cyberware.",
  "A sprawling slum stitched together with scavenged neon, hacked security drones, and makeshift towers of scrap. Hope is a commodity few can afford.",
  "Massive holo-billboards blind the night sky, advertising synthetic dreams to citizens too wired into the grid to remember real ones.",
  "This vertical megacity stacks society by class—corporate elite in crystal towers, wage slaves in coffin motels, and the forgotten in the neon-lit gutters.",
  "Once a public transport hub, now an open-air black market where hackers, mercs, and corpo traitors hawk illegal wares under buzzing floodlights.",
  "Bioengineered jungle overruns abandoned districts, reclaiming concrete and steel. Mutated flora glows with bioluminescent warnings best heeded.",
  "A labyrinthine nightclub suspended between two megascrapers. Deals, betrayals, and assassinations are conducted beneath the pulsing bass and laser smoke.",
  "An orbital shuttleport once gleamed with prestige. Now, it's a rusted haven for data smugglers, organ traders, and desperate escape attempts.",
  "This underwater arcology flickers on failing reactors, populated by bio-modified outcasts and synthetic mercenaries with more metal than flesh.",
  "Rooftop shantytowns sprawl across corporate campuses like scars, patched together by exiles wired with bootleg implants and hunted by security drones.",
  "The ghost lanes of an ancient hyperloop track serve as battlegrounds for drone races, blood sports, and deadly gang disputes.",
  "Abandoned biotech labs rot beneath the city, their forgotten experiments lurking in the darkness, fueled by viral AIs and rogue nanites.",
  "Towering monorails snake through acid rainstorms, their stations home to fringe cults worshipping outdated AIs as gods of evolution.",
  "An entire city block sealed off by an endless corporate blackout. No light, no law, and no promises of making it back out.",
  "Hypercorp-controlled greenhouses float in polluted skies, growing luxury foods for the elite while dissidents sabotage crops with viral spores.",
  "Concrete tunnels flooded with phosphorescent waste lead to a nomad bazaar where no biometric ID is required, only currency of blood and bits.",
  "An abandoned VR theme park leaks addictive dream-viruses into the city's wireless grid, trapping the unwary in endless loops of synthetic paradise.",
  "A skeletal skyscraper turned hacker monastery, where rogue AIs are born, trained, and unleashed into the corporate mainframes to wage invisible wars."
];

const mythologicalDescriptions = [
  "A colossal tree pierces the heavens, its golden fruits guarded by spirits. Legends say the roots twist through time, binding realms seen and unseen.",
  "A shattered mountain where ancient gods once warred, leaving molten scars and stone titans frozen mid-battle, whispering curses to those who wander too close.",
  "Beneath a silver lake, an ancient city of marble slumbers, its towers intact, its halls lit by eternal flames, awaiting the chosen dreamer.",
  "A temple carved from living crystal pulses with forgotten prayers. Only those pure of soul can hear the echoes of the divine still trapped within.",
  "Mist-drenched cliffs hold gateways into other realms, guarded by silent sentinels of stone whose eyes follow every step, weighing mortal hearts against unseen laws.",
  "Hidden deep in thorn-choked forests, a shrine houses a single feather of a long-dead phoenix, its embers still capable of sparking miracles—or disasters.",
  "An endless desert where constellations fall like meteors, their broken bodies transforming into monstrous beasts, and brave hunters become constellations themselves.",
  "A sunken cathedral lies in a bottomless ravine, its bells tolling once every thousand years to summon the restless dead to judgment.",
  "In a valley of perpetual twilight, golden deer roam, each one a messenger of fate, hunted by immortals desperate to alter their doomed futures.",
  "Towering waterfalls pour not water but liquid light, blinding all but the gods, said to wash away memory, sin, and even mortality itself.",
  "A labyrinth formed from living vines shifts endlessly, trapping intruders forever. Only by singing the true name of its heart can one escape.",
  "An abandoned throne floats above a mirror-smooth sea, untouched by time, awaiting the return of a forgotten monarch who shall awaken the sleeping world.",
  "A volcano chained by runes hums with captive rage. Within its molten heart sleeps an ancient dragon god, dreaming of vengeance against the stars.",
  "Obsidian spires rise from an endless plain of bones. It is said each spire marks the tomb of a titan, their curses still alive.",
  "The ruins of a once-mighty city, half-buried in sand, where phantom armies march in endless, futile wars when the blood moon rises.",
  "A lush garden untouched by mortal hands where every fruit grants a gift—and every flower blooms from the sacrifice of a forgotten soul.",
  "Storm-wracked cliffs host a shrine to a sky god, each thunderbolt carving prayers into the stone, each lightning strike birthing new oracles.",
  "Beneath the roots of the world, a forgotten well offers visions of the future—if you dare pay the price demanded by its unseen guardian.",
  "A frozen lake where ancient heroes sleep beneath the ice, their swords poised for the day when the last war calls them back to life.",
  "A hollowed mountain cradles a burning heart, said to be the last breath of creation itself, tended by eternal monks who have long since turned to stone."
];

const scifiDescriptions = [
  "A colossal station orbits a dead star, abandoned by its creators. Its endless corridors whisper old transmissions, looping fragmented messages from forgotten civilizations.",
  "A sprawling metropolis suspended in orbit, its neon towers stretching into vacuum. Wealthy elites live above, while the lower decks rot in mechanical decay.",
  "An isolated research colony buried beneath an icy moon's crust, its frozen halls still humming with experiments too dangerous to unleash on any living world.",
  "A desert planet scarred by mining operations, its atmosphere poisoned. Nomad tribes roam the sands, scavenging ancient alien tech left behind in the final corporate exodus.",
  "A labyrinthine ship adrift in deep space, half-organic, half-machine. Every room shifts when unobserved, and something unseen still tends the engines in the dark.",
  "A terraformed jungle world where genetically engineered beasts have overrun abandoned colonies. Only the strongest—or the smartest—can carve out new civilizations amid the chaos.",
  "Beneath the swirling clouds of a gas giant, floating cities cling to the updrafts, trading rare gases and hiding secrets in the storm.",
  "A war-ravaged station, where holographic ghosts reenact ancient battles. Scavengers navigate its ruins, risking madness for the secrets buried in corrupted memory banks.",
  "A ringworld fractured by civil war, with shattered habitats spiraling into the void. Only drifting nomad fleets remember the golden age before the fall.",
  "A hidden blacksite nestled in an asteroid belt where forbidden experiments twist flesh and machine into monstrous new forms, far from prying eyes.",
  "An endless archive station housing every known consciousness in the galaxy, its halls patrolled by caretaker AIs who no longer recognize organic life as kin.",
  "On a planet flooded by oceans, floating colonies drift among titanic sea beasts, mining rare minerals from the deep while hiding from predators unseen.",
  "A broken moon riddled with ancient alien structures. Its crumbling towers bleed radiation that mutates anything that dares to settle nearby.",
  "A hollowed-out comet turned smuggler haven, where ships dock among glittering caves and information is more valuable—and more dangerous—than gold.",
  "A forgotten planet-sized machine endlessly builds and dismantles cities for no clear purpose, its mechanical architects oblivious to the fragile lives caught in-between.",
  "A derelict colony where rogue terraforming went wrong. Towering fungal forests engulf ancient cities, and bioengineered spores reshape the land—and intruders—at a genetic level.",
  "A network of wormhole gates, abandoned mid-construction, now home to scavengers, pirates, and exiles who worship the silent dark between the stars.",
  "A hidden lunar observatory transmitting warnings from the galactic edge, where an ancient, nameless force awakens—one that humanity should never have noticed.",
  "In the atmosphere of a rogue planet adrift in the void, drifting cities flicker with dying light, held together by hope and scavenged miracles.",
  "A colossal megastructure where gravity bends strangely, and corridors lead to other dimensions. Explorers enter seeking answers; most are never heard from again."
];

const modernSupernaturalDescriptions = [
  "A sleepy coastal town cloaked in permanent mist, where ghost lights dance across the cliffs and the locals leave offerings by the water's edge.",
  "A crumbling hotel on the city's outskirts, where time moves strangely and guests vanish between the walls, leaving behind only whispers and dreams.",
  "A neon-drenched alley where graffiti peels away to reveal hidden sigils, pulsing faintly when the right kind of person walks past after midnight.",
  "A hidden nightclub built beneath an abandoned subway station, where supernatural creatures barter secrets over music that twists human memories.",
  "A suburban neighborhood perfectly preserved since the 1950s, except for the dark shape that watches from every window at sundown.",
  "An overgrown graveyard deep in the woods, its iron gates sealed with runes. On certain nights, the dead walk not with malice, but with purpose.",
  "A glittering skyscraper whose upper floors do not exist in physical space, occupied instead by beings who barter in fates and stolen time.",
  "A derelict church where forgotten gods still linger in the pews, whispering bargains to anyone foolish enough to sit and listen.",
  "A sleepy gas station along a back highway, where travelers report losing hours—and sometimes entire years—between filling up and driving away.",
  "A lakeside town where every mirror reflects a second, hidden version of the world, hinting at a slow and inevitable invasion.",
  "A crumbling library whose aisles extend for miles underground, guarded by spectral librarians who demand silence—or something much dearer.",
  "A rainy city block where the streetlights flicker in secret patterns, guiding chosen wanderers to impossible destinations hidden between seconds.",
  "An abandoned shopping mall, still populated by mannequins that move when no one watches, reenacting rituals whose purpose is long forgotten.",
  "A forest where shadows detach from their owners under the full moon, carrying out secret missions for unseen masters.",
  "A university campus where entire lecture halls vanish overnight, replaced by impossible gardens and doorways to forgotten eras.",
  "A luxury apartment where rent is suspiciously cheap, but every tenant wakes from the same dream of drowning—and wakes wetter than they should be.",
  "A boarded-up hospital where patients are admitted but never discharged, their souls lingering in the operating theaters, waiting for unfinished surgeries.",
  "A carnival that appears once every decade, its rides operated by beings with painted smiles and impossible eyes.",
  "A coastal lighthouse that shines not outward, but inward, trapping memories and feeding them to the thing slumbering in the cliffs below.",
  "A battered coffee shop tucked between skyscrapers, where patrons order not drinks, but impossible favors—at the cost of something they have yet to lose."
];

const historicalFictionDescriptions = [
  "A bustling harbor lined with tall ships, merchants shouting over the din, and foreign spices perfuming the salt-thick air of the crowded market.",
  "A crumbling stone fortress on a windswept hill, its banner torn and faded, still stubbornly guarding the memory of a fallen dynasty.",
  "A narrow cobbled street where blacksmiths, apothecaries, and gossiping townsfolk weave the daily life of a city poised on the edge of revolution.",
  "A grand ballroom lit by a thousand chandeliers, where nobles in jewel-studded finery whisper alliances and betrayals behind painted masks.",
  "A dusty frontier town where lawmen and outlaws alike gamble their futures in smoky saloons and crumbling jails.",
  "A sun-bleached desert caravanserai where travelers from distant empires gather to trade silk, secrets, and strange tales beneath the endless sky.",
  "A small village tucked into terraced hillsides, its fate bound to the harvests and the fickle will of the ruling lord.",
  "A marble-columned courthouse echoing with passionate speeches, heated debates, and the thundering footsteps of history about to be written.",
  "A remote monastery perched atop a jagged mountain, its monks chronicling the rise and fall of kings they will never meet.",
  "A muddy battlefield strewn with broken standards and silent cannons, still haunted by the ghosts of a war that changed the world.",
  "A sprawling estate surrounded by vineyards, where family feuds and whispered scandals ferment faster than the wine in the cellars.",
  "A storm-battered fishing village where boats vanish into the mist and ancient superstitions guide every cautious step.",
  "A vibrant souk twisting through a desert city, with merchants hawking vibrant fabrics, rare jewels, and whispered promises of fortune.",
  "A royal palace glittering with gold and intrigue, its corridors a labyrinth of ambition, seduction, and political traps.",
  "A once-proud university library whose candlelit halls are slowly being swallowed by mold, rebellion, and dangerous new ideas.",
  "A lonely watchtower overlooking a no-man's-land, its guards trading rumors of war and peace with each passing traveler.",
  "A fading opera house where aristocrats sip absinthe in gilded balconies as revolutions brew just beyond the velvet curtains.",
  "A riverside mill town, alive with the grind of gears and the quiet anger of workers dreaming of freedom.",
  "A sleepy manor whose ivy-choked walls have seen generations of triumphs, tragedies, and scandals that the current residents pretend never happened.",
  "A cathedral plaza filled with pilgrims, thieves, and soldiers, each seeking salvation—or opportunity—in the shadow of towering stone saints."
];

const lowFantasyDescriptions = [
  "A sleepy village where farmers till rocky soil, children chase chickens, and old women speak of creatures that once roamed the nearby woods.",
  "A crumbling stone bridge over a misty river, its stones slick with moss, where traders and bandits alike pass under the gaze of ancient statues.",
  "A weathered inn on the outskirts of town, its hearth always burning, its rooms full of secrets, laughter, and the occasional fugitive.",
  "A dense forest grove, where twisted trees hide forgotten shrines and strange figures sometimes watch from the undergrowth at twilight.",
  "A bustling market square where blacksmiths hammer, cloth merchants haggle, and a pickpocket's fingers move faster than the eye can follow.",
  "A quiet fishing village perched on rocky cliffs, the sea battering the docks, and legends of drowned sailors still whispered by lantern light.",
  "A low, muddy castle where squabbling lords and ladies sip watered wine and plot over game boards and half-truths.",
  "A sunbaked crossroads marked by a crumbling stone post, where travelers trade news, goods, and rumors of a hidden war.",
  "A simple temple on a windswept hill, its bells long silent, where villagers still leave offerings \"just in case.\"",
  "A derelict watchtower looming over rolling fields, now home to squatters, thieves, and things best not spoken of after dark.",
  "A crooked alley where faded banners flutter, merchants sell dubious wares, and hired blades linger just outside the torchlight.",
  "A thatched village nestled against a deep forest, where no one dares venture after sunset without a charm or whispered prayer.",
  "A weather-worn fort along a forgotten border, garrisoned by tired soldiers who fear the wolves more than the enemy.",
  "A cobblestone street that curves like a river through a decaying town, where once-great houses collapse under ivy and time.",
  "A simple shrine deep in the woods, where desperate lovers and mourning mothers alike pray for impossible miracles.",
  "A dusty road that winds through endless meadows, patrolled more by rumor and superstition than by any king's law.",
  "A quiet port battered by storms, where traders barter over rare spices, and smugglers slip through the mist unseen.",
  "A modest village green where children laugh, elders argue, and traveling minstrels weave more lies than songs.",
  "A rickety mill clattering beside a slow-moving river, where broken promises echo louder than the grinding stones.",
  "A sunken ruin in the marshes, its toppled stones whispering of old kingdoms and fallen heroes no bard dares name."
];

const highFantasyDescriptions = [
  "A soaring citadel of white marble perched atop a mountain, its spires shimmering beneath the touch of ancient enchantments still guarding the realm.",
  "A luminous forest where every tree hums with old magic, and unseen guardians whisper in forgotten tongues as you pass between silvered trunks.",
  "A ruined temple sunken into a mist-choked valley, its altar still crackling faintly with the remnants of a god's long-forsaken blessing.",
  "A sprawling elven city woven into living trees, where bridges of light span vast canopies and songs shape the very stone.",
  "A forgotten island adrift in a golden sea, cloaked in eternal twilight, where dreams and reality twist into impossible shapes.",
  "A dragon's roost atop a mountain of obsidian, its caverns vast and echoing with the bones and treasures of a thousand fallen kings.",
  "A sacred spring hidden within a crystal cavern, whose waters heal the body but fracture the soul if tasted unworthily.",
  "A towering fortress hewn from a single slab of enchanted stone, guarded by sentient statues that move when no eyes watch.",
  "A battlefield frozen in time, where fallen warriors stand locked in eternal struggle, their swords still glinting under a blood-red sun.",
  "A grand library lost beneath the sands, its endless shelves kept by silent robed figures who remember every secret ever spoken.",
  "A colossal bridge of bone spanning a chasm of stars, built by titans whose names have long been lost to mortal memory.",
  "A mist-shrouded meadow where phoenixes nest, and every footstep plants a blossom that blooms only once before vanishing.",
  "A palace floating among storm clouds, tethered to the world below by chains of moonlight and guarded by feathered knights.",
  "An endless staircase descending into the heart of the world, each step carved with riddles none have ever fully answered.",
  "A sacred grove where unicorns still roam, their hooves never touching the mortal ground, their breath stitching constellations into the sky.",
  "A shattered city of glass and gold, abandoned after its rulers challenged the gods and were turned into windswept echoes.",
  "A hidden lagoon where merfolk sing to lure lost sailors into the embrace of their ancient, coral-carved kingdoms.",
  "A fortress of black iron embedded in a cliff, its gates sealed by a curse that requires a hero's sacrifice to unlock.",
  "A forgotten monastery high among the icy peaks, where monks tame griffins and learn the language of thunder.",
  "A mystical forest where seasons bleed into each other, and time folds like a ribbon around ancient stone circles."
];

// TODO: Add descriptions for other world styles as needed

export const getRandomLocationDescription = (style: WorldStyle): string => {
  console.log('Input style:', style);
  
  if (!style) {
    console.log('Style is undefined, defaulting to Medieval Fantasy');
    style = WorldStyle.MedievalFantasy;
  }
  
  let descriptions: string[] = [];
  
  // Direct enum value matching
  switch (style) {
    case WorldStyle.MedievalFantasy:
      console.log('Matched Medieval Fantasy');
      descriptions = medievalFantasyDescriptions;
      break;
    case WorldStyle.Steampunk:
      console.log('Matched Steampunk');
      descriptions = steampunkDescriptions;
      break;
    case WorldStyle.PostApocalyptic:
      console.log('Matched Post-Apocalyptic');
      descriptions = postApocalypticDescriptions;
      break;
    case WorldStyle.Cyberpunk:
      console.log('Matched Cyberpunk');
      descriptions = cyberpunkDescriptions;
      break;
    case WorldStyle.Mythological:
      console.log('Matched Mythological');
      descriptions = mythologicalDescriptions;
      break;
    case WorldStyle.SciFi:
      console.log('Matched Sci-fi');
      descriptions = scifiDescriptions;
      break;
    case WorldStyle.ModernSupernatural:
      console.log('Matched Modern Supernatural');
      descriptions = modernSupernaturalDescriptions;
      break;
    case WorldStyle.HistoricalFiction:
      console.log('Matched Historical Fiction');
      descriptions = historicalFictionDescriptions;
      break;
    case WorldStyle.LowFantasy:
      console.log('Matched Low Fantasy');
      descriptions = lowFantasyDescriptions;
      break;
    case WorldStyle.HighFantasy:
      console.log('Matched High Fantasy');
      descriptions = highFantasyDescriptions;
      break;
    default:
      console.warn('No matching style found for:', style);
      descriptions = medievalFantasyDescriptions; // Default to medieval fantasy
  }
  
  console.log('Using descriptions for style:', style);
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  const selectedDescription = descriptions[randomIndex];
  console.log('Selected description:', selectedDescription);
  return selectedDescription;
};

export const getRandomCharacterDescription = (worldStyle: WorldStyle): string => {
  const appearances = [
    'tall and imposing',
    'short and wiry',
    'broad-shouldered',
    'slender and graceful',
    'muscular and powerful',
    'delicate and refined',
    'rugged and weathered',
    'youthful and energetic',
    'aged and wise',
    'mysterious and enigmatic'
  ];
  
  const personalities = [
    'brave and honorable',
    'cunning and resourceful',
    'kind and compassionate',
    'ambitious and driven',
    'mysterious and secretive',
    'charismatic and charming',
    'stoic and disciplined',
    'passionate and fiery',
    'intellectual and curious',
    'loyal and steadfast'
  ];
  
  const backgrounds = [
    'a noble from a prestigious family',
    'a skilled warrior from a distant land',
    'a scholar of ancient knowledge',
    'a rogue with a mysterious past',
    'a priest devoted to their faith',
    'a merchant with connections everywhere',
    'a farmer who discovered their destiny',
    'an orphan who rose through the ranks',
    'a royal in disguise',
    'a traveler from another world'
  ];
  
  const appearance = appearances[Math.floor(Math.random() * appearances.length)];
  const personality = personalities[Math.floor(Math.random() * personalities.length)];
  const background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
  
  let styleSpecific = '';
  switch (worldStyle) {
    case WorldStyle.MedievalFantasy:
      styleSpecific = 'Their armor bears the marks of countless battles, and their sword is said to be enchanted with ancient magic.';
      break;
    case WorldStyle.Steampunk:
      styleSpecific = 'Their mechanical enhancements hum softly, and their goggles reflect the glow of the city\'s gaslights.';
      break;
    case WorldStyle.PostApocalyptic:
      styleSpecific = 'Their scavenged gear tells stories of survival, and their eyes have seen too much of the world\'s ruin.';
      break;
    case WorldStyle.Cyberpunk:
      styleSpecific = 'Their cybernetic implants glint in the neon lights, and their neural interface crackles with data streams.';
      break;
    case WorldStyle.Mythological:
      styleSpecific = 'Their presence carries the weight of ancient prophecies, and their eyes seem to hold the wisdom of the gods.';
      break;
    case WorldStyle.SciFi:
      styleSpecific = 'Their advanced technology hums with energy, and their knowledge spans across the stars.';
      break;
    case WorldStyle.ModernSupernatural:
      styleSpecific = 'Their aura flickers with unseen power, and their knowledge of the hidden world runs deep.';
      break;
    default:
      styleSpecific = 'Their presence commands attention wherever they go.';
  }
  
  return `A ${appearance} individual who is ${personality}. They are ${background}. ${styleSpecific}`;
}; 