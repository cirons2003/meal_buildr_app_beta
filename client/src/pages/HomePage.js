import { useEffect } from "react"
import useLogoutUser from "../custom hooks/useLogoutUser"

import { useUser } from "../context"
import { Box, Button, Flex, IconButton, Text, VStack } from "@chakra-ui/react"
import SideBar from '../components/SideBar'
import { Outlet, Link as RouterLink } from "react-router-dom"
import TopBar from "../components/TopBar"
import NotificationButton from "../components/NotificationButton"
import SearchBar from "../components/SearchBar" 
import ToolBar from "../components/Toolbar"





export default function HomePage() {

    const {user, setUser} = useUser()
    const {logout} = useLogoutUser(user, setUser)

    const attemptLogout = () => {
        logout()
    }

    

    return (
        <>
            <VStack bg = 'lightyellow'>
                <TopBar>
                    <Text as = {RouterLink} to = '/' fontSize = '30px' color = 'white'>MealBuildr</Text>
                    <Flex gap = '30px'>
                        <SearchBar/>
                        <ToolBar/> 
                    </Flex>
                </TopBar>
                <Flex my = '0px' w = '100%'>
                    <Box bg = '' w = '15%' h = '100vh'>
                        <SideBar/>  
                    </Box>
                    <Box bg = ' ' w = '85%' h = '100vh'>
                        <Outlet/>
                    </Box>
                </Flex>   
            </VStack>           
        </>
    )
}