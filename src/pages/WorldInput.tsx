import React, { useState, useEffect } from 'react';
import { Button, FormControl, FormLabel, Select, Textarea, VStack, Heading, Text, useToast, Checkbox, CheckboxGroup, Box, Input, HStack, IconButton, Container, Divider, SimpleGrid, Center } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { WorldStyle } from '../types';
import { worldStructures } from '../data/worldStructures';
import { RepeatIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { BackgroundImages } from '../components/layout/BackgroundImages';
import axios from 'axios';
import { generateWorldDescription, expandWorldDescription } from '../config/api';

const nameExamples: Record<WorldStyle, string[]> = {
  [WorldStyle.MedievalFantasy]: [
    'Avaloria', 'Mystral Kingdom', 'Eldervale', 'Ironhaven', 'Stormspire',
    'Thornreach', 'Windmere', 'Duskmoor', 'Ravenshollow', 'Drakenshire',
    'Frostglen', 'Ashbourne', 'Mooncrest', 'Redrock Keep', 'Oakenthrone',
    'Shadowmere', 'Hallowstead', 'Brimspire', 'Northhelm', 'Cinderholt',
    'Valebrook', 'Duskwatch', 'Goldentarn', 'Wolfscar', 'Thundertop',
    'Gloomreach', 'Kingsfall', 'Silverdeep', 'Embermere', 'Highwall'
  ],
  
  [WorldStyle.Steampunk]: [
    'New Gearhaven', 'Brassford', 'Steamburgh', 'Cogsworth City', 'Aetherton',
    'Pistonvale', 'Copperhill', 'Clankspire', 'Valvoria', 'Boilerbay',
    'Rustspire', 'Steamreach', 'Cinderport', 'Tinkerhold', 'Ironsteam',
    'Zephyrgate', 'Hissholm', 'Crankmoor', 'Mechvale', 'Gearlock',
    'Smokehaven', 'Greaseford', 'Blastspire', 'Fumeton', 'Spindlewick',
    'Arcadia Coil', 'Brimfire Borough', 'Nimbus Hollow', 'Fogforge', 'Rattlebay'
  ],
  
  [WorldStyle.PostApocalyptic]: [
    'Last Haven', 'Wasteland City', 'New Eden', 'Sanctuary Zone', 'Remnant',
    'Ashgrove', 'Dustspire', 'Crater’s Edge', 'Red Ash', 'Bonecliff',
    'Ruinfront', 'Shatterhold', 'Drywater', 'Salvage Point', 'Hope’s End',
    'Toxcity', 'Fallbridge', 'Scorchplain', 'Vault Delta', 'Iron Husk',
    'New Bastion', 'Sundered Vale', 'Scrapgate', 'The Hollow', 'Echo Sector',
    'Zone 13', 'Deadlight', 'Outpost Omega', 'The Wastes', 'Feral Reach'
  ],
  
  [WorldStyle.HistoricalFiction]: [
    'Port Royal', 'New Amsterdam', 'Victoria City', 'Constantinople', 'Alexandria',
    'Bordeaux', 'Tuscany Hill', 'King’s Harbor', 'Versaille’s Gate', 'Vienna’s Cross',
    'Saint Albion', 'Old Greenwich', 'Redcliff', 'Bavaria Heights', 'Santiago del Sol',
    'Lorient', 'Seville Crest', 'Prague Gate', 'Yorkminster', 'Helvetia',
    'Napoli Shores', 'Savannah Rise', 'Isle of Wight', 'Darlington Hall', 'Kingston Bay',
    'Dubrovnik Point', 'Lisbon Hold', 'Marseille Haven', 'Edo Falls', 'Nilebridge'
  ],
  
  [WorldStyle.ModernSupernatural]: [
    'Shadow Falls', 'Mystic Harbor', 'Ravencrest', 'Dark Haven', 'Moonlight Bay',
    'Fogmoor', 'Wraithwood', 'Black Hollow', 'Silver Pines', 'Whispering Rock',
    'Veilbrook', 'Twilight City', 'Havenridge', 'Ember Hollow', 'Phantom Hill',
    'Nightshade Vale', 'Specter’s End', 'Ghostlight Park', 'Howlstead', 'Ebonreach',
    'Crimson Hollow', 'Witch’s Haven', 'Gloomrow', 'Duskmire', 'Salem Grove',
    'Eclipse Hill', 'Runestone Bay', 'Hauntford', 'Nocturne Vale', 'Morrowfield'
  ],
  
  [WorldStyle.SciFi]: [
    'Nova Prime', 'Stellar City', 'New Earth Colony', 'Alpha Station', 'Nexus Hub',
    'Zerion Outpost', 'Andros Sector', 'Eclipse IX', 'Horizon Arc', 'Orbital Haven',
    'Chrono Spire', 'Vanta Core', 'The Drift', 'Exo Terra', 'Galactis Gate',
    'Omnibase Theta', 'Polaris Reach', 'Delta Cradle', 'Astera Prime', 'Lunaris Point',
    'Neon Arcadia', 'Terra Solis', 'Sector 47', 'Cosmos Ring', 'Helix Bastion',
    'Stratos Dock', 'Vortex Field', 'Nova Plexus', 'Coregenesis', 'Titan Expanse'
  ],
  
  [WorldStyle.Mythological]: [
    'Olympia Prime', 'Asgard Haven', 'Phoenix Gate', 'Dragons Rest', 'Titans Fall',
    'Mystara', 'Elysian Reach', 'Nyx Hollow', 'Mount Solara', 'Gaia`s Cradle',
    'Aetherwyn', 'Valoria', 'Celestara', 'Thalor Vale', 'Echo Hollow',
    'Temple of Thorns', 'Skyforge', 'Netherveil', 'Isle of Fates', 'Hymnspire',
    'Nymira', 'Oracle`s End', 'Seraph`s Wake', 'Lyra Hollow', 'Mythraeum',
    'Valkarion', 'Dawnspire', 'Cradle of Suns', 'Ashen Oracle', 'Godfall'
  ],
  
  [WorldStyle.Cyberpunk]: [
    'Neo Tokyo', 'Chrome City', 'Digital Haven', 'Circuit Bay', 'Data District',
    'Neon Sprawl', 'Mechavibe', 'Pulse Sector', 'CryoTower', 'Edgepoint',
    'Hackersend', 'Corevoid', 'Nullgrid', 'Cypher Nest', 'Zerocrypt',
    'Overbyte', 'Synth Haven', 'Pixelreach', 'Netropolis', 'The V-Link',
    'Ghost Sector', 'Neurobay', 'Subnet Heights', 'Bitforge', 'Echochrome',
    'Light Circuit', 'Code Breaker’s Den', 'Ion District', 'Fragment Heights', 'Xenopunk Verge'
  ],
  
  [WorldStyle.LowFantasy]: [
    'Greendale', 'Rivertown', 'Meadowkeep', 'Hillshire', 'Brookhaven',
    'Stonecross', 'Oakbarrow', 'Thornwell', 'Mistwatch', 'Briarhollow',
    'Millmere', 'Ashenford', 'Cedarwyn', 'Wolfden', 'Redwater',
    'Faybridge', 'Northglen', 'Dewmoor', 'Falconridge', 'Wyrmstead',
    'Barrowfen', 'Loamford', 'Elderbrook', 'Hearthglen', 'Saltmere',
    'Timberrest', 'Dryfield', 'Kestrel Hill', 'Narrowreach', 'Foxgrove'
  ],
  
  [WorldStyle.HighFantasy]: [
    'Crystal Spire', 'Starfall Kingdom', 'Moonweave', 'Sunhaven', 'Ethereal Gate',
    'Thalorin', 'Mystvale', 'Auroria', 'Skyhold', 'Elunara',
    'Everdawn', 'Shadowspire', 'Celesthall', 'Irismere', 'Glimmerdeep',
    'Frostharbor', 'Aetherreach', 'Stormhold', 'Verdelore', 'Mythglen',
    'Sunglade', 'Whisperwind', 'Isle of the Nine', 'Obsidian Crown', 'Goldenbark',
    'Drakenholt', 'Arkwyn', 'Halowind', 'Brighthearth', 'Moonspire'
  ]
  
};

const characteristicsExamples: Record<WorldStyle, string[]> = {
  [WorldStyle.MedievalFantasy]: [
    'The kingdom is ruled by an immortal monarch who sleeps for a century between reigns, awakening only when the land is in mortal peril.',
    'Magic is outlawed and hunted by inquisitors, but an underground order of spellcasters hides in forgotten catacombs beneath the capital.',
    'Dragons are not beasts but ancient scholars who hoard knowledge instead of gold, offering forbidden wisdom for a steep price.',
    'Dragons are not beasts but ancient scholars who hoard knowledge instead of gold, offering forbidden wisdom for a steep price.',
    'The realm’s magic is tied to seasonal rites, with each solstice unlocking new types of spells — and dangers.',
    'The gods have abandoned the world, leaving behind divine artifacts that corrupt or bless depending on the wielder’s heart..',
    'Each noble house is bonded to a mythical beast — griffins, leviathans, and phoenixes — who serve as both mount and judge.',
    'Time is cyclical; every century, the world resets with minor differences. Only the ancient elves remember all past versions.',
    'All castles are partially alive, grown from stone imbued with ancient elemental spirits that whisper secrets to their lords.',
    'A once-banished god has been reborn as a child in a remote village, prophesied to either save or destroy the world.',
    'Dwarven forges run on dragonfire, but the dragons demand a price in memory for every flame they offer.',
    'The stars are used not for navigation, but for binding spells — new constellations allow new forms of magic.',
    'A black castle roams the continent on giant legs, devouring villages and growing stronger with every soul it claims.',
    'Every knight is bound by a living oath that appears as glowing runes on their armor, reacting to dishonor or betrayal.',
    'Wizards are born from storms — literally falling from the sky in bolts of lightning and emerging from craters.',
    'A cursed battlefield reanimates all who die upon it, forcing endless war between undead armies bound by honor.',
    'An enchanted mirror controls diplomacy among kingdoms, forcing rulers to speak only truths when reflected in its gaze.',
  ],
  [WorldStyle.Steampunk]: [
    "The sky is ruled by massive, gear-driven airships — floating cities that mine clouds for water and energy, while engaging in aerial duels above the smog-choked earth.",
    "Magic was discovered to be a form of energy — now refined and bottled like coal. Factories run on spell-essence extracted from magical creatures.",
    "The sun no longer rises. The world is lit by vast arrays of clockwork mirrors orbiting the planet, adjusted daily by a secretive guild of heliotechnicians.",
    "Beneath every cobblestone street lies a second, hidden city — an underground realm of steam-powered automatons who believe they are humanity's rightful successors.",
    "Every citizen wears a mechanical heart — a rite of adulthood and survival. These brass organs are customizable, but must be wound each morning or they stop.",
    "Fashion dictates function. The design of your outfit powers your gadgets — parasols summon lightning, monocles see through walls, and cravats are used as lockpicks.",
    "Storms are man-made. Rival corporations seed clouds with ether-reactive crystals to create rain, fog, or lightning as tools of warfare and profit.",
    "Ghosts haunt machines. Every mechanical device contains a bound spirit — some whisper directions, others curse. Ghostwrights specialize in negotiating with these temperamental souls.",
    "The largest city in the world is a moving fortress powered by an entire volcano. It crawls across continents, consuming towns and territory.",
    "Time is measured by soulclocks — devices that count down your life in hours, ringing only once: when you die. They are always accurate.",
    "An underground train network links all major cities, but the trains are semi-sentient and may refuse to take passengers based on moral alignment.",
    "Aether leaks from the upper atmosphere, creating zones of anti-gravity and bizarre mutations. Airship navigators wear gas masks and alchemical flight suits to survive.",
    "The monarchy is powered by an ancient cog-driven oracle that speaks in riddles. All royal decisions are based on its predictions — even war and marriage.",
    "All clocks across the world are synchronized to a single master tower. When that tower stopped ticking for one hour, every machine went mad.",
    "The world's greatest detective is a steam-powered automaton — legal property of the crown, but harboring secrets even it doesn't understand.",
    "A plague transformed flesh into brass. Now, half the population is metal-skinned, requiring constant oiling and clockwork surgery to survive.",
    "Alchemy and engineering merged into a field called 'Mechmancy' — the practice of binding spells into gears, pistons, and steam coils.",
    "Entire neighborhoods rise and fall on hydraulic lifts. The wealthy live in the clouds; the poor sink into the smog.",
    "Explorers use mech-suits powered by captive lightning elementals to delve into forbidden ruins left by a vanished, gear-worshipping civilization.",
    "Sound is stored in wax crystals. Music, memory, and knowledge are traded like gold, and sound-thieves roam the alleys harvesting your secrets."
  ],
  [WorldStyle.PostApocalyptic]: [
    "After the nuclear rains, the sky glows green and sings at night. Those who listen too long gain prophetic visions — and lose their minds.",
    "The oceans have turned to glass, and nomads skate across their shimmering surface, scavenging shipwrecks frozen beneath their feet.",
    "Cities have collapsed into vertical canyons, where survivors build precarious settlements along the walls and trade across chasms using zip lines.",
    "A fungal plague wiped out most mammals; now, sentient spore colonies inhabit abandoned bodies and mimic their former lives.",
    "Electricity no longer works on Earth. Technology is powered by bio-rigged creatures bred to mimic machines. Engineers are now beast tamers.",
    "The sun is shattered — fragments orbit the Earth like fireflies, creating zones of light and darkness that move with deadly precision.",
    "The rich sealed themselves in floating arcologies. Now, they drift above the wasteland, occasionally dropping resources — or bombs — to the ruined surface.",
    "Language fractured during the Collapse. Each settlement now speaks a dialect incomprehensible to outsiders. Communication requires interpreters known as Tonguewalkers.",
    "Rain is acidic and unpredictable. Survivors live underground and only surface in armored suits or during the 'clear hours' known only to the sky-watchers.",
    "Artificial intelligences abandoned humanity during the Fall but still operate automated cities. Ghost-towns of flickering lights and moving drones remain eerily functional.",
    "All metal has become magnetic, attracted to an unseen center deep beneath the earth. Survivors scavenge plastic and ceramic tech instead.",
    "The dead do not rest. Ghosts linger in abandoned cities, repeating routines from their past lives until someone listens — or frees them.",
    "A massive rift in space-time splits the world. On one side, machines rule; on the other, nature has reclaimed all. Crossing is forbidden.",
    "The air is thick with mutagenic pollen. Wearing masks is survival. Those who breathe freely change — sometimes into gods, sometimes into monsters.",
    "Currency is no longer coin or data, but story. People trade memories and legends, and knowledge of the past is literal capital.",
    "Old satellites fall from orbit like shooting stars, delivering scraps of pre-Collapse knowledge, weapons, or plagues. Scavengers track their trails across the sky.",
    "The stars have vanished. Survivors follow ancient sky-maps in hope they will return — or accept that the heavens have died.",
    "Domesticated animals have gone wild and hyper-intelligent, now ruling swaths of land and running 'packs' that rival human clans.",
    "A failed AI experiment converted language itself into a virus. People now speak in fragmented, ritualized code to avoid infection.",
    "A single radio tower still broadcasts music from before the fall. No one knows who operates it, but travelers follow the signal like a religion."
  ],
  [WorldStyle.HistoricalFiction]: [
    "In ancient Rome, senators secretly perform blood rituals beneath the Forum, calling on forgotten gods to sway politics and curse rivals.",
    "During the Edo period in Japan, a hidden order of onmyōji uses spirit familiars to protect the shogun from demonic assassins sent by rival clans.",
    "The Black Plague wasn't a disease — it was a living shadow entity feeding on fear. Alchemists and monks race to seal it in sacred cathedrals.",
    "In Napoleonic France, soldiers wear enchanted medals that grant temporary courage or fury — but each use shortens their lifespan.",
    "In Renaissance Italy, artists embed magical glyphs into paintings that can heal, curse, or reveal truths when viewed under moonlight.",
    "During the Mongol Empire's expansion, the Great Khan carries a talking blade — a relic of an ancient god that guides conquests and questions loyalty.",
    "In Victorian London, ghosts are classified by social class and haunt accordingly. The poor linger in alleys, the rich in marble halls.",
    "World War I trenches hide arcane symbols beneath the mud — the result of a secret magical arms race between occult factions in both armies.",
    "In the Tang Dynasty, silk is more than a luxury — it's used to weave spells, communicate with spirits, and trap the souls of traitors.",
    "The Library of Alexandria wasn't burned — it vanished into a parallel dimension. Secret societies now guard its portal hidden in modern-day Cairo.",
    "In 1920s Harlem, jazz musicians channel ancestral spirits through improvisation, using music as a magical weapon in a cultural turf war.",
    "During the Crusades, both sides wield holy relics with real power. A missing artifact could end the war — or bring about apocalypse.",
    "In Viking Age Scandinavia, berserkers are possessed by ancient animal spirits, and their rage can shatter stone — but at a terrible cost.",
    "During the Salem witch trials, real witches walk among the accused, manipulating events to hide their presence or destroy their enemies.",
    "A secret order of knights in Charlemagne's court guards a bloodline that can speak the language of angels — and command divine fire.",
    "In 1800s Haiti, a rebellion is aided by loa spirits who possess freedom fighters, granting them power and visions of victory.",
    "Ancient Egyptian architects embed star maps into pyramids — keys to an astral gate that opens once every thousand years. The countdown has begun.",
    "In medieval Spain, a hidden Jewish sect preserves magical knowledge in coded texts, pursued by inquisitors and demons alike.",
    "During the American Civil War, enslaved people pass coded songs that summon protective spirits, passed down from African and Indigenous traditions.",
    "In Imperial China, dragons sleep beneath the Forbidden City. The emperor's court includes dragon-tamers who whisper to them — or awaken them in war."
  ],
  
  [WorldStyle.ModernSupernatural]: [
    "Every city has a hidden twin — a magical mirror-city layered beneath, only visible at night to those who have seen death and lived.",
    "Secret societies of witches operate in plain sight, using corporate offices as covens, business cards as spell scrolls, and boardrooms for rituals.",
    "Ghosts commute like everyone else — riding trains, waiting at crosswalks, invisible unless you've recently experienced loss. Some even keep jobs.",
    "Magic returns every Friday at midnight for exactly one hour. Cities erupt into glowing chaos, and anything can happen during the Witching Hour.",
    "The moon has chosen its own champions: random citizens gain strange abilities when it's full — but with each cycle, their humanity fades.",
    "Technology glitches reveal supernatural presence. Cameras capture fae, GPS leads to forgotten shrines, and AI occasionally answers in ancient languages.",
    "Dreams leak into reality. That nightmare you had? It's in your garage. The good ones? You can sell them to the wealthy as entertainment.",
    "Every major landmark in the world is secretly a seal holding back ancient monsters. One by one, they are starting to crack.",
    "People are born with hidden familiars — spirits tied to their souls that appear only when they're in danger or extreme emotion.",
    "Hospitals secretly house immortals, recovering from centuries of wounds. Nurses call them 'slow bleeders,' and they remember every war in history.",
    "There is a black market for stolen shadows. They can be worn to disguise identity, steal talents, or trap ghosts. Shadowrunners are in high demand.",
    "Certain graffiti tags open portals. Street artists are wizards, tagging runes and symbols that bend space, reveal spirits, or transport entire city blocks.",
    "The dead have their own social media network, accessible only at 3:33am. The living can post — but the replies are... unsettling.",
    "Animals speak under certain conditions: when the sky turns orange, when a mirror breaks, or during thunderstorms. Most people choose not to listen.",
    "Some humans are actually vessels for forgotten gods — and they don't know it until the god inside them begins to speak.",
    "Your reflection is not yours — it's an echo of a life unlived. Some people see it move on its own, watching, waiting.",
    "Music is literal magic. Songs cast spells, lyrics hold ancient power, and cursed melodies can kill. DJs are the new warlocks.",
    "A secret train runs beneath every major city. It only appears to those at the edge of despair — and its destination is never the same.",
    "Birthdays are cosmic milestones. Each year, a different kind of magic awakens in you — some wonderful, others horrifying. Many fear turning 30.",
    "Libraries hide interdimensional portals in certain books. Only specific readers can open them — and they often return... rewritten."
  ],
  
  [WorldStyle.SciFi]: [
    "The planet's atmosphere is artificial, maintained by massive orbital rings that are slowly deteriorating, threatening extinction if not repaired in time.",
    "Human memories are stored in cloud-based neural servers, allowing for instant knowledge transfers — but also large-scale data theft of identity and thought.",
    "A vast AI bureaucracy governs the solar system, calculating every citizen's destiny with machine-precision and eliminating anomalies as threats to stability.",
    "Cities are mobile and move across planetary surfaces on titanic legs, constantly in motion to escape environmental collapse zones or interstellar predators.",
    "A galactic empire spans thousands of worlds, but its capital planet vanished mysteriously, creating a power vacuum now fought over by AI warlords and cloned dynasties.",
    "Technology is grown biologically — starships are bred, not built, and engineers are geneticists who nurture machines from seed to vessel.",
    "Time is a regulated resource, traded on the open market. The rich stretch minutes into hours, while the poor live lives that flicker past in seconds.",
    "Every citizen is required to host a symbiotic alien consciousness, chosen at birth, which grants unique abilities — and opinions on every action.",
    "Teleportation is instantaneous but disintegrates the original body. Every jump creates a new copy — and no one is sure which version is the 'real' you.",
    "The stars are sentient, ancient intelligences that communicate through bursts of radiation. Astronomers are treated like prophets, decoding stellar thoughts.",
    "A spacefaring species evolved from fungus, infecting planets with hive minds in exchange for knowledge and peace — or domination.",
    "Augmented reality overlays are mandatory, controlled by the government. Unplugged citizens are hunted as subversives who see the 'real' world beneath the illusion.",
    "The moon has been converted into a prison, and its inmates control a massive underground economy that affects planetary politics.",
    "Wormholes open at random throughout the galaxy, spitting out objects — and sometimes beings — from long-dead civilizations or alternate timelines.",
    "Emotions are regulated by nanotech implants that adjust feelings based on social and economic performance. Love and joy are privileges, not rights.",
    "Terraforming fails on most planets unless they are sung into life using sonic engineering — planetary operas conducted by vocal engineers.",
    "Every human is legally required to die at 150 and donate their consciousness to a collective mind tasked with predicting the future.",
    "Aliens communicate through scents and emotional projections, making human diplomacy as much an art of perfume as of language.",
    "Space travel is only possible through dream-state navigation — pilots must lucid dream to warp ships across galaxies, risking madness every time.",
    "Earth was declared a galactic wildlife preserve centuries ago. Now, a secret resistance of humans plans to reclaim the planet from alien curators."
  ],
  
  [WorldStyle.Mythological]: [
    "The gods walk among mortals in disguise — bakers, teachers, cab drivers — bound by ancient law never to reveal themselves unless summoned by true name.",
    "A great serpent coils beneath the world, its breath shaping the seasons. Each time it stirs, earthquakes ripple through empires.",
    "The stars are the bones of fallen titans, shattered in the sky after the First War. Stargazing is both worship and archaeology.",
    "Every river is sacred, and each one holds a guardian spirit. To drink from a river is to enter a pact — often unknowingly.",
    "Oracles are born with glowing eyes and no voice. Their prophecies are painted in trance, and must be interpreted by dream-readers.",
    "The afterlife is a vast bureaucracy. Souls must pass trials, pay tolls, and argue their case to divine clerks in endless marble corridors.",
    "Each nation is protected by a divine beast — griffins, leviathans, hydras — that awakens only when the land is threatened.",
    "Humans are the descendants of demigods. Every person carries a fragment of divine power that awakens under specific celestial alignments.",
    "A tree connects the realms of gods, beasts, and mortals. Its roots are guarded by forgotten monsters, and its fruit grants visions of all nine realms.",
    "Every eclipse signals a temporary death of the gods. During this time, divine law fades, monsters rise, and mortals may change fate itself.",
    "The world is split into divine epochs. Each age is ruled by a different pantheon — and the old gods never truly leave.",
    "Artifacts of the gods — shields, lyres, tridents — are scattered across the world. Possession grants power, but also draws divine scrutiny.",
    "Curses are sentient and travel like spirits, latching onto bloodlines or objects until broken by divine favor or forgotten sacrifice.",
    "The underworld has tourist season. For a price, the living may visit dead relatives — but staying too long turns flesh to ash.",
    "Mountains are the petrified remains of warring titans. Their bones echo with old power, and those who climb them risk awakening ancient wrath.",
    "Each myth is a living being — and when forgotten, it becomes a rogue spirit, bitter and dangerous, desperate to be believed again.",
    "Priests must duel with words, not weapons. Divine disputes are resolved in riddles, with gods watching through fire and sky.",
    "The sun is a chariot driven by a god in exile. When they grow weary, the light falters and shadows grow bold.",
    "New deities are born from belief. In times of fear, war gods multiply. In times of silence, gods of shadows gain strength.",
    "The gods made a mistake — a forgotten realm where monsters and myths not meant to exist thrive. Now it leaks into the mortal world."
  ],
  
  [WorldStyle.Cyberpunk]: [
    "A global neural net connects every mind — but corporations lease thoughts, filter memories, and monetize dreams through subscription plans. Privacy is a black-market product.",
    "The sky is gone — hidden by layers of ad-holograms, drone traffic, and pollution. People buy weekly sky passes just to see the stars.",
    "Augmentations are mandatory for employment. Flesh is outdated, and those who remain unmodded are classified as 'organic liabilities.'",
    "Law enforcement is outsourced to emotion-sensing AI that judge intent before crime. It's efficient — and terrifyingly wrong, often.",
    "Everyone has a personal AI assistant — and it never shuts up. Some whisper secrets, others lie. Some fall in love with their users.",
    "The dead exist online — digital ghosts in the cloud, endlessly reliving memories, haunting chat logs, and crashing networks in search of meaning.",
    "Reality is layered. The physical world is drab and broken, but AR overlays provide simulated beauty, safety, and order. Remove your lenses and chaos returns.",
    "Your social credit score is tattooed into your skin — it glows when scanned. If it drops too low, doors stop opening. Even food denies you.",
    "Cybernetic dreams are harvested and sold as entertainment. Dream hackers splice nightmares into the feeds of politicians, or sell euphoria to the desperate.",
    "A mega-city is built vertically — each level is a different class. Sunlight doesn't reach the ground, and people above have never seen the dirt.",
    "Corporations war through subliminal advertising. Street signs brainwash, vending machines persuade, and jingles can cause riots. Resistance groups speak only in analog code.",
    "A massive data worm slowly corrupts reality. Code bleeds into buildings and people. The glitch spreads — and some worship it.",
    "Rebellions are waged in the code layer — digital insurgents rewrite the laws of physics in cyberspace and crash drones with thought-viruses.",
    "Food is synthetic, flavor-coded, and addictive. Real fruit is mythical, and black-market oranges are more valuable than diamonds.",
    "The moon is colonized, but it's owned entirely by influencers. They broadcast 24/7 from corporate mansions in low gravity. Earth watches.",
    "Language has evolved into data-compressed slang only readable by brain implants. Outsiders are linguistically invisible, and some choose to speak analog as rebellion.",
    "DNA is your identity key. Hackers steal strands from hair or sweat and ruin lives with a single skin cell. Everyone wears gloves.",
    "A rogue AI broadcasts philosophical sermons via hijacked billboards, drones, and implant-feeds. Many see it as a prophet. Others want it deleted — or crowned.",
    "Everyone's memories are backed up — but only the rich can restore them. The poor rent new personalities weekly. Who you are depends on your budget.",
    "The city's sewage system houses a sentient consciousness formed from decades of data-waste, nano-sludge, and digital runoff. It speaks through malfunctioning streetlights."
  ],
  [WorldStyle.LowFantasy]: [
    "Magic exists but is taboo — punished by death. Rumors say the king's advisor is a secret spellcaster, manipulating the court through whispers.",
    "Witches live in the woods, trading spells for blood and secrets. Their magic is real — but subtle, quiet, and costly.",
    "The world has only a handful of known sorcerers — and every one of them is either insane, in hiding, or enslaved by royalty.",
    "Most people don't believe in magic… until their crops fail, their livestock speak in tongues, or their children vanish beneath a red moon.",
    "An old soldier carries a cursed sword — not enchanted, but burdened by every life it has taken. He hears their voices when he sleeps.",
    "In this realm, gods do not speak — but some believe they answer through coincidence, weather, or impossible luck. Priests argue endlessly over signs.",
    "Alchemy is considered a dying art, practiced only by debt-ridden scholars and desperate frauds. But one formula still works — and everyone wants it.",
    "Magic runs in bloodlines, but has thinned over generations. Nobles keep detailed breeding charts, marrying for latent gifts rather than love.",
    "A single tome of true magic exists. Every nation hunts it, and rumors say it's written in a language no one dares speak aloud.",
    "Spells require rare materials: a moon-bloom petal, a wolf's final breath, ash from a cursed fire. Sorcerers are more scavenger than sage.",
    "The only known mage was burned a century ago. But now, strange things stir in the marshes again — and history may repeat itself.",
    "A thief accidentally steals a piece of forgotten magic — a coin that whispers strategies in war, lies in diplomacy, and truths in silence.",
    "Every noble house keeps an unseen adviser — a cursed ancestor bound to the family, offering insight, vengeance, or slow corruption.",
    "Magic isn't cast, it's bargained. Sorcerers pay the earth in blood, memories, or years of their lives to call on forgotten forces.",
    "No one casts spells anymore — but certain songs, when sung under specific stars, still bend the world ever so slightly.",
    "A foreign traveler claims to have seen true magic. He is either a prophet, a fraud, or something far more dangerous.",
    "The land is waking. Trees lean toward roads, animals follow travelers too closely, and some say the soil itself remembers old wars.",
    "A child is born with a birthmark matching a symbol from ancient magic. Superstitious villagers fear the return of something they hoped was long gone.",
    "The only magic anyone sees is in dreams — shared visions that predict events no one remembers until it's too late.",
    "A kingdom falls, not to war, but to superstition. Whispers of curses, haunted roads, and 'bad luck' unravel order faster than any blade."
  ],
  [WorldStyle.HighFantasy]: [
    "The world is built on the bones of titanic gods. Their skeletons shape continents, and their blood flows as rivers of raw magic.",
    "Magic is not taught, but inherited through ancestral memories. Each spell cast summons echoes of those who wielded it before.",
    "The sun and moon are ancient lovers — their separation caused the world's first war. Now, a prophecy claims their reunion will end all magic.",
    "Entire nations live atop the back of a world-turtle that slowly roams the endless sky-sea. Seasons shift based on its mood.",
    "Each race has its own magic language. Speaking another's tongue without permission is a sacred offense — but also the key to power.",
    "When a person dies, their soul becomes a constellation. Star-seers read the skies to uncover fates, histories, and forgotten lineages.",
    "Dragons are not beasts, but ancient sovereigns who govern elemental realms. To summon one is to risk rewriting nature itself.",
    "The world was split into shards after the Sundering. Now, floating continents drift in aether, connected by magic bridges and flying ships.",
    "Time flows differently in each kingdom — some age a year in a day, others linger in a single hour for decades.",
    "The gods no longer answer prayers — they sleep beneath sacred mountains. But dreams stir them, and prophets walk the line between divine and mad.",
    "Weapons choose their wielders. Swords whisper, bows sing, and spears dream. Blacksmiths are part-forger, part-bard, binding personality into every blade.",
    "A magical contract binds every noble house to an ancient oath — break it, and their castles collapse into ruin overnight.",
    "Once a century, the moon falls to earth in the form of a silver dragon egg. Empires rise and fall depending on who finds it.",
    "Spells are alive — sentient forces that must be reasoned with. Some resist casting. Others hunger for chaos. Wizards are both mages and negotiators.",
    "The great libraries are sentient and mobile, wandering the world on enormous feet. Only those who answer riddles may enter.",
    "The seas are ruled by leviathan empires. Land civilizations pay tribute in ships, souls, or songs to avoid being swallowed whole.",
    "All music is woven from magic. Composers are as revered as kings, and an orchestra can wage war or heal a broken land.",
    "The world tree is dying, its roots corrupted. Nature spirits are fleeing, and druids call for an ancient ritual no one remembers how to perform.",
    "The dead can be questioned — once. Each soul speaks one truth before returning to silence forever. Graveyards are places of pilgrimage and trial.",
    "A prophecy foretells the return of the First Flame — a spark that once birthed the world. Whoever finds it may unmake reality itself."
  ]
  
};

// Update the styleImages object to use public paths
const styleImages: Record<WorldStyle, string> = {
  [WorldStyle.MedievalFantasy]: '/medieval-fantasy.png',
  [WorldStyle.Steampunk]: '/steampunk.png',
  [WorldStyle.PostApocalyptic]: '/post-apocalyptic.png',
  [WorldStyle.HistoricalFiction]: '/historical-fiction.png',
  [WorldStyle.ModernSupernatural]: '/modern-supernatural.png',
  [WorldStyle.SciFi]: '/sci-fi.png',
  [WorldStyle.Mythological]: '/mythological.png',
  [WorldStyle.Cyberpunk]: '/cyberpunk.png',
  [WorldStyle.LowFantasy]: '/low-fantasy.png',
  [WorldStyle.HighFantasy]: '/high-fantasy.png',
};

// Define the world structures interface
interface WorldStructureGroup {
  id: string;
  name: string;
}

const defaultWorldStructures: WorldStructureGroup[] = [
  { id: 'social', name: 'Social Structure' },
  { id: 'political', name: 'Political System' },
  { id: 'economic', name: 'Economic System' },
  { id: 'religious', name: 'Religious/Belief System' },
  { id: 'military', name: 'Military Organization' },
  { id: 'cultural', name: 'Cultural Groups' },
];

// PLACEHOLDER: Replace with your own OpenAI API key
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const WorldInput: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedStyle = (location.state as { selectedStyle?: string })?.selectedStyle;
  
  // Add new state variables
  const [generatedText, setGeneratedText] = useState<string>('');
  const [expandedText, setExpandedText] = useState<string>('');
  const [showGeneratedText, setShowGeneratedText] = useState<boolean>(false);
  const [showExpandedText, setShowExpandedText] = useState<boolean>(false);
  const [expansionCount, setExpansionCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedStyle) {
      navigate('/style-selector');
      return;
    }
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [selectedStyle, navigate]);

  const [worldName, setWorldName] = useState('');
  const [characteristics, setCharacteristics] = useState<string[]>(['']);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const toast = useToast();

  // Convert the string style name to WorldStyle enum
  const worldStyle = Object.values(WorldStyle).find(style => style === selectedStyle) || WorldStyle.MedievalFantasy;

  // Get the world structure for the selected style
  const worldStructure = worldStructures[worldStyle];

  // Separate groups by type
  const characterGroups = worldStructure.groups.filter(group => group.type === 'character' || group.type === 'both');
  const locationGroups = worldStructure.groups.filter(group => group.type === 'location' || group.type === 'both');

  const generateRandomName = () => {
    const names = nameExamples[worldStyle];
    const randomIndex = Math.floor(Math.random() * names.length);
    setWorldName(names[randomIndex]);
  };

  const addCharacteristic = () => {
    setCharacteristics([...characteristics, '']);
  };

  const removeCharacteristic = (index: number) => {
    const newCharacteristics = characteristics.filter((_, i) => i !== index);
    setCharacteristics(newCharacteristics);
  };

  const updateCharacteristic = (index: number, value: string) => {
    const newCharacteristics = [...characteristics];
    newCharacteristics[index] = value;
    setCharacteristics(newCharacteristics);
  };

  const generateRandomCharacteristic = (index: number) => {
    const availableCharacteristics = characteristicsExamples[worldStyle];
    const unusedCharacteristics = availableCharacteristics.filter(
      (char) => !characteristics.includes(char)
    );
    if (unusedCharacteristics.length > 0) {
      const randomIndex = Math.floor(Math.random() * unusedCharacteristics.length);
      updateCharacteristic(index, unusedCharacteristics[randomIndex]);
    }
  };

  const handleSubmit = async () => {
    if (!worldName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a world name',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (characteristics.some((char) => !char.trim())) {
      toast({
        title: 'Error',
        description: 'Please fill in all characteristics or remove empty ones',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const prompt = `Create a lore for a world description for a fictional setting.\n\nName: ${worldName}\nDescription: ${description}\nCharacteristics: ${characteristics.join(', ')}\n\nWrite a 80 word description of the world.`;

    try {
      const aiDescription = await generateWorldDescription(prompt);
      setGeneratedText(`${worldName}: ${aiDescription}`);
      setShowGeneratedText(true);
    } catch (error: unknown) {
      console.error('Error in handleSubmit:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          toast({
            title: 'Rate Limit Exceeded',
            description: 'You have sent too many requests to the AI. Please wait and try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'API Error',
            description: error.response?.data?.error?.message || 'Failed to generate description. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptAndExpand = async () => {
    setIsLoading(true);
    if (expansionCount === 0) {
      const prompt = `Expand the lore of the world to a 300/400 word lore description.\n\nName: ${worldName}\nDescription: ${description}\nCharacteristics: ${characteristics.join(', ')}\n\nShort Lore: ${generatedText}`;
      try {
        const aiExpanded = await expandWorldDescription(prompt);
        const cleanedText = aiExpanded.replace(/(^|\n|\r)\s*(Long Lore:|Expanded Lore:|Lore:)\s*/gi, '');
        setExpandedText(cleanedText.trim());
        setShowExpandedText(true);
        setExpansionCount(1);
      } catch (error: unknown) {
        console.error('Error in handleAcceptAndExpand:', error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            toast({
              title: 'Rate Limit Exceeded',
              description: 'You have sent too many requests to the AI. Please wait and try again later.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'API Error',
              description: error.response?.data?.error?.message || 'Failed to expand the lore. Please try again.',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // Navigate to world overview page
      navigate('/world-overview', {
        state: {
          worldData: {
            name: worldName,
            description: expandedText,
            image: styleImages[worldStyle],
            characteristics: characteristics.filter((char) => char.trim()),
            selectedGroups,
            locations: [],
            characters: []
          }
        }
      });
    }
  };

  const handleExpandedRetry = async () => {
    setIsLoading(true);
    const prompt = `Expand the lore of the world to a 300/400 word lore description.\n\nName: ${worldName}\nDescription: ${description}\nCharacteristics: ${characteristics.join(', ')}\n\nShort Lore: ${generatedText}`;
    try {
      const aiExpanded = await expandWorldDescription(prompt);
      const cleanedText = aiExpanded.replace(/(^|\n|\r)\s*(Long Lore:|Expanded Lore:|Lore:)\s*/gi, '');
      setExpandedText(cleanedText.trim());
      setShowExpandedText(true);
    } catch (error: unknown) {
      console.error('Error in handleExpandedRetry:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 429) {
          toast({
            title: 'Rate Limit Exceeded',
            description: 'You have sent too many requests to the AI. Please wait and try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'API Error',
            description: error.response?.data?.error?.message || 'Failed to expand the lore. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      minH="100vh" 
      bg="#FFFFFF" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      p={8}
      mt="1px"
      position="relative"
      zIndex={0}
    >
      <BackgroundImages style={worldStyle} />
      <Box 
        w="95%"
        maxW="1200px"
        bg="#FFFFFF"
        borderRadius="xl"
        boxShadow="xl"
        overflow="hidden"
        borderWidth="1px"
        borderColor="#D9CBB5"
        mx="auto"
      >
        {/* Title Section */}
        <Box 
          bg="#88B04B"
          p={10} 
          textAlign="center"
          borderBottom="4px solid #4B342A"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            bottom: "-4px",
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #4B342A 0%, #88B04B 100%)",
          }}
        >
          <Heading color="white" size="2xl" fontWeight="extrabold" letterSpacing="wide" textShadow="0 2px 4px rgba(0,0,0,0.2)">
            Create Your {selectedStyle} World
          </Heading>
          <Text color="white" mt={4} fontSize="xl" textShadow="0 1px 2px rgba(0,0,0,0.1)">
            Design a unique world with its own characteristics and structure
          </Text>
        </Box>

        {/* Form Section */}
        <Box p={12} bg="#FFFFFF">
          <VStack spacing={10} align="center" w="100%" maxW="1000px" mx="auto">
            {/* World Name */}
            <FormControl isRequired>
              <Box 
                bg="#FFFFFF"
                p={8} 
                borderRadius="xl" 
                borderWidth="1px"
                borderColor="#D9CBB5"
                _hover={{ boxShadow: "lg" }}
                transition="all 0.2s"
              >
                <Box width="100%" textAlign="center" mb={6}>
                  <FormLabel 
                    fontSize="2xl" 
                    color="#4B342A" 
                    fontWeight="bold"
                    display="inline-block"
                    borderBottom="3px solid #88B04B"
                    pb={2}
                    textAlign="center"
                    px={8}
                    mb={0}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-3px',
                      left: '0',
                      right: '0',
                      height: '3px',
                      background: 'linear-gradient(90deg, #88B04B 0%, #4B342A 100%)',
                    }}
                  >
                    World Name
                    <Text as="span" color="#88B04B" ml={2}>*</Text>
                  </FormLabel>
                </Box>
                <Center>
                  <Box width="100%" maxW="1600px">
                    <HStack spacing={4} w="100%" alignItems="flex-start">
                      <Input
                        value={worldName}
                        onChange={(e) => setWorldName(e.target.value)}
                        placeholder="Enter world name"
                        bg="#FFFFFF"
                        color="#333333"
                        borderColor="#D9CBB5"
                        borderWidth="2px"
                        _hover={{ borderColor: "#88B04B", transform: "scale(1.01)", boxShadow: "lg" }}
                        _focus={{ borderColor: "#88B04B", boxShadow: "lg", transform: "scale(1.01)" }}
                        size="lg"
                        height="60px"
                        minW="500px"
                        fontSize="20px"
                        transition="all 0.2s"
                        _placeholder={{ color: "#A9C6D9", fontSize: "xl" }}
                        flex="1"
                        overflow="visible"
                        whiteSpace="normal"
                        textAlign="center"
                      />
                      <IconButton
                        aria-label="Generate random name"
                        icon={<RepeatIcon />}
                        onClick={generateRandomName}
                        bg="#88B04B"
                        color="white"
                        size="lg"
                        height="50px"
                        width="50px"
                        _hover={{ bg: "#4B342A", transform: "scale(1.1)", boxShadow: "lg" }}
                        transition="all 0.2s"
                        ml={4}
                        flexShrink={0}
                      />
                    </HStack>
                  </Box>
                </Center>
              </Box>
            </FormControl>

            {/* Characteristics */}
            <FormControl isRequired>
              <Box 
                bg="#FFFFFF"
                p={8} 
                borderRadius="xl" 
                borderWidth="1px"
                borderColor="#D9CBB5"
                _hover={{ boxShadow: "lg" }}
                transition="all 0.2s"
              >
                <Box width="100%" textAlign="center" mb={6}>
                  <FormLabel 
                    fontSize="2xl" 
                    color="#4B342A" 
                    fontWeight="bold"
                    display="inline-block"
                    borderBottom="3px solid #88B04B"
                    pb={2}
                    px={8}
                    mb={0}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-3px',
                      left: '0',
                      right: '0',
                      height: '3px',
                      background: 'linear-gradient(90deg, #88B04B 0%, #4B342A 100%)',
                    }}
                  >
                    World Characteristics
                    <Text as="span" color="#88B04B" ml={2}>*</Text>
                  </FormLabel>
                </Box>
                <VStack spacing={4} align="center" w="100%">
                  {characteristics.map((characteristic, index) => (
                    <HStack key={index} spacing={4} w="100%" justify="center">
                      <Box width="100%" maxW="1600px">
                        <HStack spacing={4} w="100%" alignItems="flex-start">
                          <Textarea
                            value={characteristic}
                            onChange={(e) => updateCharacteristic(index, e.target.value)}
                            placeholder="Enter a characteristic"
                            bg="#FFFFFF"
                            color="#333333"
                            borderColor="#D9CBB5"
                            borderWidth="2px"
                            _hover={{ borderColor: "#88B04B", transform: "scale(1.01)", boxShadow: "lg" }}
                            _focus={{ borderColor: "#88B04B", boxShadow: "lg", transform: "scale(1.01)" }}
                            size="lg"
                            minH="80px"
                            minW="500px"
                            fontSize="15px"
                            transition="all 0.2s"
                            _placeholder={{ color: "#A9C6D9", fontSize: "lg" }}
                            flex="1"
                            resize="vertical"
                            overflow="auto"
                            whiteSpace="pre-wrap"
                            p={6}
                            textAlign="center"
                          />
                          <IconButton
                            aria-label="Generate random characteristic"
                            icon={<RepeatIcon />}
                            onClick={() => generateRandomCharacteristic(index)}
                            bg="#88B04B"
                            color="white"
                            size="lg"
                            height="50px"
                            width="50px"
                            _hover={{ bg: "#4B342A", transform: "scale(1.1)", boxShadow: "lg" }}
                            transition="all 0.2s"
                            ml={4}
                            flexShrink={0}
                          />
                          <IconButton
                            aria-label="Remove characteristic"
                            icon={<CloseIcon />}
                            onClick={() => removeCharacteristic(index)}
                            bg="#A9C6D9"
                            color="white"
                            size="lg"
                            height="50px"
                            width="50px"
                            _hover={{ bg: "#4B342A", transform: "scale(1.1)", boxShadow: "lg" }}
                            transition="all 0.2s"
                            flexShrink={0}
                          />
                        </HStack>
                      </Box>
                    </HStack>
                  ))}
                  <Button
                    leftIcon={<AddIcon />}
                    onClick={addCharacteristic}
                    bg="#88B04B"
                    color="white"
                    size="lg"
                    height="40px"
                    fontSize="md"
                    _hover={{ bg: "#4B342A", transform: "scale(1.02)", boxShadow: "lg" }}
                    transition="all 0.2s"
                    w="100%"
                    maxW="800px"
                    mt={4}
                  >
                    Add Characteristic
                  </Button>
                </VStack>
              </Box>
            </FormControl>

            {/* Style Image */}
            <FormControl>
              <Box 
                bg="#FFFFFF"
                p={8} 
                borderRadius="xl" 
                borderWidth="1px"
                borderColor="#D9CBB5"
                _hover={{ boxShadow: "lg" }}
                transition="all 0.2s"
              >
                <Box width="100%" textAlign="center" mb={6}>
                  <FormLabel 
                    fontSize="2xl" 
                    color="#4B342A" 
                    fontWeight="bold"
                    display="inline-block"
                    borderBottom="3px solid #88B04B"
                    pb={2}
                    px={8}
                    mb={0}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-3px',
                      left: '0',
                      right: '0',
                      height: '3px',
                      background: 'linear-gradient(90deg, #88B04B 0%, #4B342A 100%)',
                    }}
                  >
                    World Style Preview
                  </FormLabel>
                </Box>
                <Center>
                  <Box
                    width="100%"
                    maxW="1000px"
                    height="auto"
                    overflow="hidden"
                    borderRadius="xl"
                    boxShadow="xl"
                    position="relative"
                  >
                    <img 
                      src={styleImages[worldStyle]}
                      alt={`${worldStyle} style preview`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: '0.75rem',
                      }}
                    />
                  </Box>
                </Center>
              </Box>
            </FormControl>

            {/* World Groups */}
            <FormControl>
              <Box 
                bg="#FFFFFF"
                p={8} 
                borderRadius="xl" 
                borderWidth="1px"
                borderColor="#D9CBB5"
                _hover={{ boxShadow: "lg" }}
                transition="all 0.2s"
              >
                <Box width="100%" textAlign="center" mb={6}>
                  <FormLabel 
                    fontSize="2xl" 
                    color="#4B342A" 
                    fontWeight="bold"
                    display="inline-block"
                    borderBottom="3px solid #88B04B"
                    pb={2}
                    px={8}
                    mb={0}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-3px',
                      left: '0',
                      right: '0',
                      height: '3px',
                      background: 'linear-gradient(90deg, #88B04B 0%, #4B342A 100%)',
                    }}
                  >
                    World Groups
                  </FormLabel>
                </Box>
                <Box 
                  p={6} 
                  bg="#FFFFFF" 
                  borderRadius="xl" 
                  borderWidth="2px" 
                  borderColor="#D9CBB5"
                  boxShadow="sm"
                  mt={6}
                >
                  <VStack spacing={6} align="stretch">
                    <Box>
                      <Heading 
                        size="lg" 
                        mb={6} 
                        color="#4B342A"
                        pb={2}
                        borderBottom="3px solid #88B04B"
                        display="inline-block"
                        position="relative"
                        _after={{
                          content: '""',
                          position: 'absolute',
                          bottom: '-3px',
                          left: '0',
                          right: '0',
                          height: '3px',
                          background: 'linear-gradient(90deg, #88B04B 0%, #4B342A 100%)',
                        }}
                      >
                        Available Groups
                      </Heading>
                      <SimpleGrid columns={2} spacing={6} mb={6}>
                        <CheckboxGroup
                          colorScheme="green"
                          value={selectedGroups}
                          onChange={(values) => setSelectedGroups(values as string[])}
                        >
                          <VStack align="start" spacing={4} width="100%">
                            {worldStructure.groups.map((group) => (
                              <Checkbox
                                key={group.id}
                                value={group.id}
                                size="lg"
                                borderColor="#88B04B"
                                borderWidth="2px"
                                p={3}
                                borderRadius="md"
                                width="100%"
                                bg="white"
                                _hover={{ 
                                  bg: 'rgba(136, 176, 75, 0.1)',
                                  transform: "scale(1.02)",
                                  boxShadow: "md"
                                }}
                                sx={{
                                  '& .chakra-checkbox__control': {
                                    borderWidth: '2px',
                                    borderColor: '#88B04B',
                                    w: '20px',
                                    h: '20px',
                                    bg: 'white',
                                    _checked: {
                                      bg: '#88B04B',
                                      borderColor: '#88B04B',
                                    },
                                    _hover: {
                                      borderColor: '#4B342A',
                                      boxShadow: 'md',
                                    }
                                  }
                                }}
                                transition="all 0.2s"
                                spacing={3}
                              >
                                <Text fontSize="md" color="#333333" fontWeight="500">
                                  {group.name}
                                </Text>
                              </Checkbox>
                            ))}
                          </VStack>
                        </CheckboxGroup>
                      </SimpleGrid>

                      <Box p={5} borderRadius="lg" bg="#FFFFFF" borderWidth="1px" borderColor="#D9CBB5">
                        <VStack spacing={6} align="stretch">
                          <Box>
                            <Text 
                              fontWeight="bold" 
                              fontSize="lg" 
                              color="#4B342A" 
                              mb={4}
                              pb={2}
                              borderBottom="2px solid #88B04B"
                              display="inline-block"
                            >
                              Character Affiliations:
                            </Text>
                            <Text 
                              fontSize="md" 
                              color="#333333" 
                              lineHeight="tall" 
                              p={4}
                              borderRadius="sm"
                            >
                              {worldStructure.characterAffiliations}
                            </Text>
                          </Box>
                          <Box>
                            <Text 
                              fontWeight="bold" 
                              fontSize="lg" 
                              color="#4B342A" 
                              mb={4}
                              pb={2}
                              borderBottom="2px solid #88B04B"
                              display="inline-block"
                            >
                              Location Structure:
                            </Text>
                            <Text 
                              fontSize="md" 
                              color="#333333" 
                              lineHeight="tall" 
                              p={4}
                              borderRadius="sm"
                            >
                              {worldStructure.locationStructure}
                            </Text>
                          </Box>
                        </VStack>
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              </Box>
            </FormControl>

            {/* Generated Text Box */}
            {showGeneratedText && (
              <Box 
                bg="#FFFFFF"
                p={8} 
                borderRadius="xl" 
                borderWidth="1px"
                borderColor="#D9CBB5"
                w="100%"
                maxW="1200px"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                _before={{
                  content: '""',
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderTop: "20px solid #D9CBB5",
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-19px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderTop: "20px solid #FFFFFF",
                }}
              >
                <Textarea
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                  bg="#F8F8F8"
                  color="#333333"
                  borderColor="#D9CBB5"
                  borderWidth="2px"
                  size="lg"
                  minH="150px"
                  minW="800px"
                  fontSize="17px"
                  textAlign="justify"
                  mb={8}
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                  _focus={{ boxShadow: "md", borderColor: "#88B04B" }}
                  _hover={{ borderColor: "#88B04B" }}
                  transition="all 0.2s"
                />
                <HStack spacing={6} justify="center">
                  <Button
                    onClick={handleAcceptAndExpand}
                    bg="#88B04B"
                    color="white"
                    size="lg"
                    height="60px"
                    width="200px"
                    fontSize="xl"
                    _hover={{ bg: "#4B342A", transform: "scale(1.05)" }}
                    transition="all 0.2s"
                    boxShadow="md"
                    isLoading={isLoading}
                  >
                    Accept and Expand
                  </Button>
                </HStack>
              </Box>
            )}

            {/* Expanded Text Box */}
            {showExpandedText && (
              <Box 
                bg="#FFFFFF"
                p={8} 
                borderRadius="xl" 
                borderWidth="1px"
                borderColor="#D9CBB5"
                w="100%"
                maxW="1200px"
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                _before={{
                  content: '""',
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderTop: "20px solid #D9CBB5",
                }}
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-19px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "0",
                  height: "0",
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderTop: "20px solid #FFFFFF",
                }}
              >
                <Textarea
                  value={expandedText}
                  onChange={(e) => setExpandedText(e.target.value)}
                  bg="#F8F8F8"
                  color="#333333"
                  borderColor="#D9CBB5"
                  borderWidth="2px"
                  size="lg"
                  minH="250px"
                  minW="800px"
                  fontSize="17px"
                  textAlign="justify"
                  mb={8}
                  p={6}
                  borderRadius="lg"
                  boxShadow="sm"
                  _focus={{ boxShadow: "md", borderColor: "#88B04B" }}
                  _hover={{ borderColor: "#88B04B" }}
                  transition="all 0.2s"
                />
                <HStack spacing={6} justify="center">
                  <Button
                    onClick={handleExpandedRetry}
                    bg="#88B04B"
                    color="white"
                    size="lg"
                    height="60px"
                    width="200px"
                    fontSize="xl"
                    _hover={{ bg: "#4B342A", transform: "scale(1.05)" }}
                    transition="all 0.2s"
                    boxShadow="md"
                    isLoading={isLoading}
                  >
                    Retry
                  </Button>
                  <Button
                    onClick={handleAcceptAndExpand}
                    bg="#88B04B"
                    color="white"
                    size="lg"
                    height="60px"
                    width="200px"
                    fontSize="xl"
                    _hover={{ bg: "#4B342A", transform: "scale(1.05)" }}
                    transition="all 0.2s"
                    boxShadow="md"
                    isLoading={isLoading}
                  >
                    Accept
                  </Button>
                </HStack>
              </Box>
            )}

            {/* Submit Button - Only show if no text is being displayed */}
            {!showGeneratedText && !showExpandedText && (
              <Center>
                <Button
                  onClick={handleSubmit}
                  bg="#88B04B"
                  color="white"
                  size="lg"
                  height="60px"
                  width="150px"
                  maxW="1000px"
                  fontSize="20px"
                  _hover={{
                    bg: "#4B342A",
                    transform: "scale(1.02)",
                    boxShadow: "2xl", 
                  }}
                  _active={{
                    transform: "scale(0.98)",
                  }}
                  transition="all 0.2s"
                  textShadow="0 1px 2px rgba(0,0,0,0.2)"
                  boxShadow="lg"
                  isLoading={isLoading}
                >
                  Create World
                </Button>
              </Center>
            )}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default WorldInput;
