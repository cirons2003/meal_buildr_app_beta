import BottomBar from '../components/layout/BottomBar'
import PagerViewContent from '../components/layout/PagerViewContent'
import {useRef, useState, useEffect, useMemo} from 'react'
import { useUser, useActivePicture, usePage } from '../context'
import { useNavigation, useRoute } from '@react-navigation/native'



export default function HomePage() {

  const route = useRoute()
  const navigation = useNavigation()
  const toPage = route?.params?.toPage
  const toDate = route?.params?.toDate
  const toMealId = route?.params?.toMealId
  const time = route?.params?.time

  const toConvoId = route?.params?.toConvoId

  //const [pageIndex, setPageIndex] = useState(1)
 // const pagerViewRef = useRef(null)

  const {activePicture, setActivePicture} = useActivePicture()

  const {setPage} = usePage()
  /*const setPage = (pageNum) => {
    pagerViewRef?.current?.setPage(pageNum)
  }*/

  useEffect(()=>{
    if (toPage !== null && toPage !== undefined) {
      setPage(toPage)
      navigation.setParams({toPage: null})
    }
  },[toPage])

  useEffect(()=> {
    if (toPage !== null && toPage !== undefined && toConvoId !== undefined && toConvoId !== null) {
      let cid = toConvoId
      navigation.setParams({toPage: null})
      navigation.navigate('Conversation', {conversationId: cid})
    }
  },[toPage, toConvoId])


  const timeMemo = useMemo(()=>(
    time
  ), [time])

  const toDateMemo = useMemo(()=>(
    toDate
  ), [toDate])

  const toMealIdMemo = useMemo(()=>(
    toMealId
  ), [toMealId])

  return(
    <>
        <PagerViewContent time = {timeMemo} toDate = {toDateMemo} toMealId = {toMealIdMemo} activePicture = {activePicture} setActivePicture = {setActivePicture}/>
        <BottomBar activePicture = {activePicture} />
    </>
  )
}