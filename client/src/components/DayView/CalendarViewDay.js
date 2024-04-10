import { Box, VStack, Text } from '@chakra-ui/react';
import DayMealTab from './DayMealTab';
import { useEffect, useRef, useState } from 'react';
import DayMealSidePopup from './DayMealSidePopup';
import useMealHandling from '../../custom hooks/useMealHandling';

export default function CalendarViewDay ({selectedGroup, setSelectedGroup, meals }) {

  const {mealGroupings}= useMealHandling(meals)

  const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => (i % 24 === 0 || i % 24 === 1) ? `${12}:${i % 2 === 0 ? '00' : '30'}${i / 24 < 1 ? 'AM' : 'PM'}` : `${Math.floor(i / 2) % 12}:${i % 2 === 0 ? '00' : '30'}${i / 24 < 1 ? 'AM' : 'PM'}`);

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
      {mealGroupings.map((mealGroup, index) => (
        <DayMealTab group = {mealGroup} 
        isSelected = {selectedGroup && selectedGroup.meals[0].logged_at === mealGroup.meals[0].logged_at} setSelectedGroup={setSelectedGroup} index = {index}/>
      ))}
      <DayMealSidePopup setSelectedGroup = {setSelectedGroup} selectedGroup = {selectedGroup} />
    </Box>

  );
};

