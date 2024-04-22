import {AlertDialog, Button, useTheme, Flex, Text, Input, HStack, VStack, Alert, IconButton, Box} from 'native-base'
import {useState, useRef, useEffect} from 'react'
import useJoinCodeHandling from '../../../custom hooks/useJoinCodeHandling'

export default function JoinTeamPopup({joinOpen, setJoinOpen, triggerReload}) {
    const theme = useTheme()
    const numBoxes = 6
    const inputRefs = useRef(Array.from({length: numBoxes}, ()=>null))

    const {teamFound, joinResponse, joinTeam, searchTeam, loading, setJoinResponse} = useJoinCodeHandling()
    const [fullCode, setFullCode] = useState(false)
    
    const [inputValues, setInputValues] = useState(Array.from({length: numBoxes}, ()=>''))


    const handleChange = (value, index) => {

        if (inputRefs.current && index + 1 < numBoxes && value !== '')
            inputRefs.current[index+1].focus()
    
        const copy = [...inputValues]
        copy[index] = value
        setInputValues(copy)
        
            
    }

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace') {
            if (inputValues[index] === '' && index - 1 >= 0) {
                inputRefs.current[index-1].focus()
            }
            else {
                setInputValues(prev => {
                    const newVals = [...prev]
                    newVals[index] = ''
                    return newVals
                })
            }
        }
    }

    useEffect(()=> {
        if (joinResponse && joinResponse.message === 'successfully joined team!')
            triggerReload()
    },[joinResponse])

    const reset = () => {
        setInputValues(Array.from({length:numBoxes}, ()=>''))
        inputRefs.current[0].focus()
        setJoinResponse(null)
    }


    const codeToUse = () => {
        let sb = []
        for (let i = 0; i < numBoxes; i++) {
            if (inputValues[i] === '')
                return -1
            sb.push(`${inputValues[i]}`)
        }
        sb = sb.join("")
        return sb
    }

    useEffect(()=> {
        for (let i = 0; i < numBoxes; i++) {
            if (inputValues[i] === '') {
                setFullCode(false)
                return
            }
        }
        setFullCode(true)
        searchTeam(codeToUse())
        console.log(teamFound)
    },[inputValues])
   

    const handleJoinTeam = () => {
        if (!fullCode || !teamFound?.team_name) 
            return 
        joinTeam(teamFound.team_name, codeToUse())
    }


    return (
        <AlertDialog isOpen={joinOpen} onClose={()=>setJoinOpen(false)}>
            <AlertDialog.Content width = '60%' height = '30%'>          
                    <AlertDialog.CloseButton bg = {theme.colors.teal.grad6} />
                <Flex width = '100%' height = '100%' direction = 'column' gap = {2} align = 'center ' bg = {theme.colors.teal.grad3} p = {2} pt = {4}>
                    <Text bold fontSize = {20} color = {theme.colors.teal.grad4}>Enter Team Code</Text>
                    <Flex direction = 'row' align = 'center' justify='space-around' width = '100%'>
                        {Array.from({length: 6}).map((_, index)=>(
                            <Box key = {index} pt = {4} width = '15%'>
                                <Input keyboardType = 'numeric' maxLength={1} ref = {(el) => inputRefs.current[index] = el} value = {inputValues[index]}
                                    onChangeText = {(value)=>handleChange(value, index)} onKeyPress={(e) => {handleKeyPress(e, index)}}  
                                    color = {(inputValues[index] !== '') ? 'darkgreen' : 'white'} borderWidth = {2} borderColor = {inputValues[index] !== '' ? 'darkgreen' :'white'}
                                />   
                            </Box>
                        ))}
                    </Flex>
                    <Flex direction = 'row' justify = 'space-between' width = '100%'>
                        {fullCode ? <Text fontSize = {14} bold color = {loading ? 'yellow' : `${teamFound ? theme.colors.darkgreen : 'red.800'}`}>{loading ? 'loading' : `${teamFound ? `${teamFound.team_name}`: 'no team found'}`}</Text> : <Text></Text>}
                        <Button bg = {theme.colors.teal.grad4} size = 'xs' onPress = {reset}> reset </Button>
                    </Flex>
                    <Flex flex = {1} direction = 'row' justify = 'center' align = 'center' width = '100%'>
                        <Button onPress = {handleJoinTeam} disabled = {(teamFound && teamFound !== 'no team found') ? false : true} bg = {theme.colors.teal.grad4}>Join Team</Button>
                    </Flex>
                    {joinResponse && 
                        <Alert w="100%" status = {joinResponse.message === 'successfully joined team!' ? 'success' : 'error'}>
                            <VStack  space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} justifyContent="space-between">
                                <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt="1" />
                                <Text fontSize={13} color="coolGray.800">
                                    {joinResponse.message}
                                </Text>
                                </HStack>
                                
                            </HStack>
                            </VStack>
                        </Alert>
                    }
                </Flex>   
            </AlertDialog.Content>
        </AlertDialog>
    )
}