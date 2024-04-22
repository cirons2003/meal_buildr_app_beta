import {Flex, Text, useTheme} from 'native-base'
import useMessageHandling from '../../custom hooks/useMessageHandling'
import { useUser } from '../../context'
import useFormatDate from '../../custom hooks/useFormatDate'

export default function Message({message}) {
    
    const theme = useTheme()
    const {user} = useUser()
    const {basicFormat} = useFormatDate()

    const {username, myMessage} = useMessageHandling(message, user.username)

    return (
        <Flex direction = 'row' width = '100%' align = 'center' justify = {myMessage ? 'flex-end' : 'start'}>
            <Flex direction='column' maxWidth = '60%' minWidth = '20%' align = 'center' justify = 'center'  px = {3} py = {1} bg = {myMessage ? theme.colors.teal.grad6 : 'grey'} borderRadius={20}>
                <Flex direction = 'row' width = '100%' align = 'center' justify = 'space-between' >
                    <Text color = 'white' bold fontSize = {13}>{username}</Text>
                    <Text fontSize = {10}>{basicFormat(message.sent_at)}</Text>
                </Flex>
                <Flex align = 'center' width = '100%' justify = 'start' direction = 'row'>
                    <Text>{message.message_text}</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}