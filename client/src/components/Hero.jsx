import React from 'react'
import NavBar from './NavBar'

const Hero = () => {
  return (
    <>
    <div class="relative px-6 pt-14 lg:px-8">
  <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#62abaa] to-[rgb(41,197,145)] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" ></div>
  </div>
  <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <div class="hidden sm:mb-8 sm:flex sm:justify-center">
      <div class="relative rounded-full px-4 py-1 text-sm leading-6 text-indigo-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
      Your Ultimate Fan Community 
      </div>
    </div>
    <div class="text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Welcome to FanVibe </h1>
      <p class="mt-6 text-lg leading-8 text-gray-600">Get ready to immerse yourself in the world of FanVibe, where fans like you come together to share their passion for all things entertainment! Whether you're a die-hard sports enthusiast, a music aficionado, or a movie buff, FanVibe is the place to be.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
        <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>
  <div class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
    <div class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#62abaa] to-[rgb(41,197,145) opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
  </div>
</div>
    </>
  )
}

export default Hero