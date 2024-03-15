import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import Routing from './Routing';
import {ChakraProvider} from '@chakra-ui/react'
import theme from './theme/theme'
import { UserProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <UserProvider>
        <ChakraProvider theme = {theme}>
          <Routing />
        </ChakraProvider>
      </UserProvider>
    </React.StrictMode>
);


