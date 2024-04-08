import {AlertDialog, Button, useTheme} from 'native-base'







export default function ConfirmUploadAlert({alertOpen, setAlertOpen, onConfirm, description}) {
    const theme = useTheme()
    return (
        <AlertDialog isOpen={alertOpen} onClose={()=>setAlertOpen(false)}>
            <AlertDialog.Content>
                <AlertDialog.Header >Confirmation</AlertDialog.Header>
                <AlertDialog.Body >
                    {`Description: ${(description && description !== '') ? description : 'None'}`}
                </AlertDialog.Body>
                <AlertDialog.Footer>
                <Button.Group space={2}>
                    <Button variant="unstyled" colorScheme="coolGray" onPress={()=>setAlertOpen(false)}>
                    Cancel
                    </Button>
                    <Button bg = {theme.colors.teal.grad3} onPress = {onConfirm} >
                    Confirm
                    </Button>
                </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    )
}