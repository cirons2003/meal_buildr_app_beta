
import { Box, Text, useTheme, Flex } from "native-base";
import MealCalendar from "../components/meal calendar/MealCalendar";
import CalendarHeader from "../components/meal calendar/CalendarHeader";
import useDateHandling from '../custom hooks/useDateHandling'
import { useEffect } from "react";


export default function MealCalendarPage({time, toDate, toMealId}) {
    const theme = useTheme()

    const {
         targetDate, startDate, endDate,
        incrementDateDay, decrementDateDay,
        incrementDateWeek, decrementDateWeek,
        assignTargetDate
    } = useDateHandling()

    useEffect(()=> {
        if (toDate) {
            assignTargetDate(toDate)
        }
    }, [toDate, time])
        

    return (
        <Box flex = {1} bg = {theme.colors.teal.grad3}>
            <Flex flex = {1} direction = 'column' safeAreaTop bg = 'white' pos = 'relative' pt = {20}>
                <CalendarHeader incrementDateDay = {incrementDateDay} decrementDateDay = {decrementDateDay} targetDate = {targetDate} incrementDateWeek={incrementDateWeek} decrementDateWeek={decrementDateWeek}/>
                <MealCalendar time = {time} toMealId = {toMealId} startDate = {startDate} endDate = {endDate}/>
            </Flex>
        </Box>
    )
}