import { Box, Flex, Icon, Image, Text, Button, IconButton } from "@chakra-ui/react";
import {ChatIcon, DeleteIcon} from '@chakra-ui/icons'
import {Link as RouterLink} from 'react-router-dom'
import useFormatDate from "../../custom hooks/useFormatDate";
import defaultProfilePicture from '../../static/avatar-1577909_1280.webp'


export default function MessagesConversationTab({conversation}) {

    
    const {basicFormat} = useFormatDate()

    return (
            <Flex as = {RouterLink} to = {`/conversation/${conversation.conversation_id}`} bg = 'white' size = 'lg' align = 'center' justify = 'space-between' width = '100%' borderBottom = '1px' borderLeft = '2px' borderRadius = '20px' borderColor = 'teal' p = '10px' pr = '45px'>
                <Flex justify = 'start' gap = '20px' align = 'start'> 
                    <Flex align = 'center' gap = '10px' bg = 'teal' px = '10px' py = '5px' borderRadius = '20px' minWidth = '200px' >
                        <Image src = {conversation?.other_user_profile_picture_url ? conversation.other_user_profile_picture_url : defaultProfilePicture} objectFit = 'cover' boxSize = '40px' borderRadius='full' />
                        <Flex flex = {1} justify = 'top' direction='column' >
                            {( conversation.other_first_name && conversation.other_last_name) ? 
                                <Text color = 'lightblue' as = 'b'  fontSize="15px" isTruncated>
                                    {conversation.other_first_name} {conversation.other_last_name}
                                </Text>
                                :
                                <Text color = 'lightblue' as = 'b'  fontSize='15px' isTruncated>
                                   {conversation.other_user_username}
                                </Text>
                                }
                        </Flex>
                    </Flex>
                    <Flex flex = {1} px = {1} align = 'center' >
                        <Text  as = 'i' fontSize = '20px' color = 'lightblue' sx={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                            "{conversation.last_message_text}"
                        </Text> 
                    </Flex>
                    {/*<Text as = 'b' fontSize = '15px' color = 'purple'>{conversation.last_used_at}</Text>*/}
                </Flex>
                <Flex align = 'center' gap = '15px'>  
                    <Text color = 'teal' as = 'i' fontSize = '16px'>{basicFormat(conversation.last_used_at)}</Text>
                    <IconButton bg = 'teal' borderRadius = '15px' icon = {<DeleteIcon/>}></IconButton>
                </Flex>
                
            </Flex>

    )
}