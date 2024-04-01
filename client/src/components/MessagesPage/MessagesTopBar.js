import { Box, Flex, Text, filter, useUpdateEffect } from "@chakra-ui/react";
import SearchBar from "../SearchBar";
import NewMessageBar from "./NewMessageBar";
import { useEffect, useState } from "react";


export default function MessagesTopBar({filterConversations}) {
    
    const [searchTerm, setSearchTerm] = useState('')

    useUpdateEffect(()=>{
        filterConversations(searchTerm)
    },[searchTerm])
    

    return (
        <>
            <Flex  justify = 'space-between' bg= 'teal' p = '10px' mb = '30px'>
                <Flex bg = 'white' px = '10px' py = '3px' borderRadius = '20px' align = 'center'>
                    <Text as = 'b' color = 'teal' fontSize = '20px' >Messages</Text>  
                </Flex>
                <Flex gap = '10px'>
                    <NewMessageBar/>
                    <SearchBar searchTerm = {searchTerm} setSearchTerm={setSearchTerm}/>
                </Flex>
                
            </Flex>
        </>
    )
}