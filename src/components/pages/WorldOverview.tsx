import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Text, Heading, Image, List, ListItem, Collapse, IconButton, Badge, HStack, Icon, SimpleGrid, Button, Flex, useToast } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, EditIcon, CalendarIcon, TimeIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Navigation } from '../Navigation';
import { worldStructures } from '../../data/worldStructures';
import { WorldStyle } from '../../types';
import { WorldSidebar } from '../WorldSidebar';
import { CreateLocationPage } from './CreateLocationPage';
import { useWorld, WorldData } from '../../contexts/WorldContext';
import { FaFeatherAlt, FaScroll, FaCrown, FaBook, FaBookOpen } from 'react-icons/fa';

interface WorldOverviewProps {}

type CardCarouselProps<T> = {
  items: T[];
  renderCard: (item: T, idx: number) => React.ReactNode;
  maxVisible?: number;
};

function CardCarousel<T>({ items, renderCard, maxVisible = 5 }: CardCarouselProps<T>) {
  const [start, setStart] = React.useState(0);
  const canScrollLeft = start > 0;
  const canScrollRight = start + maxVisible < items.length;
  const visibleItems = items.slice(start, start + maxVisible);
  return (
    <Flex align="center" justify="center" position="relative">
      <IconButton
        icon={<ChevronLeftIcon />}
        aria-label="Scroll left"
        onClick={() => setStart(start - 1)}
        isDisabled={!canScrollLeft}
        variant="ghost"
        size="lg"
        mr={2}
      />
      <Flex gap={6}>{visibleItems.map(renderCard)}</Flex>
      <IconButton
        icon={<ChevronRightIcon />}
        aria-label="Scroll right"
        onClick={() => setStart(start + 1)}
        isDisabled={!canScrollRight}
        variant="ghost"
        size="lg"
        ml={2}
      />
    </Flex>
  );
}

// Add a function to limit text to 300 words, ending at the last period before the limit
function limitTo300Words(text: string): string {
  const words = text.split(/\s+/);
  if (words.length <= 300) return text;
  // Find the last period before or at the 300th word
  let count = 0;
  let lastPeriodIdx = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === ' ') count++;
    if (text[i] === '.' && count <= 300) lastPeriodIdx = i;
    if (count > 300) break;
  }
  if (lastPeriodIdx !== -1) return text.slice(0, lastPeriodIdx + 1);
  return words.slice(0, 300).join(' ') + '...';
}

