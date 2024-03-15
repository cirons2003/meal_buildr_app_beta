import { useEffect } from "react"
import useLogoutUser from "../custom hooks/useLogoutUser"

import { useUser } from "../context"




export default function HomePage() {

    const {user, setUser} = useUser()
    const {logout} = useLogoutUser(user, setUser)

    const attemptLogout = () => {
        logout()
    }

    

    return (
        <>
            <h1>Welcome {user.username}</h1>
            <button onClick = {() => attemptLogout()}>Log Out</button>
        </>
    )
}