import {Flex, Text, Button, FormControl, Input, FormLabel, FormHelperText, RadioGroup, Radio, HStack, IconButton, useToast,
AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, Alert, AlertIcon} from '@chakra-ui/react'
import {useParams, Link as RouterLink, useNavigate} from 'react-router-dom'
import {CalendarIcon} from '@chakra-ui/icons'
import {useState, useRef, useEffect} from 'react'
import useChangeUserRole from '../custom hooks/useChangeUserRole'
import MemberListButton from '../components/Settings/MemberListButton'
import useRemoveUserFromTeam from '../custom hooks/useRemoveUserFromTeam'
import useGetUserInfo from '../custom hooks/useGetUserInfo'
import useSendMessage from '../custom hooks/useSendMessage'
import SettingsMessageButton from '../components/Settings/SettingsMessageButton'


export default function MemberSettingsPage() {
    const {athleteName} = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const headerColor = 'teal'
    const [isAdmin, setIsAdmin] = useState(false)
    const {changeRole, response: changeResponse, clearResponse: clearChangeResponse} = useChangeUserRole() 
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const cancelRef = useRef()
    const {removeUser, response: removeResponse, clearResponse: clearRemoveResponse} = useRemoveUserFromTeam()
    const {role, getUserInfo, userId} = useGetUserInfo()

    const handleSaveChanges = () => {
        changeRole(athleteName, `${isAdmin ? 'admin' : 'athlete'}`) 
    }

    const handleDeleteConfirm = () => {
        removeUser(athleteName)
        setDeleteConfirm(false) 
        navigate('/ownerDashboard')
        toast({title: 'successfully removed user', status: 'success', isClosable: true})

    }

    useEffect(()=> {
        clearChangeResponse()
        clearRemoveResponse()
        setIsAdmin(false)
    },[athleteName])

    useEffect(()=> {    
        getUserInfo(athleteName)
    },[athleteName, changeResponse])

    useEffect(()=>{
        if (role)
            setIsAdmin(role === 'admin')
    },[role])

    const colorMap = {admin: 'red', athlete: 'green'}

    
    
    return (
        <Flex width = '100%' direction  = 'column' bg = ''>
            <Flex justify = 'start' align = 'center' gap = {6} mb = {5}>
                <Text as = 'b' color = {headerColor} fontSize = {40}>{athleteName}</Text>
                <SettingsMessageButton  headerColor = {headerColor} member = {{username: athleteName, user_id: userId}}/>
                <IconButton icon = {<CalendarIcon fontSize = {25} color = {headerColor}/>} as = {RouterLink} to = {`/athletePage/${athleteName}`} bg = 'transparent'/>
                <MemberListButton/>
            </Flex>
            <Flex>
                <Flex bg = {colorMap[role]} px = {5} fontRadius = {20} borderRadius = {20} mb = '10px'>
                    <Text fontSize = '20px' color = 'white'>{role}</Text>
                </Flex>
            </Flex>
            <FormControl as ='fieldset'>
                <FormLabel as='legend'>Change Role </FormLabel>
                <RadioGroup value= {isAdmin ? 'Admin':'Athlete'}>
                    <HStack spacing='24px'>
                    <Radio value='Athlete' onChange = {(e)=>setIsAdmin(e.target.value === 'Admin')} checked = {!isAdmin}>Athlete</Radio>
                    <Radio value='Admin' onChange = {(e)=>setIsAdmin(e.target.value === 'Admin')} checked = {isAdmin}>Admin</Radio>
                    </HStack>
                </RadioGroup>
                <FormHelperText>*Only Make trusted members admins</FormHelperText>
            </FormControl>

            <Flex my = {5}>
                <Button onClick = {()=>handleSaveChanges()} bg = 'lightblue'>Save Changes</Button>
            </Flex>
            {changeResponse &&  <Alert onClick = {clearChangeResponse} status={changeResponse?.status}>
                <AlertIcon />
                {changeResponse?.message}
            </Alert>
            }
            <hr/>
            <Flex mt = {3}>
                <Button onClick = {()=> setDeleteConfirm(true)} bg = '#F0460E'>Delete User</Button>
            </Flex>
            {removeResponse &&  <Alert onClick = {clearRemoveResponse} status={removeResponse?.status}>
                <AlertIcon />
                {removeResponse?.message}
            </Alert>}


            {/* Alert Dialog to confirm delete user*/} 
            <AlertDialog
                isOpen={deleteConfirm}
                leastDestructiveRef={cancelRef}
                onClose={()=>setDeleteConfirm(false)}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Member
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? This user will be removed from the team.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={()=>setDeleteConfirm(false)}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={handleDeleteConfirm} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            
        </Flex>
    )
}