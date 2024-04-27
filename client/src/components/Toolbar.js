import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
import { Flex } from "@chakra-ui/react";
import CurrentUserHeader from "./CurrentUserHeader";
import { useNotificationContext, useTeam } from "../context";
import MemberListButton from "./Settings/MemberListButton";
import { useEffect } from "react";
import useNotifications from "../custom hooks/useNotifications";


export default function ToolBar() {
    const {team} = useTeam()
    const {notificationCount} = useNotificationContext()
    const {getNotifications} = useNotifications()

    useEffect(()=> {
        getNotifications()
    },[])

    return (
        <Flex align = 'center' gap = '10px'>
            {team.role === 'owner' && <MemberListButton orangeScheme={true}/>}
            <CurrentUserHeader/>
            <SettingsButton/>
            {/*<ProfileButton/>*/}
            <NotificationButton notificationCount={notificationCount}/>
            
            
        </Flex> 
    )
}