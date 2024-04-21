import { useState } from "react"
import axios from 'axios'
import { useProxyProvider } from "../context"


const useConversationHandling = () => {
    const [listOfConversations, setListOfConversations] = useState([])
    const [filteredListOfConversations, setFilteredListOfConversations] = useState([])
    const [listOfMessages, setListOfMessages] = useState([])

    const baseURL = 'https://8205-140-180-240-233.ngrok-free.app'//const {baseURL} = useProxyProvider()

    const getConversations = async() => {
        try {
            const response = await axios.get(baseURL+'/getConversations', {withCredentials: true})
            setListOfConversations(response.data.listOfConversations.sort((a, b) => new Date(b.last_used_at) - new Date(a.last_used_at)))
            setFilteredListOfConversations(response.data.listOfConversations.sort((a, b) => new Date(b.last_used_at) - new Date(a.last_used_at)))
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


    const getMessages = async(conversationId) => {
        try {
            const response = await axios.post(baseURL+'/getMessages', {'conversation_id': conversationId}, {withCredentials: true})
            setListOfMessages(response.data.listOfMessages)
            console.log(response.data.listOfMessages)
        }catch(err) {
            console.error(err)
        }
    }

    return {filteredListOfConversations, getConversations, filterConversations, getMessages, listOfMessages}
}

export default useConversationHandling