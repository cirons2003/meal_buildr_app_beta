import {NativeBaseProvider} from 'native-base'
import Routing from './pages/Routing'
import { ContextProvider} from './context'
import customTheme from './theme'
import { NavigationContainer } from '@react-navigation/native';




export default function App() {
  
  return (
    <ContextProvider>
      <NativeBaseProvider theme = {customTheme}> 
        <NavigationContainer>
          <Routing/>
        </NavigationContainer>
      </NativeBaseProvider>
    </ContextProvider>
  )
}
