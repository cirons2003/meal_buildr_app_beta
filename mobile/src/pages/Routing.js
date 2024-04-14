import BottomBar from '../components/layout/BottomBar'
import PagerViewContent from '../components/layout/PagerViewContent'
import {useRef, useState, useEffect} from 'react'
import {useUser } from '../context'
import LoginPage from '../pages/LoginPage'
import {Flex} from 'native-base'
import TopBar from '../components/layout/TopBar'
import useUserAuth from '../custom hooks/useUserAuth'



export default function Routing() {

  const [pageIndex, setPageIndex] = useState(1)
  const [activePicture, setActivePicture] = useState(false)
  const pagerViewRef = useRef(null)

  const {user} = useUser()
  const {loginUser} = useUserAuth()

  useEffect(()=>{
    if (user) {
      const clear = setTimeout(()=>loginUser(user.username, user.password),3000)
      return () => clearTimeout(clear)
    }
  },[user])


  const setPage = (pageNum) => {
    pagerViewRef.current?.setPage(pageNum)
  }
  
  backgroundColorMap = {'0':'white', '1':'black','2':'white'}
  
  return(
      <>
        {user ? 
            <>
                <TopBar activePicture = {activePicture}/>
                <PagerViewContent activePicture = {activePicture} setActivePicture = {setActivePicture} setPageIndex = {setPageIndex} pagerViewRef = {pagerViewRef}/>
                <BottomBar pageIndex = {pageIndex} activePicture = {activePicture} setPage = {setPage}/>
            </>
        :
            <LoginPage/>
        }
    </>
  )
}