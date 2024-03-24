import { Box, Flex, Text, Image, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import defaultImage from '../../static/defaultMeal.svg'
import DayMealTab from './DayMealTab';
import DayMealSidePopup from './DayMealSidePopup';
import CalendarViewDay from './CalendarViewDay';

export default function DayView({ meals, targetDate }){
  const [selectedMeal, setSelectedMeal] = useState(null);

    useEffect(()=> {
        setSelectedMeal(null)
    },[targetDate])

  return (
    <>
        <CalendarViewDay selectedMeal = {selectedMeal} 
            setSelectedMeal = {setSelectedMeal}  meals = {meals}
        />
    </>
  )



  return (
    <Flex height = '100%' bg = ''>
      {/* Left-Side Calendar */}
      <Box w="50%" p="4">
        {meals.map((meal) => (
          <Box key={meal.id} /*onMouseEnter={() => setSelectedMeal(meal)}*/ p="2" _hover={{ bg: 'gray.100' }}>
            <DayMealTab meal = {meal} onSelect = {()=>{setSelectedMeal(meal)}}/>
          </Box>
        ))}
      </Box>
      <DayMealSidePopup setSelectedMeal = {setSelectedMeal} selectedMeal = {selectedMeal}/>

    </Flex>
  ) }