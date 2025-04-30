import { WorldStyle } from '../types';

const characteristicsMap: Record<string, string[]> = {
  'medieval-fantasy': [
    'ancient magic flows through mystical ley lines',
    'dragons soar through crystal-clear skies',
    'kingdoms vie for power and influence',
    'magical creatures roam the enchanted forests'
  ],
  'steampunk': [
    'steam-powered machines fill the bustling cities',
    'airships traverse the smoke-filled skies',
    'inventors push the boundaries of technology',
    'brass and copper contraptions dot the landscape'
  ],
  'post-apocalyptic': [
    'ruins of the old world tell tales of past glory',
    'survivors band together in fortified settlements',
    'resources are scarce and highly valued',
    'nature reclaims abandoned cities'
  ],
  'historical-fiction': [
    'political intrigue shapes the fate of nations',
    'traditions and customs guide daily life',
    'great battles determine the course of history',
    'trade routes connect distant cultures'
  ],
  'modern-supernatural': [
    'magic exists hidden from ordinary sight',
    'supernatural creatures live among humans',
    'ancient prophecies unfold in modern times',
    'secret societies guard magical knowledge'
  ],
  'sci-fi': [
    'advanced technology shapes every aspect of life',
    'space travel connects distant worlds',
    'artificial intelligence guides civilization',
    'alien species form complex alliances'
  ],
  'mythological': [
    'gods walk among mortals',
    'legendary creatures guard ancient treasures',
    'divine powers influence mortal affairs',
    'heroes undertake epic quests'
  ],
  'cyberpunk': [
    'megacorporations control society',
    'hackers wage war in digital realms',
    'cybernetic enhancements are commonplace',
    'neon lights illuminate endless urban sprawl'
  ],
  'low-fantasy': [
    'magic is rare and feared',
    'survival depends on wit and skill',
    'dark forces lurk in the shadows',
    'political intrigue drives the narrative'
  ],
  'high-fantasy': [
    'powerful magic shapes the world',
    'mythical creatures roam freely',
    'heroes embark on epic quests',
    'ancient prophecies guide destiny'
  ]
};

export const getRandomCharacteristic = (style: string): string => {
  const characteristics = characteristicsMap[style] || characteristicsMap['medieval-fantasy'];
  const randomIndex = Math.floor(Math.random() * characteristics.length);
  return characteristics[randomIndex];
};

export const getRandomCharacteristics = (style: WorldStyle, count: number = 3): string[] => {
  const styleCharacteristics = characteristicsMap[style] || characteristicsMap['medieval-fantasy'];
  const result: string[] = [];
  const availableIndices = [...Array(styleCharacteristics.length)].map((_, i) => i);

  for (let i = 0; i < count && availableIndices.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices.splice(randomIndex, 1)[0];
    result.push(styleCharacteristics[selectedIndex]);
  }

  return result;
}; 