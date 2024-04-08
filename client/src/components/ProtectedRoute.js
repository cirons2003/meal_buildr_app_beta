import {Navigate} from 'react-router-dom'
import { useTeam, useUser } from '../context'
import ChooseTeam from '../pages/ChooseTeam'

export default function ProtectedRoute({children}) {
    const {user} = useUser()
    const {team} = useTeam()

    

    function CheckTeam() {
        return (
            <>
            
                {(team && team.team_name !== 'none') ? children : <Navigate to = '/chooseTeam'/>}
            </>
        )
    } 

    return (
        <>
            {(user?.username && user.username !== 'none') ? <CheckTeam/> : <Navigate to = '/login'/>}
        </>
    )
}


