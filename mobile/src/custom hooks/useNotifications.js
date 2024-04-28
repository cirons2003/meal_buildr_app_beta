

import axios from 'axios'
import {useCallback, useState} from 'react'
import { useProxy, useNotificationContext } from '../context'


const useNotifications = () => {
    const {baseURL} = useProxy()
    const [listOfNotifications, setListOfNotifications] = useState(null)
    const { setNotificationCount, setUnreadMessageCount} = useNotificationContext()

    const handleNotificationCounts = useCallback((notifs) => {
        let total = 0
        let messages = 0

        for (let i = 0; i < notifs.length; i++) {
            if (notifs[i].is_new === true) {
                total++
                if (notifs[i].variant === 'message')
                    messages++
            }
        }
        setNotificationCount(0 + total)
        setUnreadMessageCount(0 + messages)
    },[])

    const getNotifications = useCallback(async() => {
        try {
            const response = await axios.get(baseURL.current + '/getNotifications', {withCredentials: true})
            setListOfNotifications(response.data.listOfNotifications.sort((a,b)=>new Date(b.timestamp) - new Date(a.timestamp)))
            handleNotificationCounts(response.data.listOfNotifications)
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    },[baseURL, handleNotificationCounts])


    const openMessages = useCallback(async(cid) => {
        try {
            const response = await axios.post(baseURL.current+'/resolveMessages', {conversation_id: cid}, {withCredentials: true})
            getNotifications()
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    },[baseURL, getNotifications])

    const viewComments = useCallback(async(meal_id) => {
        try {
            const response = await axios.post(baseURL.current+'/resolveComments', {meal_id: meal_id}, {withCredentials: true})
            getNotifications()
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    },[baseURL, getNotifications])

    
    

    return {openMessages, listOfNotifications, getNotifications, viewComments}
}

export default useNotifications