import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useLoggedIn, useTeam, useUser } from '../context'
import { useProxy } from '../context'

const useUserAuth = () => {
    const {baseURL} = useProxy()
    const {setUser} = useUser()
    const {setTeam} = useTeam()
    const {loggedIn, setLoggedIn} = useLoggedIn()

    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(baseURL.current+'/login', {username: username, password: password},
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
            const response = await axios.get(baseURL.current + '/logout', {withCredentials: true})
            setUser(null)
            setTeam(null)
            AsyncStorage.removeItem('user')
            AsyncStorage.removeItem('team')
        }catch(err) {
            console.error(err)
        }
    }
    

    const signUpUser = async(username, password) => {
        try {
            const response = await axios.post(baseURL.current + '/register', {username: username, password: password},
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