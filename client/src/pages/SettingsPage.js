import {Flex, Text, Input, Image, IconButton, Button} from '@chakra-ui/react'
import UserInfoDisplay from '../components/Profile/UserInfoDisplay'



export default function SettingsPage() {


    return (
        <Flex width = '100%' height = '100%' justify = 'start' align = 'start' direction = 'column' p = {10}>
            <Flex width = '100%'>
                <UserInfoDisplay />
            </Flex> 
        </Flex>
    )
}

/*<b>Settings</b>
            <h1>This page will have functionality to choose profile picture, change username, add bio, etc</h1>
            <h1> This page will also provide owners with access to owner dashboard </h1>*/