import {NativeBaseProvider} from 'native-base'
import Routing from './pages/Routing'
import { ContextProvider, NotificationContextProvider, SetNotificationContextProvider} from './context'
import customTheme from './theme'
import { NavigationContainer } from '@react-navigation/native';




export default function App() {
  
  return (
    <ContextProvider>
      <NotificationContextProvider>
        <SetNotificationContextProvider>
          <NativeBaseProvider theme = {customTheme}> 
            <NavigationContainer>
              <Routing/>
            </NavigationContainer>
          </NativeBaseProvider>
        </SetNotificationContextProvider>
      </NotificationContextProvider>
    </ContextProvider>
  )
}
