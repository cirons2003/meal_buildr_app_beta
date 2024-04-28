import { Flex, Icon, Text, useTheme } from "native-base";
import {MaterialCommunityIcons} from 'react-native-vector-icons-uvBLa2WI'


export default function NotificationTopBar({notifCount = 7}) {
    const theme = useTheme()
    return (
        <Flex mb = {3} width = '100%' direction = 'row' justify = 'center' align = 'center'>
            <Flex px = {5} pos = 'relative' direction = 'row' align = 'center' justify = 'center'>
                <Icon as = {MaterialCommunityIcons} name = 'bell' size = '10' color = {theme.colors.teal.grad3}/>
                <Text bold fontSize = {40} color = {theme.colors.teal.grad3}>Notifications</Text>
                {notifCount > 0 && 
                <Flex opacity = {90} p = {1} borderRadius = 'full' bg = {theme.colors.TeamButton.admin} style = {{position: 'absolute', top: -20, right: -20}} direction = 'row' align = 'center' justify = 'center'> 
                    <Text fontSize = {15} color = 'white' bold>{notifCount} new</Text>
                </Flex>}    
            </Flex>
        </Flex>
    )
}