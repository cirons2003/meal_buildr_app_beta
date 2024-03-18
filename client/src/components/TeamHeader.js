import { Box , Text} from "@chakra-ui/react";



export default function TeamHeader({team}) {
    return (
        <>
            <Box mb = '15px' bg = '' pl = '10px' w = '100%'>
                <Text fontSize = 'xl' as = 'b' color = 'tomato'>{team ? team.name : 'Princeton Tigers'}</Text>  
            </Box>
        </>
    )
}