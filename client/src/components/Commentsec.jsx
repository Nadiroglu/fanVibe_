import React, { useState } from 'react';
import CommentReplies from './CommentReplies';


const Commentsec = ({ post }) => {

    const [content, setContent] = useState('');
    // const [isReply, setIsReply] = useState(false)
    const [replyStates, setReplyStates] = useState({});

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
            post_id: post.id,
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        // Handle successful comment creation
        console.log('Comment added');
        window.location.reload()
        // Clear the comment content after successful submission
        setContent('');
      } catch (error) {
        // Handle error
        console.error('Error adding comment:', error);
      }
    };

    const toggleReply = (commentId) => {
        setReplyStates((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    // const toggleReply = () => {
    //   setIsReply(!isReply)
    // }

    

  return (
          
          <section key={post.id} className="bg-white dark:bg-white-900 py-8 lg:py-16 antialiased rounded mr-12">
            <div className="max-w-xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray">Discussion</h2>
              </div>
              <form className="mb-6" onSubmit={handleSubmit}>
                <div className="py-2 px-4 mb-4 bg-gray-700 rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">Your comment</label>
                  <textarea
                    id="comment"
                    rows="6"
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-gray-950 dark:placeholder-gray-950 dark:bg-gray-100"
                    placeholder="Write a comment..."
                    required
                    value={content} onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                >
                  Add comment
                </button>
              </form>
              {post.comments.map((comment) => {
                
        return (
              <article className="p-6 text-base bg-white rounded-lg dark:bg-white-900">
                <footer className="flex justify-between items-center mb-3">
                
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-gray font-semibold">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" // comment.user.prof_pic_url
                        alt="Michael Gough"
                      />{comment.user.first_name} {comment.user.last_name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time pubdate dateTime={comment.date} title={comment.date}>{comment.date}</time>
                    </p>
                  </div>
                  <button
                    id={`dropdownComment${comment.id}Button`}
                    data-dropdown-toggle={`dropdownComment${comment.id}`}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    type="button"
                  >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>

                  {/* DROPDOWN MENU */}

                  <div
                    id={`dropdownComment${comment.id}`}
                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={`dropdownComment${comment.id}Button`}>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Remove
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {comment.content}
                </p>
                <div className="flex flex-col mt-6 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    onClick={() => toggleReply(comment.id)}
                  >
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    Reply
                  </button>

                  {replyStates[comment.id] && <CommentReplies replies={comment.replies} comment={comment} />}
                  
                </div>
              </article>
              );
            })}
            {/* {isReply && (
                    <CommentReplies replies={post.comment.replies} />
                  )} */}
            </div>
          </section>
  );
};

export default Commentsec;
