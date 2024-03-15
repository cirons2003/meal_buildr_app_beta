import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../context'


const useLogInUser = () => {
    
    const {user, setUser} = useUser()
    const navigate = useNavigate() 

    const login = async(username, password) => {
        
        try {
            const response = await axios.post('http://localhost:5000/login', {username: username, password: password},
            {withCredentials: true})
            console.log(response.data)
            if (response.data.username) 
                setUser({username: response.data.username})
                sessionStorage.setItem('user', JSON.stringify({username: response.data.username}))
            
        }catch(err) {
            console.error(err)
        }
        
    }
    return {login}

}

export default useLogInUser
