import { Box, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../../context";



export default function PopupComment({comment}) {
    const {user} = useUser()
    return (
        <>
            <Box m = '3px' display = 'flex' flexDirection = 'column' p = '8px' bg = 'lightblue' borderRadius = '15px' gap = '4px'>   
                <Flex pb = '2px' bg = '' align = 'center' justify = 'space-between'
                    borderBottom = '1px'
                >
                    <Flex bg = {(comment?.poster_username !== user.username) ? 'orange':'white'} borderRadius = '10px' p = '2px'>
                        <Text as = 'b' fontSize = '10px'>{(comment?.poster_username !== user.username) ? comment.poster_username : '-Me-'}</Text>
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

