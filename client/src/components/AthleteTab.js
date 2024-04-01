import { Box, Text } from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'


export default function AthleteTab({athlete}) {
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
            <Box bg = '' py = '3px' px = '8px' borderRadius= '20px'>
                <Text color = 'teal' as = 'b'  fontSize="2xl" isTruncated>
                    {athlete.username}
                </Text>
            </Box>
            
        </Box>
    )
}