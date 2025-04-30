export const locationNames = [
  'Emberhold', 'Blackspire', 'Frostmere', 'Thornwatch', 'Ironreach',
  'Hollowgate', 'Vexmoor', 'Shadowmere', 'Stormridge', 'Cragwatch',
  'Ashenforge', 'Gloomrest', 'Wyrmshade', 'Bramblethorn', 'Mirehaven',
  'Windscar', 'Duskwatch', 'Steelveil', 'Dreadmarsh', 'Silverdeep',
  'Cindergate', 'Valehollow', 'Drakespire', 'Falldawn', 'Blightmoor',
  'Nightreach', "Bastion's End", 'Cogsreach', 'Ebonvault', 'Skyridge',
  'Runebreak', 'Grimbarrow', 'Thistlepine', 'New Corvax', 'Starwatch Keep',
  'Redfall', 'Echofen', 'Witherbrook', 'High Hollows', 'Vantrelle',
  'Westering Hold', 'Brazen Rock', 'Fogspire', 'Crimsonglade', 'Ethergrove',
  'Bloodstone Vale', 'Thornmere', 'Grimwood Hollow', 'Solcarra', 'Arc Emberfall',
  'Brightreach', 'Hollow Bastion', 'Kettledeep', 'Shadewatch Bay', 'Ironmere Port',
  'Daggerforge', 'Wraith Hollow', 'Firepost Keep', 'Spectral Fen', 'Skyfang',
  'Eldermoor', 'Coppercoil', 'Vaultspire', 'Bronzebarrow', 'Emberlight',
  "Tinker's Gate", 'The Iron Crossing', 'Aetherhollow', 'Gravetide', 'Icevein',
  'Crownward', 'Rustbrook', 'Obsidian Reach', 'Goldcrest', 'Glintspire',
  'Scarhold', 'Driftwallow', 'Marshend', 'Mournwatch', 'Riftrock',
  'The Broken Circle', 'Coilport', 'Silktarn', "Vulture's Roost", 'Paleveil',
  'Ashfen Hollow', 'Oathgate', 'Citadel Noir', 'Lantern Hollow', 'Sablemark',
  'Gilded Vault', 'Shivergrove', 'Tempest Reach', 'Copperdusk', "Wyrm's Hollow",
  'Cloudmarsh', 'Bastion of Varn', 'Whisperforge', 'Suncleft', 'Netherbarrow'
];

export const getRandomLocationName = (): string => {
  const randomIndex = Math.floor(Math.random() * locationNames.length);
  return locationNames[randomIndex];
};

export const getRandomCharacterName = (): string => {
  const prefixes = ['Sir', 'Lady', 'Lord', 'Dame', 'Captain', 'General', 'Doctor', 'Professor', 'Master', 'Mistress'];
  const firstNames = ['Aiden', 'Brianna', 'Cedric', 'Diana', 'Ethan', 'Fiona', 'Gareth', 'Helena', 'Ian', 'Jasmine'];
  const lastNames = ['Blackwood', 'Stormrider', 'Ironheart', 'Moonwhisper', 'Starshadow', 'Dawnbreaker', 'Nightshade', 'Silverwind', 'Goldcrest', 'Firebrand'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${prefix} ${firstName} ${lastName}`;
}; 