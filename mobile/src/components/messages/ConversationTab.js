import {Flex, Text, useTheme, Pressable, Avatar} from 'native-base'
import useFormatDate from "../../custom hooks/useFormatDate";
import {useNavigation} from '@react-navigation/native'
import defaultProfilePicture from '../../static/download.png'


export default function ConversationTab({convo}) {
    const theme = useTheme()
    const {basicFormat} = useFormatDate()
    const navigation = useNavigation()


    return (
        <Pressable _pressed={{opacity: 30, borderRadius: 20}} onPress = {()=>{navigation?.navigate('Conversation', {conversationId: convo?.conversation_id, url: convo?.other_user_profile_picture_url, username: convo.other_user_username})}}>
            <Flex pos = 'relative' gap = {4} height = {20} width = '100%' direction = 'row' align = 'center' justify = 'start' borderBottomColor={theme.colors.teal.grad3} borderBottomWidth = {2} borderLeftColor={theme.colors.teal.grad3} borderLeftWidth = {2} borderRadius = {20} p = {5} pl = {2} bg = {theme.colors.lightblue} mb= {2}>
                <Avatar source = { convo?.other_user_profile_picture_url ? {uri: convo.other_user_profile_picture_url} : defaultProfilePicture}/>
                <Flex flex = {1} direction = 'column' >
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
                {convo.unread_message && <Flex style = {{position:'absolute', top:0, left: 0}} borderRadius='full' boxSize={5} bg = {theme.colors.red}></Flex>}
            </Flex>
        </Pressable>
        
    )
}