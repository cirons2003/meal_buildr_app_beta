import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '../context'


const baseURL = "https://c958-140-180-240-233.ngrok-free.app"

const useUserAuth = () => {
    const {setUser} = useUser()
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(baseURL+'/login', {username: username, password: password},
            {withCredentials: true, timeout: 30000})
            console.log(response.data)
            if (response.data.username) {
                setUser({username: response.data.username})
                AsyncStorage.setItem('user', JSON.stringify({username: response.data.username}))
            }
        }catch(err) {
            console.error(err)
        }
    }   

    const logoutUser = async () => {
        try {
            const response = await axios.get(baseURL + '/logout', {withCredentials: true})
            setUser(null)
            AsyncStorage.removeItem('user')
        }catch(err) {
            console.error(err)
        }
    }

    const signUpUser = async(username, password) => {
        try {
            const response = await axios.post(baseURL + '/register', {username: username, password: password},
            {withCredentials: true})
            console.log(response.data)
            if (response.data.username) {
                setUser({username: response.data.username})
                AsyncStorage.setItem('user', JSON.stringify({username: response.data.username}))
            }
        }catch(err) {
            console.error(err)
        }
    }

    return {loginUser, logoutUser, signUpUser}
}

export default useUserAuth