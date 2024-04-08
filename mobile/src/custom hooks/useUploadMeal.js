import axios from 'axios'
import { useUser } from '../context'

const useUploadMeal = () => {

    const {user} = useUser()
    const baseURL = "https://c958-140-180-240-233.ngrok-free.app"

    const uploadMeal = async(image_uri, description) => {
        const formData = new FormData()
        formData.append('image', {
            uri: image_uri, 
            type: 'image/jpeg',
            name: `${user.username}_${Date.now()}`
        })
        formData.append('description', description)

        try{
            const response = await axios.post(baseURL + '/uploadMeal', formData, 
            {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true})
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }
    return {uploadMeal}
}

export default useUploadMeal