import {useState} from 'react'
import axios from 'axios'
import { useProxyProvider, useUser } from '../context'

const useGetUserTeams = () => {
    const [listOfTeams, setListOfTeams] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useUser()

    const baseURL = 'https://8205-140-180-240-233.ngrok-free.app'//const {baseURL} = useProxyProvider()

    const getTeams = async() => {
        setLoading(true)
        try {
            const response = await axios.get(baseURL+'/getUserTeams', {withCredentials: true})
            setListOfTeams(response.data)
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
        console.log(user)
    }
    return {listOfTeams, loading, getTeams}
}

export default useGetUserTeams