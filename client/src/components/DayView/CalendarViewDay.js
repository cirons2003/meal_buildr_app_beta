import { Box, VStack, Text, useUpdateEffect } from '@chakra-ui/react';
import DayMealTab from './DayMealTab';
import { useEffect, useRef, useState } from 'react';
import DayMealSidePopup from './DayMealSidePopup';
import useMealHandling from '../../custom hooks/useMealHandling'
import { useNavigate, useParams } from 'react-router-dom';

export default function CalendarViewDay ({selectedGroup, setSelectedGroup, meals, selectedMealId, targetDate }) {
  const {athleteName} = useParams()
  const {mealGroupings}= useMealHandling(meals)

  const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => (i % 24 === 0 || i % 24 === 1) ? `${12}:${i % 2 === 0 ? '00' : '30'}${i / 24 < 1 ? 'AM' : 'PM'}` : `${Math.floor(i / 2) % 12}:${i % 2 === 0 ? '00' : '30'}${i / 24 < 1 ? 'AM' : 'PM'}`);

  const scrollToTime = "07:00";
  const scrollToPosition = (parseInt(scrollToTime.split(':')[0]) * 2 + (parseInt(scrollToTime.split(':')[1]) / 30)) * 50; // 50px height for each 30-minute slot

  const scrollContainerRef = useRef(null)
  
  const [mealIndex, setMealIndex] = useState(0)

  const navigate = useNavigate()

  const getMealPosition = (loggedTime) => {   
      const loggedDate = new Date(loggedTime);
      const startOfDay = new Date(loggedDate).setHours(0, 0, 0, 0);
      const minutesSinceStartOfDay = (loggedDate - startOfDay) / (1000 * 60);
      return (minutesSinceStartOfDay / 30) * 50; // 50px height for each 30-minute slot
  };

  useEffect(()=>{
      if (scrollContainerRef.current)
          scrollContainerRef.current.scrollTop = scrollToPosition
  },[])

  //reset to unbiased calendar when mealIndex changes 
  useEffect(()=> {
    if (mealIndex) {
      navigate(`/athletePage/${athleteName}`)
    }
  }, [mealIndex])


  // jump to meal     
  useEffect(()=> {
      if (selectedMealId && mealGroupings) {
        
          mealGroupings.forEach((group)=> {
            for (let i = 0; i < group.meals.length; i++) {
              
              if (group.meals[i].meal_id - selectedMealId === 0) {
                setSelectedGroup(group)
                setMealIndex(i)
                
              }
            }})
          }
  }, [selectedMealId, mealGroupings])


  //scroll to opened meal group
  useEffect(()=>{
    if (selectedGroup)
      scrollContainerRef.current.scrollTop = getMealPosition(selectedGroup.meals[0].logged_at) - 100
  },[selectedGroup])

  useEffect(()=>{
    if (mealGroupings)
      scrollContainerRef.current.scrollTop = (mealGroupings.length > 0) ? Math.min(Math.max(0 ,getMealPosition(mealGroupings[0].meals[0].logged_at)-100), scrollToPosition) : scrollToPosition
  }, [mealGroupings, targetDate])

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
        <DayMealTab key = {index} group = {mealGroup} setMealIndex = {setMealIndex}
        isSelected = {selectedGroup && selectedGroup.meals[0].logged_at === mealGroup.meals[0].logged_at} setSelectedGroup={setSelectedGroup} index = {index}/>
      ))}
      <DayMealSidePopup getMealPosition={getMealPosition} setMealIndex = {setMealIndex} mealIndex = {mealIndex} setSelectedGroup = {setSelectedGroup} selectedGroup = {selectedGroup} />
    </Box>

  );
};

