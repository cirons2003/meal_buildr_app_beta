import { Box } from "@chakra-ui/react";
import MessagesConversationTab from "./MessagesConversationTab";
import useGetConversations from "../../custom hooks/useGetConversations";
import { useEffect, useState } from "react";
import useSendMessage from "../../custom hooks/useSendMessage";



export default function Conversations({filteredListOfConversations}) {

    
    const {sendMessage} = useSendMessage()
    

    return (
        <Box>
            {filteredListOfConversations.map((convo)=> (
                <MessagesConversationTab conversation = {convo}/>    
            ))} 
        </Box>
    )
}