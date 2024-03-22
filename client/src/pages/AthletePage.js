import { useParams } from "react-router-dom"
import useGetUserMeals from "../custom hooks/useGetUserMeals"
import { useEffect, useState } from "react"
import { useTeam } from "../context"
import { Box } from "@chakra-ui/react"
import useDateHandling from "../custom hooks/useDateHandling"
import { CgFormatJustify } from "react-icons/cg"


export default function AthletePage() {

    const {athleteName} = useParams()
    const {listOfMeals, getMealsInDateRange} = useGetUserMeals()
    const {team} = useTeam()

    const {
        rangeType, targetDate, startDate, endDate,
        incrementDateDay, decrementDateDay,
        incrementDateMonth, decrementDateMonth, 
        incrementDateWeek, decrementDateWeek,
        changeRangeType
    } = useDateHandling()
    


    // getMeals in specified range 
    useEffect(()=>{
        if (team && athleteName !== '')
            getMealsInDateRange(athleteName, team.team_name, startDate, endDate)
    }
    ,[team, athleteName, startDate, endDate])

    if (!team) 
        return (<div>loading...</div>)

    return (
        <>
            <h1> hello </h1>
            <h2>{new Date(targetDate).toLocaleString()}</h2>
            <button onClick = {() => incrementDateDay()}>day+</button>
            <button onClick = {() => decrementDateDay()}>day-</button>
            <br/>
            <button onClick = {() => changeRangeType(0)}>0</button>
            <button onClick = {() => changeRangeType(1)}>1</button>
            <h1>{rangeType}</h1>
            <br> 
            </br>
            {listOfMeals.map((meal, index) => (
                <Box key = {index}>
                    <h1>{new Date(meal.logged_at).toLocaleString()}</h1>
                    <p>{meal.description}</p>
                </Box>
            ))}
        </>
    )
}