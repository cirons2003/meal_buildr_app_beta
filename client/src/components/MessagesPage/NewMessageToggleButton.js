import { Box, Text, Button } from "@chakra-ui/react";


export default function NewMessageToggleButton({text, active, onClick }) {
    return (
        <Box as = {Button}
            onClick = {onClick}
            bg = {active ? 'teal' : 'lightblue'}
            width = '100px'
            borderRadius='20px'
            
        >
           <Text as = 'b'>{text}</Text>
        </Box>
    )
}