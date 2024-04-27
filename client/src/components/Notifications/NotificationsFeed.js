import {Flex, Text} from '@chakra-ui/react'
import NotificationTab from './NotificationTab'

export default function NotificationsFeed({listOfNotifications}) {
    
    return (
        <Flex pt = {2} gap = {2} width = '100%' h = '40px' direction = 'column' justify = 'start' flex = {1} >
            {listOfNotifications?.length > 0 ? 
            listOfNotifications.map((not, index)=>(
                <NotificationTab key = {index} notification = {not}/>
            ))
            : 
            <Flex width = '100%'  py = {10}>
                <Text fontSize = '30px'>No Notifications...</Text>
            </Flex>
            }
            
        </Flex>
    )
}