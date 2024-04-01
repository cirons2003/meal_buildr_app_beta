import { Flex } from "@chakra-ui/react";
import ConversationMessage from "./ConversationMessage";
import { useRef, useEffect } from "react";



export default function ConversationFeed({listOfMessages, user_username}) {
    const feedRef = useRef(null)
    useEffect(()=> {
        if (feedRef.current)
            feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }, [listOfMessages])
    return (
        <Flex direction = 'column' gap = '10px' overflow = 'auto' flex = {1} ref = {feedRef}>
            {listOfMessages.map((mes, index)=>(
                <ConversationMessage key = {index} message = {mes} user_username = {user_username}/>
            ))}
        </Flex>
    )
}