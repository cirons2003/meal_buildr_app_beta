import { useParams } from "react-router-dom"
import useGetConversationMessages from "../custom hooks/useGetConversationMessages"
import { useEffect, useState } from "react"
import { Box, Flex, Input } from "@chakra-ui/react"
import useSendMessage from "../custom hooks/useSendMessage"
import { useUser } from "../context"
import ConversationMessage from "../components/ConversationPage/ConversationMessage"
import ConversationFeed from "../components/ConversationPage/ConversationFeed"
import ConversationBottomBar from "../components/ConversationPage/ConversationBottomBar"
import ConversationTopBar from "../components/ConversationPage/ConversationTopBar"


export default function ConversationPage() {
    const {conversationId} = useParams()

    const {getMessages, listOfMessages} = useGetConversationMessages()

   

    const [newMessage, setNewMessage] = useState('')

    const {user} = useUser()

    useEffect(()=> {
        if (conversationId)
            getMessages(conversationId)
    }, [conversationId])


    return (
        <Flex  direction = 'column' width = '100%' height = '100%' bg = 'lightblue' borderRadius = '20px' px = '10px' py = '8px' overflow = 'hidden' gap = '5px '>
            <ConversationTopBar other_username = {'username'}></ConversationTopBar>
            <ConversationFeed user_username = {user?.username} listOfMessages={listOfMessages}/>
            <ConversationBottomBar conversationId={conversationId} getMessages={getMessages}/>
            
        </Flex>
    )
}