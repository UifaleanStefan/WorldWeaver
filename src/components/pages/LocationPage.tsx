import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, VStack, Image, Button, Flex, Divider, Spacer, HStack, IconButton, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Navigation } from '../Navigation';
import { useWorld, WorldData } from '../../contexts/WorldContext';

export const LocationPage: React.FC = () => {
  const { locationName } = useParams<{ locationName: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { worldData, updateWorldData } = useWorld();
  const [isDeleting, setIsDeleting] = useState(false);

  // Get location description from world data
  const locationDescription = locationName 
    ? worldData.locationDescriptions?.[locationName] || ""
    : "";

  // Generate a placeholder image URL based on the location name
  const imageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(locationName || 'landscape')}`;

  const handleDelete = async () => {
    if (!locationName) return;
    
    setIsDeleting(true);
    try {
      const { [locationName]: deletedDescription, ...remainingDescriptions } = worldData.locationDescriptions || {};
      
      // Create updated world data
      const updatedData: WorldData = {
        ...worldData,
        locations: worldData.locations.filter(loc => loc !== locationName),
        locationDescriptions: remainingDescriptions
      };
      
      // Update context
      await updateWorldData(updatedData);
      
      toast({
        title: "Location deleted",
        description: `${locationName} has been removed from your world.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Navigate back to the world overview
      navigate('/world-overview');
    } catch (error) {
      toast({
        title: "Error deleting location",
        description: "An error occurred while deleting the location.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    navigate('/create-location', {
      state: {
        locationName: locationName,
        locationDescription: locationDescription,
        worldData: worldData,
        isEditing: true
      }
    });
  };

  return (
    <Box bg="#F7F1E5" minH="100vh">
      <Navigation />
      <Box maxW="1200px" mx="auto" p={5}>
        <HStack mb={6}>
          <Button 
            leftIcon={<ArrowBackIcon />} 
            onClick={() => navigate('/world-overview')}
            colorScheme="orange"
            variant="outline"
          >
            Back to World
          </Button>
          <Spacer />
          <Button
            leftIcon={<EditIcon />}
            onClick={handleEdit}
            colorScheme="blue"
            mr={2}
          >
            Edit
          </Button>
          <IconButton
            aria-label="Delete location"
            icon={<DeleteIcon />}
            onClick={handleDelete}
            colorScheme="red"
            isLoading={isDeleting}
          />
        </HStack>

        <Box 
          bg="white" 
          borderRadius="lg" 
          overflow="hidden" 
          boxShadow="xl"
          mb={6}
        >
          <Image 
            src={imageUrl} 
            alt={locationName} 
            w="100%" 
            h="400px" 
            objectFit="cover" 
          />
          <Box p={6}>
            <Heading size="2xl" mb={4} color="#4B342A">
              {locationName}
            </Heading>
            <Divider mb={6} />
            <Text fontSize="xl" lineHeight="tall">
              {locationDescription}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}; 