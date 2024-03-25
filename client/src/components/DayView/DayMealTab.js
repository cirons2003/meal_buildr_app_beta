import { Box, Button, Text } from '@chakra-ui/react';

export default function DayMealTab({meal, index, setSelectedMeal, isSelected}) {

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
            top={`${getMealPosition(meal.logged_at)}px`}
            w="100%"
            p="2"
            bg= {isSelected ? 'teal' : 'lightblue'}
            border = '2px'
            borderRadius="md"
            borderColor = 'teal'
            onClick = {() => setSelectedMeal(meal)}
            display = 'flex'
            justifyContent = 'start'
            pl = '50px'
            opacity = '80%'
            color = {isSelected ? 'white' : 'teal'}
            _hover = {!isSelected ? {background: 'teal', color: 'white', opacity: '60%'} : {opacity: '70%', background: 'teal'}}
            
            
        >
            <Text as = 'b'  fontSize="sm" >{new Date(meal.logged_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})}</Text>
        </Box>
    );
};


