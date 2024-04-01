import {useState} from 'react'
import axios from 'axios'

const useGetUserTeams = () => {
    const [listOfTeams, setListOfTeams] = useState([])
    const [loading, setLoading] = useState(false)
    
    const getTeams = async() => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/getUserTeams', {withCredentials: true})
            setListOfTeams(response.data)
        }catch(err) {
            console.error(err)
        }
        setLoading(false)
    }
    return {listOfTeams, loading, getTeams}
}

export default useGetUserTeams