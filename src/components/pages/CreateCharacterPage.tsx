import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  VStack, 
  Input, 
  Textarea, 
  Select, 
  Button, 
  Heading, 
  Text, 
  FormControl, 
  FormLabel,
  useToast,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  HStack
} from '@chakra-ui/react';
import { RepeatIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { Navigation } from '../Navigation';
import { WorldSidebar } from '../WorldSidebar';
import { WorldStyle, WorldAffiliations } from '../../types';
import { getRandomCharacterName } from '../../utils/nameGenerator';
import { getRandomCharacterDescription } from '../../utils/descriptionGenerator';
import { MdAutorenew } from 'react-icons/md';
import axios from 'axios';
import { useWorld } from '../../contexts/WorldContext';

interface Character {
  name: string;
  description: string;
  birthLocation: string;
  currentLocation: string;
  relationships: Record<string, string[]>;
}

interface CharacterWorldData {
  name: string;
  description: string;
  image: string;
  selectedGroups: string[];
  locations: string[];
  characters: Character[];
  characterDescriptions?: Record<string, string>;
  locationDescriptions?: Record<string, string>;
  characteristicDescriptions?: Record<string, string>;
  style: WorldStyle;
  affiliations?: WorldAffiliations;
  characteristics: Record<string, any[]>;
}

export const CreateCharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { worldData, updateWorldData } = useWorld();
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
  const determineWorldStyle = (imagePath: string): WorldStyle => {
    if (imagePath.includes('medieval-fantasy')) {
      return WorldStyle.MedievalFantasy;
    } else if (imagePath.includes('steampunk')) {
      return WorldStyle.Steampunk;
    } else if (imagePath.includes('post-apocalyptic')) {
      return WorldStyle.PostApocalyptic;
    } else if (imagePath.includes('cyberpunk')) {
      return WorldStyle.Cyberpunk;
    } else if (imagePath.includes('mythological')) {
      return WorldStyle.Mythological;
    } else if (imagePath.includes('sci-fi')) {
      return WorldStyle.SciFi;
    } else if (imagePath.includes('modern-supernatural')) {
      return WorldStyle.ModernSupernatural;
    } else if (imagePath.includes('historical-fiction')) {
      return WorldStyle.HistoricalFiction;
    } else if (imagePath.includes('low-fantasy')) {
      return WorldStyle.LowFantasy;
    } else if (imagePath.includes('high-fantasy')) {
      return WorldStyle.HighFantasy;
    }
    return WorldStyle.MedievalFantasy;
  };

  const [worldState, setWorldState] = useState<CharacterWorldData>(() => {
    const locationState = location.state as { worldData: CharacterWorldData };
    if (locationState?.worldData) {
      const worldData = locationState.worldData;
      if (!worldData.style && worldData.image) {
        worldData.style = determineWorldStyle(worldData.image);
      }
      if (!worldData.characterDescriptions) {
        worldData.characterDescriptions = {};
      }
      if (!worldData.locationDescriptions) {
        worldData.locationDescriptions = {};
      }
      if (!worldData.characteristicDescriptions) {
        worldData.characteristicDescriptions = {};
      }
      if (!worldData.affiliations) {
        worldData.affiliations = {
          // Medieval Fantasy
          nobleHouses: [],
          knightOrders: [],
          secretCults: [],
          mageCircles: [],
          merchantGuilds: [],
          religions: [],
          // Steampunk
          guilds: [],
          airshipCrews: [],
          industrialCorporations: [],
          inventorsSocieties: [],
          steamMilitias: [],
          secretOrders: [],
          scientificInstitutes: [],
          // Post-Apocalyptic
          survivorFactions: [],
          remnantGovernments: [],
          techCults: [],
          scavengerCrews: [],
          nomadicTribes: [],
          salvageGuilds: [],
          // Historical Fiction
          historicalNobleHouses: [],
          militaryRegiments: [],
          historicalSecretSocieties: [],
          religiousOrders: [],
          craftGuilds: [],
          // Sci-fi
          researchInstitutes: [],
          militaryFactions: [],
          aiCollectives: [],
          spaceGuilds: [],
          terraformingSyndicates: [],
          // Modern Supernatural
          secretSocieties: [],
          occultOrders: [],
          corporateFronts: [],
          governmentAgencies: [],
          magicalLineages: [],
          urbanCovens: [],
          cryptidResearchUnits: [],
          // Mythological
          pantheons: [],
          heroicLineages: [],
          mysticTemples: [],
          oracles: [],
          cursedClans: [],
          // Low Fantasy
          lowFantasyNobleHouses: [],
          militias: [],
          tradeGuilds: [],
          undergroundNetworks: [],
          localReligions: [],
          lowFantasySecretOrders: [],
          // High Fantasy
          highFantasyNobleHouses: [],
          magicalOrders: [],
          highFantasyReligions: [],
          ancientGuilds: [],
          highFantasySecretSocieties: []
        };
      }
      if (!worldData.characteristics) {
        worldData.characteristics = {};
      }
      return worldData;
    }
    return {
      name: '',
      description: '',
      image: '/medieval-fantasy.png',
      selectedGroups: [],
      locations: [],
      characters: [],
      characterDescriptions: {},
      locationDescriptions: {},
      characteristicDescriptions: {},
      style: WorldStyle.MedievalFantasy,
      affiliations: {
        // Medieval Fantasy
        nobleHouses: [],
        knightOrders: [],
        secretCults: [],
        mageCircles: [],
        merchantGuilds: [],
        religions: [],
        // Steampunk
        guilds: [],
        airshipCrews: [],
        industrialCorporations: [],
        inventorsSocieties: [],
        steamMilitias: [],
        secretOrders: [],
        scientificInstitutes: [],
        // Post-Apocalyptic
        survivorFactions: [],
        remnantGovernments: [],
        techCults: [],
        scavengerCrews: [],
        nomadicTribes: [],
        salvageGuilds: [],
        // Historical Fiction
        historicalNobleHouses: [],
        militaryRegiments: [],
        historicalSecretSocieties: [],
        religiousOrders: [],
        craftGuilds: [],
        // Sci-fi
        researchInstitutes: [],
        militaryFactions: [],
        aiCollectives: [],
        spaceGuilds: [],
        terraformingSyndicates: [],
        // Modern Supernatural
        secretSocieties: [],
        occultOrders: [],
        corporateFronts: [],
        governmentAgencies: [],
        magicalLineages: [],
        urbanCovens: [],
        cryptidResearchUnits: [],
        // Mythological
        pantheons: [],
        heroicLineages: [],
        mysticTemples: [],
        oracles: [],
        cursedClans: [],
        // Low Fantasy
        lowFantasyNobleHouses: [],
        militias: [],
        tradeGuilds: [],
        undergroundNetworks: [],
        localReligions: [],
        lowFantasySecretOrders: [],
        // High Fantasy
        highFantasyNobleHouses: [],
        magicalOrders: [],
        highFantasyReligions: [],
        ancientGuilds: [],
        highFantasySecretSocieties: []
      },
      characteristics: {}
    };
  });

  const [formData, setFormData] = useState<Character>({
    name: getRandomCharacterName(),
    description: '',
    birthLocation: '',
    currentLocation: '',
    relationships: {},
  });

  // Add useEffect to pre-fill form if editing
  useEffect(() => {
    if (location.state?.isEditing) {
      setFormData(prev => ({
        ...prev,
        name: location.state.characterName || '',
        description: location.state.characterDescription || '',
        birthLocation: location.state.birthLocation || '',
        currentLocation: location.state.currentLocation || '',
        relationships: location.state.relationships || {},
      }));
    }
  }, [location.state]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewDescription, setPreviewDescription] = useState<string | null>(null);
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRelationshipChange = (relationshipType: string, values: string[]) => {
    setFormData(prev => ({
      ...prev,
      relationships: {
        ...prev.relationships,
        [relationshipType]: values,
      },
    }));
  };

  const handleGenerateNewName = () => {
    setFormData(prev => ({
      ...prev,
      name: getRandomCharacterName(),
    }));
  };

  const handleGenerateDescription = () => {
    const worldStyle = worldState?.style;
    if (worldStyle) {
      const newDescription = getRandomCharacterDescription(worldStyle);
      setFormData(prev => ({
        ...prev,
        description: newDescription
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not found');
      }

      // Check if there are enough locations
      if (worldState.locations.length < 3) {
        toast({
          title: 'Not Enough Locations',
          description: 'You must create 3 locations before you can create your first character.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      // Validate that both locations are selected
      if (!formData.birthLocation || !formData.currentLocation) {
        toast({
          title: 'Missing Locations',
          description: 'Please select both birth and current locations for the character.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setIsSubmitting(false);
        return;
      }

      // Get location descriptions
      const birthLocationDesc = worldState.locationDescriptions?.[formData.birthLocation] || '';
      const currentLocationDesc = worldState.locationDescriptions?.[formData.currentLocation] || '';
      
      // Get first 5 sentences of each location description
      const getBriefDesc = (text: string) => text.match(/(?:[^.!?]*[.!?]){1,5}/)?.[0] || text;
      const birthLocationBrief = getBriefDesc(birthLocationDesc);
      const currentLocationBrief = getBriefDesc(currentLocationDesc);

      // Get characteristic descriptions
      const characteristicDescs = Object.entries(formData.relationships || {})
        .map(([type, values]) => {
          if (!values?.length) return '';
          const charDesc = worldState.characteristicDescriptions?.[`${type}-${values[0]}`] || '';
          return `${type}: ${values[0]} - ${getBriefDesc(charDesc)}`;
        })
        .filter(desc => desc)
        .join('\n');

      // AI description generation pipeline
      const prompt = `Create a character named ${formData.name} in the world of ${worldState.name}.
Birth location (${formData.birthLocation}): ${birthLocationBrief}
Current location (${formData.currentLocation}): ${currentLocationBrief}
${characteristicDescs ? `\nCharacter affiliations and characteristics:\n${characteristicDescs}` : ''}
World description: ${worldState.description}
Initial character description: ${formData.description}

Requirements:
1. EXACTLY 150 words maximum - this is a strict requirement
2. Format with these exact sections:
   **${formData.name}
   Nickname(no content, just the nickname in "" and italics)

   **History
   [Content]

   **Personality
   [Content]

   **Appearance
   [Content]

3. Rich in detail and natural within the world lore
4. Well-structured narrative
5. No meta-text, word counts, or labels in the output
8. DO NOT INCLUDE ANY NOTES OR LABELS IN THE OUTPUT

Count words carefully and revise until you hit exactly 150 words or less. Only output the final version, DO NOT INCLUDE WORD COUNTS OR NOTES.`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-16k',
          messages: [{
            role: 'system',
            content: 'You are a creative writer specializing in wiki-style descriptions. Your task is to generate descriptions with STRICT word count limits. Format all section titles with ** markers. Do not include any meta information, notes, or labels in the output. Count words carefully and revise until you hit the exact word count.'
          }, {
            role: 'user',
            content: prompt
          }],
          max_tokens: 2000,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Initial description response:', response.data);
      let aiDescription = response.data.choices[0].message.content;
      aiDescription = aiDescription.replace(/(^|\n|\r)\s*(Character Description:|Description:)?\s*/gi, '');
      
      // Check if the response seems complete
      if (aiDescription.split(/\s+/).length < 100) {
        console.warn('Generated description may be incomplete:', aiDescription);
        toast({
          title: 'Warning',
          description: 'The generated description might be shorter than expected. Would you like to try again?',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
      
      setPreviewDescription(aiDescription.trim());
      setIsSubmitting(false);
    } catch (error: unknown) {
      let errorMessage = 'An error occurred while generating your character description.';
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
      toast({
        title: 'Error generating character description',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
    }
  };

  const handleAcceptDescription = async () => {
    setIsExpanding(true);
    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not found');
      }

      // Prompt for expanded description
      const expandedPrompt = `Given this character's initial description: ${previewDescription}

Requirements:
1. Format with these exact sections:
   **${formData.name}
   Nickname(no content, just the nickname in "" and italics)

   **History
   [Content - Develop a detailed background including key life events, formative experiences, and significant relationships. This section should be roughly 150-175 words.]

   **Personality
   [Content - Explore the character's traits, behaviors, motivations, and psychological makeup. Include both strengths and flaws. This section should be roughly 150-175 words.]

   **Appearance
   [Content - Provide a vivid physical description including distinctive features, typical attire, and notable mannerisms. This section should be roughly 100-150 words.]

2. IMPORTANT: Each section must be fully developed with equal attention and detail
3. Rich in detail and natural within the world lore
4. Well-structured narrative
5. EXACTLY 400-500 words total across all sections - this is a strict requirement
6. Create a wiki-style description of the character
7. Make sure all three sections are properly developed, not just focusing on one section
8. DO NOT INCLUDE ANY NOTES OR LABELS IN THE OUTPUT

Count words carefully and revise until you hit between 400-500 words total. Only output the final version, DO NOT INCLUDE WORD COUNTS OR NOTES.`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-16k',
          messages: [{
            role: 'system',
            content: 'You are a creative writer specializing in wiki-style descriptions. Your task is to generate balanced character descriptions with STRICT word count limits. Format all section titles with ** markers. Each section (History, Personality, and Appearance) must be fully developed with equal attention to detail. Do not include any meta information, notes, or labels in the output. Count words carefully and revise until you hit the exact word count.'
          }, {
            role: 'user',
            content: expandedPrompt
          }],
          max_tokens: 2000,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Expanded description response:', response.data);
      let aiExpanded = response.data.choices[0].message.content;
      aiExpanded = aiExpanded.replace(/(^|\n|\r)\s*(Expanded Description:|Expansion:|Description:)?\s*/gi, '');
      
      // Check if the response seems complete
      if (aiExpanded.split(/\s+/).length < 400) {
        console.warn('Generated description may be incomplete:', aiExpanded);
        toast({
          title: 'Warning',
          description: 'The generated description might be shorter than expected. Would you like to try again?',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
      
      setExpandedPreview(aiExpanded.trim());
    } catch (error: unknown) {
      console.error('Error:', error);
      let errorMessage = 'An error occurred while expanding your character description.';
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
      toast({
        title: 'Error expanding character description',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsExpanding(false);
    }
  };

  const handleAcceptExpanded = async () => {
    setIsSubmitting(true);
    try {
      const newCharacter: Character = {
        name: formData.name,
        description: expandedPreview || '',
        birthLocation: formData.birthLocation,
        currentLocation: formData.currentLocation,
        relationships: formData.relationships,
      };
      const updatedWorldData = {
        ...worldState,
        characters: [...worldState.characters, newCharacter],
        characterDescriptions: {
          ...(worldState.characterDescriptions || {}),
          [newCharacter.name]: newCharacter.description
        }
      };
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/world-overview', { 
        state: {
          worldData: updatedWorldData
        },
        replace: true
      });
    } catch (error: unknown) {
      let errorMessage = 'There was a problem saving your character. Please try again.';
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
      toast({
        title: 'Error saving character',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
      setExpandedPreview(null);
    }
  };

  const handleRefuseExpanded = () => {
    setExpandedPreview(null);
  };

  const handleRefuseDescription = () => {
    setPreviewDescription(null);
    setExpandedPreview(null);
  };

  const formatParagraphs = (text: string): React.ReactNode => {
    if (!text) return null;
    
    // First, normalize line endings and remove any extra whitespace
    const normalizedText = text.replace(/\r\n/g, '\n').trim();
    
    // Split text into sections based on ** markers
    const sections = normalizedText.split(/\*\*([^*]+)\*\*/);
    
    return (
      <>
        {sections.map((section: string, index: number) => {
          // Skip empty sections
          if (!section.trim()) return null;

          // Check if this is a nickname section
          if (section.includes('Nickname:')) {
            const nickname = section.match(/"([^"]+)"/)?.[1];
            if (nickname) {
              return (
                <Text
                  key={index}
                  fontSize="18px"
                  fontFamily="'EB Garamond', serif"
                  mb={6}
                  textAlign="center"
                  lineHeight="2"
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
                mb={6}
                textAlign="center"
                width="100%"
              >
                {section.trim()}
              </Text>
            );
          }

          // Check if this is the character name
          if (section.trim().startsWith('Lady') || section.trim().startsWith('Lord')) {
            return (
              <Text
                key={index}
                fontSize="28px"
                fontWeight="bold"
                fontFamily="'Cinzel', serif"
                color="#4B342A"
                mb={6}
                textAlign="center"
                width="100%"
              >
                {section.trim()}
              </Text>
            );
          }

          // Regular content
          if (section.trim()) {
            return (
              <Text
                key={index}
                fontSize="18px"
                fontFamily="'EB Garamond', serif"
                mb={6}
                textAlign="center"
                lineHeight="2"
                width="100%"
              >
                {section.trim()}
              </Text>
            );
          }

          return null;
        })}
      </>
    );
  };

  const getStyleSpecificRelationships = () => {
    const style = worldState.style;
    const selectedGroups = worldState.selectedGroups;
    const relationships: { [key: string]: string[] } = {};

    switch (style) {
      case WorldStyle.MedievalFantasy:
        if (selectedGroups.includes('noble-houses')) {
          relationships['Member of'] = ['Noble Houses / Dynasties'];
        }
        if (selectedGroups.includes('kingdoms')) {
          relationships['Serves'] = ['Kingdoms'];
        }
        break;

      case WorldStyle.Steampunk:
        if (selectedGroups.includes('industrial-corps')) {
          relationships['Works for'] = ['Industrial Corporations'];
        }
        if (selectedGroups.includes('steam-militias')) {
          relationships['Member of'] = ['Steam Militias'];
        }
        break;

      case WorldStyle.PostApocalyptic:
        if (selectedGroups.includes('warlord-territories')) {
          relationships['Aligned with'] = ['Warlord Territories'];
        }
        if (selectedGroups.includes('remnant-govts')) {
          relationships['Works for'] = ['Remnant Governments'];
        }
        break;

      case WorldStyle.Cyberpunk:
        if (selectedGroups.includes('megacorps')) {
          relationships['Employed by'] = ['Mega-Corporations'];
        }
        if (selectedGroups.includes('syndicates')) {
          relationships['Member of'] = ['Syndicates / Gangs'];
        }
        break;

      case WorldStyle.SciFi:
        if (selectedGroups.includes('federations')) {
          relationships['Member of'] = ['Federations / Planetary Alliances'];
        }
        if (selectedGroups.includes('megacorps')) {
          relationships['Works for'] = ['Megacorporations'];
        }
        break;

      case WorldStyle.Mythological:
        if (selectedGroups.includes('pantheons')) {
          relationships['Worships'] = ['Pantheons / Divine Orders'];
        }
        if (selectedGroups.includes('mystic-temples')) {
          relationships['Associated with'] = ['Mystic Temples'];
        }
        break;

      case WorldStyle.ModernSupernatural:
        if (selectedGroups.includes('secret-societies')) {
          relationships['Member of'] = ['Secret Societies'];
        }
        if (selectedGroups.includes('corporate-fronts')) {
          relationships['Works for'] = ['Corporate Fronts'];
        }
        break;
    }

    return relationships;
  };

  const styleRelationships = getStyleSpecificRelationships();

  // Check if there are enough locations
  const hasEnoughLocations = worldState.locations.length >= 3;

  const handleSave = () => {
    if (!worldState) return;

    const newCharacter: Character = {
      name: formData.name,
      description: formData.description,
      birthLocation: formData.birthLocation,
      currentLocation: formData.currentLocation,
      relationships: formData.relationships
    };

    const updatedWorldData = {
      ...worldState,
      characters: [...worldState.characters, newCharacter]
    };

    setWorldState(updatedWorldData);
    navigate(`/character/${encodeURIComponent(formData.name)}`, {
      state: {
        character: newCharacter,
        worldData: updatedWorldData
      }
    });
  };

  return (
    <Box minH="92.7vh" display="flex" bg="#F5F5F5">
      <Navigation />
      
    <Box 
        flex="1" 
      display="flex" 
        mt="30px" 
        bg="#F5F5F5"
        p="0"
      position="relative"
        zIndex="0"
        width="100%"
        mb="0"
        pb="0"
      >
        <Container 
          maxW="1000px" 
          py={4} 
          px={4}
          mx="auto"
          height="auto"
          bg="#F5F5F5"
        >
          <Box
            p={6}
            borderRadius="xl"
            boxShadow="xl"
            borderWidth="1px"
            borderColor="#D9CBB5"
            bg="#F5F5F5"
          >
            <VStack spacing={8} align="stretch">
              {!hasEnoughLocations && (
                <Alert status="warning" borderRadius="15px">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Not Enough Locations</AlertTitle>
                    <AlertDescription>
                      You need to create at least 3 locations before you can create characters.
                    </AlertDescription>
                  </Box>
                </Alert>
              )}

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
              </VStack>

              <form onSubmit={handleSubmit}>
                <VStack spacing={12} align="stretch">
                  {/* Basic Information */}
                  <Box>
                    <Heading 
                      size="xl" 
                      color="#4B342A" 
                      mb={8}
                      pb={3}
                      borderBottom="3px solid"
                      borderColor="#D9CBB5"
                      textAlign="center"
                    >
                      Basic Information
                    </Heading>
                    <VStack spacing={16} width="100%">
                    <Box textAlign="center" width="100%" mb={6}>
                    <Box display="inline-block" minW="300px" maxW="400px" width="auto">
                      <FormControl isRequired width="100%">
                        <FormLabel color="#6B4E3D" fontSize="25px" fontWeight="bold" mb={3} textAlign="center">
                          Character Name
                        </FormLabel>
                          <HStack width="100%" justifyContent="center">
                            <Input
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              size="lg"
                              height="60px"
                              fontSize="18px"
                              minW="300px"
                              textAlign="center"
                              borderColor="#88B04B"
                              bg="#fff"
                              _hover={{ borderColor: '#3498db', bg: '#E6F7FF' }}
                              _focus={{ borderColor: '#3498db', boxShadow: '0 0 0 3px #88B04B, 0 0 0 6px #3498db', bg: '#E6F7FF' }}
                            />
                            <IconButton
                              aria-label="Generate new name"
                              icon={<RepeatIcon />}
                              size="lg"
                              onClick={handleGenerateNewName}
                            colorScheme="brown"
                            variant="outline"
                            borderColor="#D9CBB5"
                            color="#6B4E3D"
                            _hover={{ bg: 'rgba(107, 78, 61, 0.1)' }}
                            />
                          </HStack>
                      </FormControl>
                      </Box>
                      </Box>

                      <Box textAlign="center" width="100%" mb={6}>
  <Box display="inline-block" minW="300px" maxW="700px" width="auto">
    <FormControl isRequired width="100%">
      <FormLabel 
        color="#6B4E3D" 
        fontSize="20px" 
        fontWeight="bold" 
        mb={3} 
        textAlign="center"
      >
        Description
      </FormLabel>
      
      <HStack width="100%" spacing={4} alignItems="flex-start" justifyContent="center">
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          size="lg"
          minH="140px"
          minW="300px"
          fontSize="15px"
          textAlign="center"
          borderColor="#88B04B"
          bg="#fff"
          flex="1"
          _hover={{ borderColor: '#3498db', bg: '#E6F7FF' }}
          _focus={{ borderColor: '#3498db', boxShadow: '0 0 0 3px #88B04B, 0 0 0 6px #3498db', bg: '#E6F7FF' }}
        />
        <Box flexShrink={0}>
          <IconButton
            aria-label="Generate description"
            icon={<RepeatIcon />}
            size="md"
            onClick={handleGenerateDescription}
            colorScheme="brown"
            variant="outline"
            borderColor="#D9CBB5"
            color="#6B4E3D"
            _hover={{ bg: 'rgba(107, 78, 61, 0.1)' }}
          />
        </Box>
      </HStack>
    </FormControl>
  </Box>
</Box>


                      <Box textAlign="center" width="100%" mb={6}>
                      <Box display="inline-block" minW="300px" maxW="400px" width="auto">
                      <FormControl isRequired width="100%">
                        <FormLabel color="#6B4E3D" fontSize="20px" fontWeight="bold" mb={3} textAlign="center">
                          Birth Location
                        </FormLabel>
                        <Select
                          name="birthLocation"
                          value={formData.birthLocation}
                          onChange={handleInputChange}
                          size="lg"
                          fontSize="18px"
                          height="56px"
                          placeholder="Select birth location"
                          borderColor="#88B04B"
                          bg="#fff"
                          marginX="auto"
                          display="block"
                          icon={<></>}
                          _hover={{ borderColor: '#3498db', bg: '#E6F7FF' }}
                          _focus={{ borderColor: '#3498db', boxShadow: '0 0 0 3px #88B04B, 0 0 0 6px #3498db', bg: '#E6F7FF' }}
                        >
                          {worldState.locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                          <option value="Other (Not Listed)">Other (Not Listed)</option>
                        </Select>
                      </FormControl>
                      </Box>
                      </Box>

                      <Box textAlign="center" width="100%" mb={6}>
                      <Box display="inline-block" minW="300px" maxW="400px" width="auto">

                      <FormControl isRequired width="100%">
                        <FormLabel color="#6B4E3D" fontSize="20px" fontWeight="bold" mb={3} textAlign="center">
                          Current Location
                        </FormLabel>
                        <Select
                          name="currentLocation"
                          value={formData.currentLocation}
                          onChange={handleInputChange}
                          size="lg"
                          fontSize="18px"
                          height="56px"
                          placeholder="Select current location"
                          borderColor="#88B04B"
                          bg="#fff"
                          marginX="auto"
                          display="block"
                          icon={<></>}
                          _hover={{ borderColor: '#3498db', bg: '#E6F7FF' }}
                          _focus={{ borderColor: '#3498db', boxShadow: '0 0 0 3px #88B04B, 0 0 0 6px #3498db', bg: '#E6F7FF' }}
                        >
                          {worldState.locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                          ))}
                          <option value="Other (Not Listed)">Other (Not Listed)</option>
                        </Select>
                      </FormControl>
                      </Box>
                      </Box>
                      <Box textAlign="center" width="100%" mb={6}>
  <Box display="inline-block" minW="300px" maxW="400px" width="auto"></Box>
                      <Heading 
                        size="xl" 
                        color="#4B342A" 
                        mb={8}
                        pb={3}
                        borderBottom="3px solid"
                        borderColor="#D9CBB5"
                        textAlign="center"
                      >
                        Affiliations
                      </Heading>
                      </Box>

                    </VStack>
                  </Box>

                  {/* Dynamic form fields for selected group characteristics */}
                  {worldState.selectedGroups.map(group => {
                    // Skip these specific groups as they're handled by affiliations
                    if (group.includes('noble-houses') || 
                        group.includes('knight-orders') || 
                        group.includes('secret-cults') || 
                        group.includes('mage-circles') ||
                        group.includes('merchant-guilds') ||
                        group.includes('religions') ||
                        group.includes('guilds')) {
                      return null;
                    }
                    
                    // Format the group name for display
                    const formattedGroupName = group
                      .replace(/^high-fantasy-/, '')
                      .replace(/^low-fantasy-/, '')
                      .replace(/^historical-/, '')
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
                    
                    // Only show groups that have characteristics
                    if (!worldState.characteristics[group] || worldState.characteristics[group].length === 0) {
                      return null;
                    }
                    
                    return (
                     
                      <Box key={group} textAlign="center" width="100%" mb={6}>
                        <Box display="inline-block" minW="300px" maxW="400px" width="auto">
                          <FormControl width="100%">
                            <FormLabel color="#6B4E3D" fontSize="20px" fontWeight="bold" mb={3} textAlign="center">
                              {formattedGroupName}
                            </FormLabel>
                            <Select
                              value={formData.relationships[formattedGroupName]?.[0] || ''}
                              onChange={(e) => handleRelationshipChange(formattedGroupName, [e.target.value])}
                              size="lg"
                              fontSize="18px"
                              height="56px"
                              placeholder={`Select ${formattedGroupName.toLowerCase()}`}
                              borderColor="#88B04B"
                              bg="#fff"
                              marginX="auto"
                              display="block"
                              _hover={{ borderColor: '#3498db', bg: '#E6F7FF' }}
                              _focus={{ borderColor: '#3498db', boxShadow: '0 0 0 3px #88B04B, 0 0 0 6px #3498db', bg: '#E6F7FF' }}
                              icon={<></>}
                            >
                              <option value="">None</option>
                              {worldState.characteristics[group].map((item) => (
                                <option key={item.name} value={item.name}>{item.name}</option>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Box>
                    );
                  })}

                 

                  <Box pt={8} display="flex" justifyContent="center" paddingTop="30px" paddingBottom="30px">
                    <Button
                      type="submit"
                      colorScheme="green"
                      size="60px"
                      minW="300px"
                      textColor="white"
                      px={12}
                      py={8}
                      fontSize="22px"
                      isLoading={isSubmitting}
                      loadingText="Creating..."
                      bg="#6B4E3D"
                      _hover={{ 
                        bg: '#6B8B3D',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(136, 176, 75, 0.3)'
                      }}
                      _active={{ 
                        bg: '#597A2F',
                        transform: 'translateY(0)'
                      }}
                      transition="all 0.2s"
                    >
                      Create Character
                    </Button>
                  </Box>
                </VStack>
              </form>
            </VStack>
          </Box>

          {previewDescription && !expandedPreview && (
            <Box
              mt={12}
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="#D9CBB5"
              bg="#F5F5F5"
              width="100%"
              mx="auto"
              boxShadow="sm"
            >
              <Heading 
                size="xl" 
                color="#4B342A" 
                mb={6}
                textAlign="center"
                fontFamily="'Cinzel', serif"
              >
                Description
              </Heading>
              <Box
                width="100%"
                bg="#F5F5F5"
                p={8}
                borderRadius="md"
              >
                {formatParagraphs(previewDescription)}
              </Box>
              <Box mt={6} display="flex" justifyContent="center" gap={6}>
                <Button
                  colorScheme="green"
                  size="lg"
                  px={8}
                  py={6}
                  fontWeight="bold"
                  fontSize="xl"
                  borderRadius="lg"
                  onClick={handleAcceptDescription}
                  isLoading={isExpanding}
                >
                  Accept and Expand
                </Button>
                <Button
                  colorScheme="red"
                  size="lg"
                  px={8}
                  py={6}
                  fontWeight="bold"
                  fontSize="xl"
                  borderRadius="lg"
                  onClick={handleRefuseDescription}
                  disabled={isExpanding}
                >
                  Refuse
                </Button>
              </Box>
            </Box>
          )}
          {expandedPreview && (
            <Box
              mt={12}
              p={6}
              borderRadius="xl"
              borderWidth="1px"
              borderColor="#D9CBB5"
              bg="#F5F5F5"
              width="100%"
              mx="auto"
              boxShadow="sm"
            >
              <Heading 
                size="xl" 
                color="#4B342A" 
                mb={6}
                textAlign="center"
                fontFamily="'Cinzel', serif"
              >
                Full Description
              </Heading>
              <Box
                width="100%"
                bg="#F5F5F5"
                p={8}
                borderRadius="md"
              >
                {formatParagraphs(expandedPreview)}
              </Box>
              <Box mt={6} display="flex" justifyContent="center" gap={6}>
                <Button
                  colorScheme="green"
                  size="lg"
                  px={8}
                  py={6}
                  fontWeight="bold"
                  fontSize="xl"
                  borderRadius="lg"
                  onClick={handleAcceptExpanded}
                  isLoading={isSubmitting}
                >
                  Accept
                </Button>
                <Button
                  colorScheme="red"
                  size="lg"
                  px={8}
                  py={6}
                  fontWeight="bold"
                  fontSize="xl"
                  borderRadius="lg"
                  onClick={handleRefuseExpanded}
                  disabled={isSubmitting}
                >
                  Refuse
                </Button>
              </Box>
            </Box>
          )}
        </Container>

        <WorldSidebar 
          worldData={{
            ...worldState,
            characters: worldState.characters.map((c) => c.name),
          } as any}
          onEntityClick={(type) => {
            if (type === 'character') {
              // We're already on the character page, so no need to navigate
              return;
            } else if (type === 'location') {
              navigate('/create-location', {
                state: {
                  worldData: worldState
                }
              });
            } else {
              // Handle other entity types (characteristics)
              navigate(`/create/${type}`, {
                state: {
                  worldData: worldState
                }
              });
            }
          }}
        />
      </Box>
    </Box>
  );
}; 