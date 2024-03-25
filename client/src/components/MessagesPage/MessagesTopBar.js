import { Box, Flex, Text } from "@chakra-ui/react";
import SearchBar from "../SearchBar";


export default function MessagesTopBar() {
    return (
        <>
            <Flex justify = 'space-between' bg= 'teal' p = '10px' mb = '10px'>
                <Box bg = 'lightblue' px = '10px' py = '3px' borderRadius = '20px' >
                    <Text as = 'b' color = 'teal' fontSize = '20px' >Messages</Text>  
                </Box>
                <SearchBar/>
            </Flex>
        </>
    )
}