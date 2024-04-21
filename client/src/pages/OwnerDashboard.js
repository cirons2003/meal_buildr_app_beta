import { useTeam } from "../context"

export default function OwnerDashboard() {
    const {team} = useTeam()
    return (
        <>
        <b>Owner Dashboard</b>
        <br/>
        <br/>
        {team.role === 'owner' ?
            <h1>This page will have all the functionality for owners to handle team name, team code, athlete capacity, subscription details, etc.</h1>
            :
            <h1>This page is only for owners</h1>
        }
        </> 
       
    )
}