import {Flex, IconButton, useTheme, Modal, Text, ScrollView} from 'native-base'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import JoinTeamButton from './JoinTeamButton';
import useGetUserTeams from '../../../custom hooks/useGetUserTeams';
import {useEffect} from 'react'
import TeamButton from './TeamButton';
import { useTeam } from '../../../context'

export default function NameDropDown({dropDownOpen, setDropDownOpen}) {
    const theme = useTheme()
    const {listOfTeams, getTeams} = useGetUserTeams()


    useEffect(()=> {
        const clear = setTimeout(()=>getTeams(), 2000)
        return ()=> clearTimeout(clear)
    },[])
    const {team, setTeam} = useTeam()

    return (
        <Flex position = 'absolute'  justify = 'center' width = '100%' top = '100%' transform={[{ translateY: '-32%' }]}>
            <IconButton onPress = {()=>{{setDropDownOpen(!dropDownOpen); getTeams()}}} _icon = {{as: FontAwesome, name: `${dropDownOpen ? 'caret-up' : 'caret-down'}`, color: theme.colors.teal.grad2}} _pressed = {{borderRadius: '20%', backgroundColor: 'transparent',}} ></IconButton>
            <Modal isOpen = {dropDownOpen} onClose = {()=>setDropDownOpen(false)}>
                <Modal.Content bg = 'transparent' position = 'relative' width = '100%' flex = {1} >
                    <Flex position = 'absolute' align = 'center' bg = 'transparent' top = {16} width = '100%' height = '100%'>
                        <Flex py = {2} width = '100%' direction = 'column' gap = {6} align = 'center' minHeight = '20%' maxHeight = '40%' bg = {theme.colors.teal.grad3} borderRadius = {20}>
                            <Text bold color = {theme.colors.teal.grad4} fontSize = {20}>Choose Team</Text>
                            <ScrollView width = '100%'>
                                <Flex direction = 'row' flexWrap='wrap' width = '100%' gap= {2} justify = 'space-around' >
                                    {listOfTeams.map((t, index)=>(
                                        <TeamButton key = {index} teamVal = {t} setTeam = {setTeam} team = {team}/>
                                    ))}
                                </Flex>
                            </ScrollView>
                            <JoinTeamButton/>
                        </Flex>
                    </Flex>
                </Modal.Content>
            </Modal>
        </Flex>
    )
}