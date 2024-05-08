
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'

const Logout = () => {

    const [isLoggedOut, setIsLoggedOut] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
        .then((res) => {
            if (res.ok) {
                setIsLoggedOut(true)
                navigate('/')
                window.location.reload();
            } else {
                setIsLoggedOut(false)
            }
        })
    }, [])

  return (
    <div>
        <p>{isLoggedOut ? "See you soon in our events.." : "Try again"}</p>
    </div>
  )
}

export default Logout
