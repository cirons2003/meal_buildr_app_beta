import { useState } from "react"
import axios from 'axios'
import { useProxy } from "../context"


const useConversationHandling = () => {
    const [listOfConversations, setListOfConversations] = useState([])
    const [filteredListOfConversations, setFilteredListOfConversations] = useState([])
    const [listOfMessages, setListOfMessages] = useState([])

    const {baseURL} = useProxy()

    const getConversations = async() => {
        try {
            const response = await axios.get(baseURL.current+'/getConversations', {withCredentials: true})
            setListOfConversations(response.data.listOfConversations.sort((a, b) => new Date(b.last_used_at) - new Date(a.last_used_at)))
            setFilteredListOfConversations(response.data.listOfConversations.sort((a, b) => new Date(b.last_used_at) - new Date(a.last_used_at)))
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


    const getMessages = async(conversationId) => {
        try {
            const response = await axios.post(baseURL+'/getMessages', {'conversation_id': conversationId}, {withCredentials: true})
            console.log('getMessages')
            setListOfMessages(response.data.listOfMessages)
        }catch(err) {
            console.error(err)
        }
    }

    return {filteredListOfConversations, getConversations, filterConversations, getMessages, listOfMessages}
}

export default useConversationHandling