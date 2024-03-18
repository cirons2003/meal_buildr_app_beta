import { Flex, Heading } from "@chakra-ui/react";
import SearchBar from "./SearchBar";


export default function AthleteListHeader({numAthletes}) {
    return (
        <Flex align = 'center' bg = '' px = '10px' py = '5px' w = '100%' h = '60px' justify = 'space-between'>
            <Heading>Athletes ({numAthletes})</Heading>
            <SearchBar/>
        </Flex>
    )
}