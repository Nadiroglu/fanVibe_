import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import FanClubCategories from './FanClubCategories'
import FanClubList from './FanClubList'
import NavBar from './NavBar'
import Hero from './Hero'

const Home = () => {

    const [user, filteredClubs] = useOutletContext()
    


  return (
    <div>
        {/* {user && (
            <h1>Welcome: {user.username && user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
            )} */}
            <Hero />
            <FanClubCategories filteredClubs={filteredClubs} user={user} />
            
    </div>
  )
}

export default Home