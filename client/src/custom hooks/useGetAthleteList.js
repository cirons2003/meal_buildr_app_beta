import { useState } from "react"
import { useTeam, useUser } from "../context"
import axios from "axios"
import { list } from "@chakra-ui/react"




const useGetAthleteList = () => {
    const [listOfAthletes, setListOfAthletes] = useState([])
    const [filteredListOfAthletes, setFilteredListOfAthletes] = useState([])
    const {user} = useUser()
    const {team} = useTeam()

    const getAthleteList = async(username, teamName) => {
        try {
            const response = await axios.post('http://localhost:5000/getListOfAthletes', {username: username, team_name: teamName}, {withCredentials: true})
            setListOfAthletes(response.data.listOfAthletes)
            setFilteredListOfAthletes(response.data.listOfAthletes.sort((a,b) => a.username.localeCompare(b.username)))
            console.log(response.data.listOfAthletes)
        }catch (err) {
            console.error(err)
        }
    }

    const filterAthletes = (searchTerm) => {
        if (searchTerm === '')
            setFilteredListOfAthletes(listOfAthletes.sort((a,b) => a.username.localeCompare(b.username)))
        else {
            setFilteredListOfAthletes(listOfAthletes.filter(ath => (ath.username && ath.username.toLowerCase().startsWith(searchTerm.toLowerCase())) 
        || (ath.first_name && ath.first_name.toLowerCase().startsWith(searchTerm.toLowerCase()))
        || (ath.last_name && ath.last_name.toLowerCase().startsWith(searchTerm.toLowerCase())))
            .sort((a,b) => a.username.localeCompare(b.username)))
        }
        
    }
    return {getAthleteList, filteredListOfAthletes, filterAthletes}
}


export default useGetAthleteList