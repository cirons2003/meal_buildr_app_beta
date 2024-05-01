import axios from 'axios'
import { useProxy } from '../context'

const useUploadMeal = () => {

    const baseURL = useProxy()

    const uploadMeal = async(image, description) => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('description', description)
            
            const response = await axios.post(baseURL+'/uploadMeal', formData, {
                headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true})
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }   
    }
    return {uploadMeal}

}

export default useUploadMeal