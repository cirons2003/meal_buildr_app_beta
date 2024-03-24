import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

import defaultMeal from '../static/defaultMeal.svg'

export default function DayCard({ rangeType, targetDate, meals }) {
  // Sample meal data for demonstration
  const sampleMeals = [
    { id: 1, time: '8:00 AM', description: 'Breakfast'},
    { id: 2, time: '12:00 PM', description: 'Lunch', imageUrl: 'lunch.jpg' },
    // Add more meals as needed
  ];

  if (rangeType === 0) { // Day view
    return (
      <Box border="1px" borderColor="gray.200" p="4" maxW="lg">
        {sampleMeals.map(meal => (
          <Flex key={meal.id} mb="4" align="center">
            <Image src={meal.imageUrl ? meal.imageUrl : defaultMeal} alt={meal.description} boxSize="100px" mr="4" />
            <Box>
              <Text fontWeight="bold">{meal.time}</Text>
              <Text>{meal.description}</Text>
            </Box>
          </Flex>
        ))}
      </Box>
    );
  }

  if (rangeType === 1) { // Week view
    return (
      <Box border="1px" borderColor="gray.200" p="4" maxW="md">
        <VStack spacing="2">
          {sampleMeals.map(meal => (
            <Text key={meal.id}>{meal.time} - {meal.description}</Text>
          ))}
        </VStack>
      </Box>
    );
  }

  if (rangeType === 2) { // Month view
    return (
      <Box border="1px" borderColor="gray.200" p="4" maxW="sm">
        <Text>{sampleMeals.length} meals</Text>
      </Box>
    );
  }
}
