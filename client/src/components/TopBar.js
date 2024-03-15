import { Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';

const TopBar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let lastScrollY = window.pageYOffset;

  useEffect(()=>onOpen(),[])

  useEffect(() => {
    const handleScroll = () => {
      if (lastScrollY < window.pageYOffset) {
        onClose();
      } else {
        onOpen();
      }
      lastScrollY = window.pageYOffset;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onClose, onOpen]);

  return (
    <Flex
      px = '8'
      w = '100%'
      zIndex="1000"
      justify="space-between"
      py = '4'
      bg="tomato"
      transition="transform 0.3s ease-in-out"
      transform={isOpen ? 'translateY(0)' : 'translateY(-100%)'}
    >
      {children}
    </Flex>
  );
};

export default TopBar;
