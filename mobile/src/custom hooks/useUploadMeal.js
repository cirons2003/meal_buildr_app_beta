import axios from 'axios'
import { useProxy, useReRender, useUser } from '../context'


const useUploadMeal = () => {


    const {setReRender, reRender} = useReRender()
    const {user} = useUser()
    const {baseURL} = useProxy()

    const uploadMeal = async(image_uri, description) => {
        const formData = new FormData()
        formData.append('image', {
            uri: image_uri, 
            type: 'image/jpeg',
            name: 'SERVERFILL'
        })
        formData.append('description', description)

        try{
            const response = await axios.post(baseURL.current + '/uploadMeal', formData, 
            {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true})
            setReRender(!reRender)
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }
    }
    return {uploadMeal}
}

export default useUploadMeal