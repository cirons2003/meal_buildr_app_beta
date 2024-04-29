import {Text, Flex, ScrollView, useTheme, Button, Pressable} from 'native-base'
import {useRef, useEffect, useState} from 'react'
import useGetUserMeals from '../../custom hooks/useGetUserMeals'
import { useReRender, useTeam, useUser } from '../../context'
import DayViewTab from './DayViewTab'
import MealGroupPopup from './MealGroupPopup'
import useUpdateEffect from '../../custom hooks/utility/useUpdateEffect'


export default function DayView({time, startDate, endDate, toMealId}) {
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
    const {reRender} = useReRender()

    useEffect(()=>{
        
    const clear = setTimeout(() => {
        if (startDate && endDate && user) {
        getMealsInDateRange(user.username, 'none', startDate, endDate)
        }}, 250)

        return () => clearTimeout(clear)

    }, [startDate, endDate, user, reRender])

    useEffect(()=>{
        if (time)
            setJumpToMeal(true)
    },[time])

    // handle jumpTo meal logic
    const [mealIndex, setMealIndex] = useState(0)
    const [jumpToMeal, setJumpToMeal] = useState(true)
   
    useEffect(()=> {
        if (jumpToMeal && toMealId && mealGroupings) {
            mealGroupings.forEach((group)=> {
            for (let i = 0; i < group.meals.length; i++) {
                if (group.meals[i].meal_id - toMealId === 0) {
                    setSelectedGroup(group)
                    setMealIndex(i)
                }
            }})
        }
    }, [toMealId, mealGroupings, jumpToMeal])

    //handle changes in selectedGroup
    useEffect(()=>{
        if (!selectedGroup || !jumpToMeal) {
            setMealIndex(0)
        } else {
            setJumpToMeal(false)
        }
    },[selectedGroup])


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
                        <DayViewTab key = {index} group = {mealGroup} isSelected = {selectedGroup && selectedGroup.meals[0].logged_at === mealGroup.meals[0].logged_at}
                            setSelectedGroup={setSelectedGroup} index = {index} boxHeight={boxHeight}
                        />
                ))}
                {selectedGroup && <MealGroupPopup selectedMealIndex = {mealIndex} setSelectedMealIndex = {setMealIndex} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>}
           </ScrollView>
        </Flex>
    )
}   