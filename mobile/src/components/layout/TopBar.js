import {Flex, Text, IconButton, useTheme} from 'native-base'
import {useSafeArea} from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons';
import LogOutUserAlert from '../LogOutUserAlert'
import useUserAuth from '../../custom hooks/useUserAuth';
import { useState } from 'react';
import { useUser } from '../../context';


export default function TopBar({activePicture}) {
    const theme = useTheme()
    const insets = useSafeArea();

    if(activePicture)
        return (<></>)
    
    const {logoutUser} = useUserAuth()
    const [logOutOpen, setLogOutOpen] = useState(false)
    const {user} = useUser()

    return (
        <Flex direction = 'row' gap = {10} justify = 'start' align = 'center' bg= 'transparent' position = 'absolute' top = {insets.top} left = {0} width = '100%' zIndex={1001} p = {3}>
            
            <IconButton  onPress = {()=>setLogOutOpen(true)}borderRadius = {40} _icon = {{as: FontAwesome5, name: 'user-circle', size: 10, color: theme.colors.teal.grad4}} />     
            <Text color = {theme.colors.teal.grad2} fontSize = {35}>{user.username ? user.username : 'no username'}</Text>
            <LogOutUserAlert onConfirm = {logoutUser} alertOpen={logOutOpen} setAlertOpen={setLogOutOpen}/>

        </Flex>  
    )
}