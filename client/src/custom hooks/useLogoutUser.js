import {useState} from  'react'
import axios from 'axios'
import { useUser } from '../context'

const useLogoutUser = () => {
    const {user, setUser} = useUser()
    const [logoutLoading, setLogoutLoading] = useState(false)

    const logout = async() => {
        setLogoutLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/logout', {withCredentials: true})
            console.log(response.data.message)
            setUser(null)
            localStorage.removeItem('user')
            
        }catch(err) {
            console.error(err)
        }
        setLogoutLoading(false)
    }
    return {logout, logoutLoading}
}

export default useLogoutUser

// unit tested