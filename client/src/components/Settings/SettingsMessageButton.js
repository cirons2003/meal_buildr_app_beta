import {Popover, PopoverTrigger, Flex, Text, Box, useUpdateEffect, PopoverContent, PopoverCloseButton, PopoverArrow, Button, PopoverHeader, PopoverBody, Input, IconButton} from '@chakra-ui/react'
import {CalendarIcon, ChatIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import useSendMessage from '../../custom hooks/useSendMessage'

export default function SettingsMessageButton({headerColor, member}) {

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

    const toConvo = () => {
        sendMessageWithUser('',member.user_id)
    }

    return (
        <>
           <Popover  >
                <PopoverTrigger>
                    <IconButton icon = {<ChatIcon fontSize = {25} color = {headerColor}/>} as = {Button}  bg = 'transparent'/>
                </PopoverTrigger>
                <Box sx = {{opacity: 0.95, zIndex: 1000}}>
                    <PopoverContent bg = 'lightblue' >
                        <PopoverArrow bg = 'teal' />
                        <PopoverCloseButton/>
                        <PopoverHeader>
                            <Flex > 
                                <Text as = 'b' color = 'teal' fontSize = '20px'>Message {member.username} ?</Text>
                            </Flex>
                        </PopoverHeader>
                        <PopoverBody>
                            <Flex direction = 'column' pt = '10px'>
                                <Button mx = '25px' color = 'white' bg = 'teal' onClick = {()=>toConvo()}>Go to conversation</Button>
                                <Flex pt = '20px' pb = '10px'>
                                    <Input  bg = '' type = 'text' value = {newMessage} onChange = {(e) =>setNewMessage(e.target.value)} placeholder = 'new message...'/>
                                    <IconButton onClick = {()=> handleMessageSend()} bg = 'teal' icon = {<ArrowForwardIcon/>}></IconButton>
                                </Flex>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Box>
            </Popover> 
        </>
    )
}