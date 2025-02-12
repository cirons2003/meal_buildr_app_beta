import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import NoPage from './pages/NoPage'
import LoginRedirect from './components/LoginRedirect'
import DashBoard from './pages/Dashboard'

import AthleteList from './pages/AthleteList'
import AthletePage from './pages/AthletePage'
import MessagesPage from './pages/MessagesPage'
import ConversationPage from './pages/ConversationPage'
import MealUploadPage from './pages/MealUploadPage'

import ChooseTeam from './pages/ChooseTeam'
import JoinTeamPage from './pages/JoinTeamPage'
import ScheduleMeetingPage from './pages/ScheduleMeetingPage'
import MemberSettingsPage from './pages/MemberSettingsPage'
import OwnerDashboard from './pages/OwnerDashboard'
import SettingsPage from './pages/SettingsPage'
import NotificationsPage from './pages/NotificationsPage'


export default function Routing() {

    

    return (
        <Router> 
            <Routes>
                <Route path = '/' element = {<ProtectedRoute><HomePage/></ProtectedRoute>}>
                    <Route path = 'athletes' element = {<AthleteList/>}/>
                    <Route path = 'athletePage/:athleteName/:mealId?/:mealLoggedAt?' element = {<AthletePage/>}/>
                    <Route path = 'messages' element = {<MessagesPage/>}/>
                    <Route path = 'conversation/:conversationId' element = {<ConversationPage/>}/>
                    <Route path = 'uploadMeal' element = {<MealUploadPage/>}/>
                    <Route path = 'scheduleMeeting' element = {<ScheduleMeetingPage/>}/>
                    <Route path = 'settings/:athleteName' element = {<MemberSettingsPage/>}/>
                    <Route path = 'ownerDashboard' element = {<OwnerDashboard/>}/>
                    <Route path = 'settings' element = {<SettingsPage/>}/>
                    <Route path = 'notifications' element = {<NotificationsPage/>}/>
                    <Route index element = {<DashBoard/>}/>
                </Route>
                <Route path = '/login' element = {<LoginRedirect><LoginPage/></LoginRedirect>}/>
                <Route path = '/register' element = {<LoginRedirect><RegistrationPage/></LoginRedirect>}/>
                <Route path = '/chooseTeam' element = {<ChooseTeam/>}/>
                <Route path = '/joinTeam' element = {<JoinTeamPage/>}/>
                <Route path = '*' element = {<NoPage/>}/>

            </Routes>
        </Router>
    )
}

// tested 