import { Box, useUpdateEffect } from "@chakra-ui/react";
import AthleteListHeader from "../components/AthleteListHeader";
import AthleteTab from "../components/AthleteTab";
import AthleteListBody from "../components/AthleteListBody";
import { useEffect, useState } from "react";
import useGetAthleteList from "../custom hooks/useGetAthleteList";
import { useTeam, useUser } from "../context";

export default function AthleteList() {

    const {user} = useUser()
    const {team} = useTeam()

    const delay = 300

    const {filteredListOfAthletes, getAthleteList, filterAthletes} = useGetAthleteList()
    const [searchTerm, setSearchTerm] = useState('')
    const [numAthletes, setNumAthletes] = useState(0)

    useEffect(() => {
        if (user && team)
            getAthleteList(user.username, team.team_name)
    },[user, team])

    useUpdateEffect(()=> {
        const clear = setTimeout(()=> {
            filterAthletes(searchTerm)
        }, delay)
        return ()=> clearTimeout(clear)
    }, [searchTerm])

    useUpdateEffect(()=> {
        setNumAthletes(filteredListOfAthletes.length)
    }, [filteredListOfAthletes])

    return (
        <>
            <Box >
                <AthleteListHeader numAthletes = {numAthletes} searchTerm = {searchTerm} setSearchTerm={setSearchTerm}/>
                <AthleteListBody listOfAthletes={filteredListOfAthletes}/>  
            </Box>
        </>
    )
}