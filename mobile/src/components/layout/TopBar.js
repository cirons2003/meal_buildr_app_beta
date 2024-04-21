import {Flex, Text, IconButton, useTheme, Link} from 'native-base'
import {useSafeArea} from 'react-native-safe-area-context'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import LogOutUserAlert from '../LogOutUserAlert'
import useUserAuth from '../../custom hooks/useUserAuth';
import { useState } from 'react';
import { useUser } from '../../context';
import NameDropDown from './topbar components/NameDropDown';




export default function TopBar({activePicture}) {
    const theme = useTheme()
    const insets = useSafeArea();

    if(activePicture)
        return (<></>)
    
    const {logoutUser} = useUserAuth()
    const [logOutOpen, setLogOutOpen] = useState(false)
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const {user} = useUser()

    return (
        <Flex direction = 'row' gap = {2} justify = 'space-between' align = 'center' bg= 'transparent' position = 'absolute' top = {insets.top} left = {0} width = '100%' zIndex={1001} p = {3}>
            <IconButton onPress = {()=>setLogOutOpen(true)} borderRadius = {40} _icon = {{as: FontAwesome5, name: 'user-circle', size: 10, color: theme.colors.teal.grad4}} /> 
            <Flex flexShrink = {1} pos = 'relative'>
                <Text isTruncated numberOfLines={1} color = {theme.colors.teal.grad2} flexShrink = {1} fontSize = {35}>{user.username ? user.username : 'no username'}</Text>
                <NameDropDown dropDownOpen={dropDownOpen} setDropDownOpen={setDropDownOpen}/>
            </Flex>
            <IconButton as = {Link} isExternal to = 'https://princeton.medicatconnect.com/appointment.aspx' borderRadius = {40} _icon = {{as: FontAwesome, name: 'calendar-plus-o', size: 10, color: theme.colors.teal.grad4}} />     
            <LogOutUserAlert onConfirm = {logoutUser} alertOpen={logOutOpen} setAlertOpen={setLogOutOpen}/>

        </Flex>  
    )
}