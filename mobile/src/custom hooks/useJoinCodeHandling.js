import { useState } from "react"
import axios from 'axios'
import { useProxy } from "../context"

const useJoinCodeHandling = () => {
    const [loading, setLoading] = useState(false)
    const [teamFound, setTeamFound] = useState('')
    const [joinResponse, setJoinResponse] = useState(null)

    const {baseURL} = useProxy()


    const searchTeam = async(team_code) => {
        if (!team_code)
            return
        setLoading(true)
        try {
            const response = await axios.post(baseURL.current+'/getTeamWithCode', {team_code: team_code}, {withCredentials: true})
            console.log('getTeamWithCode')
            setTeamFound(response.data.team)
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
        
    }

    const joinTeam = async(team_name, team_code) => {
        setLoading(true)
        try {
            const response= await axios.post(baseURL.current+'/joinTeamWithCode', {team_name: team_name, team_code: team_code}, {withCredentials: true})
            console.log('joinTeamWithCode')
            setJoinResponse(response.data)
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
    }


    return {searchTeam, loading, teamFound, joinTeam, joinResponse, setJoinResponse}

}


export default useJoinCodeHandling