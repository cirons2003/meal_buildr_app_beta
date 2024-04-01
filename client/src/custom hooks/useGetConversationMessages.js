import axios from "axios"
import { useState } from "react"



const useGetConversationMessages = () => {
    
    const [listOfMessages, setListOfMessages] = useState([])

    const getMessages = async(conversationId) => {
        try {
            const response = await axios.post('http://localhost:5000/getMessages', {'conversation_id': conversationId}, {withCredentials: true})
            setListOfMessages(response.data.listOfMessages)
            console.log(response.data.listOfMessages)
        }catch(err) {
            console.error(err)
        }
    }
    return {getMessages, listOfMessages}
}

export default useGetConversationMessages