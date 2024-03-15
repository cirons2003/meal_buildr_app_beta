import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    standard: {
         
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
  // Add other theme customizations here
});

export default theme;