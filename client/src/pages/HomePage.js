import { FaCrown } from "react-icons/fa";
import { BsClipboard2PulseFill } from "react-icons/bs";
import { useTeam} from "../context";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import SideBar from '../components/SideBar';
import { Outlet, Link as RouterLink} from "react-router-dom";
import TopBar from "../components/TopBar";
import ToolBar from "../components/Toolbar";
import { useEffect } from "react";





export default function HomePage() {

    

    const {team} = useTeam()
    
    useEffect(()=>{console.log('homepage')},[])

    return (
        <>
            <VStack spacing="0px" bg='lightyellow'>
                <TopBar position="fixed" width="100%" zIndex="1">
                    <Flex align = 'center' gap = '10px'>
                        <Text as={RouterLink} to='/' fontSize='30px' color='white'>MealBuildr</Text>
                        {team?.role === 'owner' && <FaCrown color = 'yellow' fontSize = '30px'/>}
                        {team?.role === 'admin' && <BsClipboard2PulseFill color = 'red' fontSize = '30px'/>}
                    </Flex>

                    
                    <Flex gap='30px'>
                        <ToolBar/>
                    </Flex>
                </TopBar>
                <Flex w='100%' position ='fixed' top = '90' height="calc(100vh - 100px)"> {/* Adjust top padding to match the height of the top bar */}
                    <Box as="aside" w='15%' h='100%' position="fixed" overflowY="hidden">
                        <SideBar/>
                    </Box>
                    <Box as="main" flex="1" pl='15%' overflow   ="hidden"> {/* Adjust left padding to match the width of the sidebar */}
                        <Outlet/>   
                    </Box>
                </Flex>
            </VStack>
        </>
    );
}
