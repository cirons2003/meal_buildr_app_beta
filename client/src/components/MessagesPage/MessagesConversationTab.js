import { Box, Flex, Icon, Text, Button } from "@chakra-ui/react";
import {ChatIcon, DeleteIcon} from '@chakra-ui/icons'


export default function MessagesConversationTab({contact}) {
    return (
        <Box  width = '100%' as = {Button} bg = 'white' display = 'flex' flexDirection= 'column' mb = '10px' py = '5px' px = '10px' border = '1px' borderColor = 'black' borderRadius = '10px'>
            
            <Flex maxWidth = '100%'>
                <Flex maxWidth = '95%'  justify = 'start'  align = 'center'  gap = '10px'  >
                    <Flex  justify = 'center' width = '150px' gap = '10px' align = 'center' bg = 'teal' px = '10px' py = '5px' borderRadius = '10px'>
                        <Box bg = 'teal' borderRadius = '10px' color = 'white'>
                            <ChatIcon/>
                        </Box>
                        <Text textOverflow = 'ellipsis' overflow = 'hidden' maxWidth = '75%' color = 'white' as = 'b'  >{contact.username}</Text>
                    </Flex>
                    <Flex ml = '10px' maxWidth = '85%'>
                        <Text w = '100%' color = 'black' as = 'i' overflow = 'hidden' whiteSpace= 'nowrap' textOverflow= 'ellipsis'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
                    </Flex>
                </Flex>
                <Box bg = 'teal' borderRadius = '10px' color = 'white' px = '5px' pt = '2px'>
                    <DeleteIcon/>
                </Box>
            </Flex>
        </Box>
    )
}