import TopBar from "../components/layout/TopBar";
import HomePage from "./HomePage";
import {useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsPage from "./NotificationsPage";
import SettingsPage from "./SettingsPage";
import {useEffect} from 'react'
import { useLoggedIn, useUser } from "../context";
import useUserInfo from "../custom hooks/useUserInfo";
import useUserAuth from "../custom hooks/useUserAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginPage from '../pages/LoginPage'
import { Flex, Text, theme, useTheme } from "native-base";
import OtherProfilePage from "./OtherProfilePage";


export default function Routing() {
  const MainStack = createNativeStackNavigator()
  const {loggedIn} = useLoggedIn()
  const {getUserInfo} = useUserInfo()
  const {loginUser} = useUserAuth()
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

  useEffect(()=>{
    if(loggedIn) {
      getUserInfo()
    }
  },[loggedIn])

  //remember login on device
  useEffect(()=>{
    const fun = async()=>{
        const loginData = JSON.parse(await AsyncStorage.getItem('loginData'))
        if (loginData) {
            const clear = loginUser(loginData.username, loginData.password)
        }
        setLoading(false)
    }
    fun()
  },[])

  if (loading) {
    return (
      <Flex bg = {theme.colors.teal.grad4} width = '100%' flex = {1} justify = 'center' align = 'center'>
        <Text color = {theme.colors.teal.grad3} fontSize = {40}>Loading...</Text>
      </Flex>
    )
  }

  return (
    <>
      {loggedIn ? 
        <>
          <TopBar/>
          <MainStack.Navigator initialRouteName="Home">
            <MainStack.Screen name = 'Home' component = {HomePage} options = {{headerShown: false}}/>
            <MainStack.Screen name = 'Notifications' component = {NotificationsPage} options={{headerShown: false, presentation: 'modal'}}/>
            <MainStack.Screen name = 'Settings' component = {SettingsPage} options={{headerShown: false, presentation: 'modal'}}/>
            <MainStack.Screen name = 'OtherProfile' component={OtherProfilePage} options = {{headerShown: false, presentation: 'modal'}}/>
          </MainStack.Navigator>
        </>
      :
        <LoginPage/>
      }
    </>
  )
}