import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from 'axios';

function CommentList(loadedPost) {
  return loadedPost.comments.map((comment, index) => 
    // <div key={index}>
    //   <div className="chat chat-start">
    //     <div className="chat-bubble">{comment.comment_text}</div>
    //   </div>
    // </div>
    <div className="mt-4 space-y-4">
      <div className="bg-gray-700 p-4 rounded-md space-y-2">
        <div className="flex justify-between">
          <div className="font-semibold">John Doe</div>
          <div className="text-gray-400 text-sm">2 hours ago</div>
        </div>
        <p>This is a great job opportunity!</p>
        <div className="mt-2 pl-4 border-l-2 border-gray-600">
          <div className="text-gray-300 mt-2">
            <div className="font-semibold">Jane Smith</div>
            <p>Yes, the company is amazing!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Job(loadedPost) {
  const job = loadedPost.job
  return (    
      <div className="p-4 space-y-6">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-semibold text-purple-500">{job.job_title}</div>
          </div>
          <p className="text-gray-400">{job.job_description}</p>
          <p className="text-gray-500 text-sm">Location: {job.location}</p>
          <p className="text-gray-500 text-sm">Qualifications: {job.qualifications}</p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-green-500 hover:text-green-700">Apply Now</a>
          </div>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-700 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <div className="font-semibold">John Doe</div>
                <div className="text-gray-400 text-sm">2 hours ago</div>
              </div>
              <p>This is a great job opportunity!</p>
              <div className="mt-2 pl-4 border-l-2 border-gray-600">
                <div className="text-gray-300 mt-2">
                  <div className="font-semibold">Jane Smith</div>
                  <p>Yes, the company is amazing!</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <div className="font-semibold">Sarah Lee</div>
                <div className="text-gray-400 text-sm">5 hours ago</div>
              </div>
              <p>Is remote work an option?</p>
            </div>
            <div className="mt-4">
              <textarea placeholder="Add a comment..." className="w-full p-3 bg-gray-700 rounded-md text-white placeholder-gray-400"></textarea>
              <button className="mt-2 bg-green-500 hover:bg-green-700 text-white rounded-md px-4 py-2 active:bg-purple-500">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

  )
}

function PostShow() {
  const [loading, setLoading] = useState(true)
  const [loadedPost, setLoadedPost] = useState([])

  useEffect(() => {
    const token = document.querySelector('[name=csrf-token]').content
    const postId = window.location.href.split('/')[4]

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
      <div>
        <div>{Job(loadedPost)}</div>
        <div>{CommentList(loadedPost)}</div>
      </div>
    )
  }
}

const postShowContainer = document.getElementById("post-show-container");
if (postShowContainer) {
  const postShowRoot = ReactDOM.createRoot(postShowContainer);
  postShowRoot.render(<PostShow/>);
}