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
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  HStack,
  Center,
  Tooltip
} from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { Navigation } from '../Navigation';
import { WorldSidebar } from '../../components/WorldSidebar';
import { worldStructures } from '../../data/worldStructures';
import { WorldStyle } from '../../types';
import { getRandomLocationName } from '../../utils/nameGenerator';
import { getRandomLocationDescription } from '../../utils/descriptionGenerator';
import { MdAutorenew } from 'react-icons/md';
import { useWorld, WorldData } from '../../contexts/WorldContext';
import { ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface LocationFormData {
  name: string;
  description: string;
  relationships: {
    [key: string]: string[];
  };
}

export const CreateLocationPage: React.FC = () => {
  const [locationName, setLocationName] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { worldData: contextWorldData, updateWorldData } = useWorld();
  
  // Check if we're editing an existing location
  const isEditing = location.state?.isEditing || false;
  
  // Use navigation state if available, otherwise fallback to context
  const worldData = (location.state && location.state.worldData) || contextWorldData;
  
  useEffect(() => {
    // If editing, populate the form with existing data
    if (location.state?.locationName && location.state?.locationDescription) {
      setLocationName(location.state.locationName);
      setLocationDescription(location.state.locationDescription);
    } else {
      // Otherwise set random name and description
      setLocationName(getRandomLocationName());
      if (worldData?.style) {
        setLocationDescription(getRandomLocationDescription(worldData.style));
      }
    }
  }, [location.state, worldData?.style]);

  const [previewDescription, setPreviewDescription] = useState<string | null>(null);
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName.trim()) {
      toast({
        title: "Location name required",
        description: "Please provide a name for your location.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsSubmitting(true);
    try {
      // Get the first 5 sentences of the world description
      const worldDesc = worldData.description || '';
      const first5 = worldDesc.match(/(?:[^.!?]*[.!?]){1,5}/)?.[0] || worldDesc;
      // Prompt for the AI
      const prompt = `Create a location named ${locationName} in the world of ${worldData.name}.

Requirements:
1. EXACTLY 150 words maximum - this is a strict requirement
2. Format with these exact sections:
    **${locationName}**

  **Nickname(no content, just the nickname in "" and italics)**

   **Culture**
   [Content]

   **History**
   [Content]

   **Importance**
   [Content]

3. Rich in detail and natural within the world lore
4. Well-structured narrative
5. No meta-text, word counts, or labels in the output
6. Bold the section titles
7. Dont mention the word count in the output. DO NOT INCLUDE WORD COUNTS OR NOTES.
8. DO NOT INCLUDE ANY NOTES OR LABELS IN THE OUTPUT

Count words carefully and revise until you hit exactly 150 words or less. Only output the final version.`;
      // PLACEHOLDER: Replace with your own OpenAI API key
      const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
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

      console.log('Initial description prompt:', prompt);
      console.log('Initial description raw response:', response.data.choices[0].message.content);
      let aiDescription = response.data.choices[0].message.content;
      aiDescription = aiDescription.replace(/(^|\n|\r)\s*(Location Description:|Description:)?\s*/gi, '');
      
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
      setLocationDescription('');
    } catch (error) {
      toast({
        title: "Error generating location description",
        description: "An error occurred while generating your location description.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAcceptDescription = async () => {
    setIsExpanding(true);
    try {
      // Prompt for expanded description
      const worldDesc = worldData.description || '';
      const expandedPrompt = `Given this world description: ${worldDesc}
And this location description: ${previewDescription} 

Requirements:
1. Format with these exact sections:
   **${locationName}**

   **Nickname(no content, just the nickname in "" and italics)**

   **Culture**
   [Expanded Content - 150-200 words]

   **History**
   [Expanded Content - 150-200 words]

   **Importance**
   [Expanded Content - 150-200 words]

2. Rich in detail and natural within the world lore
3. Well-structured narrative
4. EXACTLY 400-500 words - this is a strict requirement
5. No meta-text, word counts, or labels in the output. 

Count words carefully and revise until you hit between 400-500 words. Only output the final version.
8. DO NOT INCLUDE ANY NOTES OR LABELS IN THE OUTPUT`;

      // PLACEHOLDER: Replace with your own OpenAI API key
      const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo-16k',
          messages: [{
            role: 'system',
            content: 'You are a creative writer specializing in wiki-style descriptions. Your task is to generate descriptions with STRICT word count limits. Format all section titles with ** markers. Do not include any meta information, notes, or labels in the output. Count words carefully and revise until you hit the exact word count.'
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

      console.log('Expanded description prompt:', expandedPrompt);
      console.log('Expanded description raw response:', response.data.choices[0].message.content);
      let aiExpanded = response.data.choices[0].message.content;
      aiExpanded = aiExpanded.replace(/(^|\n|\r)\s*(Expanded Description:|Expanded Location:|Expansion:|Description:)?\s*/gi, '');
      
      // Check if the response seems complete
      if (aiExpanded.split(/\s+/).length < 500) {
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
    } catch (error) {
      toast({
        title: "Error expanding location description",
        description: "An error occurred while expanding your location description.",
        status: "error",
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
      let updatedLocations = [...worldData.locations];
      let updatedDescriptions = { ...(worldData.locationDescriptions || {}) };
      if (isEditing && location.state?.locationName !== locationName) {
        updatedLocations = updatedLocations.filter(loc => loc !== location.state.locationName);
        const { [location.state.locationName]: _, ...remainingDescriptions } = updatedDescriptions;
        updatedDescriptions = remainingDescriptions;
      }
      if (!isEditing || location.state?.locationName !== locationName) {
        if (!updatedLocations.includes(locationName)) {
          updatedLocations.push(locationName);
        }
      }
      updatedDescriptions[locationName] = expandedPreview || '';
      const updatedData: WorldData = {
        ...worldData,
        locations: updatedLocations,
        locationDescriptions: updatedDescriptions
      };
      await updateWorldData(updatedData);
      toast({
        title: isEditing ? "Location updated" : "Location created",
        description: `${locationName} has been ${isEditing ? 'updated' : 'added to your world'}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/world-overview');
    } catch (error) {
      toast({
        title: "Error saving location",
        description: "An error occurred while saving your location.",
        status: "error",
        duration: 5000,
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

  // Helper to format paragraphs
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
                  fontSize="18px"
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
    }
    return WorldStyle.MedievalFantasy; // Default to medieval fantasy
  };

  const [worldState, setWorldState] = useState<WorldData>(() => {
    const locationState = location.state as { worldData: WorldData };
    
    // If we have state from navigation, use it
    if (locationState?.worldData) {
      const worldData = locationState.worldData;
      // If style is undefined, determine it from the image path
      if (!worldData.style && worldData.image) {
        worldData.style = determineWorldStyle(worldData.image);
      }
      // Ensure locationDescriptions exists
      if (!worldData.locationDescriptions) {
        worldData.locationDescriptions = {};
      }
      // Ensure characteristicDescriptions exists
      if (!worldData.characteristicDescriptions) {
        worldData.characteristicDescriptions = {};
      }
      return worldData;
    }
    
    // Create default state
    const defaultState = {
      name: '',
      description: '',
      image: '/medieval-fantasy.png', // Default image
      selectedGroups: [],
      locations: [],
      characters: [],
      locationDescriptions: {},
      characteristicDescriptions: {}, // Add characteristicDescriptions to match the updated WorldData interface
      style: WorldStyle.MedievalFantasy, // Default style
      characteristics: {} // Add this to match the WorldData interface
    };
    
    return defaultState;
  });

  const [formData, setFormData] = useState<LocationFormData>({
    name: getRandomLocationName(),
    description: '',
    relationships: {},
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const randomName = getRandomLocationName();
    setLocationName(randomName);
  };

  const handleGenerateDescription = () => {
    const worldStyle = worldState?.style;
    if (worldStyle) {
      const newDescription = getRandomLocationDescription(worldStyle);
      setLocationDescription(newDescription);
    }
  };

  const getStyleSpecificRelationships = () => {
    const style = worldState.style;
    const selectedGroups = worldState.selectedGroups;
    const relationships: { [key: string]: string[] } = {};

    switch (style) {
      case WorldStyle.MedievalFantasy:
        if (selectedGroups.includes('noble-houses')) {
          relationships['Controlled by'] = ['Noble Houses / Dynasties'];
        }
        if (selectedGroups.includes('kingdoms')) {
          relationships['Belongs to'] = ['Kingdoms'];
        }
        break;

      case WorldStyle.Steampunk:
        if (selectedGroups.includes('industrial-corps')) {
          relationships['Controlled by'] = ['Industrial Corporations'];
        }
        if (selectedGroups.includes('steam-militias')) {
          relationships['Protected by'] = ['Steam Militias'];
        }
        if (selectedGroups.includes('scientific-institutes')) {
          relationships['Influenced by'] = ['Scientific Institutes'];
        }
        if (selectedGroups.includes('secret-orders')) {
          relationships['Influenced by'] = [...(relationships['Influenced by'] || []), 'Secret Orders'];
        }
        break;

      case WorldStyle.PostApocalyptic:
        if (selectedGroups.includes('warlord-territories')) {
          relationships['Controlled by'] = ['Warlord Territories'];
        }
        if (selectedGroups.includes('remnant-govts')) {
          relationships['Belongs to'] = ['Remnant Governments'];
        }
        break;

      case WorldStyle.HistoricalFiction:
        if (selectedGroups.includes('nations')) {
          relationships['Belongs to'] = ['Nations / States / Empires'];
        }
        if (selectedGroups.includes('religious-orders')) {
          relationships['Local Religion'] = ['Religious Orders'];
        }
        if (selectedGroups.includes('governorships')) {
          relationships['Governed as'] = ['Governorships / Provinces'];
        }
        break;

      case WorldStyle.ModernSupernatural:
        if (selectedGroups.includes('secret-societies')) {
          relationships['Influenced by'] = ['Secret Societies'];
        }
        if (selectedGroups.includes('corporate-fronts')) {
          relationships['Tied to'] = ['Corporate Fronts'];
        }
        if (selectedGroups.includes('govt-agencies')) {
          relationships['Tied to'] = [...(relationships['Tied to'] || []), 'Government Agencies'];
        }
        break;

      case WorldStyle.SciFi:
        if (selectedGroups.includes('federations')) {
          relationships['Governed by'] = ['Federations / Planetary Alliances'];
        }
        if (selectedGroups.includes('megacorps')) {
          relationships['Controlled by'] = ['Megacorporations'];
        }
        if (selectedGroups.includes('military-factions')) {
          relationships['Base for'] = ['Military Factions'];
        }
        if (selectedGroups.includes('ai-collectives')) {
          relationships['Base for'] = [...(relationships['Base for'] || []), 'AI Collectives'];
        }
        if (selectedGroups.includes('space-guilds')) {
          relationships['Influenced by'] = ['Space Guilds'];
        }
        if (selectedGroups.includes('terraforming-syndicates')) {
          relationships['Influenced by'] = [...(relationships['Influenced by'] || []), 'Terraforming Syndicates'];
        }
        break;

      case WorldStyle.Mythological:
        if (selectedGroups.includes('pantheons')) {
          relationships['Ruled by'] = ['Pantheons / Divine Orders'];
        }
        if (selectedGroups.includes('mystic-temples')) {
          relationships['Contains'] = ['Mystic Temples'];
        }
        if (selectedGroups.includes('oracle-circles')) {
          relationships['Contains'] = [...(relationships['Contains'] || []), 'Oracles / Seer Circles'];
        }
        if (selectedGroups.includes('sacred-beasts')) {
          relationships['Dwelling of'] = ['Sacred Beasts / Guardian Spirits'];
        }
        break;

      case WorldStyle.Cyberpunk:
        if (selectedGroups.includes('megacorps')) {
          relationships['Controlled by'] = ['Mega-Corporations'];
        }
        if (selectedGroups.includes('syndicates')) {
          relationships['Claimed by'] = ['Syndicates / Gangs'];
        }
        if (selectedGroups.includes('urban-sectors')) {
          relationships['Designated as'] = ['Urban Sectors / Zones'];
        }
        break;

      case WorldStyle.LowFantasy:
        if (selectedGroups.includes('noble-houses')) {
          relationships['Governed by'] = ['Noble Houses / Dynasties'];
        }
        if (selectedGroups.includes('militias')) {
          relationships['Protected by'] = ['Militias / City Guards'];
        }
        if (selectedGroups.includes('religions')) {
          relationships['Aligned with'] = ['Religions / Local Sects'];
        }
        if (selectedGroups.includes('city-states')) {
          relationships['Exists in'] = ['Towns / City-States'];
        }
        break;

      case WorldStyle.HighFantasy:
        if (selectedGroups.includes('noble-houses')) {
          relationships['Ruled by'] = ['Noble Houses / Great Clans'];
        }
        if (selectedGroups.includes('magical-orders')) {
          relationships['Protected by'] = ['Magical Orders / Arcane Circles'];
        }
        if (selectedGroups.includes('kingdoms')) {
          relationships['Belongs to'] = ['Kingdoms / Empires'];
        }
        if (selectedGroups.includes('religions')) {
          relationships['Devoted to'] = ['Sacred Religions / Pantheons'];
        }
        break;

      default:
        break;
    }

    return relationships;
  };

  const styleRelationships = getStyleSpecificRelationships();

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
          overflowY="visible"
          bg="#F5F5F5"
        >
          <Box
            p={6}
            borderRadius="xl"
            boxShadow="xl"
            borderWidth="1px"
            borderColor="#D9CBB5"
            minH="auto"
            bg="#F5F5F5"
          >
            <VStack spacing={8} align="stretch">
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

              {showSuccess && (
                <Alert status="success" borderRadius="15px">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                      Your location has been created successfully. Redirecting...
                    </AlertDescription>
                  </Box>
                </Alert>
              )}

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
                      Location Information
                    </Heading>
                    <VStack spacing={8} width="100%">
                      <FormControl isRequired width="100%">
                        <FormLabel color="#6B4E3D" fontSize="25px" fontWeight="bold" mb={3} textAlign="center" paddingTop="40px">
                          Location Name
                        </FormLabel>
                        <HStack width="100%" justifyContent="center" paddingTop="10px" >
                          <Input
                            name="name"
                            value={locationName}
                            onChange={(e) => setLocationName(e.target.value)}
                            size="lg"
                            height="60px"
                            fontSize="18px"
                            textAlign="center"
                            borderColor="#D9CBB5"
                            _hover={{ borderColor: '#88B04B' }}
                            _focus={{ borderColor: '#88B04B', boxShadow: '0 0 0 1px #88B04B' }}
                          />
                          <IconButton
                            aria-label="Generate random name"
                            icon={<RepeatIcon />}
                            onClick={handleGenerateNewName}
                            colorScheme="green"
                            size="lg"
                          />
                        </HStack>
                      </FormControl>

                      {/* Only show description input if previewDescription is null */}
                      {!previewDescription && (
                        <FormControl isRequired width="100%" paddingTop="40px">
                          <FormLabel color="#6B4E3D" fontSize="20px" fontWeight="bold" mb={3} textAlign="center">
                            Description
                          </FormLabel>
                          <HStack width="100%" alignItems="flex-start">
                            <Textarea
                              name="description"
                              value={locationDescription}
                              onChange={(e) => setLocationDescription(e.target.value)}
                              size="lg"
                              minH="120px"
                              minW="400"
                              fontSize="15px"
                              textAlign="center"
                              paddingTop="10px"
                              borderColor="#D9CBB5"
                              _hover={{ borderColor: '#88B04B' }}
                              _focus={{ borderColor: '#88B04B', boxShadow: '0 0 0 1px #88B04B' }}
                            />
                            <IconButton
                              aria-label="Generate random description"
                              icon={<RepeatIcon />}
                              onClick={handleGenerateDescription}
                              colorScheme="green"
                              size="lg"
                            />
                          </HStack>
                        </FormControl>
                      )}
                    </VStack>
                  </Box>

                  <Box pt={8} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      bg="#6B4E3D"
                      color="white"
                      size="lg"
                      px={12}
                      py={10}
                      fontSize="xl"
                      isLoading={isSubmitting}
                      loadingText="Saving..."
                      width="full"
                      height="70px"
                      boxShadow="lg"
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
                      disabled={!!previewDescription}
                    >
                      {isEditing ? 'Update Location' : 'Create Location'}
                    </Button>
                  </Box>
                </VStack>
              </form>
              {previewDescription && !expandedPreview && (
                <Box
                  mt={12}
                  p={8}
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
                    mb={8}
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
                  <Box mt={8} display="flex" justifyContent="center" gap={6}>
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
                  p={8}
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
                    mb={8}
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
                  <Box mt={8} display="flex" justifyContent="center" gap={6}>
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
            </VStack>
          </Box>
        </Container>

        <WorldSidebar 
          worldData={worldState}
          onEntityClick={(type) => {
            if (type === 'character') {
              navigate('/create/character', { 
                state: { 
                  worldData: worldState
                }
              });
            } else if (type === 'location') {
              // Don't navigate if we're already on the location page
              // But you could reload or reset the form if desired
              return;
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