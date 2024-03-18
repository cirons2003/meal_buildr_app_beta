import { Box, Button } from "@chakra-ui/react"
import useGetUserTeams from "../custom hooks/useGetUserTeams"
import {Link as RouterLink} from 'react-router-dom'
import { useEffect } from "react"
import TeamButton from "./TeamButton"
import useSetActiveTeam from "../custom hooks/useSetActiveTeam"




export default function ChooseTeamPanel() {
    const {loading, listOfTeams, getTeams} = useGetUserTeams()
    


    useEffect(()=>{
        getTeams()
    },[])

    useEffect(()=>{
        console.log(listOfTeams)
    },[listOfTeams])
    

    function TeamOptions() {
        
        return(
            <>
                <Box display = 'flex' flexDirection = 'column' gap = '10px'>
                    {listOfTeams && Array.isArray(listOfTeams) &&
                        listOfTeams.map((team) =>(
                        <TeamButton teamName = {team.team_name} userRole = {team.role}/>
                    ) )}
                    <br/>
                    
                <Button bg = 'magenta' as = {RouterLink} to = '/joinTeam'>Join Team</Button>
                </Box>
            </>
        )
    }

    return (
        <>
            {!loading ? <TeamOptions/> : <h1>loading</h1>}
        </>
    )
}