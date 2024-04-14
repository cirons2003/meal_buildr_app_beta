

import {createContext, useContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserContext = createContext(null)
const TeamContext = createContext(null)
const LoggedInContext = createContext(null)
const ReRenderContext = createContext(null)

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [team, setTeam] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [reRender, setReRender] = useState(false)

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
        <TeamContext.Provider value = {{team, setTeam}}>
            <UserContext.Provider value = {{user, setUser}}>
                <LoggedInContext.Provider value = {{loggedIn, setLoggedIn}}>
                    <ReRenderContext.Provider value = {{reRender, setReRender}}>
                        {children}
                    </ReRenderContext.Provider>
                </LoggedInContext.Provider>
            </UserContext.Provider>
        </TeamContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)
export const useTeam = () => useContext(TeamContext)
export const useLoggedIn = () => useContext(LoggedInContext)
export const useReRender = () => useContext(ReRenderContext)