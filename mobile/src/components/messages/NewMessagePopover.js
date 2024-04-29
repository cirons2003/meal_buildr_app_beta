import {Popover, Flex, Pressable, useTheme, Text, Input, IconButton} from 'native-base'
import { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import useSendMessage from '../../custom hooks/useSendMessage';


export default function NewMessagePopover({mem, navigation, onClose}) {
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [newMessage, setNewMessage] = useState('')
    const {sendMessageWithUser, cid} = useSendMessage()
    

    const handleSend = () => {
        sendMessageWithUser(newMessage, mem.user_id)
        setNewMessage('')
        setIsOpen(false)
        onClose()
    }

    useEffect(()=> {
        if (cid !== -1)
            navigation.navigate('Conversation',{conversationId: cid, otherUsername:mem.username})
    }, [cid])

    return (
        <>
            <Popover isOpen = {isOpen} onClose = {()=> setIsOpen(false)} placement='bottom' trigger={triggerProps => {
                return <Pressable {...triggerProps} onPress = {()=>{setIsOpen(true)}} 
                             _pressed = {{ borderRadius: 20, opacity: 30}} width = '100%'
                        >
                            <Flex mb = {2} p = {2} width= '100%' height = {8} borderColor={theme.colors.teal.grad3} borderBottomWidth={1} borderRadius={20} borderLeftWidth={1}>
                                <Text bold color = {theme.colors.teal.grad3} fontSize = {12}>{mem.username}</Text>
                            </Flex>
                        </Pressable>}}
            >
                <Popover.Content width = {300}>
                        <Popover.CloseButton onPress = {()=>setIsOpen(false)} bg = {theme.colors.teal.grad6}/>
                        <Popover.Header bg = {theme.colors.white}>
                            <Text fontSize = {20} bold color = {theme.colors.teal.grad6}> Send Message to</Text>
                            <Text fontSize = {20} bold color = {theme.colors.teal.grad6}>{(mem?.first_name && mem?.last_name) ? `${mem.first_name} ${mem.last_name}` : mem?.username}</Text>
                        </Popover.Header>
                        <Popover.Body bg = {theme.colors.white}>
                            <Flex width = '100%' height = '100%' align = 'center' justify = 'start' >
                                <Input placeholder = 'new message...' color = {theme.colors.teal.grad3} fontSize = {17} onChangeText={setNewMessage} value = {newMessage} rightElement={
                                    <IconButton _icon = {{as: MaterialIcons, name: 'send', size: 8, color: theme.colors.teal.grad6}} onPress = {() =>{handleSend()}}/>}
                                />
                            </Flex>   
                        </Popover.Body>
                </Popover.Content>

                
            </Popover> 
        </>
    )
}

