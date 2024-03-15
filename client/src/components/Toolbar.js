import { SettingsIcon } from "@chakra-ui/icons";
import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
import { Flex } from "@chakra-ui/react";
import ProfileButton from "./ProfileButton";
import CurrentUserHeader from "./CurrentUserHeader";



export default function ToolBar() {
    return (
        <Flex align = 'center' gap = '10px'>
            <CurrentUserHeader/>
            <SettingsButton/>
            {/*<ProfileButton/>*/}
            <NotificationButton notificationCount={7}/>
            
        </Flex> 
    )
}