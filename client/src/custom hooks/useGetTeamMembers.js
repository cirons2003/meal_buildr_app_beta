
import axios from "axios"
import { useState } from "react"


const useGetTeamMembers = () => {
    const [listOfAthletes, setListOfAthletes] = useState([])
    const [listOfStaff, setListOfStaff] = useState([])
    const [filteredStaff, setFilteredStaff] = useState([])
    const [filteredAthletes, setFilteredAthletes] = useState([])

    const getTeamMembers = async(team_name) => {
        try {
            const response = await axios.post('http://localhost:5000/getTeamMembers', {team_name: team_name}, {withCredentials: true})
            setListOfAthletes(response.data.athletes)
            setFilteredAthletes(response.data.athletes)
            setListOfStaff([response.data.owner, ...response.data.admins])
            setFilteredStaff([response.data.owner, ...response.data.admins])
        }catch(err) {
            console.error(err)
        }
    }

    const filterTeamMembers = (searchTerm) => {
        if (searchTerm === '' && listOfAthletes && listOfStaff)
        setFilteredAthletes(listOfAthletes)
        setFilteredStaff(listOfStaff)
        setFilteredAthletes(listOfAthletes.filter(ath => ath.username.toLowerCase().startsWith(searchTerm.toLowerCase())).sort((a,b) => a.username.localeCompare(b.username)))
        setFilteredStaff(listOfStaff.filter(stf => stf.username.toLowerCase().startsWith(searchTerm.toLowerCase())).sort((a,b) => a.username.localeCompare(b.username)))
    }
    return {getTeamMembers, filterTeamMembers, filteredStaff, filteredAthletes}
}

export default useGetTeamMembers