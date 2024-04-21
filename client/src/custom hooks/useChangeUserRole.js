import axios from 'axios'
import { useTeam} from '../context'
import {useState} from 'react'


const useChangeUserRole = () => {
    const {team} = useTeam()
    const baseURL = 'http://localhost:5000'
    const [response, setResponse] = useState(null)

    const changeRole = async(athleteName, to_role) => {
        if (team.role !== 'owner') {
            console.log(team.role)
            return 
        }
        
        try {
            const response = await axios.post(baseURL+'/changeUserRole', {team_name: team.team_name, to_role: to_role, athlete_name: athleteName}, {withCredentials:true})
            setResponse(response.data)
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    const clearResponse = () => {
        setResponse(null)
    }
    
    return {changeRole, response, clearResponse}
}


export default useChangeUserRole