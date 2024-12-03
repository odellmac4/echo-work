import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';
import Comment from "./Comment";
import Job from "./Job";

function PostShow() {
  const [loading, setLoading] = useState(true)
  const [loadedPost, setLoadedPost] = useState([])
  const [commentText, setCommentText] = useState('')
  const token = document.querySelector('[name=csrf-token]').content
  const postId = window.location.href.split('/')[4]

  const handleSubmit = () => {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.post(`/api/v1/posts/${postId}/comments`, {comment_text: commentText, post_id: postId})
      .then(window.location = `/posts/${postId}`)
      .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token
    axios.get(`/api/v1/posts/${postId}`)
      .then(data => {
        setLoadedPost(data.data.data.attributes)
        setLoading(false)
      })
      .catch(error => console.log(error)) 
  }, [])
  
  if (loading) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div className="p-4 space-y-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-4">
          <div><Job post={loadedPost} /></div>
          <div><Comment post={loadedPost} /></div>
          <div className="mt-4">
          <form>
            <textarea type="text" name="commentText" placeholder="Add a comment..." className="w-full p-3 bg-gray-700 rounded-md text-white placeholder-gray-400" onChange={e => setCommentText(e.target.value)} value={commentText}></textarea>
            <button type="submit" className="mt-2 bg-green-500 hover:bg-green-700 text-white rounded-md px-4 py-2 active:bg-purple-500" onClick={e => handleSubmit(e)}>Post Comment</button>
          </form>
          </div>
        </div>
      </div>
    )
  }
}

const postShowContainer = document.getElementById("post-show-container");
if (postShowContainer) {
  const postShowRoot = ReactDOM.createRoot(postShowContainer);
  postShowRoot.render(<PostShow/>);
}