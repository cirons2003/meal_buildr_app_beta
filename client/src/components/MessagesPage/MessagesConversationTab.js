import { Box, Flex, Icon, Text, Button, IconButton } from "@chakra-ui/react";
import {ChatIcon, DeleteIcon} from '@chakra-ui/icons'
import {Link as RouterLink} from 'react-router-dom'
import useFormatDate from "../../custom hooks/useFormatDate";


export default function MessagesConversationTab({conversation}) {

    
    const {basicFormat} = useFormatDate()

    return (
            <Flex as = {RouterLink} to = {`/conversation/${conversation.conversation_id}`} bg = 'white' size = 'lg' align = 'center' justify = 'space-between' width = '100%' borderBottom = '1px' borderLeft = '2px' borderRadius = '20px' borderColor = 'teal' p = '10px' pr = '45px'>
                <Flex justify = 'start' align = 'center' gap = '20px'> 
                    <Flex align = 'center' gap = '10px' bg = 'teal' p = '10px' borderRadius = '20px'>
                        <ChatIcon color = 'lightblue'/>
                        <Text as = 'b' fontSize = '16px' color = 'lightblue'>{conversation.other_user_username}</Text>
                    </Flex>
                    <Text as = 'i' fontSize = '20px' color = 'lightblue'>"{conversation.last_message_text}"</Text>
                    {/*<Text as = 'b' fontSize = '15px' color = 'purple'>{conversation.last_used_at}</Text>*/}
                </Flex>
                <Flex align = 'center' gap = '15px'>  
                    <Text color = 'teal' as = 'i' fontSize = '16px'>{basicFormat(conversation.last_used_at)}</Text>
                    <IconButton bg = 'teal' borderRadius = '15px' icon = {<DeleteIcon/>}></IconButton>
                </Flex>
                
            </Flex>

    )
}