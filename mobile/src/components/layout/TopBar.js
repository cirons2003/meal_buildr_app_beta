import {Flex, Text, IconButton, useTheme, Link, Pressable, Avatar} from 'native-base'
import {useSafeArea} from 'react-native-safe-area-context'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LogOutUserAlert from '../LogOutUserAlert'
import useUserAuth from '../../custom hooks/useUserAuth';
import { useState, useEffect } from 'react';
import { useActivePicture, useNotificationContext, useUser } from '../../context';
import NameDropDown from './topbar components/NameDropDown';
import { useNavigation } from '@react-navigation/native';
import defaultProfilePicture from '../../static/download.png'




export default function TopBar({unsafe}) {
    const theme = useTheme()
    const insets = (unsafe ? 0 : useSafeArea())

    const {activePicture} = useActivePicture()
    
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const {user} = useUser()
    const navigation = useNavigation()
    const {notificationCount} = useNotificationContext()

    if(activePicture)
        return (<></>)

    return (
        <Flex direction = 'row' gap = {2} justify = 'space-between' align = 'center' bg= 'transparent' position = 'absolute' top = {insets.top} left = {0} width = '100%' zIndex={1001} p = {3}>
            <Pressable onPress = {()=>{navigation?.navigate('Settings')}}>
                <Avatar borderColor = {theme.colors.teal.grad3} borderWidth = '2px' size = {50} source = {user?.profile_picture_url ? {uri: user.profile_picture_url} : defaultProfilePicture}/>
            </Pressable>
            <Flex flexShrink = {1} pos = 'relative'>
                <Text isTruncated numberOfLines={1} color = {theme.colors.teal.grad2} flexShrink = {1} fontSize = {35}>{user?.username ? user?.username : 'no username'}</Text>
                <NameDropDown dropDownOpen={dropDownOpen} setDropDownOpen={setDropDownOpen}/>
            </Flex>
            <Flex pos = 'relative'>
                <IconButton onPress = {()=>{navigation?.navigate('Notifications')}} borderRadius = {40} _icon = {{as: MaterialCommunityIcons, name: 'bell', size: 10, color: theme.colors.teal.grad3}} />     
                {notificationCount > 0 && <Flex style = {{position: 'absolute', top: 6, right: 6}} bg = {theme.colors.red} borderRadius='full' boxSize={5} justify = 'center' align = 'center'>
                    <Text color= 'white'bold>{notificationCount}</Text>
                </Flex>}
            </Flex>
        </Flex>  
    )
}