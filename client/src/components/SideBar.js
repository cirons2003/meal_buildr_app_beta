import { Box, VStack, Text, Heading } from "@chakra-ui/react";
import {ArrowBackIcon} from '@chakra-ui/icons'
import SideButton from './SideButton'
import { useState } from "react";

import TeamHeader from "./TeamHeader";
import { useTeam } from "../context";
import SwitchTeamsButton from "./SwitchTeamsButton";

export default function SideBar() {
    const {team, setTeam} = useTeam()
    
    return (
        <>
            <Box w = '200px' pr = '10px' display = 'flex' flexDirection = 'column' justifyContent = 'space-between' height = '90vh'  pb = '20px'>
                <VStack pacing={3} py = '5px' > 
                    <TeamHeader/>
                    {team.role === 'admin' || team.role === 'owner' &&
                    <>
                        <SideButton to = '/'  text = 'dashboard' icon = {ArrowBackIcon}/>
                        <SideButton to = '/athletes'  text = 'athletes' icon = {ArrowBackIcon}/>
                    </>}
                    {team.role === 'athlete' && 
                    <>
                        <SideButton to = '/'  text = 'dashboard' icon = {ArrowBackIcon}/>
                        <SideButton to = '/meals'  text = 'myMeals' icon = {ArrowBackIcon}/>
                    </>}
                </VStack>
                <SwitchTeamsButton/>
            </Box>
            
        </>
    )   
}