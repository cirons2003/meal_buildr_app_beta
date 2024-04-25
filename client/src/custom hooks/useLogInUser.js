import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../context'
import useUserInfo from './useUserInfo'


const useLogInUser = () => {
    
    const {user, setUser} = useUser()
    const navigate = useNavigate() 
    const {getUserInfo} = useUserInfo()

    const login = async(username, password) => {
        
        try {
            const response = await axios.post('http://localhost:5000/login', {username: username, password: password},{withCredentials: true})
            console.log(response.data.message)
            getUserInfo() //updates context and local storage 
        }catch(err) {
            console.error(err)
        }
        
    }
    return {login}

}

export default useLogInUser
