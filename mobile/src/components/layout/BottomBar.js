import {Flex, Text, useTheme, Icon, IconButton} from 'native-base'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useNotificationContext, usePage } from '../../context';


export default function BottomBar({activePicture}) {
    const theme = useTheme() 
    const {unreadMessageCount} = useNotificationContext()

    const colorMap = {'0': 'white', '1': 'black', '2': 'white'}
    const {setPage, pageIndex} = usePage()

    if (activePicture)  
        return (
            <></>
        )


    return (
        <>
            <Flex direction='row' bg = {colorMap[pageIndex]} safeAreaBottom pt = '5'  justify = 'space-around' align = 'center' >
                <Flex pos = 'relative'>
                    <IconButton  _icon = {{as: AntDesign, name: 'message1', color: theme.colors.teal.grad4, size: 30}} 
                    borderRadius = '20' onPress = {()=> setPage(0)}/>
                    {unreadMessageCount > 0 && <Flex style = {{position:'absolute', top: 0, right: 0}} borderRadius = 'full' boxSize={5} justify='center' align = 'center' bg = {theme.colors.red}>
                        <Text color = 'white' bold>{unreadMessageCount}</Text>
                    </Flex>}
                </Flex>
                
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