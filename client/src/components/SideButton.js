import { NavLink as RouterLink } from 'react-router-dom';
import { Button, Icon } from '@chakra-ui/react';

const CustomButton = ({ icon, text, to}) => {
  return (
    <Button
        bg = 'gold'
            mx = '10px'
        as={RouterLink}
        to={to}
        leftIcon={icon ? <Icon as={icon} /> : null}
        justifyContent="flex-start"
        w="full"
        variant="ghost"
        _active={{ bg: 'orange' }}
        _activeLink={{ bg: 'orange' }}
        _hover = {{bg: 'orange'}} 
        >   
        {text}
        </Button>
    );
};

export default CustomButton;
