

import {createContext, useContext, useState, useEffect} from 'react'

const UserContext = createContext(null)
const TeamContext = createContext(null)

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [team, setTeam] = useState(null)

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
                {children}
            </UserContext.Provider>
        </TeamContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)
export const useTeam = () => useContext(TeamContext)
