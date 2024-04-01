import { Flex, Text } from "@chakra-ui/react";


export default function ConversationTopBar({other_username}) {
    return (
        <Flex align = 'center' height = '10%' bg = 'teal' borderRadius = '20px' px = '18px' py = '4px' mb = '15px'>
            <Text fontSize = '28px' as = 'b' color = 'lightblue'>{other_username}</Text>
        </Flex>
    )
}