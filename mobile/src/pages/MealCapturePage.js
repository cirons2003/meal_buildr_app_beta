import { Box, Text, useTheme, Flex } from "native-base";
import MealCamera from '../components/MealCamera'
import TopBar from "../components/layout/TopBar";



export default function MealCapturePage({setActivePicture}) {
    const theme = useTheme()
    return (
        <Box flex = {1} safeAreaTop bg = 'black' >
            
            <MealCamera setActivePicture = {setActivePicture}/>
        </Box>
    )
}