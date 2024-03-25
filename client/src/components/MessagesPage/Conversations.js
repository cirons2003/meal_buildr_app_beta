import { Box } from "@chakra-ui/react";
import MessagesConversationTab from "./MessagesConversationTab";



export default function Conversations({}) {

    const listOfConversations = [{'username': 'Hector123678923333333330-'}, {'username': 'person2'}]
    return (
        <Box>
            {listOfConversations.map((contact )=> (
                <MessagesConversationTab contact = {contact}/>    
            ))} 
        </Box>
    )
}