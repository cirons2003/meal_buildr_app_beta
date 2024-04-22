import {Flex, ScrollView, Text} from 'native-base'
import Message from './Message'
import {useEffect, useRef} from 'react'
import useGetConversationMessages from '../../custom hooks/useGetConversationMessages'

export default function ConversationMessages({cid, refresh}) {
    const {listOfMessages, getMessages} = useGetConversationMessages()

    const scrollRef = useRef(null)


    useEffect(()=>{
        getMessages(cid)
    },[refresh])

    useEffect(()=> {
        const clear = setTimeout(()=> {
            if (scrollRef.current) 
                scrollRef.current.scrollToEnd({animated: true})   
        },100)
        return ()=> clearTimeout(clear)
    },[listOfMessages])

    return (
        <ScrollView width = '100%' flex = {1} ref = {scrollRef}>
            <Flex width = '100%' flex = {1} gap = {1} py = {1}>
                {listOfMessages?.map((message, index)=>(
                    <Message key = {index} message = {message}/>
                ))}
            </Flex>
        </ScrollView>        
    )
}