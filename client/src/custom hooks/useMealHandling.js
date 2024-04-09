import {useState} from 'react'
import {useUpdateEffect} from '@chakra-ui/react'



const useMealHandling = (meals) => {
    const [mealGroupings, setMealGroupings] = useState([])
    
    useUpdateEffect(()=> {
        groupMeals()
    },)

    const groupMeals = () => {
        const delta = 10 * 60 * 1000 // 10 mins
        let groups = []
        let next = []
        const timeStamps = meals.map((meal)=> ({
            ...meal, timestamp: new Date(meal.logged_at).getTime()
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
        groups.map((group)=> listBuilder.push({size: group.length, meals: group.map((g)=>(g.meals))}))
        setMealGroupings(listBuilder)

        }
        return {groupMeals, mealGroupings}
    }



export default useMealHandling