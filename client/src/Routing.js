import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import NoPage from './pages/NoPage'
import LoginRedirect from './components/LoginRedirect'
import DashBoard from './pages/Dashboard'

import {useState} from 'react'
import AthleteList from './pages/AthleteList'

export default function Routing() {

    

    return (
        <Router> 
            <Routes>
                <Route path = '/' element = {<ProtectedRoute><HomePage/></ProtectedRoute>}>
                    <Route index element = {<DashBoard/>}/>
                    <Route path = 'athletes' element = {<AthleteList/>}/>
                </Route>
                <Route path = '/login' element = {<LoginRedirect><LoginPage/></LoginRedirect>}/>
                <Route path = '/register' element = {<LoginRedirect><RegistrationPage/></LoginRedirect>}/>
                <Route path = '*' element = {<NoPage/>}/>
            </Routes>
        </Router>
    )
}

// tested 