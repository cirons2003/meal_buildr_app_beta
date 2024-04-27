import { IconButton, Box, Badge } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import {Link as RouterLink} from 'react-router-dom'


const NotificationButton = ({ notificationCount, ...props }) => {
  
  

  return (
    <Box position="relative" display="inline-block">
      <IconButton as = {RouterLink} to = '/notifications' icon={<BellIcon />} {...props} />
      {(notificationCount !== 0) && (
        <Badge
          position="absolute"
          top="-2.5px"
          right="-2.2px"
          bg="red"
          color= 'white'
          borderRadius="full"
          fontSize="0.7em"
          w = '18px'
          h = '18px'
          textAlign={'center'}
          px={1}
          borderColor = 'white'
          borderWidth = '1px'
        >
            {notificationCount}
        </Badge>
      )}
    </Box>
  );
};

export default NotificationButton;