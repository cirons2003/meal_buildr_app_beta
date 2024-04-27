import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import {ArrowBackIcon} from '@chakra-ui/icons'
import SideButton from './SideButton'
import { useState } from "react";

import TeamHeader from "./TeamHeader";
import { useTeam, useUser } from "../context";
import SwitchTeamsButton from "./SwitchTeamsButton";

export default function SideBar({unreadMessageCount}) {
    const {team} = useTeam()
    const {user} = useUser()

    if (!team) 
        return (<div>loading...</div>)
    return (
        <>
            <Box w = '200px' pr = '10px' display = 'flex' flexDirection = 'column' justifyContent = 'space-between' height = '90vh'  pb = '30px'>
                <VStack pacing={3} py = '5px' > 
                    <TeamHeader/>
                    {(team.role === 'admin' || team.role === 'owner') &&
                    <>
                        <SideButton to = '/'  text = 'dashboard' icon = {ArrowBackIcon}/>
                        <SideButton to = '/athletes'  text = 'athletes' icon = {ArrowBackIcon}/>
                        <SideButton to = '/messages'  text = 'messages' icon = {ArrowBackIcon} notifCount = {unreadMessageCount}/>
                        
                    </>}
                    {team.role === 'athlete' && 
                    <>
                        <SideButton to = '/'  text = 'dashboard' icon = {ArrowBackIcon}/>
                        <SideButton to = {`/athletePage/${user.username}`}  text = 'myMeals' icon = {ArrowBackIcon}/>
                        <SideButton to = '/scheduleMeeting'  text = 'schedule meeting' icon = {ArrowBackIcon}/>
                        <SideButton to = '/messages'  text = 'messages' icon = {ArrowBackIcon}/>
                        
                    </>}

                </VStack>
                <SwitchTeamsButton/>
            </Box>
            
        </>
    )   
}