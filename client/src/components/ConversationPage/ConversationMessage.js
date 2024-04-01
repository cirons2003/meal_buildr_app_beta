import { Flex , Text} from "@chakra-ui/react";
import useFormatDate from "../../custom hooks/useFormatDate";
import useMessageHandling from "../../custom hooks/useMessageHandling";
import { useEffect } from "react";






export default function ConversationMessage({message, user_username}) {
    const {basicFormat} = useFormatDate()

    const {myMessage} = useMessageHandling(message, user_username)

    
    
    

    return (
        <Flex justify = {myMessage ? 'end' : 'start'} width = '100%'>
            <Flex maxWidth = '60%' minWidth = '40%' bg = {myMessage ? 'dodgerblue' : 'grey'}   borderRadius = '30px' py = '5px' direction = 'column' >
                <Flex justify = 'space-between' align = 'end' px = '15px'>  
                    <Text as = 'b' color = 'white' fontSize = '12px'>username</Text>
                    <Text as = 'i' color= 'green' fontSize = '12px'>{basicFormat(message.sent_at)}</Text>
                </Flex>
                <Flex   px = '15px' align = 'center' justify = 'space-between' minHeight = '40px'>
                    <Text as = 'b' fontSize = '20px'>{message.message_text}</Text>
                    
                </Flex>
            </Flex>
        </Flex>

        
    )
}

