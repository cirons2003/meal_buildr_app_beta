import axios from "axios"
import { useState } from "react"
import { useProxy } from "../context"



const useSendMessage = () => {
    const baseURL = useProxy()

    const [cid, setCid] = useState(-1)
    const [refreshToggle, setRefreshToggle] = useState(false)
    const [noConvo, setNoConvo] = useState(false)

    const sendMessageWithUser = async(message_text, recipient_id) => {
        message_text = message_text.trim()
        if (message_text === '')
            message_text = 'doNotSendMessage' 
        try {
            const response = await axios.post(baseURL+'/sendMessage', {message_text: message_text, recipient_id: recipient_id}, {withCredentials: true})
            console.log(response.data)
            setCid(response.data.conversation_id)
            setRefreshToggle(!refreshToggle)
        }catch(err) {
            console.error(err)
        }
    }

    const sendMessageWithConversation = async(message_text, conversation_id) => {
        message_text = message_text.trim()
        if (message_text === '')
            return
        try {
            const response = await axios.post(baseURL+'/sendMessage', {message_text: message_text, conversation_id: conversation_id}, {withCredentials: true})
            console.log(response.data)
            setCid(response.data.conversation_id)
            setRefreshToggle(!refreshToggle)
        }catch(err) {
            console.error(err)
        }
    }  

    return {cid, sendMessageWithUser, sendMessageWithConversation, refreshToggle, noConvo}
}

export default useSendMessage