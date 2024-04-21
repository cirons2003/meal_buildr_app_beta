import {Button, useTheme} from 'native-base'
import JoinTeamPopup from './JoinTeamPopup'
import {useState} from 'react'

export default function JoinTeamButton() {
    const theme = useTheme()

    const [joinOpen, setJoinOpen] = useState(false)

    return (
        <>
            <Button bg = {theme.colors.teal.grad4} onPress = {()=>setJoinOpen(true)}>Join Team</Button>
            <JoinTeamPopup joinOpen = {joinOpen} setJoinOpen = {setJoinOpen}/>
        </>
    )
}