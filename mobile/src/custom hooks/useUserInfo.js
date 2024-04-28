import axios from 'axios'
import { useState } from 'react'
import { useProxy, useUser } from '../context'
import AsyncStorage from '@react-native-async-storage/async-storage'


const useUserInfo = () => {
    const {baseURL} = useProxy()
    const {setUser} = useUser()
    const [userInfo, setUserInfo] = useState(null)

    // updates context and local storage with up to date user info 
    const getUserInfo = async() => {
        try {
            const response = await axios.post(baseURL.current+'/getUserInfo',{}, {withCredentials: true})
            setUser(response.data.user)
            AsyncStorage.setItem('user', JSON.stringify(response.data.user))
            setUserInfo(response.data.user)
            console.log('user info updated', response.data.user)
        }catch(err) {
            console.error(err)
        }
    }

    const getOtherUserInfo = async(username) => {
        const response = await axios.post(baseURL.current+'/getUserInfo',{username: username}, {withCredentials: true})
        setUserInfo(response.data.user)
    }

    // update user info 
    const changeUserInfo = async(firstName, lastName, bio) => {
        try {
            const response = await axios.post(baseURL.current+'/changeUserInfo', {newFirstName: firstName, newLastName: lastName, newBio: bio}, {withCredentials: true})
            getUserInfo()
        }catch(err) {
            console.error(err)
        }
    }   

   
    return {getUserInfo, changeUserInfo, userInfo, getOtherUserInfo}

}

export default useUserInfo