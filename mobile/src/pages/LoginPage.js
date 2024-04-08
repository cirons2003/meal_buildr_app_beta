import {Flex, useTheme, Text, Input, Button, Pressable} from 'native-base'
import { useState } from 'react'
import useUserAuth from '../custom hooks/useUserAuth'
import { useUser } from '../context'
import MealCalendarPage from './MealCalendarPage'


export default function LoginPage() {
    const theme = useTheme()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signingUp, setSigningUp] = useState(false)
    const {loginUser, signUpUser} = useUserAuth()

    const handleLogin = () => {
        loginUser(username, password)
        setUsername('')
        setPassword('')
    }

    const handleSignUp = () => {
        signUpUser(username, password)
        setUsername('')
        setPassword('')
    }
    const {user} = useUser()

    return (
        <>
            <Flex justify = 'center' align = 'center' bg = {signingUp ? theme.colors.orange : theme.colors.teal.grad4} flex = {1}>
                <Flex direction = 'column' gap = '2' width = '75%' align = 'center' bg = {signingUp ? 'green.700' : theme.colors.teal.grad3} p = {4} borderRadius = '20'>
                    <Text fontSize = '30' color = {signingUp ? 'tomato' : 'white'}>{signingUp ? 'New User' : 'Welcome Back!' }</Text>
                    <Input placeholder = 'username' onChangeText = {setUsername} value = {username}/>
                    <Input type = 'password' placeholder = 'password' onChangeText = {setPassword} value = {password}/>
                    <Pressable onPress = {()=>setSigningUp(!signingUp)}>
                        <Text color = {signingUp ? 'green.200': 'blue.700'}>{signingUp ? 'Already have an account?': 'Create an account'}</Text>
                    </Pressable>
                    <Button backgroundColor = {signingUp ? 'tomato' : theme.colors.teal.grad4} minWidth = {20}
                        onPress = {signingUp ? handleSignUp : handleLogin}
                    >
                    {signingUp ? 'Join us!' : 'Log In'}</Button>
                </Flex>
            </Flex>
        </>
    )
}