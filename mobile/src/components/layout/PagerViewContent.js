import MealCalendarPage from '../../pages/MealCalendarPage'
import MealCapturePage from '../../pages/MealCapturePage'
import MessagesPage from '../../pages/MessagesPage'
import PagerView  from 'react-native-pager-view'


export default function PagerViewContent({setPageIndex, pagerViewRef, activePicture, setActivePicture}) {
    return (
        <PagerView scrollEnabled = {!activePicture} flex = {1} ref = {pagerViewRef} initialPage = {1} style = {{flex: 1}} onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
            <MessagesPage key = '1'/>
            <MealCapturePage setActivePicture = {setActivePicture} key = '2'/>
            <MealCalendarPage key = '3'/>
        </PagerView>
    )
}