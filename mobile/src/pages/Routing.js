import BottomBar from '../components/layout/BottomBar'
import PagerViewContent from '../components/layout/PagerViewContent'
import {useRef, useState} from 'react'
import {useUser } from '../context'
import LoginPage from '../pages/LoginPage'
import {Flex} from 'native-base'
import TopBar from '../components/layout/TopBar'



export default function Routing() {

  const [pageIndex, setPageIndex] = useState(1)
  const [activePicture, setActivePicture] = useState(false)
  const pagerViewRef = useRef(null)

  const {user} = useUser()

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