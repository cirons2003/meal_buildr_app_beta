import axios from "axios"
import { useState, useEffect } from "react"


const useGetUserMeals = () => {
    // This will be a list of meals stored in a array sorted by datetime
    const [meals, setMeals] = useState([])
    const [mealGroupings, setMealGroupings] = useState([])
    const baseURL = "https://84cb-140-180-240-225.ngrok-free.app"

    const isValidDate = (date) => {
        if (date instanceof Date && !isNaN(date.getTime()))
            return true
        return false
    }

    useEffect(()=> {
        if(meals)
            groupMeals()
    },[meals])


    const getMealsInDateRange = async(username, teamName, start, end ) => {

        try {   
            const response = await axios.post(baseURL+'/getMeals', {start: start, end: end, username: username, teamName: teamName}, {withCredentials: true})
            console.log(response.data)
            setMeals(response.data.listOfMeals)
        }catch(err) {
            console.error(err)
        }list
    
    }

    const groupMeals = () => {
        if (meals.length === 0)
            setMealGroupings([])
        const delta = 10 * 60 * 1000 // 10 mins
        let groups = []
        let next = []
        const timeStamps = meals.map((meal)=> ({
            meal: {...meal}, timestamp: new Date(meal.logged_at).getTime()
        }))

        for (let i = 0; i < timeStamps.length; i++){
            if (next.length === 0) 
                next.push(timeStamps[i])
            else {
                if (timeStamps[i].timestamp - next[next.length-1].timestamp < delta)
                    next.push(timeStamps[i])
                else {
                    groups.push([...next])
                    next = [timeStamps[i]]
                }
            }
        }
        if (next.length > 0) 
            groups.push([...next])
        
        let listBuilder = []
        groups.map((group)=> listBuilder.push({size: group.length, meals: group.map((g)=>(g.meal))}))
        setMealGroupings(listBuilder)

        }

    return {getMealsInDateRange, mealGroupings}

}

export default useGetUserMeals