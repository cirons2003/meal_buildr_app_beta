import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import {SettingsIcon} from '@chakra-ui/icons'
import NewMessageList from '../MessagesPage/NewMessageList'
import MemberSettingsTab from './MemberSettingsTab'





export default function MemberListButton({orangeScheme}) {
    const [open, setOpen] = useState(false)

    

    return (
        <>
            <Flex px = {10} as = {Button} border = '1px' borderColor = {orangeScheme ? 'transparent':'teal'} bg = {orangeScheme ? 'lightblue':'lightblue'} mb = '5px' borderRadius = '20px' onClick = {()=>setOpen(true)} justify = 'center' align = 'center' gap = '10px' mr = {orangeScheme && '20px'} >
                <Text color = {orangeScheme ? 'black':'teal'} as = 'i' fontSize = '20px'>Team Members</Text>
                <SettingsIcon color = {orangeScheme ? 'black':'teal'}/>
            </Flex>

            <Drawer
                isOpen={open}
                placement='right'
                onClose={()=>setOpen(false)}
                size = 'xs'
            >
                <DrawerOverlay />
                <DrawerContent>
                
                <DrawerHeader >
                    <Flex w = '75%' borderRadius = '20px' px = '8px' py = '3px' align = 'center'>
                        <Text color = 'teal' as = 'b' fontSize = '20px'> Team Members</Text>
                    </Flex>
                    <DrawerCloseButton color = 'teal'/>
                </DrawerHeader>
                    
                <DrawerBody flexGrow = {1} bg = ''>
                    <NewMessageList TabType = {MemberSettingsTab} onClose = {()=>setOpen(false)}/>
                </DrawerBody>

                
                </DrawerContent>
            </Drawer>
        </>
        

    )
}

