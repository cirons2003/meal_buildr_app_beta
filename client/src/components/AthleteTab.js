import { Box, Text, Flex, IconButton } from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'
import {SettingsIcon} from '@chakra-ui/icons'
import { useTeam } from "../context";


export default function AthleteTab({athlete}) {
    const {team} = useTeam()
    return (
        <Box
        as = {RouterLink}
        to = {`/athletePage/${athlete.username}`}
        h="65px"
        w="100%"
        borderBottom = '2px'
        borderLeft = '2px'
        bg = ''
        borderColor = 'teal'
        display="flex"
        alignItems="center  "
        px={3}
        my = '10px'
        borderRadius = '20px'
        
        >
            <Flex bg = '' py = '3px' px = '8px' borderRadius= '20px' justify = 'space-between' width = '100%' pr = '20px'>
                <Text color = 'teal' as = 'b'  fontSize="2xl" isTruncated>
                    {athlete.username}
                </Text>
                {team.role === 'owner' && <IconButton icon = {<SettingsIcon fontSize = '40px' color = 'teal'/>} bg = 'transparent'
                    as = {RouterLink} to = {`/settings/${athlete.username}`}
                />}

            </Flex>
            
        </Box>
    )
}