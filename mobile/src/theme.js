
import {extendTheme} from 'native-base'
import TeamButton from './components/layout/topbar components/TeamButton'

const customTheme = extendTheme({
    colors: {
      teal: {
        grad1: '#283131',
        grad2: '#172525',
        grad3: '#307d7d',
        grad4: '#084949',
        grad5: '#034444',
        grad6: '#40B0B0',
      },
      TeamButton: {
        owner: '#E6F97A',
        admin: '#D11E18', 
        athlete: '#318C27',
      },
      lightblue2: '#2B8DEE',
      lightblue1: '#73C2C4',
      lightblue3: '#2A9BF1',
      black: '#000505',
      lightBlack: '#252524',
      white: '#FFFFFF',
      orange: '#D3AF1D',
      gold: '#B6A539',
      darkgreen: '#10470C',
      purple: '#330C88',
      lightpurple: '#CDA0E9', 
      
    },
    
  })

  export default customTheme