import { useState } from "react"
import axios from 'axios'


const useGetConversations = () => {
    const [listOfConversations, setListOfConversations] = useState([])
    const [filteredListOfConversations, setFilteredListOfConversations] = useState([])

    const getConversations = async() => {
        try {
            const response = await axios.get('http://localhost:5000/getConversations', {withCredentials: true})
            setListOfConversations(response.data.listOfConversations.sort((a,b) => a.last_used_at.localeCompare(b.last_used_at)))
            setFilteredListOfConversations(response.data.listOfConversations.sort((b,a) => a.last_used_at.localeCompare(b.last_used_at)))
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    const filterConversations = (searchTerm) => {
        if (searchTerm === '' && listOfConversations) {
            setFilteredListOfConversations(listOfConversations)
            return 
        }
        setFilteredListOfConversations(listOfConversations.filter(conv => conv.other_user_username.toLowerCase().startsWith(searchTerm.toLowerCase())).sort((a,b) => a.other_user_username.localeCompare(b.other_user_username)))
        
    }
    return {filteredListOfConversations, getConversations, filterConversations}
}

export default useGetConversations