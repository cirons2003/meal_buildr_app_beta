import { useParams } from "react-router-dom"
import useGetUserMeals from "../custom hooks/useGetUserMeals"
import { useEffect, useState } from "react"
import { useTeam } from "../context"
import { Box } from "@chakra-ui/react"


export default function AthletePage() {
    const {athleteName} = useParams()
    const {listOfMeals, getMealsInDateRange} = useGetUserMeals()
    const [meals, setMeals] = useState([])
    const {team} = useTeam()

    

    useEffect(()=>{
        if (team && athleteName !== '')
            getMealsInDateRange(athleteName, team.team_name)
    }
    ,[team, athleteName])

    if (!team) 
        return (<div>loading...</div>)

    return (
        <>
            <h1> hello </h1>
            {listOfMeals.map((meal, index) => (
                <Box index = {index}>
                    <h1>{meal.logged_at}</h1>
                    <p>{meal.description}</p>
                </Box>
            ))}
        </>
    )
}