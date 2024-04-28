import { Box, Text, useTheme, Flex } from "native-base";
import Conversations from "../components/messages/Conversations";
import {useIsFocused} from '@react-navigation/native'



export default function MessagesPage() {
    const theme = useTheme()
    const isFocused = useIsFocused()

    return (
        <Box flex = {1} bg = {theme.colors.teal.grad3}>
            <Flex flex = {1} justify = 'center' align = 'center' bg = 'white' >
                <Conversations isFocused = {isFocused}/>
            </Flex>
        </Box>
    )  
}