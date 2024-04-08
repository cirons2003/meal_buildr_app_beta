import {NativeBaseProvider} from 'native-base'
import Routing from './pages/Routing'
import { ContextProvider } from './context'
import customTheme from './theme'



export default function App() {
  return (
    <NativeBaseProvider theme = {customTheme}> 
      <ContextProvider>
        <Routing/>
      </ContextProvider>
    </NativeBaseProvider>
  )
}
