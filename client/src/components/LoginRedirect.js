import {Navigate} from 'react-router-dom'
import { useUser } from '../context'
import { useEffect } from 'react'

export default function LoginRedirect({children}) {
    const {user, setUser} = useUser()
    
    return (
        <>
            {user ? <Navigate to = '/'/> : children}
        </>
    )
}
