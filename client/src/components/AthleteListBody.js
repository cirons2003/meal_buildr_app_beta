import { Box } from "@chakra-ui/react"
import AthleteTab from "./AthleteTab"


export default function AthleteListBody({listOfAthletes}) {
    if (!Array.isArray(listOfAthletes))
        return <Box> No Athletes</Box>
    
    return (    
        <Box gap = '5px'>
            {listOfAthletes && listOfAthletes.map((athlete, index) => (
                <AthleteTab key = {index} athlete = {athlete}/>
            ))}
        </Box>
    )
}