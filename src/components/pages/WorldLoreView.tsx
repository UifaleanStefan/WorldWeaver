import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, Container, VStack, useToast } from '@chakra-ui/react';
import { FaScroll, FaMagic } from 'react-icons/fa';
import { Navigation } from '../Navigation';
import { WorldSidebar } from '../WorldSidebar';
import { useWorld } from '../../contexts/WorldContext';
import axios from 'axios';

export const WorldLoreView: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { worldData: contextWorldData, updateWorldData } = useWorld();
  const worldData = (location.state && (location.state as any).worldData) || contextWorldData;
  const [isLoading, setIsLoading] = React.useState(false);
  const [lore, setLore] = React.useState(worldData?.description || '');
  const [previewLore, setPreviewLore] = React.useState<string | null>(null);

  // API key
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  if (!worldData) {
    return <div>World data not found.</div>;
  }

  const handleGenerateMoreLore = async () => {
    setIsLoading(true);
    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not found');
      }

      const prompt = `Expand on this lore, creating more details. Dont focus on only one aspect. Focus on general facts, not specific moments.\n\n${lore}`;
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 400,
          temperature: 0.8,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      let aiLore = response.data.choices[0].message.content;
      aiLore = aiLore.replace(/(^|\n|\r)\s*(Long Lore:|Expanded Lore:|Lore:|Continuation:|Continued Lore:)?\s*/gi, '');
      setPreviewLore(aiLore.trim());
    } catch (error: unknown) {
      let errorMessage = 'Failed to generate more lore. Please try again.';
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
      toast({
        title: 'AI Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptLore = () => {
    if (previewLore) {
      const newLore = lore + '\n\n' + previewLore;
      setLore(newLore);
      setPreviewLore(null);
      // Update worldData.description in context so it persists
      updateWorldData({ ...worldData, description: newLore });
    }
  };

  const handleRefuseLore = () => {
    setPreviewLore(null);
  };

  return (
    <Box minH="100vh" bg="#F7F1E5">
      <Navigation />
      <Box display="flex" flexDirection="row" justifyContent="center" alignItems="flex-start" maxW="1400px" mx="auto" px={2} paddingTop={80}>
        {/* Left Sidebar (empty for now, can add content if needed) */}
        <Box flexBasis="300px" flexShrink={0} />
        {/* Main Content */}
        <Box flex="1" maxW="900px" mx="auto" py={12}>
          <VStack align="start" spacing={8}>
            <Button onClick={() => navigate(-1)} variant="ghost" color="#4B342A" fontWeight="bold">
              ← Back
            </Button>
            <Box
              width="100%"
              bg="#F7F1E5"
              p={8}
              borderRadius="xl"
              boxShadow="lg"
              border="2px solid #C2B280"
              position="relative"
              style={{
                backgroundImage: 'url(/parchment-texture.png), linear-gradient(135deg, #F7F1E5 80%, #E9DFCC 100%)',
                backgroundBlendMode: 'multiply',
                animation: 'fadeIn 1s ease',
                overflow: 'hidden',
              }}
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
                {worldData.name} - World Lore
              </Heading>
              <Text fontSize="xl" color="#4B342A" lineHeight="tall" whiteSpace="pre-line">
                {lore}
                {previewLore && ("\n\n" + previewLore)}
              </Text>
              {previewLore && (
                <Box mt={4} display="flex" gap={4}>
                  <Button colorScheme="green" onClick={handleAcceptLore} fontWeight="bold">Accept</Button>
                  <Button colorScheme="red" onClick={handleRefuseLore} fontWeight="bold">Refuse</Button>
                </Box>
              )}
              <Button
                mt={8}
                leftIcon={<FaMagic />}
                bg="#BFA76A"
                color="#2C1A0B"
                size="lg"
                fontWeight="bold"
                fontSize="xl"
                px={8}
                py={6}
                borderRadius="lg"
                boxShadow="md"
                _hover={{ bg: '#A68A4D', color: '#fff', transform: 'scale(1.04)', boxShadow: 'lg' }}
                _active={{ bg: '#8C6B2F' }}
                transition="all 0.2s"
                onClick={handleGenerateMoreLore}
                isLoading={isLoading}
                loadingText="Generating..."
                spinnerPlacement="end"
                disabled={isLoading || !!previewLore}
              >
                Generate More Lore
              </Button>
            </Box>
          </VStack>
        </Box>
        {/* Right Sidebar */}
        <Box flexBasis="300px" flexShrink={0}>
          <WorldSidebar worldData={worldData} onEntityClick={() => {}} />
        </Box>
      </Box>
    </Box>
  );
};

export default WorldLoreView; 