import React from 'react'
import FanClubList from './FanClubList'

const Category = ({sportType, clubs}) => {


  return (
    <div className='category'>
        <h2 className='category-heading'>{sportType}</h2>
        <FanClubList clubs={clubs} />
    </div>
  )
}

export default Category