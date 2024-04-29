import { Flex, Text, Pressable, Icon, useTheme } from "native-base";
import useFormatDate from "../../custom hooks/useFormatDate";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function Notification({notif}) {
    const theme = useTheme()
    const {basicFormat} = useFormatDate()
    const navigation = useNavigation()

    let toLink 
    let props 

    if (notif?.variant === 'message') {
        toLink = 'Home'
        props = {toConvoId: notif?.cid, toPage: 0}
    }
    else if (notif?.variant === 'comment') {
        toLink = 'Home'
        props = {toPage: 2, toDate: notif?.meal_logged_at, toMealId: notif?.meal_id, time: (new Date()).toISOString()} 
    }
    else {
        toLink = 'Home'
        props = {}
    }


    function ChooseIcon() {
        if (notif?.variant === 'message') {
            return (
                <Icon as = {AntDesign} name = 'message1' color = {false ? theme.colors.lightblue3: theme.colors.teal.grad3} size = {8}/>
            )
        }

        if (notif?.variant === 'comment') {
            return (
                <Icon as = {FontAwesome} name = 'calendar-o' color = {false ? theme.colors.lightblue3: theme.colors.teal.grad3} size = {8}/>
            )
        }
        
        return (
            <Icon as = {MaterialCommunityIcons} name = 'bell' color = {false ? theme.colors.lightblue3: theme.colors.teal.grad3} size = {8}/>
        )
    }

    return (
        <Pressable onPress = {()=>{navigation.navigate(toLink, props)}} width = '100%'>
            <Flex pos = 'relative' width = '100%' direction = 'row' align = 'center'  gap = {3} borderColor = {false ? theme.colors.lightblue3: theme.colors.teal.grad3} borderRadius='full' borderBottomWidth={2} borderLeftWidth={2} py = {3} px = {6}>
                <ChooseIcon/>
                <Flex flex = {1} direction="column" justify = 'start' align = 'center' pr = {2} >
                    <Flex width = '100%' direction = 'column' justify = 'center' align = 'start'>
                        <Text isTruncated fontSize = {15} color = {false ? theme.colors.lightblue3: 'black'} bold>{notif?.header}</Text>
                        <Flex width = '100%' align = 'start' justify="center">
                            <Flex px = {2} py = {1} borderRadius='full' bg = {false ? theme.colors.lightblue3: theme.colors.teal.grad3}>
                                <Text color = 'white' fontSize = {10}>{basicFormat(notif?.timestamp)}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex width = '100%' direction = 'row' justify = 'space-between' align = 'center'>
                        <Text color = {false ? theme.colors.lightblue3: 'black'} isTruncated numberOfLines={2} fontSize = {15}>{notif?.body}</Text>
                    </Flex>
                </Flex>
                {notif?.is_new && <Flex style = {{position: 'absolute', top: 3, left: 3}} bg = {theme.colors.red} borderRadius='full' boxSize={5}></Flex>}
            </Flex>
        </Pressable>
    )
}