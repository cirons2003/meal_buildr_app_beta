import {Flex, Text, Input, useTheme, IconButton} from 'native-base'
import {KeyboardAvoidingView, Platform, Keyboard} from 'react-native'
import {useState} from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import useSendMessage from '../../custom hooks/useSendMessage';
import {useEffect} from 'react'


export default function ConversationBottomBar({cid, setRefresh, refresh}) {
    const theme = useTheme()
    const [newMessage, setNewMessage] = useState('')
    const {sendMessageWithConversation, refreshToggle} = useSendMessage()
    
    const handleSend = () => {
        sendMessageWithConversation(newMessage, cid)
        setNewMessage('')   
        Keyboard.dismiss()
    }

    useEffect(()=> {
        setRefresh(!refresh)
    },[refreshToggle])


    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0}
        >
            <Flex direction = 'row' justify = 'space-between' align = 'center' width = '100%' py = {2} bg = {theme.colors.white}>
                <Input color = {theme.colors.teal.grad3} fontSize = {20} type = 'text' onChangeText = {setNewMessage} value = {newMessage} InputRightElement={
                    <IconButton _icon = {{as: MaterialIcons, name: 'send', size: 8, color: theme.colors.teal.grad3}} onPress = {() =>handleSend()}/>}  placeholder = 'new message...'/>
            </Flex>
        </KeyboardAvoidingView>   
    )
}