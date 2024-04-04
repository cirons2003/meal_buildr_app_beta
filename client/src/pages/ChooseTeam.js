import { Center, Flex, Text } from "@chakra-ui/react";
import SwitchTeamsButton from "../components/SwitchTeamsButton";
import backgroundImage from '../static/images.jpg'



export default function ChooseTeam() {
    return (
        <>
            <Center height = '100vh' width = '100vw' bgImage = {backgroundImage} bgPosition= 'center' bgRepeat = 'no-repeat' bgSize = 'cover'>
                <Flex direction = 'column' gap = '10px' bg = 'lightblue' px = '60px' py = '100px' borderRadius = '20px'>
                    <Text as = 'b' fontSize = '30px'>Choose a team!</Text>
                    <SwitchTeamsButton/>
                </Flex>
            </Center>
        </>
    );
}