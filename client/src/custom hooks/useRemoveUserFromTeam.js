import { useState } from "react"
import { useTeam, useUser } from "../context"
import axios from "axios"


const useRemoveUserFromTeam = () => {
    const [response, setResponse] = useState(null)
    const {team} = useTeam()
    const baseURL = 'http://localhost:5000'

    const removeUser = async(username) => {
        if (team.role !== 'owner')
            return
        else {
            try {
                const response = await axios.post(baseURL+'/removeUserFromTeam', {username: username, team_name: team.team_name}, {withCredentials: true})
                setResponse(response.data)
                console.log(response.data)
            }catch(err) {
                console.error(err)
            }
        }
    }

    const clearResponse = () => {
        setResponse(null)
    }

    return {response, clearResponse, removeUser}

}


export default useRemoveUserFromTeam