import { Box, Flex, Text, Image, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import defaultImage from '../../static/defaultMeal.svg'
import DayMealTab from './DayMealTab';
import DayMealSidePopup from './DayMealSidePopup';
import CalendarViewDay from './CalendarViewDay';

export default function DayView({ meals, targetDate, selectedMealId }){
  const [selectedGroup, setSelectedGroup] = useState(null);

    useEffect(()=> {
        setSelectedGroup(null)
    },[targetDate])

    
    
  return (
    <>
        <CalendarViewDay selectedGroup = {selectedGroup} 
            setSelectedGroup = {setSelectedGroup}  meals = {meals} selectedMealId = {selectedMealId} targetDate={targetDate}
        />
    </>
  )

}
