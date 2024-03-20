import {Flex, Text } from '@chakra-ui/react'
import {useUser} from '../context'
import {HamburgerIcon} from '@chakra-ui/icons'
import {Link as RouterLink} from 'react-router-dom'

export default function CurrentUserHeader() {
    const {user, setUser} = useUser()


    return (
        <Flex bg = 'orange' borderRadius = '20px' px = '15px' py = '8px' as = {RouterLink} align = 'center'>
            {user? <Text as = 'b' fontSize = '20px' color = 'black'>{user.username}</Text> : 
            <Text as = 'b' fontSize = '20px' color = 'black'>no user</Text>}
        </Flex>
    )
}