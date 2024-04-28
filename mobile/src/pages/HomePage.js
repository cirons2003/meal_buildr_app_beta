import BottomBar from '../components/layout/BottomBar'
import PagerViewContent from '../components/layout/PagerViewContent'
import {useRef, useState, useEffect} from 'react'
import { useUser, useActivePicture } from '../context'



export default function HomePage() {

  const [pageIndex, setPageIndex] = useState(1)
  const pagerViewRef = useRef(null)

  const {user} = useUser()
  const {activePicture, setActivePicture} = useActivePicture()

  const setPage = (pageNum) => {
    pagerViewRef?.current?.setPage(pageNum)
  }
  
  
  return(
    <>
        <PagerViewContent activePicture = {activePicture} setActivePicture = {setActivePicture} setPageIndex = {setPageIndex} pagerViewRef = {pagerViewRef}/>
        <BottomBar pageIndex = {pageIndex} activePicture = {activePicture} setPage = {setPage}/>
    </>
  )
}