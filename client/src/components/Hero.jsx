import React from 'react'
import NavBar from './NavBar'

const Hero = () => {
  return (
    <>
    <div className='w-full h-[90vh]'>
        <img src='https://images.pexels.com/photos/2190115/pexels-photo-2190115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt='hero' className='w-full h-full object-cover '/>
        <div className="max-w-[1140px] m-auto">
            <div className="absolute top-[40%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white p-4">
                <h1 className='font-bold text-4xl'>Find Your Friends who support the same team as you</h1>
                <h2 className='font-bold py-4 italic'>With just click away</h2>
                <p className='font-bebas text-3xl py-4 italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, quam temporibus? Voluptates repudiandae, corrupti doloribus culpa velit accusamus laborum placeat illum, debitis nostrum, dicta pariatur facere est exercitationem eligendi! Blanditiis necessitatibus maxime voluptatem architecto, eius officiis iusto eaque sequi odio minima laborum tempora expedita, aperiam modi aliquid dignissimos asperiores? At.</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Hero