import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LikeButton from "./LikeButton";
import axios from "axios";

const Posts = () => {

  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/v1/posts');
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const descriptionPreview = (description) => {
    return description.slice(0, 200) + "..."
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const parsedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(formattedDate);
    return parsedDate;
  }

  // Call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="p-4 space-y-6">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-extrabold text-purple-500">{post.job.job_title}</div>
                <div className="text-xl font-bold text-green-500">{post.job.company_name}</div>
              </div>
              <div className="essential-job-info flex space-x-4">
              <span className="text-green-500">Date Posted: {formatDate(post.job.date_posted)}</span>
              <span className="job-location text-green-500 inline-block mr-4">Location: {post.job.location}</span>
              <span className="job-salary text-green-500 inline-block">Salary: {post.job.salary ? post.job.salary : "Not Available"}</span>
              <div className="job-type-container">
                  {post.job.full_time && (
                    <span className="job-full_time text-green-500">
                      Job Type: Full-time
                    </span>
                  )}
                  {post.job.contract && (
                    <span className="job-contract text-green-500">
                      Job Type: Contract
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-400">{descriptionPreview(post.job.job_description)}</p>
              
              <div className="job-specs flex space-x-4">
                <span className="job-qualifications text-gray-500 text-sm inline-block">Qualifications: {post.job.qualifications}</span>
                <span className="job-industry text-gray-500 text-sm inline-block">Industry: {post.job.industry}</span>
                
              </div>

              <div className="flex items-center space-x-4">
                <div className="comment-container">
                  <span className="mr-2"><CommentIcon></CommentIcon></span>
                  <span className="text-gray-500">100</span>
                </div>
                <LikeButton/>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


const postsContainer = document.getElementById("posts-container");
if (postsContainer) {
  const postsRoot = ReactDOM.createRoot(postsContainer);
  postsRoot.render(<Posts />);
}