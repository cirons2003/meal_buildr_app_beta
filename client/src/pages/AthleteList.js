import { Box } from "@chakra-ui/react";
import AthleteListHeader from "../components/AthleteListHeader";
import AthleteTab from "../components/AthleteTab";

export default function AthleteList() {
    return (
        <>
            <Box >
                <AthleteListHeader numAthletes = {10}/>
                <AthleteTab username='username'/>
            </Box>
        </>
    )
}