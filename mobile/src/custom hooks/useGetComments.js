import axios from "axios"
import { useState } from "react"


const useGetComments = () => {

    const [listOfComments, setListOfComments] = useState([])
    const [loading, setLoading] = useState(false)

    const getComments = async(meal_id) => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/getComments', 
            {meal_id: meal_id}, {withCredentials: true})
            setListOfComments(response.data.listOfComments)
            console.log(response.data)
            setLoading(false)
        }catch(err) {
            console.error(err)
            setLoading(false)
        }
    }
    return {listOfComments, getComments}
}

export default useGetComments