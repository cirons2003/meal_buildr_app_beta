

import {createContext, useContext, useState, useEffect} from 'react'

const UserContext = createContext(null)

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(() =>{
        const storedUser = sessionStorage.getItem('user')
        storedUser && setUser(JSON.parse(storedUser))
    },[])

    return (
        <UserContext.Provider value = {{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)