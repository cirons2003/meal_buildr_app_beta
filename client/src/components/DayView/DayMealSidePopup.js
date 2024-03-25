    import { IconButton, Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Image, Text, Input, Flex } from '@chakra-ui/react';

    import defaultImage from '../../static/defaultMeal.svg'
    import image1 from '../../static/meal-image-1.jpg'
    import image2 from '../../static/stam.jpg'
    import {ArrowForwardIcon} from '@chakra-ui/icons'
import { useEffect, useState } from 'react';
import useAddComment from '../../custom hooks/useAddComment';
import useGetComments from '../../custom hooks/useGetComments';
import PopupComment from './PopupComment';
import '../../style.css'

    export default function DayMealSidePopup({setSelectedMeal, selectedMeal}) {

        const getMealPosition = (loggedTime) => {   
            const loggedDate = new Date(loggedTime);
            const startOfDay = new Date(loggedDate).setHours(0, 0, 0, 0);
            const minutesSinceStartOfDay = (loggedDate - startOfDay) / (1000 * 60);
            return (minutesSinceStartOfDay / 30) * 50; // 50px height for each 30-minute slot
        };

        const [comment, setComment] = useState('')
        const {addComment} = useAddComment()
        const {getComments, listOfComments, loading} = useGetComments()

        const handleComment = () => {
            
            addComment(comment, selectedMeal.meal_id)
            setComment('')
            getComments(selectedMeal.meal_id)
        }

        useEffect(()=> {
            if (selectedMeal) {
                getComments(selectedMeal.meal_id)
            }
        },[selectedMeal, loading])

        



    return (
        <Box /*onClick = {() => setSelectedMeal(null)}*/ w="50%" p="4" bg="white">
        {selectedMeal  && (
            <Popover  isOpen>
            <PopoverTrigger>
                <Box />
            </PopoverTrigger>
            <PopoverContent position = 'absolute' top = {`${getMealPosition(selectedMeal.logged_at) -120}px`} 
            right = '-900px' bg = 'teal'  minHeight = '350px'>
                
                <PopoverCloseButton bg = 'white' color = 'teal' onClick = {() => setSelectedMeal(null)} />
                <PopoverHeader color = 'white' as = 'b' fontSize = '25px'>{new Date(selectedMeal.logged_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})}</PopoverHeader>
                <PopoverBody  gap = '30px' minHeight = '350px'  >
                <Image mb = '10px' border = '2px' borderRadius = '10px' borderColor = 'green' src = {image1} alt={selectedMeal.description} />
                <Box display = 'flex' flexGrow = {1} borderBottom = '2px' borderRadius='0px' borderColor = 'white'>
                    <Text color = 'white' as="b">{`"${selectedMeal.description ? selectedMeal.description : ''}"`}</Text>
                </Box>
                <Box maxHeight = '100px' overflowY = 'auto' display = 'flex' flexDirection= 'column' gap = '5px'>
                    {listOfComments.map((comment, index)=> (
                        <PopupComment key = {index} comment = {comment}/>
                    ))}
                </Box>
                <Flex alignItems = 'center' mb = '20px' mt = '20px' bg = '' >
                    <Input  type = 'text' value = {comment} onChange = {(e) => setComment(e.target.value)}
                    fontSize = '20px' color = 'teal' placeholder = 'comment' bg ='white' />
                    <IconButton onClick = {()=> handleComment()} icon = {<ArrowForwardIcon/>}  bg = 'orange' />
                </Flex>
                </PopoverBody>
            </PopoverContent>
            </Popover>
        )}
        </Box>
    );
    };

