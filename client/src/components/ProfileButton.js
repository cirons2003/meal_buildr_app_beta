import { Icon, IconButton } from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import {Link as RouterLink} from 'react-router-dom'

export default function ProfileButton() {
    return (
        <IconButton as = {RouterLink} to = '/profile' icon = {<Icon as = {CgProfile}/>}/>
    )
}