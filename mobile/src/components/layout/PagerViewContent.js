import { usePage } from '../../context'
import ConversationRouting from '../../pages/ConversationRouting'
import MealCalendarPage from '../../pages/MealCalendarPage'
import MealCapturePage from '../../pages/MealCapturePage'
import MessagesPage from '../../pages/MessagesPage'
import PagerView  from 'react-native-pager-view'


export default function PagerViewContent({ time, toDate, toMealId, activePicture, setActivePicture}) {
    const {setPageIndex, pagerViewRef} = usePage()
    
    return (
        <PagerView scrollEnabled = {!activePicture} flex = {1} ref = {pagerViewRef} initialPage = {1} style = {{flex: 1}} onPageSelected={e => setPageIndex(e.nativeEvent.position)}>
            <ConversationRouting key = '1'/>
            <MealCapturePage setActivePicture = {setActivePicture} key = '2'/>
            <MealCalendarPage time = {time} toDate = {toDate} toMealId = {toMealId} key = '3'/>
        </PagerView>
    )
}