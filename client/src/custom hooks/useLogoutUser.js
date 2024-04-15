import {useState} from  'react'
import axios from 'axios'
import { useTeam, useUser } from '../context'

const useLogoutUser = () => {
    const {setUser} = useUser()
    const [logoutLoading, setLogoutLoading] = useState(false)
    const {setTeam} = useTeam()

    const logout = async() => {
        setLogoutLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/logout', {withCredentials: true})
            console.log(response.data.message)
            setUser(null)
            setTeam(null)
            localStorage.removeItem('user')
            localStorage.removeItem('team')
            
        }catch(err) {
            console.error(err)
        }
        setLogoutLoading(false)
    }
    return {logout, logoutLoading}
}

export default useLogoutUser

// unit tested