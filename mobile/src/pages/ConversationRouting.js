import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagesPage from './MessagesPage';
import ConversationPage from './ConversationPage';

export default function ConversationRouting() {
    const Stack = createNativeStackNavigator()
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Conversation'>
                <Stack.Screen name = 'Messages' component = {MessagesPage}/>
                <Stack.Screen name = 'Conversation' component={ConversationPage}/>
            </Stack.Navigator>            
        </NavigationContainer>
    )
}