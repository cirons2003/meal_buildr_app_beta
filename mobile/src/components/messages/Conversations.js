
import useConversationHandling from "../../custom hooks/useConversationHandling";
import {Flex, Text, IconButton, ScrollView} from 'native-base'
import {useEffect, useState} from 'react'
import ConversationTab from "./ConversationTab";
import { useLoggedIn } from "../../context";
import MessagesTopBar from './MessagesTopBar'
import SearchBar from "./SearchBar";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationPage from "../../pages/ConversationPage";



export default function Conversations({isFocused}) {
    
    const {loggedIn} = useLoggedIn()
    const {filteredListOfConversations, filterConversations, getConversations} = useConversationHandling()
    const [searchTerm, setSearchTerm] = useState('')

    const Stack = createNativeStackNavigator()

    useEffect(()=>{
        if (loggedIn) {
            const clear = setTimeout(()=>getConversations(),500)
            return () => clearTimeout(clear)
        }
    },[loggedIn])

    useEffect(()=>{
        if (isFocused) {
            getConversations()
        }   
    },[isFocused])

    useEffect(()=>{
        const clear = setTimeout(()=>filterConversations(searchTerm),500)
        return ()=> clearTimeout(clear)
    },[searchTerm])

    if (!loggedIn)
        return (<Text>loading...</Text>)

    return (
        <Flex flex = {1} width = '100%' pos = 'relative'>
            <Flex mt = '3px' flex = {1} width = '100%' pos = 'absolute' top = {0} >
                <MessagesTopBar/>
                <ScrollView width= '100%' flex = {1} marginBottom = {20}>
                    <SearchBar placeholder={'search conversations...'} value = {searchTerm} setValue={setSearchTerm}/>
                    {filteredListOfConversations.map((convo, index) => (
                        <ConversationTab key = {index} convo = {convo}/>
                    ))}
                </ScrollView>
            </Flex>
        </Flex>
    )
}