import { useState } from "react"
import { useTeam, useUser } from "../context"
import axios from "axios"




const useGetAthleteList = () => {
    const [listOfAthletes, setListOfAthletes] = useState()
    const {user} = useUser()
    const {team} = useTeam()

    const getAthleteList = async(username, teamName) => {
        try {
            const response = await axios.post('http://localhost:5000/getListOfAthletes', {username: username, team_name: teamName}, {withCredentials: true})
            setListOfAthletes(response.data.listOfAthletes)
            console.log(response.data.listOfAthletes)
        }catch (err) {
            console.error(err)
        }
    }
    return {getAthleteList, listOfAthletes}
}


export default useGetAthleteList