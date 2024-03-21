import { useParams } from "react-router-dom"
import useGetUserMeals from "../custom hooks/useGetUserMeals"
import { useEffect, useState } from "react"
import { useTeam } from "../context"
import { Box } from "@chakra-ui/react"


export default function AthletePage() {
    const {athleteName} = useParams()
    const {listOfMeals, getMealsInDateRange} = useGetUserMeals()
    const {team} = useTeam()
    

    const startDate = new Date('2023-03-20').toISOString()
    const endDate = new Date().toISOString()

    useEffect(()=>{
        if (team && athleteName !== '')
            getMealsInDateRange(athleteName, team.team_name, startDate, endDate)
    }
    ,[team, athleteName])

    if (!team) 
        return (<div>loading...</div>)

    return (
        <>
            <h1> hello </h1>
            {listOfMeals.map((meal, index) => (
                <Box key = {index}>
                    <h1>{meal.logged_at}</h1>
                    <p>{meal.description}</p>
                </Box>
            ))}
        </>
    )
}