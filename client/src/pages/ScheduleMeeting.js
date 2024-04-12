

export default function ScheduleMeetingPage() {
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