import { Flex, Text, IconButton, Image } from "@chakra-ui/react";
import {SettingsIcon} from '@chakra-ui/icons'
import {Link as RouterLink} from 'react-router-dom'
import { useTeam } from '../../context'
import defaultProfilePicture from '../../static/avatar-1577909_1280.webp'

export default function ConversationTopBar({other_user}) {
    const {team} = useTeam()
    
    return (
        <Flex gap = {4} bg = 'teal' align = 'center' height = '10%' borderRadius = '20px' px = '18px' py = '4px' mb = '15px'>
            {other_user && <Image src = {other_user?.profile_picture_url ? other_user.profile_picture_url : defaultProfilePicture} objectFit = 'cover' borderRadius = 'full' boxSize = '50px'/>}
            <Flex align = 'center'>
                <Text fontSize = '28px' as = 'b' color = 'lightblue'>{other_user?.username}</Text>
                {(team?.role === 'owner' && other_user?.username) && <IconButton fontSize = '25px' icon = {<SettingsIcon/>} as = {RouterLink} to = {`../../settings/${other_user?.username}`} bg = 'transparent'></IconButton>}
            </Flex>
        </Flex>
    )
}