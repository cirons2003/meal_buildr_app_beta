import {Modal, Flex, Text, Image, useTheme, AspectRatio, ScrollView} from 'native-base'
import PagerView  from 'react-native-pager-view'
import {useState, useEffect} from 'react'
import { Dimensions } from 'react-native'
import CommentPopOver from './CommentPopOver'

export default function MealGroupPopup({selectedGroup, setSelectedGroup}) {

    const [selectedMealIndex, setSelectedMealIndex] = useState(0)

    const theme = useTheme()

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;


    const [showComments, setShowComments] = useState(false)


    ModalDimensions = {
        height: screenHeight * 0.65, 
        width: screenWidth * 0.9
    }

    return (
        <>
        {selectedGroup && <Modal isOpen = {selectedGroup !== null} onClose = {()=>setSelectedGroup(null)} size = 'full' >
            <Modal.Content p = {0} height = {ModalDimensions.height} width = {ModalDimensions.width}>
                <Modal.Header bg = {theme.colors.teal.grad3}>
                    <Flex bg = {theme.colors.teal.grad3} direction = 'row' align = 'center' justify = 'start' m = {0} p = {0}>
                        <Text fontSize = '24px' bold color = 'white'>{(new Date(selectedGroup.meals[selectedMealIndex].logged_at))
                        .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true})}
                        {selectedGroup.size > 1 && `  (${selectedMealIndex+1}/${selectedGroup.size})`}
                        </Text>
                    </Flex>
                    <Modal.CloseButton bg = 'white'/>
                </Modal.Header>
                <Modal.Body width = '100%' height = '100%' m = {0} p = {0}>
                    <PagerView style = {{padding: 0}} initialPage = {0} height = {ModalDimensions.height} width = {ModalDimensions.width} onPageSelected={e => setSelectedMealIndex(e.nativeEvent.position)}>
                        {selectedGroup.meals.map((meal, index)=>(
                            <Flex pt = {6} bg = {theme.colors.teal.grad3} p = {0} gap = {5} mb = {0} direction = 'column' align = 'center' width = '100%' height = '100%' key = {index}>
                                
                                <AspectRatio ratio = {0.8} height = '50%' >
                                    <Image borderColor = {theme.colors.teal.grad5} borderWidth = {1} borderRadius = {10} source = {{uri: meal.image_url}} alt = 'pic' />
                                </AspectRatio>
                                <ScrollView borderBottomWidth = {2} borderBottomColor = {theme.colors.teal.grad4} width = '80%' pb = {1} maxHeight = '15%'>
                                    <Text bold color = 'white' fontSize = {16}>{`"${meal.description}"`}</Text>
                                </ScrollView>
                                <CommentPopOver index = {index} isActive = {selectedMealIndex === index} meal = {meal} showComments={showComments} setShowComments={setShowComments}/>
                            </Flex>
                        ))}
                        
                    </PagerView>
                </Modal.Body>
            </Modal.Content>
        </Modal>
        }
        </>
    )
}