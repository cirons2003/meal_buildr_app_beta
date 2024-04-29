import {Flex} from 'native-base'
import useGetConversationMessages from '../custom hooks/useGetConversationMessages'
import {useEffect, useState} from 'react'
import ConversationMessages from '../components/conversation page/ConversationMessages'
import ConversationBottomBar from '../components/conversation page/ConversationBottomBar'
import ConversationTopBar from '../components/conversation page/ConversationTopBar'
import { usePage, useUser } from '../context'
import useUserInfo from '../custom hooks/useUserInfo'
import { useNavigation, useRoute } from '@react-navigation/native'


export default function ConversationPage() {

    const {user} = useUser()
    const route = useRoute()
    const {conversationId, username, url} = route.params


    const {listOfMessages, getMessages} = useGetConversationMessages()
    const [refresh, setRefresh] = useState(false)
    const {getOtherUserInfo, userInfo} = useUserInfo()
    const [otherUsername, setOtherUsername] = useState('')

    //get messages
    useEffect(()=>{
        if (conversationId)
            getMessages(conversationId)
    },[refresh, conversationId])

    // getOtherUsername if none provided
    useEffect(()=>{
        if ( listOfMessages && listOfMessages[0] && user?.username){
            setOtherUsername(listOfMessages[0].sender_username === user.username ? listOfMessages[0].recipient_username : listOfMessages[0].sender_username)
        }
    }, [listOfMessages, user])

    //get user info (mainly profile picture) if none provided
    useEffect(()=> {
        if (otherUsername && otherUsername !== '') {
            getOtherUserInfo(otherUsername)
        }
    },[otherUsername])

    return (
        <Flex direction='column' justify = 'space-between' align = 'center' flex = {1} mb = {20}>
            <ConversationTopBar otherUsername = {username ? username : userInfo?.username} url = {url ? url : userInfo?.profile_picture_url}/>
            <ConversationMessages listOfMessages={listOfMessages}/>
            <ConversationBottomBar cid = {conversationId} refresh={refresh} setRefresh={setRefresh}/>
        </Flex>
    )
}