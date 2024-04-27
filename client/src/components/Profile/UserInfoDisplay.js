import { Text, Flex,  Box, Button, Image, VStack, Heading, Container, IconButton, 
    Modal, ModalOverlay, ModalHeader, ModalFooter, ModalContent, ModalBody, ModalCloseButton,
    Input, FormControl, FormLabel, FormHelperText,
    AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay
    } from '@chakra-ui/react'
import defaultProfilePicture from '../../static/avatar-1577909_1280.webp'
import {EditIcon} from '@chakra-ui/icons'
import {useState, useEffect} from 'react'
import useUserInfo from '../../custom hooks/useUserInfo'
import { useUser } from '../../context'


export default function UserInfoDisplay({hideEdit}) {
    
    const {user} = useUser()
    const [editOpen, setEditOpen] = useState(false)
    const [confirmSave, setConfirmSave] = useState(false)

    const [newUsername, setNewUsername] = useState('')
    const [newFirstName, setNewFirstName] = useState('')
    const [newLastName, setNewLastName] = useState('')
    const [newBio, setNewBio] = useState('')
    const [newImage, setNewImage] = useState(null)
    const [newImageURL, setNewImageURL] = useState('')

    const {changeUserInfo, changeUserProfilePicture} = useUserInfo()
    

    useEffect(()=> {
        reset()
    },[editOpen])

    useEffect(()=> {
        reset() 
    }, [user])


    const reset = () => {
        setNewUsername(user.username)
        setNewFirstName(user.first_name)
        setNewLastName(user.last_name)
        setNewBio(user.bio) 
        setNewImage(null)
        setNewImageURL(user.profile_picture_url)
    }

    const handleSaveChanges = () => {
        changeUserInfo(newFirstName, newLastName, newBio)
        if (newImage) 
            changeUserProfilePicture(newImage)
        setEditOpen(false)
        reset()
    }

    return (
        <Box     borderRadius="lg" overflow="hidden" p="5" w = '250px' borderColor = 'lightblue' borderWidth = '3px'>
            <VStack spacing={4}>
            <Box pos = 'relative'>
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    objectFit='cover'
                    src={user?.profile_picture_url ? user.profile_picture_url : defaultProfilePicture}
                    alt={`Profile image of ${user.username}`}
                    mb={4}
                />
                {!hideEdit && <IconButton onClick = {()=>setEditOpen(true)} icon = {<EditIcon/>} pos = 'absolute' top = {0} right = {-3} bg = 'lightblue'/>}
            </Box>
            <Heading as="h3" size="lg">
                {(user && user.username) ? user.username : 'no username'}
            </Heading>
            <Text fontSize="md">{`${(user && user.first_name) ? user.first_name : 'N/a'} ${(user && user.last_name) ? user.last_name : 'N/a'}`}</Text>
            <Box pt = {3} borderTopWidth = {1} borderTopColor = 'lightgrey'>
                <Text fontSize="sm" textAlign = 'center ' color="gray.500">{user?.bio}</Text>
            </Box>
            
            </VStack>
            <Modal initialFocusRef={null} isOpen = {editOpen} onClose={()=> setEditOpen(false)}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Text>Edit profile</Text>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody overflowY = 'auto' maxHeight = '60vh'>
                        <Flex mb = {3} pos = 'relative' width = '50%' mt = {7} p = {0} align = 'center' justify = 'center' direction = 'column'>
                            <Image 
                                src={newImageURL ? newImageURL : defaultProfilePicture}
                                width = '100%'
                                objectFit= 'cover'
                                boxSize = '150px'
                                onClick= {()=>{}}
                                borderRadius= 'full'
                            />
                            {/*<IconButton icon = {<EditIcon/>} pos = 'absolute' top= {0} right = {5   }/>*/}
                            <Input onChange = {(e)=> {setNewImage(e.target.files[0]); setNewImageURL(URL.createObjectURL(e.target.files[0]))}} type = 'file' variant = 'unstyled' hidden id = 'file-upload'/>
                            <Button as = 'label' htmlFor = 'file-upload' variant = 'text' rightIcon={<EditIcon/>} _hover = {{color: 'lightblue', opacity: '90%'}}>Update</Button>
                        </Flex>
                        <FormControl>
                            <FormLabel>Username</FormLabel>  
                            <Input placeholder= {user?.username ? user.username : 'Enter Username'} value = {newUsername} onChange = {(e) => setNewUsername(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>  
                            <Input placeholder= {user?.first_name ? user.first_name : 'Enter First Name'} value = {newFirstName} onChange = {(e) => setNewFirstName(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Last Name</FormLabel>  
                            <Input placeholder= {user?.last_name ? user.last_name : 'Enter Last Name'} value = {newLastName} onChange = {(e) => setNewLastName(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Bio</FormLabel>  
                            <Input placeholder= {user?.bio ? user.bio : 'add bio'} value = {newBio} onChange = {(e) => setNewBio(e.target.value)} />
                        </FormControl>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button bg ='lightblue' mr={3} onClick = {()=> setConfirmSave(true)}>Save</Button>
                        <Button onClick={()=>setEditOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <AlertDialog
        motionPreset='slideInBottom'
        onClose={()=> setConfirmSave(false)}
        isOpen={confirmSave}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Save Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to save changes?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick = {()=>(setConfirmSave(false))}>
              No
            </Button>
            <Button onClick = {handleSaveChanges} colorScheme='blue' ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </Box>
    )
}

