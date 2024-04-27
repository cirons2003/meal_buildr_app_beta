import {Flex, Text} from '@chakra-ui/react'
import {EmailIcon} from '@chakra-ui/icons'


export default function NotificationTopBar({notificationCount}) {
   // notificationCount = 7
    return (
        <Flex mb = {3} px = '8px' bg = 'teal' width = '100%' align = 'center' height = '60px' justify= 'start' gap = {10}>
            <Flex py = '4px' px = '8px' align = 'center' justify = 'center' borderRadius={20} bg = 'lightblue'>
                <Text fontSize= '25px' as = 'b' color = 'teal'>
                    Notifications
                </Text>
            </Flex>
            {notificationCount > 0 && <Flex  gap = {2} py = '4px' px = '8px' align = 'center' justify = 'center' borderRadius={20} bg = 'white' >
                <Text fontSize= '25px' as = 'b' color = 'red'>
                    {notificationCount} new
                </Text>
                 <EmailIcon color = 'red' fontSize = '30px'/>
            </Flex>}
        </Flex>
    )
}