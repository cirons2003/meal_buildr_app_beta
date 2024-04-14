
import useConversationHandling from "../../custom hooks/useConversationHandling";
import {Flex, Text, IconButton, ScrollView} from 'native-base'
import {useEffect, useState} from 'react'
import ConversationTab from "./ConversationTab";
import { useLoggedIn } from "../../context";
import ConversationTopBar from './ConversationTopBar'
import SearchBar from "./SearchBar";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationPage from "../../pages/ConversationPage";



export default function Conversations() {
    
    const {loggedIn} = useLoggedIn()
    const {filteredListOfConversations, filterConversations, getConversations} = useConversationHandling()
    const [searchTerm, setSearchTerm] = useState('')

    const Stack = createNativeStackNavigator()

    useEffect(()=>{
        if (loggedIn) {
            const clear = setTimeout(()=>getConversations(),1000)
            return () => clearTimeout(clear)
        }
    },[loggedIn])

    useEffect(()=>{
        const clear = setTimeout(()=>filterConversations(searchTerm),500)
        return ()=> clearTimeout(clear)
    },[searchTerm])

    if (!loggedIn)
        return (<Text>loading...</Text>)

    return (
        <Flex flex = {1} width = '100%' pos = 'relative'>
            <Flex mt = '3px' flex = {1} width = '100%' pos = 'absolute' top = {20} >
                <ConversationTopBar/>
                <ScrollView width= '100%' flex = {1}>
                    <SearchBar placeholder={'search conversations...'} value = {searchTerm} setValue={setSearchTerm}/>
                    {filteredListOfConversations.map((convo, index) => (
                        <ConversationTab key = {index} convo = {convo}/>
                    ))}
                </ScrollView>
            </Flex>
        </Flex>
    )
}