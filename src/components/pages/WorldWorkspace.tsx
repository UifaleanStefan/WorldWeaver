import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import { MainContent } from '../layout/MainContent';
import { useLocation } from 'react-router-dom';
import { World, Location, Character } from '../../types';
import { MainLayout } from '../layout/MainLayout';

export const WorldWorkspace: React.FC = () => {
  const location = useLocation();
  const initialWorld = (location.state as { world: World })?.world || {
    id: '1',
    name: 'New World',
    style: 'Fantasy',
    description: 'A new world waiting to be built.',
    locations: [],
    characters: [],
  };

  const [world, setWorld] = useState<World>(initialWorld);
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSelectedCharacter(undefined);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setSelectedLocation(undefined);
  };

  const handleGenerateLocation = async () => {
    // TODO: Implement API call to generate location
    const newLocation: Location = {
      id: Date.now().toString(),
      name: 'New Location',
      description: 'A short description of the location.',
      worldId: world.id,
    };
    setWorld((prev) => ({
      ...prev,
      locations: [...prev.locations, newLocation],
    }));
    setSelectedLocation(newLocation);
  };

  const handleGenerateCharacter = async () => {
    // TODO: Implement API call to generate character
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: 'New Character',
      description: 'A short description of the character.',
      locationId: selectedLocation?.id || 'none',
      worldId: world.id,
    };
    setWorld((prev) => ({
      ...prev,
      characters: [...prev.characters, newCharacter],
    }));
    setSelectedCharacter(newCharacter);
  };

  return (
    <MainLayout
      world={world}
      onLocationSelect={handleLocationSelect}
      onCharacterSelect={handleCharacterSelect}
      onGenerateLocation={handleGenerateLocation}
      onGenerateCharacter={handleGenerateCharacter}
    >
      <div style={{
        background: theme.colors.gradients.content,
        borderRadius: theme.borderRadius.lg,
        boxShadow: theme.shadows.md,
        height: '100%',
      }}>
        <MainContent
          world={world}
          selectedLocation={selectedLocation}
          selectedCharacter={selectedCharacter}
        />
      </div>
    </MainLayout>
  );
}; 