export const WorldOverview: React.FC<WorldOverviewProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const toast = useToast();
  const { worldData, updateWorldData } = useWorld();
  
  // Update context when navigation state changes (for backward compatibility)
  useEffect(() => {
    const state = location.state as { worldData: any };
    if (state?.worldData && state.worldData !== worldData) {
      // Construct data that matches our WorldData structure
      const updatedData: WorldData = {
        ...worldData, // Start with current data
        ...state.worldData, // Override with navigation state
        // Ensure required fields exist
        locationDescriptions: state.worldData.locationDescriptions || {},
        characteristics: state.worldData.characteristics || {}
      };
      
      // Update context with navigation state
      updateWorldData(updatedData);
    }
    // Only run on mount or when location.state changes
    // eslint-disable-next-line
  }, [location.state]);

  const handleEntityClick = (type: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (type === 'location') {
      navigate('/create-location', { 
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

  const handleDeleteLocation = async (locationName: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const { [locationName]: deletedDescription, ...remainingDescriptions } = worldData.locationDescriptions || {};
    const updatedData: WorldData = {
      ...worldData,
      locations: worldData.locations.filter(loc => loc !== locationName),
      locationDescriptions: remainingDescriptions
    };
    
    // Update context
    await updateWorldData(updatedData);
    
    toast({
      title: 'Location deleted',
      description: `${locationName} has been removed.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteCharacter = async (characterName: string) => {
    const updatedData: WorldData = {
      ...worldData,
      characters: worldData.characters.filter(char => char !== characterName)
    };
    
    // Update context
    await updateWorldData(updatedData);
    
    toast({
      title: 'Character deleted',
      description: `${characterName} has been removed.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Get the world style from the image path
  const worldStyle = Object.values(WorldStyle).find(
    style => {
      const imagePath = worldData.image.toLowerCase();
      const styleName = style.toLowerCase();
      // Special handling for fantasy styles
      if (styleName.includes('fantasy')) {
        return imagePath.includes(styleName.replace(' ', '-'));
      }
      return imagePath.includes(styleName.replace(' ', '-'));
    }
  ) || WorldStyle.MedievalFantasy;

  // Get the world structure for the selected style
  const worldStructure = worldStructures[worldStyle];

  // Map group IDs to their full group objects and filter out any undefined values
  const selectedGroupObjects = worldData.selectedGroups
    .map(groupId => worldStructure.groups.find(group => group.id === groupId))
    .filter((group): group is NonNullable<typeof group> => group !== undefined);

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

  return (
    <Box bg="#F7F1E5" minH="100vh">
      <Navigation />
      <Box p={5} maxW="1400px" mx="auto">
        <Box display="flex" flexDirection={{ base: "column", md: "row" }} gap={8}>
          {/* Main Content */}
          <Box flex="1">
            {/* World Banner */}
            <Box
              mb={8}
              borderRadius="lg"
              overflow="hidden"
              boxShadow="xl"
              position="relative"
            >
              {(() => {
                // Map WorldStyle to background image filename
                const styleToImage: Record<string, string> = {
                  'Medieval Fantasy': '/medieval-fantasy-background.png',
                  'Steampunk': '/steampunk-background.png',
                  'Post-Apocalyptic': '/post-apocalyptic-background.png',
                  'Historical Fiction': '/historical-fiction-background.png',
                  'Modern Supernatural': '/modern-supernatural-background.png',
                  'Sci-fi': '/sci-fi-background.png',
                  'Mythological': '/mythological-background.png',
                  'Cyberpunk': '/cyberpunk-background.png',
                  'Low Fantasy': '/low-fantasy-background.png',
                  'High Fantasy': '/high-fantasy-background.png',
                };
                const styleImage = styleToImage[worldStyle];
                return (
                <Image
                    src={styleImage || worldData.image}
                  alt={worldData.name}
                  w="100%"
                    h="500px"
                  objectFit="cover"
                    objectPosition="center 70%"
                />
                );
              })()}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.6)"
                p={4}
                color="white"
              >
                <Box maxW="1200px" mx="auto">
                  <HStack justify="space-between" align="center">
                    <Heading size="2xl" color="#F7F1E5" fontWeight="extrabold">
                      {worldData.name}
                    </Heading>
                    <Badge 
                      fontSize="md" 
                      colorScheme="orange" 
                      p={2} 
                      borderRadius="md"
                    >
                      {worldStyle.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  </HStack>
                </Box>
              </Box>
            </Box>

            {/* About This World */}
            <Box 
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
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onClick={() => navigate('/world-lore', { state: { worldData } })}
              _hover={{ boxShadow: '2xl', transform: 'scale(1.01)', borderColor: '#BFA76A', background: '#F5EAD6' }}
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
                About This World
              </Heading>
              <Box>
                <Text fontSize="xl" color="#4B342A" lineHeight="tall">
                  {limitTo300Words(worldData.description)}
                </Text>
              </Box>
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

            {/* World Statistics */}
            <Box 
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
                animation: 'fadeIn 1.2s ease',
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
                <FaCrown style={{ color: '#BFA76A', fontSize: '1.5em' }} />
                World Statistics
              </Heading>
              <span className="shimmer-underline" />
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
                <Box 
                  bg="#E9DFCC"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  border="2px solid #C2B280"
                  textAlign="center"
                  transition="box-shadow 0.2s, transform 0.2s"
                  _hover={{ boxShadow: 'xl', transform: 'scale(1.06)', borderColor: '#BFA76A', background: '#F7F1E5' }}
                  cursor="pointer"
                  style={{ background: 'radial-gradient(circle at 60% 40%, #fffbe6 60%, #E9DFCC 100%)' }}
                  onClick={() => handleEntityClick('character')}
                >
                  <VStack align="center" spacing={2}>
                    <Text fontSize="3xl" color="#4B342A" fontWeight="bold">
                      {worldData.characters.length}
                    </Text>
                    <Text fontSize="lg" color="#4B342A" fontWeight="semibold">
                      Characters
                    </Text>
                    <Button 
                      colorScheme="orange" 
                      size="sm" 
                      leftIcon={<EditIcon />}
                      mt={2}
                    >
                      Add Character
                    </Button>
                  </VStack>
                </Box>
                <Box 
                  bg="#E9DFCC"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  border="2px solid #C2B280"
                  textAlign="center"
                  transition="box-shadow 0.2s, transform 0.2s"
                  _hover={{ boxShadow: 'xl', transform: 'scale(1.06)', borderColor: '#BFA76A', background: '#F7F1E5' }}
                  cursor="pointer"
                  style={{ background: 'radial-gradient(circle at 60% 40%, #fffbe6 60%, #E9DFCC 100%)' }}
                  onClick={() => handleEntityClick('location')}
                >
                  <VStack align="center" spacing={2}>
                    <Text fontSize="3xl" color="#4B342A" fontWeight="bold">
                      {worldData.locations.length}
                    </Text>
                    <Text fontSize="lg" color="#4B342A" fontWeight="semibold">
                      Locations
                    </Text>
                    <Button 
                      colorScheme="orange" 
                      size="sm" 
                      leftIcon={<EditIcon />}
                      mt={2}
                    >
                      Add Location
                    </Button>
                  </VStack>
                </Box>
                <Box 
                  bg="#E9DFCC"
                  p={6}
                  borderRadius="lg"
                  boxShadow="md"
                  border="2px solid #C2B280"
                  textAlign="center"
                  transition="box-shadow 0.2s, transform 0.2s"
                  _hover={{ boxShadow: 'xl', transform: 'scale(1.06)', borderColor: '#BFA76A', background: '#F7F1E5' }}
                  cursor="pointer"
                  style={{ background: 'radial-gradient(circle at 60% 40%, #fffbe6 60%, #E9DFCC 100%)' }}
                >
                  <VStack align="center" spacing={2}>
                    <Text fontSize="3xl" color="#4B342A" fontWeight="bold">
                      {selectedGroupObjects.length}
                    </Text>
                    <Text fontSize="lg" color="#4B342A" fontWeight="semibold">
                      Entity Groups
                    </Text>
                    <Button 
                      colorScheme="orange" 
                      size="sm" 
                      leftIcon={<CalendarIcon />}
                      mt={2}
                    >
                      View Timeline
                    </Button>
                  </VStack>
                </Box>
              </SimpleGrid>
            </Box>

            {/* World Wiki */}
            <Box 
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
                animation: 'fadeIn 1.4s ease',
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
                <FaBook style={{ color: '#BFA76A', fontSize: '1.5em' }} />
                World Wiki
              </Heading>
              <span className="shimmer-underline" />
              <Text fontSize="xl" mb={4} color="#4B342A">
                Welcome to the {worldData.name} wiki. Here you can find all the information about your world and its entities.
              </Text>
              <Box as="span" position="absolute" right={8} bottom={8} opacity={0.08} fontSize="7xl">
                <FaBookOpen />
              </Box>
            </Box>

            {/* Entity Carousels Section (Simple, No Extra Imports) */}
            <Box
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
                animation: 'fadeIn 1.6s ease',
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
                <FaBookOpen style={{ color: '#BFA76A', fontSize: '1.5em' }} />
                Lore
              </Heading>
              <span className="shimmer-underline" />
              {/* LOCATIONS */}
              {worldData.locations && worldData.locations.length > 0 && (
                <Box mb={10}>
                  <Flex justify="space-between" align="center" mb={2} direction={{ base: 'column', md: 'row' }}>
                    <Heading fontSize="2xl" fontWeight="bold" color="#4B342A" mb={{ base: 2, md: 0 }}>
                      Locations
                    </Heading>
                    <Button
                      colorScheme="green"
                      size="sm"
                      leftIcon={<span style={{fontSize: '1.1em'}}>➕</span>}
                      onClick={() => handleEntityClick('location')}
                      transition="all 0.2s"
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    >
                      Add New
                    </Button>
                  </Flex>
                  <Box borderBottom="1px solid #E2E8F0" mb={4} />
                  <CardCarousel<string>
                    items={worldData.locations as string[]}
                    renderCard={(location: string, idx: number) => (
                      <Box
                        key={location + idx}
                        minW="320px"
                        maxW="400px"
                        h={{ base: "320px", md: "400px", lg: "440px" }}
                        flex="0 0 320px"
                        background="#E9DFCC"
                        p={10}
                        borderRadius="2xl"
                        boxShadow="lg"
                        border="2px solid #C2B280"
                        cursor="pointer"
                        style={{
                          backgroundImage: 'url(/parchment-texture.png)',
                          backgroundBlendMode: 'multiply',
                          animation: 'fadeIn 2s ease',
                        }}
                        onClick={() => handleLocationClick(location)}
                        _hover={{
                          transform: 'scale(1.06)',
                          boxShadow: '0 0 24px 4px #BFA76A',
                          borderColor: '#BFA76A',
                          background: '#F7F1E5',
                        }}
                        transition="all 0.18s cubic-bezier(.4,2,.6,1)"
                        mb={2}
                      >
                        <VStack align="stretch" spacing={4} h="100%" justify="center">
                          <Heading fontSize="2xl" fontWeight="bold" color="#4B342A" noOfLines={2}>{location}</Heading>
                          {worldData.locationDescriptions?.[location] && (
                            <Text color="#6B4E3D" fontSize="lg" noOfLines={5} whiteSpace="pre-line" textOverflow="ellipsis" overflow="hidden">
                              {worldData.locationDescriptions[location]}
                            </Text>
                          )}
                        </VStack>
                      </Box>
                    )}
                    maxVisible={4}
                  />
                </Box>
              )}

              {/* CHARACTERS */}
              {worldData.characters && worldData.characters.length > 0 && (
                <Box mb={10}>
                  <Flex justify="space-between" align="center" mb={2} direction={{ base: 'column', md: 'row' }}>
                    <Heading fontSize="2xl" fontWeight="bold" color="#4B342A" mb={{ base: 2, md: 0 }}>
                      Characters
                    </Heading>
                    <Button
                      colorScheme="green"
                      size="sm"
                      leftIcon={<span style={{fontSize: '1.1em'}}>➕</span>}
                      onClick={() => handleEntityClick('character')}
                      transition="all 0.2s"
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                    >
                      Add New
                    </Button>
                  </Flex>
                  <Box borderBottom="1px solid #E2E8F0" mb={4} />
                  <CardCarousel<{ name: string; description?: string }>
                    items={(worldData.characters as any[]).filter((c): c is { name: string; description?: string } => typeof c === 'object' && c !== null && 'name' in c)}
                    renderCard={(character, idx) => (
                      <Box
                        key={character.name + idx}
                        minW="320px"
                        maxW="400px"
                        h={{ base: "320px", md: "400px", lg: "440px" }}
                        flex="0 0 320px"
                        background="#E9DFCC"
                        p={10}
                        borderRadius="2xl"
                        boxShadow="lg"
                        border="2px solid #C2B280"
                        cursor="pointer"
                        style={{
                          backgroundImage: 'url(/parchment-texture.png)',
                          backgroundBlendMode: 'multiply',
                          animation: 'fadeIn 2.2s ease',
                        }}
                        onClick={() => navigate(`/character/${encodeURIComponent(character.name)}`, {
                          state: {
                            characterName: character.name,
                            worldData: worldData
                          }
                        })}
                        _hover={{
                          transform: 'scale(1.06)',
                          boxShadow: '0 0 24px 4px #BFA76A',
                          borderColor: '#BFA76A',
                          background: '#F7F1E5',
                        }}
                        transition="all 0.18s cubic-bezier(.4,2,.6,1)"
                        mb={2}
                      >
                        <VStack align="stretch" spacing={4} h="100%" justify="center">
                          <Heading fontSize="2xl" fontWeight="bold" color="#4B342A" noOfLines={2}>{character.name}</Heading>
                          {character.description && (
                            <Text color="#6B4E3D" fontSize="lg" noOfLines={5} whiteSpace="pre-line" textOverflow="ellipsis" overflow="hidden">
                              {character.description}
                            </Text>
                          )}
                        </VStack>
                      </Box>
                    )}
                    maxVisible={4}
                  />
                </Box>
              )}

              {/* GROUPS/CHARACTERISTICS */}
              {selectedGroupObjects.map(group => {
                const characteristics = worldData.characteristics?.[group.id] || [];
                if (!characteristics.length) return null;
                return (
                  <Box mb={10} key={group.id}>
                    <Flex justify="space-between" align="center" mb={2} direction={{ base: 'column', md: 'row' }}>
                      <Heading fontSize="2xl" fontWeight="bold" color="#4B342A" mb={{ base: 2, md: 0 }}>
                        {group.name}
                      </Heading>
                      <Button
                        colorScheme="green"
                        size="sm"
                        leftIcon={<span style={{fontSize: '1.1em'}}>➕</span>}
                        onClick={() => handleEntityClick(group.id)}
                        transition="all 0.2s"
                        _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                      >
                        Add New
                      </Button>
                    </Flex>
                    <Box borderBottom="1px solid #E2E8F0" mb={4} />
                    <CardCarousel<{ name: string; description?: string }>
                      items={characteristics as { name: string; description?: string }[]}
                      renderCard={(char: { name: string; description?: string }, idx: number) => (
                        <Box
                          key={char.name + idx}
                          minW="320px"
                          maxW="400px"
                          h={{ base: "320px", md: "400px", lg: "440px" }}
                          flex="0 0 320px"
                          background="#E9DFCC"
                          p={10}
                          borderRadius="2xl"
                          boxShadow="lg"
                          border="2px solid #C2B280"
                          cursor="pointer"
                          style={{
                            backgroundImage: 'url(/parchment-texture.png)',
                            backgroundBlendMode: 'multiply',
                            animation: 'fadeIn 2.4s ease',
                          }}
                          onClick={() => handleCharacteristicClick(group.id, char.name)}
                          _hover={{
                            transform: 'scale(1.06)',
                            boxShadow: '0 0 24px 4px #BFA76A',
                            borderColor: '#BFA76A',
                            background: '#F7F1E5',
                          }}
                          transition="all 0.18s cubic-bezier(.4,2,.6,1)"
                          mb={2}
                        >
                          <VStack align="stretch" spacing={4} h="100%" justify="center">
                            <Heading fontSize="2xl" fontWeight="bold" color="#4B342A" noOfLines={2}>{char.name}</Heading>
                            {char.description && (
                              <Text color="#6B4E3D" fontSize="lg" noOfLines={5} whiteSpace="pre-line" textOverflow="ellipsis" overflow="hidden">
                                {char.description}
                              </Text>
                            )}
                          </VStack>
                        </Box>
                      )}
                      maxVisible={4}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Right Sidebar */}
          <WorldSidebar 
            worldData={worldData}
            onEntityClick={handleEntityClick}
            onDeleteLocation={handleDeleteLocation}
            onDeleteCharacter={handleDeleteCharacter}
            onLocationClick={handleLocationClick}
            onCharacteristicClick={handleCharacteristicClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WorldOverview; 