import { Flex, Text, IconButton, Image } from "@chakra-ui/react";
import {SettingsIcon} from '@chakra-ui/icons'
import {Link as RouterLink} from 'react-router-dom'
import { useTeam } from '../../context'
import defaultProfilePicture from '../../static/istockphoto-1476170969-170667a.jpg'

export default function ConversationTopBar({other_username, url}) {
    const {team} = useTeam()
    
    return (
        <Flex gap = {4} bg = 'teal' align = 'center' height = '10%' borderRadius = '20px' px = '18px' py = '4px' mb = '15px'>
            <Image src = {url ? {url} : defaultProfilePicture} objectFit = 'cover' borderRadius = 'full' boxSize = '50px'/>
            <Flex align = 'center'>
                <Text fontSize = '28px' as = 'b' color = 'lightblue'>{other_username}</Text>
                {(team?.role === 'owner' && other_username) && <IconButton fontSize = '25px' icon = {<SettingsIcon/>} as = {RouterLink} to = {`../../settings/${other_username}`} bg = 'transparent'></IconButton>}
            </Flex>
        </Flex>
    )
}