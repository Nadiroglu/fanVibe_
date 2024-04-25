import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import './Login.css'

const Login = () => {

    // const { user } = useOutletContext()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [isLogin, setIslogin] = useState(false)


    // fetching data   

    const userInfo = {
        username, password
    }

    const handleLogin = async () => {

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(userInfo)
        })
    
        if (!response.ok) {
            const errorData = await response.json()
            setError('Login failed ' + errorData.error)
    
        } else {
            const userData = await response.json()
            if (userData.message == 'You are already logged in') {
                setError('You are alreadyy logged in')
                setMsg('You are alreadyy logged in')
            } else {
                setMsg('Log in succesful')
                setError('')
                navigate('/')
                setIslogin(false)
                window.location.reload();
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!username || !password) {
            setError('Username and password are required')
            setMsg('')
            return
        }
        await handleLogin()
        
    }

  return (
        <>
        <NavBar />
    <div className='login-container'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className='login-form'>
            <label className='login-label'>
                <input className='login-username' type='text' placeholder='Type your username' name='username' onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br/>
            <label className='login-label'>
                <input className='login-password' type="password" placeholder='Type your password' name='username' onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <br/>
            <button className='login-button'>Login</button>
        </form>
    </div>
    </>
  )
}

export default Login