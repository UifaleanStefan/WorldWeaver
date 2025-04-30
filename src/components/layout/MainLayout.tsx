import React from 'react';
import { Box } from '@chakra-ui/react';
import { Sidebar } from './Sidebar';
import { BackgroundImages } from './BackgroundImages';
import { Navigation } from '../Navigation';
import { World, Location, Character } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
  world?: World;
  onLocationSelect?: (location: Location) => void;
  onCharacterSelect?: (character: Character) => void;
  onGenerateLocation?: () => void;
  onGenerateCharacter?: () => void;
}

const noop = () => {};

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  world,
  onLocationSelect = noop,
  onCharacterSelect = noop,
  onGenerateLocation = noop,
  onGenerateCharacter = noop
}) => {
  return (
    <Box 
      minH="100vh" 
      bg="background"
      display="flex"
      flexDirection="column"
      position="relative"
    >
      <Navigation />
      <BackgroundImages />
      <Sidebar
        world={world}
        onLocationSelect={onLocationSelect}
        onCharacterSelect={onCharacterSelect}
        onGenerateLocation={onGenerateLocation}
        onGenerateCharacter={onGenerateCharacter}
      />
      <Box
        as="main"
        mt="60px"
        pt={8}
        px={8}
        pb={0}
        position="relative"
        zIndex={0}
        flex={1}
        width="100%"
      >
        {children}
      </Box>
    </Box>
  );
}; 