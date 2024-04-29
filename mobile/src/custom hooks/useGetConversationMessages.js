import axios from "axios"
import { useState } from "react"
import { useProxy, useSetNotificationContext } from "../context"



const useGetConversationMessages = () => {
    
    const [listOfMessages, setListOfMessages] = useState([])
    const {baseURL} = useProxy()
    const {openMessages} = useSetNotificationContext()

    const getMessages = async(conversationId) => {
        try {
            const response = await axios.post(baseURL.current + '/getMessages', {'conversation_id': conversationId}, {withCredentials: true})
            console.log('getMessages')
            openMessages(conversationId)
            setListOfMessages(response.data.listOfMessages)
        }catch(err) {
            console.error(err)
        }
    }
    return {getMessages, listOfMessages}
}

export default useGetConversationMessages