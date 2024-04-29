import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesPage from './MessagesPage';
import ConversationPage from './ConversationPage';
import {Flex} from 'native-base'

export default function ConversationRouting() {
    const Stack = createNativeStackNavigator()

    return (
        <Flex width = '100%' flex = {1} bg = 'white'>
            <Flex width = '100%' flex = {1} safeAreaTop pos = 'relative' top = {20}>
                <Stack.Navigator initialRouteName='Messages'>
                    <Stack.Screen name = 'Messages' component = {MessagesPage} options = {{headerShown: false}}/>
                    <Stack.Screen name = 'Conversation' component={ConversationPage}/>
                </Stack.Navigator>            
            </Flex>
        </Flex>  
    )
}