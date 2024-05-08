import React, { useState } from 'react'
import { NavLink, useOutletContext } from 'react-router-dom';
import Commentsec from './Commentsec';


const PostCompo = ({posts}) => {
    const [user] = useOutletContext()
  return (
    

<div>

{posts.map((post) => {
    const [isComment, setIsComment] = useState(false)

    // ! Comment Toggle
    const showComment = () => {
        setIsComment(!isComment);
      };

    return (
        <div className="pl-16">
            <div className="flex items-center mt-5">
                <NavLink to={`/user/${user.id}`}>
                    <img className="inline-block h-10 w-10 rounded-full" src={post.user.prof_pic_url} alt="" />
                </NavLink>
                <div className="ml-3">
                    <p className="text-base leading-6 font-medium text-white">
                        {post.user.first_name} {post.user.last_name} 
                    </p>
                </div>
            </div>

            <p className="mt-3 ml-4 text-base height-auto width-auto font-medium text-white flex-shrink">
                {post.content}
            </p>

        <img className='mt-5 ml-14 h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0' src={`/${post.post_img}`}/>
    <div className="flex">
        <div className="w-full">
            <div className="flex items-center">
                <div className="flex-1 text-center">
                        <svg onClick={showComment} className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300text-center h-12" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                </div>
                <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                        <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path></svg>
                    </a>
                </div>
                <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                        <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    </a>
                </div>
                <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                        <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                    </a>
                </div>
                <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                        <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
                    </a>
                </div>
                <div className="flex-1 text-center py-2 m-2">
                    <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                        <svg className="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </a>
                </div>
            </div>
            {isComment && (
                <Commentsec key={post.id} post={post} />
                )}
        </div> 
    </div>
</div>

    )
    


})}
    </div>
  )
}

export default PostCompo