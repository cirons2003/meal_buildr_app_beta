import { Flex, Text, IconButton } from "@chakra-ui/react";
import {SettingsIcon} from '@chakra-ui/icons'
import {Link as RouterLink} from 'react-router-dom'
import { useTeam } from '../../context'

export default function ConversationTopBar({other_username}) {
    const {team} = useTeam()
    
    return (
        <Flex align = 'center' height = '10%' bg = 'teal' borderRadius = '20px' px = '18px' py = '4px' mb = '15px'>
            <Text fontSize = '28px' as = 'b' color = 'lightblue'>{other_username}</Text>
            {(team?.role === 'owner' && other_username) && <IconButton icon = {<SettingsIcon/>} as = {RouterLink} to = {`../../settings/${other_username}`} bg = 'transparent'></IconButton>}
        </Flex>
    )
}