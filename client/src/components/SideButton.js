import { NavLink as RouterLink } from 'react-router-dom';
import { Button, Icon, Flex, Text} from '@chakra-ui/react';

const CustomButton = ({ icon, text, to, notifCount}) => {
  return (
    <Flex width = '100%' pos = 'relative'>
        <Button
            bg = 'gold'
                
            as={RouterLink}
            to={to}
            leftIcon={icon ? <Icon as={icon} /> : null}
            justifyContent="flex-start"
            w='100%'
            variant="ghost"
            _active={{ bg: 'orange' }}
            _activeLink={{ bg: 'orange' }}
            _hover = {{bg: 'orange'}} 
            >   
            {text}
        </Button>
        {( notifCount > 0) && 
        <Flex bg = 'red' pos = 'absolute' borderRadius= 'full' boxSize = '22px' right = '-5px' top = '-5px' align = 'center' justify = 'center' >
        <Text color = 'white'>{notifCount}</Text>
        </Flex>}
    </Flex>
    );
};

export default CustomButton;
