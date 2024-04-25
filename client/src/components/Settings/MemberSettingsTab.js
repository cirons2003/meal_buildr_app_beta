import { Box, Flex, Text, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Input, IconButton, useUpdateEffect } from "@chakra-ui/react"
import {Link as RouterLink} from 'react-router-dom'


export default function MemberSettingsTab({member, onClose}) {
    return (
        <>
            <Flex as = {RouterLink} to = {`/settings/${member.username}`} onClick = {onClose} bg = 'white' mb = '2px' borderRadius = '0px' borderBottom = '1px' px = '8px' justify = 'space-between'>
                {(member.first_name && member.last_name)? <Text as = 'b' >{member.first_name} {member.last_name}</Text> :<Text as = 'b' >"{member.username}"</Text>}
                    
            </Flex>   
        </>
    )
}