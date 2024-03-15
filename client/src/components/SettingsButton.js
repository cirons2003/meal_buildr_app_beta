import { SettingsIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import {Link as RouterLink} from 'react-router-dom'

export default function SettingsButton() {
    return ( 
        <IconButton as = {RouterLink} icon = {<SettingsIcon/>} to = {'/settings'}/>
    )
}