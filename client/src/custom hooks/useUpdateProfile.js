import axios from 'axios'
import { useUser } from '../context'

const useUpdateProfile = () => {
    const {user, setUser} = useUser()
    
    const updateProfile = async() => {
        const response = await axios.post('http://localhost:5000/updateProfile', {}, {withCredentials: true})

    }
}


export default useUpdateProfile