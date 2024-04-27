import axios from 'axios'
import {useState} from 'react'

const useNotifications = () => {
    const baseURL = 'http://localhost:5000'
    const [listOfNotifications, setListOfNotifications] = useState(null)
    const [notificationCount, setNotificationCount] = useState(0)
    const [unreadMessageCount, setUnreadMessageCount] = useState(0)

    const handleNotificationCounts = (notifs) => {
        let total = 0
        let messages = 0

        for (let i = 0; i < notifs.length; i++) {
            if (notifs[i].is_new === true) {
                total++
                if (notifs[i].variant === 'message')
                    messages++
            }
        }
        console.log(total)
        setNotificationCount(total)
        setUnreadMessageCount(messages)
    }

    const openMessages = async(cid) => {
        try {
            const response = await axios.post(baseURL+'/resolveMessages', {conversation_id: cid}, {withCredentials: true})
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    const viewComments = async(meal_id) => {
        try {
            const response = await axios.post(baseURL+'/resolveComments', {meal_id: meal_id}, {withCredentials: true})
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }

    const getNotifications = async() => {
        try {
            const response = await axios.get(baseURL + '/getNotifications', {withCredentials: true})
            setListOfNotifications(response.data.listOfNotifications.sort((a,b)=>new Date(b.timestamp) - new Date(a.timestamp)))
            handleNotificationCounts(response.data.listOfNotifications)
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }


    return {openMessages, listOfNotifications, getNotifications, viewComments, notificationCount, unreadMessageCount}
}

export default useNotifications