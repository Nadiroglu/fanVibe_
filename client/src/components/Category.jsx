import React from 'react'
import FanClubList2 from './FanClubList'

const Category = ({sportType, clubs, user}) => {


  return (
    <div className='category bg-sky-white h-auto text-center '>
        <h2 className='mt-4 text-2xl font-bold tracking-tight dark:text-sky-900 dark:text-blue'>{sportType.toUpperCase()} FanClubs</h2>
        <FanClubList2 clubs={clubs} user={user} />
    </div>

  )
}

export default Category
