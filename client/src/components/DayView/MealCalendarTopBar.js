import { Box, Button, Center, Flex, IconButton, Text, Icon} from "@chakra-ui/react";
import {ChevronRightIcon, ChevronLeftIcon, SettingsIcon, ArrowRightIcon, ArrowLeftIcon} from '@chakra-ui/icons'
import RangeTypeSelectButton from "./RangeTypeSelectButton";
import {Link as RouterLink} from 'react-router-dom'


export default function MealCalendarTopBar({
    setRangeType, rangeType, targetDate, incrementDateDay, decrementDateDay,
    athleteName, incrementDateWeek, decrementDateWeek
}) {

    
    return (
        <>
            <Flex align = 'center' bg = 'teal' p = '15px' justifyContent = 'space-between'>

                <Flex  align = 'center' gap = '10px'>
                    <IconButton  bg = 'tomato' icon = {<ArrowLeftIcon/>} onClick = {()=>{decrementDateWeek()}}/>
                    <IconButton  bg = 'tomato'  fontSize = '30px' icon = {<ChevronLeftIcon/>} onClick = {()=>{decrementDateDay()}}/>
                    <Text bg = 'orange' borderRadius = '20px' p = '10px' as = 'b'>{new Date(targetDate).toLocaleDateString()}</Text>
                    <IconButton bg = 'tomato' fontSize = '30px' icon = {<ChevronRightIcon/>} onClick = {()=>{incrementDateDay()}}/>
                    <IconButton  bg = 'tomato' icon = {<ArrowRightIcon/>} onClick = {()=>{incrementDateWeek()}}/>
                </Flex>
                <Flex bg = 'orange' borderRadius='20px' px = '15px' direction = 'row' align = 'center' gap= {2}>
                    <Text as = 'b' fontSize = '25px'> {athleteName} </Text>
                    <IconButton as = {RouterLink} bg = 'transparent' icon = {<SettingsIcon color = 'teal' fontSize = {20}/>}  to = {`/settings/${athleteName}`}/>
                </Flex>
                <Flex  gap = '20px'align = 'center'>
                    <RangeTypeSelectButton setRangeType={setRangeType} rangeKey = {0} text = {'Day'} 
                        rangeType = {rangeType}
                    />
                    <RangeTypeSelectButton isDisabled = {true} setRangeType={setRangeType} rangeKey = {1} text = {'Week'} 
                        rangeType = {rangeType}
                    />
                    <RangeTypeSelectButton isDisabled = {true} setRangeType={setRangeType} rangeKey = {2} text = {'Month'} 
                        rangeType = {rangeType}
                    />
                </Flex>
            </Flex>
        </>
    )
}