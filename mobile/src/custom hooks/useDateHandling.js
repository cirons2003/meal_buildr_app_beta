import useUpdateEffect from "./utility/useUpdateEffect"
import { useEffect, useState, useCallback } from "react"


// handles the date range for a calendar 
// all date states in isostring format 
const useDateHandling = () => {

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()

    const [rangeType, setRangeType] = useState(0)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [targetDate, setTargetDate] = useState(today)
    
    // initialize start on mount, then update again whenever we choose 
    // a different rangeType or targetDate
    useEffect(() => {
        updateStartDate()
    }, [rangeType, targetDate])

    // update end date once each time startdate is updated
    useUpdateEffect(()=>{
        updateEndDate()
    },[startDate])

    

    // 0 for day, 1 for week, 2 for month 
    const updateStartDate = () => {

        const target = new Date(targetDate)
        if (rangeType === 0) 
            setStartDate(target.toISOString())
        if (rangeType === 1) {
            setStartDate(new Date(
                target.getFullYear(), 
                target.getMonth(), 
                target.getDate() - target.getDay()
            ).toISOString())
        }
        if (rangeType === 2) 
            setStartDate(new Date(
                target.getFullYear(),
                target.getMonth(),
                target.getDate() - target.getDate() + 1
            ).toISOString())
    }

    const updateEndDate = () => {
        const start = new Date(startDate)

        if (rangeType === 0) {
            setEndDate(new Date(
                start.getFullYear(), 
                start.getMonth(), 
                start.getDate() + 1
            ).toISOString())
        }
        if (rangeType === 1) {
            setEndDate(new Date(
                start.getFullYear(), 
                start.getMonth(), 
                start.getDate() + 7
            ).toISOString())
        }
        if (rangeType === 2) {
            setEndDate(new Date(
                start.getFullYear(), 
                start.getMonth() + 1,
                start.getDate()
            ).toISOString())
        }
    }

    // callable functions

    const changeRangeType = (num) => {
        if (num === 0 || num === 1 || num === 2)
            setRangeType(num)
        else 
            return 
    }

    const incrementDateDay = () => {
        const date = new Date(targetDate)
        date.setDate(date.getDate() + 1)
        setTargetDate(date.toISOString())
    }

    const decrementDateDay = () => {
        const date = new Date(targetDate)
        date.setDate(date.getDate() - 1)
        setTargetDate(date.toISOString())
    }

    const incrementDateWeek = () => {
        const date = new Date(targetDate)
        date.setDate(date.getDate() + 7)
        setTargetDate(date.toISOString())
    }

    const decrementDateWeek = () => {
        const date = new Date(targetDate)
        date.setDate(date.getDate() - 7)
        setTargetDate(date.toISOString())
    }

    const incrementDateMonth = () => {
        const date = new Date(targetDate)
        date.setMonth(date.getMonth() + 1)
        setTargetDate(date.toISOString())
    }

    const decrementDateMonth = () => {
        const date = new Date(targetDate)
        date.setMonth(date.getMonth() - 1)
        setTargetDate(date.toISOString())
    }

    const assignTargetDate = (datestring) => {
        console.log('datestring')
        if (!datestring || datestring === '')
            return 
        let target = new Date(datestring)
        target = new Date(target.getFullYear(), target.getMonth(), target.getDate()).toISOString()
        setTargetDate(target)
    }

    return {
        startDate, endDate, targetDate, rangeType,
        incrementDateDay, decrementDateDay, 
        incrementDateMonth, decrementDateMonth,
        incrementDateWeek, decrementDateWeek,
        changeRangeType, assignTargetDate
    }
}

export default useDateHandling