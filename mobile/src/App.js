import {NativeBaseProvider} from 'native-base'
import Routing from './pages/Routing'
import { ContextProvider } from './context'
import customTheme from './theme'




export default function App() {
  
  return (
    <ContextProvider>
      <NativeBaseProvider theme = {customTheme}> 
        <Routing/>
      </NativeBaseProvider>
    </ContextProvider>
  )
}
