
import { Box, Text, useTheme, Flex } from "native-base";
import TopBar from "../components/layout/TopBar";



export default function MealCalendarPage() {
    const theme = useTheme()
    return (
        <Box flex = {1} bg = {theme.colors.teal.grad3}>
            <Flex flex = {1} justify = 'center' align = 'center' safeAreaTop bg = 'white' >
                <Text>Calendar</Text>
            </Flex>
        </Box>
    )
}