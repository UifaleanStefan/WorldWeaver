import React from 'react';
import { Box, VStack, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <Box
      w="250px"
      h="100vh"
      bg="gray.800"
      color="white"
      p={4}
      position="fixed"
      left={0}
      top={0}
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Navigation
        </Text>
        <Link as={RouterLink} to="/" color="white" _hover={{ color: 'blue.300' }}>
          Home
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar; 