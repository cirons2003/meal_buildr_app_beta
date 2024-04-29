

import {createContext, useContext, useState, useEffect, useRef, useMemo, useCallback} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useNotifications from './custom hooks/useNotifications'

const UserContext = createContext(null)
const TeamContext = createContext(null)
const LoggedInContext = createContext(null)
const ReRenderContext = createContext(null)
const ProxyContext = createContext(null)
const ActivePictureContext = createContext(null)
const NotificationContext = createContext(null) 
const SetNotificationContext = createContext(null)
const PageContext = createContext(null)

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

    const pagerViewRef = useRef(null)
    const [pageIndex, setPageIndex] = useState(1)

    const setPage = useCallback((pageNum) => {
        if (pagerViewRef)
            pagerViewRef?.current?.setPage(pageNum)
    }, [pagerViewRef])

    const pageVals = useMemo(()=>({
        pageIndex, 
        setPageIndex, 
        setPage, 
        pagerViewRef
    }), [pageIndex, setPageIndex, pagerViewRef, setPage])
    
    return (
        <UserContext.Provider value = {userVals}>
            <ProxyContext.Provider value = {proxyVal}>
                <TeamContext.Provider value = {teamVals}>
                    <LoggedInContext.Provider value = {loggedInVals}>
                        <ReRenderContext.Provider value = {reRenderVals}>
                                <ActivePictureContext.Provider value = {activePictureVals}>
                                    <PageContext.Provider value = {pageVals}>
                                        {children}  
                                    </PageContext.Provider>
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
export const usePage = () => useContext(PageContext)

// must consume ProxyProvider
export const NotificationContextProvider = ({children}) => {

    const [notificationCount, setNotificationCount] = useState(0)
    const [unreadMessageCount, setUnreadMessageCount] = useState(0)
    

    const nvals = useMemo(()=>({
        notificationCount, 
        setNotificationCount, 
        unreadMessageCount, 
        setUnreadMessageCount
    }),[notificationCount,setNotificationCount, unreadMessageCount, setUnreadMessageCount])

    return (
        <NotificationContext.Provider value = {nvals}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => useContext(NotificationContext)


//must consume NotificationContextProvider and ProxyProvider
export const SetNotificationContextProvider= ({children}) => {
    const {openMessages, listOfNotifications, getNotifications, viewComments} = useNotifications()

    const setnvals = useMemo(()=>({
        openMessages, 
        listOfNotifications, 
        getNotifications, 
        viewComments
    }),[openMessages, listOfNotifications, getNotifications, viewComments])

    return (
        <SetNotificationContext.Provider value = {setnvals}>
            {children}
        </SetNotificationContext.Provider>
    )
}

export const useSetNotificationContext = () => useContext(SetNotificationContext)