import {Avatar, Flex, Text, useTheme} from 'native-base'
import defaultProfilePicture from '../../static/download.png'

export default function ConversationTopBar({otherUsername, url}) {
    const theme = useTheme()

    return (
        <> 
            <Flex gap = {2} direction='row' width = '100%' align = 'center' justify = 'center'  py = {3} px = {2} borderBottomColor={theme.colors.teal.grad3} borderBottomWidth={2} bg = 'white'>
                <Avatar source = { url ? {uri: url} : defaultProfilePicture} size = {10}/>
                <Text bold fontSize = {25} color = {theme.colors.teal.grad3} >{otherUsername}</Text>
            </Flex>
        </>
    )
}