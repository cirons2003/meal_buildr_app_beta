import axios from 'axios'
import { useProxy, useUser } from '../context'

const useUpdateProfile = () => {
    const {user, setUser} = useUser()

    const baseURL = useProxy()
    
    const updateProfile = async() => {
        const response = await axios.post(baseURL+'/updateProfile', {}, {withCredentials: true})

    }
}


export default useUpdateProfile