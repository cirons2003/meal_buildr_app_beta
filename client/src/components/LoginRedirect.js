import {Navigate} from 'react-router-dom'
import { useUser } from '../context'

export default function LoginRedirect({children}) {
    const {user, setUser} = useUser()
    
    return (
        <>
            {user ? <Navigate to = '/'/> : children}
        </>
    )
}