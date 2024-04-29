import {Flex, Button, Popover, Text, Input, useTheme, ScrollView, IconButton} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import {useState, useEffect, useRef} from 'react'
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import useCommentHandling from '../../custom hooks/useCommentHandling'
import { useSetNotificationContext } from '../../context';
import Comment from './Comment';
import useUpdateEffect from '../../custom hooks/utility/useUpdateEffect';


export default function CommentPopOver({meal, isActive, index, showComments, setShowComments}) {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const theme = useTheme()
    const {viewComments} = useSetNotificationContext()

    const [newComment, setNewComment] = useState('')

    const {listOfComments, getComments, addComment} = useCommentHandling()

    const handleSendComment = () => {
        addComment(newComment, meal?.meal_id)
        setNewComment('')
    }

    useEffect(()=> {
        if (meal) {
            getComments(meal?.meal_id)
        }
    },[])

    const scrollRef = useRef(null)
    useEffect(() => {
        if (showComments && isActive) {
            viewComments(meal?.meal_id)
            const clear = setTimeout(()=>scrollRef.current.scrollToEnd()
            ,200)
            return ()=> clearTimeout(clear)
        }
    }, [showComments, isActive])

    useEffect(()=>{
        if (showComments && isActive) {
            const clear = setTimeout(()=>{
                scrollRef.current.scrollToEnd()
            },200)
            return ()=> clearTimeout()
        }
    }, [listOfComments])



    return (
        <Flex width='100%' flex={1} justify='center' direction='column' align='center' mb={20}>
            <Popover isOpen={showComments && isActive} onClose={() => setShowComments(false)} placement='top' trigger={(triggerProps) => {
                return <Button {...triggerProps} fontSize = {15}  onPress = {()=> setShowComments(true)} bg={theme.colors.teal.grad4}>{`Comments (${listOfComments.length})`}</Button>;
            }}>
                <Popover.Content borderColor = {theme.colors.teal.grad4} >
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
                        keyboardVerticalOffset = {Platform.OS === "ios" ? 300 : 0} width = {screenWidth * 0.8} 
                        height = {screenHeight * 0.4} 
                    >
                        <Popover.CloseButton />
                        <Popover.Header bg = {theme.colors.teal.grad6} borderColor = {theme.colors.teal.grad4}>
                            <Text bold>Comments</Text>
                        </Popover.Header>
                        <Popover.Body flex = {1} bg = {theme.colors.teal.grad6} >
                            <ScrollView maxH='200px' ref = {scrollRef}>
                            <Flex direction='column' width = '100%' justify='flex-end' align = 'center' gap = {1} >
                                {listOfComments.map((comment, index) => (
                                    <Comment key = {index} comment = {comment}/>
                                ))}
                            </Flex>
                            </ScrollView>
                        </Popover.Body>
                        <Popover.Footer bg = {theme.colors.teal.grad6} borderColor = {theme.colors.teal.grad4}>
                            <Flex width = '100%'>
                                <Flex direction='row' align='center' >
                                    <Input
                                        flex={1}
                                        placeholder='comment...'
                                        value={newComment}
                                        onChangeText={setNewComment}
                                        minWidth = {100}
                                        color = {theme.colors.teal.grad5}
                                        bg = {theme.colors.teal.grad3}
                                        borderColor= {theme.colors.teal.grad5}
                                        _input={{color: 'lightblue'}}
                                        onFocus={()=>scrollRef.current.scrollToEnd()}
                                    />
                                    <IconButton
                                        icon={<MaterialIcons name='send' size={24} color={theme.colors.teal.grad4} />}
                                        onPress={handleSendComment}
                                        ml={2}
                                    />
                                </Flex>
                            </Flex>
                        </Popover.Footer>
                    </KeyboardAvoidingView>
                </Popover.Content>
            </Popover>
        </Flex>
    )
}