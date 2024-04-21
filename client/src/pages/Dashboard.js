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
            
            <h1>This page will have some useful statistics</h1>
            <Button bg = 'red' mt = {1} onClick = {()=>logout()}>Log Out</Button>
            
        </>
    )
}