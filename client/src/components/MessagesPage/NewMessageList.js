import { useEffect, useState } from "react"
import { useTeam, useUser } from "../../context"
import useGetTeamMembers from "../../custom hooks/useGetTeamMembers"
import NewMessageListTab from "./NewMessageListTab"
import { Box, Flex, Input, useUpdateEffect } from "@chakra-ui/react"
import NewMessageToggleButton from "./NewMessageToggleButton"


export default function NewMessageList({TabType, onClose}) {

    const {team} = useTeam()
    const {getTeamMembers, filterTeamMembers, filteredStaff, filteredAthletes} = useGetTeamMembers()
    const [searchTerm, setSearchTerm] = useState('')
    const [showStaff, setShowStaff] = useState(true)

    const delay = 500

    useEffect(()=> {
        if (team) {
            getTeamMembers(team.team_name)
        }
    },[team])

    useUpdateEffect(()=> {
        const handler = setTimeout(()=> {
            
            filterTeamMembers(searchTerm)
        }, delay)
        
        return ()=> clearTimeout(handler)

    },[searchTerm])

    return (
        <Flex bg = '' direction = 'column' gap = '10px' mb = '50px' pr = '20px' height = '100%' overflow= 'hidden'>
            <Flex direction = 'column' py = '10px' gap = '10px' color = 'teal'>
                <Input height = '30px' border = '1px' borderColor = 'teal' fontSize = '15px'  type = 'text' value = {searchTerm} onChange={((e)=> setSearchTerm(e.target.value))} placeholder= 'search people...'/>
                <Flex justify='space-around' bg = 'lightblue' borderRadius = '20px'>
                    <NewMessageToggleButton onClick = {()=>setShowStaff(true)} text = 'staff' active = {showStaff}/>
                    <NewMessageToggleButton onClick = {()=>setShowStaff(false)} text = 'athletes' active = {!showStaff}/>
                </Flex>
            </Flex>
            <Flex  bg= 'cloud' overFlowY = 'auto' display= 'flex' direction = 'column' gap = '2px' flex = "1" >
                
                {showStaff ?    
                    filteredStaff.map((stf, index)=> (
                        <TabType key = {index} member = {stf} onClose = {onClose}/>
                    ))
                    :
                    filteredAthletes.map((ath, index)=> (
                        <TabType key = {index} member = {ath}  onClose = {onClose}/>
                    ))
                    
                }
            </Flex>
        </Flex>
    )
}