import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Image, List, ListItem, ListIcon, Heading } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WorldStyle } from '../types';
import { BackgroundImages } from '../components/layout/BackgroundImages';
import { Navigation } from '../components/Navigation';

interface WorldData {
  worldName: string;
  selectedStyle: WorldStyle;
  characteristics: string[];
  selectedGroups: string[];
  description: string;
}

export const WorldWorkspace: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const worldData = location.state as WorldData;
  const { worldName, selectedStyle, characteristics, selectedGroups, description } = worldData;

  const handleEntityClick = (entityType: string) => {
    navigate(`/create-${entityType}`, { state: { worldData } });
  };

  return (
    <Box minH="100vh" bg="#FFFFFF" display="flex">
      {/* Left Navigation */}
      <Navigation />

      {/* Main Content */}
      <Box flex="1" display="flex" flexDirection="column">
        {/* Top Bar */}
        <Box 
          bg="#88B04B" 
          p={0} 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center"
          borderBottom="4px solid #4B342A"
        >
          <Heading color="white" size="lg">{worldName}</Heading>
        </Box>

        {/* Main Content Area with Right Sidebar */}
        <Box display="flex" flex="1">
          {/* Main Content */}
          <Box flex="1" p={8}>
            <BackgroundImages style={selectedStyle} />
            
            {/* Wiki Overview */}
            <Box 
              bg="white" 
              p={8} 
              borderRadius="xl" 
              boxShadow="xl"
              borderWidth="1px"
              borderColor="#D9CBB5"
            >
              <Heading size="xl" mb={6} color="#4B342A">World Overview</Heading>
              <Text fontSize="xl" mb={4}>
                Welcome to your world building workspace. Here you can track and manage all aspects of your world.
              </Text>
              
              {/* Entity Tracking Section */}
              <VStack spacing={6} align="stretch" mt={8}>
                <Heading size="lg" color="#4B342A">Created Entities</Heading>
                <List spacing={3}>
                  <ListItem>
                    <HStack>
                      <ListIcon color="#88B04B" />
                      <Text fontSize="lg">Characters (0)</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <ListIcon color="#88B04B" />
                      <Text fontSize="lg">Locations (0)</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <ListIcon color="#88B04B" />
                      <Text fontSize="lg">Items (0)</Text>
                    </HStack>
                  </ListItem>
                  <ListItem>
                    <HStack>
                      <ListIcon color="#88B04B" />
                      <Text fontSize="lg">Events (0)</Text>
                    </HStack>
                  </ListItem>
                </List>
              </VStack>
            </Box>
          </Box>

          {/* Right Sidebar */}
          <Box
            width="300px"
            bg="#4B342A"
            color="white"
            p={4}
            display="flex"
            flexDirection="column"
            gap={4}
          >
            {/* World Image */}
            <Box>
              <Image 
                src={`/${selectedStyle.toLowerCase()}.png`}
                alt={`${selectedStyle} style preview`}
                borderRadius="lg"
                boxShadow="md"
                width="100%"
              />
            </Box>

            {/* Characteristics */}
            <Box>
              <Heading size="md" color="#88B04B" mb={2}>
                Characteristics
              </Heading>
              <List spacing={2}>
                {characteristics.map((char, index) => (
                  <ListItem key={index}>
                    <Text fontSize="lg">• {char}</Text>
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Locations */}
            <Box>
              <Heading size="md" color="#88B04B" mb={2}>
                Locations
              </Heading>
              <Text 
                fontSize="lg"
                cursor="pointer"
                _hover={{ color: '#88B04B' }}
                onClick={() => handleEntityClick('location')}
              >
                0 created
              </Text>
            </Box>

            {/* Characters */}
            <Box>
              <Heading size="md" color="#88B04B" mb={2}>
                Characters
              </Heading>
              <Text 
                fontSize="lg"
                cursor="pointer"
                _hover={{ color: '#88B04B' }}
                onClick={() => handleEntityClick('character')}
              >
                0 created
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WorldWorkspace; 