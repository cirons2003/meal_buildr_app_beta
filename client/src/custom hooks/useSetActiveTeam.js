import { useEffect } from "react"
import { useTeam } from "../context"
import { useNavigate } from "react-router-dom"




const useSetActiveTeam = () => {

    const navigate = useNavigate()
    const {team, setTeam} = useTeam()

    useEffect(()=>{
        console.log(team)
    }, [team])
    const setActiveTeam = (teamName, role) => {
        
        if (teamName === '') {
            sessionStorage.removeItem('team')
            setTeam(null)
        }
        else {  
            setTeam({team_name: teamName, role: role})
            localStorage.setItem('team', JSON.stringify({team_name: teamName, role: role}))
        }
        navigate('/')
        
    }
    return {team, setActiveTeam}
}

export default useSetActiveTeam