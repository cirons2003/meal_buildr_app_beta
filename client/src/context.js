

import {createContext, useContext, useState, useEffect} from 'react'
import useNotifications from './custom hooks/useNotifications'

const UserContext = createContext(null)
const TeamContext = createContext(null)
const NotificationContext = createContext(null)


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [team, setTeam] = useState(null)
    const notifications = useNotifications()

    useEffect(() =>{
        const storedUser = localStorage.getItem('user')
        storedUser && setUser(JSON.parse(storedUser))


        const storedTeam = localStorage.getItem('team')
        console.log(storedTeam)
        storedTeam ? setTeam(JSON.parse(storedTeam)) : setTeam({team_name: 'none', role: 'athlete'})
    },[])

    return (
        <TeamContext.Provider value = {{team, setTeam}}>
            <UserContext.Provider value = {{user, setUser}}>
                <NotificationContext.Provider value = {{notifications}}>
                    {children}
                </NotificationContext.Provider>
            </UserContext.Provider>
        </TeamContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)
export const useTeam = () => useContext(TeamContext)
export const useNotificationContext = () => useContext(NotificationContext)

