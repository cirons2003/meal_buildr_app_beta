import {Flex, Button, Popover, Text, Input, useTheme, ScrollView, IconButton, KeyboardAvoidingView} from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';
import {useState, useEffect} from 'react'
import { Dimensions } from 'react-native';
import useCommentHandling from '../../custom hooks/useCommentHandling';


export default function CommentPopOver({meal, isActive, index, showComments, setShowComments}) {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const theme = useTheme()

    const [newComment, setNewComment] = useState('')

    const {listOfComments, getComments, addComment} = useCommentHandling()

    const [showInputFeedback, setShowInputFeedback] = useState(true)

    const handleSendComment = () => {
        addComment(newComment, meal.meal_id)
        setNewComment('')
    }

    useEffect(()=> {
        if (meal) {
            getComments(meal.meal_id)
        }
    },[])

    return (
        <Flex width='100%' flex={1} justify='center' direction='column' align='center' mb={20}>
            <Popover isOpen={showComments && isActive} onClose={() => setShowComments(false)} placement='top' trigger={(triggerProps) => {
                return <Button {...triggerProps} fontSize = {15}  onPress = {()=> setShowComments(true)} bg={theme.colors.teal.grad4}>{`Comments (${listOfComments.length})`}</Button>;
            }}>
                <Popover.Content borderColor = {theme.colors.teal.grad4} width = {screenWidth * 0.8} height = {screenHeight * 0.4} pos= 'relative'>
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header bg = {theme.colors.teal.grad6} borderColor = {theme.colors.teal.grad4}>
                    <Text bold>Comments</Text>
                </Popover.Header>
                <Popover.Body flex = {1} bg = {theme.colors.teal.grad6} >
                    <ScrollView maxH='200px'>
                    {listOfComments.map((comment, index) => (
                        <Flex  key={index} direction = 'column' width = '100%' >
                            <Flex direction='row' justify = 'space-between'>
                                
                                <Text bold color = 'red.100' fontSize = {10}>
                                    {comment.poster_username}
                                </Text>
                            </Flex>
                            <Text mb={2} fontSize = {15}>
                                {comment.comment_text}
                            </Text>
                        </Flex>
                    ))}
                    </ScrollView>
                </Popover.Body>
                <Popover.Footer bg = {theme.colors.teal.grad6} borderColor = {theme.colors.teal.grad4}>
                    <Flex direction='row' align='center' pos = 'relative' left = {'-50%'} >
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
                        onFocus={()=>setShowInputFeedback(true)}
                        
                        
                    />
                    <IconButton
                        icon={<MaterialIcons name='send' size={24} color={theme.colors.teal.grad4} />}
                        onPress={handleSendComment}
                        ml={2}
                    />
                    </Flex>
                </Popover.Footer>
                </Popover.Content>
            </Popover>
        </Flex>
    )
}