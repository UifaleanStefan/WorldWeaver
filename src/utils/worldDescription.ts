export const generateRandomDescription = (): string => {
  const introductions = [
    'A world where',
    'In this realm,',
    'This is a land where',
    'Welcome to a place where',
    'Discover a world where'
  ];

  const mainDescriptions = [
    'ancient magic flows through every stone and tree',
    'forgotten legends come alive in the whispers of the wind',
    'the boundaries between science and sorcery blur',
    'heroes forge their destinies in the fires of adventure',
    'mythical creatures roam freely across vast landscapes',
    'the echoes of long-lost civilizations shape the present',
    'every journey holds the promise of extraordinary discoveries',
    'the impossible becomes possible with each passing day'
  ];

  const conclusions = [
    'and destiny awaits those brave enough to seek it.',
    'where every choice shapes the fate of many.',
    'as ancient prophecies unfold in unexpected ways.',
    'inviting adventurers to write their own stories.',
    'promising endless possibilities for those who dare to dream.'
  ];

  const randomElement = (array: string[]) => array[Math.floor(Math.random() * array.length)];

  return `${randomElement(introductions)} ${randomElement(mainDescriptions)}, ${randomElement(conclusions)}`;
}; 