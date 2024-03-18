import { Button, Box, Text } from '@chakra-ui/react';
import useSetActiveTeam from '../custom hooks/useSetActiveTeam';

export default function TeamButton({ teamName, userRole }) {

    const colorMap = {owner: 'gold', admin: 'red', athlete: 'green'}
    const {team, setActiveTeam} = useSetActiveTeam()


    return (
        <Button onClick = {() => setActiveTeam(teamName, userRole)} width="100%" justifyContent="space-between" colorScheme="teal">
            <Text>{teamName}</Text>
            <Box bg = {colorMap[userRole]} as="span" px={2} py={1} borderRadius="md">
                {userRole}
            </Box>
        </Button>
    );
}
