import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLoggedIn, useUser } from '../context'


const baseURL = "https://84cb-140-180-240-225.ngrok-free.app"

const useUserAuth = () => {
    const {setUser} = useUser()
    const {loggedIn, setLoggedIn} = useLoggedIn()

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(baseURL+'/login', {username: username, password: password},
            {withCredentials: true, timeout: 30000})
            console.log(response.data)
            if (response.data.username) {
                setUser({username: response.data.username})
                AsyncStorage.setItem('user', JSON.stringify({username: response.data.username, password: response.data.password}))
            }
            setLoggedIn(true)
        }catch(err) {
            console.error(err)
        }
    }   

    const logoutUser = async () => {
        try {
            setLoggedIn(false)
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
                AsyncStorage.setItem('user', JSON.stringify({username: response.data.username, password: response.data.password}))
            }
            setLoggedIn(true)
        }catch(err) {
            console.error(err)
        }
    }

    return {loginUser, logoutUser, signUpUser}
}

export default useUserAuth