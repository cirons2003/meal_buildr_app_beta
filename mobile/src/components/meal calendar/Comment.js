import {Avatar, Flex, Text, useTheme } from 'native-base'
import useFormatDate from '../../custom hooks/useFormatDate'
import { useUser } from '../../context'
import defaultProfilePicture from '../../static/download.png'


export default function Comment({comment}) {
    const theme = useTheme()
    const {user} = useUser()
    const {basicFormat} = useFormatDate()
    return (
        <Flex direction = 'row' align = 'center' borderRadius = {20} px = {2} bg = {theme.colors.teal.grad3} gap = {2}>
            <Avatar source = {comment?.poster_profile_picture_url ? {uri:comment.poster_profile_picture_url} : defaultProfilePicture} size = {8}/>
            <Flex direction = 'column' flex = {1} >
                <Flex direction='row' justify = 'space-between'>
                    <Text fontSize = {14} bold color = {(comment?.poster_username === user?.username) ? 'white' :theme.colors.lightblue1}>
                        {(comment?.poster_username === user?.username) ? '-Me-' : comment?.poster_username}
                    </Text>
                    <Text>
                        {basicFormat(comment?.commented_at)}
                    </Text>
                </Flex>
                <Text mb={2} fontSize = {15}>
                    {comment.comment_text}
                </Text>
            </Flex>
        </Flex>
    )
}