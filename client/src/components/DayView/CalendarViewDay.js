import { Box, VStack, Text } from '@chakra-ui/react';
import DayMealTab from './DayMealTab';
import { useEffect, useRef, useState } from 'react';
import DayMealSidePopup from './DayMealSidePopup';

export default function CalendarViewDay ({selectedMeal, setSelectedMeal, meals }) {

    

  const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => `${Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`);

    const scrollToTime = "07:00";
    const scrollToPosition = (parseInt(scrollToTime.split(':')[0]) * 2 + (parseInt(scrollToTime.split(':')[1]) / 30)) * 50; // 50px height for each 30-minute slot

    const scrollContainerRef = useRef(null)

    useEffect(()=>{
        if (scrollContainerRef.current)
            scrollContainerRef.current.scrollTop = scrollToPosition
    },[])

  return (
    <Box ref = {scrollContainerRef} overflowY="auto" h="80%" position="relative">
      {/* displays the calendar lines*/}
      <VStack spacing="0" width = '100%' position="absolute">
        {timeSlots.map((time, index) => (
          <Box key={index} h="50px" w="100%"  borderBottom="1px" borderColor = 'teal' >
            <Text color = 'teal' fontSize="sm">{time}</Text>
          </Box>
        ))}
      </VStack>
      {meals.map((meal, index) => (
        <DayMealTab setSelectedMeal = {setSelectedMeal} 
        isSelected = {selectedMeal && selectedMeal.logged_at === meal.logged_at} meal = {meal} index = {index}/>
      ))}
      <DayMealSidePopup setSelectedMeal = {setSelectedMeal} selectedMeal = {selectedMeal}/>
    </Box>

  );
};

