import {Flex, Text, useTheme, Icon, IconButton} from 'native-base'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';


export default function BottomBar({pageIndex, setPage, activePicture, setAlertOpen}) {
    const theme = useTheme() 

    const colorMap = {'0': 'white', '1': 'black', '2': 'white'}


    if (activePicture)  
        return (
            <></>
        )


    return (
        <>
            <Flex direction='row' bg = {colorMap[pageIndex]} safeAreaBottom pt = '5'  justify = 'space-around' align = 'center' >
                
                <IconButton  _icon = {{as: AntDesign, name: 'message1', color: theme.colors.teal.grad4, size: 30}} 
                    borderRadius = '20' onPress = {()=> setPage(0)}
                />
                <IconButton  _icon = {{as: Entypo, name: 'camera', color: theme.colors.teal.grad4, size: 30}} 
                    borderRadius = '20' onPress = {()=>setPage(1)}
                />
                <IconButton  _icon = {{as: AntDesign, name: 'calendar', color: theme.colors.teal.grad4, size: 30}}
                    borderRadius = '20' onPress = {()=>setPage(2)}
                />
                
            
                
            </Flex>
        </>
    )
}