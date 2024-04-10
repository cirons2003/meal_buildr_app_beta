import { Center, Flex, Text } from "@chakra-ui/react";
import SwitchTeamsButton from "../components/SwitchTeamsButton";
import backgroundImage from '../static/images.jpg'


export default function ChooseTeam() {

    return (
        <>
            <Center height = '100vh' width = '100vw' bgImage = {backgroundImage} bgPosition= 'center' bgRepeat = 'no-repeat' bgSize = 'cover'>
                <Flex direction = 'column' gap = '60px' bg = 'lightblue' px = '60px' pt = '80px' pb = '80px' borderRadius = '20px' minWidth = '15%'>
                    <Text as = 'b' fontSize = '30px'>{`Choose a team!`}</Text>
                    <SwitchTeamsButton text = 'Select Team!'/>
                </Flex>
            </Center>
        </>
    );
}