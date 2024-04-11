import { useState } from "react"
import axios from 'axios'

const useJoinCodeHandling = () => {
    const [loading, setLoading] = useState(false)
    const [teamFound, setTeamFound] = useState('')
    const [joinResponse, setJoinResponse] = useState(null)


    const searchTeam = async(team_code) => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/getTeamWithCode', {team_code: team_code}, {withCredentials: true})
            setTeamFound(response.data.team)
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
        
    }

    const joinTeam = async(team_name, team_code) => {
        setLoading(true)
        try {
            const response= await axios.post('http://localhost:5000/joinTeamWithCode', {team_name: team_name, team_code: team_code}, {withCredentials: true})
            console.log(response.data)
            setJoinResponse(response.data)
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
    }


    return {searchTeam, loading, teamFound, joinTeam, joinResponse, setJoinResponse}

}


export default useJoinCodeHandling