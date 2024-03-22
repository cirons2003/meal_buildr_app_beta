import { Box } from "@chakra-ui/react";
import AthleteListHeader from "../components/AthleteListHeader";
import AthleteTab from "../components/AthleteTab";
import AthleteListBody from "../components/AthleteListBody";
import { useEffect, useState } from "react";
import useGetAthleteList from "../custom hooks/useGetAthleteList";

export default function AthleteList() {


    const {listOfAthletes, getAthleteList} = useGetAthleteList()
    
    useEffect(() => {
        getAthleteList('Carson123', 'Princeton Tigers')
    },[])

    return (
        <>
            <Box >
                <AthleteListHeader numAthletes = {10}/>
                <AthleteListBody listOfAthletes={listOfAthletes}/>  
                {console.log(listOfAthletes)}        
            </Box>
        </>
    )
}