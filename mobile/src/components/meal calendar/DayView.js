import {Text, Flex, ScrollView, useTheme, Button, Pressable} from 'native-base'
import {useRef, useEffect, useState} from 'react'
import useGetUserMeals from '../../custom hooks/useGetUserMeals'
import { useTeam, useUser } from '../../context'
import DayViewTab from './DayViewTab'
import MealGroupPopup from './MealGroupPopup'


export default function DayView({startDate, endDate}) {
    const scrollContainerRef = useRef(null)
    const scrollToTime = '7:00'
    const scrollTo = (scrollToTime.split(':')[0] * 2 + scrollToTime.split(':')[1] / 30) * boxHeight

    const boxHeight = 10
    const theme = useTheme()

    const timeslots = Array.from({length: 48}, (_,i)=> `${Math.floor(i/2)%12 === 0 ? '12' : Math.floor(i/2)%12}:${i%2 === 0 ? '00' : '30' }${Math.floor(i/24) === 0 ? 'AM' : 'PM'}` )

    useEffect(()=>{
        const clear = setTimeout(()=>{
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({y: scrollTo, animated: false})
        }}, 500)

        return () => clearTimeout(clear)
    }, [scrollTo])

    const {getMealsInDateRange, mealGroupings} = useGetUserMeals()
    const [selectedGroup, setSelectedGroup] = useState(null)
    const {user} = useUser()
    const {team} = useTeam()

    useEffect(()=>{
        if (startDate && endDate && user) {
            getMealsInDateRange(user.username, 'none', startDate, endDate)
            console.log('go')
        }
    }, [startDate, endDate, user])

    return (
        <Flex width = '100%' direction = 'column' flex = {1} bg = 'white' align = 'center'>
           {/*Border Lines and times for background*/ }
           <ScrollView ref = {scrollContainerRef} width = '100%'  pos = 'relative' height='100%'>
                {timeslots.map((num, index)=>(
                    <Flex key = {index} justify = 'start' width = '100%' height = {boxHeight} borderBottomWidth = {2} borderBottomColor={theme.colors.teal.grad3}>
                        <Flex mx = {2}>
                            <Text color = {theme.colors.lightblue1}>{num}</Text> 
                        </Flex>
                    </Flex>
                ))}
                
                {mealGroupings.map((mealGroup, index)=>(  
                        <DayViewTab group = {mealGroup} isSelected = {selectedGroup && selectedGroup.meals[0].logged_at === mealGroup.meals[0].logged_at}
                            setSelectedGroup={setSelectedGroup} index = {index} boxHeight={boxHeight}
                        />
                ))}
                {selectedGroup && <MealGroupPopup selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>}
           </ScrollView>
        </Flex>
    )
}   