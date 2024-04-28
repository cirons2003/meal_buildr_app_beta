import { Flex, ScrollView } from "native-base"
import Notification from "./Notification"

export default function NotificationFeed({listOfNotifications}) {
    return (
        <ScrollView width = '100%' flex = {1} >
            <Flex width = '100%' flex = {1} justify = 'start' align = 'center' gap = {2}>
            {listOfNotifications?.map((notif, index)=>(
                <Notification notif = {notif} key = {index}/>
            ))}
        </Flex>
        </ScrollView>
    )
}