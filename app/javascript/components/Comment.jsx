import React, { useState, useEffect }  from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';
import Reply from "./Reply";

export default function Comment({ post }) {
  const postId = post.id
  const [repliesOpened, setRepliesOpened] = useState(false)
  const [loadedReplies, setLoadedReplies] = useState([])
  const [replyText, setReplyText] = useState('')
  const token = document.querySelector('[name=csrf-token]').content 
  
  function handleClick(commentId) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.get(`/api/v1/posts/${postId}/comments/${commentId}/replies`)
      .then(data => {
        console.log(data)
        setLoadedReplies(data.data.replies)
        setRepliesOpened(true)
      })
      .catch(error => console.log(error))
  }
    
  return post.comments.map((comment, index) =>
    <div>
      <div className="mt-4 space-y-4" key={index}>
        <div className="bg-gray-700 p-4 rounded-md space-y-2">
          <div className="flex justify-between">
            <div className="font-semibold">{comment.user_id}</div>
            <div className="text-gray-400 text-sm">{comment.created_at}</div>
          </div>
          <p>{comment.comment_text}</p>
        </div>
        <div>
          <button onClick={e => handleClick(e.target.value)} value={comment.id}>Load Replies</button>
          {repliesOpened && <Reply replies={loadedReplies} />}
        </div>
      </div>
    </div>
  )
}



const commentContainer = document.getElementById("comment-container")
if (commentContainer) {
  const commentRoot = ReactDOM.createRoot(commentContainer);
  commentRoot.render(<Comment/>);
}