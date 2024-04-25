import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import FanClubList from './FanClubList'
import NavBar from './NavBar'

const Home = () => {

    const [user] = useOutletContext()
    


  return (
    <div>
        {user && (
            <h1>Welcome: {user.username && user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
            )}
            
    </div>
  )
}

export default Home