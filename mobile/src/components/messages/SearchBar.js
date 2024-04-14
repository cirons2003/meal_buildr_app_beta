import {Flex, IconButton, Input, useTheme} from 'native-base'
import { FontAwesome } from '@expo/vector-icons';

export default function SearchBar({height, placeholder, value, setValue, width}) {
    const theme = useTheme()
    return (
        <Flex direction='row' width = {`${width}`} minWidth = '50%' height={height} minHeight = {4} align = 'center' justify = 'start' px = {2} mb = {2}>
            <Input flex = {1} placeholder = {placeholder ? placeholder : ''} borderRadius={20} borderWidth = {2} borderColor = {theme.colors.teal.grad3} 
            value = {value} onChangeText={setValue} 
            InputLeftElement={
                <IconButton _icon = {{as: FontAwesome, name: 'search'}} />
            }/>
            
        </Flex>
    )
}