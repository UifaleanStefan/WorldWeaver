const worldNames = [
  'Eldara',
  'Mystara',
  'Avalon',
  'Celestia',
  'Thoria',
  'Drakmor',
  'Valoria',
  'Aethoria',
  'Chronopia',
  'Arcadia',
  'Solaria',
  'Lumaria',
  'Etheria',
  'Nordheim',
  'Sylvaria',
  'Crystalia',
  'Mythoria',
  'Stormhaven',
  'Shadowrealm',
  'Frostgard'
];

export const getRandomWorldName = (): string => {
  const randomIndex = Math.floor(Math.random() * worldNames.length);
  return worldNames[randomIndex];
};

export const generateRandomName = (): string => {
  const prefixes = ['Ancient', 'Mystic', 'Eternal', 'Lost', 'Hidden', 'Forgotten', 'Sacred'];
  const roots = ['Realm', 'Kingdom', 'Empire', 'Land', 'World', 'Domain', 'Dimension'];
  const suffixes = ['of Legends', 'of Dreams', 'of Shadows', 'of Light', 'of Destiny', 'of Time', 'of Magic'];

  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomRoot = roots[Math.floor(Math.random() * roots.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return `${randomPrefix} ${randomRoot} ${randomSuffix}`;
}; 