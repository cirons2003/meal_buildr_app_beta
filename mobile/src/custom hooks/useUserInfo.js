import axios from 'axios'
import { useState } from 'react'
import { useProxy, useUser } from '../context'
import AsyncStorage from '@react-native-async-storage/async-storage'


const useUserInfo = () => {
    const {baseURL} = useProxy()
    const {setUser,user} = useUser()
    const [userInfo, setUserInfo] = useState(null)

    // updates context and local storage with up to date user info 
    const getUserInfo = async() => {
        try {
            const response = await axios.post(baseURL.current+'/getUserInfo',{}, {withCredentials: true})
            setUser(response.data.user)
            AsyncStorage.setItem('user', JSON.stringify(response.data.user))
            setUserInfo(response.data.user)
            console.log('getUserInfo')
        }catch(err) {
            console.error(err)
        }
    }

    const getOtherUserInfo = async(username) => {
        const response = await axios.post(baseURL.current+'/getUserInfo',{username: username}, {withCredentials: true})
        console.log('getOtherUserInfo')
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

    const changeUserProfilePicture = async(image_uri) => {
        try {
            console.log(image_uri)
            const formData = new FormData()
            formData.append('image', {
                uri: image_uri,
                type: 'image/jpeg', 
                name: `${user.username}_profilePicture.jpg`
            });
            const response = await axios.post(baseURL.current+'/uploadProfilePicture', formData, {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true})
            getUserInfo()
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

   
    return {getUserInfo, changeUserInfo, userInfo, getOtherUserInfo, changeUserProfilePicture}

}

export default useUserInfo