import {Center, Flex, Text, HStack, Input, Button, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'
import backgroundImage from '../static/purpleBackground.avif'
import {useEffect, useRef, useState} from 'react'
import useJoinCodeHandling from '../custom hooks/useJoinCodeHandling'
import {Link as RouterLink, Navigate} from 'react-router-dom'
import { useUser } from '../context'



export default function JoinTeamPage() {

    const numBoxes = 6
    
    const inputRefs = useRef(Array.from({length: numBoxes}, ()=>null))

    const [code, setCode] = useState(-1)
    const [fullCode, setFullCode] = useState(false)

    const {searchTeam, teamFound, loading, joinTeam, joinResponse, setJoinResponse} = useJoinCodeHandling()

    useEffect(()=> {
        inputRefs.current = inputRefs.current.slice(0, numBoxes)
    },[])

    const [inputValues, setInputValues] = useState(Array.from({length: 6}, ()=> ''))

    const handleChange = (e, index) => {
        setJoinResponse(null)
        setInputValues(prev => {
            const newVals = [...prev]
            newVals[index] = e.target.value
            return newVals
        })

        if (index + 1 < inputRefs.current.length && inputRefs.current[index+1] && !isNaN(e.target.value))
            inputRefs.current[index+1].focus()
        

    }

    const reset = () => {
        setInputValues(Array.from({length: numBoxes}, ()=>''))
        if (inputRefs.current[0])
            inputRefs.current[0].focus()
        searchTeam(-1)
    }

    const onKeyPress = (e, index) => {
        if (e.keyCode === 37 && index - 1 >= 0) { //left key
            inputRefs.current[index-1].focus()
        }
        if (e.keyCode === 39 && index + 1< inputRefs.current.length) { //right key 
            inputRefs.current[index+1].focus()
        }   
        if (e.keyCode === 8) {
            setInputValues(prev => {
                const newVals = [...prev]
                newVals[index] = ''
                return newVals
            })
        }
    }

    const getCode = () => {
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
                searchTeam(-1)
                return
            }
        }
        setFullCode(true)
    },[inputValues, numBoxes])

    //search team
    useEffect(()=> {
        const codeToUse = getCode()
        if (fullCode)
            return
        
        const delay = 1000
        const clear = setTimeout(()=>{
            console.log('bang')
            searchTeam(codeToUse)
        },delay)

        return ()=>clearTimeout(clear)
        
    },[inputValues, numBoxes])
    

    const handleJoinTeam = ()=> {
        const codeToUse = getCode()
        joinTeam(teamFound.team_name, codeToUse)
    }

    const {user} = useUser()

    if (!user) 
        return (
            <Navigate to = '/login'/>
        )


    return (
        <Center height="100vh" width="100vw" bgImage={backgroundImage} bgPosition="center" bgRepeat="no-repeat" bgSize="cover">
            
            <Flex pos = 'relative' direction="column" gap="30px" bg="darkblue" px="60px" pt="80px" pb="80px" borderRadius="40px" minWidth="15%" alignItems="center">
                
                <Text fontSize="2xl" color="white">Enter Team Join Code</Text>
                <Flex direction = 'column' gap = '20px' align = 'center' mt = '10px'>
                    <HStack spacing="10px">
                        {Array.from({ length: numBoxes }).map((_, index) => (
                            <Input key={index} maxLength={1} size="lg" textAlign="center" width="50px" height="50px"
                            ref = {el => inputRefs.current[index] = el}
                            autoFocus = {index === 0}  value = {inputValues[index]}
                            color = 'green' _focus = {{borderColor: 'blue', borderWidth: '6px', color: 'blue'}}
                                onChange = {(e) => handleChange(e, index)} onKeyDown={(e) => onKeyPress(e, index)} 
                            />
                        ))}
                        <Button onClick = {()=> reset()}>reset</Button>
                    </HStack>
                    {fullCode && <Text color = {loading ? 'yellow' : `${teamFound ? 'green' : 'red'}`}>{loading ? 'loading' : `${teamFound ? `${teamFound.team_name}`: 'no team found'}`}</Text>}
                    
                </Flex>
                    
                    <Button color = 'blue' isDisabled = {!teamFound} opacity = {teamFound ? '100%' : '40%'} onClick = {()=>handleJoinTeam()}>Join Team</Button>
                    <Button pos = 'absolute' top = '10px' left = '10px' variant= 'text'  as = {RouterLink} to = '/' color = 'teal'> {`<`}Home </Button>
                    {joinResponse && 
                    <Alert pos ='absolute' bottom = '10px' width = '70%' onClick= {()=>setJoinResponse(null)} status = {joinResponse.message === 'successfully joined team!' ? 'success' : 'error'}>
                        <AlertIcon/>
                        <AlertTitle>{joinResponse.message}</AlertTitle>
                    </Alert>}
            </Flex>
        </Center>
    );
}