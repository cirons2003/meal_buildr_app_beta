import { Box, Text } from "@chakra-ui/react";
import {Link as RouterLink} from 'react-router-dom'


export default function AthleteTab({athlete}) {
    return (
        <Box
        as = {RouterLink}
        h="65px"
        w="100%"
        bg='orange'
        display="flex"
        alignItems="center  "
        px={10}
        my = '10px'
        borderRadius = '20px'
        
        >
            <Text as = 'b'  fontSize="2xl" isTruncated>
                {athlete.username}
            </Text>
        </Box>
    )
}