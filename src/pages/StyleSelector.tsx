import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, SimpleGrid, Heading, Container } from '@chakra-ui/react';
import { Card } from '../components/Card';
import { BackgroundImages } from '../components/layout/BackgroundImages';
import { WorldStyle } from '../types';

export const StyleSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleStyleSelect = (style: WorldStyle) => {
    // Smooth scroll to top before navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Navigate after a short delay to allow smooth scrolling
    setTimeout(() => {
      navigate('/world-input', { 
        state: { selectedStyle: style } 
      });
    }, 500);
  };

  return (
    <Box
      minH="100vh"
      bg="#FFFFFF"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}
      mt="1px"
      position="relative"
      zIndex={0}
    >
      <BackgroundImages />
      {/* Rest of the component */}
    </Box>
  );
}; 