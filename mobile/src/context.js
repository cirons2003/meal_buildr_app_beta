

import {createContext, useContext, useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserContext = createContext(null)
const TeamContext = createContext(null)

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [team, setTeam] = useState(null)

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
                {children}
            </UserContext.Provider>
        </TeamContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)
export const useTeam = () => useContext(TeamContext)
