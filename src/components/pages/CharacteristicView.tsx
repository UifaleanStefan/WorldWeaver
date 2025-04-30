import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Text, Button, Container, Center, Flex, Divider, IconButton, HStack } from '@chakra-ui/react';
import { Navigation } from '../Navigation';
import { WorldSidebar } from '../WorldSidebar';
import { useWorld, WorldData } from '../../contexts/WorldContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaScroll, FaFeatherAlt } from 'react-icons/fa';

interface Characteristic {
  name: string;
  location: string;
  description?: string;
}

interface CharacteristicViewProps {
  characteristicType: string;
  characteristic?: Characteristic;
  worldData: any;
}

export const CharacteristicView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { characteristicType, characteristic, worldData } = location.state as CharacteristicViewProps;
  const { updateWorldData } = useWorld();

  // If characteristic is not passed, look it up by name from worldData.characteristics
  let charac: Characteristic | undefined = characteristic;
  if (!charac && worldData && worldData.characteristics && location.pathname) {
    const nameFromPath = decodeURIComponent(location.pathname.split('/').pop() || '');
    charac = (worldData.characteristics[characteristicType] || []).find((c: Characteristic) => c.name === nameFromPath);
  }
  if (!charac) {
    return <div>Characteristic not found.</div>;
  }
  const { name, location: charLocation, description } = charac;

  const formatCharacteristicType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

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

  const handleCharacteristicClick = (type: string, name: string) => {
    navigate(`/characteristic/${type}/${encodeURIComponent(name)}`, {
      state: {
        characteristicType: type,
        characteristicName: name,
        characteristicDescription: worldData.characteristicDescriptions?.[`${type}-${name}`] || '',
        worldData: worldData
      }
    });
  };

  const handleDeleteLocation = async (locationName: string) => {
    // Get current descriptions without the deleted one
    const { [locationName]: deletedDescription, ...remainingDescriptions } = worldData.locationDescriptions || {};
    
    // Create updated world data
    const updatedData: WorldData = {
      ...worldData,
      locations: worldData.locations.filter((loc: string) => loc !== locationName),
      locationDescriptions: remainingDescriptions
    };
    
    // Update context
    await updateWorldData(updatedData);
    
    // Navigate back to world overview
    navigate('/world-overview');
  };

  const handleDeleteCharacter = async (characterName: string) => {
    const updatedData: WorldData = {
      ...worldData,
      characters: worldData.characters.filter((char: string) => char !== characterName)
    };
    
    // Update context
    await updateWorldData(updatedData);
  };

  const formatParagraphs = (text: string): React.ReactNode => {
    if (!text) return null;
    
    // First, normalize line endings and remove any extra whitespace
    const normalizedText = text.replace(/\r\n/g, '\n').trim();
    
    // Split text into paragraphs
    const paragraphs = normalizedText.split('\n');
    
    return paragraphs.map((para: string, idx: number) => {
      // Skip empty paragraphs
      if (!para.trim()) return null;

      // Check if this paragraph contains ** markers
      if (para.includes('**')) {
        // Find all instances of **text** and replace with bold text
        const parts = para.split(/(\*\*[^*]+\*\*)/);
        return (
          <VStack
            key={idx}
            width="100%"
            spacing={4}
            mb={8}
          >
            {parts.map((part, partIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                // This is a header
                const headerContent = part.replace(/\*\*/g, '');
                return (
                  <Text
                    key={partIdx}
                    fontSize="24px"
                    fontWeight="bold"
                    fontFamily="'EB Garamond', serif"
                    color="#4B342A"
                    mb={4}
                    textAlign="center"
                    width="100%"
                  >
                    {headerContent}
                  </Text>
                );
              }
              return part ? (
                <Text
                  key={partIdx}
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
                  {part.trim()}
                </Text>
              ) : null;
            })}
          </VStack>
        );
      }
      
      // Regular paragraph
      return (
        <Text
          key={idx}
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
          {para.trim()}
        </Text>
      );
    });
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Navigation */}
      <Navigation />

      {/* Main Content with Right Sidebar */}
      <div className="flex-1 flex min-h-screen mt-[60px]">
        {/* Main Content Area */}
        <Flex flex={1} justify="center" align="center" bg="gray.50">
          <Container minW="1200px" centerContent height="100%" p={0} mt="96px">
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
              <VStack align="start" width="100%" spacing={4}>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  aria-label="Go back to world overview"
                  onClick={() => navigate('/world-overview')}
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
                <Box 
                  width="100%" 
                  maxW="800px"
                  bg="#EFE3C7"
                  justifySelf="center"
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
                  <Text fontSize="20px" color="#4B342A" textAlign="center">
                    <b>Location:</b> {charLocation || 'No location provided'}
                  </Text>
                </Box>
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
                  onClick={() => navigate(`/create/${characteristicType}`, { 
                    state: { 
                      worldData, 
                      characteristicName: name, 
                      characteristicDescription: description,
                      isEditing: true
                    } 
                  })}
                >
                  Edit {formatCharacteristicType(characteristicType)}
                </Button>
              </VStack>
            </Box>
          </Container>
        </Flex>

        {/* Right Sidebar */}
        <WorldSidebar 
          worldData={worldData}
          onEntityClick={handleEntityClick}
          onDeleteLocation={handleDeleteLocation}
          onDeleteCharacter={handleDeleteCharacter}
          onLocationClick={handleLocationClick}
          onCharacteristicClick={handleCharacteristicClick}
        />
      </div>
    </div>
  );
}; 