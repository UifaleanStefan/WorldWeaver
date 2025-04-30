import React from 'react';
import { 
  Box, 
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerHeader, 
  DrawerBody, 
  DrawerCloseButton,
  useDisclosure,
  Heading,
  Text,
  List,
  ListItem
} from '@chakra-ui/react';
import { World, Location, Character, WorldStyle } from '../../types';

export interface SidebarProps {
  world?: World;
  onLocationSelect?: (location: Location) => void;
  onCharacterSelect?: (character: Character) => void;
  onGenerateLocation?: () => void;
  onGenerateCharacter?: () => void;
}

const defaultWorld: World = {
  id: '',
  name: '',
  style: WorldStyle.MedievalFantasy,
  locations: [],
  characters: [],
  description: '',
  characteristics: []
};

export const Sidebar: React.FC<SidebarProps> = ({
  world = defaultWorld,
  onLocationSelect = () => {},
  onCharacterSelect = () => {},
  onGenerateLocation = () => {},
  onGenerateCharacter = () => {}
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>


      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent bg="#4B342A" color="white">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" bg="#88B04B" color="white">
            {world.name}
          </DrawerHeader>

          <DrawerBody p={0}>
            {/* World Description */}
            <Box p={4} borderBottomWidth="1px" borderColor="#88B04B">
              <Heading size="md" mb={2} color="#88B04B">Description</Heading>
              <Text fontSize="lg">{world.description}</Text>
            </Box>

            {/* World Image */}
            <Box p={4} borderBottomWidth="1px" borderColor="#88B04B">
              <Box
                as="img"
                src={`/${world.style.toLowerCase()}.png`}
                alt={`${world.style} style preview`}
                borderRadius="lg"
                boxShadow="md"
                w="100%"
              />
            </Box>

            {/* Characteristics */}
            <Box p={4} borderBottomWidth="1px" borderColor="#88B04B">
              <Heading size="md" mb={2} color="#88B04B">Characteristics</Heading>
              <List spacing={2}>
                {world.characteristics.map((char, index) => (
                  <ListItem key={index}>
                    <Text fontSize="lg">• {char}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Locations */}
            <Box p={4} borderBottomWidth="1px" borderColor="#88B04B">
              <Heading size="md" mb={2} color="#88B04B">Locations</Heading>
              <List spacing={2}>
                {world.locations.map(location => (
                  <ListItem key={location.id}>
                    <Text 
                      fontSize="lg"
                      cursor="pointer"
                      _hover={{ color: '#88B04B' }}
                      onClick={() => onLocationSelect(location)}
                    >
                      • {location.name}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Characters */}
            <Box p={4} borderBottomWidth="1px" borderColor="#88B04B">
              <Heading size="md" mb={2} color="#88B04B">Characters</Heading>
              <List spacing={2}>
                {world.characters.map(character => (
                  <ListItem key={character.id}>
                    <Text 
                      fontSize="lg"
                      cursor="pointer"
                      _hover={{ color: '#88B04B' }}
                      onClick={() => onCharacterSelect(character)}
                    >
                      • {character.name}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
