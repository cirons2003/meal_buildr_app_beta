import { Button, Flex, Input } from "@chakra-ui/react"
import { useState } from "react"
import useUploadMeal from "../custom hooks/useUploadMeal"



export default function MealUploadPage() {

    const [image, setImage] = useState(null)
    const [description, setDescription] = useState('')

    const {uploadMeal} = useUploadMeal()
    const handleMealUpload = () => {
        uploadMeal(image, description)
        setDescription('')
    }

    return (
        <Flex direction = 'column'>
            <Input type = 'file'  onChange = {(e) => setImage(e.target.files[0])}/>
            <Input type = 'text' value = {description} onChange = {(e)=>setDescription(e.target.value)} placeholder = 'description...'/>
            <Button onClick = {()=>handleMealUpload()}>upload</Button>
        </Flex>
    )
}