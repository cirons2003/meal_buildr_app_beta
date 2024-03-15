/*
Todo: 
- add form validation
- update Page layout 
- setup loading functionality
*/



import { Box, Button, Center, Checkbox, Flex, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import {useEffect, useState} from 'react'
import { Link as RouterLink, useNavigate} from "react-router-dom";
import useLogInUser from "../custom hooks/useLogInUser";
import { useUser } from "../context";



export default function LoginPage() {
    const {user, setUser} = useUser()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {login} = useLogInUser(user, setUser)

    

    
    const attemptLogin = () => {
        login(username, password)
    }

    

    return (
        <Center bg = 'tomato' h = '100vh' w = '100vw'>
            <VStack bg = 'white' px = '10' pt = '25px' pb = '60px' spacing = {4} > 
                <Text fontSize = '3xl'> Sign In </Text>
                <Input required placeholder = 'username' value = {username} 
                        onChange = {(e) => setUsername(e.target.value)}
                    />
                
                <Input required type = 'password' placeholder = 'password' value = {password} 
                    onChange = {(e) => setPassword(e.target.value)}/>
                
                
                
                <Text  color = 'dodgerblue' as = {RouterLink} to = '/register'>
                    Create an account?
                </Text>
                <Center>
                    <Button type = 'submit' onClick = {() => attemptLogin()} colorScheme = 'teal'>Sign In</Button> 
                </Center>
                
                
            </VStack>
        </Center>
    )
}