

import {createContext, useContext, useState, useEffect, useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserContext = createContext(null)
const TeamContext = createContext(null)
const LoggedInContext = createContext(null)
const ReRenderContext = createContext(null)
const ProxyContext = createContext(null)

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [team, setTeam] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [reRender, setReRender] = useState(false)

    const baseURL = useRef('https://047c-140-180-240-233.ngrok-free.app')

    useEffect(() =>{
        const getUser = async() => {
            try {
                const value = JSON.parse(await AsyncStorage.getItem('user'))
                if (value !== null)
                    setUser(value)
            }catch(err) {
                console.error(err)
            }
        }
        const getTeam = async() => {
            try {
                const value = JSON.parse(await AsyncStorage.getItem('team'))
                if (value !== null)
                    setTeam(value)
            }catch(err) {
                console.error(err)
            }
        }
        getUser()
        getTeam()   
    },[])


    
    return (
        <UserContext.Provider value = {{user, setUser}}>
            <TeamContext.Provider value = {{team, setTeam}}>
                <LoggedInContext.Provider value = {{loggedIn, setLoggedIn}}>
                    <ReRenderContext.Provider value = {{reRender, setReRender}}>
                            <ProxyContext.Provider value = {{baseURL}}>
                                {children}  
                            </ProxyContext.Provider>
                    </ReRenderContext.Provider>
                </LoggedInContext.Provider>
            </TeamContext.Provider>
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)
export const useTeam = () => useContext(TeamContext)
export const useLoggedIn = () => useContext(LoggedInContext)
export const useReRender = () => useContext(ReRenderContext)
export const useProxyProvider = () => useContext(ProxyContext)