import React from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Navigation } from '../Navigation';
import { Card } from '../Card';
import { WorldStyle } from '../../types';
import { BackgroundImages } from '../layout/BackgroundImages';

const worldStyles = [
  {
    id: 'medieval-fantasy',
    name: 'Medieval Fantasy',
    image: '/medieval-landscape.png',
    description: 'A classic fantasy world with sprawling landscapes and epic adventures.',
  },
  {
    id: 'steampunk',
    name: 'Steampunk',
    image: '/steampunk-city.png',
    description: 'A world of steam-powered machinery, Victorian aesthetics, and industrial revolution.',
  },
  {
    id: 'post-apocalyptic',
    name: 'Post-Apocalyptic',
    image: '/cyberpunk-noir.png',
    description: 'A world recovering from catastrophic events, where survival is paramount.',
  },
  {
    id: 'historical-fiction',
    name: 'Historical Fiction',
    image: '/medieval-battle.png',
    description: 'A realistic world based on historical periods and events.',
  },
  {
    id: 'modern-supernatural',
    name: 'Modern Supernatural',
    image: '/magic-battle.png',
    description: 'A contemporary world where magic and supernatural elements exist in secret.',
  },
  {
    id: 'sci-fi',
    name: 'Sci-fi',
    image: '/medieval-blacksmith.png',
    description: 'A futuristic world of advanced technology and space exploration.',
  },
  {
    id: 'mythological',
    name: 'Mythological',
    image: '/medieval-battle-2.png',
    description: 'A world inspired by ancient myths, legends, and divine beings.',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    image: '/cyberpunk-city.png',
    description: 'A high-tech, low-life world of neon lights and cyber-enhancement.',
  },
  {
    id: 'low-fantasy',
    name: 'Low Fantasy',
    image: '/LowFantasy.png',
    description: 'A gritty world where magic is rare and dangerous.',
  },
  {
    id: 'high-fantasy',
    name: 'High Fantasy',
    image: '/dwarf-door.png',
    description: 'A world of magic, mythical creatures, and epic quests.',
  }
] as const;

export const StyleSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleStyleSelect = (style: typeof worldStyles[number]) => {
    navigate('/world-input', { state: { selectedStyle: style.name } });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: theme.colors.gradients.content,
      position: 'relative',
      zIndex: 0, // Lower than sidebar
    }}>
      <Navigation />
      <BackgroundImages />
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '60px auto 0',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
      }}>
        <h1 style={{
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xl,
          textAlign: 'center',
          fontSize: theme.typography.sizes.h1,
        }}>
          Choose Your World Style
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          width: '100%',
        }}>
          {worldStyles.map((style) => (
            <Card
              key={style.id}
              onClick={() => handleStyleSelect(style)}
              imageUrl={style.image}
              title={style.name}
              description={style.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 