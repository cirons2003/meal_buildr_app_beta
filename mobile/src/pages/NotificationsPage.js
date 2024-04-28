import { Flex, IconButton, Text, useTheme, Pressable, Button, Avatar, Input} from "native-base";
import { useNotificationContext, useSetNotificationContext, useUser } from "../context";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import NotificationTopBar from "../components/notifications/NotficationTopBar";
import NotificationFeed from "../components/notifications/NotificationFeed";
import { useEffect } from "react";

export default function NotificationsPage() {
    const theme = useTheme()
    const navigation = useNavigation()
    const {listOfNotifications, getNotifications} = useSetNotificationContext()
    const {notificationCount} = useNotificationContext()

    useEffect(()=> {
        if (getNotifications)
            getNotifications()
    },[getNotifications])


    return (
        <>
        <Flex bg = 'white' width = '100%' flex = {1} justify = 'start' align = 'center'>
                <Pressable width = '100%'  onPress = {()=>navigation.navigate('Home')}>
                    <Flex direction = 'row' justify = 'center' align = 'center' width = '100%'>
                        <IconButton onPress = {()=>navigation.navigate('Home')} _pressed = {{backgroundColor: 'transparent'}} _icon = {{as: Feather, name: 'chevrons-down', size: 8, color: theme.colors.darkgrey}}/>
                    </Flex>
                </Pressable>     
                <NotificationTopBar notifCount = {notificationCount}/>
                <NotificationFeed listOfNotifications = {listOfNotifications}/>  
        </Flex>
    </>
    )
}