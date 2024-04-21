import { Button, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSendMessage from "../../custom hooks/useSendMessage";



export default function ConversationBottomBar({getMessages, conversationId, refresh, setRefresh}) {
    const [newMessage, setNewMessage] = useState('')

    const {sendMessageWithConversation, refreshToggle} = useSendMessage()
    const handleSend = () => {
        sendMessageWithConversation(newMessage, conversationId)
        setNewMessage('')
        getMessages(conversationId)
    }

    useEffect(()=>{
        setRefresh(!refresh)
    },[refreshToggle])
    return (
        <Flex bg = '' p = '2px' borderRadius = '20px' justify = 'center' align = 'center' mt = '20px'  mb = '10px' width = '80%'>
            <Input width = '80%' size = 'lg' bg = 'white' type = 'text' value = {newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder = 'new message'/>
            <Button flexGrow = {1} size = 'lg' bg = 'dodgerblue' color = 'white' onClick = {()=>handleSend()}>Send</Button>
        </Flex>
    )
}