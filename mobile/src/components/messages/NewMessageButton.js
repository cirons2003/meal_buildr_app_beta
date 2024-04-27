import {IconButton, useTheme, Modal, Text, Flex, Button, ScrollView, Pressable} from 'native-base'
import { Entypo } from '@expo/vector-icons'; 
import {useState, useEffect} from 'react'   
import SearchBar from './SearchBar';
import useGetTeamMembers from '../../custom hooks/useGetTeamMembers';
import { useTeam } from '../../context';
import {useNavigation} from '@react-navigation/native'
import NewMessagePopover from './NewMessagePopover';



export default function NewMessageButton() {
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [staff, setStaff] = useState(true)
    

    const {getTeamMembers, filterTeamMembers, filteredAthletes, filteredStaff} = useGetTeamMembers()

    const {team} = useTeam()
    const navigation = useNavigation() 

    useEffect(()=>{
        if (team?.team_name)
            getTeamMembers(team.team_name)
    },[team])

    useEffect(()=>{
        const clear = setTimeout(()=>filterTeamMembers(searchTerm))
        return ()=> clearTimeout(clear)
    }, [searchTerm])

    return (
        <>
            <IconButton onPress = {()=>setIsOpen(true)} align = 'center' borderRadius={5} _icon = {{as: Entypo, name: 'new-message', size: 7, color: theme.colors.teal.grad6}} >New Message</IconButton>
            <Modal isOpen = {isOpen} onClose = {()=>setIsOpen(false)}>
                <Modal.Content width = '70%'  marginBottom = {0} height = '70%' position = 'absolute' right = {0} >
                    <Flex direction='column' align = 'center' justify = 'start' gap = {1} py = {4} width = '100%' flex = {1}>
                        <Text mb = {4} fontSize = {24} bold color ={theme.colors.teal.grad3}>New Message</Text>
                        <SearchBar width = '95%' placeholder = 'search...' value = {searchTerm} setValue={setSearchTerm}/>
                        <Flex width = '95%' direction='row' px = {2} borderRadius={20} bg = 'lightblue' justify = 'space-between' mx = {4}>
                            <Button onPress = {() =>setStaff(true)} _text = {{color: theme.colors.teal.grad4, bold: 1}} bg = {staff ? theme.colors.teal.grad3: 'lightblue'} _pressed = {{backgroundColor: 'white', opacity: 40}} width = '44%' borderRadius = {20}>Staff</Button> 
                            <Button onPress = {() =>setStaff(false)} _text = {{color: theme.colors.teal.grad4, bold: 1}} bg = {!staff ? theme.colors.teal.grad3: 'lightblue'} _pressed = {{backgroundColor: 'white', opacity: 40}} width = '44%' borderRadius = {20}>Athletes</Button>
                        </Flex>
                        <Flex width = '95%' flex = {1} mt = {3}>
                            <ScrollView width = '100%' flex = {1}>
                                {team ? (staff ? 
                                    filteredStaff.map((mem, index)=>(
                                        <NewMessagePopover onClose = {() => setIsOpen(false)} navigation = {navigation} key = {index} mem = {mem}/>
                                    ))
                                :
                                    filteredAthletes.map((mem, index)=>(
                                        <NewMessagePopover onClose = {() => setIsOpen(false)} navigation = {navigation} key = {index} mem = {mem}/>
                                    ))
                                ):<Flex mt = {20} width = '100%' align = 'center'><Text>Select a team below username...</Text></Flex>}
                            </ScrollView>
                        </Flex>
                    </Flex>
                    
                </Modal.Content>
            </Modal>
        </>
    )
}