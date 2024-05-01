import axios from "axios"
import { useState } from "react"
import { useProxy } from "../context"


const useGetUserMeals = () => {
    // This will be a list of meals stored in a array sorted by datetime
    const [listOfMeals, setListOfMeals] = useState([])
    
    const baseURL = useProxy()

    const isValidDate = (date) => {
        if (date instanceof Date && !isNaN(date.getTime()))
            return true
        return false
    }

    const getMealsInDateRange = async(username, teamName, start, end ) => {
        

        try {   
            const response = await axios.post(baseURL+'/getMeals', {start: start, end: end, username: username, teamName: teamName}, {withCredentials: true})
            console.log(response.data)
            setListOfMeals(response.data.listOfMeals)
        }catch(err) {
            console.error(err)
        }
    
    }

    return {getMealsInDateRange, listOfMeals}

}

export default useGetUserMeals