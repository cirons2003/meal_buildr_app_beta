import { IconButton, Box, Badge } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import {Link as RouterLink} from 'react-router-dom'

const NotificationButton = ({ notificationCount, ...props }) => {
  return (
    <Box position="relative" display="inline-block">
      <IconButton as = {RouterLink} icon={<BellIcon />} {...props} />
      {(notificationCount !== 0) && (
        <Badge
          position="absolute"
          top="-2.5px"
          right="-2.2px"
          colorScheme="red"
          borderRadius="full"
          fontSize="0.7em"
          w = '18px'
          h = '18px'
          textAlign={'center'}
          px={1}
        >
            {notificationCount}
        </Badge>
      )}
    </Box>
  );
};

export default NotificationButton;