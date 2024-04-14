import { Box, Text, useTheme, Flex } from "native-base";
import Conversations from "../components/messages/Conversations";



export default function MessagesPage() {
    const theme = useTheme()
    return (
        <Box flex = {1} bg = {theme.colors.teal.grad3}>
            <Flex flex = {1} justify = 'center' align = 'center' safeAreaTop bg = 'white' >
                <Conversations />
            </Flex>
        </Box>
    )
}