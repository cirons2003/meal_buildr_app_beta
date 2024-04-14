import {Flex, Text, useTheme} from 'native-base'
import NewMessageButton from "./NewMessageButton";

export default function ConversationTopBar() {
    const theme = useTheme()
    return (
        <Flex direction = 'row' width = '100%' height = {12}  align = 'center' justify = 'space-between' pl = {4} pr = {2}>
            <Text fontSize = {20} bold color = {theme.colors.teal.grad4}>Messages</Text>
            <NewMessageButton/>
        </Flex>
    )
}