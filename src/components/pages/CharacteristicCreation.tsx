import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Select,
  useToast,
  Heading,
  Text,
  Container,
  IconButton
} from '@chakra-ui/react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useWorld } from '../../contexts/WorldContext';
import { WorldSidebar } from '../WorldSidebar';
import { Navigation } from '../Navigation';
import { WorldStyle } from '../../types';
import { ArrowBackIcon, RepeatIcon } from '@chakra-ui/icons';
import { getRandomCharacteristicName } from '../../utils/randomCharacteristicName';
import axios from 'axios';


interface CharacteristicFormData {
  name: string;
  location: string;
  description: string;
}

interface WorldData {
  name: string;
  description: string;
  image: string;
  selectedGroups: string[];
  locations: string[];
  characters: string[];
  locationDescriptions?: Record<string, string>;
  style: WorldStyle;
  characteristics: Record<string, {
    name: string;
    location: string;
    description?: string;
  }[]>;
  characteristicDescriptions?: Record<string, string>;
}

export const CharacteristicCreation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { characteristicType } = useParams<{ characteristicType: string }>();
  const toast = useToast();
  const { worldData, updateWorldData } = useWorld();
  
  const [worldState, setWorldState] = useState<WorldData>(() => {
    const state = location.state as { worldData: WorldData };
    if (state?.worldData) {
      return state.worldData;
    }
    return {
      name: '',
      description: '',
      image: '',
      selectedGroups: [],
      locations: [],
      characters: [],
      locationDescriptions: {},
      style: WorldStyle.MedievalFantasy,
      characteristics: {},
      characteristicDescriptions: {}
    };
  });
  
  const [formData, setFormData] = useState<CharacteristicFormData>({
    name: '',
    location: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewDescription, setPreviewDescription] = useState<string | null>(null);
  const [expandedPreview, setExpandedPreview] = useState<string | null>(null);
  const [isExpanding, setIsExpanding] = useState(false);

  // Add useEffect to pre-fill form if editing
  useEffect(() => {
    if (location.state?.isEditing) {
      setFormData(prev => ({
        ...prev,
        name: location.state.characteristicName || '',
        description: location.state.characteristicDescription || '',
        location: location.state.location || '',
      }));
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!characteristicType) {
      toast({
        title: 'Error',
        description: 'Characteristic type is missing.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    if (!formData.name || !formData.location) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not found');
      }

      // Get location description
      const locationDesc = worldState.locationDescriptions?.[formData.location] || '';

      // Initial description generation
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo-16k',
        messages: [{
          role: 'system',
          content: `You are a creative writer specializing in wiki-style descriptions. Your task is to generate descriptions with STRICT word count limits.

Key Requirements:
1. EXACTLY 150 words maximum - this is a STRICT requirement
2. Count each word individually (contractions count as one word)
3. Do not include section titles in the word count
4. Format section titles with ** markers
5. Do not include any meta information or notes
6. Count words carefully and revise until exactly at or under 150 words
7. Only output the final version with no additional text

If you go over 150 words, you must revise and cut content until you are at or under the limit.
Double-check your word count before providing the response.`
        }, {
          role: 'user',
          content: `Given the following world context:
World Name: ${worldState.name}
World Description: ${worldState.description}

Location Information:
Name: ${formData.location}
Description: ${locationDesc}

Task: Create a wiki-style description for a ${characteristicType} named ${formData.name}.
Current Description: ${formData.description || "None provided"}

Requirements:
1. Format with these exact sections:
   **${formData.name}**
   **Nickname(no content, just the nickname in "" and italics)**

   **Culture**
   [Content]

   **History**
   [Content]

   **Importance**
   [Content]

2. Rich in detail and natural within the world lore
3. Well-structured narrative
4. EXACTLY 150 words or less (excluding section titles)
5. No meta-text, word counts, or labels in the output

Count words carefully and revise until you hit exactly 150 words or less. Only output the final version.`
        }],
        temperature: 0.7,
        max_tokens: 2000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Initial description response:', response.data);
      const generatedDescription = response.data.choices[0].message.content.trim();
      setPreviewDescription(generatedDescription);
      
    } catch (error: unknown) {
      console.error('Error:', error);
      let errorMessage = 'Failed to generate description.';
      
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        if (axios.isAxiosError(error) && error.response?.status === 429) {
        errorMessage = 'Too many requests to the AI service. Please try again later.';
        }
      }

      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
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
      const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not found');
      }

      // Get location description
      const locationDesc = worldState.locationDescriptions?.[formData.location] || '';

      // Generate expanded description
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo-16k',
        messages: [{
          role: 'system',
          content: `You are a creative writer specializing in wiki-style descriptions. Your task is to generate an EXPANDED description with STRICT word count limits.

Key Requirements:
1. EXACTLY 400-500 words - this is a STRICT requirement
2. Count each word individually (contractions count as one word)
3. Do not include section titles in the word count
4. Format section titles with ** markers
5. Do not include any meta information or notes
6. Count words carefully and revise until between 400-500 words
7. Only output the final version with no additional text
8. DO NOT INCLUDE ANY NOTES OR LABELS IN THE OUTPUT
If outside the 400-500 word range, you must revise until within range.
Double-check your word count before providing the response.
8. DO NOT INCLUDE ANY NOTES OR LABELS IN THE OUTPUT`

        }, {
          role: 'user',
          content: `Given this world context:
World Name: ${worldState.name}
World Description: ${worldState.description}

Location Information:
Name: ${formData.location}
Description: ${locationDesc}

Current ${characteristicType} Description: ${previewDescription}

Task: Create an expanded wiki-style description that elaborates on each section of the current description, providing rich detail and deeper world-building.

Requirements:
1. Format with these exact sections:
   **${formData.name}**
   **Nickname(no content, just the nickname in "" and italics)**

   **Culture**
   [Expanded Content]

   **History**
   [Expanded Content]

   **Importance**
   [Expanded Content]

2. Rich in detail and natural within the world lore
3. Well-structured narrative
4. EXACTLY between 400-500 words (excluding section titles)
5. No meta-text, word counts, or labels in the output
6. Must be a significant expansion of the initial description
7. DO NOT INCLUDE ANY NOTES OR LABELS IN THE OUTPUT

Count words carefully and revise until between 400-500 words. Only output the final version.`
        }],
        temperature: 0.7,
        max_tokens: 2000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Expanded description response:', response.data);
      const expandedDescription = response.data.choices[0].message.content.trim();
      
      // Check if the response seems complete
      if (expandedDescription.split(/\s+/).length < 500) {
        console.warn('Generated description may be incomplete:', expandedDescription);
        toast({
          title: 'Warning',
          description: 'The generated description might be shorter than expected. Would you like to try again?',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
      
      setExpandedPreview(expandedDescription);

    } catch (error: unknown) {
      let errorMessage = 'An error occurred while expanding your character description.';
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
      toast({
        title: 'Error expanding description',
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
      const type = characteristicType as string;
      const newCharacteristic = {
        name: formData.name,
        location: formData.location,
        description: expandedPreview,
      };

      const currentCharacteristics = worldState.characteristics[type] || [];
      
      const updatedWorldData = {
        ...worldState,
        selectedGroups: [...worldState.selectedGroups],
        locationDescriptions: worldState.locationDescriptions || {},
        characteristics: {
          ...worldState.characteristics,
          [type]: [...currentCharacteristics, newCharacteristic]
        },
        characteristicDescriptions: {
          ...worldState.characteristicDescriptions || {},
          [`${type}-${formData.name}`]: expandedPreview || ''
        }
      };
      
      await updateWorldData(updatedWorldData);
      
      toast({
        title: 'Characteristic created',
        description: `${formData.name} has been added to the world.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/world-overview', { 
        state: { worldData: updatedWorldData },
        replace: true 
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save characteristic. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefuseDescription = () => {
    setPreviewDescription(null);
    setExpandedPreview(null);
  };

  const handleRefuseExpanded = () => {
    setExpandedPreview(null);
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

  const formatCharacteristicType = (type: string) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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

              <form onSubmit={handleSubmit}>
                <VStack spacing={12} align="stretch">
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
                      {characteristicType ? formatCharacteristicType(characteristicType) : 'Characteristic'} Information
                    </Heading>

                    <VStack spacing={8} width="100%">
                      <FormControl isRequired>
                        <FormLabel color="#6B4E3D" fontSize="25px" fontWeight="bold" mb={3} textAlign="center" paddingTop="40px">
                          Name
                        </FormLabel>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            size="lg"
                            height="60px"
                            fontSize="18px"
                            minW="300px"
                            textAlign="center"
                            borderColor="#D9CBB5"
                            _hover={{ borderColor: '#BFA76A', color: '#2C1A0B' }}
                            _focus={{ borderColor: '#88B04B', boxShadow: '0 0 0 1px #88B04B' }}
                          />
                          {getRandomCharacteristicName(characteristicType || '') && (
                            <IconButton
                              aria-label="Generate random name"
                              icon={<RepeatIcon />}
                              type="button"
                              colorScheme="green"
                              size="lg"
                              ml={2}
                              onClick={() => {
                                const randomName = getRandomCharacteristicName(characteristicType || '');
                                if (randomName) setFormData(prev => ({ ...prev, name: randomName }));
                              }}
                              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
                            />
                          )}
                        </Box>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel color="#6B4E3D" fontSize="25px" fontWeight="bold" mb={3} textAlign="center" paddingTop="40px">
                          Location
                        </FormLabel>
                        <Select
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          size="lg"
                          fontSize="18px"
                          height="56px"
                          minW="300px"
                          placeholder={worldState.locations.length === 0 ? "No locations available. Create one first." : "Select location"}
                          borderColor="#D9CBB5"
                          icon={<></>}
                          _hover={{ borderColor: '#BFA76A', color: '#2C1A0B' }}
                          _focus={{ borderColor: '#88B04B', boxShadow: '0 0 0 1px #88B04B' }}
                          marginX="auto"
                          display="block"
                          isDisabled={worldState.locations.length === 0}
                          textAlign="center"
                        >
                          {worldState.locations.map((location) => (
                            <option key={location} value={location}>
                              {location}
                            </option>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel color="#6B4E3D" fontSize="25px" fontWeight="bold" mb={3} textAlign="center" paddingTop="40px">
                          Description (Optional)
                        </FormLabel>
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                          <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            size="lg"
                            minH="120px"
                            fontSize="18px"
                            minW="300px"
                            textAlign="center"
                            borderColor="#D9CBB5"
                            _hover={{ borderColor: '#BFA76A', color: '#2C1A0B' }}
                            _focus={{ borderColor: '#88B04B', boxShadow: '0 0 0 1px #88B04B' }}
                          />
                        </Box>
                      </FormControl>

                      <Box pt={8} display="flex" justifyContent="center">
                        <Button
                          type="submit"
                          bg="#6B4E3D"
                          color="white"
                          size="lg"
                          width="full"
                          px={12}
                          py={10}
                          fontSize="xl"
                          height="70px"
                          isLoading={isSubmitting}
                          loadingText="Creating..."
                          boxShadow="lg"
                          _hover={{
                            bg: '#BFA76A',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(136, 176, 75, 0.3)'
                          }}
                          _active={{
                            bg: '#597A2F',
                            transform: 'translateY(0)'
                          }}
                          transition="all 0.2s"
                        >
                          Create {characteristicType ? formatCharacteristicType(characteristicType) : 'Characteristic'}
                        </Button>
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </form>
            </VStack>
          </Box>

          {previewDescription && !expandedPreview && (
            <Box
              mt={8}
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
              mt={8}
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
          worldData={worldState}
          onEntityClick={(type) => {
            if (type === 'character') {
              navigate('/create/character', { 
                state: { 
                  worldData: worldState
                }
              });
            } else if (type === 'location') {
              navigate('/create-location', {
                state: {
                  worldData: worldState
                }
              });
            } else {
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