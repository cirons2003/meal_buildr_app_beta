
import { Box, Text, useTheme, Flex } from "native-base";
import useGetUserMeals from "../custom hooks/useGetUserMeals";
import MealCalendar from "../components/meal calendar/MealCalendar";
import CalendarHeader from "../components/meal calendar/CalendarHeader";
import useDateHandling from '../custom hooks/useDateHandling'


export default function MealCalendarPage() {
    const theme = useTheme()

    const {mealGroupings, getMealsInDateRange} = useGetUserMeals()

    const {
        rangeType, targetDate, startDate, endDate,
        incrementDateDay, decrementDateDay,
        incrementDateMonth, decrementDateMonth, 
        incrementDateWeek, decrementDateWeek,
        changeRangeType
    } = useDateHandling()

    
    
    return (
        <Box flex = {1} bg = {theme.colors.teal.grad3}>
            <Flex flex = {1} direction = 'column' safeAreaTop bg = 'white' pos = 'relative' pt = {20}>
                <CalendarHeader incrementDateDay = {incrementDateDay} decrementDateDay = {decrementDateDay} targetDate = {targetDate} incrementDateWeek={incrementDateWeek} decrementDateWeek={decrementDateWeek}/>
                <MealCalendar startDate = {startDate} endDate = {endDate}/>
            </Flex>
        </Box>
    )
}