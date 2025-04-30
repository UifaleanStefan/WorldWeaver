export enum WorldStyle {
  MedievalFantasy = 'Medieval Fantasy',
  Steampunk = 'Steampunk',
  PostApocalyptic = 'Post-Apocalyptic',
  HistoricalFiction = 'Historical Fiction',
  ModernSupernatural = 'Modern Supernatural',
  SciFi = 'Sci-fi',
  Mythological = 'Mythological',
  Cyberpunk = 'Cyberpunk',
  LowFantasy = 'Low Fantasy',
  HighFantasy = 'High Fantasy'
}

export interface WorldElement {
  description: string;
  elements: string[];
}

export interface WorldAffiliations {
  // Medieval Fantasy
  nobleHouses: string[];
  knightOrders: string[];
  secretCults: string[];
  mageCircles: string[];
  merchantGuilds: string[];
  religions: string[];
  // Steampunk
  guilds: string[];
  airshipCrews: string[];
  industrialCorporations: string[];
  inventorsSocieties: string[];
  steamMilitias: string[];
  secretOrders: string[];
  scientificInstitutes: string[];
  // Post-Apocalyptic
  survivorFactions: string[];
  remnantGovernments: string[];
  techCults: string[];
  scavengerCrews: string[];
  nomadicTribes: string[];
  salvageGuilds: string[];
  // Historical Fiction
  historicalNobleHouses: string[];
  militaryRegiments: string[];
  historicalSecretSocieties: string[];
  religiousOrders: string[];
  craftGuilds: string[];
  // Sci-fi
  researchInstitutes: string[];
  militaryFactions: string[];
  aiCollectives: string[];
  spaceGuilds: string[];
  terraformingSyndicates: string[];
  // Modern Supernatural
  secretSocieties: string[];
  occultOrders: string[];
  corporateFronts: string[];
  governmentAgencies: string[];
  magicalLineages: string[];
  urbanCovens: string[];
  cryptidResearchUnits: string[];
  // Mythological
  pantheons: string[];
  heroicLineages: string[];
  mysticTemples: string[];
  oracles: string[];
  cursedClans: string[];
  // Low Fantasy
  lowFantasyNobleHouses: string[];
  militias: string[];
  tradeGuilds: string[];
  undergroundNetworks: string[];
  localReligions: string[];
  lowFantasySecretOrders: string[];
  // High Fantasy
  highFantasyNobleHouses: string[];
  magicalOrders: string[];
  highFantasyReligions: string[];
  ancientGuilds: string[];
  highFantasySecretSocieties: string[];
}

export interface World {
  id: string;
  name: string;
  style: WorldStyle;
  description: string;
  expandedDescription?: string;
  characteristics: string[];
  locations: Location[];
  characters: Character[];
  affiliations?: WorldAffiliations;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  worldId: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  worldId: string;
  locationId: string;
}

export interface WorldGenerationInput {
  name: string;
  style: WorldStyle;
  characteristics: string;
}

export interface LocationGenerationInput {
  worldId: string;
  name: string;
  characteristics?: string;
  isRandom: boolean;
}

export interface CharacterGenerationInput {
  worldId: string;
  locationId: string;
  name: string;
  role?: string;
  isRandom: boolean;
}

export interface WorldState {
  groups: {
    nobleHouses?: boolean;
    knightOrders?: boolean;
    secretCults?: boolean;
    mageCircles?: boolean;
    merchantGuilds?: boolean;
    religions?: boolean;
    guilds?: boolean;
    airshipCrews?: boolean;
    industrialCorporations?: boolean;
    inventorsSocieties?: boolean;
    steamMilitias?: boolean;
    secretOrders?: boolean;
    scientificInstitutes?: boolean;
    survivorFactions?: boolean;
    remnantGovernments?: boolean;
    techCults?: boolean;
    scavengerCrews?: boolean;
    nomadicTribes?: boolean;
    salvageGuilds?: boolean;
    historicalNobleHouses?: boolean;
    militaryRegiments?: boolean;
    historicalSecretSocieties?: boolean;
    religiousOrders?: boolean;
    craftGuilds?: boolean;
    researchInstitutes?: boolean;
    militaryFactions?: boolean;
    aiCollectives?: boolean;
    spaceGuilds?: boolean;
    terraformingSyndicates?: boolean;
    secretSocieties?: boolean;
    occultOrders?: boolean;
    corporateFronts?: boolean;
    governmentAgencies?: boolean;
    magicalLineages?: boolean;
    urbanCovens?: boolean;
    cryptidResearchUnits?: boolean;
    pantheons?: boolean;
    heroicLineages?: boolean;
    mysticTemples?: boolean;
    oracles?: boolean;
    cursedClans?: boolean;
    lowFantasyNobleHouses?: boolean;
    militias?: boolean;
    tradeGuilds?: boolean;
    undergroundNetworks?: boolean;
    localReligions?: boolean;
    lowFantasySecretOrders?: boolean;
    highFantasyNobleHouses?: boolean;
    magicalOrders?: boolean;
    highFantasyReligions?: boolean;
    ancientGuilds?: boolean;
    highFantasySecretSocieties?: boolean;
  };
} 