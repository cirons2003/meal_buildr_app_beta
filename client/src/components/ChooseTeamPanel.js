import { Box, Button, Text, Flex } from "@chakra-ui/react"
import useGetUserTeams from "../custom hooks/useGetUserTeams"
import {Link as RouterLink} from 'react-router-dom'
import { useEffect } from "react"
import TeamButton from "./TeamButton"
import useSetActiveTeam from "../custom hooks/useSetActiveTeam"
import useLogoutUser from "../custom hooks/useLogoutUser"




export default function ChooseTeamPanel() {
    const {loading, listOfTeams, getTeams} = useGetUserTeams()
    const {logout} = useLogoutUser()


    useEffect(()=>{
        getTeams()
    },[])

    useEffect(()=>{
        console.log(listOfTeams)
    },[listOfTeams])
    

    function TeamOptions() {
        
        return(
            <Flex direction = 'column' align = 'center' justify='space-between' height = '100%' p = {0} m = {0} pb = {10}>
                <Box display = 'flex' flexDirection = 'column' gap = '10px' width = '100%' m = {0} p = {0}>
                    {(listOfTeams && listOfTeams.length > 0)? Array.isArray(listOfTeams) &&
                        listOfTeams.map((team) =>(
                        <TeamButton teamName = {team.team_name} userRole = {team.role}/>
                    ))
                    : <Flex align = 'center' justify = 'center' mt = {5} ><Text as= 'b' >No teams found...</Text></Flex>}
                    <br/>
                    
                    <Button bg = 'magenta' as = {RouterLink} to = '/joinTeam'>Join Team</Button>
                </Box>

                <Button bg = 'red' color = 'white' onClick = {()=>logout()}>Log Out </Button>
            </Flex>
        )
    }

    return (
        <>
            {!loading ? <TeamOptions/> : <h1>loading</h1>}
        </>
    )
}