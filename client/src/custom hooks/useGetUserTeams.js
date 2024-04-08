import {useState} from 'react'
import axios from 'axios'
import useLogoutUser from './useLogoutUser'
import { useUser } from '../context'

const useGetUserTeams = () => {
    const [listOfTeams, setListOfTeams] = useState([])
    const [loading, setLoading] = useState(false)
    const {logout} = useLogoutUser()
    const {user} = useUser()

    const getTeams = async() => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/getUserTeams', {withCredentials: true})
            setListOfTeams(response.data)
        }catch(err) {
            console.error(err)
            logout()
        }
        setLoading(false)
        console.log(user)
    }
    return {listOfTeams, loading, getTeams}
}

export default useGetUserTeams