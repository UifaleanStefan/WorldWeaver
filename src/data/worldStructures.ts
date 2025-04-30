import { WorldStyle } from '../types';

export interface WorldStructureGroup {
  id: string;
  name: string;
  description?: string;
  type: 'character' | 'location' | 'both';
}

export interface WorldStructureDefinition {
  groups: WorldStructureGroup[];
  characterAffiliations: string;
  locationStructure: string;
}

export const worldStructures: Record<WorldStyle, WorldStructureDefinition> = {
  [WorldStyle.MedievalFantasy]: {
    groups: [
      { id: 'noble-houses', name: 'Noble Houses / Dynasties', type: 'both' },
      { id: 'knight-orders', name: 'Knight Orders', type: 'both' },
      { id: 'kingdoms', name: 'Kingdoms', type: 'location' },
      { id: 'secret-cults', name: 'Secret Cults', type: 'both' },
      { id: 'religions', name: 'Religions', type: 'both' },
      { id: 'mage-circles', name: 'Mage Circles', type: 'both' },
      { id: 'merchant-guilds', name: 'Merchant Guilds', type: 'both' }
    ],
    characterAffiliations: 'A character can belong to a Noble House, Knight Order, Secret Cult, Religion, Mage Circle, or Merchant Guild.',
    locationStructure: 'A location can be controlled by a Noble House, host a Knight Order, belong to a Kingdom, harbor a Secret Cult, follow a Religion, and contain a Mage Circle or Merchant Guild.'
  },
  [WorldStyle.Steampunk]: {
    groups: [
      { id: 'guilds', name: 'Guilds', type: 'both' },
      { id: 'airship-crews', name: 'Airship Crews', type: 'both' },
      { id: 'industrial-corps', name: 'Industrial Corporations', type: 'location' },
      { id: 'inventors-societies', name: 'Inventors\' Societies', type: 'both' },
      { id: 'steam-militias', name: 'Steam Militias', type: 'location' },
      { id: 'secret-orders', name: 'Secret Orders', type: 'both' },
      { id: 'scientific-institutes', name: 'Scientific Institutes', type: 'both' }
    ],
    characterAffiliations: 'A character can belong to a Guild, Airship Crew, Secret Order, Scientific Institute, or Inventors\' Society.',
    locationStructure: 'A location can host one or more Guilds, be the base of an Airship Crew, controlled by an Industrial Corporation, protected by a Steam Militia, and influenced by Scientific Institutes or Secret Orders.'
  },
  [WorldStyle.PostApocalyptic]: {
    groups: [
      { id: 'survivor-factions', name: 'Survivor Factions / Clans', type: 'both' },
      { id: 'warlord-territories', name: 'Warlord Territories', type: 'location' },
      { id: 'remnant-govts', name: 'Remnant Governments', type: 'location' },
      { id: 'tech-cults', name: 'Tech Cults / Doomsday Sects', type: 'both' },
      { id: 'scavenger-crews', name: 'Scavenger Crews', type: 'both' },
      { id: 'nomadic-tribes', name: 'Nomadic Tribes', type: 'both' },
      { id: 'salvage-guilds', name: 'Salvage Guilds', type: 'both' }
    ],
    characterAffiliations: 'A character can belong to a Survivor Faction, Scavenger Crew, Tech Cult, Nomadic Tribe, or Salvage Guild.',
    locationStructure: 'A location can be controlled by a Warlord, be part of a Remnant Government, host one or more Factions, Tribes, or Sects, and be a hub for Scavengers or Salvagers.'
  },
  [WorldStyle.HistoricalFiction]: {
    groups: [
      { id: 'historical-noble-houses', name: 'Noble Houses / Dynasties', type: 'both' },
      { id: 'historical-military-regiments', name: 'Military Regiments / Battalions', type: 'both' },
      { id: 'historical-nations', name: 'Nations / States / Empires', type: 'location' },
      { id: 'historical-secret-societies', name: 'Secret Societies', type: 'both' },
      { id: 'historical-religious-orders', name: 'Religious Orders', type: 'both' },
      { id: 'historical-craft-guilds', name: 'Craft Guilds / Trade Leagues', type: 'both' },
      { id: 'historical-governorships', name: 'Governorships / Provinces', type: 'location' }
    ],
    characterAffiliations: 'A character can belong to a Noble House, Military Regiment, Secret Society, Religious Order, Guild, or a Provincial Government.',
    locationStructure: 'A location can house Military Regiments, host several Noble Houses, belong to a State or Empire, have a local Religion, support Guild activity, or fall under a Governorship/Province.'
  },
  [WorldStyle.ModernSupernatural]: {
    groups: [
      { id: 'secret-societies', name: 'Secret Societies', type: 'both' },
      { id: 'occult-orders', name: 'Occult Orders', type: 'both' },
      { id: 'corporate-fronts', name: 'Corporate Fronts', type: 'both' },
      { id: 'govt-agencies', name: 'Government Agencies', type: 'both' },
      { id: 'magical-lineages', name: 'Magical Lineages', type: 'both' },
      { id: 'urban-covens', name: 'Urban Covens', type: 'both' },
      { id: 'cryptid-research', name: 'Cryptid Research Units', type: 'both' }
    ],
    characterAffiliations: 'A character can belong to a Secret Society, Occult Order, Corporate Front, Government Agency, Magical Lineage, Urban Coven, or Cryptid Research Unit.',
    locationStructure: 'A location can be influenced by a Secret Society, host an Occult Order, be tied to a Corporate Front or Government Agency, be inhabited by a Magical Lineage, and serve as a base for an Urban Coven or Cryptid Research Unit.'
  },
  [WorldStyle.SciFi]: {
    groups: [
      { id: 'megacorps', name: 'Megacorporations', type: 'both' },
      { id: 'federations', name: 'Federations / Planetary Alliances', type: 'location' },
      { id: 'research-institutes', name: 'Research Institutes', type: 'both' },
      { id: 'military-factions', name: 'Military Factions', type: 'both' },
      { id: 'ai-collectives', name: 'AI Collectives', type: 'both' },
      { id: 'space-guilds', name: 'Space Guilds', type: 'both' },
      { id: 'terraforming-syndicates', name: 'Terraforming Syndicates', type: 'both' }
    ],
    characterAffiliations: 'A character can belong to a Megacorporation, Military Faction, AI Collective, Space Guild, Research Institute, or Terraforming Syndicate.',
    locationStructure: 'A location can be governed by a Federation / Planetary Alliance, funded or controlled by a Megacorporation, host a Research Institute, serve as a base for a Military Faction or AI Collective, and fall under the influence of a Space Guild or Terraforming Syndicate.'
  },
  [WorldStyle.Mythological]: {
    groups: [
      { id: 'pantheons', name: 'Pantheons / Divine Orders', type: 'both' },
      { id: 'heroic-lineages', name: 'Heroic Lineages / Bloodlines', type: 'character' },
      { id: 'mystic-temples', name: 'Mystic Temples', type: 'both' },
      { id: 'oracle-circles', name: 'Oracles / Seer Circles', type: 'both' },
      { id: 'sacred-beasts', name: 'Sacred Beasts / Guardian Spirits', type: 'both' },
      { id: 'cursed-clans', name: 'Cursed Clans', type: 'character' },
      { id: 'ancient-prophecies', name: 'Ancient Prophecies', type: 'location' }
    ],
    characterAffiliations: 'A character can belong to a Heroic Lineage, serve a Pantheon, be raised in a Cursed Clan, trained in a Mystic Temple, guided by an Oracle Circle, or bonded to a Sacred Beast.',
    locationStructure: 'A location can be blessed or ruled by a Pantheon, house a Mystic Temple, be the site of an Oracle\'s vision, serve as the dwelling of a Guardian Spirit, or be bound by an Ancient Prophecy.'
  },
  [WorldStyle.Cyberpunk]: {
    groups: [
      { id: 'megacorps', name: 'Mega-Corporations', type: 'both' },
      { id: 'syndicates', name: 'Syndicates / Gangs', type: 'both' },
      { id: 'hacker-collectives', name: 'Hacker Collectives', type: 'both' },
      { id: 'underground-clinics', name: 'Underground Clinics / Augment Centers', type: 'location' },
      { id: 'digital-faiths', name: 'Digital Faiths / Techno-Religions', type: 'both' },
      { id: 'encrypted-cabals', name: 'Encrypted Cabals', type: 'both' },
      { id: 'urban-sectors', name: 'Urban Sectors / Zones', type: 'location' }
    ],
    characterAffiliations: 'A character can belong to a Mega-Corporation, operate under a Syndicate, be part of a Hacker Collective, rely on a specific Underground Clinic, follow a Techno-Religion, or act within an Encrypted Cabal.',
    locationStructure: 'A location can be controlled by a Mega-Corporation, claimed by a Gang, host a Hacker Safehouse, house an Augment Center, be sacred to a Digital Faith, or be designated as a specific Urban Sector.'
  },
  [WorldStyle.LowFantasy]: {
    groups: [
      { id: 'low-fantasy-noble-houses', name: 'Noble Houses / Dynasties', type: 'both' },
      { id: 'low-fantasy-militias', name: 'Militias / City Guards', type: 'both' },
      { id: 'low-fantasy-guilds', name: 'Guilds / Trade Associations', type: 'both' },
      { id: 'low-fantasy-underground-networks', name: 'Underground Networks / Thieves\' Guilds', type: 'both' },
      { id: 'low-fantasy-religions', name: 'Religions / Local Sects', type: 'both' },
      { id: 'low-fantasy-city-states', name: 'Towns / City-States', type: 'location' },
      { id: 'low-fantasy-secret-orders', name: 'Secret Orders', type: 'both' }
    ],
    characterAffiliations: 'A character can be part of a Noble House, serve in a Militia, belong to a Guild, operate within an Underground Network, follow a Religion, or be initiated into a Secret Order.',
    locationStructure: 'A location can be governed by a Noble House, protected by a City Guard, centered around a Guild, infiltrated by an Underground Network, aligned with a Religion, or exist within a Town or City-State.'
  },
  [WorldStyle.HighFantasy]: {
    groups: [
      { id: 'high-fantasy-noble-houses', name: 'Noble Houses / Great Clans', type: 'both' },
      { id: 'high-fantasy-magical-orders', name: 'Magical Orders / Arcane Circles', type: 'both' },
      { id: 'high-fantasy-kingdoms', name: 'Kingdoms / Empires', type: 'location' },
      { id: 'high-fantasy-religions', name: 'Sacred Religions / Pantheons', type: 'both' },
      { id: 'high-fantasy-ancient-guilds', name: 'Ancient Guilds / Trade Cabals', type: 'both' },
      { id: 'high-fantasy-secret-societies', name: 'Secret Societies / Prophetic Cults', type: 'both' },
      { id: 'high-fantasy-mythic-realms', name: 'Mythic Realms / Enchanted Territories', type: 'location' }
    ],
    characterAffiliations: 'A character can belong to a Noble House, study within a Magical Order, serve a Kingdom, follow a Religion, operate through a Guild, be inducted into a Secret Society, or originate from a Mythic Realm.',
    locationStructure: 'A location can be ruled by a Noble House, protected or governed by a Magical Order, be part of a Kingdom, devoted to a Pantheon, structured around a Guild, hide a Secret Society, or exist within a Mythic Realm.'
  }
}; 