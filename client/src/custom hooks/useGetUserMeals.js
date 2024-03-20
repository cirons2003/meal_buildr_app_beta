import axios from "axios"
import { useState } from "react"


const useGetUserMeals = () => {
    // This will be a list of meals stored in a array sorted by datetime
    const [listOfMeals, setListOfMeals] = useState([])
    

    const isValidDate = (date) => {
        if (date instanceof Date && !isNaN(date.getTime()))
            return true
        return false
    }

    const getMealsInDateRange = async(username, teamName /*,start, end*/ ) => {
        /*if (!isValidDate(start) || !isValidDate(end)) {
            console.log('invalid dates')
            return
        }*/
        try {   
            const response = await axios.post('http://localhost:5000/getMeals', {start: '1', end: '2', username: username, teamName: teamName}, {withCredentials: true})
            console.log(response.data)
            setListOfMeals(response.data.listOfMeals)
        }catch(err) {
            console.error(err)
        }
    
    }

    return {getMealsInDateRange, listOfMeals}

}

export default useGetUserMeals