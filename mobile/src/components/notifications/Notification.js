import { Flex, Text, Pressable, Icon, useTheme } from "native-base";
import useFormatDate from "../../custom hooks/useFormatDate";
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


/*notification_id = db.Column(db.Integer, primary_key = True)
    header = db.Column(db.String(100))
    body = db.Column(db.String(500))
    is_new = db.Column(db.Boolean, nullable = False, default = True)
    timestamp = db.Column(db.DateTime, default = datetime.utcnow, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable = False)
    variant = db.Column(db.String(30)) ##message, comment, other(from mealBuildr)
    cid = db.Column(db.Integer, db.ForeignKey('conversation.conversation_id')) ##only if message type
    meal_username = db.Column(db.String(50)) ##only if comment type 
    meal_id = db.Column(db.Integer, db.ForeignKey('meal.meal_id')) ## only if comment type 
    #new 
    meal_logged_at = db.Column(db.DateTime, nullable = True) ## only if comment type*/ 


export default function Notification({notif}) {
    const theme = useTheme()
    const {basicFormat} = useFormatDate()
    const navigation = useNavigation()

    let toLink 
    let props 

    if (notif?.variant === 'message') {
        toLink = 'Conversation'
        props = {conversationId: notif?.cid}
    }
    else if (notif?.variant === 'comment') {
        toLink = 'Home'
        props = {}
    }
    else {
        toLink = 'Home'
        props = {}
    }


    function ChooseIcon() {
        if (notif?.variant === 'message') {
            return (
                <Icon as = {AntDesign} name = 'message1' color = {theme.colors.teal.grad3} size = {8}/>
            )
        }

        if (notif?.variant === 'comment') {
            return (
                <Icon as = {FontAwesome} name = 'calendar-o' color = {theme.colors.teal.grad3} size = {8}/>
            )
        }
        
        return (
            <Icon as = {MaterialCommunityIcons} name = 'bell' color = {theme.colors.teal.grad3} size = {8}/>
        )
    }

    return (
        <Pressable onPress = {()=>navigation.navigate(toLink, props)} width = '100%'>
            <Flex width = '100%' direction = 'row' align = 'center'  gap = {3} borderColor = {theme.colors.teal.grad3} borderRadius='full' borderBottomWidth={2} borderLeftWidth={2} py = {3} px = {6}>
                <ChooseIcon/>
                <Flex flex = {1} direction="column" justify = 'start' align = 'center' pr = {2} >
                    <Flex width = '100%' direction = 'column' justify = 'center' align = 'start'>
                        <Text isTruncated fontSize = {15} bold>{notif?.header}</Text>
                        <Flex width = '100%' align = 'start' justify="center">
                            <Flex px = {2} py = {1} borderRadius='full' bg = {theme.colors.teal.grad3}>
                                <Text color = 'white' fontSize = {10}>{basicFormat(notif?.timestamp)}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex width = '100%' direction = 'row' justify = 'space-between' align = 'center'>
                        <Text isTruncated numberOfLines={2} fontSize = {15}>{notif?.body}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Pressable>
    )
}