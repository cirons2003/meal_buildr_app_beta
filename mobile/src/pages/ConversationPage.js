import {Text, Flex} from 'native-base'
import useGetConversationMessages from '../custom hooks/useGetConversationMessages'
import {useEffect, useState} from 'react'
import ConversationMessages from '../components/conversation page/ConversationMessages'
import ConversationBottomBar from '../components/conversation page/ConversationBottomBar'
import ConversationTopBar from '../components/conversation page/ConversationTopBar'


export default function({ route}) {

    const {conversationId, otherUsername, url} = route.params

    const {listOfMessages, getMessages} = useGetConversationMessages()
    const [refresh, setRefresh] = useState(false)

    return (
        <Flex direction='column' justify = 'space-between' align = 'center' flex = {1} mb = {20}>
            <ConversationTopBar otherUsername = {otherUsername} url = {url}/>
            <ConversationMessages cid = {conversationId} refresh = {refresh}/>
            <ConversationBottomBar cid = {conversationId} refresh={refresh} setRefresh={setRefresh}/>
        </Flex>
    )
}