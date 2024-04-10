import { useDisclosure, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react"
import {useRef} from 'react'
import {Link as RouterLink} from 'react-router-dom'
import useGetUserTeams from "../custom hooks/useGetUserTeams"
import ChooseTeamPanel from "./ChooseTeamPanel"


export default function SwitchTeamsButton({text}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  

  return (
    <>
      <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        {text ? text : 'Switch Teams'}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Choose a Team</DrawerHeader>

          <DrawerBody>
            <ChooseTeamPanel/>
          </DrawerBody>

          
        </DrawerContent>
      </Drawer>
    </>
  )
}