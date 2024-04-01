import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import {EditIcon} from '@chakra-ui/icons'
import NewMessageList from "./NewMessageList"



export default function NewMessageBar() {
    const [newMessage, setNewMessage] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Flex as = {Button} border = '1px' borderColor = 'teal' bg = 'lightblue' mb = '5px' borderRadius = '20px' onClick = {onOpen} justify = 'center' align = 'center' gap = '10px'>
                <Text color = 'teal' as = 'i' fontSize = '20px'>new message</Text>
                <EditIcon color = 'teal'/>
            </Flex>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                size = 'xs'
            >
                <DrawerOverlay />
                <DrawerContent>
                
                <DrawerHeader >
                    <Flex bg = '' w = '75%' borderRadius = '20px' px = '8px' py = '3px' align = 'center'>
                        <Text color = 'teal' as = 'b' fontSize = '20px'> New Message</Text>
                    </Flex>
                    <DrawerCloseButton color = 'teal'/>
                </DrawerHeader>
                    
                <DrawerBody flexGrow = {1} bg = ''>
                    <NewMessageList/>
                </DrawerBody>

                
                </DrawerContent>
            </Drawer>
        </>
        
    )
}
