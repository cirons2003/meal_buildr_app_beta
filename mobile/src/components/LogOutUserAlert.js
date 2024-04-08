import {AlertDialog, Button, useTheme} from 'native-base'







export default function ConfirmUploadAlert({alertOpen, setAlertOpen, onConfirm}) {
    const theme = useTheme()
    return (
        <AlertDialog isOpen={alertOpen} onClose={()=>setAlertOpen(false)}>
            <AlertDialog.Content>
                <AlertDialog.Header >Log Out?</AlertDialog.Header>
                <AlertDialog.Footer>
                <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={()=>setAlertOpen(false)}>
                    Cancel
                    </Button>
                    <Button colorScheme= 'danger' onPress = {onConfirm} >
                    Yes, log me out!
                    </Button>
                </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    )
}