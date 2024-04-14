import {IconButton, useTheme, Modal, Text, Flex, Button, ScrollView, Pressable} from 'native-base'
import { Entypo } from '@expo/vector-icons'; 
import {useState, useEffect} from 'react'   
import SearchBar from './SearchBar';
import useGetTeamMembers from '../../custom hooks/useGetTeamMembers';



export default function NewMessageButton() {
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [staff, setStaff] = useState(true)
    

    const {getTeamMembers, filterTeamMembers, filteredAthletes, filteredStaff} = useGetTeamMembers()

    useEffect(()=>{
        getTeamMembers('Princeton Tigers')
    },[])

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
                                {staff ? 
                                    filteredStaff.map((mem, index)=>(
                                        <Pressable onPress = {()=>{}} _pressed = {{ borderRadius: 20, opacity: 30}} width = '100%' key = {index}>
                                            <Flex mb = {2} p = {2} width= '100%' height = {8} borderColor={theme.colors.teal.grad3} borderBottomWidth={1} borderRadius={20} borderLeftWidth={1}>
                                                <Text bold color = {theme.colors.teal.grad3} fontSize = {12}>{mem.username}</Text>
                                            </Flex>
                                        </Pressable>
                                    ))
                                :
                                    filteredAthletes.map((mem, index)=>(
                                        <Pressable onPress = {()=>{}} _pressed = {{ borderRadius: 20, opacity: 30}} width = '100%' key = {index}>
                                            <Flex mb = {2} p = {2} width= '100%' height = {8} borderColor={theme.colors.teal.grad3} borderBottomWidth={1} borderRadius={20} borderLeftWidth={1}>
                                                <Text bold color = {theme.colors.teal.grad3} fontSize = {12}>{mem.username}</Text>
                                            </Flex>
                                        </Pressable>
                                        
                                    ))
                                }
                            </ScrollView>
                        </Flex>
                    </Flex>
                    
                </Modal.Content>
            </Modal>
        </>
    )
}