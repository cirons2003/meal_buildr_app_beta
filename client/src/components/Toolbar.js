import { SettingsIcon } from "@chakra-ui/icons";
import NotificationButton from "./NotificationButton";
import SettingsButton from "./SettingsButton";
import { Flex } from "@chakra-ui/react";
import ProfileButton from "./ProfileButton";



export default function ToolBar() {
    return (
        <Flex gap = '10px'>
            <SettingsButton/>
            <ProfileButton/>
            <NotificationButton notificationCount={7}/>
        </Flex>
    )
}