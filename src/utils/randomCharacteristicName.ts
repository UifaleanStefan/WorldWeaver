const characteristicNamePools: Record<string, string[]> = {
  "noble-houses": [
    "House Valemont", "House Caerwyn", "House Thalebrand", "House Rookstone", "House Eldemar",
    "House Dornhelm", "House Blackcairn", "House Wyvernblood", "House Crestvale", "House Morgryth",
    "House Ironwood", "House Starfall", "House Verelthane", "House Redthorne", "House Dravenmere",
    "House Windemere", "House Ashdown", "House Nightwhisper", "House Gloomveil", "House Silvershroud"
  ],
  "knight-orders": [
    "Order of the Silver Dawn", "Knights of the Shattered Shield", "Order of the Crimson Lance",
    "Sentinels of the Verdant Blade", "Knights of the Eclipse", "Brotherhood of the Thorned Rose",
    "Order of the Golden Crown", "Guardians of the Sacred Flame", "The Ironwardens",
    "Knights of the Howling Gale", "The Sapphire Sentinels", "Order of the Risen Sun",
    "Bladebearers of Eldwyn", "Knights of the Bleeding Moon", "Wardens of the Everwood",
    "The Valiant Templars", "Brotherhood of the Silent Oath", "Order of the Radiant Cross",
    "Shieldbearers of Thallanor", "Knights of the Obsidian Throne"
  ],
  "kingdoms": [
    "Kingdom of Virelia", "Eldrath Dominion", "The Sovereignty of Greymoor", "High Kingdom of Aranor",
    "The Shattered Isles", "Kingdom of Caer Toren", "Dominion of Stormfen", "The Suncrest Realm",
    "Frosthelm Kingdom", "The Verdant Expanse", "Crimson Crown Dominion", "Kingdom of Duskspire",
    "The Seven Marches", "The Ember Coast", "Kingdom of Hollowmere", "The Golden Reaches",
    "Thornhold Realm", "Kingdom of Avelora", "Twilight Sovereignty", "Kingdom of Wylderan"
  ],
  "secret-cults": [
    "Cult of the Whispering Moon", "Children of the Abyss", "The Veilborn Circle",
    "Disciples of the Withered Tree", "Keepers of the Bloodstone", "The Obsidian Covenant",
    "The Crimson Tongue", "The Order of the Final Breath", "Daughters of the Endless Night",
    "The Pale Serpent Society", "Ashen Brotherhood", "Cult of the Forsaken Flame",
    "Watchers of the Sunken Eye", "The Bleeding Star Cult", "Echoes of the Black Tide",
    "Hands of the Hollow King", "The Eclipsed Brotherhood", "The Wailing Choir",
    "The Verdant Maw", "Order of the Severed Dawn"
  ],
  "religions": [
    "Faith of the Eternal Flame", "Church of the Verdant Path", "Cult of the Golden Star",
    "The Twilight Creed", "The Order of Sacred Stone", "Daughters of the Radiant One",
    "Way of the Celestial River", "Cult of the Winter Queen", "The Holy Order of Light and Thorn",
    "Children of the Veiled Sun", "Doctrine of the Starlit Crown", "Followers of the Crimson Prophet",
    "The Ashen Faith", "Shepherds of the Drowned Gods", "Believers of the Endless Sky",
    "The Silent Cathedral", "Sons of the Dawnforged", "The Emerald Pathway", "The Seraphic Hosts",
    "Cult of the Blackwood Saint"
  ],
  "mage-circles": [
    "Circle of the Shifting Sands", "The Astral Arcana", "Brotherhood of the Broken Sigil",
    "The Ebon Spire", "Circle of the Twilight Weave", "The Enclave of Hidden Stars",
    "Order of the Verdant Veil", "The Arcane Assembly", "Circle of the Frosted Sun",
    "The Luminous Conclave", "Cabal of the Obsidian Mind", "Circle of the Silent Grove",
    "The Dreamwalkers", "Custodians of the Mystic Tide", "The Emberveil Conclave",
    "Mages of the Verdant Shard", "The Gilded Sigil", "Coven of the Umbral Eye",
    "Circle of the Whispering Roots", "Keepers of the Ethereal Flame"
  ],
  "merchant-guilds": [
    "The Golden Barter Company", "Guild of the Silver Coin", "The Crimson Trade Pact",
    "The Sevenfold Mercantile", "League of Verdant Traders", "The Iron Ledger Consortium",
    "Guild of the Wandering Stars", "Silkroad Compact", "The Merchant Princes",
    "Goldenleaf Trading Guild", "Fellowship of the Open Hand", "The Gilded Caravan",
    "Ivory Road Merchants", "The Starbound Traders", "Sapphire Consortium",
    "Guild of the Ashen Road", "Emerald Bazaar", "Windward Traders' League",
    "Duskshore Merchants", "The Brazen Coin Syndicate"
  ],
  "guilds": [
    "Ironwheel Guild", "Guild of Brasswrights", "The Verdigris Brotherhood", "Smokestack Union",
    "The Clockwork Pact", "Artificer's Assembly", "Gilded Gear Guild", "The Rivet Consortium",
    "Aethercraft Syndicate", "Cogsmen's Fellowship", "Guild of the Sooted Hand", "The Copper Circuit Guild",
    "The Alloy Brotherhood", "The Steamwright's Circle", "Guild of the Buried Sun", "Gearforged League",
    "The Pneumatic Brotherhood", "Machinist Guild of Ashport", "The Tempered Anvil Collective",
    "Skygear Merchants' Guild"
  ],
  "airship-crews": [
    "The Soaring Valkyries", "Captain Hollander's Raiders", "The Brass Tempest", "Blackwake Corsairs",
    "The Aetherwing Company", "Crimson Zephyr Crew", "The Ironcloud Marauders", "Stormbrace Squadron",
    "Crew of the Rusted Horizon", "Gilded Sparrow Voyagers", "The Fogbound Corsairs", "Skyblazer Brigade",
    "The Obsidian Drake Crew", "The Shrouded Mast Collective", "Airborne Raiders of Eldwyck",
    "The Scarlet Zeppelins", "Whalebone Windriders", "The Cogsail Marauders", "The Dustwind Flotilla",
    "The Clockwork Corsairs"
  ],
  "industrial-corps": [
    "Cauldrake Industries", "Frostlock Manufacturing", "Vexbolt Conglomerate", "New Aether Works",
    "Blackthorn Foundries", "Helios Ironworks", "Thornwright Engineering", "Ironheart Consortium",
    "Everforge Industrial", "Crimsonsteam Enterprises", "Graft & Spindle Manufacturing", "Aurumtech Systems",
    "Stormspire Industries", "Bellweather Mechanica", "Cloudspire Technologies", "Sovereign Gearworks",
    "Brassspire Incorporated", "Wraithlock Industries", "Nocturne Engineering Co.", "Fulcrum Industrial Syndicate"
  ],
  "inventors-societies": [
    "The League of Brass Minds", "Society of the Aetherborne", "The Paragon Tinkerers", "Arcane Mechanics Collective",
    "The Guild of Gilded Thought", "Inventors' Brotherhood of Gearford", "Society of the Obscura Device",
    "The Sapphire Cog Club", "The Chronos Inventors' Society", "Society of the Sputtering Spark",
    "The Tinkerer's Union", "The Society of Arc-Light Architects", "Brassbolt Engineers' Circle",
    "The Pneumatic League", "The Electro-Mechanists Guild", "Smokestack Innovators", "The Gearspring Assembly",
    "Vanguard Society of Tinkerers", "The Cogwright Fellows", "The Aerodynamist Society"
  ],
  "steam-militias": [
    "The Ironclad Militia", "Steamguard Battalion", "The Brassfront Brigade", "Cloudforge Rangers",
    "The Smogwalk Sentinels", "3rd Verdant Rifles", "The Ashenmarch Guard", "Steelspire Defenders",
    "Redcoil Infantry", "The Mechanized Hussars", "The Blacklung Brigade", "Stormgear Sentinels",
    "Ironfog Battalion", "Embersteam Troopers", "The Cinderspire Cavalry", "Garrison of the Gilded Cog",
    "Skyborne Infantry", "Clockwork Irregulars", "Boltshot Brigade", "Thunderworks Militia"
  ],
  "secret-orders": [
    "Order of the Hidden Dynamo", "The Cloaked Cog Conclave", "Brotherhood of the Smoldering Sigil",
    "The Rusted Thorn Society", "The Luminous Veil", "Whispering Steam Order", "The Copper Serpent",
    "Order of the Blackened Gear", "Cult of the Shattered Aether", "The Obscured Workshop",
    "Circle of the Iron Covenant", "Brotherhood of the Sputtering Flame", "The Chained Sun Conclave",
    "Smokestack Shadows", "Warden Order of the Twisted Key", "The Silent Plume", "Order of the Verdant Steam",
    "Sons of the Aether Maw", "The Clockwork Enclave", "The Rustveil Order"
  ],
  "scientific-institutes": [
    "Verdant Aether Research Institute", "Institute of Pneumatic Sciences", "The Lucent Gear Society",
    "Academy of Temporal Studies", "Ashenspire Institute of Mechanics", "New Eldwyck Academy of Innovation",
    "Institute for Aetheric Advancement", "The Arkwright Society", "Academy of Boundless Steam",
    "Sovereign School of Engineering", "Westmarch Mechanics Institute", "Cogwright College of Invention",
    "The Ironworks Research Syndicate", "Academy of Atmospheric Sciences", "Empyreal Institute of Progress",
    "The Gilded Spring Academy", "Brassspire Center for Applied Sciences", "Obsidian Research Collective",
    "Institute of Dynamo and Energy", "New Dawn Scientific Society"
  ],
  "survivor-factions": [
    "The Ashen Banner", "The Rusted Legion", "The Last Dawn", "The Ironbound", "The Wasteland Pact", "The Scorched", "The New Order", "The Reclaimers", "The Forsaken", "The Dustborn"
  ],
  "postapoc-clans": [
    "Red Sand Clan", "Ironjaw Clan", "The Bonepickers", "The Mire Clan", "The Coyote Kin", "The Burnt Hands", "The Tunnelers", "The Glasswalkers", "The Salt Rats", "The Night Howlers"
  ],
  "warlord-territories": [
    "The Baronies of Blacktop", "The Chrome Marches", "The Dead Zone", "The Iron Range", "The Shatterlands", "The Baron's Reach", "The Blightlands", "The Ruinfields", "The Scarred Expanse", "The Craterlands"
  ],
  "remnant-govts": [
    "The Continuity", "The Last Republic", "The Directorate", "The Old Guard", "The Provisional Authority", "The Restoration Council", "The Free State", "The Enclave", "The Coalition", "The Unified Command"
  ],
  "tech-cults": [
    "The Circuit Prophets", "The Order of the Atom", "The Silicon Faithful", "The Nano Ascendants", "The Data Seekers", "The Machine Apostles", "The Cog Children", "The Codebound", "The Augurs of Steel", "The Quantum Disciples"
  ],
  "scavenger-crews": [
    "The Rust Hawks", "The Gearjacks", "The Scrappers", "The Bolt Rats", "The Wire Dogs", "The Salvage Kings", "The Junkrunners", "The Patchwork Crew", "The Sprocket Gang", "The Duct Tape Bandits"
  ],
  "nomadic-tribes": [
    "The Dustwalkers", "The Sun Chasers", "The Road Spirits", "The Sandstriders", "The Longriders", "The Mirage Clan", "The Windborne", "The Drifters", "The Outlanders", "The Horizon Seekers"
  ],
  "salvage-guilds": [
    "The Guild of the Broken Spanner", "The Chrome Consortium", "The Iron Salvagers", "The Wreckers' Union", "The Scrapwrights", "The Rust Cartel", "The Reclaimers' Guild", "The Bolt Brotherhood", "The Foundrymen", "The Patchers' League"
  ],
  "historical-noble-houses": [
    "House Vexmere", "House Ashcroft", "House Duskwood", "House Bramblethorn", "House Wynthorne", "House Redmoor", "House Greystone", "House Evermere", "House Blackbriar", "House Thorncrown", "House Ashenford", "House Ravenshade", "House Fairwyn", "House Stonebrook", "House Crestfall", "House Emberlain", "House Goldmere", "House Darkhollow", "House Hollowmere", "House Windrose"
  ],
  "historical-military-regiments": [
    "The Iron Lancers", "Blackthorn Battalion", "The Redcloaks", "Viper Company", "The Ashen Dragoons", "Wolfhelm Brigade", "The Stormbreakers", "Bladewatch Regiment", "Golden Pike Division", "The Silent Spears", "The Firebrand Legion", "Daggerfall Cavalry", "Crimson Hawk Battalion", "The Stonewall Guard", "Frostbite Infantry", "Ravenclaw Regiment", "Sunshield Troopers", "The Dustmarchers", "The Bronze Blades", "Emberguard Division"
  ],
  "historical-nations": [
    "The Valen Sovereignty", "Dominion of Redspire", "The Evermarch Realm", "Empire of Stormreach", "The Iron Dominion", "Kingdom of Ashenvale", "The Crownlands of Veyra", "The Highmarch Confederacy", "Frostmoor Empire", "The Glimmerstone Kingdom", "The Duskfall Republic", "The Bastion of Wyvren", "The Goldenshield Empire", "Crimson Crest States", "Silverkeep Confederation", "The Obsidian Throne", "Ashenfort Union", "The Grand Duchy of Westmoor", "The Pale Crown Empire", "The Broken Sea Republic"
  ],
  "historical-secret-societies": [
    "The Order of the Veil", "The Black Raven Circle", "The Crimson Mantle", "The Gilded Hand", "The Ashen Lotus", "Brotherhood of the Shard", "The Eclipse Conclave", "The Silent Accord", "Eyes of the Dawn", "The Iron Mask Society", "The Hollow Pact", "The Whispering Blades", "Sons of the Forgotten", "The Twilight Cabal", "Circle of the Hidden Flame", "The Shadeborn Fellowship", "The Silver Fang Collective", "Order of the Broken Eye", "The Warden's Covenant", "The Obsidian Oath"
  ],
  "historical-religious-orders": [
    "The Order of Saint Liora", "Flamebearers of the Sacred Heart", "The Dawnlight Clergy", "Children of the Silver Chalice", "Keepers of the Celestial Path", "The Sacred Brotherhood of Ashes", "Faithful of the Verdant Grove", "The Heralds of Saint Kael", "Sons of the Burning Word", "The Circle of the Holy Flame", "Pilgrims of the Crimson Sun", "The Covenant of Lost Saints", "Guardians of the Sacred Star", "Acolytes of the First Light", "Seekers of the True Stone", "Voice of the Shattered Bell", "Watchers of the Silent Dawn", "The Golden Trinity", "Sisters of the Blessed Moon", "The Faithful of the Final Ember"
  ],
  "historical-craft-guilds": [
    "The Gilded Coin Consortium", "The Hammerhand Union", "Silkroad Traders' League", "Brotherhood of the Golden Anvil", "The Seafarer's Exchange", "Arcwright Artisan Guild", "The Silverhand Weavers", "The Timberhall Carpenters", "Stonehearth Masons' Circle", "The Frostvale Mercantile Guild", "League of Crimson Traders", "The Ironroot Forgers", "The Sunspire Merchants", "Sapphire Dawn Consortium", "The Hollowgold Collective", "Northreach Traders' League", "The Wandering Coin Alliance", "Emberforge Crafters", "Guild of the Verdant Wares", "Steelveil Trading Company"
  ],
  "historical-governorships": [
    "Province of Redvale", "The Ironmarch Territory", "Westfall Duchy", "Crestmoor Province", "Ashenreach Barony", "Frosthollow Ward", "Greystone Shire", "Silverbrook Lands", "Thornwood March", "Ravenfell District", "Stonehaven Province", "Goldenfield Territory", "Sunspire Marches", "Hollowmere Prefecture", "Duskvale Canton", "Brightshore Province", "Cragthorn District", "Westmoorland Shire", "Bramblekeep Barony", "New Bastion County"
  ],
  "secret-societies": [
    "The Veiled Dawn", "Circle of the Shrouded Sun", "The Crimson Shroud", "Order of the Silent Star", "The Obsidian Circle", "The Gilded Mantle", "The Silver Thread Society", "The Cloak of Whispers", "Brotherhood of the Broken Moon", "The Hollow Crown", "Watchers of the Last Gate", "Sons of the Ashen Eye", "The Hidden Seal", "Twilight Sovereigns", "The Sable Order", "Keepers of the Forgotten Sigil", "The Waking Choir", "The Silent Reliquary", "Eyes of the New Dawn", "Covenant of the Seven Veils"
  ],
  "occult-orders": [
    "The Eclipsed Eye", "Circle of Black Flame", "The Ashen Thorn", "The Serpent's Grimoire", "Children of the Pale Sigil", "The Dagger and the Veil", "Coven of the Drowned Stars", "Order of the Sable Lantern", "Whisperers of the Hollow Dream", "The Silver Fang Coven", "The Crimson Rite", "The Astral Covenant", "Sons of the Lost Echo", "Order of the Forgotten Bell", "The Celestial Maw", "The Shifting Rune Circle", "Bloodstone Congregation", "Heralds of the Sundering", "The Nightborn Choir", "Guardians of the Eclipsed Crown"
  ],
  "corporate-fronts": [
    "Helix Dynamics", "Blackthorn Solutions", "VerdantEdge Corp", "Obsidian Holdings", "Novacrest Industries", "EtherWave Logistics", "Blue Spire Enterprises", "Apex Horizon", "OmniShield Systems", "Crimson Harbor Inc.", "SilentGate Corporation", "Dawnspire Technologies", "Ironroot Ventures", "NebulaCore Holdings", "Argentum Solutions", "Starfall Development", "TitanEdge Industries", "Eclipse Strategies", "Gravestone Global", "Prime Meridian Group"
  ],
  "govt-agencies": [
    "Department of Paranormal Affairs (DPA)", "Bureau of Arcane Research (BAR)", "National Cryptid Registry (NCR)", "Federal Anomaly Agency (FAA)", "Global Surveillance Division (GSD)", "Department X", "Agency for Mystic Operations (AMO)", "Center for Strategic Mysticism (CSM)", "Division of Esoteric Studies (DES)", "Paranormal Security Bureau (PSB)", "Secret Sciences Directorate (SSD)", "Federal Occult Initiative (FOI)", "Anomaly Containment Service (ACS)", "National Office of the Unknown (NOU)", "Arcane Enforcement Agency (AEA)", "Specter Response Taskforce (SRT)", "Cryptic Intelligence Agency (CIA)", "Mythos Intervention Bureau (MIB)", "Department of Dimensional Affairs (DDA)", "Special Investigations Unit 9 (SIU-9)"
  ],
  "magical-lineages": [
    "House of the Ashen Sigil", "Bloodline of the Verdant Thorn", "The Dawnshard Heirs", "Line of the Whispering Flame", "Scions of the Starlit Path", "Descendants of the Shattered Rune", "House of the Drowned Moon", "Wardens of the Crimson Thread", "Children of the Silver Branch", "The Emberveil Line", "Legacy of the Hollow Heart", "Bearers of the Eternal Bloom", "Kin of the Golden Fang", "Ancestors of the Shadow Crown", "House of the Eternal Howl", "Blood of the Twilight Lantern", "Offspring of the Pale Oath", "The Sableveil Progeny", "Lineage of the Sundered Crest", "Bloodbound of the Last Star"
  ],
  "urban-covens": [
    "The Midnight Crossroads", "The Velvet Ember Coven", "Ashen Hollow Circle", "Duskspire Witches", "The Cracked Mirror Coven", "The Thornveil Collective", "Crescent Street Witches", "The Rusted Chain Circle", "Verdant Hollow Coven", "Gutterwitch Assembly", "The Howling Lantern", "Coven of the Shattered Dawn", "The Fading Ash Circle", "Bloodbrick Witches", "The Ivy Crowned", "Whisper Alley Coven", "Witches of the Broken Pier", "The Nightroot Circle", "Murkmire Witches", "The Sapphire Vine Coven"
  ],
  "cryptid-research": [
    "The Hollow Study Group", "The Verdant Anomaly Unit", "Project Whispertrace", "The Deep Hollow Institute", "Paranormal Beings Taskforce (PBT)", "Cryptid Behavior Research Cell (CBRC)", "Chimera Observation Unit", "Specter Watch Division", "The Eldermyst Investigation Team", "Project EchoPine", "Phantom Study Group", "Umbra Watch Initiative", "Warden Research Collective", "Lucid Veil Cryptid Studies", "The Hallowed Nature Program", "Obscura Analysis Unit", "The Pale Beast Observatory", "Midnight Claw Initiative", "The Lost Signal Project", "Apex Cryptid Tracking Cell"
  ],
  "pantheons": [
    "The Celestial Concord", "Dawnforged Pantheon", "The Shattered Court", "Children of the Sunwell", "The Verdant Choir", "Stormborn Covenant", "The Silent Decree", "Twilight Crown Assembly", "Order of the Searing Star", "The Frostmantle Gods", "The Ninefold Accord", "Circle of the Living Flame", "The Drowned Pantheon", "The Hollow Thrones", "The Starwoven Council", "Sons of the Wild Hunt", "Wardens of the Astral Tree", "The Bleeding Halo", "The Silver Tempest Order", "Keepers of the Eternal Wheel"
  ],
  "heroic-lineages": [
    "Blood of the Iron Wolf", "The Dawnspear Heirs", "Scions of the Thorned Crown", "Lineage of the Flamebearers", "The Gilded Blade Bloodline", "Descendants of the First Hunt", "Sons of the Crashing Wave", "The Starlit Vanguard", "Kin of the Ghostfire Banner", "Children of the Howling Peak", "Bloodline of the Wyrmwatchers", "Legacy of the Burning Oath", "Wardens of the Broken Seal", "House of the Verdant Warden", "The Hollowfang Heirs", "Scions of the Vanished Realm", "The Stormbound Bloodline", "Sons of the Falling Star", "The Silvermane Line", "Descendants of the Wildfire Pact"
  ],
  "mystic-temples": [
    "The Veilspire Sanctuary", "Hollow Dawn Temple", "Shrine of the Shifting Sands", "The Verdant Grove", "Temple of the First Flame", "Crystal Bloom Monastery", "The Echoing Chapel", "Sunfall Bastion", "The Moonweave Temple", "Shrine of the Last Eclipse", "The Fractured Lantern", "Azure Tide Monastery", "Spire of the Celestial Eye", "Rooted Sun Sanctuary", "The Warden's Ascent", "The Temple of Broken Stars", "Silent Grove Cloister", "The Verdant Maw", "Crown of the Weeping Sky", "The Ebon Thorn Temple"
  ],
  "oracle-circles": [
    "The Circle of Tenfold Dreams", "The Glass Veil Seers", "Whisperers of the Hollow Path", "Seers of the Crimson Thread", "The Oracle's Bastion", "Circle of the Shattered Eye", "Children of the Silent Prophecy", "The Starbound Dreamers", "The Pale Vision Circle", "The Dreamtide Weavers", "Seers of the Lost Lantern", "Oracles of the Verdant Oath", "The Eclipsed Visionaries", "The Circle of Endless Echoes", "Wakers of the Silver Dawn", "Prophets of the Withered Tree", "The Ashen Dream Council", "Veilstorm Seer Circle", "Eyes of the Moonlit Hollow", "Circle of the Broken Sigil"
  ],
  "sacred-beasts": [
    "The Verdant Wyrm", "The Starlit Stag", "Guardian of the Ashen Grove", "The Moonfire Serpent", "The Crystalmane Lion", "Spirit of the Thorned Glade", "The Hollowbeak Raven", "The Emberfang Wolf", "Watcher of the Sundering Peaks", "The Duskwing Phoenix", "Guardian of the Silent Mire", "The Sableroot Bear", "Spirit of the Glimmerfen", "The Ivoryclaw Tiger", "Keeper of the Crimson Hollow", "The Mistbound Drake", "Guardian of the Sundered Vale", "The Twilight Howler", "The Stoneveil Basilisk", "Spirit of the Echoing Fjord"
  ],
  "cursed-clans": [
    "The Bloodhollow Kin", "Clan of the Withered Mark", "The Ironshade Cursed", "Children of the Broken Pact", "Clan of the Sundering Thorn", "The Hollowblooded", "Sons of the Shifting Wound", "Clan of the Ashen Maw", "The Dreadthorn Covenant", "The Blightclaw Kin", "Blood of the Veiled Curse", "Clan of the Crimson Grasp", "The Starlost Lineage", "The Pale Serpent Kin", "Clan of the Blackened Bloom", "The Frostmourne Clan", "The Weeping Hollow Kin", "Bearers of the Shadowbrand", "Clan of the Fractured Vow", "Wyrmblight Kin"
  ],
  "ancient-prophecies": [
    "The Shard of the Last Dawn", "Prophecy of the Broken Star", "The Silent Bloom's Fate", "Curse of the Thousand Eyes", "The Last Flame's Calling", "Prophecy of the Verdant Eclipse", "The Dreamer's Sundering", "Tears of the Forgotten Grove", "The Veiled Serpent's Return", "Fate of the Crimson Mantle", "The Sundering of the Hollow Crown", "Prophecy of the Final Hunt", "The Eclipsed Tree's Awakening", "The Shattered Sigil's Rise", "Song of the Silent Bell", "The Silver Veil's Unraveling", "Dawn of the Waking Stone", "The Wildfire's Redemption", "The Fallen Star's Grasp", "Prophecy of the Endless Bloom"
  ],
  "megacorps": [
    "HelixCorp Industries", "OmniTek Solutions", "Zenith Dynamics", "Cyberion Systems", "NeonEdge Enterprises", "AstraDyne Holdings", "VoidTech Megastructures", "HyperPulse Corporation", "AeonCore Networks", "PulseGrid Industries", "Solis Integrated Technologies", "Stratos Securities", "QuantumSyn Conglomerate", "Blackspire Innovations", "Ionis Dynamics", "Nuvatek Global", "RiftLine Solutions", "Obsidian Edge Corp", "Prometheus TechWorks", "SpectraPrime"
  ],
  "federations": [
    "The Celestial Accord", "Orion Belt Coalition", "United Worlds Syndicate", "Dawnreach Federation", "The Starborn Assembly", "Horizon Pact", "The Cosmic League", "Solar Nexus Alliance", "Concord of the Outer Ring", "Nova Unity Front", "Galactic Entente", "Free Systems Compact", "The Interstellar Union", "Polaris Pact", "The Auroran Confederacy", "Silver Nebula Assembly", "The Stellar Council", "New Dawn Coalition", "Astralis Concord", "The Astral League"
  ],
  "research-institutes": [
    "Verity Science Initiative", "Solaris Research Division", "Nova Insight Labs", "Quantum Horizon Institute", "Deepcore Intelligence Labs", "The Catalyst Array", "Polaris Biotech", "Infinity Research Collective", "Lumina Studies Division", "Celestial Discovery Bureau", "Singularity Observation Center", "Cradle of Echoes Research", "Arc Nexus Institute", "NeuroGenesis Labs", "Helios Research Syndicate", "Starforge Innovation Center", "Tempest Bioworks", "Prometheon Research Complex", "Aeon Axis Research", "AstraVentis Laboratories"
  ],
  "military-factions": [
    "Vanguard Command", "The Iron Phalanx", "Crimson Dawn Fleet", "Nova Bastion Corps", "Eclipse Blade Battalion", "The Dominion Guard", "Black Sun Armada", "The Astral Legion", "Voidstorm Command", "The Helios Brigade", "Titanborn Strikeforce", "The Silver Spear Division", "Orion Vanguard", "Apex Guard Consortium", "Revenant Battlegroup", "Inferno Fleet Corps", "Starhammer Division", "Obsidian Sentinels", "Nightfall Marines", "Zenith Watch Battalion"
  ],
  "ai-collectives": [
    "Nexus Mind Conglomerate", "Dawnspire Process", "The Infinite Logic Assembly", "Helix Core Cluster", "Omega Dawn AI", "Zenith Neural Network", "Bastion of the Codeborn", "Singularity Manifest", "SolMind Collective", "The Algorithmic Conclave", "Omnicron Processors", "The Woven Mind Grid", "Phoenix Logic Array", "Voidstream Initiative", "The Machineborne Assembly", "NeuroSyn Collective", "Eternity Cores", "Prism Convergence", "HiveNet Dynasty", "The Constellation Protocol"
  ],
  "space-guilds": [
    "The Stellar Wayfarers", "Nebula Trade Syndicate", "Voidborn Caravans", "Blackstar Explorers Guild", "The Astral Navigators", "Polaris Merchant Alliance", "Celestial Pathfinder Guild", "The Free Horizons Trade Guild", "Drifter's Accord", "Nova Cartographer's Guild", "The Void Weavers", "Seraphim Outriders", "The Silent Astrogators", "Horizon Haulers Union", "Starfarer's Pact", "Echo Nomads' Guild", "Lunar Trade Compact", "Solarwind Mariners", "The Rift Sailors", "Crown of the Cosmic Merchants"
  ],
  "terraforming-syndicates": [
    "Verdant Genesis Collective", "Aurora Terraform Solutions", "Gaia Reclaimers", "The Green Dawn Engineers", "Eden Rebirth Initiative", "Helios Terraformers", "Prometheus Geoscapers", "Solborn Terraforming Union", "New Eden Constructors", "Aurora Primus Syndicate", "Verdantis Consortium", "Terraform Nexus", "Stellar Arborists", "Genesis Plains Cooperative", "Verdure Systems Collective", "Dawnforge Terraformers", "Bloomcore Development", "Celestial Tiller Assembly", "Horizon Ecogenesis", "Polaris Seeders"
  ],
  "syndicates": [
    "Iron Serpents", "Neon Vultures", "Crimson Blades", "The Circuit Breakers", "Black Ember Clan", "Ghostwire Syndicate", "Nova Rats", "Venom Circuit", "Chrome Hounds", "The Asphalt Kings", "Hexblade Riders", "Skydust Marauders", "Alley Wraiths", "Obsidian Vultures", "HoloThugs", "The Gridwalkers", "Silver Fang Pack", "Shockwave Crew", "Voidborn Bruisers", "Drift Syndicate"
  ],
  "hacker-collectives": [
    "ZeroTrace Network", "NeonShroud", "The MindSplice Assembly", "EchoHackers", "Quantum Ghosts", "Darkstream Collective", "Circuit Syndicate", "CyberShard Nexus", "Prism Override", "The Shattered Code", "Wraithwave Network", "Neurohack Consortium", "Subnet Blades", "Horizon Crackers", "Whisper Protocol", "The Phantom Packet", "NanoByte Alliance", "ZeroHour Hacktivists", "Glitchfront", "Proxy Spiral"
  ],
  "underground-clinics": [
    "Black Lotus Augments", "Synaptic Surge Labs", "The Iron Flesh Forge", "Pulsewave Enhancements", "NeonGraft Underground", "StreetMods Center", "The BioSynth Core", "Chrome Haven Clinics", "NovaVita Augments", "Edgewalker Enhancements", "Redline Bioforge", "DriftSkin Facility", "Cypher Limbworks", "ReVive Augmentations", "NightPulse Clinics", "ShockSplice Lab", "CyberGloom Facility", "PulseCraft Clinic", "MirrorEdge Modworks", "IronHalo Underground"
  ],
  "digital-faiths": [
    "The Codeborn Church", "Synapse Covenant", "Order of the Silent Signal", "The Augmented Creed", "NeoCircuit Faith", "Temple of the Pure Code", "Echoes of the Machine Saints", "Cybermancy Sect", "The Blessed Firmware", "Datastream Prophets", "Singularity Devotion", "Cathedral of the Last Ping", "The Rebooted Order", "Vox Deus Assembly", "Digital Ascensionists", "Covenant of the Glitchborn", "Omninet Believers", "Neon Testament", "Warden Protocol Faith", "Mechanized Prophets"
  ],
  "encrypted-cabals": [
    "The Black Key Assembly", "PrismCipher Order", "The Hidden Pulse", "Ghostdrive Covenant", "Synapse Shroud", "The Binary Court", "Shardveil Society", "EchoShroud Collective", "The Hollow Network", "RedShift Order", "Ciphered Concord", "Shadegrid Assembly", "Subnet Covenant", "Pulseborn Ciphers", "Nexus Veil", "Specter Shard Assembly", "The Quantum Shroud", "Order of the Masked Signal", "Lockdown Syndicate", "Hidden Glitch Guild"
  ],
  "urban-sectors": [
    "Neon Bastion", "Drift Hollow", "Ironwave District", "Riftline Block", "Cryo Sector 9", "Ghostlight Zone", "The Cracked Verge", "Black Sun Quadrant", "Chrome Alleyways", "Pulse District", "Static Bay Sector", "Prism Heights", "Echo End Zone", "Wirespire Precinct", "Solus Strip", "The Vanta Quarter", "Gridstone District", "Nightglass Commons", "Omega Yard", "Fallout Terrace"
  ],
  "low-fantasy-noble-houses": [
    "House Greydawn", "House Thornspire", "House Amberfell", "House Valebrook", "House Redmont", "House Stonewreath", "House Blackmere", "House Windthorn", "House Emberholt", "House Frostvine", "House Oakshade", "House Hollowcrest", "House Silvermere", "House Wyrmwood", "House Ironsong", "House Ravenshade", "House Goldbranch", "House Duskwhisper", "House Stormbrook", "House Wyvernwell"
  ],
  "low-fantasy-militias": [
    "Bronze Watch", "Stonehelm Guards", "Rivergate Sentinels", "Ashen Brigade", "Crimson Mantle", "Frosthold Wardens", "Nightblade Watch", "Iron Pike Militia", "Verdant Shield", "Dawnguard Company", "Steel Cloaks", "Hollowreach Wardens", "Golden Bastion", "Emberguard Battalion", "Thornwall Protectors", "Silent March Patrol", "Valeshield Corps", "Ravenhelm Enforcers", "Blightbane Guard", "Stormhold Wardens"
  ],
  "low-fantasy-guilds": [
    "Golden Anvil Guild", "Verdant Caravan", "Stonemason's Accord", "Guild of Silken Threads", "Whisperwind Traders", "Guild of the Iron Wheel", "Moonshadow Consortium", "Gilded Hammer League", "Rivermouth Merchants", "Frostgate Traders' Pact", "Silverbranch Caravans", "Sunfire Trade Guild", "Hollowpath Exchanges", "Vintner's Assembly", "Bronze Cask Syndicate", "Redthorn Market Alliance", "Thorncloak Traders", "Sapphire Road Guild", "Blackbarrow Trade House", "Dawnveil Merchants"
  ],
  "low-fantasy-underground-networks": [
    "The Nightveil Syndicate", "Broken Coin Brotherhood", "Silent Fang Guild", "The Hollow Knives", "Crimson Cloak Circle", "Gutterborn Pact", "The Shadehands", "Wraithspire Collective", "Echo Alley Guild", "Whisperblade Brotherhood", "Masked Coin Syndicate", "The Gloam Syndicate", "Blackwhisper Circle", "Dustveil Conclave", "Twilight Shroud", "Silver Dagger Cartel", "The Crooked Hand", "Ashen Veil Guild", "Ravenhook Network", "The Smiling Knaves"
  ],
  "low-fantasy-religions": [
    "The Lanternborn Faith", "Cult of the Verdant Bloom", "Dawnfire Covenant", "Order of the Shrouded Sun", "The Hollowborn Faith", "The Weeping Oak Sect", "Sanctum of the Silver Veil", "Followers of the Ember Sage", "Moonshadow Communion", "The Crimson Star Order", "Faith of the Last Ember", "Path of the Whispering Root", "Heralds of the Stormlight", "The Broken Crown Cult", "Guardians of the First Seed", "Twilight Seers' Brotherhood", "Cloister of the Frozen Sky", "Daughters of the Dying Flame", "The Silent Bell Sect", "Keepers of the Sundered Path"
  ],
  "low-fantasy-city-states": [
    "Hollowmere", "Frostfall", "Ravenfort", "Thistlemarch", "Blackbarrow", "Gloomhollow", "Sunspire", "Redthorn Vale", "Stonecroft", "Ashgrove", "Dawnbreak Hollow", "Emberdeep", "Windmere Bay", "Oakenridge", "Stormglen", "Evermist", "Thornreach", "Goldbranch Keep", "Wintermere", "Duskwatch"
  ],
  "low-fantasy-secret-orders": [
    "The Thornblade Circle", "Order of the Silent Vigil", "Cloaks of the Verdant Path", "Order of the Severed Star", "Crimson Mantle Society", "The Shrouded Flame", "Nightwardens", "The Sunken Covenant", "The Whispered Pact", "The Order of the Silver Ash", "The Hollowheart Assembly", "Cloister of the Broken Blade", "The Veiled Choir", "Order of the Weeping Thorn", "Silent Reaver Brotherhood", "The Thornshade Circle", "The Ivory Crescent", "Duskward Sentinels", "The Warden Priory", "Order of the Gloam Crown"
  ],
  "high-fantasy-noble-houses": [
    "House Starfire", "House Embercrest", "House Moonshade", "House Dawnveil", "House Frostthorn", "House Bloodstone", "House Brightspire", "House Stormrider", "House Wyrmroot", "House Suncloak", "House Ironwood", "House Deepvale", "House Windwarden", "House Glimmerfell", "House Thornheart", "House Nightcrown", "House Silvermane", "House Ashenbrook", "House Verdantthorn", "House Crystalbranch"
  ],
  "high-fantasy-magical-orders": [
    "The Argent Enclave", "Circle of the Verdant Flame", "Arcane Brotherhood of the Wyrm", "The Order of Eternal Aether", "The Shifting Sigil", "Luminary Coven", "The Starlit Conclave", "Crimson Rune Order", "Sapphire Circle of Mystics", "The Veiled Arcanum", "Brotherhood of the Singing Stones", "Eldergrove Cabal", "The Nexus Concord", "Frostborn Enchanters", "Circle of the Everdeep", "The Obsidian Rune Collective", "The Celestial Loom", "The Sealed Covenant", "Duskborn Thaumaturges", "The Silent Lyceum"
  ],
  "high-fantasy-kingdoms": [
    "The Aurelian Empire", "Kingdom of Thornhelm", "The Obsidian Dominion", "Dawnspire Confederacy", "Frostwrought Kingdom", "Emberfall Empire", "Sunreach Dominion", "The Verdant Throne", "Kingdom of Starvale", "Ashen Crown Sovereignty", "The Twilight Empire", "Kingdom of Silverwind", "Crimson Tide Realms", "Ironroot Kingdom", "The Shattered Marches", "Goldflame Empire", "The Wyrmspire Dominion", "Hollowvale Kingdom", "Duskfall Empire", "The Sable Throne"
  ],
  "high-fantasy-religions": [
    "The Sunfire Pantheon", "The Order of the Verdant Star", "Children of the Celestial Weave", "Faith of the Shattered Moon", "Temple of the Eclipsed Sun", "The Flameborn Creed", "Path of the Silver Spire", "Creed of the Infinite Tide", "Keepers of the Verdant Flame", "Order of the Crystal Oracle", "Heralds of the Living Stone", "The Veilborn Faith", "Twilight Covenant", "Order of the Bound Phoenix", "Children of the Last Ember", "Moonroot Circle", "The Sundered Oath", "The First Flame Sect", "Devotees of the Endless Aether", "The Heralds of Dawn"
  ],
  "high-fantasy-ancient-guilds": [
    "The Obsidian Ledger", "Gilded Spoke Syndicate", "The Verdant Coffer", "Emberstone Trading Company", "Twilight Silk Consortium", "The Auric Pact", "League of the Wyrmbound Merchants", "Sapphire Sands Syndicate", "The Hollowcoin Cabal", "Silverbranch Traders", "The Duskweaver Exchange", "Sunfire Shipping Guild", "The Rootbinder Trade Pact", "Blackthorn Trading League", "Ironveil Caravans", "Starcrest Merchant Assembly", "Ebonvault Consortium", "Crimson Vein Traders", "The Celestial Bazaar", "Frostspire Mercantile Cabal"
  ],
  "high-fantasy-secret-societies": [
    "The Gloamwatchers", "The Ciphers of the Shrouded Star", "The Pale Hand Brotherhood", "The Whispered Prophecy", "Children of the Riftborn Moon", "The Veiled Luminaries", "The Seers of the Hollow Eye", "Oracle's Thorn", "The Silent Flame Circle", "Custodians of the Sundering", "The Bloodroot Covenant", "Keepers of the Last Word", "The Broken Wheel Sect", "Daughters of the Hidden Flame", "Heralds of the Shifting Winds", "The Starborn Choir", "Whispered Cloak Society", "Cult of the Forgotten Crown", "Covenant of the Crumbling Star", "Twilight's End Covenant"
  ],
  "high-fantasy-mythic-realms": [
    "Vale of the Verdant Sky", "Wyrmspire Reach", "The Hollow Vale", "Frostwoven Realms", "Shroudwood Expanse", "The Aetherwilds", "Dawnmere", "Whispering Hollow", "The Starforged Wastes", "Sunderglen", "The Eclipsed Basin", "Ashenwild Thickets", "The Moonspire Isles", "Twilight Moorlands", "Emberfall Grove", "The Cradle of Mists", "Silverfen Realms", "The Gloaming Barrens", "Ironroot Depths", "The Eternal Loom"
  ]
};

export function getRandomCharacteristicName(type: string): string | undefined {
  const pool = characteristicNamePools[type];
  if (!pool || pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
} 