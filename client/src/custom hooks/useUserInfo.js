import axios from 'axios'
import { useState } from 'react'
import { useProxy, useTeam, useUser } from '../context'


const useUserInfo = () => {
    const [role, setRole] = useState(null)
    const [userId, setUserId] = useState(null)
    const baseURL = useProxy()
    const {team} = useTeam()
    const {setUser} = useUser()
    const [userInfo, setUserInfo] = useState(null)

    // used for providing functionality for owner to set team member settings 
    const getTeamMemberContext = async(username) => {
        try {
            const response = await axios.post(baseURL+'/getTeamMemberContext', {username: username, team_name: team.team_name}, {withCredentials:true})
            setRole(response.data.info.role)
            setUserId(response.data.info.user_id)
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    // updates context and local storage with up to date user info 
    const getUserInfo = async() => {
        try {
            const response = await axios.post(baseURL+'/getUserInfo',{}, {withCredentials: true})
            setUser(response.data.user)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            setUserInfo(response.data.user)
            console.log('user info updated', response.data.user)
        }catch(err) {
            console.error(err)
        }
    }

    const getOtherUserInfo = async(username) => {
        const response = await axios.post(baseURL+'/getUserInfo',{username: username}, {withCredentials: true})
        setUserInfo(response.data.user)
        console.log(response.data)
    }

    // update user info 
    const changeUserInfo = async(firstName, lastName, bio) => {
        try {
            const response = await axios.post(baseURL+'/changeUserInfo', {newFirstName: firstName, newLastName: lastName, newBio: bio}, {withCredentials: true})
            console.log(response.data)
            getUserInfo()
        }catch(err) {
            console.error(err)
        }
    }   

    const changeUserProfilePicture = async(image) => {
        try {
            console.log(image)
            const formData = new FormData()
            formData.append('image', image)
            const response = await axios.post(baseURL+'/uploadProfilePicture', formData, {withCredentials: true})
            getUserInfo()
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    return {getTeamMemberContext, getUserInfo, role, changeUserInfo, userId, changeUserProfilePicture, userInfo, getOtherUserInfo}

}

export default useUserInfo