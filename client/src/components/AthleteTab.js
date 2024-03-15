import { Box, Text } from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'


export default function AthleteTab({username}) {
    return (
        <Box
        as = {RouterLink}
        h="65px"
        w="100%"
        bg="teal"
        display="flex"
        alignItems="center"
        px={2}
        my = '10px'
        borderRadius = '20px'
        
        >
            <Text as = 'b'  fontSize="2xl" isTruncated>
                {username}
            </Text>
        </Box>
    )
}