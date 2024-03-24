import { Box, Button, Flex, Text } from "@chakra-ui/react";

export default function RangeTypeSelectButton({text, rangeKey, setRangeType}) {
    return (
        <>
            <Flex as = {Button} bg = 'orange' borderRadius = '10px' justify = 'center' align = 'center' height ='40px' minWidth = '80px' onClick = {()=> {setRangeType(rangeKey)}}
            _hover = {{bg: 'gold' }} >
                <Text as = 'b'>
                    {text}
                </Text>
            </Flex>
            

        </>
    )
}