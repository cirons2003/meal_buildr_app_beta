import {useState} from  'react'
import axios from 'axios'
import { useTeam, useUser } from '../context'
import {useNavigate} from 'react-router-dom'

const useLogoutUser = () => {
    const {setUser} = useUser()
    const [logoutLoading, setLogoutLoading] = useState(false)
    const {setTeam} = useTeam()
    const navigate = useNavigate()

    const logout = async() => {
        setLogoutLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/logout', {withCredentials: true})
            console.log(response.data.message)
            setUser(null)
            setTeam(null)
            localStorage.removeItem('user')
            localStorage.removeItem('team')
            navigate('/')
        }catch(err) {
            console.error(err)
        }
        setLogoutLoading(false)
    }
    return {logout, logoutLoading}
}

export default useLogoutUser

// unit tested