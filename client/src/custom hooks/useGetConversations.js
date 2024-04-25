import { useState } from "react"
import axios from 'axios'


const useGetConversations = () => {
    const [listOfConversations, setListOfConversations] = useState([])
    const [filteredListOfConversations, setFilteredListOfConversations] = useState([])

    const getConversations = async() => {
        try {
            const response = await axios.get('http://localhost:5000/getConversations', {withCredentials: true})
            const val = response.data.listOfConversations.sort((a, b) => new Date(b.last_used_at) - new Date(a.last_used_at))
            setListOfConversations(val)
            setFilteredListOfConversations(val)
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
        setFilteredListOfConversations(listOfConversations.filter(conv => ((conv.other_first_name && (conv.other_first_name).toLowerCase().startsWith(searchTerm.toLowerCase()))
        || (conv.other_last_name && (conv.other_last_name).toLowerCase().startsWith(searchTerm.toLowerCase()))
        || (conv.other_user_username && (conv.other_user_username).toLowerCase().startsWith(searchTerm.toLowerCase()))))
        .sort((a,b) => a.other_user_username.localeCompare(b.other_user_username)))
        
    }
    return {filteredListOfConversations, getConversations, filterConversations}
}

export default useGetConversations