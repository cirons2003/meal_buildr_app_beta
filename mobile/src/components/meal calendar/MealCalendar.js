import DayView from './DayView'

export default function MealCalendar({startDate, endDate}) {
    return (
        <>
            <DayView startDate = {startDate} endDate = {endDate}/>
        </>
    )
}   