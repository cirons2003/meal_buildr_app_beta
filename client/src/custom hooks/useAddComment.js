import axios from 'axios'
import { useState } from 'react';
import { useProxy } from '../context';


const useAddComment = () => {
    const [loading, setLoading] = useState(false)
    const [toggleRefresh, setToggleRefresh] = useState(false)

    const baseURL = useProxy()

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
            setToggleRefresh(!toggleRefresh)
            setLoading(false)
        }catch(err) {
            console.error(err)
            setLoading(false)
        }
    }
    return {addComment, toggleRefresh}
}

export default useAddComment