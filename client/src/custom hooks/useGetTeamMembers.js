
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

    const filterPeople = (listOfPeople, searchTerm) => {
        return listOfPeople.filter(p => (p.username && p.username.toLowerCase().startsWith(searchTerm.toLowerCase()))
            || (p.first_name && p.first_name.toLowerCase().startsWith(searchTerm.toLowerCase()))
            || (p.last_name && p.last_name.toLowerCase().startsWith(searchTerm.toLowerCase())))
            .sort((a,b) => a.username.localeCompare(b.username))
    }

    const filterTeamMembers = (searchTerm) => {
        if (searchTerm === '' && listOfAthletes && listOfStaff)
        setFilteredAthletes(listOfAthletes)
        setFilteredStaff(listOfStaff)
        setFilteredAthletes(filterPeople(listOfAthletes, searchTerm))
        setFilteredStaff(filterPeople(listOfStaff, searchTerm))
    }

    return {getTeamMembers, filterTeamMembers, filteredStaff, filteredAthletes}
}


export default useGetTeamMembers