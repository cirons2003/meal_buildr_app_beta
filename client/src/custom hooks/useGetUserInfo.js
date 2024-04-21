import axios from 'axios'
import { useState } from 'react'
import { useTeam } from '../context'


const useGetUserInfo = () => {
    const [role, setRole] = useState(null)
    const [userId, setUserId] = useState(null)
    const baseURL = 'http://localhost:5000'
    const {team} = useTeam()

    const getUserInfo = async(username) => {
        try {
            const response = await axios.post(baseURL+'/getTeamMemberContext', {username: username, team_name: team.team_name}, {withCredentials:true})
            setRole(response.data.info.role)
            setUserId(response.data.info.user_id)
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    return {getUserInfo, role, userId}

}

export default useGetUserInfo