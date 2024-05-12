import React from 'react'
import FanClubList2 from './FanClubList'

const Category = ({sportType, clubs, user}) => {


  return (
    <div className='category bg-sky-white h-auto text-center bg-transparent bg-gradient-to-tr from-[#eec0e5] to-[#c2f0ef] '>
        <h2 className='mt-3 = text-2xl rounded-sm font-bold tracking-tight dark:text-indigo-900'>{sportType.toUpperCase()} FanClubs</h2>
        <FanClubList2 clubs={clubs} user={user} />
    </div>

  )
}

export default Category
