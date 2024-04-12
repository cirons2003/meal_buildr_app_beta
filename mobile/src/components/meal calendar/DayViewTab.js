import {Flex, Text, useTheme, Pressable  } from 'native-base';

export default function DayViewTab({group, index, setSelectedGroup, isSelected, boxHeight}) {

    const getMealPosition = (loggedTime) => {
    const loggedDate = new Date(loggedTime);
    const startOfDay = new Date(loggedDate).setHours(0, 0, 0, 0);
    const minutesSinceStartOfDay = (loggedDate - startOfDay) / (1000 * 60);
    const totalContainerHeight = 480; // 48 boxes * 10 pixels per box
    return (minutesSinceStartOfDay / 1440) * totalContainerHeight; // Position from the top
};

    const theme = useTheme()
    return (
        <Pressable
            key={index}
            style = {{position:'absolute', top: 4 * getMealPosition(group.meals[0].logged_at), left: 0}}
            w="100%"
            height = {boxHeight}
            p= {2}
            bg= {isSelected ? theme.colors.teal.grad3 : theme.colors.teal.grad3}
            border = {2}
            borderRadius= {0}
            borderColor = {theme.colors.teal.grad3} 
            onPress = {() => setSelectedGroup(group)} 
              
        >
            <Text bold fontSize = '14px' color = {'white'}>{new Date(group.meals[0].logged_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})} (x{group.size})</Text>
        </Pressable>
    )
}