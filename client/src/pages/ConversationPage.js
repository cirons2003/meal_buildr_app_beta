import { useParams } from "react-router-dom"
import useGetConversationMessages from "../custom hooks/useGetConversationMessages"
import { useEffect, useState } from "react"
import { Box, Flex, Input, list } from "@chakra-ui/react"
import useSendMessage from "../custom hooks/useSendMessage"
import { useNotificationContext, useUser } from "../context"
import ConversationMessage from "../components/ConversationPage/ConversationMessage"
import ConversationFeed from "../components/ConversationPage/ConversationFeed"
import ConversationBottomBar from "../components/ConversationPage/ConversationBottomBar"
import ConversationTopBar from "../components/ConversationPage/ConversationTopBar"
import useMessageHandling from "../custom hooks/useMessageHandling"
import useNotifications from '../custom hooks/useNotifications'
import useUserInfo from '../custom hooks/useUserInfo'


export default function ConversationPage() {
    const {conversationId} = useParams()

    const {getMessages, listOfMessages} = useGetConversationMessages()

    const {userInfo, getOtherUserInfo} = useUserInfo()

    const [newMessage, setNewMessage] = useState('')
    const [other_username, setOther_username] = useState('')

    const {user} = useUser()

    const [refresh, setRefresh] = useState(false)

    const {notifications} = useNotificationContext()
    const {openMessages} = notifications

    useEffect(()=> {
        if (conversationId)
            getMessages(conversationId)
    }, [conversationId, refresh])

    useEffect(()=> {
        openMessages(conversationId)
    },[])


    useEffect(()=>{
        if (listOfMessages && listOfMessages[0] && user){
            setOther_username(listOfMessages[0].sender_username === user.username ? listOfMessages[0].recipient_username : listOfMessages[0].sender_username)
        }
    }, [listOfMessages, user])

    useEffect(()=>{
        if (other_username) {
            getOtherUserInfo(other_username)
        }
    },[other_username])

    return (
        <Flex  direction = 'column' width = '100%' height = '100%' bg = 'lightblue' borderRadius = '20px' px = '10px' py = '8px' overflow = 'hidden' gap = ''>
            <ConversationTopBar other_user = {userInfo}></ConversationTopBar>
            <ConversationFeed user_username = {user?.username} listOfMessages={listOfMessages}/>
            <ConversationBottomBar conversationId={conversationId} getMessages={getMessages} refresh = {refresh} setRefresh={setRefresh}/>
            
        </Flex>
    )
}