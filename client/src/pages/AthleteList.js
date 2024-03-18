import { Box } from "@chakra-ui/react";
import AthleteListHeader from "../components/AthleteListHeader";
import AthleteTab from "../components/AthleteTab";
import AthleteListBody from "../components/AthleteListBody";
import { useState } from "react";

export default function AthleteList() {

    const [athletes, setAthletes] = useState([{username: 'Carson Irons'},{ username: 'Connor Irons'}])

    return (
        <>
            <Box >
                <AthleteListHeader numAthletes = {10}/>
                <AthleteListBody listOfAthletes={athletes}/>
            </Box>
        </>
    )
}