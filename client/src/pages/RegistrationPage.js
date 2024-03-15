
/*
Todo: 
- add form validation
- update Page layout 
- setup loading functionality
*/




import { Button, Center, Input, VStack, Text, Box, Heading} from '@chakra-ui/react'
import {useEffect, useState} from 'react'
import { Link as RouterLink} from 'react-router-dom'
import useRegisterUser from '../custom hooks/useRegisterUser'
import { useUser } from '../context'

export default function RegistrationPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {user, setUser} = useUser()
    
    const {register, message} = useRegisterUser(user, setUser)

    const attemptSignIn = () => {
        register(username, password)
    }
 

    return (
        <Center w = '100vw' h = '100vh' bg = 'tomato'>          
            <VStack bg = 'white' px = '10' pt = '25px' pb = '60px' spacing = {4} >
                <Text fontSize = '3xl'> Sign Up </Text>
                <Input placeholder = 'username' value = {username} 
                    onChange = {(e) => setUsername(e.target.value)}/>
            
                <Input placeholder = 'password' value = {password}
                    onChange = {(e) => setPassword(e.target.value)}/>
            
            
                <Text as = {RouterLink} to = '/login' color = 'dodgerblue'>
                    Already have an account?
                </Text>
                <Button colorScheme='teal' onClick = {() => {attemptSignIn()}}>Create Account</Button>   
            </VStack>
            
        </Center>
    )
}