import axios from "axios"
import { useState } from "react"
import { useProxy } from "../context"


const useGetComments = () => {

    const [listOfComments, setListOfComments] = useState([])
    const [loading, setLoading] = useState(false)

    const baseURL = useProxy()

    const getComments = async(meal_id) => {
        setLoading(true)
        try {
            const response = await axios.post(baseURL+'/getComments', 
            {meal_id: meal_id}, {withCredentials: true})
            setListOfComments(response.data.listOfComments)
            setLoading(false)
        }catch(err) {
            console.error(err)
            setLoading(false)
        }
    }
    return {listOfComments, getComments}
}

export default useGetComments