import {Flex, IconButton, Text, Button} from 'native-base'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useTheme } from 'native-base';
import {useState} from 'react'


export default function CalendarHeader({incrementDateDay, decrementDateDay, targetDate, incrementDateWeek, decrementDateWeek}) {
    const theme = useTheme()
    
    const [displayDate, setDisplayDate] = useState(new Date())
    const [increment, setIncrement] = useState(0)
    const [decrement, setDecrement] = useState(0)


    return (
        <Flex align = 'center'>
            {/*<Flex align = 'center' justify = 'center' px = {4} py = {2} borderRadius={20} bg = {theme.colors.teal.grad4}>
                <Text fontSize = {20} bold color = {theme.colors.white}>Meal Calendar</Text>
            </Flex>*/}
            <Flex direction = 'row' align = 'center' justify = 'center' width = '100%' >
                <IconButton onPress = {decrementDateWeek} _icon = {{as: Ionicons, name: 'play-back-circle-sharp', color: theme.colors.teal.grad3, size: 12}}></IconButton>
                <IconButton onPress = {decrementDateDay} _icon = {{as: AntDesign, name: 'leftcircle', color: theme.colors.teal.grad3, size: 8}}></IconButton>
                <Flex>
                    <Text color = {theme.colors.teal.grad3} fontSize = {20}>{(new Date(targetDate)).toLocaleDateString()}</Text>
                </Flex>
                <IconButton onPress = {incrementDateDay} _icon = {{as: AntDesign, name: 'rightcircle', color: theme.colors.teal.grad3, size: 8}}></IconButton>
                <IconButton onPress = {incrementDateWeek} _icon = {{as: Ionicons, name: 'play-forward-circle-sharp', color: theme.colors.teal.grad3, size: 12}}></IconButton>
            </Flex> 
        </Flex>
    )
}