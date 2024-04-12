import {Center, Flex, HStack, Text, Button} from '@chakra-ui/react'
import backgroundImage from '../static/purpleBackground.avif'
import {Link} from '@chakra-ui/react'


export default function ScheduleMeetingPage() {
    return (
        <Flex  direction = 'column' justify = 'start' align = 'start' width = '100%' height = '100%' p = '40px'> 
            <Flex direction = 'column' bg = 'teal' borderRadius = '20px' px = '16px' py = '8px'>
                <Text fontSize = '30px' color = 'white' as = {Link} href = 'https://princeton.medicatconnect.com/appointment.aspx' isExternal> Schedule Meeting {`>`}</Text>
            </Flex>
        </Flex>
    );
}