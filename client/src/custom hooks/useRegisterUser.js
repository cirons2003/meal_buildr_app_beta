import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../context'

const useRegisterUser = () => {
    const {user, setUser} = useUser()
    const [registerLoading, setRegisterLoading] = useState(false)
    const [message, setMessage] = useState('')
    
    const navigate = useNavigate()

    const register = async(username, password) => {
        setRegisterLoading(true)
        setMessage('')
        try {
            const response = await axios.post('http://localhost:5000/register', {username: username, password: password},
             {withCredentials: true})
            console.log(response.data.message)
            setMessage(response.data.message)
            if (response.data.username)
                setUser({username: response.data.username})
                sessionStorage.setItem('user', JSON.stringify({username: response.data.username}))
            if (user) 
                navigate('/')

        }catch(err) {
            console.error(err)
        }
        setRegisterLoading(false)
    }

    return {registerLoading, register, message}
}

export default useRegisterUser

// unit tested 