import { Button } from "@chakra-ui/react"
import useLogoutUser from "../custom hooks/useLogoutUser"
import useSetActiveTeam from "../custom hooks/useSetActiveTeam"
import { useTeam } from "../context"

export default function DashBoard() {
    const {logout} = useLogoutUser()
    const {team} = useTeam()
    
    return  (
        <>
            <button onClick = {()=>logout()}>Log Out</button>
            <br/>   
            <h1>{team ? team.team_name : 'No team'}</h1>
            <h1>{team ? team.role : ''}</h1>
        </>
    )
}