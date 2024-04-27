import { SettingsIcon } from "@chakra-ui/icons";
import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
import { Flex } from "@chakra-ui/react";
import ProfileButton from "./ProfileButton";
import CurrentUserHeader from "./CurrentUserHeader";
import { useTeam } from "../context";
import MemberListButton from "./Settings/MemberListButton";




export default function ToolBar({notificationCount}) {
    const {team} = useTeam()
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