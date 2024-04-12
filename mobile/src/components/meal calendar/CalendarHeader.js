import {Flex, IconButton, Text, Button} from 'native-base'
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'native-base';


export default function CalendarHeader({incrementDateDay, decrementDateDay, targetDate}) {
    const theme = useTheme()
    return (
        <Flex align = 'center'>
            {/*<Flex align = 'center' justify = 'center' px = {4} py = {2} borderRadius={20} bg = {theme.colors.teal.grad4}>
                <Text fontSize = {20} bold color = {theme.colors.white}>Meal Calendar</Text>
            </Flex>*/}
            <Flex direction = 'row' align = 'center' justify = 'center' width = '100%' >
                <IconButton onPress = {decrementDateDay} _icon = {{as: AntDesign, name: 'leftcircle', color: theme.colors.teal.grad3, size: 8}}></IconButton>
                <Flex>
                    <Text color = {theme.colors.teal.grad3} fontSize = {20}>{(new Date(targetDate)).toLocaleDateString()}</Text>
                </Flex>
                <IconButton onPress = {incrementDateDay} _icon = {{as: AntDesign, name: 'rightcircle', color: theme.colors.teal.grad3, size: 8}}></IconButton>
            </Flex> 
        </Flex>
    )
}