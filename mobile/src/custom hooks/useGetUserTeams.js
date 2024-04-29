import {useState} from 'react'
import axios from 'axios'
import { useProxy, useUser } from '../context'

const useGetUserTeams = () => {
    const [listOfTeams, setListOfTeams] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useUser()

    const {baseURL} = useProxy()

    const getTeams = async() => {
        setLoading(true)
        try {
            const response = await axios.get(baseURL.current+'/getUserTeams', {withCredentials: true})
            console.log('getMeals')
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