import {Navigate} from 'react-router-dom'
import { useUser } from '../context'

export default function ProtectedRoute({children}) {
    const {user, setUser} = useUser()
    return (
        <>
            {user ? children : <Navigate to = '/login'/>}
        </>
    )
}


