import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import {ArrowBackIcon} from '@chakra-ui/icons'
import SideButton from './SideButton'
import { useState } from "react";

export default function SideBar() {
    const [selected, setSelected] = useState(1)
    return (
        <>
            <Box height = '100vh'  py = '20px'>
                <VStack pacing={3} py = '5px' > 
                    <SideButton to = '/'  text = 'dashboard' icon = {ArrowBackIcon}/>
                    <SideButton to = '/athletes'  text = 'athletes' icon = {ArrowBackIcon}/>
                    <SideButton to = '/fake1'  text = 'fake1' icon = {ArrowBackIcon}/>
                    <SideButton to = '/fake1'  text = 'fake1' icon = {ArrowBackIcon}/>
                </VStack>
            </Box>
            
        </>
    )   
}