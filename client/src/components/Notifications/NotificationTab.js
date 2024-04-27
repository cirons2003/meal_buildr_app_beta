import {Flex, Text, Badge} from '@chakra-ui/react'
import useFormatDate from '../../custom hooks/useFormatDate'
import {Link as RouterLink} from 'react-router-dom'

export default function NotificationTab({notification}) {
    const {basicFormat} = useFormatDate()

    let toLink = ''
    if (notification.variant === 'comment') {
        toLink = `/athletePage/${notification.meal_username}/${notification.meal_id}/${notification.meal_logged_at}`
    }
    else if (notification.variant === 'message') {
        toLink = `/conversation/${notification.cid}`
    }
    
    

    return (
        <Flex as = {RouterLink} to = {toLink} pos = 'relative' pr = {3} px = '8px' py = '4px' direction = 'column' borderBottom = '4px' borderLeft = '4px' borderRadius = {20}  borderColor = {notification.is_new ? 'teal' : 'lightblue'} justify = 'start' width = '100%'>
            <Flex width = '100%' justify = 'space-between'> 
                <Text fontSize = '20px' as = 'b' color = 'teal'>{notification.header}</Text>
                <Text>{basicFormat(notification.timestamp)}</Text>
            </Flex>
            <Flex width = '100%' px = '4px'> 
                <Text fontSize='15px' >{notification.body}</Text>
            </Flex>
            {notification.is_new && <Flex pos = 'absolute' bg = 'red' borderRadius='full' boxSize = '20px' top = '-7px' left = '-10px'></Flex>}
        </Flex>
    )
}