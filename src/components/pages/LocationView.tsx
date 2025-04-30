import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, VStack, Heading, Text, Button, Container, Center, Flex, Divider, IconButton } from '@chakra-ui/react';
import { Navigation } from '../Navigation';
import { WorldSidebar } from '../../components/WorldSidebar';
import { useWorld, WorldData } from '../../contexts/WorldContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { FaScroll, FaFeatherAlt } from 'react-icons/fa';

interface LocationViewProps {
  locationName: string;
  locationDescription: string;
  worldData: WorldData;
}

export const LocationView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { locationName, locationDescription, worldData } = location.state as LocationViewProps;
  const { updateWorldData } = useWorld();

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

  const handleDeleteLocation = async (locationName: string) => {
    // Get current descriptions without the deleted one
    const { [locationName]: deletedDescription, ...remainingDescriptions } = worldData.locationDescriptions || {};
    
    // Create updated world data
    const updatedData: WorldData = {
      ...worldData,
      locations: worldData.locations.filter(loc => loc !== locationName),
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
      characters: worldData.characters.filter(char => char !== characterName)
    };
    
    // Update context
    await updateWorldData(updatedData);
  };

  const formatParagraphs = (text: string) => {
    // First, normalize line endings and remove any extra whitespace
    const normalizedText = text.replace(/\r\n/g, '\n').trim();
    
    // Split text into paragraphs
    const paragraphs = normalizedText.split('\n');
    
    return paragraphs.map((para: string, idx: number) => {
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
                // This is bold text
                const boldContent = part.replace(/\*\*/g, '');
                return (
                  <Text
                    as="span"
                    key={partIdx}
                    fontWeight="bold"
                    fontSize="24px"
                    color="#4B342A"
                    textAlign="center"
                    width="100%"
                  >
                    {boldContent}
                  </Text>
                );
              }
              return part ? (
                <Text
                  as="span"
                  key={partIdx}
                  fontSize="16px"
                  textAlign="center"
                  width="100%"
                >
                  {part}
                </Text>
              ) : null;
            })}
          </VStack>
        );
      }
      
      // Regular paragraph or bullet point
      const isBullet = para.trim().startsWith('-');
      return (
        <Text
          key={idx}
          fontSize="18px"
          fontFamily="'EB Garamond', serif"
          mb={6}
          textAlign="center"
          lineHeight="2"
          width="100%"
          pl={isBullet ? 4 : 0}
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
                  color="#4B342A"
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
                  {locationName}
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
                  maxW="1000px"
                  bg="#E9DFCC"
                  p={10}
                  borderRadius="xl"
                  boxShadow="md"
                  textAlign="center"
                  border="2px solid #C2B280"
                  style={{ backgroundImage: 'url(/parchment-texture.png)' }}
                  mb={8}
                >
                  {locationDescription
                    ? formatParagraphs(locationDescription)
                    : <Text fontSize="md" color="#4B342A" textAlign="center">No description provided</Text>
                  }
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
                  onClick={() => navigate('/create-location', { 
                    state: { 
                      worldData, 
                      locationName, 
                      locationDescription,
                      isEditing: true
                    } 
                  })}
                >
                  Edit Location
                </Button>
              </Box>
            </VStack>
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