import { Box } from "@chakra-ui/react";
import MessagesTopBar from "../components/MessagesPage/MessagesTopBar";
import Conversations from "../components/MessagesPage/Conversations";



export default function MessagesPage() {
    return (
        <>
            <Box>
                <MessagesTopBar/>
                <Conversations/>
            </Box>
        </>
    )
}