import DayView from './DayView'

export default function MealCalendar({time, startDate, endDate, toMealId}) {
    return (
        <>
            <DayView time = {time} startDate = {startDate} endDate = {endDate} toMealId = {toMealId}/>
        </>
    )
}   