/*
import {useState, useEffect} from 'react'
import axios from 'axios'
import useRegisterUser from './custom hooks/useRegisterUser'
import useLogInUser from './custom hooks/useLogInUser'
import useLogoutUser from './custom hooks/useLogoutUser'


function App() {
  const [user, setUser] = useState('')
  const {register} = useRegisterUser(setUser)
  const {login} = useLogInUser(setUser)
  const {logout} = useLogoutUser(setUser)
  const [count, setCount] = useState(1)

  const handleLogin = async() => {
    login('Carson123', 'Connorandrew2005!')
  }

  const handleRegister = () => {
    register('Carson123', 'Connorandrew2005!')
  }

  const handleLogout = () => {
    logout(setUser)
  }

  const test = () => {
    setCount(count+1)
  }




  const testStuff = async() => {
    try {
      const response = await axios.get('http://localhost:5000/secret', {withCredentials: true})
      console.log(response.data)
    }catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <h1> {user ? user : 'not logged in'} </h1>
      
      <button onClick = {() => handleLogin()}>login</button>
      <button onClick = {() => handleRegister()}>register</button>
      <button onClick = {() => handleLogout()}>logout</button>
      <button onClick = {() => testStuff()}>test</button>
    </>
  );
}

export default App;
*/