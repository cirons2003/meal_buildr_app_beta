import { Box, Flex, Text, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Input, IconButton, useUpdateEffect } from "@chakra-ui/react"
import { useTeam, useUser } from "../../context"
import useGetTeamMembers from "../../custom hooks/useGetTeamMembers"
import NewMessageToggleButton from "./NewMessageToggleButton"
import { useEffect, useState } from "react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import useSendMessage from "../../custom hooks/useSendMessage"
import { useNavigate } from "react-router-dom"


export default function NewMessageListTab({member}) {

    const {sendMessageWithUser, cid} = useSendMessage()
    const [newMessage, setNewMessage] = useState('')
    const navigate = useNavigate()

    useUpdateEffect(()=> {
        if (cid !== -1)
            navigate(`/conversation/${cid}`)
        
    }, [cid])

    const handleMessageSend = () => {
        sendMessageWithUser(newMessage, member.user_id)
        setNewMessage('')

    }

    return (
        <>
            
            <Popover  >
                <PopoverTrigger>
                    <Flex as = {Button} bg = 'white' mb = '2px' borderRadius = '0px' borderBottom = '1px' px = '8px' justify = 'space-between'>
                        {(member.first_name && member.last_name)? <Text as = 'b' >{member.first_name} {member.last_name}</Text> :<Text as = 'b' >"{member.username}"</Text>}
                    </Flex>
                </PopoverTrigger>
                <Box sx = {{opacity: 0.95, zIndex: 1000}}>
                    <PopoverContent bg = 'lightblue' >
                        <PopoverArrow bg = 'teal' />
                        <PopoverCloseButton/>
                        <PopoverHeader>
                            <Flex > 
                                {(member.first_name && member.last_name)? <Text as = 'b' > Message {member.first_name} {member.last_name}?</Text> :<Text as = 'b' > Message "{member.username}"?</Text>}
                            </Flex>
                        </PopoverHeader>
                        <PopoverBody>
                            <Flex pt = '20px' pb = '10px'>
                                <Input  bg = '' type = 'text' value = {newMessage} onChange = {(e) =>setNewMessage(e.target.value)} placeholder = 'new message...'/>
                                <IconButton onClick = {()=> handleMessageSend()} bg = 'teal' icon = {<ArrowForwardIcon/>}></IconButton>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Box>
            </Popover>


            
        </>


        
    )
}