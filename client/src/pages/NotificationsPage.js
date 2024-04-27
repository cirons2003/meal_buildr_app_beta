import {Flex, Text, IconButton} from '@chakra-ui/react'
import NotificationsTopBar from '../components/Notifications/NotificationsTopBar'
import NotificationsFeed from '../components/Notifications/NotificationsFeed'
import useNotifications from '../custom hooks/useNotifications'
import {useEffect} from 'react'


export default function NotificationsPage() {


    const {listOfNotifications, getNotifications} = useNotifications()

    useEffect(()=> {
         getNotifications()
    },[])

    return (
        <Flex direction = 'column' justify = 'start' width = '100%' height = '100%'>
            <NotificationsTopBar/>
            <NotificationsFeed listOfNotifications = {listOfNotifications}/>
        </Flex>
    )
}