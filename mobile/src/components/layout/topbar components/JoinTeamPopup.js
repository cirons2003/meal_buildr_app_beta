import {AlertDialog, Button, useTheme, Flex, Text, Input, HStack, Box} from 'native-base'
import {useState, useRef, useEffect} from 'react'

export default function JoinTeamPopup({joinOpen, setJoinOpen}) {
    const theme = useTheme()
    const numBoxes = 6
    const inputRefs = useRef(Array.from({length: numBoxes}, ()=>null))

    useEffect(()=>{
        inputRefs.current = inputRefs.current.slice(0,numBoxes)
    }, [])
    
    const [inputValues, setInputValues] = useState(Array.from({length: numBoxes}, ()=>''))


    const handleChange = (e, index) => {
        if (inputValues)
            setInputValues[index] = e.target.value
        if (index + 1 < numBoxes && inputRefs.current[index+1])
            inputRefs.current[index+1].focus()
    }

   

    return (
        <AlertDialog isOpen={joinOpen} onClose={()=>setJoinOpen(false)}>
            <AlertDialog.Content width = '60%' height = '30%'>          
                    <AlertDialog.CloseButton bg = 'white'/>
                <Flex width = '100%' height = '100%' direction = 'column' align = 'center ' bg = {theme.colors.teal.grad3} p = {2} pt = {4}>
                    <Text bold fontSize = {20} color = {theme.colors.teal.grad4}>Enter Team Code</Text>
                    <Flex direction = 'row' align = 'center' justify='space-around' width = '100%'>
                        {Array.from({length: 6}).map((_, index)=>(
                            <Box pt = {4}>
                                <Input type = 'number' maxLength={1} ref = {(el) => inputRefs.current[index] = el} value = {inputValues[index]}
                                    onChange = {(e)=>handleChange(e, index)} onKeyPress={(e) => {}} color = 'green'
                                />   
                            </Box>
                        ))}
                    </Flex>
                </Flex>   
            </AlertDialog.Content>
        </AlertDialog>
    )
}