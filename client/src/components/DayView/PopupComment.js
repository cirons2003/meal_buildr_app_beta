import { Box, Flex, Text } from "@chakra-ui/react";



export default function PopupComment({comment}) {
    return (
        <>
            <Box m = '3px' display = 'flex' flexDirection = 'column' p = '8px' bg = 'lightblue' borderRadius = '15px' gap = '4px'>   
                <Flex pb = '2px' bg = '' align = 'center' justify = 'space-between'
                    borderBottom = '1px'
                >
                    <Flex bg = 'orange' borderRadius = '10px' p = '2px'>
                        <Text as = 'b' fontSize = '10px'>{comment.poster_username}</Text>
                    </Flex>
                    <Flex as = 'i' fontSize = '10px' bg = ''>
                        <Text>{new Date(comment.commented_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})}</Text>
                    </Flex>
                </Flex>
                <Flex bg = ''   >
                    <Text>{`"${comment.comment_text ? comment.comment_text : ''}"` }</Text>
                </Flex>
            </Box>
            
        </>
    )
}

