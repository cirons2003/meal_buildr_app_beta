import axios from 'axios'

const useUploadMeal = () => {
    const uploadMeal = async(image, description) => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            formData.append('description', description)
            for (let [key, value] of formData.entries()) {
    console.log(key, value);
}
            const response = await axios.post('http://localhost:5000/uploadMeal', formData, {
                headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true})
            console.log(response.data)
        }catch(err) {
            console.error(err)
        }   
    }
    return {uploadMeal}

}

export default useUploadMeal