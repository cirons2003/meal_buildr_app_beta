import { Box } from "@chakra-ui/react";
import MessagesTopBar from "../components/MessagesPage/MessagesTopBar";
import Conversations from "../components/MessagesPage/Conversations";
import NewMessageBar from "../components/MessagesPage/NewMessageBar";
import useGetConversations from "../custom hooks/useGetConversations";
import { useEffect } from "react";
import { useUser } from "../context";



export default function MessagesPage() {

    const {filteredListOfConversations, getConversations, filterConversations} = useGetConversations()
    const {user} = useUser()

    useEffect(()=> {
        getConversations()
    },[])
    
    return (
        <>
            <Box >
                <MessagesTopBar filterConversations = {filterConversations}/>
                
                <Conversations filteredListOfConversations = {filteredListOfConversations}/>
            </Box>
        </>
    )
}