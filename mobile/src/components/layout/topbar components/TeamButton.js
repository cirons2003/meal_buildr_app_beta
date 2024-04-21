import {Pressable, Flex, Text, useTheme} from 'native-base' 
import AsyncStorage from '@react-native-async-storage/async-storage'    
import {useTeam} from '../../../context'

export default function TeamButton({teamVal, setTeam, team}) {
    const theme = useTheme()

    const colorMap = {owner: theme.colors.TeamButton.owner, admin: theme.colors.TeamButton.admin, athlete: theme.colors.TeamButton.athlete}
    
    const setActiveTeam = () => {
        setTeam(teamVal)
        AsyncStorage.setItem('team', JSON.stringify(teamVal))
    }
    
    const selected = (team.team_name == teamVal.team_name && team.role == teamVal.role)

    return (
        <Pressable onPress = {()=> setActiveTeam()} _pressed = {{opacity: 40}}>
            <Flex  borderRadius = {20} justify = 'center' p = {3} width = {40} borderWidth = {1} borderColor = {`${selected ? theme.colors.gold:'transparent'}`} direction = 'column' height = {12} bg = {selected ? theme.colors.teal.grad4 : theme.colors.teal.grad6}>
                <Text bold fontSize= {15} color = {selected? theme.colors.white: theme.colors.teal.grad4} isTruncated numberOfLines={1}>{teamVal.team_name}</Text>
                <Text bold underline color = {selected ? theme.colors.white : colorMap[teamVal.role]}>{teamVal.role}</Text>
            </Flex>
        </Pressable>
    )
}