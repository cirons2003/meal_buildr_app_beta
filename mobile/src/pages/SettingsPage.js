import { Flex, IconButton, Text, useTheme, Pressable, Button, Avatar, Input} from "native-base";
import { useUser } from "../context";
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import useUserAuth from "../custom hooks/useUserAuth";
import {useState, useEffect} from 'react'
import LogOutUserAlert from '../components/LogOutUserAlert'
import defaultProfilePicture from '../static/download.png'
import useUserInfo from '../custom hooks/useUserInfo'


export default function SettingsPage() {
    const {user} = useUser()
    const theme = useTheme()
    const navigation = useNavigation()
    const {logoutUser} = useUserAuth()
    const [logOutOpen, setLogOutOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const {changeUserInfo} = useUserInfo() 

    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newBio, setNewBio] = useState('')
    const [newImage, setNewImage] = useState(null)
    const [stagedImageURL, setStagedImageURL] = useState('')


    useEffect(()=> {
        reset()
    },[user])

    const reset = () => {
        if (user) {
            setNewFirstName(user.first_name)
            setNewLastName(user.last_name)
            setNewBio(user.bio)
            setNewImage(user.profile_picture_url)
        }
    }

    const handleChanges = () => {
        changeUserInfo(newFirstName, newLastName, newBio)
        reset()
        setEditMode(false)
    }
    

    return (
        <>
        <Flex bg = {theme.colors.lightgrey} width = '100%' flex = {1} justify = 'start' align = 'center'>
            {!editMode ?
                <>
                <Pressable width = '100%'  onPress = {()=>navigation.navigate('Home')}>
                    <Flex direction = 'row' justify = 'center' align = 'center' width = '100%'>
                        <IconButton onPress = {()=>navigation.navigate('Home')} _pressed = {{backgroundColor: 'transparent'}} _icon = {{as: Feather, name: 'chevrons-down', size: 8, color: theme.colors.darkgrey}}/>
                    </Flex>
                </Pressable>
                <Flex  py = {5} pb = {12} gap = {2} width = '80%' justify = 'start' align= 'center' pos = 'relative'>
                    <Avatar size = {40} source = {user?.profile_picture_url ? {uri: user.profile_picture_url} : defaultProfilePicture}/>
                    <Text bold fontSize = {30}>{user?.username}</Text>
                    <Text fontSize = {15}>{user?.first_name ? user.first_name : 'N/a'} {user?.last_name ? user.last_name : 'N/a'}</Text>
                    <Text bold>{user?.bio  ? user.bio : '(Insert Bio)'}</Text>
                    <IconButton onPress = {()=> setEditMode(true)} _pressed = {{backgroundColor: 'transparent', opacity: 60}} style = {{position: 'absolute', right: 40}} _icon = {{as: Feather, name: 'edit', size: 8, color: theme.colors.teal.grad3}}/>
                </Flex>
                </>
                :
                <>
                <Pressable width = '100%'  onPress = {()=>navigation.navigate('Home')}>
                    <Flex direction = 'row' justify = 'center' align = 'center' width = '100%'>
                        <IconButton onPress = {()=>navigation.navigate('Home')} _pressed = {{backgroundColor: 'transparent'}} _icon = {{as: Feather, name: 'chevrons-down', size: 8, color: theme.colors.darkgrey}}/>
                    </Flex>
                </Pressable>
                <Flex gap = {5} width = '80%' justify = 'start' align= 'center' pos = 'relative'>
                    <Avatar size = {40} source = {user?.profile_picture_url ? {uri: user.profile_picture_url} : defaultProfilePicture}/>
                    <Text bold fontSize = {30}>{user?.username}</Text>
                    <Flex width = '100%' align = 'center' justify = 'space-between' direction = 'row'>
                        <Input width = '47%' type = 'text' onChangeText={setNewFirstName} value = {newFirstName} fontSize = {15}/>
                        <Input width = '47%' type = 'text' onChangeText={setNewLastName} value = {newLastName} fontSize = {15}/>
                    </Flex>
                    <Flex borderBottomColor={theme.colors.darkgrey} borderBottomWidth={2} width = '100%'></Flex>
                    <Input type = 'text' onChangeText={setNewBio} value = {newBio}/>
                    <Flex borderBottomColor={theme.colors.darkgrey} borderBottomWidth={2} width = '100%'></Flex>
                    {!editMode && <IconButton onPress = {()=> setEditMode(true)} _pressed = {{backgroundColor: 'transparent', opacity: 60}} style = {{position: 'absolute', right: 40}} _icon = {{as: Feather, name: 'edit', size: 8, color: theme.colors.teal.grad3}}/>}
                    <Flex direction = 'row' width = '100%' align = 'center' justify = 'space-between'>
                        <Button onPress = {()=>setEditMode(false)} bg = 'darkgrey' width = '47%'>Cancel</Button>
                        <Button onPress = {handleChanges} width = '47%'>Save</Button>
                    </Flex> 
                </Flex>
                </>
                }
            <Flex safeAreaBottom width = '100%' flex = {1} justify = 'flex-end' align = 'center'>
                    <Button onPress = {logoutUser} width = '100%' bg = {theme.colors.TeamButton.admin} _pressed = {{opacity: 40, backgroundColor: theme.colors.TeamButton.admin}}>Log Out</Button>
                    {/*<LogOutUserAlert onConfirm = {logoutUser} alertOpen={logOutOpen} setAlertOpen={setLogOutOpen}/>*/}
            </Flex>
        </Flex>
    </>
    )
}