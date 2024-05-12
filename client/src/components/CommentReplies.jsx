import React, { useState } from 'react'

const CommentReplies = ({replies, comment}) => {

    const [content, setContent] = useState('')
    // const [replyStates, setReplyStates] = useState(false)
    const [isReply, setIsReply] = useState(false)

    const toggleReply = () => {
        setIsReply(!isReply)
    }

    const handleReply = async (e, commentID) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/replies`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    content,
                    comment_id: commentID
                })
            })
            if(!response.ok) {
                throw new Error('Error fetching data')
            }
            console.log('Reply added');
            setContent('')
            window.location.reload()
            
        } catch (error) {
            console.error('Error occured', error);
        }

    }

    // !NOTE
    // const prevState = {
    //     reply1: true,
    //     reply2: false,
    //     reply3: true
    // };
    // const replyId = 'reply2';
    // const newState = {
    //     ...prevState,
    //     [replyId]: !prevState[replyId]
    // };
    // {
    //     reply1: true,
    //     reply2: true, // Toggled from false to true
    //     reply3: true
    // }

    // const toggleReply = (replyId) => {
    //     setReplyStates((prevState) => ({
    //         ...prevState,
    //         [replyId]: !prevState[replyId],
    //     }));
    // };

    return (
    <>
    {replies.map((reply) => {
        return (
            <article key={reply.id} class="p-6 mb-3 ml-6 lg:ml-12 text-base bg-gray rounded-lg dark:bg-white-900">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex flex-col items-center">
                <p class="inline-flex items-center mr-12 text-sm text-gray-900 dark:text-white font-semibold"><img
                        class="mr-2 w-7 h-6 rounded-full"
                        src={reply.user.prof_pic_url}
                        alt="Jese Leos"/>{reply.user.first_name} {reply.user.first_name}</p>
                {/* <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-12">{reply.timestamp}</time></p> */}
            </div>
            <button 
                id={`dropdownReply${reply.id}Button`}
                data-dropdown-toggle={`dropdownReply${reply.id}`}
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
                <span class="sr-only">Comment settings</span>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div id={`dropdownReply${reply.id}`}
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                </ul>
            </div>
        </footer>
                <p class="text-gray-500 dark:text-gray-400">{reply.content}</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <button type="button"
                            // onClick={toggleReply}
                            class="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                            <svg class="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                            </svg>                
                            Reply
                        </button>
                        </div>

    </article>

        )
    })}

    <form onSubmit={(e) => handleReply(e, comment.id)}>
        <input type='text' placeholder='what you think about it' value={content} onChange={(e) => setContent(e.target.value)}/>
        <button type='submit'>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m2.707 14.293 5.586-5.586a1 1 0 0 0 0-1.414L2.707 1.707A1 1 0 0 0 1 2.414v11.172a1 1 0 0 0 1.707.707Z"/>
            </svg>
        </button>
    </form>   
    </>
  )
}

export default CommentReplies

