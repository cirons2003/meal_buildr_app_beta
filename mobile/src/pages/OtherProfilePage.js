import { Avatar, Flex, IconButton, Text, Pressable, useTheme } from "native-base";
import defaultProfilePicture from '../static/download.png'
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import useUserInfo from "../custom hooks/useUserInfo";
import { useEffect } from "react";


export default function OtherProfilePage() {
    const route = useRoute()
    const {otherUsername} = route.params
    const {userInfo: user, getOtherUserInfo} = useUserInfo()
    const navigation = useNavigation()
    const theme = useTheme()

    useEffect(()=> {
        if (otherUsername)
            getOtherUserInfo(otherUsername)
    },[otherUsername])

    return (
        <Flex bg = 'white' width = '100%' flex = {1} justify = 'start' align = 'center'>
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
                    </Flex>
                </>
        </Flex>
    )
}