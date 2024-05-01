

import { useRef } from 'react'
import {createContext, useContext, useState, useEffect, useMemo} from 'react'

const UserContext = createContext(null)
const TeamContext = createContext(null)
const NotificationContext = createContext(null)
const SetNotificationContext = createContext(null)
const ProxyContext = createContext(null)




export const ContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [team, setTeam] = useState(null)
    const [notificationCount, setNotificationCount] = useState(0)
    const [unreadMessageCount, setUnreadMessageCount] = useState(0)

    const baseURL = useRef('https://meal-buildr-app-beta.onrender.com')


    const setterValue = useMemo(()=>({
        setNotificationCount, 
        setUnreadMessageCount
    }),[setNotificationCount, setUnreadMessageCount])

    const userVal = useMemo(()=>({
        user, setUser
    }),[user])

    const teamVal = useMemo(()=>({
        team, setTeam
    }),[team])

    const urlval = useMemo(()=>(
        baseURL.current
    ), [baseURL])

    useEffect(() =>{
        const storedUser = localStorage.getItem('user')
        storedUser && setUser(JSON.parse(storedUser))

        const storedTeam = localStorage.getItem('team')
        console.log(storedTeam)
        storedTeam ? setTeam(JSON.parse(storedTeam)) : setTeam({team_name: 'none', role: 'athlete'})

        
    },[])

    return (
    <ProxyContext.Provider value = {urlval}>
        <TeamContext.Provider value = {teamVal}>
            <UserContext.Provider value = {userVal}>
                <SetNotificationContext.Provider value = {setterValue}>
                    <NotificationContext.Provider value = {{notificationCount, unreadMessageCount}}>
                        {children}
                    </NotificationContext.Provider>
                </SetNotificationContext.Provider>
            </UserContext.Provider>
        </TeamContext.Provider>
    </ProxyContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)
export const useTeam = () => useContext(TeamContext)
export const useNotificationContext = () => useContext(NotificationContext)
export const useSetNotificationContext = () => useContext(SetNotificationContext)
export const useProxy = () => useContext(ProxyContext)