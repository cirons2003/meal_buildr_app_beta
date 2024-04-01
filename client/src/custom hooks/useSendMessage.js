import axios from "axios"
import { useState } from "react"



const useSendMessage = () => {

    const [cid, setCid] = useState(-1)

    const sendMessageWithUser = async(message_text, recipient_id) => {
        console.log({recipient_id})
        message_text = message_text.trim()
        if (message_text === '')
            return 
        try {
            const response = await axios.post('http://localhost:5000/sendMessage', {message_text: message_text, recipient_id: recipient_id}, {withCredentials: true})
            console.log(response.data)
            setCid(response.data.conversation_id)
        }catch(err) {
            console.error(err)
        }
    }

    const sendMessageWithConversation = async(message_text, conversation_id) => {
        message_text = message_text.trim()
        if (message_text === '')
            return 
        try {
            const response = await axios.post('http://localhost:5000/sendMessage', {message_text: message_text, conversation_id: conversation_id}, {withCredentials: true})
            console.log(response.data)
            setCid(response.data.conversation_id)
        }catch(err) {
            console.error(err)
        }
    }  

    return {cid, sendMessageWithUser, sendMessageWithConversation}
}

export default useSendMessage