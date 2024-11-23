import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';

function CommentList(loadedPost) {
  return loadedPost.comments.map((comment, index) => 
    <div>
      <div className="mt-4 space-y-4">
        <div className="bg-gray-700 p-4 rounded-md space-y-2">
          <div className="flex justify-between">
            <div className="font-semibold">{comment.user_id}</div>
            <div className="text-gray-400 text-sm">{comment.created_at}</div>
          </div>
          <p>{comment.comment_text}</p>
        </div>
      </div>
    </div>
  )
}

function Job(loadedPost) {
  const job = loadedPost.job
  
  return (    
    <div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold text-purple-500">{job.job_title}</div>
        <div className="text-1xl font-semibold text-purple-500">{job.company_name}</div>
      </div>
      <p className="text-gray-400">{job.job_description}</p>
      <p className="text-gray-500 text-sm">Location: {job.location}</p>
      <p className="text-gray-500 text-sm">Qualifications: {job.qualifications}</p>
      <p className="text-gray-500 text-sm">Salary: {job.salary}</p>
      <p className="text-gray-500 text-sm">Full Time?: {job.full_time.toString()}</p>
      <p className="text-gray-500 text-sm">Contract?: {job.contract.toString()}</p>
      <p className="text-gray-500 text-sm">Date Posted: {job.date_posted}</p>
      <p className="text-gray-500 text-sm">Industry: {job.industry}</p>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-green-500 hover:text-green-700">Apply Now</a>
      </div>
    </div>

  )
}

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
        console.log(data.data.data.attributes)
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
          <div>{Job(loadedPost)}</div>
          <div>{CommentList(loadedPost)}</div>
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