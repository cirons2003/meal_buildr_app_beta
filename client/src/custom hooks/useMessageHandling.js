import { useEffect, useState } from "react"


const useMessageHandling = (message, user_username) => {
    const [myMessage, setMyMessage] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(()=> {
        if(message && user_username) {
            setMyMessage(message.sender_username === user_username)
        }
    },[message, user_username])

    useEffect(()=> {
        if (myMessage === true) {
            setUsername('Me')
        }
        else {
            if (message) {
                setUsername(message.sender_username)
            }
        }
    },[myMessage])
    
    return {myMessage, username}
}


export default useMessageHandling