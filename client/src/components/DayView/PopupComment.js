import { Image, Box, Flex, Text } from "@chakra-ui/react";
import { useUser } from "../../context";
import defaultProfilePicture from '../../static/avatar-1577909_1280.webp'



export default function PopupComment({comment}) {
    const {user} = useUser()
    return (
        <>
            <Flex m = '3px' bg = 'lightblue' borderRadius = '15px' align = 'center' gap = {2} p = '8px'>
                <Image src = {comment?.poster_profile_picture_url ? comment.poster_profile_picture_url : defaultProfilePicture} objectFit = 'cover' boxSize = '30px' borderRadius='full'/>
                <Flex direction = 'column' gap = '4px' flex = {1}>   
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
                </Flex>
            </Flex>
        </>
    )
}

