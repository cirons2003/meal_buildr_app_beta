import {Avatar, Flex, Text, useTheme, Pressable } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import defaultProfilePicture from '../../static/download.png'

export default function ConversationTopBar({otherUsername, url}) {
    const theme = useTheme()
    const navigation = useNavigation()

    return (
        <> 
            <Pressable _pressed={{backgroundColor: 'transparent', opacity: 80}} width = '100%' onPress={()=>{navigation.navigate('OtherProfile', {otherUsername:otherUsername})}}>
                <Flex gap = {2} direction='row' width = '100%' align = 'center' justify = 'center'  py = {3} px = {2} borderBottomColor={theme.colors.teal.grad3} borderBottomWidth={2} bg = 'white'>
                    <Avatar source = { url ? {uri: url} : defaultProfilePicture} size = {10}/>
                    <Text bold fontSize = {25} color = {theme.colors.teal.grad3} >{otherUsername}</Text>
                </Flex>
            </Pressable>
        </>
    )
}