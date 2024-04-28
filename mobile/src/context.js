

import {createContext, useContext, useState, useEffect, useRef, useMemo} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UserContext = createContext(null)
const TeamContext = createContext(null)
const LoggedInContext = createContext(null)
const ReRenderContext = createContext(null)
const ProxyContext = createContext(null)
const ActivePictureContext = createContext(null)

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [team, setTeam] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [reRender, setReRender] = useState(false)
    const [activePicture, setActivePicture] = useState(false)

    /*../../../Downloads/ngrok-v3-stable-windows-amd64*/
    const baseURL = useRef('https://8827-140-180-240-225.ngrok-free.app')
    

    const userVals = useMemo(()=>({
        user,
        setUser
    }), [user,setUser])

    const teamVals = useMemo(()=>({
        team, 
        setTeam
    }), [team, setTeam])

    const loggedInVals = useMemo(()=>({
        loggedIn, 
        setLoggedIn
    }), [loggedIn, setLoggedIn])

    const reRenderVals = useMemo(()=> ({
        reRender, 
        setReRender
    }), [reRender, setReRender])

    const proxyVal = useMemo(()=>({
        baseURL
    }), [baseURL])

    const activePictureVals = useMemo(()=>({
        activePicture, 
        setActivePicture
    }), [activePicture, setActivePicture])

    useEffect(() =>{
        /*const getUser = async() => {
            
            
            try {
                const value = JSON.parse(await AsyncStorage.getItem('user'))
                if (value !== null)
                    setUser(value)
            }catch(err) {
                console.error(err)
            }
        }*/
        const getTeam = async() => {
            try {
                const value = JSON.parse(await AsyncStorage.getItem('team'))
                if (value !== null)
                    setTeam(value)
            }catch(err) {
                console.error(err)
            }
        }
        getTeam()   
    },[])


    
    return (
        <UserContext.Provider value = {userVals}>
            <ProxyContext.Provider value = {proxyVal}>
                <TeamContext.Provider value = {teamVals}>
                    <LoggedInContext.Provider value = {loggedInVals}>
                        <ReRenderContext.Provider value = {reRenderVals}>
                                <ActivePictureContext.Provider value = {activePictureVals}>
                                    {children}  
                                </ActivePictureContext.Provider>
                        </ReRenderContext.Provider>
                    </LoggedInContext.Provider>
                </TeamContext.Provider>
            </ProxyContext.Provider>
        </UserContext.Provider>
    )

}

export const useUser = () => useContext(UserContext)
export const useTeam = () => useContext(TeamContext)
export const useLoggedIn = () => useContext(LoggedInContext)
export const useReRender = () => useContext(ReRenderContext)
export const useProxy = () => useContext(ProxyContext)
export const useActivePicture = () => useContext(ActivePictureContext)


