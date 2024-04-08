import { useEffect, useRef, useState } from "react"
import {Camera} from 'expo-camera'
import {Flex, Pressable, Text, IconButton, useTheme, Image, Input, AlertDialog, Button} from 'native-base'
import { Alert,} from "react-native"
import { Entypo } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useUploadMeal from "../custom hooks/useUploadMeal"
import ConfirmUploadAlert from "./ConfirmUploadAlert"



export default function MealCamera({setActivePicture}) {

    const [status, requestPermission] = Camera.useCameraPermissions()
    const [photoURI, setPhotoUri] = useState(null)
    const [description, setDescription] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [descriptionActive, setDescriptionActive] = useState(false)

    const cameraRef = useRef(null)
    const theme = useTheme()

    const {uploadMeal} = useUploadMeal()


    const takePicture = async() => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync()
            setPhotoUri(photo.uri)
        }   
    }


    const discardPhoto = () => {
        setPhotoUri(null)
        setDescription('')
        setDescriptionActive(false)
    }

    const onConfirmUpload = () => {
        setAlertOpen(false)
        uploadMeal(photoURI, description)
        setPhotoUri(null)
        setDescription('')
    }

    useEffect(()=>{
        if(photoURI)
            setActivePicture(true)
        else 
            setActivePicture(false)
    },[photoURI])


    if (status === null)
        return (<Text>Requesting Permissions...</Text>)

    if (status === false)
        return (<Text>No access to camera</Text>)

    return (
        <Flex direction = 'column' justify = 'center' align = 'center' style = {{flex: 1}} >
            {photoURI ? 
                <Flex position = 'relative' width = '100%' flex = {1} style = {{zIndex: 3001}}>
                    <Pressable onPress = {()=>setDescriptionActive(!descriptionActive)} 
                    style = {{flex: 1, width: '100%'}} 
                    >
                        <Image source = {{uri: photoURI}} alt = 'captured photo' style = {{flex: 1, width: '100%'}}/>                   
                    </Pressable>
                    <IconButton _icon = {{as: FontAwesome6, name: 'xmark', size: 10, color: theme.colors.teal.grad4}}
                        onPress = {()=>discardPhoto()} style = {{position: 'absolute', top: 0, left: 0,}}
                    />
                    <IconButton _icon = {{as: MaterialCommunityIcons, name: 'send', size: 12, color: theme.colors.teal.grad4}}
                        onPress = {()=>setAlertOpen(true)} style = {{position: 'absolute', bottom: 5, right: 10,}}
                    />
                    
                    
                    {descriptionActive && 
                        <Input autoFocus keyboardAppearance = 'dark' position='absolute' top = '50%' 
                            width = '100%' value = {description} _focus={{backgroundColor: theme.colors.lightBlack, opacity: 80, 
                            color: 'white', borderWidth: 0, fontSize: '20px'}}
                            onChangeText = {setDescription}
                        />
                    }
                    {(!descriptionActive && description !== '') && 
                        <Pressable _pressed = {{backgroundColor: 'transparent', borderWidth: 0}} width = '100%'
                            position = 'absolute' top = '50%'  onPress = {()=>setDescriptionActive(true)}>
                            <Text width = '100%' fontSize = '20px' textAlign= 'center'
                                bg = {theme.colors.lightBlack} color = 'white' opacity = {80} style = {{fontSize: '20px'}}
                                >{description}
                            </Text>
                        </Pressable>
                    }
                    <ConfirmUploadAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} onConfirm={onConfirmUpload} description={description}/>
                    
                </Flex>
                
            :
                <Camera ref = {cameraRef} style = {{flex: 1, width: '100%'}}>
                    <Flex justify='flex-end' align='center' style={{ flex: 1 }}>
                        <IconButton
                            _icon = {{as: Entypo, name: 'circle', size: '100', color: theme.colors.teal.grad3}}
                            mb = '10' _pressed = {{backgroundColor: ''}}
                            onPress = {()=>takePicture()}
                        />
                        <IconButton _icon = {{as: MaterialCommunityIcons, name: 'camera-flip-outline', size: 39, color: theme.colors.teal.grad4}}
                            onPress = {()=>discardPhoto()} style = {{position: 'absolute', bottom: 0, right: 0,}} mb = {10} mr = {5} _pressed = {{backgroundColor: ''}}
                        />
                    </Flex>
                </Camera>
            }
            
        </Flex>
    )
}