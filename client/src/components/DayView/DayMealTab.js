import { Box, Button, Text } from '@chakra-ui/react';

export default function DayMealTab({group, index, setSelectedGroup, isSelected, setMealIndex}) {

    const getMealPosition = (loggedTime) => {
        const loggedDate = new Date(loggedTime);
        const startOfDay = new Date(loggedDate).setHours(0, 0, 0, 0);
        const minutesSinceStartOfDay = (loggedDate - startOfDay) / (1000 * 60);
        return (minutesSinceStartOfDay / 30) * 50; // 50px height for each 30-minute slot
    };

    return (
        <Box as = {Button}
            key={index}
            position="absolute"
            left="0"
            top={`${getMealPosition(group.meals[0].logged_at)}px`}
            w="100%"
            p="2"
            bg= {isSelected ? 'teal' : 'lightblue'}
            border = '2px'
            borderRadius="md"
            borderColor = 'teal'
            onClick = {() => {setSelectedGroup(group);setMealIndex(0)}}
            display = 'flex'
            justifyContent = 'start'
            pl = '50px'
            opacity = '80%'
            color = {isSelected ? 'white' : 'teal'}
            _hover = {!isSelected ? {background: 'teal', color: 'white', opacity: '60%'} : {opacity: '70%', background: 'teal'}}
            
            
        >
            <Text as = 'b'  fontSize="sm" >{new Date(group.meals[0].logged_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})} (x{group.size})</Text>
        </Box>
    );
};


