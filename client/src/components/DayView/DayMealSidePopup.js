import { IconButton, AspectRatio, Box, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Image, Text, Input, Flex, Center } from '@chakra-ui/react';

import useNotifications from '../../custom hooks/useNotifications';
import defaultImage from '../../static/SVG Layer4.svg'
import {ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'
import { useEffect, useState, useRef } from 'react';
import useAddComment from '../../custom hooks/useAddComment';
import useGetComments from '../../custom hooks/useGetComments';
import PopupComment from './PopupComment';
import '../../style.css'


    export default function DayMealSidePopup({getMealPosition, setSelectedGroup, selectedGroup, mealIndex, setMealIndex}) {

        const [selectedMeal, setSelectedMeal] = useState(null)
        

        const scrollRef = useRef(null)

        

        const {viewComments} = useNotifications()
        

        const [comment, setComment] = useState('')
       
        const {addComment, toggleRefresh} = useAddComment()
        const {getComments, listOfComments, loading} = useGetComments() 
        

        const handleComment = () => {
            
            addComment(comment, selectedMeal.meal_id)
            setComment('')
        }

        // handle new popup opening
        useEffect(()=> {
            if (selectedGroup && mealIndex !== null) {
                setSelectedMeal(selectedGroup.meals[mealIndex])
            }
            else {
                setSelectedMeal(null)
                setMealIndex(0)
            }
        }, [selectedGroup, mealIndex])

        // only happens once when the component is rendered with selectedMealIndex prop 
        useEffect(()=> {

        },[])

        // get comments
        useEffect(()=> {
            if (selectedMeal) {
                getComments(selectedMeal.meal_id)
                viewComments(selectedMeal.meal_id)
            }
        },[selectedMeal, loading, toggleRefresh])

        // scroll to  bottom of comments
        useEffect(()=> {
            if (scrollRef.current)
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }, [listOfComments])

        
        


    return (
        <Box /*onClick = {() => setSelectedMeal(null)}*/ w="50%" p="4" bg="white">
        {console.log(mealIndex)}
        {(selectedMeal && selectedGroup) && (
            <Popover  isOpen>
            <PopoverTrigger>
                <Box/>
            </PopoverTrigger>
            <PopoverContent position = 'absolute' top = {`${getMealPosition(selectedGroup.meals[0].logged_at) -120}px`} 
            right = '-900px' bg = 'teal'  minHeight = '350px' >
                
                <PopoverCloseButton bg = 'white' color = 'teal' onClick = {() => {setSelectedMeal(null); setSelectedGroup(null)}} />
                <PopoverHeader color = 'white' as = 'b' fontSize = '25px'>{new Date(selectedMeal.logged_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})} {selectedGroup.size > 1 &&`(${mealIndex+1}/${selectedGroup.size})`}</PopoverHeader>
                <PopoverBody gap = '30px' minHeight = '350px'  maxWidth = '350px'>
                    <Center >
                        <AspectRatio ratio={0.8} width="200px" border="2px" borderRadius="10px" borderColor="green" overflow="hidden">
                            <Image src={selectedMeal.image_url ? selectedMeal.image_url : defaultImage} alt="meal-image" />
                        </AspectRatio>   
                    </Center>
                
                    <Box display = 'flex' flexGrow = {1} borderBottom = '2px' borderRadius='0px' borderColor = 'white'>
                        <Text color = 'white' as="b">{`"${selectedMeal.description ? selectedMeal.description : ''}"`}</Text>
                    </Box>
                    <Box ref = {scrollRef} maxHeight = '100px' overflowY = 'auto' display = 'flex' flexDirection= 'column' gap = '5px'>
                        {listOfComments.map((comment, index)=> (
                            <PopupComment key = {index} comment = {comment}/>
                        ))}
                    </Box>
                    <Flex alignItems = 'center' mb = '20px' mt = '20px' bg = '' >
                        <Input  type = 'text' value = {comment} onChange = {(e) => setComment(e.target.value)}
                        fontSize = '20px' color = 'teal' placeholder = 'comment' bg ='white' />
                        <IconButton onClick = {()=> handleComment()} icon = {<ArrowForwardIcon/>}  bg = 'orange' />
                    </Flex>
                    {(mealIndex > 0) && <Flex pos = 'absolute' top = '40%' left = "0px" transform = "translateY(-50%) translateX(-30%)" >
                        <IconButton onClick = {()=>{setSelectedMeal({...selectedGroup.meals[mealIndex-1]}); setMealIndex(mealIndex - 1)}} bg = 'lightblue' icon = {<ChevronLeftIcon/>}></IconButton>
                    </Flex>}
                    {(mealIndex < selectedGroup.size - 1) && <Flex pos = 'absolute' top = '40%' right = "0px" transform = "translateY(-50%) translateX(30%)" >
                        <IconButton onClick = {()=>{setSelectedMeal({...selectedGroup.meals[mealIndex+1]}); setMealIndex(mealIndex + 1)}} bg = 'lightblue' icon = {<ChevronRightIcon/>}></IconButton>
                    </Flex>
                    }
                </PopoverBody>
            </PopoverContent>
            </Popover>
        )}
        </Box>
    );
    };

