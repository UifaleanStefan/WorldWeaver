import React from 'react';
import { theme } from '../styles/theme';
import { Card } from '../components/Card';
import { Navigation } from '../components/Navigation';
import { Box } from '@chakra-ui/react';

interface StyleCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

const styles: StyleCard[] = [
  {
    id: 'medieval-fantasy',
    title: 'Medieval Fantasy',
    description: 'Create rich worlds of castles, knights, and magic.',
    image: '/medieval-battle.png'
  },
  {
    id: 'science-fiction',
    title: 'Science Fiction',
    description: 'Build futuristic worlds of advanced technology.',
    image: '/cyberpunk-city.png'
  },
  {
    id: 'post-apocalyptic',
    title: 'Post-Apocalyptic',
    description: 'Design worlds that survived catastrophic events.',
    image: '/LowFantasy.png'
  },
  {
    id: 'steampunk',
    title: 'Steampunk',
    description: 'Craft Victorian-era worlds with steam-powered wonders.',
    image: '/steampunk-city.png'
  },
  {
    id: 'cyberpunk',
    title: 'Cyberpunk',
    description: 'Shape neon-lit dystopian futures.',
    image: '/cyberpunk-city.png'
  },
  {
    id: 'modern-supernatural',
    title: 'Modern Day w/ Supernatural',
    description: 'Mix contemporary settings with magical elements.',
    image: '/magic-battle.png'
  },
  {
    id: 'mythological',
    title: 'Mythological',
    description: 'Build worlds inspired by ancient myths and legends.',
    image: '/medieval-battle-2.png'
  },
  {
    id: 'historical-fiction',
    title: 'Historical Fiction',
    description: 'Create historically-inspired fantasy worlds.',
    image: '/medieval-blacksmith.png'
  },
  {
    id: 'high-fantasy',
    title: 'High Fantasy',
    description: 'Design epic worlds of grand magic and heroes.',
    image: '/magic-battle.png'
  },
  {
    id: 'low-fantasy',
    title: 'Low Fantasy',
    description: 'Craft grounded worlds with subtle magic.',
    image: '/dwarf-door.png'
  }
];

export const WorldBuilder: React.FC = () => {
  return (
    <Box
      minH="100vh"
      bg={theme.colors.background}
      display="flex"
      flexDirection="column"
      mt="60px"
      position="relative"
      zIndex={0}
    >
      <Box
        maxW="1200px"
        w="95%"
        mx="auto"
        p={8}
      >
        <Navigation />
        <h1 style={{
          fontSize: theme.typography.sizes.h1,
          color: theme.colors.text.primary,
          textAlign: 'center',
          marginBottom: theme.spacing.xl,
        }}>
          World Builder
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: theme.spacing.xl,
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
          {styles.map((style) => (
            <Card
              key={style.id}
              imageUrl={style.image}
              title={style.title}
              description={style.description}
            />
          ))}
        </div>
      </Box>
    </Box>
  );
}; 