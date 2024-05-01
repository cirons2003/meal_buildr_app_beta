import {useState} from  'react'
import axios from 'axios'
import { useProxy, useTeam, useUser } from '../context'
import {useNavigate} from 'react-router-dom'

const useLogoutUser = () => {
    const {setUser} = useUser()
    const [logoutLoading, setLogoutLoading] = useState(false)
    const {setTeam} = useTeam()
    const navigate = useNavigate()

    const baseURL = useProxy()

    const logout = async() => {
        setLogoutLoading(true)
        try {
            const response = await axios.get(baseURL+'/logout', {withCredentials: true})
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