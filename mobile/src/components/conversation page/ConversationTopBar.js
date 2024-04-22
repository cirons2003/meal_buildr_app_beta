import {Flex, Text, useTheme} from 'native-base'

export default function ConversationTopBar({otherUsername}) {
    const theme = useTheme()

    return (
        <> 
            <Flex direction='row' width = '100%' align = 'center' justify = 'center'  py = {3} px = {2} borderBottomColor={theme.colors.teal.grad3} borderBottomWidth={2} bg = 'white'>
                <Text bold fontSize = {20} color = {theme.colors.teal.grad3} >{otherUsername}</Text>
            </Flex>
        </>
    )
}