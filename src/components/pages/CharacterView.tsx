import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Text, Button, Container, Center, Flex, Divider, IconButton, useToast } from '@chakra-ui/react';
import { Navigation } from '../Navigation';
import { WorldSidebar } from '../../components/WorldSidebar';
import { useWorld, WorldData } from '../../contexts/WorldContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaScroll, FaFeatherAlt } from 'react-icons/fa';

interface Character {
  name: string;
  description: string;
  birthLocation: string;
  currentLocation: string;
  relationships: Record<string, string[]>;
}

interface CharacterViewProps {
  character?: Character;
  worldData: any;
}

export const CharacterView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { character, worldData } = location.state as CharacterViewProps;
  const { updateWorldData } = useWorld();

  // If character is not passed, look it up by name from worldData.characters
  let char: Character | undefined = character;
  if (!char && worldData && worldData.characters && location.pathname) {
    const nameFromPath = decodeURIComponent(location.pathname.split('/').pop() || '');
    char = worldData.characters.find((c: Character) => c.name === nameFromPath);
  }
  if (!char) {
    return <div>Character not found.</div>;
  }
  const { name, description, birthLocation, currentLocation, relationships } = char;

  const handleEntityClick = (type: string) => {
    if (type === 'location') {
      navigate('/create-location', { 
        state: { 
          worldData: worldData 
        } 
      });
    } else if (type === 'character') {
      navigate('/create/character', { 
        state: { 
          worldData: worldData 
        } 
      });
    } else {
      navigate(`/create/${type}`, {
        state: {
          worldData: worldData
        }
      });
    }
  };

  const handleLocationClick = (locationName: string) => {
    navigate(`/location/${encodeURIComponent(locationName)}`, {
      state: {
        locationName: locationName,
        locationDescription: worldData.locationDescriptions?.[locationName] || '',
        worldData: worldData
      }
    });
  };

  const handleCharacteristicClick = (characteristicType: string, characteristicName: string) => {
    navigate(`/characteristic/${characteristicType}/${encodeURIComponent(characteristicName)}`, {
      state: {
        characteristicType,
        characteristicName,
        characteristicDescription: worldData.characteristicDescriptions?.[`${characteristicType}-${characteristicName}`] || '',
        worldData: worldData
      }
    });
  };

  const handleDeleteCharacter = async (characterName: string) => {
    // Get current descriptions without the deleted one
    const { [characterName]: deletedDescription, ...remainingDescriptions } = worldData.characterDescriptions || {};
    
    // Create updated world data
    const updatedData: WorldData = {
      ...worldData,
      characters: worldData.characters.filter((char: Character) => char.name !== characterName),
      characterDescriptions: remainingDescriptions
    };
    
    // Update context
    await updateWorldData(updatedData);
    
    // Navigate back to world overview
    navigate('/world-overview');
  };

  const formatParagraphs = (text: string): React.ReactNode => {
    if (!text) return null;
    
    // First, normalize line endings and remove any extra whitespace
    const normalizedText = text.replace(/\r\n/g, '\n').trim();
    
    // Split text into sections based on ** markers
    const sections = normalizedText.split(/\*\*([^*]+)\*\*/);
    
    // Keep track of current section and whether we've shown the nickname
    let hasShownNickname = false;
    
    return (
      <Box maxW="800px" mx="auto">
        {sections.map((section: string, index: number) => {
          // Skip empty sections
          if (!section.trim()) return null;

          // Check if this is the initial nickname (only show once)
          if (!hasShownNickname && section.includes('"') && section.includes('"')) {
            const nickname = section.match(/"([^"]+)"/)?.[1];
            if (nickname) {
              hasShownNickname = true;
              return (
                <Text
                  key={index}
                  fontSize="20px"
                  fontFamily="'EB Garamond', serif"
                  mb={4}
                  textAlign="center"
                  lineHeight="1.6"
                  width="100%"
                  fontStyle="italic"
                >
                  "{nickname}"
                </Text>
              );
            }
            return null;
          }

          // Check if this is a header (History, Personality, Appearance)
          if (['History', 'Personality', 'Appearance'].includes(section.trim())) {
            return (
              <Text
                key={index}
                fontSize="24px"
                fontWeight="bold"
                fontFamily="'EB Garamond', serif"
                color="#4B342A"
                mb={4}
                textAlign="center"
                width="100%"
              >
                {section.trim()}
              </Text>
            );
          }

          // Check if this is the character name
          if (section.trim().startsWith('Doctor') || 
              section.trim().startsWith('Lady') || 
              section.trim().startsWith('Dame') ||
              section.trim().startsWith('Lord')) {
            // Skip if this is before the nickname (i.e., hasShownNickname is false)
            if (!hasShownNickname) {
              return null;
            }
            return (
              <Text
                key={index}
                fontSize="18px"
                fontFamily="'EB Garamond', serif"
                mb={4}
                textAlign="justify"
                lineHeight="1.6"
                width="100%"
                px={4}
              >
                {section.trim()}
              </Text>
            );
          }

          // Regular content - skip repeated nicknames
          if (section.trim() && !section.match(/^"[^"]+?"$/)) {
            return (
              <Text
                key={index}
                fontSize="18px"
                fontFamily="'EB Garamond', serif"
                mb={4}
                textAlign="justify"
                lineHeight="1.6"
                width="100%"
                px={4}
                sx={{
                  textAlignLast: "center"
                }}
              >
                {section.trim()}
              </Text>
            );
          }

          return null;
        })}
      </Box>
    );
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Navigation */}
      <Navigation />

      {/* Main Content with Right Sidebar */}
      <div className="flex-1 flex min-h-screen mt-[60px]">
        {/* Main Content Area */}
        <Flex flex={1} justify="center" align="center" bg="gray.50">
          <Container maxW="1200px" centerContent height="100%" p={0} mt="96px">
            <VStack align="start" width="100%" spacing={4}>
                  <Button
                    leftIcon={<ArrowBackIcon />}
                    aria-label="Go back to world overview"
                    onClick={() => navigate('/world-overview', { state: { worldData } })}
                variant="ghost"
                color="#4B342A"
                bg="transparent"
                _hover={{ bg: 'rgba(75,52,42,0.08)', color: '#2C1A0B' }}
                fontWeight="bold"
                borderRadius="md"
                size="md"
                mb={2}
                  >
                Back
                  </Button>
              <Box
                width="100%"
                bg="#F7F1E5"
                p={8}
                borderRadius="xl"
                boxShadow="lg"
                mb={10}
                border="2px solid #C2B280"
                position="relative"
                style={{
                  backgroundImage: 'url(/parchment-texture.png), linear-gradient(135deg, #F7F1E5 80%, #E9DFCC 100%)',
                  backgroundBlendMode: 'multiply',
                  animation: 'fadeIn 1s ease',
                  overflow: 'hidden',
                }}
                transition="box-shadow 0.2s, transform 0.2s"
                _hover={{ boxShadow: '2xl', transform: 'scale(1.01)', borderColor: '#BFA76A' }}
              >
                  <Heading 
                  size="xl"
                  mb={4}
                  color="#3B2410"
                  fontWeight="extrabold"
                  fontSize="2.2rem"
                  pb={2}
                  borderBottom="2px solid #C2B280"
                  fontFamily="'Cinzel', 'EB Garamond', serif"
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <FaScroll style={{ color: '#BFA76A', fontSize: '1.5em' }} />
                    {name}
                  </Heading>
                <Box as="span" position="absolute" left={8} bottom={8} opacity={0.08} fontSize="7xl">
                  <FaFeatherAlt />
                </Box>
                <Box as="style">{`
                  @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
                  .shimmer-underline {
                    display: block;
                    height: 3px;
                    width: 100%;
                    background: linear-gradient(90deg, #C2B280 0%, #fff7d6 50%, #C2B280 100%);
                    background-size: 200% 100%;
                    animation: shimmer 2.5s linear infinite;
                    border-radius: 2px;
                    margin-top: -6px;
                    margin-bottom: 18px;
                  }
                  @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                  }
                `}</Box>
                <span className="shimmer-underline" />
              </Box>
                  <Divider 
                    borderColor="#4B342A" 
                    borderWidth="3px" 
                width="300px"
                    margin="auto"
                    opacity="1"
                    borderRadius="full"
                  />
              <VStack spacing={10} align="center" width="100%" mt={8}>
                {/* Character Description */}
                <Box 
                  width="100%" 
                  maxW="800px"
                  bg="#EFE3C7"
                  p={10}
                  borderRadius="xl"
                  boxShadow="md"
                  textAlign="center"
                  border="2px solid #C2B280"
                  style={{ backgroundImage: 'url(/parchment-texture.png)' }}
                  mb={8}
                  mx="auto"
                >
                  {formatParagraphs(description || 'No description provided')}
                </Box>
                {/* Locations */}
                <Box 
                  width="100%" 
                  maxW="800px"
                  bg="#F5EAD6"
                  p={10}
                  borderRadius="xl"
                  boxShadow="md"
                  textAlign="center"
                  border="2px solid #C2B280"
                  style={{ backgroundImage: 'url(/parchment-texture.png)' }}
                  mb={8}
                  mx="auto"
                >
                  <VStack spacing={4} align="center">
                    <Heading size="lg" color="#3B2410" fontWeight="bold" mb={2} letterSpacing="wide">Locations</Heading>
                    <Box>
                      <Text fontWeight="bold" textAlign="center">Birth Location:</Text>
                      <Text textAlign="center">{birthLocation}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" textAlign="center">Current Location:</Text>
                      <Text textAlign="center">{currentLocation}</Text>
                    </Box>
                  </VStack>
                </Box>
                {/* Affiliations */}
                {relationships && Object.keys(relationships).length > 0 && (
                  <Box 
                    width="100%" 
                    maxW="800px"
                    bg="#F5EAD6"
                    p={10}
                    borderRadius="xl"
                    boxShadow="md"
                    textAlign="center"
                    border="2px solid #C2B280"
                    style={{ backgroundImage: 'url(/parchment-texture.png)' }}
                  >
                    <VStack spacing={4} align="center">
                      <Heading size="lg" color="#3B2410" fontWeight="bold" mb={2} letterSpacing="wide">Affiliations</Heading>
                      {relationships && Object.entries(relationships).map(([type, values]) => (
                        <Box key={type}>
                          <Text fontWeight="bold" textAlign="center">{type}:</Text>
                          <Text textAlign="center">{values.join(', ')}</Text>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
                {/* Edit Button */}
                <Button
                  bg="#6B4E3D"
                  color="white"
                  px={12}
                  py={8}
                  fontSize="22px"
                  minW="300px"
                  boxShadow="lg"
                  borderRadius="xl"
                  border="2px solid #C2B280"
                  _hover={{
                    bg: '#6B8B3D',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(136, 176, 75, 0.3)',
                    borderColor: '#BFA76A',
                  }}
                  _active={{
                    bg: '#597A2F',
                    transform: 'translateY(0)'
                  }}
                  transition="all 0.2s"
                  size="lg"
                  height="80px"
                  mt={8}
                  alignSelf="center"
                  onClick={() => navigate('/create/character', { 
                    state: { 
                      worldData, 
                      characterName: name, 
                      characterDescription: description,
                      birthLocation,
                      currentLocation,
                      relationships,
                      isEditing: true
                    } 
                  })}
                >
                  Edit Character
                </Button>
              </VStack>
            </VStack>
          </Container>
        </Flex>

        {/* Right Sidebar */}
        <WorldSidebar 
          worldData={worldData}
          onEntityClick={handleEntityClick}
          onLocationClick={handleLocationClick}
          onCharacteristicClick={handleCharacteristicClick}
        />
      </div>
    </div>
  );
}; 