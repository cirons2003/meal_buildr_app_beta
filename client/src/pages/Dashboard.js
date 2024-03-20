import { Button } from "@chakra-ui/react"
import useLogoutUser from "../custom hooks/useLogoutUser"
import useSetActiveTeam from "../custom hooks/useSetActiveTeam"
import { useTeam } from "../context"
import useGetUserMeals from "../custom hooks/useGetUserMeals"

export default function DashBoard() {
    const {logout} = useLogoutUser()
    const {team} = useTeam()
    const {getMealsInDateRange} = useGetUserMeals()
    
    return  (
        <>
            <button onClick = {()=>logout()}>Log Out</button>
            <br/>   
            <h1>{team ? team?.team_name : 'No team'}</h1>
            <h1>{team ? team?.role : ''}</h1>
            <button onClick = {()=> getMealsInDateRange('John Doe','Air Force Falcons')}>click</button>
            <br/>
            
        </>
    )
}