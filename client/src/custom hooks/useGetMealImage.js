/*import axios from "axios"



const useGetMealImage = () => {
    
    const getSignedUrl = async(url) => {
        const filename = url.split('/').pop()
        try {
            const response = await axios.get(`http://localhost:5000/getMealImage/${filename}`, {withCredentials: true})
            console.log(response.data.url)
            return response.data.url
        }catch(err) {
            console.error(err)
        }
    }
}

export default useGetMealImage*/