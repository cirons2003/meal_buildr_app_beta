import { Box, Flex, Text} from "@chakra-ui/react";
import SearchBar from "./SearchBar";


export default function AthleteListHeader({numAthletes, searchTerm, setSearchTerm}) {
    return (
        <Flex align = 'center' bg = ''w = '100%' h = '60px' justify = 'space-between' mb = '20px'>
            <Flex bg = 'teal' width = '100%' justify = 'space-between' align = 'center' px = '12px' py = '10px' borderRadius = '0px'>
                <Box bg = 'lightblue' px = '8px' py = '2px' borderRadius = '20px'>
                    <Text as = 'b' fontSize = '25px' color = 'teal'>Athletes ({numAthletes})</Text>
                </Box>
                <SearchBar searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
            </Flex>
            
        </Flex>
    )
}