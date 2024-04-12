import axios from "axios"
import { useState } from "react"


const useCommentHandling = () => {

    const baseURL = 'https://84cb-140-180-240-225.ngrok-free.app'

    const [listOfComments, setListOfComments] = useState([])
    const [loading, setLoading] = useState(false)

    const getComments = async(meal_id) => {
        setLoading(true)
        try {
            const response = await axios.post(baseURL + '/getComments', 
            {meal_id: meal_id}, {withCredentials: true})
            setListOfComments(response.data.listOfComments)
            console.log(response.data)
            setLoading(false)
        }catch(err) {
            console.error(err)
            setLoading(false)
        }
    }

    const addComment = async(comment_text, meal_id) => {
        if (comment_text.trim() === '') {
            return;
        }
        setLoading(true)
        try {
            const response = await axios.post(baseURL+'/addComment', {
                comment_text: comment_text, meal_id: meal_id
            }, {withCredentials: true})
            console.log(response.data)
            setLoading(false)
            getComments(meal_id)
        }catch(err) {
            console.error(err)
            setLoading(false)
        }
    }


    return {listOfComments, getComments, addComment}
}

export default useCommentHandling