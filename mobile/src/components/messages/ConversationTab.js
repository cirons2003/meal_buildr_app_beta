import {Flex, Text, useTheme, Pressable} from 'native-base'
import useFormatDate from "../../custom hooks/useFormatDate";
import {useNavigation} from '@react-navigation/native'



export default function ConversationTab({convo}) {
    const theme = useTheme()
    const {basicFormat} = useFormatDate()
    const navigation = useNavigation()


    return (
        <Pressable  _pressed={{opacity: 30, borderRadius: 20}} onPress = {()=>{navigation.navigate('Conversation', {conversationId: convo.conversation_id, otherUsername: convo.other_user_username})}}>
            <Flex width = '100%' height = {20} direction = 'column' borderBottomColor={theme.colors.teal.grad3} borderBottomWidth = {2} borderLeftColor={theme.colors.teal.grad3} borderLeftWidth = {2} borderRadius = {20} p = {5} bg = {theme.colors.lightblue} mb= {2}>
                <Flex direction = 'row' width = '100%' align = 'center' justify='space-between'> 
                    <Text color = {theme.colors.teal.grad4} bold>
                        {convo.other_user_username}
                    </Text>
                    <Text color = {theme.colors.teal.grad3}>
                        {basicFormat(convo.last_used_at)}
                </Text>
                </Flex>
                <Flex flex = {1} direction = 'row' width = '100%' align = 'start' justify='space-between' >
                    <Text fontSize = {13} color = {theme.colors.teal.grad3} isTruncated numberOfLines={1}>
                        {convo.last_message_text}
                    </Text>
                    
                </Flex>
            </Flex>
        </Pressable>
        
    )
}