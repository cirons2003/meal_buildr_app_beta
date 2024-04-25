import {Flex, Text, Image, Box} from '@chakra-ui/react'
import {useUser} from '../context'
import {HamburgerIcon} from '@chakra-ui/icons'
import {Link as RouterLink} from 'react-router-dom'
import defaultProfilePicture from '../static/istockphoto-1476170969-170667a.jpg'

export default function CurrentUserHeader() {
    const {user, setUser} = useUser()


    return (
        <Flex bg = 'orange' borderRadius = '20px' px = '15px' py = '2px' as = {RouterLink} to = 'settings' align = 'center' gap = '10px'>
            <Flex borderRadius='full' bg = 'teal' p = '1px' m = {0} align = 'center' justify = 'center'>
                <Image src = {user?.profile_picture_url ? user.profile_picture_url : defaultProfilePicture}   borderRadius='full' boxSize = '40px' objectFit='cover' />
            </Flex>
            {user? <Text as = 'b' fontSize = '20px' color = 'black'>{user.username}</Text> : 
            <Text as = 'b' fontSize = '20px' color = 'black'>no user</Text>}
        </Flex>
    )
}